import React from 'react'
import { useParams, useNavigate } from "react-router-dom";
import Select from 'react-select';
import axios from 'axios';
import { useMutation, useQuery } from 'react-query';
import { useSelector } from "react-redux";
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css";
import Modal from "./Modal";
import styled from "styled-components";

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
          // navigate(data.url)
          window.location = data.url
          // setCheckoutUrl(data.data);
      },
      onError: (err) => {
          console.log(err)
      }
  });

  // async function retrieveData(){
  //     let bookingId = await data?.data;
  //     return bookingId;
  // }

  const user = useSelector((state) => state.user)
  console.log(user)

  // React.useEffect(() => {

  // })

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
  const [firstCheck, setFirstCheck] = React.useState(1);
  const [fieldsData, setfieldsData] = React.useState({
      firstName: "",
      lastName: "",
      address: "",
      phoneNo: "",
      email: "",
      specialInstructions: ""
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
          // item.price 
          totalPriceArray.push({
              priceName: item.label,
              quantity: item.quantity,
              price: item.price,
              priceImage: item.priceImage,
              totalUnitPrice: item.price * item.quantity 
          })
      })


      // ! Here we then set the totalPriceArray variable as state, this way, we can pass this state to the modal
      setTotalPriceArray(totalPriceArray);
      // ! We also set the modalOpenClass to active
      setModalOpenClass("popup-modal active")
      
  }

  

  // console.log(fieldsData)
  // console.log("isduip: ", isDuplicateSelectFields)

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
    borderColor: state.isFocused ? "#e9b609" : "#d3d3d3",
    boxShadow: state.isFocused ? `0 0 0 1px #E9B6097b` : "",
    "&:hover": {
        borderColor: state.isFocused ? "#E9B609" : "#d3d3d3",
        // boxShadow: state.isFocused ? "0 0 0 3px #E9B6097b" : "",
    }
    }),
    option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected ? secondary : "",
    ':hover': {
        backgroundColor: state.isSelected ? secondary : '#E9B6092b',
    },
    ':focus': {
        // boxShadow: '0 0 0 3px #E9B6097b',
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
            selected={startPickupDate} onChange={handleDateChangePickup} className="border border-mainColor focus:border-secondaryColor w-full p-1 py-2 rounded-md outline-none text-mainColor flex-1" placeholderText="Pick Up Date" minDate={minDate}
            
          />
          

          <DatePicker
            selected={deliveryDate} onChange={handleDateChangeDelivery}
            className="flex-1 border border-mainColor focus:border-secondaryColor w-full p-1 py-2 rounded-md outline-none text-mainColor" placeholderText="Delivery Date" minDate={getMinDeliveryDate()}
            // showTimeSelect // dateFormat="MM/dd/yyyy hh:mm aa"
          />
        </div>

        <input type="text" name="" id="" placeholder='Special Instructions, Example: Wash with hot water' className='border border-mainColor focus:border-secondaryColor w-full p-1 py-2 rounded-md outline-none text-mainColor' onChange={handleInputChange} />
        
        {/* <select name="" id="" placeholder='Select Service' className='border border-mainColor focus:border-secondaryColor w-full p-1 py-2 rounded-md outline-none text-mainColor'>
          <option value="">Welp</option>
          <option value="">Welp</option>
          <option value="">Welp</option>
          <option value="">Welp</option>
        </select> */}

        {selectFields.map((selectField, index) => (
          <div key={selectField.id} className='price-row flex items-center justify-center w-max'>
              <div>
              <Select
                  options={selectField.options}
                  value={selectField.selectedOption}
                  onChange={(selectedOption) => handleSelectChange(selectedOption, index)}
                  className='select-field' styles={selectStyles} placeholder = "Clothe"
              />
              </div>
              
          <div>
              <input required={true}
                  type="number"
                  // value={inputFields[index] ? inputFields[index].value : ""}
                  onChange={(event) => handleFieldsData(index, event)}
                  name={selectField.selectedOption?.label}  min={1} max={200} className='input-field' placeholder='Quantity'
              />
          </div>
              
          </div>
          ))}
          {
              isDuplicateSelectFields && <p style={{color: "red", textAlign: "center"}}>Laundry Items cannot be Duplicated</p>
          }



        <div>
          <button onClick={handleAddSelectField} type="button">Add Item</button>

          {
            selectFields.length >= 1 &&
            <button onClick={handleRemoveSelectField} type="button">Remove Item</button>
        }
        </div>



        {
          selectFields.length >= 1 &&
          <button onClick={verifyData} type="button">Verify</button>
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



const primary = "#34347C";
const secondary = "#E9B609";
const bg = "#F4F4F4";
const borderRad = "5px";
const yellowBtnHover = "#f7cb39";
const gray = "#545454";

const Container = styled.div``

const HeroSection = styled.div`
    padding: 6rem 3rem 6rem 3rem;
    background-color: #34347C4b;
    position: relative;
    background-size: cover;
    background-position: center;


    h2{
        color: ${secondary};
        font-size: 2.3rem;
    }
`

const MainContainer = styled.div`
    

    .service-image{
        text-align: center;
        img{
            width: 80%;
            border-radius: ${borderRad};
        }
    }

    .popup-modal.active{
        scale: 1;
        transition: all .3s ease-in-out;
    }

    .bottom-contact-service{
        display: none;

        @media screen and (max-width: 800px) {
            display: block;
        }
    }
`

const TopContainer = styled.div`
    display: grid;
    margin-top: 3rem;
    grid-template-columns: 23rem auto;

    .contact-service{
        @media screen and (max-width: 800px) {
            display: none;
        }
    }

    @media (max-width: 800px) {
        display: flex;
        flex-direction: column-reverse;
    }
`

const ServiceContainer = styled.div`
    padding: 2rem;
`

const WhatWeOffer = styled.div`
    text-align: center;


    div{
        .clients-list{
        gap: 2rem;
        padding: 1rem;
        text-align: start;

        @media screen and (max-width: 568px) {
            flex-direction: column;
            align-items: flex-start;
            gap: 0;
        }

        p{
            margin-top: 2rem;
            font-weight: 600;
        }

        div{
            flex: .5;
            place-items: center;

            li{
                margin-bottom: 0.5rem;

                &::marker{
                    color: ${secondary};
                }
            }
        }
        }
    }
`

const TopContent = styled.div`
    text-align: center;
    margin-top: 2rem;
    margin-bottom: 2rem;


    p:last-child{
        color: gray;
        width: 60%;
        margin: 0 auto;

        @media (max-width: 690px) {
            width: 90%;
        }
    }

    p:first-child{
        font-size: 1rem;
        font-weight: 700;
        color: ${secondary};
    }

    h3{
        font-size: 2.3rem;
        color: ${gray};

        @media (max-width: 600px) {
            font-size: 1.8rem;
        }
    }
`

const ServicesBox = styled.div`
    margin-bottom: 5rem;
    transition: all .3s ease-in-out;


    @media screen and (max-width: 400px) {
        padding: 0.8rem;
    }

`

const BookSection = styled.form`
    padding: 1rem;
    width: 100%;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    flex-direction: column;

  .price-row{
    display: grid;
    grid-template-columns: repeat(2, 1fr); justify-content: center;
    align-items: center; place-items: center; gap: 1rem;

    input[type=number]::-webkit-inner-spin-button, input[type=number]::-webkit-outer-spin-button {
      -webkit-appearance: none; margin: 0; display: none;
    }
    

    >div{
      width: 100%;
    }

    .select-field{
      max-width: 100%;
      margin-bottom: 1rem;
    }

    .input-field{
      width: 100%;
      padding: 0;
      margin: 0;
      height: 50px;
      border-radius: ${borderRad};
      border: solid 1px #d3d3d3;
      outline: none;
      text-indent: 1rem;
      font-size: 1rem;
      margin-bottom: 1rem;
      
        &:focus{
            border: solid 1.5px ${secondary};
            transition: all .2s ease-in-out;
        }
    }
    }

  .submit-button{
    padding: 0.8rem 1.5rem;
    background-color: ${primary};
    color: ${secondary};
    position: relative;
    border-radius: ${borderRad};
    text-decoration: none;
    border: none;
    outline: none;
    margin: 0 auto;
    display: block;
    margin-bottom: 1rem;

    &:hover{
      background-color: #34349d;
    }

  }

  .bookBtn{
        padding: 0.8rem 1.5rem;
        background-color: ${secondary};
        color: ${primary};
        border-radius: ${borderRad};
        font-weight: 700;
        outline: none;
        width: 60%;
        border: none;
        cursor: pointer;
        margin: 0 auto;

        &:hover{
            background-color: ${yellowBtnHover};
        }
    }

`;

const OperationButtons = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.25555rem;
`

const PricesDiv = styled.div`
    width: 100%;
    flex: .5;
    padding: 2rem 0;
    position: relative;
    font-size: 1rem;
    text-align: center;

    @media screen and (max-width: 500px) {
        font-size: 0.9rem;
    }

    .btn-mask{
        border-radius: ${borderRad};
        position: absolute;
        color: ${secondary};
        text-align: center;
        position: absolute;
        border: solid 2px ${secondary};
        text-decoration: none;
        padding: 15px 20px;
        top: 50%;
        transform: translateY(-50%);
        width: 50%;

        @media (max-width: 900px){
            width: 100% !important;
        }
    }

    button{
        width: 50%;
    position: relative;
    text-decoration: none;
    color: #fff;
    background: ${secondary};
    padding: 15px 20px;
    -webkit-mask-size: 3000% 100%;
    mask-size: 3000% 100%;
    border: solid 2px ${secondary};
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


    
    @media (max-width: 568px) {
        width: 100%;
    }
`
const PricesDiv2 = styled.div`
    width: 100%;
    flex: .5;
    padding: 2rem 0;
    position: relative;
    font-size: 1rem;
    text-align: center;

    @media screen and (max-width: 500px) {
        font-size: 0.9rem;
    }

    .btn-mask{
        border-radius: ${borderRad};
        position: absolute;
        color: #F72609;
        text-align: center;
        position: absolute;
        border: solid 2px #F72609;
        text-decoration: none;
        padding: 15px 20px;
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
        background:#F72609;
        padding: 15px 20px;
        -webkit-mask-size: 3000% 100%;
        mask-size: 3000% 100%;
        border: solid 2px #F72609;
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

const PersonalInformation = styled.div`
 .input-field{
      width: 100%;
      padding: 0;
      margin: 0;
      height: 50px;
      border-radius: ${borderRad};
      border: solid 1px #d3d3d3;
      outline: none;
      text-indent: 1rem;
      font-size: 1rem;
      margin-bottom: 1rem;
      
        &:focus{
            border: solid 1px ${secondary};
            transition: all .2s ease-in-out;
        }
    }

    .contact-information{
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 1rem;

        @media screen and (max-width: 520px) {
            flex-direction: column;
            gap: 0;
        }
    }

    .contact-names{
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 1rem;

        @media screen and (max-width: 520px) {
            flex-direction: column;
            gap: 0;
        }
    }

    .date-fields{
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 1rem;

        .custom-datepicker{
            width: 100%;
            padding: 0;
            margin: 0;
            height: 50px;
            border-radius: ${borderRad};
            border: solid 1px #d3d3d3;
            outline: none;
            text-indent: 1rem;
            font-size: 1rem;
            margin-bottom: 1rem;
            
            &:focus{
                border: solid 1.5px ${secondary};
                transition: all .2s ease-in-out;
            }

            .react-datepicker__header {
                background-color: red;
            }
        }
    }

    .special-instructions{
        display: flex;
        gap: 2.2rem;
        margin-bottom: 1rem;
        align-items: center;
        
        @media screen and (max-width: 520px) {
            gap: 1rem;
            flex-direction: column;
            align-items: flex-start;
        }

        h4{
            color: ${gray};
            font-size: 1rem;
            font-weight: 500;
            flex: .3;
        }

        input{
            flex: 1;

            @media screen and (max-width: 520px) {
                flex: inherit;
            }   

        }
    }

    
`

const ServicesDiv = styled.div`
    width: 70%;
    margin: 0 auto;
    >div:first-child{
        h2{
            text-align: center;
        }
    }

    @media screen and (max-width: 768px) {
        width: 90%;
    }

    @media screen and (max-width: 568px) {
        width: 100%;
    }
`

const RadioChoices = styled.div`
    .wash-choice{
        display: flex;
        gap: 2.2rem;
        margin-bottom: 2rem;

        @media screen and (max-width: 520px) {
            gap: 1rem;
            flex-direction: column;
        }

        h4{
            color: ${gray};
            font-size: 1rem;
            font-weight: 500;
        }

        .custom-radio{
            margin-right: 0.5rem;
            
        }
    }
`

const GoToTop = styled.div`
    background-color: ${secondary};
    opacity: 0.8;
    position: fixed;
    bottom: 5%;
    right: 5%;
    width: 50px;
    height: 50px;
    border-radius: ${borderRad};
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
    scale: 0;
    color: ${primary};

    &:hover{
        opacity: 1;
    }
`
