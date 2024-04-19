import React from "react";
import "./styles/App.css";
import "./styles/Variables.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import SendMessage from "./components/pages/SendMessage/SendMessage";
import SendItem from "./components/pages/SendItem/SendItem";
import ManageReviews from "./components/pages/ManageReviews/ManageReviews";
import UserList from "./components/pages/UserList/UserList";
import AuditeLog from "./components/pages/AuditeLog/AuditeLog";
import { Person } from "@mui/icons-material";
import MailIcon from "@mui/icons-material/Mail";
import LogoutIcon from "@mui/icons-material/Logout";
import HomeRepairServiceIcon from "@mui/icons-material/HomeRepairService";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import ListAltIcon from "@mui/icons-material/ListAlt";
import Login from "./components/pages/login";
import Auth from "./lib/auth";
import appContext from "./lib/AppContext";
import { Container } from "@mui/material";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

export type PageItem = {
  name: string;
  icon: JSX.Element;
  href: string;
  component: JSX.Element;
  availability: boolean;
};

export default class App extends React.Component {
  constructor(props: any) {
    super(props);
    appContext.auth = new Auth();
    appContext.auth.signIn();
  }

  // TODO: change lokation to new ts file
  pages: PageItem[] = [
    {
      name: "User's list",
      icon: <Person />,
      href: "UserList",
      component: <UserList />,
      availability: false,
    },
    {
      name: "Message's",
      icon: <MailIcon />,
      href: "SendMessage",
      component: <SendMessage />,
      availability: true,
    },
    {
      name: "Item 's",
      icon: <HomeRepairServiceIcon />,
      href: "SendItem",
      component: <SendItem />,
      availability: true,
    },
    {
      name: "Review's",
      icon: <RemoveRedEyeIcon />,
      href: "ManageReviews",
      component: <ManageReviews />,
      availability: false,
    },
    {
      name: "Audite Log's",
      icon: <ListAltIcon />,
      href: "AuditeLog",
      component: <AuditeLog />,
      availability: true,
    },
    {
      name: "Log Out",
      icon: <LogoutIcon />,
      href: "/",
      component: <Login />,
      availability: true,
    },
  ];

  render() {
    return (
      <Container disableGutters maxWidth={"xl"} className="App" sx={{ px: 0 }}>
        {/* <header className="App-header"></header> */}
        <BrowserRouter>
          <Routes>
            <Route
              path={"/"}
              element={<Layout pages={this.pages as PageItem[]} />}
            >
              {this.pages.map((page, index) => {
                const { href, component } = page;
                return (
                  <Route path={href} key={index} index element={component} />
                );
              })}
            </Route>
          </Routes>
        </BrowserRouter>
      </Container>
    );
  }
}
