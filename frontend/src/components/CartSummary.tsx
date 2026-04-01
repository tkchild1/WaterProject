import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const CartSummary = () => {
    const navigate = useNavigate();
    const { cart } = useCart();
    const totalAmount = cart.reduce((total, item) => total + item.donationAmount, 0);

    return (
        <div style={{
            position: 'fixed',
            top: '20px',
            right: '20px',
            backgroundColor: '#f8f9fa',
            border: '1px solid #dee2e6',
            boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
            padding: '15px',
            borderRadius: '8px',
            zIndex: 1000,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            width: 'fit-content',
        }}
        onClick={() => navigate('/cart')}
        ><strong>{totalAmount.toFixed(2)}</strong></div>
    );
}

export default CartSummary;