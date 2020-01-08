import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import _ from "lodash";

const AddUserForm = () => {
  const dispatch = useDispatch();
  const users = useSelector(state => state.users.past);
  const [newUserParams, setNewUserParams] = useState({
    Name: "",
    Age: "",
    City: ""
  });
  const [successAddUser, setSuccessAddUser] = useState(false);
  const onChange = e =>
    setNewUserParams({
      ...newUserParams,
      [e.currentTarget.getAttribute("name")]: e.target.value
    });
  const addUser = () => {
    let newUser = {
      id: _.maxBy(users, o => o.id).id + 1,
      Name: newUserParams.Name,
      Age: newUserParams.Age,
      City: newUserParams.City
    };
    let newArrUsers = [newUser, ...users];
    dispatch({
      type: "ADD_USER",
      users: newArrUsers
    });
    setSuccessAddUser(true);
  };
  return (
    <div className="modal-form">
      {successAddUser ? (
        <div>
          <div>User added!</div>
          <button onClick={() => setSuccessAddUser(false)}>Add more</button>
        </div>
      ) : (
        <div>
          <div>Add new User</div>
          <div className="box-input">
            <input
              name="Name"
              key="Name"
              value={newUserParams.Name}
              onChange={onChange}
              placeholder="User Name"
            />
            <input
              name="Age"
              key="Age"
              value={newUserParams.Age}
              onChange={onChange}
              placeholder="User Age"
            />
            <input
              name="City"
              key="City"
              value={newUserParams.City}
              onChange={onChange}
              placeholder="User City"
            />
          </div>
          <button onClick={addUser}>Add</button>
        </div>
      )}
    </div>
  );
};

export default AddUserForm;
