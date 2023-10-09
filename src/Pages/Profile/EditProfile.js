import React from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { useMutation } from "react-query";
import { useQueryClient } from "react-query";

export default function EditProfile() {

    // * Initializing the queryClient so that i can use this to perform operations
    const queryClient = useQueryClient();


    // ========== Getting the user state from redux store
    let user = useSelector((state) => state.user);

    // ========== State to hold each input field
    const [fieldsData, setFieldsData] = React.useState({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        address: user.address || "",
        phoneNo: user.phoneNo || "",
        email: user.email || "",
   });

    // ========= useEffect that will be called when user is available   
   React.useEffect(() => {
    // * So at first the user object will be empty so in state it is set to either user.[any_key] or "", any then in the dependencies array anytime the user is changed or available we then call the function in the useEffect function.
    setFieldsData({
      firstName: user.firstName || "",
      lastName: user.lastName || "",
      address: user.address || "",
      phoneNo: user.phoneNo || "",
      email: user.email || "",
    });
  }, [user]);

    // ==========   State to hold input fields validations
   const [validateFieldsData, setValidateFieldsData] = React.useState({
    firstName: "",
    lastName: "",
    address: "",
    phoneNo: "",
    email: "",
    allData: ""
    })

    // ======== State to hold the string for account being updated
    const [accountUpdated, setAccountUpdated] = React.useState("");

    // ======== Function to handle Input change
    function handleInputChange(event){
        const validateFields = {...validateFieldsData};
        setAccountUpdated("");

        setFieldsData(oldFieldsData => {
            return {
                ...oldFieldsData,
                [event.target.name]: event.target.value
            }
        })

        if (event.target.name === "firstName") {
            if (event.target.value.match(/[@#$!^%*0-9]/) || !event.target.value.trim()) {
              validateFields.firstName = "First name cannot contain numbers or special characters";
            } else {
              validateFields.firstName = "";
            }
        }

        if (event.target.name === "lastName") {
            if (event.target.value.match(/[@#$!^%*0-9]/) || !event.target.value.trim()) {
              validateFields.lastName = "Last name cannot contain numbers or special characters";
            } else {
              validateFields.lastName = "";
            }
        }

        if(event.target.name === "address"){
            if(event.target.value.length < 10){
                validateFields.address = 'Address must have above 10 characters'
            }

            else{
                validateFields.address = "";
            }
            
        }

        setValidateFieldsData(validateFields)
    }
    // console.log(fieldsData)

    // ======== Function to make an axios request to update the data
    async function updateUser(fields) {
      try {
        const response = await axios.put(`http://localhost:9000/api/users/${user?.id}`, fields);
        return response.data;
      } catch (error) {
        console.error("PUT request failed:", error);
        throw error; // Rethrow the error to propagate it to React Query's error handling.
      }
    }
    

    // ======== useMutation hook to update the user 
    const { mutate } = useMutation(updateUser, {
        onSuccess: () => {
            // * onSuccess we make sure to refetch the queries manually so that we can see the current information live.
            queryClient.refetchQueries("user");
            // * Then we set the account updated to true
            setAccountUpdated("Profile Updated");
        }
    });
    

    // ========== Function to handle submitting of Data
    function handleSubmit(event) {
        event.preventDefault();
        mutate({
            ...fieldsData,
        });
    }

    return (
      <div className="pt-44 flex items-center justify-center">
        <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center gap-7 w-max">
          <h1 className="font-bold text-3xl text-headerTextColor">Edit Account Info..</h1>

          {
            accountUpdated && <p style={{margin: "0 auto", color: "green", textAlign: "center", marginBottom: "1.1rem"}}>{accountUpdated}</p>
          }

          <div className="flex gap-3">
            <div className="flex flex-col">
              <label htmlFor="First Name">First Name</label>
              <input type="text" required className="outline-none p-2 border border-mainColor rounded-md focus:border-secondaryColor w-full" name="firstName" onChange={handleInputChange} defaultValue={user.firstName}/>
            </div>

            <div className="flex flex-col">
              <label htmlFor="First Name">Last Name</label>
              <input type="text" required className="outline-none p-2 border border-mainColor rounded-md focus:border-secondaryColor w-full" name="lastName" onChange={handleInputChange} defaultValue={user.lastName}/>
            </div>
          </div>

          <div className="flex gap-3">
            <div className="flex flex-col">
              <label htmlFor="Address">Address</label>
              <input type="text" required className="outline-none p-2 border border-mainColor rounded-md focus:border-secondaryColor w-full" name="address" onChange={handleInputChange} defaultValue={user.address}/>
            </div>

            <div className="flex flex-col">
              <label htmlFor="Phone Number">Phone Number</label>
              <input type="number" required className="outline-none p-2 border border-mainColor rounded-md focus:border-secondaryColor w-full" name="phoneNo" onChange={handleInputChange} defaultValue={user.phoneNo}/>
            </div>


          </div>

          <div className="flex flex-col w-full">
              <label htmlFor="Email Address">Email Address</label>
              <input type="email" required className="w-full outline-none p-2 border border-mainColor rounded-md focus:border-secondaryColor" name="email" onChange={handleInputChange} defaultValue={user.email}/>
            </div>


          <button type="submit" className="w-full p-3 px-5 bg-secondaryColor text-whiteColor btnbtn rounded-md hover:bg-textColor">Save</button>
        </form>
      </div>
    )
}
