import React from 'react';
import { User } from '../types/User';

interface UserListProps {
	users: User[] | null;
	loading: boolean;
	onRefresh?: () => void;
	onEdit: (user: User) => void;
	onDelete: (userId: number) => void;
}

const UserList: React.FC<UserListProps> = ({ 
	users, 
	loading, 
	onRefresh, 
	onEdit, 
	onDelete 
}) => {
	return (
		<div className="card-body">
			{/* ユーザー一覧 */}
			{onRefresh && (
				<div className="mb-3">
					<button 
						className="btn btn-primary text-center" 
						onClick={onRefresh}
						disabled={loading}
					>
						{loading ? (
							<>
								<span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
								更新中...
							</>
						) : (
							<>
								<i className="bi bi-arrow-clockwise me-2"></i>
								一覧更新
							</>
						)}
					</button>
				</div>
			)}
			
			{users && users.length > 0 ? (
				<div className="table-responsive">
					<table className="table table-striped table-hover">
						<thead className="table-dark">
							<tr>
								<th>ID</th>
								<th>名前</th>
								<th>年齢</th>
								<th>操作</th>
							</tr>
						</thead>
						<tbody>
							{users.map((user) => (
								<tr key={user.id}>
									<td>{user.id}</td>
									<td><strong>{user.name}</strong></td>
									<td>{user.age}</td>
									<td>
										<button 
											className="btn btn-warning btn-sm me-2 text-center"
											onClick={() => onEdit(user)}
										>
											<i className="bi bi-pencil me-1"></i>
											編集
										</button>
										<button 
											className="btn btn-danger btn-sm text-center"
											onClick={() => onDelete(user.id)}
										>
											<i className="bi bi-trash me-1"></i>
											削除
										</button>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			) : (
				<div className="alert alert-info text-center">
					<i className="bi bi-info-circle me-2"></i>
					データが登録されていません。新規追加してください。
				</div>
			)}
		</div>
	);
};

export default UserList; 