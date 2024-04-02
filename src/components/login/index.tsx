import React from "react";
import { Box, FormControl, Grid, TextField } from "@mui/material";
import FormLabel from "@mui/material/FormLabel";
import appContext from "../../lib/AppContext";
import { Formik } from 'formik';

export default class Login extends React.Component {
  private onSubmit = (): void => {
    console.log('debug:', this);
    appContext.auth?.signIn();
  };

  render() {
    return (
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <Box
          sx={{ "& > :not(style)": { m: 1 }, border: "2px solid grey" }}
          component="form"
        >

          <FormControl
            variant="standard"
            color="primary"
            onSubmit={() => {
              this.onSubmit();
            }}
          >
            {!appContext.auth?.getUser().id !== null ? (
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
                    type={"email"}
                    required
                    id="outlined-required"
                    label="Email"
                    placeholder={"email@mail.com"}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    type={"password"}
                    required
                    id="outlined-required"
                    label="Password"
                    placeholder={"enter password"}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField color={'success'} type={"submit"} required id="outlined-required" />
                </Grid>
              </Grid>
            ): <Grid
              container
              spacing={3}
              direction="column"
              justifyContent="flex-end"
              alignItems="center"
            >
              <Grid item xs={12}>
                <TextField value='Log Out' color={'success'} type={"submit"} required id="outlined-required" />
              </Grid>
            </Grid>}
          </FormControl>
        </Box>
      </Grid>
    );
  }
}
