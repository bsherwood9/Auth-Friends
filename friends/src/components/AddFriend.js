import React, { useState, useContext } from "react";
import { FriendContext } from "../contexts/FriendContext";
import axiosWithAuth from "../utils/axiosWithAuth";
import "../App.css";

export const AddFriend = () => {
  const { setFriendList } = useContext(FriendContext);
  const [newFriend, setNewFriend] = useState({
    id: "",
    name: "",
    age: "",
    email: ""
  });
  const addToArray = e => {
    e.preventDefault();
    axiosWithAuth()
      .post("/friends", newFriend)
      .then(res => {
        setFriendList(res.data);
        setNewFriend({ ...newFriend, id: "", age: "", name: "", email: "" });
      })
      .catch(err => console.error(err));
  };
  const handleChange = e => {
    setNewFriend({
      ...newFriend,
      id: Date.now(),
      [e.target.name]: e.target.value
    });
  };
  return (
    <form className="addFriend" onSubmit={addToArray}>
      <label>Name:</label>
      <input
        type="text"
        name="name"
        value={newFriend.name}
        onChange={handleChange}
      />
      <label>Age:</label>
      <input
        type="number"
        name="age"
        value={newFriend.age}
        onChange={handleChange}
      />
      <label>Email:</label>
      <input
        type="email"
        name="email"
        value={newFriend.email}
        onChange={handleChange}
      />
      <button>Add Friend</button>
    </form>
  );
};
