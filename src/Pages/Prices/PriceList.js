import axios from "axios";
import React from "react";
import { useQuery } from "react-query";
import styled from "styled-components";

// TODO This Page shows the full price list in the site, a tab menu to open different price list for services
export default function PriceList() {

    const [activeTab, setActiveTab] = React.useState(1);

    const handleTabClick = (tabIndex) => {
      setActiveTab(tabIndex);
    };

    function getPrices() {
        return axios.get("http://localhost:9000/api/prices")
    }

    // api/prices/:groupName

    const { data } = useQuery('prices', getPrices);

    // ======== Creating An Array to store Prices based on their Services
    let ironArray = [];
    let dryCleanArray = [];
    let stainRemovalArray = [];

    // ======== Looping through the prices in the array
    data?.data.forEach(price => {
        if(price.group === "Iron and Fold"){
            ironArray.push(price)
        }
        else if(price.group === "Dry Cleaning"){
            dryCleanArray.push(price)
        }
        else if(price.group === "Stain Removal"){
            stainRemovalArray.push(price)
        }
    });

    
    // TODO create an endpoint that finds all details based on a certain value
    // TODO we loop through the database and then display each one and pass the name of the group based on the id and then we send the name to the server

    return (
        <Container>

            <TopContent>
                <h3>Full Price Table</h3>
            </TopContent>

            <div>
                <TabList>
                    <TabButton active={activeTab === 1} onClick={() => handleTabClick(1)}>
                    Iron and Fold
                    </TabButton>
                    <TabButton active={activeTab === 2} onClick={() => handleTabClick(2)}>
                    Dry Cleaning
                    </TabButton>
                    <TabButton active={activeTab === 3} onClick={() => handleTabClick(3)}>
                    Stain Removal
                    </TabButton>
                </TabList>

                <div className="tabContents">

                    <TabContent active={activeTab === 1}>
                        {
                            ironArray.map(price => {
                                return <div className="price">
                                    <p>{price.name}</p>
                                    <p>${price.price}</p>
                                </div>
                            })
                        }
                    </TabContent>

                    <TabContent active={activeTab === 2}>
                        {
                            dryCleanArray.map(price => {
                                return <div className="price">
                                    <p>{price.name}</p>
                                    <p>${price.price}</p>
                                </div>
                            })
                        }
                    </TabContent>

                    <TabContent active={activeTab === 3}>
                        {
                            stainRemovalArray.map(price => {
                                return <div className="price">
                                    <p>{price.name}</p>
                                    <p>${price.price}</p>
                                </div>
                            })
                        }
                    </TabContent>
                    
                </div>
                
            </div>

        </Container>
    )
}

// ========================== STYLES ========================= \\

// =============== Root Variables

const primary = "#34347C";
const secondary = "#34CCA1";
const bg = "#F4F4F4";
const borderRad = "5px";
// const yellowBtnHover = "#f7cb39";
const gray = "#7A8C87";

const Container = styled.div`
    padding: 2rem;

    .tabContents{
        display: flex;
        justify-content: start;
        align-items: center;
        position: relative;
        width: 70%;
        margin: 0 auto;
        margin-top: 2rem;

        @media screen and (max-width: 600px){
            width: 100%;
        }
    }

`

const TopContent = styled.div`
    text-align: center;
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


const TabList = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: 1rem;
  gap: 0.5rem;


  @media screen and (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
  }
`;

const TabButton = styled.button`
  padding: 1.4rem;
  border: none;
  background-color: ${(props) => (props.active ? `${secondary}` : "#fff")};
  box-shadow: ${(props) => (props.active ? "" : "0 0 10px 5px rgb(240, 240, 240)")};
  flex: .5;
  font-weight: 700;
  font-size: 1.35rem;
  color: ${(props) => (props.active ? `${bg}` : `${gray}`)};
  border-radius: ${borderRad};
  cursor: pointer;
  transition: all .2s ease-in-out;

  @media screen and (max-width: 768px) {
    width: 100%;
    font-size: 1.2rem;
  }

  &:hover{
    color: ${(props) => (props.active ? `${bg}` : `${secondary}`)};
    transition: all .2s ease-in-out;
  }
`;

const TabContent = styled.div`
/* // ! Here we are checking what the props active is currently and based on that we can specify whether it should be db/seen or dn/not seen */
  scale: ${(props) => (props.active ?  1 : 0 )};
  display: ${(props) => (props.active ?  "grid" : "none" )};
  /* position: absolute; */
  /* transform: ${(props) => (props.active ?  "translateX(-80%)" : "" )}; */
  grid-template-columns: repeat(2, 1fr);
  top: 0;
  left: 0;
  transition: all .2s ease-in-out;
  flex: 1;
  gap: 1rem;

  @media screen and (max-width: 500px) {
    grid-template-columns: repeat(1, 1fr);
  }

  .price{
    display: flex;
    padding: 0.8rem 1.3rem;
    align-items: center;
    justify-content: space-between;
    flex: 1;
    width: 100%;
    background-color: #E9B6092b;
    border-radius: 25px;
  }

`;
