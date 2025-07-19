import { apiClient } from '../utils/api';
import { User, UserForm } from '../types/User';

export const userService = {
	// 全ユーザー取得
	getUsers: async (): Promise<User[]> => {
		const response = await apiClient.get('/users');
		return response.data;
	},

	// ユーザー作成
	createUser: async (userData: UserForm): Promise<User> => {
		const response = await apiClient.post('/users', userData);
		return response.data;
	},

	// ユーザー更新
	updateUser: async (userId: number, userData: UserForm): Promise<User> => {
		const response = await apiClient.put(`/users/${userId}`, userData);
		return response.data;
	},

	// ユーザー削除
	deleteUser: async (userId: number): Promise<void> => {
		await apiClient.delete(`/users/${userId}`);
	}
}; 