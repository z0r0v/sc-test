import { Outlet } from "react-router-dom";
import React from "react";
import {
  Box,
  Button,
  Container,
  Divider,
  Drawer,
  Grid,
  Link,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
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
      <Box
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
                onClick={(e) => {
                  console.log(e);
                  // e.preventDefault();
                }}
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
      </Box>
    );
  };

  render(): JSX.Element {
    return (
      <Box>
        <Container>
          {this.state.isLogin ? (
            <Grid display={"flex"} justifyContent="flex-end">
              <Button
                size="large"
                // TODO: move style to style componetn file
                style={{
                  position: "absolute",
                  right: 20,
                  top: 20,
                  border: "1px solid rgba(25, 118, 210, 0.5)",
                }}
                onClick={() => {
                  this.toggleDrawer();
                }}
              >
                <MenuIcon />
              </Button>
            </Grid>
          ) : null}
        </Container>
        <Container>
          <Drawer
            anchor={"right"}
            open={this.state.isOpen}
            onClose={() => {
              this.toggleDrawer();
            }}
          >
            {this.DrawerList()}
          </Drawer>
          <Outlet />
        </Container>
      </Box>
    );
  }
}
