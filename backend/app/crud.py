# DBへの接続設定
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, scoped_session
from app.models import UserTable
from app.schemas import UserCreate, UserUpdate
from typing import List, Optional


# 接続したいDBの基本情報を設定
user_name = "user"
password = "password"
host = "mysql"  # docker-composeで定義したMySQLのサービス名
database_name = "db"

DATABASE = 'mysql://%s:%s@%s/%s?charset=utf8' % (
    user_name,
    password,
    host,
    database_name,
)

# DBとの接続
ENGINE = create_engine(
    DATABASE,
    echo=True
)

# Sessionの作成
session = scoped_session(
    # ORM実行時の設定。自動コミットするか、自動反映するか
    sessionmaker(
        autocommit=False,
        autoflush=False,
        bind=ENGINE
    )
)

# modelで使用する
Base = declarative_base()
# DB接続用のセッションクラス、インスタンスが作成されると接続する
Base.query = session.query_property()

# CRUD操作の関数
def get_users() -> List[UserTable]:
    return session.query(UserTable).all()

def get_user(user_id: int) -> Optional[UserTable]:
    return session.query(UserTable).filter(UserTable.id == user_id).first()

def create_user(user: UserCreate) -> UserTable:
    db_user = UserTable(name=user.name, age=user.age)
    session.add(db_user)
    session.commit()
    session.refresh(db_user)
    return db_user

def update_user(user_id: int, user: UserUpdate) -> Optional[UserTable]:
    db_user = session.query(UserTable).filter(UserTable.id == user_id).first()
    if db_user is None:
        return None
    
    if user.name is not None:
        db_user.name = user.name
    if user.age is not None:
        db_user.age = user.age
    
    session.commit()
    session.refresh(db_user)
    return db_user

def delete_user(user_id: int) -> bool:
    db_user = session.query(UserTable).filter(UserTable.id == user_id).first()
    if db_user is None:
        return False
    
    session.delete(db_user)
    session.commit()
    return True
