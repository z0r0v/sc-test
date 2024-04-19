import React from "react";
import { CircularProgress, Container } from "@mui/material";
import "./Preloader.css";
interface IProps {
  loading: boolean;
}

export default class Preloader extends React.Component<IProps> {
  render(): JSX.Element | null {
    if (this.props.loading) {
      return (
        <Container className="box">
          <CircularProgress color="primary" />
        </Container>
      );
    }

    return null;
  }
}
