import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { User, UserForm, FormErrors } from './types/User';
import { useUsers } from './hooks/useUsers';
import UserList from './components/UserList';
import UserModal from './components/UserModal';
import ReactLogo from './components/ReactLogo';
import { MESSAGES } from './constants/messages';
import { validateUser } from './utils/validation';
import './assets/App.css';

function App() {
	const { users, loading, error, createUser, updateUser, deleteUser } = useUsers();
	const [editingUser, setEditingUser] = useState<User | null>(null);
	const [showModal, setShowModal] = useState(false);
	const [formData, setFormData] = useState<UserForm>({ name: '', age: 0 });
	const [formErrors, setFormErrors] = useState<FormErrors>({});

	// 編集モード開始
	const startEdit = (user: User) => {
		setEditingUser(user);
		setFormData({ name: user.name, age: user.age });
		setFormErrors({});
		setShowModal(true);
	};

	// 新規作成モード開始
	const startCreate = () => {
		setEditingUser(null);
		setFormData({ name: '', age: 0 });
		setFormErrors({});
		setShowModal(true);
	};

	// フォーム送信
	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		
		// バリデーション
		const validationErrors = validateUser(formData);
		if (validationErrors.length > 0) {
			const errors: FormErrors = {};
			validationErrors.forEach(error => {
				if (error.includes('名前')) errors.name = error;
				if (error.includes('年齢')) errors.age = error;
			});
			setFormErrors(errors);
			return;
		}

		if (editingUser) {
			const result = await updateUser(editingUser.id, formData);
			if (result.success) {
				alert(result.message);
				handleCloseModal();
			} else {
				alert(result.message);
			}
		} else {
			const result = await createUser(formData);
			if (result.success) {
				alert(result.message);
				handleCloseModal();
			} else {
				alert(result.message);
			}
		}
	};

	// モーダルを閉じる
	const handleCloseModal = () => {
		setShowModal(false);
		setEditingUser(null);
		setFormData({ name: '', age: 0 });
		setFormErrors({});
	};

	// フォーム入力変更
	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData(prev => ({
			...prev,
			[name]: name === 'age' ? parseInt(value) || 0 : value
		}));
		
		// エラーをクリア
		if (formErrors[name as keyof FormErrors]) {
			setFormErrors(prev => ({
				...prev,
				[name as keyof FormErrors]: undefined
			}));
		}
	};

	// ユーザー削除
	const handleDeleteUser = async (userId: number) => {
		if (!window.confirm(MESSAGES.confirm.deleteUser)) return;
		
		const result = await deleteUser(userId);
		if (result.success) {
			alert(result.message);
		} else {
			alert(result.message);
		}
	};

	return (
		<div className="container mt-5">
			<div className="row justify-content-center">
				<div className="col-md-10">
					<div className="card">
						<div className="card-header d-flex justify-content-between align-items-center">
							<h3 className="card-title mb-0">ユーザー管理システム</h3>
							<button 
								className="btn btn-success text-center"
								onClick={startCreate}
							>
								<i className="bi bi-plus-circle me-2"></i>
								新規追加
							</button>
						</div>
						
						{error && (
							<div className="alert alert-danger m-3">
								{error}
							</div>
						)}
						
						<UserList 
							users={users}
							loading={loading}
							onEdit={startEdit}
							onDelete={handleDeleteUser}
						/>
					</div>
				</div>
			</div>

			<UserModal 
				show={showModal}
				editingUser={editingUser}
				formData={formData}
				formErrors={formErrors}
				onClose={handleCloseModal}
				onSubmit={handleSubmit}
				onInputChange={handleInputChange}
			/>

			<ReactLogo />
		</div>
	);
}

export default App;
