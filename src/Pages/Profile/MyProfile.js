import React from 'react';
import ProfImage from '../../Assets/Images/user_1177568.png';
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FiEdit, FiUser, FiMail, FiPhone, FiHome } from 'react-icons/fi';

function MyProfile() {
  const user = useSelector((state) => state.user);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto mt-16">
        {/* Profile Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
          <p className="mt-2 text-lg text-gray-600">
            View and manage your account information
          </p>
        </div>

        {/* Profile Content */}
        <div className="bg-white shadow-xl rounded-lg overflow-hidden">
          <div className="md:flex">
            {/* Profile Picture Section */}
            <div className="md:w-1/3 p-8 flex flex-col items-center border-b md:border-b-0 md:border-r border-gray-200">
              <div className="relative">
                <img 
                  src={ProfImage} 
                  alt="Profile" 
                  className="w-48 h-48 rounded-full object-cover border-4 border-secondary-500 shadow-md"
                />
                <div className="absolute bottom-0 right-0 bg-secondary-500 rounded-full p-2 shadow-sm">
                  <FiEdit className="text-white h-5 w-5" />
                </div>
              </div>
              <h2 className="mt-6 text-2xl font-semibold text-gray-800">
                {user.firstName} {user.lastName}
              </h2>
              <p className="text-gray-500 mt-1">Member since 2023</p>
              
              <Link 
                to="./editprofile" 
                className="mt-6 inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-secondary-600 hover:bg-secondary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary-500 transition-colors"
              >
                Edit Profile
              </Link>
            </div>

            {/* Profile Details Section */}
            <div className="md:w-2/3 p-8">
              <h3 className="text-xl font-semibold text-gray-800 mb-6 pb-2 border-b border-gray-200">
                Contact Information
              </h3>

              <div className="space-y-8">
                {/* Name */}
                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-secondary-100 rounded-md p-3">
                    <FiUser className="h-6 w-6 text-secondary-600" />
                  </div>
                  <div className="ml-4">
                    <h4 className="text-sm font-medium text-gray-500">Full Name</h4>
                    <p className="mt-1 text-lg font-semibold text-gray-900">
                      {user.firstName} {user.lastName}
                    </p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-secondary-100 rounded-md p-3">
                    <FiMail className="h-6 w-6 text-secondary-600" />
                  </div>
                  <div className="ml-4">
                    <h4 className="text-sm font-medium text-gray-500">Email Address</h4>
                    <p className="mt-1 text-lg font-semibold text-gray-900">
                      {user.email}
                    </p>
                    <p className="mt-1 text-sm text-gray-500">
                      Email verified
                    </p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-secondary-100 rounded-md p-3">
                    <FiPhone className="h-6 w-6 text-secondary-600" />
                  </div>
                  <div className="ml-4">
                    <h4 className="text-sm font-medium text-gray-500">Phone Number</h4>
                    <p className="mt-1 text-lg font-semibold text-gray-900">
                      {user.phoneNo || 'Not provided'}
                    </p>
                  </div>
                </div>

                {/* Address */}
                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-secondary-100 rounded-md p-3">
                    <FiHome className="h-6 w-6 text-secondary-600" />
                  </div>
                  <div className="ml-4">
                    <h4 className="text-sm font-medium text-gray-500">Home Address</h4>
                    <p className="mt-1 text-lg font-semibold text-gray-900">
                      {user.address || 'Not provided'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Profile Sections (can be expanded) */}
          <div className="border-t border-gray-200 px-8 py-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Account Settings
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Link 
                to="/changepassword" 
                className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <h4 className="font-medium text-gray-900">Change Password</h4>
                <p className="mt-1 text-sm text-gray-500">
                  Update your account password
                </p>
              </Link>
              <Link 
                to="/notifications" 
                className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <h4 className="font-medium text-gray-900">Notification Settings</h4>
                <p className="mt-1 text-sm text-gray-500">
                  Manage your notification preferences
                </p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyProfile;