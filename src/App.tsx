import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import SendMessage from "./components/pages/SendMessage/SendMessage";
import SendItem from "./components/pages/SendItem/SendItem";
import ManageReviews from "./components/pages/ManageReviews/ManageReviews";
import UserList from "./components/pages/UserList/UserList";
import AuditeLog from "./components/pages/AuditeLog/AuditeLog";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="logo" alt="logo" />
      </header>
      <div className={'content'}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route path="SendMessage" index element={<SendMessage />} />
              <Route path="SendItem" index element={<SendItem />} />
              <Route path="ManageReviews" index element={<ManageReviews />} />
              <Route path="UserList" index element={<UserList />} />
              <Route path="AuditeLog" index element={<AuditeLog />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
