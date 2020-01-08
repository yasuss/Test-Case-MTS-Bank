import initialState from "./initialState.json";
import _ from "lodash";

function reducer(state = initialState, action) {
  let sortFunc = (users, [elementName, newSortType]) => {
    return _.orderBy(users, [elementName], [newSortType]);
  };
  switch (action.type) {
    case "ON_SORT":
      let currentSortType = state.sort[action.elementName];
      let newSortType = "none";
      switch (currentSortType) {
        case "none":
          newSortType = "asc";
          break;
        case "asc":
          newSortType = "desc";
          break;
        case "desc":
          newSortType = "none";
          break;
        default:
          break;
      }
      let sortParams =
        newSortType === "none"
          ? ["id", "asc"]
          : [action.elementName, newSortType];
      let sortUsers = sortFunc(state.users.past, sortParams);
      let defaultSort = {
        Name: "none",
        Age: "none",
        City: "none"
      };
      return {
        sort: Object.assign(defaultSort, { [action.elementName]: newSortType }),
        users: {
          ...state.users,
          past: sortUsers
        }
      };
    case "ADD_USER":
      let sortEl = ["id", "asc"];
      for (let key in state.sort) {
        if (state.sort[key] !== "none") {
          sortEl = [key, state.sort[key]];
          break;
        }
      }
      return {
        ...state,
        users: {
          ...state.users,
          past: sortFunc(action.users, sortEl)
        }
      };
    case "DELETE_ALL_USERS":
      return {
        ...state,
        users: {
          past: [],
          present: state.users.past[state.users.past.length - 1],
          future: [...state.users.past.slice(0, state.users.past.length - 1)]
        }
      };
    case "DELETE_RANDOM_USERS":
      const randomUser =
        state.users.past[Math.floor(Math.random() * state.users.past.length)];
      const newArrUsers = JSON.parse(JSON.stringify(state.users.past));
      _.remove(newArrUsers, n => n.id === randomUser.id);
      return {
        ...state,
        users: {
          past: newArrUsers,
          present: randomUser,
          future: [state.users.present, ...state.users.future]
        }
      };
    case "UNDO":
      const next = state.users.future[0];
      const newFuture = state.users.future.slice(1);
      if (next === undefined) {
        return {
          ...state
        };
      }
      return {
        ...state,
        users: {
          past: [...state.users.past, state.users.present],
          present: next,
          future: newFuture
        }
      };
    default:
      return state;
  }
}

export default reducer;
