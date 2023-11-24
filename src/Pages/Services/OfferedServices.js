import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import { useQuery } from "react-query";
import "./OfferedServices.css"

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
                <div className="your-custom-item">
                    <a href="#" className="item-link w-fit p-5">
                        <div className="item-bg"></div>
                        <h3 className="item-title">{service.serviceName}</h3>
                        <p className="item-description">{service.description}</p>
                    </a>
                </div>

        </div>
        </Link>
    })


    return (
        <div className="mt-20 p-10 flex flex-col items-center justify-center gap-8">
            <div className="text-center">
                <h1 className="font-bold text-4xl text-headerTextColor">Our Services</h1>
                <p className="text-secondaryColor">These are the services offered by freshfold:</p>
            </div>
            <div className="flex flex-wrap items-center justify-between text-mainColor text-center gap-5">
                {allServices}
            </div>
        </div>
        
    )

}
