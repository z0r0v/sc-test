import React from "react";
import "./styles/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Auth from "./lib/auth";
import appContext from "./lib/AppContext";
import { Container } from "@mui/material";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { PageItem } from "./lib/types/Page";
import Pages from "./components/pages/Pages";

export default class App extends React.Component {
  constructor(props: any) {
    super(props);
    this.pages = new Pages().Pages;
    appContext.auth = new Auth();
    appContext.auth.signIn();
  }

  private pages: PageItem[];

  render(): JSX.Element {
    return (
      <Container disableGutters maxWidth={"xl"} className="App" sx={{ px: 0 }}>
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
