import React from "react";
import styled from "styled-components";
import { MdOutlineClear } from "react-icons/md"

// TODO This file is a component that will display the modal to show the client the items they have specified

export default function Modal(props) {
    // ========== State to Hold modal open 
    const [modalOpenClass, setModalOpenClass] = React.useState("popup-modal");

    // ======== Variables to store the totalprice and the verified items
    // NB the verified items is an array that holds all the items to be displayed on the modal
    let totalPrice = 0;
    let verifiedItems;

    // console.log(props?.totalPriceItems);
    // ======== Getting the values for the totalPrice and verifiedItems
    if(props.totalPriceItems){
        // Nb looping through the totalPriceItems props sent from the Service.js file
        props?.totalPriceItems?.forEach(item => {
            // * Incrementing the totalPrice based on the total Unit Price
            totalPrice += item.totalUnitPrice;
        })

        // * Mapping over the totalPriceItems and displaying each item with its picture for the user to see
         verifiedItems = props?.totalPriceItems?.map(item => {
            return <Item>
                <div>
                    <h2 className="font-bold text-xl text-textColor">{item.priceName}</h2>
                    <p className="font-semibold text-textColor">{item.quantity} x <span>${item.price}</span></p>
                    <p className="font-semibold text-textColor">Total: {item.totalUnitPrice}</p>
                </div>
    
            </Item>
        })
    }
    
    
    // ========= Variable to serve as the total Items picked for wash by the user
    const verifiedLength = props?.totalPriceItems?.length;

    // console.log(totalPrice)

    return (
        <Container>
            <ServiceModal className={props.modalClass}>

                <PopUpModal className="modal p-11 flex flex-col gap-3">
                    <div style={{marginBottom: "1rem", color: gray, display: "flex", justifyContent: "space-between"}}>
                        <h2 className="font-bold text-2xl text-headerTextColor">Verify Items</h2>
                        <div>
                            {/* // NB OnCLick of this close icon, set the the modalOpenClass back to just popup-modal which is making sure that the modal does not display */}
                            <MdOutlineClear size={30} className="cursor-pointer" onClick={() => props.setModalClass("popup-modal")}/>
                        </div>
                    </div>

                    <Items>
                        {/* <Item>
                            <div>
                                <img src={require("../assets/price-images/shirts-price.jpg")}></img>
                            </div>
                            <div>
                                <h2>Shirts</h2>
                                <p>9 x <span>$10</span></p>
                            </div>

                        </Item> */}
                        {verifiedItems}
                    </Items>

                    <Total>
                        <p>Item's Total({verifiedLength}):</p>
                        <p>${totalPrice}</p>
                    </Total>

                    <PricesDiv>
                        <button className="btnbtn font-bold hover:bg-shadColor hover:text-secondaryColor">Verify Booking</button>
                    </PricesDiv>
                    
                </PopUpModal>

            </ServiceModal>
        </Container>
    )
}

// ========================== STYLES ========================= \\

// =============== Root Variables

const secondary = "#34CCA1";
const bg = "rgb(230, 230, 230)";
const borderRad = "5px";
const gray = "#545454";

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

const Container = styled.div`

    .popup-modal.active{
        scale: 1;
        transition: all .3s ease-in-out;
    }



`

const PopUpModal = styled.div`
    background-color: ${bg};
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

const Items = styled.div`
   
`

const Item = styled.div`
    display: flex;
    /* justify-content: center; */
    align-items: center;
    gap: 1rem;
    margin-bottom: 1rem;

    div:first-child{
        flex: .2;

        img{
            width: 100%;
            border-radius: ${borderRad};
        }
    }

    div:last-child{
        flex: 1;
        color: ${gray};
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 2rem;

        @media screen and (max-width: 515px) {
            gap: 0.5rem;
        }

        h2{
            font-size: 1.1rem;
            flex: 1;

            @media screen and (max-width: 600px) {
                font-size: 1rem;
            }

            @media screen and (max-width: 515px) {
                font-size: 0.95rem;
            }
        }

        p{
            font-size: 1rem;
            flex: .5;
            @media screen and (max-width: 600px) {
                text-align: end;
            }

            @media screen and (max-width: 515px) {
                /* flex: .3; */
                font-size: 0.9rem;
            }

            span{
                font-weight: 700;
                color: ${secondary};
            }

            &:last-child{
                @media screen and (max-width: 600px) {
                    display: none;
                }
            }
        }
    }
`

const Total = styled.div`
    display: flex;
    align-items: center;
    gap: 2rem;
    justify-content: space-around;

    p:last-child{
        color: ${secondary};
        font-weight: 600;
        font-size: 1.3rem;
    }
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
