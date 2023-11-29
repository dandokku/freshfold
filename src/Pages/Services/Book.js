import React, { useState } from 'react'
import { useParams, useNavigate } from "react-router-dom";
import Select from 'react-select';
import axios from 'axios';
import { useMutation, useQuery } from 'react-query';
import { useSelector } from "react-redux";
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css";
import Modal from "./Modal";

function Book() {
  
  const { serviceId } = useParams();

  const navigate = useNavigate();

  const [goUp, setGoUp] = React.useState("");

  function addBookings(booking) {
      return axios.post("http://localhost:9000/api/bookings/step1", booking);
  }

  async function makeBookings(booking) {
      const response = await axios.post("http://localhost:9000/api/bookings", booking);
      return response.data;
  }

  const [checkoutUrl, setCheckoutUrl] = React.useState("");

  // ! Code i was using for Service
  const { mutate: bookingMutate, data } = useMutation(makeBookings, {
      onSuccess: (data) => {
          console.log(data);
          window.location = data.url
      },
      onError: (err) => {
          console.log(err)
      }
  });

  const user = useSelector((state) => state.user)
  console.log(user)

  // ========== Function to Fetch a service
  function getService(id) {
      return axios.get(`http://localhost:9000/api/services/${id}`);
  }

  // =========== UseQuery for the Service
  const { data: serviceData} = useQuery(["service", serviceId], () => getService(serviceId));

  const service = serviceData?.data;

  // ======================= SELECT AND INPUT BOX CODE LOGIC

  // ======== Function to Fetch Data
  function getPrices() {
      return axios.get("http://localhost:9000/api/prices");
  }

  // ======== UseQuery for the Prices
  const { data: pricesData, error: pricesError, success: pricesSuccess,  isLoading, isFetching} = useQuery("prices", getPrices, {
      refetchOnWindowFocus: true
  });

  // ======== State Values for the Select and Input Fields
  const [selectFields, setSelectFields] = React.useState([]);
  const [inputFields, setInputFields] = React.useState([]);
  const [fieldsData, setfieldsData] = React.useState({
      firstName: "",
      lastName: "",
      address: "",
      phoneNo: "",
      email: "",
  })
  const [modalsBookingDetails, setModalsBookingDetails] = React.useState({});

  // ======== State values for duplicateSelect Fields
  const [isDuplicateSelectFields, setIsDuplicateSelectFields] = React.useState(false);

  // ======== Function to handle Change of Select Box
  const handleSelectChange = (selectedOption, index) => {
    const newSelectFields = [...selectFields];
    newSelectFields[index].selectedOption = selectedOption;
    setSelectFields(newSelectFields);
  };

  const [totalPriceArray, setTotalPriceArray] = React.useState(false);

  // ========= State to check if the fields are invalid onClick of the verify button
  const [invalidFields, setInvalidFields] = React.useState([]);

  // ========= Function to check if there are duplicate select fields Prices
  const checkDuplicates = (items) => {

    
      const priceNames = {};
      const duplicates = [];
    
      for (const item of items) {
        const { selectedOption } = item;
        if (priceNames[selectedOption?.label]) {
          if (!duplicates.includes(selectedOption?.label)) {
            duplicates.push(selectedOption?.label);
          }
        } else {
          priceNames[selectedOption?.label] = true;
        }
      }

  
      return duplicates;
    };

  // ! Review States
  // ========= Function to verify the data in the fields and call the modal
  function verifyData(){
      const inputFields = document.querySelectorAll(' form input[required]');
      const invalidFields = [];

      //NB Lopping through all fields and then checking which one is empty 
      // Nb is empty it is pushed into the invalid array
      console.log(selectFields);

      // * Setting the invalidFieds as the state, so we can render error messages
      setInvalidFields(invalidFields);

      // Checking if the length === 0 if yes then no field is empty
      if (invalidFields.length === 0) {
      console.log('All fields are filled. Form can be submitted.');
      } else {
      console.log('Please fill in all required fields.');
      }

      // NB Created a variable to hold the result of the checkDuplicates function which makes sure that no select Field has the same data or item
      const duplicatePriceNames = checkDuplicates(selectFields);

      // * If the invalidFields.length is not eqaul to 0 meaning a field is invalid and if the duplicatePriceNames.length > 0 meaning that there is a duplicate select field then we can setIsDuplicateSelectFields to true and return to skip the code
      if(invalidFields.length !== 0 || duplicatePriceNames.length > 0){
          setIsDuplicateSelectFields(true);
          return;
      }
      // * Else we set it to false
      else{
          setIsDuplicateSelectFields(false);
      }

      // * Creating an items array that will hold data selected data and quantity which will be sent to the modal
      let items = [];
  
      selectFields.forEach(item => {
        items.push({
          ...item.selectedOption,
          quantity: parseInt(item.quantity),
        })
      })


      let totalPriceArray = [];

      // NB Storing the data from the items array into a new totalPriceArray
      items.forEach(item => {
          totalPriceArray.push({
              priceName: item.label,
              quantity: item.quantity,
              price: item.price,
              totalUnitPrice: item.price * item.quantity 
          })
      })


      // ! Here we then set the totalPriceArray variable as state, this way, we can pass this state to the modal
      setTotalPriceArray(totalPriceArray);
      // ! We also set the modalOpenClass to active
      setModalOpenClass("popup-modal active")
      
  }

  // ========= Function to handle Submit of Form Data
  async function handleSubmit(event) {

      event.preventDefault();
  
      let items = []
  
      // NB Looping through each select field so we can store them in an array items, which will be dirrectly dropped into the DB
      selectFields.forEach(item => {
        items.push({
          ...item.selectedOption,
          quantity: parseInt(item.quantity),
          totalUnitPrice: item.selectedOption.price * item.quantity
        })
      })

      let totalPrice = 0;
      let totalPriceArray = [];

      // ======== Creating an array to calculate the total price for each item
      items.forEach(item => {
          // item.price 
          totalPriceArray.push({
              priceName: item.label,
              quantity: item.quantity,
              price: item.price,
              totalUnitPrice: item.price * item.quantity 
          })
      })

      console.log(items)

      // * So based on the array we then loop through and increment the toalPrice by each items unit total price, basically an item can be 9dollar and the quanity can be 2, so the total price for the item will be 18, but then we need to total price for everything, all items
      totalPriceArray.forEach(item => {
          totalPrice += item.totalUnitPrice;
      })

      console.log(totalPrice);
      let mainData;

      // NB Here i am checking if the user is logged In is so we can explicitly defined the fieldsData
      if(user.id){
          mainData = {
              ...fieldsData,
              userId: user._id,
              firstName: user.firstName,
              lastName: user.lastName,
              address: user.address,
              email: user.email,
              phoneNo: user.phoneNo,
              pickUpDate: startPickupDate,
              deliveryDate: deliveryDate,
              items,
              itemsTotalPrice: totalPrice
          }
      }
      // * Else we use the fieldsData and send store that in the mainData variable
      else{
          mainData = {
              ...fieldsData,
              userId: user._id,
              phoneNo: fieldsData.phoneNo,
              pickUpDate: startPickupDate,
              deliveryDate: deliveryDate,
              items,
              itemsTotalPrice: totalPrice
          }
      }

      
      localStorage.setItem("bookingData", JSON.stringify(mainData)); // not used
      setModalsBookingDetails(mainData); // not used
      // * Mutating the data and sending it to the server
      bookingMutate(mainData); 
  }

  // =============== Handling the Change of an Input Field
  const handleFieldsData = (index, event) => {
      
      setInputFields(prevState => {
      //* We spread the old state to a new one
      const newFields = [...prevState];
      // *directly mutate the new one and used the index passed into the function to derive the particular field we are on now, then we change the value
      newFields[index] = {
          ...newFields[index],
          [event.target.name]: event.target.value
      };
      //! And then return it
      return newFields;
      })

      //NB And because we want to select fields to have a quantity with the other details, which we specified while creating the select field, we then increment the quantity value based on the input field
      const newSelectFields = [...selectFields];
      newSelectFields[index] = {
      ...newSelectFields[index],
      quantity: event.target.value
      }
      setSelectFields(newSelectFields)
      
  }

  // =============== Function to Remove Input and Select Fields
  function handleRemoveSelectField() {
      // * So here we spread the curremt date
      const newSelectFields = [...selectFields]
      // * Then we directly mutate the newSelectField and then we remove the last object using the splice method and we specify 1 for the second args which is the number elements to remove
      // NB we used -1 here because the first args i the index of the element we want to remove and indexes start from 0
      newSelectFields.splice(newSelectFields.length - 1, 1)
      setSelectFields(newSelectFields)
  
      const newInputFields = [...inputFields]
      newInputFields.splice(newInputFields.length - 1, 1)
      setInputFields(newInputFields)
  }


    // ================ Adding a new Select and Input Field
  const handleAddSelectField = () => { 

      let priceList = [];
      
      pricesData?.data.forEach((price, index) => {
          // * Here we are checking if the price group is the same as the name of the current service that we are in, if so we can then push the data into the array.
          if(price.group === service?.serviceName){
              // * then push
              priceList.push({
                  priceId: price._id,
                  value: index + 1,
                  label: price.name,
                  price: price.price,
                  group: price.group,
              }) 
          }
      })


      // NB Here we then create the new Select Field and we pass the priceList as the options value, so if there is not price.group that matches the service.serviceName then the options will be empty
      const newSelectFields = [
      ...selectFields,
      {
          id: selectFields.length + 1,
          options: priceList,
          selectedOption: null,
          quantity: 0
      }
      ];

      setSelectFields(newSelectFields)
      console.log(newSelectFields)
  };


  const selectStyles = {
    control: (provided, state) => ({
    ...provided,
    borderRadius: borderRad,
    height: "50px",
    maxWidth: "100%",
    fontSize: "1rem",
    letterSpacing: 0,
    font: "poppins",
    borderColor: state.isFocused ? "#34CCA1" : "#d3d3d3",
    boxShadow: state.isFocused ? `0 0 0 1px #34CCA1` : "",
    "&:hover": {
        borderColor: state.isFocused ? "#34CCA1" : "#d3d3d3",
    }
    }),
    option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected ? secondary : "",
    ':hover': {
        backgroundColor: state.isSelected ? secondary : '#E9B6092b',
    },
    ':focus': {
        borderColor: "#e9b609"
    }
    }),

};




  // ======== State for Modal
  const [modalOpenClass, setModalOpenClass] = React.useState("popup-modal");


  // ========= State for the Date Picker
  const [startPickupDate, setStartPickupDate] = React.useState(null);
  const [deliveryDate, setDeliveryDate] = React.useState(null);
  const minDate = new Date();

  // ========= Handle Function for the Date Pickers
  function handleDateChangePickup(date) {
      setStartPickupDate(date);
  }

  function handleDateChangeDelivery(date) {
      setDeliveryDate(date);
  }

  // ========== Creating a delivery date picker Min date
  const getMinDeliveryDate = () => {
      if (startPickupDate) {
        const minDate = new Date(startPickupDate);
        minDate.setDate(minDate.getDate() + 3); // Add 3 days to the start date
        return minDate;
      }
      return null;
  };

  function handleInputChange(event) {
     const { name, value, type, checked } = event.target;
      setfieldsData(oldFieldsData => {
          return {
              ...oldFieldsData,
              [name]: type === "checkbox" ? checked : value
          }
      })
  }

  React.useEffect(() => {
      window.addEventListener("scroll", () => {
          if(window.pageYOffset > 100) {
              setGoUp("goToTop active")
          }

          else{
              setGoUp("")
          }
      })
  })


  return (
    <div className='pt-28 p-11'>
      <h1 className='text-textColor font-bold text-3xl text-center mb-10'>SCHEDULE A PICKUP</h1>
      <form onSubmit={handleSubmit}  className='w-full flex flex-col items-center gap-6'>
        <div className='flex items-center gap-4 w-full'>
          <input type="text" name="" id="" placeholder='First Name' onChange={handleInputChange} value={user ? user.firstName : fieldsData.firstName}  className='border border-mainColor focus:border-secondaryColor w-full p-1 py-2 rounded-md outline-none text-mainColor'/>
          <input type="text" name="" id="" placeholder='Last Name' onChange={handleInputChange} value={user ? user.lastName : fieldsData.lastName}  className='border border-mainColor focus:border-secondaryColor w-full p-1 py-2 rounded-md outline-none text-mainColor' />
        </div>

        <div className='flex items-center gap-4 w-full'>
          <input type="email" name="" id="" placeholder='Email-Address' onChange={handleInputChange} value={user ? user.email : fieldsData.email} className='border border-mainColor focus:border-secondaryColor w-full p-1 py-2 rounded-md outline-none text-mainColor' />

          <input type="number" name="" id="" placeholder='PhoneNo' onChange={handleInputChange} value={user ? user.phoneNo : fieldsData.phoneNo} className='border border-mainColor focus:border-secondaryColor w-full p-1 py-2 rounded-md outline-none text-mainColor'/>
        </div>

        <input type="text" name="" id="" placeholder='Address' onChange={handleInputChange} value={user ? user.address : fieldsData.address}  className='border border-mainColor focus:border-secondaryColor w-full p-1 py-2 rounded-md outline-none text-mainColor'/>

        <div className='flex items-center gap-4 w-full'>
          <DatePicker
            selected={startPickupDate} onChange={handleDateChangePickup} className="w-[625px] border border-mainColor focus:border-secondaryColor p-1 py-2 rounded-md outline-none text-mainColor flex-[0.5]" placeholderText="Pick Up Date" minDate={minDate}
            
          />
          

          <DatePicker
            selected={deliveryDate} onChange={handleDateChangeDelivery}
            className="w-[625px] border border-mainColor focus:border-secondaryColor flex-[0.5] p-1 py-2 rounded-md outline-none text-mainColor" placeholderText="Delivery Date" minDate={getMinDeliveryDate()}
          />
        </div>

        {selectFields.map((selectField, index) => (
          <div key={selectField.id} className=' mt-4 flex gap-6 items-center justify-between'>
              <div>
              <Select
                  options={selectField.options}
                  value={selectField.selectedOption}
                  onChange={(selectedOption) => handleSelectChange(selectedOption, index)}
                  className='border focus:border-secondaryColor' styles={selectStyles} placeholder = "Clothes Type"
              />
              </div>
              
          <div>
              <input required={true}
                  type="number"
                  onChange={(event) => handleFieldsData(index, event)}
                  name={selectField.selectedOption?.label}  min={1} max={200} className='p-2 border border-mainColor focus:border-secondaryColor rounded-md w-max outline-none' placeholder='Quantity'
              />
          </div>
              
          </div>
          ))}
          {
              isDuplicateSelectFields && <p style={{color: "red", textAlign: "center"}}>Laundry Items cannot be Duplicated</p>
          }



        <div className='flex  gap-6'>
          <button onClick={handleAddSelectField} type="button" className='hover:text-secondaryColor rounded-md border border-secondaryColor p-4 px-11 mt-3 btnbtn bg-secondaryColor text-whiteColor hover:bg-whiteColor'>Add Item</button>

          {
            selectFields.length >= 1 &&
            <button onClick={handleRemoveSelectField} type="button" className='hover:text-secondaryColor rounded-md border border-secondaryColor p-4 px-11 mt-3 btnbtn bg-secondaryColor text-whiteColor hover:bg-whiteColor'>Remove Item</button>
        }
        </div>



        {
          selectFields.length >= 1 &&
          <button onClick={verifyData} type="button" className='text-secondaryColor rounded-md border border-secondaryColor p-4 px-11 mt-3 btnbtn hover:bg-secondaryColor hover:text-whiteColor bg-whiteColor'>Verify</button>
      }

      {
          invalidFields.map((fieldId) => (
              <p key={fieldId} style={{ color: 'red' }}>
              {fieldId} is required.
              </p>
          ))
        }




          <Modal modalClass={modalOpenClass} setModalClass={setModalOpenClass} totalPriceItems={totalPriceArray} bookingDetails={modalsBookingDetails}/>
      </form>
    </div>
  )
}

export default Book


const secondary = "#34CCA1";
const borderRad = "10px";
