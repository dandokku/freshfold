import React from "react";
import { Link } from "react-router-dom";
import {styled} from "styled-components"
import axios from "axios";
import { useQuery } from "react-query";
import { FiArrowRight } from "react-icons/fi";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function OfferedServices() {
  // Fetch services data
  const { data, isLoading, isError } = useQuery("services", () =>
    axios.get("http://localhost:9000/api/services")
  );

  // Loading state
  if (isLoading) {
    return (
      <ServicesContainer>
        <Header>
          <h2>Our Premium Services</h2>
          <p>Experience top-quality cleaning solutions</p>
        </Header>
        
        <ServicesGrid>
          {[...Array(4)].map((_, i) => (
            <ServiceCardSkeleton key={i}>
              <Skeleton height={200} style={{ borderRadius: "12px 12px 0 0" }} />
              <div style={{ padding: "1.5rem" }}>
                <Skeleton height={24} width="80%" style={{ marginBottom: "0.5rem" }} />
                <Skeleton height={16} count={3} style={{ marginBottom: "0.25rem" }} />
              </div>
            </ServiceCardSkeleton>
          ))}
        </ServicesGrid>
      </ServicesContainer>
    );
  }

  // Error state
  if (isError) {
    return (
      <ServicesContainer>
        <Header>
          <h2>Our Premium Services</h2>
          <p>Experience top-quality cleaning solutions</p>
        </Header>
        <ErrorMessage>
          Failed to load services. Please try again later.
        </ErrorMessage>
      </ServicesContainer>
    );
  }

  return (
    <ServicesContainer>
      <Header>
        <h2>Our Premium Services</h2>
        <p>Experience top-quality cleaning solutions</p>
      </Header>

      <ServicesGrid>
        {data?.data.map((service) => (
          <ServiceCard key={service._id}>
            <Link to={`/services/${service._id}`}>
              <ServiceImage className="service-image">
                <img 
                  src={service.imageUrl || "https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bGF1bmRyeXxlbnwwfHwwfHx8MA%3D%3D"} 
                  alt={service.serviceName}
                />
                <Overlay />
              </ServiceImage>
              
              <ServiceContent>
                <h3>{service.serviceName}</h3>
                <p>{service.description}</p>
                <LearnMore>
                  Book Now <FiArrowRight className="arrow-icon" />
                </LearnMore>
              </ServiceContent>
            </Link>
          </ServiceCard>
        ))}
      </ServicesGrid>
    </ServicesContainer>
  );
}

// Styled Components
const ServicesContainer = styled.section`
  padding: 4rem 1rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 3rem;

  h2 {
    font-size: 2.25rem;
    color: #2d3748;
    margin-bottom: 0.5rem;
    font-weight: 700;
  }

  p {
    font-size: 1.125rem;
    color: #718096;
  }

  @media (max-width: 768px) {
    h2 {
      font-size: 1.75rem;
    }
    p {
      font-size: 1rem;
    }
  }
`;

const ServicesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
`;

const ServiceCard = styled.article`
  background: #fff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
    
    .service-image img {
      transform: scale(1.05);
    }
    
    .arrow-icon {
      transform: translateX(3px);
    }
  }

  a {
    text-decoration: none;
    color: inherit;
    display: block;
    height: 100%;
  }
`;

const ServiceCardSkeleton = styled.div`
  background: #fff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
`;

const ServiceImage = styled.div`
  height: 200px;
  overflow: hidden;
  position: relative;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;
  }
`;

const Overlay = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 40%;
  background: linear-gradient(transparent, rgba(0,0,0,0.7));
`;

const ServiceContent = styled.div`
  padding: 1.5rem;

  h3 {
    font-size: 1.25rem;
    color: #2d3748;
    margin-bottom: 0.75rem;
    font-weight: 600;
  }

  p {
    font-size: 0.95rem;
    color: #4a5568;
    margin-bottom: 1.5rem;
    line-height: 1.5;
  }
`;

const LearnMore = styled.div`
  display: inline-flex;
  align-items: center;
  color: #34cca1;
  font-weight: 600;
  font-size: 0.95rem;
  transition: color 0.2s ease;

  .arrow-icon {
    margin-left: 0.25rem;
    transition: transform 0.2s ease;
  }

  ${ServiceCard}:hover & {
    color: #2ebd92;
  }
`;

const ErrorMessage = styled.div`
  background: #ffebee;
  color: #c62828;
  padding: 1.5rem;
  border-radius: 8px;
  text-align: center;
  margin-top: 2rem;
`;