import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import { useMutation, useQuery } from "react-query";
import { useSelector } from "react-redux";
import { FiCalendar, FiX, FiCheck, FiPackage, FiTruck, FiDollarSign } from 'react-icons/fi';
import { motion } from 'framer-motion';
import Modal from 'react-modal';

// Set modal root for accessibility
Modal.setAppElement('#root');

export default function BookingHistoryDetail() {
    const { bookingId } = useParams();
    const user = useSelector((state) => state.user);
    const [isActiveBooking, setIsActiveBooking] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Fetch booking data
    const { data: bookingData, isLoading, isError } = useQuery(
        ["booking-history", bookingId],
        () => axios.get(`http://localhost:9000/api/bookings/${bookingId}`).then(res => res.data),
        {
            onError: (err) => console.error(err.message)
        }
    );

    // Cancel booking mutation
    const { mutate: cancelBookingMutate } = useMutation(
        (status) => axios.put(`http://localhost:9000/api/bookings/${bookingId}`, status),
        {
            onSuccess: () => {
                setIsActiveBooking(false);
                setIsModalOpen(false);
                // Optionally refetch data here
            }
        }
    );

    // Format date
    const formatDate = (dateString) => {
        if (!dateString) return "N/A";
        const options = { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    // Handle cancel booking
    const handleCancelBooking = () => {
        cancelBookingMutate({ status: "Canceled" });
    };

    // Check if booking can be canceled
    useEffect(() => {
        if (bookingData?.status !== "Canceled") {
            const currentDate = new Date();
            const parsedPickupDate = new Date(bookingData?.pickUpDate);
            setIsActiveBooking(parsedPickupDate > currentDate);
        }
    }, [bookingData]);

    // Loading state
    if (isLoading) {
        return <LoadingContainer>Loading booking details...</LoadingContainer>;
    }

    // Error state
    if (isError) {
        return <ErrorContainer>Failed to load booking details. Please try again later.</ErrorContainer>;
    }

    // Booking status styles
    const getStatusStyles = (status) => {
        switch (status) {
            case "Canceled":
                return { color: "#ef4444", bg: "#fee2e2", icon: <FiX /> };
            case "Completed":
                return { color: "#10b981", bg: "#d1fae5", icon: <FiCheck /> };
            case "In progress":
                return { color: "#3b82f6", bg: "#dbeafe", icon: <FiTruck /> };
            default:
                return { color: "#f59e0b", bg: "#fef3c7", icon: <FiCalendar /> };
        }
    };

    const statusStyles = getStatusStyles(bookingData?.status);

    return (
        <Container>
            <Header>
                <h1>Booking Details</h1>
                <StatusBadge style={{ backgroundColor: statusStyles.bg, color: statusStyles.color }}>
                    {statusStyles.icon}
                    <span>{bookingData?.status}</span>
                </StatusBadge>
            </Header>

            <ContentGrid>
                <Section>
                    <SectionTitle>
                        <FiPackage />
                        <h2>Items</h2>
                    </SectionTitle>
                    <InfoText>Booking Date: {formatDate(bookingData?.bookingDate)}</InfoText>
                    
                    <ItemsGrid>
                        {bookingData?.items.map((item, index) => (
                            <ItemCard key={index}>
                                <ItemName>{item.priceName}</ItemName>
                                <ItemDetails>
                                    <div>
                                        <FiDollarSign />
                                        <span>{item.price.toFixed(2)}</span>
                                    </div>
                                    <div>
                                        <span>Qty: {item.quantity}</span>
                                    </div>
                                    <div>
                                        <span>Total: ${item.totalUnitPrice.toFixed(2)}</span>
                                    </div>
                                </ItemDetails>
                            </ItemCard>
                        ))}
                    </ItemsGrid>

                    <TotalPrice>
                        <span>Total ({bookingData?.items.length} items)</span>
                        <span>${bookingData?.itemsTotalPrice.toFixed(2)}</span>
                    </TotalPrice>
                </Section>

                <Section>
                    <SectionTitle>
                        <FiTruck />
                        <h2>Schedule</h2>
                    </SectionTitle>
                    
                    <ScheduleItem>
                        <h3>Pickup Date</h3>
                        <p>{formatDate(bookingData?.pickUpDate)}</p>
                    </ScheduleItem>
                    
                    <ScheduleItem>
                        <h3>Delivery Date</h3>
                        <p>{formatDate(bookingData?.deliveryDate)}</p>
                    </ScheduleItem>
                </Section>
            </ContentGrid>

            {isActiveBooking && (
                <CancelButton 
                    onClick={() => setIsModalOpen(true)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                >
                    Cancel Booking
                </CancelButton>
            )}

            {/* Confirmation Modal */}
            <Modal
                isOpen={isModalOpen}
                onRequestClose={() => setIsModalOpen(false)}
                style={customModalStyles}
                contentLabel="Cancel Booking Confirmation"
            >
                <ModalContent>
                    <h2>Cancel Booking?</h2>
                    <p>Are you sure you want to cancel this booking? This action cannot be undone.</p>
                    
                    <ModalButtons>
                        <SecondaryButton onClick={() => setIsModalOpen(false)}>
                            Go Back
                        </SecondaryButton>
                        <PrimaryButton onClick={handleCancelBooking}>
                            Confirm Cancellation
                        </PrimaryButton>
                    </ModalButtons>
                </ModalContent>
            </Modal>
        </Container>
    );
}

// Modal styles
const customModalStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        maxWidth: '500px',
        width: '90%',
        borderRadius: '12px',
        border: 'none',
        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
        padding: '2rem'
    },
    overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        backdropFilter: 'blur(4px)'
    }
};

// Styled Components
const Container = styled.div`
    padding: 2rem;
    max-width: 1200px;
    margin: 4rem auto;
`;

const LoadingContainer = styled.div`
    padding: 2rem;
    text-align: center;
    color: #64748b;
`;

const ErrorContainer = styled.div`
    padding: 2rem;
    text-align: center;
    color: #ef4444;
    background-color: #fee2e2;
    border-radius: 8px;
    margin: 2rem;
`;

const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;

    h1 {
        font-size: 1.75rem;
        color: #1e293b;
        font-weight: 700;
    }
`;

const StatusBadge = styled.div`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 1rem;
    border-radius: 20px;
    font-weight: 600;
    font-size: 0.9rem;

    svg {
        font-size: 1rem;
    }
`;

const ContentGrid = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    gap: 2rem;

    @media (min-width: 768px) {
        grid-template-columns: 2fr 1fr;
    }
`;

const Section = styled.section`
    background: white;
    border-radius: 12px;
    padding: 1.5rem;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const SectionTitle = styled.div`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 1.5rem;
    color: #334155;

    h2 {
        font-size: 1.25rem;
        font-weight: 600;
    }

    svg {
        font-size: 1.25rem;
    }
`;

const InfoText = styled.p`
    color: #64748b;
    font-size: 0.9rem;
    margin-bottom: 1rem;
`;

const ItemsGrid = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    gap: 1rem;
    margin-bottom: 1.5rem;

    @media (min-width: 480px) {
        grid-template-columns: repeat(2, 1fr);
    }

    @media (min-width: 768px) {
        grid-template-columns: 1fr;
    }

    @media (min-width: 1024px) {
        grid-template-columns: repeat(2, 1fr);
    }
`;

const ItemCard = styled.div`
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    padding: 1rem;
    transition: all 0.2s ease;

    &:hover {
        border-color: #34CCA1;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    }
`;

const ItemName = styled.h3`
    font-size: 1rem;
    font-weight: 600;
    color: #1e293b;
    margin-bottom: 0.5rem;
`;

const ItemDetails = styled.div`
    display: flex;
    justify-content: space-between;
    font-size: 0.9rem;
    color: #475569;

    div {
        display: flex;
        align-items: center;
        gap: 0.25rem;
    }

    svg {
        font-size: 0.8rem;
    }
`;

const TotalPrice = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 1rem;
    background-color: #f8fafc;
    border-radius: 8px;
    font-weight: 600;
    font-size: 1.1rem;
    color: #1e293b;
`;

const ScheduleItem = styled.div`
    margin-bottom: 1.5rem;

    h3 {
        font-size: 0.9rem;
        color: #64748b;
        margin-bottom: 0.25rem;
        font-weight: 500;
    }

    p {
        font-size: 1rem;
        color: #1e293b;
        font-weight: 500;
    }
`;

const CancelButton = styled(motion.button)`
    margin-top: 2rem;
    padding: 0.875rem 1.5rem;
    background-color: #fff;
    color: #ef4444;
    border: 1px solid #ef4444;
    border-radius: 8px;
    font-weight: 600;
    font-size: 1rem;
    cursor: pointer;
    transition: all 0.2s ease;
    display: block;
    margin-left: auto;

    &:hover {
        background-color: #fee2e2;
    }
`;

const ModalContent = styled.div`
    h2 {
        font-size: 1.5rem;
        color: #1e293b;
        margin-bottom: 1rem;
    }

    p {
        color: #64748b;
        margin-bottom: 2rem;
        line-height: 1.5;
    }
`;

const ModalButtons = styled.div`
    display: flex;
    justify-content: flex-end;
    gap: 1rem;
`;

const BaseButton = styled.button`
    padding: 0.75rem 1.5rem;
    border-radius: 8px;
    font-weight: 600;
    font-size: 0.95rem;
    cursor: pointer;
    transition: all 0.2s;
`;

const PrimaryButton = styled(BaseButton)`
    background-color: #ef4444;
    color: white;
    border: none;

    &:hover {
        background-color: #dc2626;
    }
`;

const SecondaryButton = styled(BaseButton)`
    background-color: white;
    color: #64748b;
    border: 1px solid #e2e8f0;

    &:hover {
        background-color: #f8fafc;
    }
`;