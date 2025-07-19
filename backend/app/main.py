from fastapi import FastAPI, HTTPException
from typing import List
from starlette.middleware.cors import CORSMiddleware
from app.database import session
from app.models import UserTable
from app.schemas import User, UserCreate, UserUpdate
from app.crud import get_users, get_user, create_user, update_user, delete_user

import google.generativeai as genai

# config.pyからsettingsをインポート
from .config import settings

# schemas.py から定義した型をインポート
from . import schemas

app = FastAPI()

# CORSを回避するために設定
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def read_root():
    return {"message": "Hello from FastAPI"}


# 全ユーザー取得
@app.get("/users", response_model=List[User])
def read_users():
    return get_users()


# 特定のユーザー取得
@app.get("/users/{user_id}", response_model=User)
def read_user(user_id: int):
    user = get_user(user_id)
    if user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return user


# ユーザー作成
@app.post("/users", response_model=User)
def create_new_user(user: UserCreate):
    return create_user(user)


# ユーザー更新
@app.put("/users/{user_id}", response_model=User)
def update_existing_user(user_id: int, user: UserUpdate):
    updated_user = update_user(user_id, user)
    if updated_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return updated_user


# ユーザー削除
@app.delete("/users/{user_id}")
def delete_existing_user(user_id: int):
    success = delete_user(user_id)
    if not success:
        raise HTTPException(status_code=404, detail="User not found")
    return {"message": "User deleted successfully"}


# --- ▼▼▼ ここからが追加するAPIエンドポイント ▼▼▼ ---
@app.post("/translate", response_model=schemas.TranslationResponse)
async def translate_text(request: schemas.TranslationRequest):
    """
    テキストを受け取り、指定された方言との間で翻訳を行う
    """
    if not settings.gemini_api_key:
        return schemas.TranslationResponse(
            translated_text="エラー: APIキーが設定されていません。"
        )

    # 生成AIに与える指示（プロンプト）を作成
    prompt = (
        fprompt
    ) = f"""
    あなたは、日本の各地域の方言と標準語、両方に精通したプロの翻訳家です。
    あなたのタスクは、与えられたテキストを、まるでその土地のネイティブが話すような、自然で生き生きとした口語に翻訳することです。

    # お手本 (Translation Examples)
    以下は、質の高い翻訳の例です。このスタイルと品質を参考にしてください。

    - **関西弁と標準語の例:**
    - 標準語から関西弁へ: 「本当にありがとう」->「ほんま、おおきに」
    - 関西弁から標準語へ: 「これ、なんぼ？」->「これ、いくらですか？」
    - **博多弁と標準語の例:**
    - 標準語から博多弁へ: 「何を言っているの？」->「なんば言いよると？」
    - 博多弁から標準語へ: 「来ないとだめだよ」->「来なければいけませんよ」

    # 実行タスク (Task to Execute)
    以下に指定された情報に基づいて、テキストを翻訳してください。

    - **翻訳方向:** {request.direction}
    - **対象の方言:** {request.dialect}
    - **翻訳するテキスト:** 「{request.text}」

    # 出力ルール (Output Rules)
    - 翻訳後のテキストのみを、単一の文章で返してください。
    - 解説、言い訳、前置き、鉤括弧（「」）などは一切含めないでください。
    """

    try:
        model = genai.GenerativeModel("gemini-2.5-flash")
        response = model.generate_content(prompt)

        # AIからの返答をそのまま返す
        translated_text = response.text.strip()

        return schemas.TranslationResponse(translated_text=translated_text)

    except Exception as e:
        print(f"An error occurred: {e}")
        return schemas.TranslationResponse(
            translated_text="エラー: 翻訳中に問題が発生しました。"
        )
