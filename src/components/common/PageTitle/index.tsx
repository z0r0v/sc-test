import React from "react";
import { Typography } from "@mui/material";

interface IProps {
  text: string;
}

export default class PageTitle extends React.Component<IProps> {
  render(): JSX.Element | null {
    return (
      <Typography mt={5} mb={5} variant="h4" component="h1">
        {this.props.text}
      </Typography>
    );
  }
}
