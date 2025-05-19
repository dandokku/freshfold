import axios from 'axios';
import React, { useState } from 'react';
import Select from 'react-select';
import styled from 'styled-components';
import { useQuery } from 'react-query';

export default function DynamicSelectFields() {
  function getPrices() {
    return axios.get("http://localhost:9000/api/prices");
  }
    
  const { data, error, success } = useQuery("prices", getPrices);

  const [addedFields, setAddedFields] = React.useState(0)
  const [selectFields, setSelectFields] = useState([]);
  const [inputFields, setInputFields] = useState([]);
z
  const listOfPrices = data?.data;
  console.log(listOfPrices);

  const handleSelectChange = (selectedOption, index) => {
    const newSelectFields = [...selectFields];
    newSelectFields[index].selectedOption = selectedOption;
    setSelectFields(newSelectFields);
  };

  // ============== Submitting The form
  function handleSubmit(event) {
    event.preventDefault();

    let items = []

    const mainData = selectFields.forEach(item => {
      items.push({
        ...item.selectedOption,
        quantity: parseInt(item.quantity)
      })
    })

    console.log(items)

  }

  // =============== Handling the Change of an Input Field
  // * Here anytime data is typed in the field it sends the index we passed into it when it was created.
  const handleFieldsData = (index, event) => {
    
    setInputFields(prevState => {
      // ! Then get the prevState and we spread the prevState
      const newFields = [...prevState];
      // NB After spreaing we then say this newFields[index] we want to set mutate it, note that when the select field is created we pass in the index to this handleFieldsData so for example we have the index 0 so newFields[0] we set it to a spread of it so we dont affect its former values and then we set the event.target.name which is the option of the selectField selected and then we pass in the event.target.value so anytime we try to change a data nit checks the index of that one and modifies it
      newFields[index] = {
        ...newFields[index],
        [event.target.name]: event.target.value
      };
      return newFields;
    })

    // * So here since we cant have a number with the select field but in its object we can have the quantity to make it easier to send to the db, we just do the same thing since they have the same index we then update the quantity to have the value.
    const newSelectFields = [
      ...selectFields
    ];

    newSelectFields[index] = {
      ...newSelectFields[index],
      quantity: event.target.value
    }

    setSelectFields(newSelectFields)
    
  }

  console.log(inputFields);

  // =============== Removing a Select Field
  function handleRemoveSelectField() {
    //* To remove we just got the length and -1 since length starts from 1 but index starts from 0, and then we splice and put the information back.
    const newSelectFields = [...selectFields]
    console.log(newSelectFields.length)
    newSelectFields.splice(newSelectFields.length - 1, 1)
    setSelectFields(newSelectFields)

    const newInputFields = [...inputFields]
    newInputFields.splice(newInputFields.length - 1, 1)
    setInputFields(newInputFields)
  }

  // ================ Adding a new Select and Input Field
  const handleAddSelectField = () => {

    // * Here a PriceList was created to store the data from the database
    let priceList = [];
    // * Here we get the addedFields state and create a increment the state by 1
    let newAddedFields = addedFields + 1
    setAddedFields(newAddedFields)

    // * We loop through each price and then store its name and id inside the priceList
    data?.data.forEach((price, index) => {
        priceList.push({
          priceId: price._id,
          value: index + 1,
          label: price.name,
        })
      // }
              
    })

    // * Then we get the selectFields and spread the data and also added a new object, this object takes an id, options which contain the options and then option that was selected
    const newSelectFields = [
      ...selectFields,
      {
        id: selectFields.length + 1,
        // NB Here we set the options to the priceList which contains all of the prices from the DB
        options: priceList,
        selectedOption: null,
        quantity: 0
      }
    ];

    setSelectFields(newSelectFields)
  };

  console.log(selectFields)


  // ================ Styles for the Select Fields
  const selectStyles = {
    control: (provided, state) => ({
      ...provided,
      borderRadius: borderRad,
      height: "50px",
      maxWidth: "100%",
      fontSize: "1rem",
      letterSpacing: 0,
      font: "poppins",
      borderColor: state.isFocused ? "gray" : "gray",
      boxShadow: state.isFocused ? `0 0 0 3px #E9B6097b` : "",
      "&:hover": {
        borderColor: state.isFocused ? "#E9B6097b" : "#E9B609",
        boxShadow: state.isFocused ? "0 0 0 3px #E9B6097b" : "",
      }
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? secondary : "",
      ':hover': {
        backgroundColor: state.isSelected ? secondary : '#E9B6092b',
      },
      ':focus': {
        boxShadow: '0 0 0 3px #E9B6097b',
        borderColor: secondary
      }
    }),

  };

  return (
    <Container>
      <BookSection onSubmit={handleSubmit}>
        {/* // ! We map through each select field and get the individual fields and the index number } */}
        {selectFields.map((selectField, index) => (
          // NB For each one we create a div with a select and input box
          <div key={selectField.id} className='price-row'>
            <div>
              <Select
                options={selectField.options}
                value={selectField.selectedOption}
                onChange={(selectedOption) => handleSelectChange(selectedOption, index)}
                className='select-field'
                styles={selectStyles}
                placeholder = "Clothe"
              />
            </div>
            
          {/* // ! The input box checks whether the inputField of the current index is true and then sets the value to the that value */}
          <div>
            <input
                type="number"
                value={inputFields[index] ? inputFields[index].value : ""}
                // ! For this because we will be needing event and also an extra parameter we pass a function that calls the event.
                // ! And then we pass the index of the selectFields we looped through so that we can identify the each inputField.
                onChange={(event) => handleFieldsData(index, event)}
                // ! We also give it a name, so that we will be able specify which input field is for which select field.
                name={selectField.selectedOption?.label}
                min={1}
                max={200}
                className='input-field'
                placeholder='Quantity'
              />
          </div>
            
          </div>
        ))}

       <OperationButtons>
          <button onClick={handleAddSelectField} type='button' className='add-button'>Add Clothes</button>

          {/* // * Making sure that a select field has been added to the page before the submit button or the remove button can come up */}
          {
            selectFields.length >= 1 && <button onClick={handleRemoveSelectField} type='button' className='remove-button'>Remove Clothes</button> 
          }
       </OperationButtons>
        
       
        {  
          selectFields.length >= 1 && <button className='submit-button'>Submit</button>  
        }

      </BookSection>
    </Container>
  );
}

// ========================== STYLES ========================= \\

// =============== Root Variables

const primary = "#34347C";
const secondary = "#E9B609";
const bg = "#F4F4F4";
const borderRad = "5px";
const yellowBtnHover = "#f7cb39";
const gray = "#545454";


const Container = styled.div`
  padding: 1rem 3rem 1rem 3rem;

  @media screen and (max-width: 500px) {
    padding: 0.5rem;
  }
  
`;

const BookSection = styled.form`
  

  .price-row{
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    justify-content: center;
    align-items: center;
    place-items: center;
    gap: 2rem;

    input[type=number]::-webkit-inner-spin-button,
    input[type=number]::-webkit-outer-spin-button {
      -webkit-appearance: none;
      margin: 0;
      display: none;
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
      border: solid 1px gray;
      outline: none;
      text-indent: 1rem;
      font-size: 1rem;
      margin-bottom: 1rem;
      

      

      &:hover{
        border-color: ${secondary}
      }

      &:focus{
        box-shadow: 0 0 0 3px #E9B6097b;
        border-color: ${secondary}
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
    /* font-weight: 700; */
    border: none;
    outline: none;
    margin: 0 auto;
    display: block;
    margin-bottom: 1rem;

    &:hover{
      background-color: #34349d;
    }

  }



`;

const OperationButtons = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2rem;

  .add-button{
      padding: 0.8rem 1.5rem;
      background-color: ${secondary};
      color: ${primary};
      border-radius: ${borderRad};
      text-decoration: none;
      color: ${primary};
      cursor: pointer;
      font-weight: 700;
      border: none;
      outline: none;
      margin-bottom: 1rem;


      &:hover{
        background-color: ${yellowBtnHover};
      }

    @media screen and (max-width: 500px) {
      width: 100%;
    }
  }

  .remove-button{
      padding: 0.8rem 1.5rem;
      background-color: #F72609;
      color: ${bg};
      border-radius: ${borderRad};
      text-decoration: none;
      /* font-weight: 700; */
      border: none;
      outline: none;
      margin-bottom: 1rem;

      &:hover{
        background-color: #F26B6E;
      }
      @media screen and (max-width: 500px) {
      width: 100%;
    }
  }
`
