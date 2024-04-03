import React from "react";
import { Box, FormControl, Grid, TextField } from "@mui/material";
import FormLabel from "@mui/material/FormLabel";
import appContext from "../../lib/AppContext";

type InitialState = {
  email: string;
  password: string;
};

export default class Login extends React.Component {
  state: InitialState = {
    email: "",
    password: "",
  };

  private onSubmit = (): void => {
    appContext.auth?.signIn(this.state.email, this.state.password);
    if (appContext.auth?.getUser().id === null) alert("User not found");
    this.setState(this.state);
  };

  render() {
    return (
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        height={"60vh"}
      >
        <Box
          sx={{
            "& > :not(style)": { m: 1 },
            border: "1px solid grey",
            borderRadius: 2,
          }}
          component="form"
          onSubmit={() => {
            this.onSubmit();
          }}
          autoComplete={"false"}
        >
          <FormControl variant="standard" color="primary" autoCorrect={"false"}>
            {appContext.auth?.getUser().id === null ? (
              <Grid
                container
                spacing={3}
                direction="column"
                justifyContent="flex-end"
                alignItems="center"
              >
                <Grid item xs={6}>
                  <FormLabel>Please log in</FormLabel>
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    onChange={(e) => {
                      this.setState({ [e.target.name]: e.target.value });
                    }}
                    type={"email"}
                    required
                    id="email"
                    name={"email"}
                    label="Email"
                    placeholder={"email@mail.com"}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    onChange={(e) => {
                      this.setState({ [e.target.name]: e.target.value });
                    }}
                    name={"password"}
                    type={"password"}
                    required
                    id="password"
                    label="Password"
                    placeholder={"enter password"}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    style={{ width: 120 }}
                    color={"success"}
                    type={"submit"}
                    required
                    id="outlined-required"
                    value="Log in"
                  />
                </Grid>
              </Grid>
            ) : (
              <Grid
                container
                spacing={3}
                direction="column"
                justifyContent="flex-end"
                alignItems="center"
              >
                <Grid item xs={12}>
                  <TextField
                    onClick={() => {
                      appContext.auth?.signOut();
                    }}
                    value="Log Out"
                    color={"success"}
                    type={"submit"}
                    required
                    id="outlined-required"
                  />
                </Grid>
              </Grid>
            )}
          </FormControl>
        </Box>
      </Grid>
    );
  }
}
