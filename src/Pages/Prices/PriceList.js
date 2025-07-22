import axios from "axios";
import React, { useMemo, useState } from "react";
import { useQuery } from "react-query";
import styled from "styled-components";
import { FiDollarSign } from "react-icons/fi";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const TABS = [
  { id: 1, label: "Iron & Fold", key: "Iron and Fold" },
  { id: 2, label: "Dry Cleaning", key: "Dry Cleaning" },
  { id: 3, label: "Stain Removal", key: "Stain Removal" },
];

export default function PriceList() {
  const [activeTab, setActiveTab] = useState(1);
  const { data, isLoading, isError } = useQuery("prices", () =>
    axios.get("https://freshfoldserver.onrender.com/api/prices")
  );

  const categorizedPrices = useMemo(() => {
    const categories = {
      "Iron and Fold": [],
      "Dry Cleaning": [],
      "Stain Removal": [],
    };

    data?.data.forEach((price) => {
      if (categories[price.group]) {
        categories[price.group].push(price);
      }
    });

    return categories;
  }, [data]);

  // Loading state
  if (isLoading) {
    return (
      <Container>
        <TopContent>
          <h3>Our Services & Pricing</h3>
          <p className="subtitle">Transparent pricing for all our services</p>
        </TopContent>
        
        <TabList>
          {TABS.map((tab) => (
            <Skeleton key={tab.id} height={50} width={150} style={{ marginRight: "1rem" }} />
          ))}
        </TabList>
        
        <PriceGrid>
          {[...Array(6)].map((_, i) => (
            <Skeleton key={i} height={80} style={{ borderRadius: "12px", marginBottom: "1rem" }} />
          ))}
        </PriceGrid>
      </Container>
    );
  }

  // Error state
  if (isError) {
    return (
      <Container>
        <TopContent>
          <h3>Our Services & Pricing</h3>
          <p className="subtitle">Transparent pricing for all our services</p>
        </TopContent>
        
        <div className="error-message">
          Failed to load prices. Please try again later.
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <TopContent>
        <h3>Our Services & Pricing</h3>
        <p className="subtitle">Transparent pricing for all our services</p>
      </TopContent>

      <TabList>
        {TABS.map((tab) => (
          <TabButton
            key={tab.id}
            active={activeTab === tab.id}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
            {activeTab === tab.id && <ActiveTabIndicator />}
          </TabButton>
        ))}
      </TabList>

      <PriceGrid>
        {TABS.map((tab) => (
          <TabContent key={tab.id} active={activeTab === tab.id}>
            {categorizedPrices[tab.key]?.length > 0 ? (
              categorizedPrices[tab.key].map((price, idx) => (
                <PriceCard key={price.id || idx}>
                  <ServiceName>{price.name}</ServiceName>
                  <Price>
                    <FiDollarSign />
                    <span>{price.price.toFixed(2)}</span>
                  </Price>
                </PriceCard>
              ))
            ) : (
              <EmptyState>No prices available for this category</EmptyState>
            )}
          </TabContent>
        ))}
      </PriceGrid>
    </Container>
  );
}

// Styled Components
const Container = styled.div`
  padding: 2rem 1rem;
  max-width: 1200px;
  margin: 0 auto;
  min-height: 70vh;

  .error-message {
    background: #ffebee;
    color: #c62828;
    padding: 1rem;
    border-radius: 8px;
    text-align: center;
    margin-top: 2rem;
  }
`;

const TopContent = styled.div`
  text-align: center;
  margin-bottom: 3rem;

  h3 {
    font-size: 2rem;
    color: #2d3748;
    margin-bottom: 0.5rem;
    font-weight: 700;
  }

  .subtitle {
    color: #718096;
    font-size: 1.1rem;
  }

  @media (max-width: 768px) {
    h3 {
      font-size: 1.8rem;
    }
  }
`;

const TabList = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    gap: 0.5rem;
  }
`;

const TabButton = styled.button`
  padding: 1rem 1.5rem;
  border: none;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 8px;
  cursor: pointer;
  background-color: ${(props) => (props.active ? "#34CCA1" : "#f7fafc")};
  color: ${(props) => (props.active ? "#fff" : "#4a5568")};
  transition: all 0.2s ease;
  position: relative;
  overflow: hidden;
  box-shadow: ${(props) => props.active ? "0 4px 6px -1px rgba(0, 0, 0, 0.1)" : "none"};

  &:hover {
    background-color: ${(props) => (props.active ? "#2ebd92" : "#edf2f7")};
  }

  @media (max-width: 768px) {
    padding: 0.8rem 1rem;
    font-size: 0.9rem;
  }
`;

const ActiveTabIndicator = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 3px;
  background-color: #fff;
`;

const PriceGrid = styled.div`
  position: relative;
  min-height: 300px;
`;

const TabContent = styled.div`
  display: ${(props) => (props.active ? "grid" : "none")};
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
  animation: fadeIn 0.3s ease-out;

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const PriceCard = styled.div`
  background: #fff;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  }
`;

const ServiceName = styled.p`
  font-size: 1.1rem;
  color: #2d3748;
  font-weight: 500;
  margin: 0;
`;

const Price = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.2rem;
  color: #34CCA1;
  font-weight: 700;

  svg {
    margin-right: 0.3rem;
    font-size: 1rem;
  }
`;

const EmptyState = styled.div`
  grid-column: 1 / -1;
  text-align: center;
  padding: 2rem;
  color: #718096;
  font-size: 1.1rem;
`;