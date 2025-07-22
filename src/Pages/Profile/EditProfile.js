import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { useMutation, useQueryClient } from "react-query";
import { FiUser, FiMail, FiPhone, FiHome, FiCheckCircle, FiLock } from 'react-icons/fi';
import { FaSpinner } from 'react-icons/fa';
import { motion } from 'framer-motion';
import styled from 'styled-components';

export default function EditProfile() {
  const queryClient = useQueryClient();
  const user = useSelector((state) => state.user);

  // Form state
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    address: "",
    phoneNo: "",
    email: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  // Validation state
  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    address: "",
    phoneNo: "",
    email: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  // UI state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [activeTab, setActiveTab] = useState('profile'); // 'profile' or 'password'

  // Initialize form with user data
  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        address: user.address || "",
        phoneNo: user.phoneNo || "",
        email: user.email || ""
      }));
    }
  }, [user]);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setIsSuccess(false);
    
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Validate input
    validateField(name, value);
  };

  // Field validation
  const validateField = (name, value) => {
    let error = "";
    
    switch (name) {
      case "firstName":
      case "lastName":
        if (/[@#$!^%*0-9]/.test(value) || !value.trim()) {
          error = `${name === "firstName" ? "First" : "Last"} name cannot contain numbers or special characters`;
        }
        break;
      case "address":
        if (value.length < 10) {
          error = "Address must be at least 10 characters";
        }
        break;
      case "phoneNo":
        if (!/^[0-9]{10,15}$/.test(value)) {
          error = "Please enter a valid phone number (10-15 digits)";
        }
        break;
      case "email":
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          error = "Please enter a valid email address";
        }
        break;
      case "newPassword":
        if (value && value.length < 8) {
          error = "Password must be at least 8 characters";
        }
        break;
      case "confirmPassword":
        if (value !== formData.newPassword) {
          error = "Passwords do not match";
        }
        break;
      default:
        break;
    }

    setErrors(prev => ({
      ...prev,
      [name]: error
    }));
  };

  // Form submission
  const updateUser = async (userData) => {
    try {
      const payload = activeTab === 'profile' ? {
        firstName: userData.firstName,
        lastName: userData.lastName,
        address: userData.address,
        phoneNo: userData.phoneNo,
        email: userData.email
      } : {
        currentPassword: userData.currentPassword,
        newPassword: userData.newPassword
      };

      const response = await axios.put(
        `https://freshfoldserver.onrender.com/api/users/${user?.id}`,
        payload
      );
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Update failed");
    }
  };

  const { mutate } = useMutation(updateUser, {
    onMutate: () => {
      setIsSubmitting(true);
      setIsSuccess(false);
    },
    onSuccess: () => {
      queryClient.refetchQueries("user");
      setIsSuccess(true);
      if (activeTab === 'password') {
        setFormData(prev => ({
          ...prev,
          currentPassword: "",
          newPassword: "",
          confirmPassword: ""
        }));
      }
    },
    onError: (error) => {
      setErrors(prev => ({
        ...prev,
        form: error.message
      }));
    },
    onSettled: () => {
      setIsSubmitting(false);
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate all fields before submission
    let isValid = true;
    const newErrors = {...errors};

    if (activeTab === 'profile') {
      if (!formData.firstName.trim()) {
        newErrors.firstName = "First name is required";
        isValid = false;
      }
      if (!formData.lastName.trim()) {
        newErrors.lastName = "Last name is required";
        isValid = false;
      }
      if (!formData.email.trim()) {
        newErrors.email = "Email is required";
        isValid = false;
      }
      if (!formData.phoneNo.trim()) {
        newErrors.phoneNo = "Phone number is required";
        isValid = false;
      }
      if (!formData.address.trim()) {
        newErrors.address = "Address is required";
        isValid = false;
      }
    } else {
      if (!formData.currentPassword) {
        newErrors.currentPassword = "Current password is required";
        isValid = false;
      }
      if (!formData.newPassword) {
        newErrors.newPassword = "New password is required";
        isValid = false;
      } else if (formData.newPassword.length < 8) {
        newErrors.newPassword = "Password must be at least 8 characters";
        isValid = false;
      }
      if (formData.newPassword !== formData.confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match";
        isValid = false;
      }
    }

    setErrors(newErrors);
    if (!isValid) return;
    
    mutate(formData);
  };

  // Check if form is valid
  const isFormValid = activeTab === 'profile' 
    ? Object.values(formData).slice(0, 5).every(value => value.trim() !== "") && 
      Object.values(errors).slice(0, 5).every(error => error === "")
    : formData.currentPassword && formData.newPassword && formData.confirmPassword &&
      formData.newPassword === formData.confirmPassword &&
      formData.newPassword.length >= 8;

  return (
    <ProfileContainer>
      <ProfileCard>
        <Header>
          <h1>Account Settings</h1>
          <p>Manage your profile and security settings</p>
        </Header>

        <Tabs>
          <TabButton 
            active={activeTab === 'profile'} 
            onClick={() => setActiveTab('profile')}
          >
            Profile Information
          </TabButton>
          <TabButton 
            active={activeTab === 'password'} 
            onClick={() => setActiveTab('password')}
          >
            Change Password
          </TabButton>
        </Tabs>

        {isSuccess && (
          <SuccessMessage
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <FiCheckCircle className="icon" />
            <span>{activeTab === 'profile' ? 'Profile updated successfully!' : 'Password changed successfully!'}</span>
          </SuccessMessage>
        )}

        {errors.form && (
          <ErrorMessage
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <span>{errors.form}</span>
          </ErrorMessage>
        )}

        <Form onSubmit={handleSubmit}>
          {activeTab === 'profile' ? (
            <ProfileFields>
              <div className="name-fields">
                <FormGroup>
                  <Label htmlFor="firstName">
                    <FiUser className="icon" />
                    First Name
                  </Label>
                  <Input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    error={errors.firstName}
                  />
                  {errors.firstName && <ErrorText>{errors.firstName}</ErrorText>}
                </FormGroup>

                <FormGroup>
                  <Label htmlFor="lastName">
                    <FiUser className="icon" />
                    Last Name
                  </Label>
                  <Input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    error={errors.lastName}
                  />
                  {errors.lastName && <ErrorText>{errors.lastName}</ErrorText>}
                </FormGroup>
              </div>

              <FormGroup>
                <Label htmlFor="email">
                  <FiMail className="icon" />
                  Email Address
                </Label>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  error={errors.email}
                />
                {errors.email && <ErrorText>{errors.email}</ErrorText>}
              </FormGroup>

              <FormGroup>
                <Label htmlFor="phoneNo">
                  <FiPhone className="icon" />
                  Phone Number
                </Label>
                <Input
                  type="tel"
                  id="phoneNo"
                  name="phoneNo"
                  value={formData.phoneNo}
                  onChange={handleInputChange}
                  error={errors.phoneNo}
                />
                {errors.phoneNo && <ErrorText>{errors.phoneNo}</ErrorText>}
              </FormGroup>

              <FormGroup>
                <Label htmlFor="address">
                  <FiHome className="icon" />
                  Home Address
                </Label>
                <Input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  error={errors.address}
                />
                {errors.address && <ErrorText>{errors.address}</ErrorText>}
              </FormGroup>
            </ProfileFields>
          ) : (
            <PasswordFields>
              <FormGroup>
                <Label htmlFor="currentPassword">
                  <FiLock className="icon" />
                  Current Password
                </Label>
                <Input
                  type="password"
                  id="currentPassword"
                  name="currentPassword"
                  value={formData.currentPassword}
                  onChange={handleInputChange}
                  error={errors.currentPassword}
                />
                {errors.currentPassword && <ErrorText>{errors.currentPassword}</ErrorText>}
              </FormGroup>

              <FormGroup>
                <Label htmlFor="newPassword">
                  <FiLock className="icon" />
                  New Password
                </Label>
                <Input
                  type="password"
                  id="newPassword"
                  name="newPassword"
                  value={formData.newPassword}
                  onChange={handleInputChange}
                  error={errors.newPassword}
                />
                {errors.newPassword && <ErrorText>{errors.newPassword}</ErrorText>}
              </FormGroup>

              <FormGroup>
                <Label htmlFor="confirmPassword">
                  <FiLock className="icon" />
                  Confirm Password
                </Label>
                <Input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  error={errors.confirmPassword}
                />
                {errors.confirmPassword && <ErrorText>{errors.confirmPassword}</ErrorText>}
              </FormGroup>
            </PasswordFields>
          )}

          <SubmitButton
            type="submit"
            disabled={!isFormValid || isSubmitting}
            isSubmitting={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <FaSpinner className="spinner" />
                {activeTab === 'profile' ? 'Saving...' : 'Updating...'}
              </>
            ) : (
              activeTab === 'profile' ? 'Save Profile' : 'Change Password'
            )}
          </SubmitButton>
        </Form>
      </ProfileCard>
    </ProfileContainer>
  );
}

// Styled Components
const ProfileContainer = styled.div`
  min-height: 100vh;
  background-color: #f8fafc;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 2rem 1rem;
  margin-top: 4rem;
`;

const ProfileCard = styled.div`
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  width: 100%;
  max-width: 800px;
  padding: 2.5rem;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 2rem;

  h1 {
    font-size: 1.75rem;
    color: #1e293b;
    font-weight: 700;
    margin-bottom: 0.5rem;
  }

  p {
    color: #64748b;
    font-size: 1rem;
  }
`;

const Tabs = styled.div`
  display: flex;
  border-bottom: 1px solid #e2e8f0;
  margin-bottom: 1.5rem;
`;

const TabButton = styled.button`
  padding: 0.75rem 1.5rem;
  background: none;
  border: none;
  font-weight: 600;
  color: ${props => props.active ? '#34CCA1' : '#64748b'};
  border-bottom: 2px solid ${props => props.active ? '#34CCA1' : 'transparent'};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    color: #34CCA1;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const ProfileFields = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  .name-fields {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.5rem;

    @media (max-width: 640px) {
      grid-template-columns: 1fr;
    }
  }
`;

const PasswordFields = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-size: 0.875rem;
  font-weight: 600;
  color: #475569;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  .icon {
    color: #94a3b8;
  }
`;

const Input = styled.input`
  padding: 0.75rem 1rem;
  border: 1px solid ${props => props.error ? '#f87171' : '#e2e8f0'};
  border-radius: 8px;
  font-size: 0.95rem;
  transition: all 0.2s ease;
  background-color: #f8fafc;

  &:focus {
    outline: none;
    border-color: #34CCA1;
    box-shadow: 0 0 0 2px rgba(52, 204, 161, 0.2);
  }

  &::placeholder {
    color: #94a3b8;
  }
`;

const ErrorText = styled.span`
  font-size: 0.75rem;
  color: #ef4444;
`;

const SuccessMessage = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  background-color: #ecfdf5;
  color: #059669;
  border-radius: 8px;
  margin-bottom: 1rem;

  .icon {
    font-size: 1.25rem;
  }
`;

const ErrorMessage = styled(motion.div)`
  padding: 0.75rem 1rem;
  background-color: #fee2e2;
  color: #dc2626;
  border-radius: 8px;
  margin-bottom: 1rem;
`;

const SubmitButton = styled.button`
  padding: 0.875rem 1.5rem;
  background-color: ${props => props.disabled ? '#cbd5e1' : '#34CCA1'};
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  font-size: 1rem;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 1rem;

  &:hover {
    background-color: ${props => props.disabled ? '#cbd5e1' : '#2ebd92'};
  }

  .spinner {
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
`;