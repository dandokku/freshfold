// import React from 'react'

// function BookingHistory() {
//   return (
//     <div className="">BookingHistory</div>
//   )
// }

// export default BookingHistory


import React from "react";
import styled from "styled-components";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";

export default function BookingHistory({ sidebar, setOpenSideBar }) {

    // ========== Getting the user state from redux store
    let user = useSelector((state) => state.user);
    // console.log("Side bar: ", props.sidebar);
    // console.log("sidebar: ", sidebar)

    // ======== Function to make an axios request to get the history for a particular user
    async function getHistory(userId){
        const response = await axios.get(`http://localhost:9000/api/bookings/user/${userId}`);
        return response.data;
    }

    // ========= Function to format the date from the input field
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


    // console.log("userId: ", user?.id)

    // ======== useQuery to fetch the details of the user
    const { data: bookingData} = useQuery("booking", () => getHistory(user?.id), {
        // * Here i set the enabled property of the useQuery configuration object to be true of false based on the whether the user?.id is null 
        // NB we are doing this so that when the user?.id is not active or is not null yet we dont trigger the fetch bookings because we would end up sending a null id to the server, which will not work.
        enabled: user?.id !== null ? true : false
    });
    // console.log({bookingData})

    // ======== Define the allBookings variable
    let allBookings;

    // ======== Displaying the booking Data to the user
    // * So i check if the booking data exist then i map through it and return a component
    if(bookingData){
        allBookings = bookingData?.map(booking => {
            return <Link to={`/profile/history/${booking._id}`} style={{textDecoration: "none"}}>
             <div>
                <div>
                  
                    <div>
                        {/* // ! i also check the length of the item and based on that render the name of the first item and then the length or i render the name of the item only */}
                        {
                            booking.items.length > 1 ? <p style={{color: gray, fontWeight: "600"}}>{booking.items[0].label} and {booking.items.length - 1} more</p> : <p style={{color: gray, fontWeight: "600"}}>{booking.items[0].label}</p>
                        }
                        {/* //* I also format and render the bookingDate */}
                        <p>{formatDate(booking.bookingDate)}</p>
                    </div>
                </div>
                <div>
                    {/* // NB based on the status in the db i render the status with a corresponding background color */}
                    <p style={{padding: "0.8rem 1rem", background:
                    booking.status === "Pending"
                      ? "#FB9F06"
                      : booking.status === "In progress"
                      ? "#0CE40C"
                      : booking.status === "Completed"
                      ? "#1CACF4"
                      : "red", color: "#fff", borderRadius: borderRad}}>{booking.status}</p>
                    <h4>${booking.itemsTotalPrice}</h4>
                </div>
            </div>
            </Link>
           
        })
    
    }
   
    return (
        <div>
           <div className="top">
                <h1>Booking History</h1>
                <div>
                    <div>
                        <img src={user.userImage} alt=""></img>
                    </div>    
                            
                    <div>
                        <p>{user.firstName} {user.lastName}</p>
                        <p>{user.email}</p>
                    </div>
                </div>
            </div>
            <div>
                {/* // ! Here i display all the bookings */}
                {allBookings}
            </div>
        </div>
    )
}

// 283659
