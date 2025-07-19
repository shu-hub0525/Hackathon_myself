import React from 'react';
import { User, UserForm, FormErrors } from '../types/User';

interface UserModalProps {
	show: boolean;
	editingUser: User | null;
	formData: UserForm;
	formErrors: FormErrors;
	onClose: () => void;
	onSubmit: (e: React.FormEvent) => void;
	onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const UserModal: React.FC<UserModalProps> = ({
	show,
	editingUser,
	formData,
	formErrors,
	onClose,
	onSubmit,
	onInputChange
}) => {
	if (!show) return null;

	return (
		<div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
			<div className="modal-dialog modal-dialog-centered">
				<div className="modal-content">
					<div className="modal-header">
						<h5 className="modal-title">
							<i className="bi bi-person-plus me-2"></i>
							{editingUser ? '編集' : '新規作成'}
						</h5>
						<button 
							type="button" 
							className="btn-close" 
							onClick={onClose}
						></button>
					</div>
					<form onSubmit={onSubmit}>
						<div className="modal-body">
							<div className="mb-3">
								<label htmlFor="name" className="form-label">
									<i className="bi bi-person me-2"></i>
									名前 <span className="text-danger">*</span>
								</label>
								<input
									type="text"
									className={`form-control ${formErrors.name ? 'is-invalid' : ''}`}
									id="name"
									placeholder="例: 田中太郎"
									name="name"
									value={formData.name}
									onChange={onInputChange}
									required
								/>
								{formErrors.name && (
									<div className="invalid-feedback">{formErrors.name}</div>
								)}
							</div>
							<div className="mb-3">
								<label htmlFor="age" className="form-label">
									<i className="bi bi-calendar me-2"></i>
									年齢 <span className="text-danger">*</span>
								</label>
								<input
									type="number"
									className={`form-control ${formErrors.age ? 'is-invalid' : ''}`}
									id="age"
									placeholder="例: 25"
									name="age"
									value={formData.age}
									onChange={onInputChange}
									min="1"
									max="150"
									required
								/>
								{formErrors.age && (
									<div className="invalid-feedback">{formErrors.age}</div>
								)}
							</div>
						</div>
						<div className="modal-footer">
							<button 
								type="button" 
								className="btn btn-secondary text-center" 
								onClick={onClose}
							>
								<i className="bi bi-x-circle me-2"></i>
								キャンセル
							</button>
							<button type="submit" className="btn btn-primary text-center">
								<i className="bi bi-check-circle me-2"></i>
								{editingUser ? '更新' : '作成'}
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default UserModal; 