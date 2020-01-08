import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import UsersTable from "./pages/UsersTable";
import AddUserForm from "./pages/AddUserForm";

function App() {
  return (
    <Router>
      <section className="App">
        <header className="box-menu">
          <menu className="router-menu">
            <Link to="/users">
              <div className="button-red">Users</div>
            </Link>
            <Link to="/users/add" className="add_user">
              <div id="add_user">+</div>
            </Link>
          </menu>
        </header>
        <Switch>
          <Route path="/users/add">
            <AddUserForm />
          </Route>
          <Route path="/users">
            <UsersTable />
          </Route>
        </Switch>
      </section>
    </Router>
  );
}

export default App;
