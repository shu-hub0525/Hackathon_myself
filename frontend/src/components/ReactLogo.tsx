import React from 'react';
import logo from '../assets/logo.svg';

const ReactLogo: React.FC = () => {
	return (
		<>
			{/* Reactロゴ - 画面右下に固定 */}
			<div style={{
				position: 'fixed',
				bottom: '20px',
				right: '20px',
				zIndex: 1000,
				opacity: 1,
				transition: 'opacity 0.3s'
			}}
			onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
			onMouseLeave={(e) => e.currentTarget.style.opacity = '0.7'}
			>
				<img 
					src={logo} 
					alt="React Logo" 
					style={{
						width: '200px',
						height: '200px',
						animation: 'spin 20s linear infinite'
					}}
				/>
			</div>

			{/* CSSアニメーション */}
			<style>{`
				@keyframes spin {
					from { transform: rotate(0deg); }
					to { transform: rotate(360deg); }
				}
			`}</style>
		</>
	);
};

export default ReactLogo; 