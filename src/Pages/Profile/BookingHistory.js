import React from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";

export default function BookingHistory({ sidebar, setOpenSideBar }) {

    // ========== Getting the user state from redux store
    let user = useSelector((state) => state.user);

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

    // ======== useQuery to fetch the details of the user
    const { data: bookingData} = useQuery("bookings-caches", () => getHistory(user?.id), {
        // * Here i set the enabled property of the useQuery configuration object to be true of false based on the whether the user?.id is null 
        // NB we are doing this so that when the user?.id is not active or is not null yet we dont trigger the fetch bookings because we would end up sending a null id to the server, which will not work.
        enabled: user?.id !== null ? true : false
    });

    // ======== Define the allBookings variable
    let allBookings;

    // ======== Displaying the booking Data to the user
    // * So i check if the booking data exist then i map through it and return a component
    if(bookingData){
        allBookings = bookingData?.map(booking => {
            return <Link to={`/profile/history/${booking._id}`} >
             <div className="flex items-center justify-between hover:shadow-md shadow-sm rounded-md bg-shadColor p-4 mb-5">
                <div>
                  
                    <div>
                        {/* // ! i also check the length of the item and based on that render the name of the first item and then the length or i render the name of the item only */}
                        {
                            booking.items.length > 1 ? <p className="text-xl text-textColor font-bold">{booking.items[0].label} and {booking.items.length - 1} more</p> : <p style={{fontWeight: "600"}}>{booking.items[0].label}</p>
                        }
                        {/* //* I also format and render the bookingDate */}
                        <p>{formatDate(booking.bookingDate)}</p>
                    </div>
                </div>
                <div className="flex items-center gap-3 flex-row-reverse">
                    <p className="w-max" style={{padding: "0.8rem 1rem", background:
                    booking.status === "Pending" ? "#8ac5b4"
                      : booking.status === "In progress" ? "#6aaa98"
                      : booking.status === "Completed" ? "#33cca1"
                      : "cyan", color: "#fff", borderRadius: "10px"}}>{booking.status}</p>
                    <h4>${booking.itemsTotalPrice}</h4>
                </div>
            </div>
            </Link>
           
        })
    
    }
   
    return (
        <div className="pt-28 p-24">
            <h1 className="md:text-3xl font-bold text-headerTextColor mb-11 text-center">Booking History</h1>
            <div className="">
                {allBookings}
            </div>
        </div>
    )
}
