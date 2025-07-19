// アプリケーションで使用するメッセージの定数
export const MESSAGES = {
  // 成功メッセージ
  success: {
    userCreated: 'ユーザーが正常に作成されました',
    userUpdated: 'ユーザーが正常に更新されました',
    userDeleted: 'ユーザーが正常に削除されました',
  },
  
  // エラーメッセージ
  error: {
    userCreateFailed: 'ユーザーの作成に失敗しました',
    userUpdateFailed: 'ユーザーの更新に失敗しました',
    userDeleteFailed: 'ユーザーの削除に失敗しました',
    userFetchFailed: 'ユーザー情報の取得に失敗しました',
    networkError: 'ネットワークエラーが発生しました',
    serverError: 'サーバーエラーが発生しました',
    unexpectedError: '予期しないエラーが発生しました',
  },
  
  // 確認メッセージ
  confirm: {
    deleteUser: 'このユーザーを削除しますか？',
  },
  
  // プレースホルダー
  placeholder: {
    name: '名前を入力してください',
    email: 'メールアドレスを入力してください',
    age: '年齢を入力してください',
  },
} as const; 