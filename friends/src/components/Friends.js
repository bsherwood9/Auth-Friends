import React, { useEffect, useContext } from "react";
import axiosWithAuth from "../utils/axiosWithAuth";
import { FriendContext } from "../contexts/FriendContext";
import { AddFriend } from "../components/AddFriend";
import "../App.css";

const Friends = () => {
  const { friendList, setFriendList } = useContext(FriendContext);

  useEffect(() => {
    axiosWithAuth()
      .get("/friends")
      .then(res => {
        setFriendList(res.data);
        console.log(res.data);
      })
      .catch(err => console.error(err));
  }, []);

  const deleteUser = id =>
    axiosWithAuth()
      .delete(`/friends/${id}`)
      .then(res => setFriendList(res.data))
      .catch(err => console.error(err));

  return (
    <div className="protect">
      <h1>Protect Friends</h1>
      {!friendList ? (
        <h1>rendering...</h1>
      ) : (
        <div className="list">
          {friendList.map(friend => (
            <div className="card" key={friend.id}>
              <h3>{friend.name}</h3>
              <h3>{friend.age}</h3>
              <h3>{friend.email}</h3>
              <button onClick={() => deleteUser(friend.id)}>Delete</button>
            </div>
          ))}
        </div>
      )}

      <AddFriend />
    </div>
  );
};

export default Friends;
