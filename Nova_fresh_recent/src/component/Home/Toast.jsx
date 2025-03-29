import React from 'react';
import { useWishlist } from '../Home/WishlistContext';

const Toast = () => {
  const { toast } = useWishlist();

  if (!toast.show) return null;

  return (
    <div 
      style={{
        position: 'fixed',
        top: '20px',
        right: '20px',
        padding: '12px 20px',
        borderRadius: '4px',
        backgroundColor: toast.type === 'success' ? '#4CAF50' : '#F44336',
        color: 'white',
        boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        maxWidth: '300px',
        animation: 'slideIn 0.3s ease-out forwards'
      }}
    >
      <span style={{ fontSize: '14px', fontWeight: '500' }}>{toast.message}</span>
      <style jsx>{`
        @keyframes slideIn {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default Toast;