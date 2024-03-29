import { Outlet } from "react-router-dom";
import React from "react";
import {
  Box,
  Button, Container,
  Divider,
  Drawer, Grid,
  Link,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { PageItem } from "../App";
import MenuIcon from '@mui/icons-material/Menu';

type State = {
  isOpen: boolean;
};

interface IProps {
  pages: PageItem[];
}

export default class Layout extends React.Component<IProps> {
  state: State = {
    isOpen: false,
  };

  private locationsName = window.location.pathname;

  private toggleDrawer = (): void => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  private DrawerList = (): JSX.Element => {
    return (
      <Box
        sx={{ width: 250 }}
        role="presentation"
        onClick={() => {
          this.toggleDrawer();
        }}
      >
        <List>
          {this.props.pages.map((item, index) => {
            const { name, icon, href } = item;
            return (
              <ListItem key={index} disablePadding>
                <Link
                  href={href}
                  // TODO: style to file style
                  style={{ textDecoration: "none", color: "unset" }}
                  width={"100%"}
                >
                  <ListItemButton>
                    <ListItemIcon>{icon}</ListItemIcon>
                    <ListItemText primary={name} />
                  </ListItemButton>
                </Link>
              </ListItem>
            );
          })}
        </List>
        <Divider />
      </Box>
    );
  };

  render() {
    return (
        <Box>
          <Grid
            container
            direction="row"
            justifyContent="flex-end"
            alignItems="center"
          >
            <Button
              onClick={() => {
                this.toggleDrawer();
              }}
            >
              <MenuIcon/>
            </Button>
          </Grid>
          <Drawer  anchor={'right'}
                   open={this.state.isOpen}
                   onClose={() => {
                     this.toggleDrawer();
                   }}
          >
            {this.DrawerList()}
          </Drawer>
          <Outlet />
        </Box>
    );
  }
}
