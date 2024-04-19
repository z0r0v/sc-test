import { Outlet } from "react-router-dom";
import React from "react";
import {
  AppBar,
  Box,
  Container,
  Divider,
  Drawer,
  IconButton,
  Link,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from "@mui/material";
import { PageItem } from "../App";
import MenuIcon from "@mui/icons-material/Menu";
import appContext from "../lib/AppContext";

interface IProps {
  pages: PageItem[];
}

type State = {
  isOpen: boolean;
  isLogin: boolean;
};

export default class Layout extends React.Component<IProps> {
  constructor(props: IProps) {
    super(props);
    this.pages = appContext.auth?.isEditor()
      ? this.props.pages
      : this.props.pages.filter((item) => item.availability === true);
  }

  state: State = {
    isOpen: false,
    isLogin: false,
  };

  componentDidMount(): void {
    this.setState({ isLogin: appContext.auth?.isLogin() });
  }

  private pages: PageItem[];

  private toggleDrawer = (): void => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  private DrawerList = (): JSX.Element => {
    return (
      <Container
        sx={{ width: 250 }}
        role="presentation"
        onClick={() => {
          this.toggleDrawer();
        }}
      >
        <List>
          {this.pages.map((item, index) => {
            const { name, icon, href } = item;
            return (
              <ListItem
                disabled={false}
                key={index}
                disablePadding
                selected={window.location.pathname.slice(1) === href}
              >
                <Link
                  width={"100%"}
                  href={href}
                  underline="none"
                  color="inherit"
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
      </Container>
    );
  };

  render(): JSX.Element | null {
    return (
      <Container>
        {appContext.auth?.isLogin() ? (
          <Box mb={5}>
            <AppBar position="static">
              <Toolbar>
                <IconButton
                  size="large"
                  edge="start"
                  color="inherit"
                  aria-label="menu"
                  sx={{ mr: 2 }}
                  onClick={() => {
                    this.toggleDrawer();
                  }}
                >
                  <MenuIcon />
                </IconButton>
              </Toolbar>
            </AppBar>
          </Box>
        ) : null}
        <Container>
          <Drawer
            anchor={"left"}
            open={this.state.isOpen}
            onClose={() => {
              this.toggleDrawer();
            }}
          >
            {this.DrawerList()}
          </Drawer>
          <Outlet />
        </Container>
      </Container>
    );
  }
}
