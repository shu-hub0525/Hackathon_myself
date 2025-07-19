// アプリケーションで使用する色の定数
export const COLORS = {
  primary: '#007bff',
  secondary: '#6c757d',
  success: '#28a745',
  danger: '#dc3545',
  warning: '#ffc107',
  info: '#17a2b8',
  light: '#f8f9fa',
  dark: '#343a40',
} as const;

// ボタンの色
export const BUTTON_COLORS = {
  edit: COLORS.warning,
  delete: COLORS.danger,
  create: COLORS.success,
  view: COLORS.info,
} as const; 