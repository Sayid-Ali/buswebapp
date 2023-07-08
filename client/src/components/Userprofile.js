import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUserProfile, updateUserProfile } from "../actions/useractions";
import { Input, Button, notification } from "antd";

const Userprofile = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [idNumber, setIdNumber] = useState("")

  const user = useSelector((state) => state.users.user);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserProfile());
  }, []);

  useEffect(() => {
    setFirstName(user.firstName);
    setLastName(user.lastName);
    setMiddleName(user.middleName);
    setEmail(user.email);
    setPhoneNumber(user.phoneNumber);
    setIdNumber(user.idNumber);
  }, [user]);

  const handleUpdateProfile = () => {
  
    const userId = user._id
    const updatedProfile = {
      firstName: firstName,
      lastName: lastName,
      middleName: middleName,
      email: email,
      phoneNumber: phoneNumber,
    };
    dispatch(updateUserProfile(updatedProfile, userId))
    .then(() => {
      notification.success({
        message: "Profile Update",
        description: "Your profile has been successfully updated.",
        duration: 3, // Auto close after 3 seconds
        centered: true, // Centered on the page
      });
    })
    .catch((error) => {
      notification.error({
        message: "Profile Update",
        description: "An error occurred while updating your profile.",
        duration: 3, // Auto close after 3 seconds
        centered: true, // Centered on the page
        // center it
        
      });
    });
  };

  return (
    <div style={{ maxWidth: "500px", margin: "0 auto" }}>
      <h1>User Profile</h1>
      <Input
        placeholder="firstName"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        style={{ marginBottom: "16px" }}
      />
      <Input
        placeholder="middleName" 
        value={middleName}
        onChange={(e) => setMiddleName(e.target.value)}
        style={{ marginBottom: "16px" }}
      />
      
      <Input
        placeholder="lastName"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        style={{ marginBottom: "16px" }}
      />
      
      <Input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ marginBottom: "16px" }}
      />
      <Input
        placeholder="Phone Number"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
        style={{ marginBottom: "16px" }}
      />
      <Input 
        placeholder="ID Number"
        value={idNumber}
        onChange={(e) => setIdNumber(e.target.value)}
        style={{marginBottom: "16px"}}
        />
      <Button onClick={handleUpdateProfile}>Update Profile</Button>
    </div>
  );
};

export default Userprofile;
