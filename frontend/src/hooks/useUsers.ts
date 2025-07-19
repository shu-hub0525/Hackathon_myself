import { useState, useEffect } from 'react';
import { User, UserForm } from '../types/User';
import { userService } from '../services/userService';
import { MESSAGES } from '../constants/messages';

export const useUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // ユーザー一覧を取得
  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await userService.getUsers();
      setUsers(data);
    } catch (err) {
      setError(MESSAGES.error.userFetchFailed);
      console.error('Failed to fetch users:', err);
    } finally {
      setLoading(false);
    }
  };

  // ユーザーを作成
  const createUser = async (userData: Omit<User, 'id'>) => {
    setLoading(true);
    setError(null);
    try {
      const newUser = await userService.createUser(userData);
      setUsers(prev => [...prev, newUser]);
      return { success: true, message: MESSAGES.success.userCreated };
    } catch (err) {
      const errorMessage = MESSAGES.error.userCreateFailed;
      setError(errorMessage);
      console.error('Failed to create user:', err);
      return { success: false, message: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  // ユーザーを更新
  const updateUser = async (id: number, userData: UserForm) => {
    setLoading(true);
    setError(null);
    try {
      const updatedUser = await userService.updateUser(id, userData);
      setUsers(prev => prev.map(user => user.id === id ? updatedUser : user));
      return { success: true, message: MESSAGES.success.userUpdated };
    } catch (err) {
      const errorMessage = MESSAGES.error.userUpdateFailed;
      setError(errorMessage);
      console.error('Failed to update user:', err);
      return { success: false, message: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  // ユーザーを削除
  const deleteUser = async (id: number) => {
    setLoading(true);
    setError(null);
    try {
      await userService.deleteUser(id);
      setUsers(prev => prev.filter(user => user.id !== id));
      return { success: true, message: MESSAGES.success.userDeleted };
    } catch (err) {
      const errorMessage = MESSAGES.error.userDeleteFailed;
      setError(errorMessage);
      console.error('Failed to delete user:', err);
      return { success: false, message: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  // 初期化時にユーザー一覧を取得
  useEffect(() => {
    fetchUsers();
  }, []);

  return {
    users,
    loading,
    error,
    createUser,
    updateUser,
    deleteUser,
    fetchUsers,
  };
}; 