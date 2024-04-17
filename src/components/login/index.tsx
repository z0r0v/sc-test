import React from "react";
import { Box, Button, Grid, TextField } from "@mui/material";
import FormLabel from "@mui/material/FormLabel";
import appContext from "../../lib/AppContext";
import * as yup from "yup";
import { Formik } from "formik";

type InitialState = {
  email: string;
  password: string;
  isLogin: boolean;
};

export default class Login extends React.Component {
  state: InitialState = {
    email: "",
    password: "",
    isLogin: false,
  };

  componentDidMount(): void {
    this.setState({ isLogin: appContext.auth?.isLogin() });
  }

  private onSubmit = (): void => {
    appContext.auth?.logIn(this.state.email, this.state.password).then(() => {
      this.setState({ isLogin: appContext.auth?.isLogin() });
      window.location.reload();
    });
    // if (appContext.auth?.getUser().id === null) alert("User not found");
    // this.setState(this.state);
  };

  validationSchema = yup.object().shape({
    email: yup.string().required().trim().min(5).max(20).email(),
    password: yup.string().required().trim().min(1).max(20),
  });

  render(): JSX.Element {
    // TODO: move style to style componetn file
    return (
      <Grid width={"100%"} justifyContent="center" alignItems="center">
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          height={"60vh"}
        >
          <Box
            alignContent={"center"}
            sx={{
              border: "1px solid rgba(25, 118, 210, 0.5)",
              borderRadius: 2,
              minWidth: 330,
              minHeight: 330,
            }}
            component="form"
            onSubmit={() => {}}
            autoComplete={"false"}
          >
            {!this.state.isLogin ? (
              <Formik
                validationSchema={this.validationSchema}
                initialValues={{
                  email: this.state.email,
                  password: this.state.password,
                }}
                onSubmit={() => this.onSubmit()}
              >
                {({ handleSubmit, values, setFieldValue }) => (
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
                        name={"email"}
                        required
                        id="email"
                        label="Email"
                        placeholder={"email@mail.com"}
                        value={values.email ?? ""}
                        onChange={(e) => {
                          const email = e.target.value;
                          setFieldValue("email", email);
                          this.setState({ email: email });
                        }}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        name={"password"}
                        type={"password"}
                        required
                        id="password"
                        label="Password"
                        placeholder={"enter password"}
                        value={values.password ?? ""}
                        onChange={(e) => {
                          const password = e.target.value;
                          setFieldValue("password", password);
                          this.setState({ password: password });
                        }}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <Button
                        size="large"
                        variant="outlined"
                        onClick={() => {
                          handleSubmit();
                        }}
                      >
                        Log in
                      </Button>
                    </Grid>
                  </Grid>
                )}
              </Formik>
            ) : (
              <Grid
                item
                xs={12}
                justifyContent={"center"}
                display={"flex"}
                flexWrap={"wrap"}
              >
                <h2
                  style={{
                    width: "100%",
                    textAlign: "center",
                    paddingBottom: 15,
                  }}
                >
                  Hello User name
                </h2>
                <Button
                  type="submit"
                  size="large"
                  variant="outlined"
                  onClick={() => {
                    this.setState({ isLogin: appContext.auth?.isLogin() });
                    appContext.auth?.signOut();
                  }}
                >
                  Log Out
                </Button>
              </Grid>
            )}
          </Box>
        </Grid>
      </Grid>
    );
  }
}
