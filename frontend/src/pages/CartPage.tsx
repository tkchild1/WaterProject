import { useNavigate } from "react-router-dom";
import { useCart } from "../context/cartContext";

function CartPage() {
    const navigate = useNavigate();
    const { cart, removeFromCart } = useCart();
    return (
        <div>
            <h2>Cart Page</h2>
            <div>
                {cart.length === 0 ? (
                    <p>Your cart is empty.</p>
                ) : (
                    <ul>
                        {cart.map((item) => (
                            <li key={item.projectId}>
                                <strong>{item.projectName}</strong> - ${item.donationAmount.toFixed(2)}
                                <button onClick={() => removeFromCart(item.projectId)} className="btn btn-danger btn-sm ml-2">Remove</button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            <h3>Total: </h3>
            <button>Checkout</button>
            <button onClick={() => navigate('/projects')} >Continue Browsing</button>
        </div>
    );

}

export default CartPage;