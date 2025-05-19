import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Select from "react-select";
import axios from "axios";
import { useMutation, useQuery } from "react-query";
import { useSelector } from "react-redux";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Modal from "./Modal";
import {
  FiPlus,
  FiTrash2,
  FiCheckCircle,
  FiChevronRight,
} from "react-icons/fi";

function Book() {
  const { serviceId } = useParams();
  const navigate = useNavigate();
  const [goUp, setGoUp] = React.useState("");
  const user = useSelector((state) => state.user);

  // API functions
  function addBookings(booking) {
    return axios.post("http://localhost:9000/api/bookings/step1", booking);
  }

  async function makeBookings(booking) {
    const response = await axios.post(
      "http://localhost:9000/api/bookings",
      booking
    );
    return response.data;
  }

  const { mutate: bookingMutate } = useMutation(makeBookings, {
    onSuccess: (data) => {
      window.location = data.url;
    },
    onError: (err) => {
      console.error(err);
      setFormError(
        "An error occurred while processing your booking. Please try again."
      );
    },
  });

  // Service data
  function getService(id) {
    return axios.get(`http://localhost:9000/api/services/${id}`);
  }

  const { data: serviceData } = useQuery(["service", serviceId], () =>
    getService(serviceId)
  );
  const service = serviceData?.data;

  // Prices data
  function getPrices() {
    return axios.get("http://localhost:9000/api/prices");
  }

  const { data: pricesData } = useQuery("prices", getPrices, {
    refetchOnWindowFocus: true,
  });

  // Form state
  const [selectFields, setSelectFields] = React.useState([]);
  const [fieldsData, setFieldsData] = React.useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    address: user?.address || "",
    phoneNo: user?.phoneNo || "",
    email: user?.email || "",
  });

  const [formError, setFormError] = React.useState("");
  const [isDuplicateSelectFields, setIsDuplicateSelectFields] =
    React.useState(false);
  const [invalidFields, setInvalidFields] = React.useState([]);
  const [totalPriceArray, setTotalPriceArray] = React.useState([]);
  const [modalOpen, setModalOpen] = React.useState(false);
  const [startPickupDate, setStartPickupDate] = React.useState(null);
  const [deliveryDate, setDeliveryDate] = React.useState(null);
  const minDate = new Date();

  // Form handlers
  const handleSelectChange = (selectedOption, index) => {
    const newSelectFields = [...selectFields];
    newSelectFields[index].selectedOption = selectedOption;
    setSelectFields(newSelectFields);
  };

  const checkDuplicates = (items) => {
    const priceNames = {};
    const duplicates = [];

    for (const item of items) {
      const { selectedOption } = item;
      if (selectedOption && priceNames[selectedOption.label]) {
        if (!duplicates.includes(selectedOption.label)) {
          duplicates.push(selectedOption.label);
        }
      } else if (selectedOption) {
        priceNames[selectedOption.label] = true;
      }
    }
    return duplicates;
  };

  const verifyData = () => {
    const requiredFields = [
      "firstName",
      "lastName",
      "email",
      "phoneNo",
      "address",
    ];
    const newInvalidFields = [];

    // Check required fields
    requiredFields.forEach((field) => {
      if (!fieldsData[field]) {
        newInvalidFields.push(field);
      }
    });

    // Check date fields
    if (!startPickupDate) newInvalidFields.push("pickUpDate");
    if (!deliveryDate) newInvalidFields.push("deliveryDate");

    // Check items
    selectFields.forEach((field, index) => {
      if (!field.selectedOption) newInvalidFields.push(`itemType-${index}`);
      if (!field.quantity || field.quantity < 1)
        newInvalidFields.push(`itemQuantity-${index}`);
    });

    setInvalidFields(newInvalidFields);

    // Check for duplicate items
    const duplicatePriceNames = checkDuplicates(selectFields);

    if (newInvalidFields.length > 0 || duplicatePriceNames.length > 0) {
      setIsDuplicateSelectFields(duplicatePriceNames.length > 0);
      setFormError(
        duplicatePriceNames.length > 0
          ? "You have duplicate items in your order"
          : "Please fill all required fields"
      );
      return;
    }

    setIsDuplicateSelectFields(false);
    setFormError("");

    // Prepare items for modal
    const items = selectFields.map((item) => ({
      ...item.selectedOption,
      quantity: parseInt(item.quantity),
      totalUnitPrice: item.selectedOption.price * item.quantity,
    }));

    const totalPriceArray = items.map((item) => ({
      priceName: item.label,
      quantity: item.quantity,
      price: item.price,
      totalUnitPrice: item.price * item.quantity,
    }));

    setTotalPriceArray(totalPriceArray);
    setModalOpen(true);
  };

  const handleSubmit = async (event) => {
    if (event) {
      event.preventDefault();

      const items = selectFields.map((item) => ({
        ...item.selectedOption,
        quantity: parseInt(item.quantity),
        totalUnitPrice: item.selectedOption.price * item.quantity,
      }));

      const totalPrice = items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );

      const bookingData = {
        ...fieldsData,
        userId: user?._id || null,
        pickUpDate: startPickupDate,
        deliveryDate: deliveryDate,
        items,
        itemsTotalPrice: totalPrice,
      };

      bookingMutate(bookingData);
    }
  };

  const handleFieldsData = (index, event) => {
    const newSelectFields = [...selectFields];
    newSelectFields[index] = {
      ...newSelectFields[index],
      quantity: event.target.value,
    };
    setSelectFields(newSelectFields);
  };

  const handleRemoveSelectField = () => {
    if (selectFields.length > 0) {
      const newSelectFields = [...selectFields];
      newSelectFields.pop();
      setSelectFields(newSelectFields);
    }
  };

  const handleAddSelectField = () => {
    let priceList = [];

    pricesData?.data.forEach((price) => {
      if (price.group === service?.serviceName) {
        priceList.push({
          priceId: price._id,
          value: price._id,
          label: price.name,
          price: price.price,
          group: price.group,
        });
      }
    });

    setSelectFields([
      ...selectFields,
      {
        id: Date.now(), // Using timestamp for unique ID
        options: priceList,
        selectedOption: null,
        quantity: 1, // Default to 1 instead of 0
      },
    ]);
  };

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFieldsData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleDateChangePickup = (date) => {
    setStartPickupDate(date);
    // Reset delivery date if it's now before the new pickup date
    if (deliveryDate && date && deliveryDate < date) {
      setDeliveryDate(null);
    }
  };

  const getMinDeliveryDate = () => {
    if (startPickupDate) {
      const minDate = new Date(startPickupDate);
      minDate.setDate(minDate.getDate() + 3);
      return minDate;
    }
    return null;
  };

  // Select styling
  const selectStyles = {
    control: (provided, state) => ({
      ...provided,
      borderRadius: "8px",
      height: "48px",
      fontSize: "0.95rem",
      borderColor: state.isFocused ? "#34CCA1" : "#e2e8f0",
      boxShadow: state.isFocused ? "0 0 0 1px #34CCA1" : "none",
      "&:hover": {
        borderColor: state.isFocused ? "#34CCA1" : "#cbd5e0",
      },
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? "#34CCA1" : "white",
      ":hover": {
        backgroundColor: state.isSelected ? "#34CCA1" : "#f7fafc",
      },
    }),
  };

  // Scroll to top effect
  React.useEffect(() => {
    const handleScroll = () => {
      setGoUp(window.pageYOffset > 100 ? "goToTop active" : "");
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50  py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto mt-10 bg-white rounded-xl shadow-md overflow-hidden p-6 sm:p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Schedule a Pickup
          </h1>
          <p className="text-gray-600">
            Fill in your details to book our {service?.serviceName} service
          </p>
        </div>

        <form onSubmit={(e) => handleSubmit(e)} className="space-y-6">
          {/* Personal Information Section */}
          <div className="bg-gray-50 p-5 rounded-lg">
            <h2 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
              <FiCheckCircle className="mr-2 text-green-500" />
              Personal Information
            </h2>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="firstName"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  First Name *
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={user ? user.firstName : fieldsData.firstName}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2 rounded-lg border ${
                    invalidFields.includes("firstName")
                      ? "border-red-500"
                      : "border-gray-300"
                  } focus:ring-2 focus:ring-green-500 focus:border-transparent`}
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="lastName"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Last Name *
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={user ? user.lastName : fieldsData.lastName}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2 rounded-lg border ${
                    invalidFields.includes("lastName")
                      ? "border-red-500"
                      : "border-gray-300"
                  } focus:ring-2 focus:ring-green-500 focus:border-transparent`}
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={user ? user.email : fieldsData.email}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2 rounded-lg border ${
                    invalidFields.includes("email")
                      ? "border-red-500"
                      : "border-gray-300"
                  } focus:ring-2 focus:ring-green-500 focus:border-transparent`}
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="phoneNo"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Phone Number *
                </label>
                <input
                  type="tel"
                  id="phoneNo"
                  name="phoneNo"
                  value={user ? user.phoneNo : fieldsData.phoneNo}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2 rounded-lg border ${
                    invalidFields.includes("phoneNo")
                      ? "border-red-500"
                      : "border-gray-300"
                  } focus:ring-2 focus:ring-green-500 focus:border-transparent`}
                  required
                />
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="address"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Address *
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={user ? user.address : fieldsData.address}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2 rounded-lg border ${
                    invalidFields.includes("address")
                      ? "border-red-500"
                      : "border-gray-300"
                  } focus:ring-2 focus:ring-green-500 focus:border-transparent`}
                  required
                />
              </div>
            </div>
          </div>

          {/* Schedule Section */}
          <div className="bg-gray-50 p-5 rounded-lg">
            <h2 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
              <FiCheckCircle className="mr-2 text-green-500" />
              Pickup & Delivery Schedule
            </h2>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="pickUpDate"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Pickup Date *
                </label>
                <DatePicker
                  selected={startPickupDate}
                  onChange={handleDateChangePickup}
                  minDate={minDate}
                  id="pickUpDate"
                  className={`w-full px-4 py-2 rounded-lg border ${
                    invalidFields.includes("pickUpDate")
                      ? "border-red-500"
                      : "border-gray-300"
                  } focus:ring-2 focus:ring-green-500 focus:border-transparent`}
                  placeholderText="Select pickup date"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="deliveryDate"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Delivery Date *
                </label>
                <DatePicker
                  selected={deliveryDate}
                  onChange={(date) => setDeliveryDate(date)}
                  minDate={getMinDeliveryDate()}
                  id="deliveryDate"
                  className={`w-full px-4 py-2 rounded-lg border ${
                    invalidFields.includes("deliveryDate")
                      ? "border-red-500"
                      : "border-gray-300"
                  } focus:ring-2 focus:ring-green-500 focus:border-transparent`}
                  placeholderText="Select delivery date"
                  disabled={!startPickupDate}
                  required
                />
              </div>
            </div>
          </div>

          {/* Items Section */}
          <div className="bg-gray-50 p-5 rounded-lg">
            <h2 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
              <FiCheckCircle className="mr-2 text-green-500" />
              Laundry Items
            </h2>

            {selectFields.map((selectField, index) => (
              <div
                key={selectField.id}
                className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4 items-end"
              >
                <div className="sm:col-span-2">
                  <label
                    htmlFor={`itemType-${index}`}
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Item Type *
                  </label>
                  <Select
                    id={`itemType-${index}`}
                    options={selectField.options}
                    value={selectField.selectedOption}
                    onChange={(selectedOption) =>
                      handleSelectChange(selectedOption, index)
                    }
                    styles={selectStyles}
                    placeholder="Select item type"
                    className={`${
                      invalidFields.includes(`itemType-${index}`)
                        ? "border-red-500"
                        : ""
                    }`}
                  />
                </div>

                <div>
                  <label
                    htmlFor={`itemQuantity-${index}`}
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Quantity *
                  </label>
                  <input
                    type="number"
                    id={`itemQuantity-${index}`}
                    min="1"
                    max="200"
                    value={selectField.quantity || ""}
                    onChange={(event) => handleFieldsData(index, event)}
                    className={`w-full px-4 py-2 rounded-lg border ${
                      invalidFields.includes(`itemQuantity-${index}`)
                        ? "border-red-500"
                        : "border-gray-300"
                    } focus:ring-2 focus:ring-green-500 focus:border-transparent`}
                    required
                  />
                </div>
              </div>
            ))}

            {isDuplicateSelectFields && (
              <p className="text-red-500 text-sm mt-2">
                You have duplicate items in your order. Please remove
                duplicates.
              </p>
            )}

            <div className="flex flex-wrap gap-3 mt-4">
              <button
                type="button"
                onClick={handleAddSelectField}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                <FiPlus className="mr-2" />
                Add Item
              </button>

              {selectFields.length > 0 && (
                <button
                  type="button"
                  onClick={handleRemoveSelectField}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  <FiTrash2 className="mr-2" />
                  Remove Item
                </button>
              )}
            </div>
          </div>

          {/* Error message */}
          {formError && (
            <div className="rounded-md bg-red-50 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg
                    className="h-5 w-5 text-red-400"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800">
                    {formError}
                  </h3>
                </div>
              </div>
            </div>
          )}

          {/* Action buttons */}
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="px-6 py-3 border border-gray-300 text-base font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={verifyData}
              disabled={selectFields.length === 0}
              className={`px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 flex items-center ${
                selectFields.length === 0 ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              Verify Order
              <FiChevronRight className="ml-2" />
            </button>
          </div>
        </form>
      </div>

      {/* Modal */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        totalPriceItems={totalPriceArray}
        bookingDetails={{
          ...fieldsData,
          pickUpDate: startPickupDate,
          deliveryDate: deliveryDate,
          serviceName: service?.serviceName,
        }}
        onSubmit={handleSubmit}
      />
    </div>
  );
}

export default Book;
