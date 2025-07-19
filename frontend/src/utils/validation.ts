import { User } from '../types/User';

// ユーザー情報のバリデーション
export const validateUser = (user: Partial<User>): string[] => {
  const errors: string[] = [];

  if (!user.name || user.name.trim() === '') {
    errors.push('名前は必須です');
  }

  if (user.age !== undefined && (user.age < 0 || user.age > 150)) {
    errors.push('年齢は0から150の間で入力してください');
  }

  return errors;
};

// メールアドレスの形式チェック
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// 年齢のバリデーション
export const isValidAge = (age: number): boolean => {
  return age >= 0 && age <= 150;
}; 