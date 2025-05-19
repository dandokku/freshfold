import React from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import { useMutation, useQuery } from "react-query";
import { useSelector, useDispatch } from "react-redux";

// TODO This file is for the individual history page that will be rendered when it is clicked in the BookingHistory.js page

export default function History() {

    // ========= Getting the bookingId from the useParams
    const { bookingId } = useParams();

    // ========== Getting the user state from redux store
    let user = useSelector((state) => state.user);

    // ========== State to hold whether the booking is current and not cancelled
    const [isActiveBookng, setIsActiveBooking] = React.useState(false);


    // ======== Function to make an axios request to get the bookingHistory based on the id

    async function getHistory(bookingId){
        const response = await axios.get(`http://localhost:9000/api/bookings/${bookingId}`);
        return response.data;
    }

    // ======== Function to make an axios request to cancel the booking

    async function cancelBooking(status){
        const response = await axios.put(`http://localhost:9000/api/bookings/${bookingId}`, status);
        return response.data
    }


    // ======== useQuery hook to get individual bookingData
    const { data: bookingData} = useQuery("booking-history", () => getHistory(bookingId), {
        onError: (err) => {
            console.log(err.message)
        }
    });

    // ======== useMutation hook to cancel and update the booking
    const {mutate : cancelBookingMutate, data} = useMutation(cancelBooking,{
        onSuccess: () => {
            // * onSuccess i i set the isBookingActive to false, this will help me make sure that the booking is no longer active and is cancelled
            setIsActiveBooking(false)
            setModalOpenClass("popup-modal")
        }
    });
    // console.log(bookingData);

    // ========== Function to convert the date
    function formatDate(date) {
        if (!(date instanceof Date)) {
          date = new Date(date);
        }
      
        if (isNaN(date.getTime())) {
          return "Invalid Date";
        }
      
        const months = [
          "January", "February", "March", "April", "May", "June", "July",
          "August", "September", "October", "November", "December"
        ];
      
        const day = date.getDate();
        const month = date.getMonth();
        const year = date.getFullYear();
      
        const formatted = `${months[month]} ${day}, ${year}`;
        return formatted;
      }


    // hasPickupDatePassed(bookingData?.pickUpDate);
    //   ========= Function to handle cancelling of the booking
    function handleCancelbooking() {
        // * Here i set the request body status key to "Cancelled" and then in my server i update it
        cancelBookingMutate({
            status: "Canceled"
        });
        // console.log("clicked cancel")
    }

    // ======== State to determine whether the modal is closed or opened
    const [modalOpenClass, setModalOpenClass] = React.useState("popup-modal");

    // ======== UseEffect to make sure to display the cancel button or not
    React.useEffect(() => {
        // * So how this works is that i want the user to be able to cancel a booking if and only if the clothese has not been picked up, meaning i have to check if the current Date to cancel the booking is not greater than the pickup date, if it is greater than the pickup Date then the clothes have been picked and the user cannot cancel it.
        // NB so i check if the Status is not cancelled
        if(bookingData?.status !== "Canceled"){
            // NB Then i get the currrent Date
            const currentDate = new Date(); // Get the current date and time
            // NB Parse the pickup date string
            const parsedPickupDate = new Date(bookingData?.pickUpDate); 
          
            // Nb Compare the pickupDate with the currentDate
            if (parsedPickupDate > currentDate) {
            //   NB if the pick up is greater than the currentDate meaning the clothes have not been picked up yet we can then set the booking to active and then the user can cancel the booking.
              setIsActiveBooking(true);
            } 
            // else {
            //   // The pickupDate is on or after the current date
            //   return false;
            // }
        }
        else{
            // NB We set it to active since it is cancel already
            setIsActiveBooking(false);
        }
        
    }, [bookingData])

    return (
        <Container className="pt-20">
            <BookingData>
                <div>
                    <h2 style={{color: secondary, fontSize: "1.4rem"}}>Items</h2>
                    <p>Booking Date: {formatDate(bookingData?.bookingDate)}</p>
                    <main>
                        {
                            bookingData?.items.map(item => {
                            return <Items>
                                    <p>Name: {item.label}</p>
                                    <p>Price: {item.price}</p>
                                    <p>Quantity: {item.quantity}</p>
                                    <p>Total: ${item.totalUnitPrice}</p>
                                </Items>
                            })
                        }
                    </main>
                        
                </div>
                {/* <h4>Total Price: ${bookingData.itemsTotalPrice}</h4> */}

                <div>
                    <h2 style={{color: secondary, fontSize: "1.4rem"}}>PickUp and Delivery Dates</h2>
                    <p>Pickup Date: {formatDate(bookingData?.pickUpDate)}</p>
                    <p>Delivery Date: {formatDate(bookingData?.deliveryDate)}</p>
                </div>
            </BookingData>
            <div>
                {/* // ! Checking if the isActiveBooking is true if so we then render the cancel booking button */}
                {
                    isActiveBookng && <PricesDiv2>
                    <span className="btn-mask">Cancel Booking</span>
                    <button onClick={() => setModalOpenClass("popup-modal active")}>Cancel Booking</button>
                    </PricesDiv2>
                }        
            </div>
            <ServiceModal className={modalOpenClass}>

        <PopUpModal className="modal">
            <h2 style={{marginBottom: "1rem", color: gray}}>Are you sure you want to delete this price item?</h2>
            <div className="btn-controls">
                <button onClick={() => setModalOpenClass("popup-modal")}>Cancel</button>
                <button onClick={handleCancelbooking}>Delete</button>
            </div>
        </PopUpModal>

        </ServiceModal>
        </Container>
    )
}

const primary = "#34CCA1";
const secondary = "#34CCA1";
// const bg = "#F4F4F4";
const borderRad = "5px";
const yellowBtnHover = "#f7cb39";
const gray = "#04040A";

const Container = styled.div`
    margin-left: 17rem;
    flex: 1;

    .popup-modal.active{
        scale: 1;
        transition: all .3s ease-in-out;
    }

    
    .top{
        display: flex;
        justify-content: space-between;
        /* background: linear-gradient( 90deg , ${secondary} 50%, #FC8C04, #FCC434 , #FC9c04); */
        padding: 2rem;
        box-shadow: 0px 4px 10px -2px rgba(240, 240, 240);
        align-items: center;

        h1{
            color: ${secondary};
            font-weight: 600;

            @media screen and (max-width: 700px) {
                font-size: 1.2rem;
            }
        }

        >div{
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 0.9rem;

        @media screen and (max-width: 930px) {
            display: none;
        }

    div{
        flex: .5;
        text-align: start;


        img{
            width: 60px;
            height: 60px;
            border-radius: 50%;
        }

        p:first-child{
            font-weight: 600;
            font-size: 1rem;
            color: ${secondary};
        }
        p:last-child{
            font-size: 0.9rem;
        }
    }

    div:last-child{
        @media screen and (max-width: 930px) {
            display: none;
            left: 60%;
        }
    }
    
    }
    }
`

const BookingData = styled.div`
    padding: 2rem;
    div{
        margin-bottom: 2rem;
    }

    main{
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        margin-top: 1.2rem;

        div{
            flex: .5;
        }
    }
`

const Items = styled.div`
    /* margin-bottom: 2rem; */
`

const PricesDiv2 = styled.div`
    width: 100%;
    flex: .5;
    padding: 0.3rem 0;
    position: relative;
    font-size: 1rem;
    text-align: center;
    margin: 0;


    @media screen and (max-width: 500px) {
        font-size: 0.9rem;
    }

    .btn-mask{
        border-radius: ${borderRad};
        position: absolute;
        color: red;
        text-align: center;
        position: absolute;
        border: solid 2px red;
        text-decoration: none;
        padding: 11px 20px;
        top: 50%;
        transform: translateY(-50%);
        width: 50%;

        @media (max-width: 900px){
            width: 100%;
        }
    }

    button{
        width: 50%;
        position: relative;
        text-decoration: none;
        color: #fff;
        background:red;
        padding: 11px 20px;
        -webkit-mask-size: 3000% 100%;
        mask-size: 3000% 100%;
        border: solid 2px red;
        border-radius: ${borderRad};
        cursor: pointer;
        -webkit-animation: ani2 0.7s steps(29) forwards;
        animation: ani2 0.7s steps(29) forwards;
        font-size: 1rem;
        font-family: poppins;

        @media (max-width: 900px){
            width: 100% !important;
        }

        @media screen and (max-width: 500px) {
            font-size: 0.9rem;
        }

    &:hover{
        -webkit-animation: ani 0.7s steps(29) forwards;
        animation: ani 0.7s steps(29) forwards;
    }


    @keyframes ani {
        from{
            -webkit-mask-position: 0 0;
            mask-position: 0 0;
        }
        to{
            -webkit-mask-position: 100% 0;
            mask-position: 100% 0%;
        }
    }

    @keyframes ani2{
        from{
            -webkit-mask-position: 100% 0;
            mask-position: 100% 0;
        }
        to{
            -webkit-mask-position: 0 0;
            mask-position: 0 0;
        }
    }

    
    }


    

`

const ServiceModal = styled.div`
    position: fixed;
    z-index: 999999999999999999999;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    scale: 0;
    transition: all .3s ease-in-out;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
`

const PopUpModal = styled.div`
    background-color: #fff;
    border-radius: ${borderRad};
    width: 50%;
    padding: 1rem;
    max-height: 450px;
    overflow: auto;

    @media screen and (max-width: 1000px) {
        width: 80%;
    }

    @media screen and (max-width: 515px) {
        width: 90%;
    }

    @media screen and (max-width: 415px) {
        width: 95%;
    }

    
        .btn-controls{
            display: flex;
            align-items: center;
            gap: 1rem;

            button:first-child{
                background-color: ${secondary};
                padding: 0.4rem 1.2rem;
                outline: none;
                border: none;
                color: #fff;
                border-radius: ${borderRad};
                cursor: pointer;
                &:hover{
                    background-color: ${yellowBtnHover};
                }
            }

            button:last-child{
                background-color: red;
                padding: 0.4rem 1.2rem;
                outline: none;
                border: none;
                color: #fff;
                border-radius: ${borderRad};
                cursor: pointer;

                &:hover{
                    background-color: tomato;
                }
            }
        }

        &::-webkit-scrollbar {
        width: 10px;
        height: 12px;
      }

      /* Track */
      &::-webkit-scrollbar-track {
        background: #f1f1f1;
      }

      /* Handle */
      &::-webkit-scrollbar-thumb {
        background: #C1C1C1;
        border-radius: 6px;
      }

      /* Handle on hover */
      &::-webkit-scrollbar-thumb:hover {
        background: #858488;
      }
`
