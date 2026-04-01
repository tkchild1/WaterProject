import { useNavigate, useParams } from "react-router-dom";
import WelcomeBand from "../components/WelcomeBand";
import { useCart } from "../context/CartContext";
import type { CartItem } from "../types/CartItem";
import { useState } from "react";

function DonatePage() {
    const navigate = useNavigate();
    const { projectName, projectId } = useParams<{ projectName: string; projectId: string }>();
    const {addToCart} = useCart();
    const [donationAmount, setDonationAmount] = useState<number>(0);

    const handleAddToCart = () => {
        const newItem: CartItem = {
            projectId: Number(projectId),
            projectName: projectName || 'No project found',
            donationAmount
        };
        addToCart(newItem);
        navigate('/cart');
    }

    return (
        <>
        <WelcomeBand />
        <h2>Donate to {projectName}</h2>
        
        <div>
            <input type="number" placeholder="Enter donation amount" className="form-control mb-3" value={donationAmount} onChange={(e) => setDonationAmount(Number(e.target.value))} />
            <button className="btn btn-primary" onClick={handleAddToCart}>
                Donate Now
            </button>
        </div>

        <button className="btn btn-secondary" onClick={() => navigate(-1)}>
            Go Back
        </button>
        </>
    );
}

export default DonatePage;