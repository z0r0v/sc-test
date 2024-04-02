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
import LoginIcon from "@mui/icons-material/Login";
import HomeRepairServiceIcon from "@mui/icons-material/HomeRepairService";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import ListAltIcon from "@mui/icons-material/ListAlt";
import Box from "@mui/material/Box";
import Login from "./components/login";
import Auth from "./lib/auth";
import appContext from './lib/AppContext';

export type PageItem = {
  name: string;
  icon: JSX.Element;
  href: string;
  component: JSX.Element;
};


export default class App extends React.Component <any, any>{
   pages: PageItem[] = [
    {
      name: "User's list",
      icon: <Person />,
      href: "UserList",
      component: <UserList />,
    },
    {
      name: "Message's",
      icon: <MailIcon />,
      href: "SendMessage",
      component: <SendMessage />,
    },
    {
      name: "Item 's",
      icon: <HomeRepairServiceIcon />,
      href: "SendItem",
      component: <SendItem />,
    },
    {
      name: "Review's",
      icon: <RemoveRedEyeIcon />,
      href: "ManageReviews",
      component: <ManageReviews />,
    },
    {
      name: "Audite Log's",
      icon: <ListAltIcon />,
      href: "AuditeLog",
      component: <AuditeLog />,
    },
    {
      name: "Login",
      icon: <LoginIcon />,
      href: "/",
      component: <Login />,
    },
  ];

   private constructor(props: any) {
     super(props);
     appContext.auth = new Auth();
   }

   getPath = () => {
    if(appContext === null ||
      appContext.auth == null ||
      appContext.auth.getUser().type === null) {
        return '/'
    }

    if(appContext.auth.getUser().type === 'us') {
      return 'SendMessage'
    }

    if(appContext.auth.getUser().type === 'ed') {
      return 'ManageReviews'
    }

    return '/'
  }

  render() {
    return (
      <div className="App">
        <header className="App-header"></header>
        <Box>
          <BrowserRouter>
            <Routes>
              <Route path={this.getPath()} element={<Layout pages={this.pages as PageItem[]} />}>
                {this.pages.map((page, index) => {
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
}

