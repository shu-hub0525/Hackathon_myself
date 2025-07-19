# app/config.py

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    # .envファイルから読み込みたい変数をここに定義します
    gemini_api_key: str

    # .envファイルの場所を指定する設定
    # `app`ディレクトリから見て一つ上の階層にある`.env`ファイルを指します
    model_config = SettingsConfigDict(env_file="../.env")


# 他のファイルから参照するためのインスタンスを作成
settings = Settings()
