import React from "react";
import { useSelector, useDispatch } from "react-redux";
import _ from "lodash";

const UsersTable = () => {
  const dispatch = useDispatch();
  const users = useSelector(state => state.users.past);
  const sort = useSelector(state => state.sort);
  const getElementTable = element => {
    return (
      <tr className={`row-table rowId-${element.id}`} key={element.id}>
        <td>{element.Name}</td>
        <td>{element.Age}</td>
        <td>{element.City}</td>
      </tr>
    );
  };
  const getHeader = () => {
    const onSort = e => {
      let elementName = e.currentTarget.getAttribute("name");
      dispatch({
        type: "ON_SORT",
        elementName
      });
    };
    return (
      <tr className="header-table">
        <th name="Name" className={`sort-${sort.Name}`} onClick={onSort}>
          <div className="sort-box">
            <span>Name</span>
          </div>
        </th>
        <th name="Age" className={`sort-${sort.Age}`} onClick={onSort}>
          <div className="sort-box">
            <span>Age</span>
          </div>
        </th>
        <th name="City" className={`sort-${sort.City}`} onClick={onSort}>
          <div className="sort-box">
            <span>City</span>
          </div>
        </th>
      </tr>
    );
  };
  const deleteAllUsers = () => dispatch({ type: "DELETE_ALL_USERS" });
  const deleteRandomUser = () => dispatch({ type: "DELETE_RANDOM_USERS" });
  const undoUsers = () => dispatch({ type: "UNDO" });
  return (
    <div className="box-table">
      <table id="users-table">
        <caption>Users</caption>
        <thead>{getHeader()}</thead>
        <tbody>{users.map(el => getElementTable(el))}</tbody>
      </table>
      <div className="button-box-table">
        <button onClick={deleteAllUsers}>Clear</button>
        <button onClick={deleteRandomUser}>Delete a random user</button>
        <button onClick={undoUsers}>Restore</button>
      </div>
    </div>
  );
};

export default UsersTable;
