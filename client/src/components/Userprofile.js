import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUserProfile, updateUserProfile } from "../actions/useractions";
import { Input, Button } from "antd";

const Userprofile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const user = useSelector((state) => state.users.user);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserProfile());
  }, []);

  useEffect(() => {
    setName(user.name);
    setEmail(user.email);
    setPhoneNumber(user.phoneNumber);
  }, [user]);

  const handleUpdateProfile = () => {
    const updatedProfile = {
      name: name,
      email: email,
      phoneNumber: phoneNumber,
    };
    dispatch(updateUserProfile(updatedProfile));
  };

  return (
    <div style={{ maxWidth: "500px", margin: "0 auto" }}>
      <h1>User Profile</h1>
      <Input
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
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
      <Button onClick={handleUpdateProfile}>Update Profile</Button>
    </div>
  );
};

export default Userprofile;
