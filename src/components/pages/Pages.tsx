import React from "react";
import UserList from "./UserList";
import SendMessage from "./SendMessage";
import SendItem from "./SendItem";
import ManageReviews from "./ManageReviews";
import HomeRepairServiceIcon from "@mui/icons-material/HomeRepairService";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import ListAltIcon from "@mui/icons-material/ListAlt";
import { Person } from "@mui/icons-material";
import MailIcon from "@mui/icons-material/Mail";
import AuditeLog from "./AuditeLog";
import LogoutIcon from "@mui/icons-material/Logout";
import Login from "./login";
import { PageItem } from "../../lib/types/Page";

export default class Pages {
  public Pages: PageItem[] = [
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
}
