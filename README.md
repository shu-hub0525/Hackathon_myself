# 方言翻訳アプリ「どげんこつ」
標準語を方言に翻訳するWebアプリです．

# セットアップ手順
任意のディレクトリにクローンする
git clone https://github.com/KunitakeHyuga/Hackathon.git

node.jsをインストールしておく(以下記事を参考に)
https://zenn.dev/kuuki/articles/windows-nodejs-install

フロントのパッケージインストールをする
cd frontend
npm install
frontend/package-lock.jsonとfrontend/node_modulesが出てきたら成功

dockerdesktop立ち上げる
WSL2のubuntuでdocker動かすのでも可
docker compose build
docker compose up