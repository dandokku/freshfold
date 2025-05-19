import React from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { FiClock, FiCheckCircle, FiTruck, FiDollarSign } from "react-icons/fi";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function BookingHistory() {
  const user = useSelector((state) => state.user);

  // Fetch booking history
  const { data: bookingData, isLoading, isError } = useQuery(
    ["bookings", user?.id],
    () => axios.get(`http://localhost:9000/api/bookings/user/${user?.id}`).then(res => res.data),
    {
      enabled: !!user?.id,
      staleTime: 1000 * 60 * 5 // 5 minutes
    }
  );

  // Format date
  const formatDate = (dateString) => {
    const options = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Get status color and icon
  const getStatusStyles = (status) => {
    switch (status) {
      case "Pending":
        return { bg: "bg-amber-100", text: "text-amber-800", icon: <FiClock className="mr-2" /> };
      case "In progress":
        return { bg: "bg-blue-100", text: "text-blue-800", icon: <FiTruck className="mr-2" /> };
      case "Completed":
        return { bg: "bg-green-100", text: "text-green-800", icon: <FiCheckCircle className="mr-2" /> };
      default:
        return { bg: "bg-gray-100", text: "text-gray-800", icon: null };
    }
  };

  // Loading skeleton
  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-8">Booking History</h1>
        {[...Array(3)].map((_, i) => (
          <div key={i} className="bg-white rounded-lg shadow-sm p-6 mb-4">
            <Skeleton height={20} width={200} className="mb-2" />
            <Skeleton height={16} width={150} />
            <div className="flex justify-between items-center mt-4">
              <Skeleton height={16} width={100} />
              <Skeleton height={32} width={100} />
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Error state
  if (isError) {
    return (
      <div className="container mx-auto mt-10 px-4 py-8 text-center">
        <h1 className="text-2xl font-bold mb-4">Booking History</h1>
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          Failed to load booking history. Please try again later.
        </div>
      </div>
    );
  }

  // Empty state
  if (!bookingData || bookingData.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold mb-4">Booking History</h1>
        <div className="bg-gray-50 border border-gray-200 text-gray-700 px-4 py-8 rounded-lg">
          <FiClock className="mx-auto text-4xl mb-4 text-gray-400" />
          <p className="text-lg">No bookings found</p>
          <p className="text-gray-500 mt-2">Your booking history will appear here</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 mt-10">      
      <div className="space-y-4">
        {bookingData.map((booking) => (
          <Link 
            to={`/profile/history/${booking._id}`} 
            key={booking._id}
            className="block group"
          >
            <div className="bg-white rounded-lg shadow-sm p-6 transition-all duration-200 group-hover:shadow-md">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div className="mb-4 md:mb-0">
                  <h3 className="text-lg font-semibold text-gray-800 mb-1">
                    {booking.items.length > 1 
                      ? `${booking.items[0].label} + ${booking.items.length - 1} more`
                      : booking.items[0].label}
                  </h3>
                  <div className="flex items-center text-gray-500 text-sm">
                    <FiClock className="mr-1" />
                    <span>{formatDate(booking.bookingDate)}</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between md:justify-end md:space-x-6">
                  <div className="flex items-center">
                    <FiDollarSign className="text-gray-500 mr-1" />
                    <span className="font-medium text-gray-800">
                      {booking.itemsTotalPrice.toFixed(2)}
                    </span>
                  </div>
                  
                  <div className={`px-3 py-1 rounded-full text-sm font-medium flex items-center ${
                    getStatusStyles(booking.status).bg
                  } ${getStatusStyles(booking.status).text}`}
                  >
                    {getStatusStyles(booking.status).icon}
                    {booking.status}
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}