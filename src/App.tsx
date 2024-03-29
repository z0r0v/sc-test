import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import SendMessage from "./components/pages/SendMessage/SendMessage";
import SendItem from "./components/pages/SendItem/SendItem";
import ManageReviews from "./components/pages/ManageReviews/ManageReviews";
import UserList from "./components/pages/UserList/UserList";
import AuditeLog from "./components/pages/AuditeLog/AuditeLog";
import { Person } from "@mui/icons-material";
import MailIcon from "@mui/icons-material/Mail";
import HomeRepairServiceIcon from "@mui/icons-material/HomeRepairService";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import ListAltIcon from "@mui/icons-material/ListAlt";
import Box from '@mui/material/Box';

export type PageItem = {
  name: string;
  icon: JSX.Element;
  href: string;
  component: JSX.Element;
};
function App() {
  const pages: PageItem[] = [
    {
      name: "User's list",
      icon: <Person />,
      href: "SendMessage",
      component: <SendMessage />,
    },
    {
      name: "Message's",
      icon: <MailIcon />,
      href: "SendItem",
      component: <SendItem />,
    },
    {
      name: "Item 's",
      icon: <HomeRepairServiceIcon />,
      href: "ManageReviews",
      component: <ManageReviews />,
    },
    {
      name: "Review's",
      icon: <RemoveRedEyeIcon />,
      href: "AuditeLog",
      component: <UserList />,
    },
    {
      name: "Audite Log's",
      icon: <ListAltIcon />,
      href: "AuditeLog",
      component: <AuditeLog />,
    },
  ];

  return (

    <div className="App">
      <header className="App-header">
      </header>
      <Box>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout pages={pages as PageItem[]} />}>
              {pages.map((page, index) => {
                const { href, component } = page;
                return (
                  <Route path={href} key={index} index element={component} />
                );
              })}
            </Route>
          </Routes>
        </BrowserRouter>
      </Box>
    </div>
  );
}

export default App;
