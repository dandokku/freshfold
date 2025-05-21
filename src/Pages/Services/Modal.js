import React, {useState} from "react";
import styled from "styled-components";
import { MdOutlineClear } from "react-icons/md";
import { FiCheckCircle } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Modal({ isOpen, onClose, totalPriceItems, bookingDetails, onSubmit }) {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    // Calculate total price and create item elements
    const totalPrice = totalPriceItems?.reduce((sum, item) => sum + item.totalUnitPrice, 0) || 0;
    
    const verifiedItems = totalPriceItems?.map(item => (
        <Item key={item.priceName}>
            <ItemName>{item.priceName}</ItemName>
            <ItemDetails>
                <span>{item.quantity} × ${item.price.toFixed(2)}</span>
                <ItemTotal>${item.totalUnitPrice.toFixed(2)}</ItemTotal>
            </ItemDetails>
        </Item>
    ));

    const handleVerifyBooking = async () => {
        setLoading(true);
    try {
        const response = await fetch("http://localhost:9000/api/bookings", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                firstName: bookingDetails.firstName,
                lastName: bookingDetails.lastName,
                email: bookingDetails.email,
                phoneNo: bookingDetails.phoneNo,
                address: bookingDetails.address,
                pickUpDate: bookingDetails.pickUpDate,
                deliveryDate: bookingDetails.deliveryDate,
                items: totalPriceItems,
                itemsTotalPrice: totalPrice
            })
        });

        if (!response.ok) throw new Error("Booking failed");

        toast.success("Booking verified successfully!", {
            position: "top-right",
            autoClose: 3000,
        });

        onSubmit && onSubmit();
        onClose();
    } catch (err) {
        toast.error("Booking failed: " + err.message);
    } finally {
    setLoading(false);
  }
};


    if (!isOpen) return null;

    return (
        <ModalOverlay>
            <ModalContainer>
                <ModalHeader>
                    <div>
                        <FiCheckCircle className="icon" />
                        <h2>Review Your Order</h2>
                    </div>
                    <CloseButton onClick={onClose}>
                        <MdOutlineClear size={24} />
                    </CloseButton>
                </ModalHeader>

                <ModalBody>
                    <BookingSummary>
                        <SummaryItem>
                            <span>Service:</span>
                            <span>{bookingDetails?.serviceName}</span>
                        </SummaryItem>
                        <SummaryItem>
                            <span>Pickup Date:</span>
                            <span>{bookingDetails?.pickUpDate?.toLocaleDateString()}</span>
                        </SummaryItem>
                        <SummaryItem>
                            <span>Delivery Date:</span>
                            <span>{bookingDetails?.deliveryDate?.toLocaleDateString()}</span>
                        </SummaryItem>
                    </BookingSummary>

                    <ItemsList>
                        <ItemsHeader>
                            <span>Item</span>
                            <span>Price</span>
                        </ItemsHeader>
                        {verifiedItems}
                    </ItemsList>

                    <TotalPrice>
                        <span>Total ({totalPriceItems?.length} items)</span>
                        <span>${totalPrice.toFixed(2)}</span>
                    </TotalPrice>
                </ModalBody>

                <ModalFooter>
                    <SecondaryButton onClick={onClose}>
                        Back to Edit
                    </SecondaryButton>
                    <PrimaryButton onClick={handleVerifyBooking} disabled={loading}>
  {loading ? "Processing..." : "Confirm Booking"}
</PrimaryButton>

                </ModalFooter>
            </ModalContainer>
        </ModalOverlay>
    );
}

// Styled Components
const ModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
    backdrop-filter: blur(4px);
    animation: fadeIn 0.3s ease-out;

    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
`;

const ModalContainer = styled.div`
    background-color: white;
    border-radius: 12px;
    width: 90%;
    max-width: 600px;
    max-height: 80vh;
    display: flex;
    flex-direction: column;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    animation: slideUp 0.3s ease-out;

    @keyframes slideUp {
        from { transform: translateY(20px); opacity: 0; }
        to { transform: translateY(0); opacity: 1; }
    }
`;

const ModalHeader = styled.div`
    padding: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #f0f0f0;
    background-color: #f9fafb;

    div {
        display: flex;
        align-items: center;
        gap: 10px;
    }

    h2 {
        margin: 0;
        font-size: 1.25rem;
        font-weight: 600;
        color: #1f2937;
    }

    .icon {
        color: #10b981;
        font-size: 1.5rem;
    }
`;

const CloseButton = styled.button`
    background: none;
    border: none;
    cursor: pointer;
    color: #6b7280;
    padding: 5px;
    border-radius: 50%;
    transition: all 0.2s;

    &:hover {
        background-color: #f3f4f6;
        color: #4b5563;
    }
`;

const ModalBody = styled.div`
    padding: 20px;
    overflow-y: auto;
    flex-grow: 1;
`;

const BookingSummary = styled.div`
    background-color: #f9fafb;
    border-radius: 8px;
    padding: 16px;
    margin-bottom: 20px;
`;

const SummaryItem = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 8px;
    font-size: 0.95rem;

    &:last-child {
        margin-bottom: 0;
    }

    span:first-child {
        color: #6b7280;
        font-weight: 500;
    }

    span:last-child {
        color: #1f2937;
        font-weight: 600;
    }
`;

const ItemsList = styled.div`
    margin-bottom: 20px;
`;

const ItemsHeader = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 10px 0;
    border-bottom: 1px solid #e5e7eb;
    margin-bottom: 10px;
    font-weight: 600;
    color: #374151;
    font-size: 0.95rem;
`;

const Item = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 12px 0;
    border-bottom: 1px solid #f3f4f6;

    &:last-child {
        border-bottom: none;
    }
`;

const ItemName = styled.span`
    font-weight: 500;
    color: #1f2937;
`;

const ItemDetails = styled.div`
    display: flex;
    gap: 20px;
`;

const ItemTotal = styled.span`
    font-weight: 600;
    color: #1f2937;
    min-width: 80px;
    text-align: right;
`;

const TotalPrice = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 16px;
    background-color: #f9fafb;
    border-radius: 8px;
    font-weight: 600;
    font-size: 1.1rem;
    color: #1f2937;
`;

const ModalFooter = styled.div`
    padding: 16px 20px;
    display: flex;
    gap: 12px;
    justify-content: flex-end;
    border-top: 1px solid #f0f0f0;
    background-color: #f9fafb;
`;

const BaseButton = styled.button`
    padding: 10px 20px;
    border-radius: 8px;
    font-weight: 500;
    font-size: 0.95rem;
    cursor: pointer;
    transition: all 0.2s;
    border: 1px solid transparent;
`;

const PrimaryButton = styled(BaseButton)`
    background-color: #10b981;
    color: white;

    &:hover {
        background-color: #059669;
    }

    &:active {
        background-color: #047857;
    }
`;

const SecondaryButton = styled(BaseButton)`
    background-color: white;
    color: #4b5563;
    border-color: #d1d5db;

    &:hover {
        background-color: #f9fafb;
        border-color: #9ca3af;
    }

    &:active {
        background-color: #f3f4f6;
    }
`;