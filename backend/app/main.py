from fastapi import FastAPI, HTTPException
from typing import List
from starlette.middleware.cors import CORSMiddleware
from app.database import session
from app.models import UserTable
from app.schemas import User, UserCreate, UserUpdate
from app.crud import get_users, get_user, create_user, update_user, delete_user

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
