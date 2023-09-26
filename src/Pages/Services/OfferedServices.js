import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import { useQuery } from "react-query";

// TODO This is a component showed in the Services Page, this component displays the Services offered by CleanCycle
export default function OfferedServices() {

    // ======== Function to make an axios request to get all the services from the db
    function getServices() {
        return axios.get("http://localhost:9000/api/services");
    }

    // ======== useQuery hook to fetch the data
    const { data, error, isLoading} = useQuery("services", getServices)

    // ======== Mapping through the data, creating a service card and then storing it in allServices
    const allServices = data?.data.map( service => {
        return <Link style={{textDecoration: "none", flex: ".5"}} to={`/services/${service._id}`}>
            <div key={service._id}>
            <div className="service-content">
                <h3>{service.serviceName}</h3>
                <p>{service.description}</p>
                
                {/* <div>
                    <BookServicesLink to={`/services/${service._id}`}>More Info</BookServicesLink>
                </div> */}

                {/* <PricesDiv>
                    <span className="btn-mask">Book</span>
                    <PricesLink to={`/services/${service._id}`}>Book</PricesLink>
                </PricesDiv> */}

            </div>
        </div>
        </Link>
    })


    return (
        <div className="mt-14 p-10">
            {allServices}
        </div>
        
    )

}
