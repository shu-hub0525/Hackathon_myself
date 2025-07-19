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
