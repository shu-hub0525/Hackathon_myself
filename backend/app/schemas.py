from pydantic import BaseModel
from typing import Optional


class UserBase(BaseModel):
    name: str
    age: int


class UserCreate(UserBase):
    pass


class UserUpdate(BaseModel):
    name: Optional[str] = None
    age: Optional[int] = None


class User(UserBase):
    id: int

    class Config:
        from_attributes = True


# フロントエンドから受け取るリクエストの型
class TranslationRequest(BaseModel):
    text: str
    dialect: str
    direction: str


# フロントエンドへ返すレスポンスの型
class TranslationResponse(BaseModel):
    translated_text: str
