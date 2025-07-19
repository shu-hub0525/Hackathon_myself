FROM node:latest

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

# 開発環境用の設定
ENV CHOKIDAR_USEPOLLING=true
ENV WATCHPACK_POLLING=true

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]
