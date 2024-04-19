import React from "react";
import { Button, Container, Stack, TextField, Typography } from "@mui/material";
import appContext from "../../../lib/AppContext";
import * as yup from "yup";
import { Formik } from "formik";
import { FormLabel } from "@mui/material";
import Preloader from "../../common/Preloader";

type InitialState = {
  email: string;
  password: string;
  isLogin: boolean;
  loading: boolean;
};

export default class Login extends React.Component {
  state: InitialState = {
    email: "",
    password: "",
    isLogin: false,
    loading: false,
  };

  validationSchema = yup.object().shape({
    email: yup.string().required().trim().min(5).max(20).email(),
    password: yup.string().required().trim().min(1).max(20),
  });

  componentDidMount(): void {
    this.setState({ isLogin: appContext.auth?.isLogin() });
  }

  private onSubmit = (): void => {
    this.setState({ loading: true });
    appContext.auth
      ?.logIn(this.state.email, this.state.password)
      .then(() => {
        this.setState({ isLogin: appContext.auth?.isLogin() });
        this.setState({ loading: false });
        window.location.reload();
      })
      .catch((error) => {
        console.debug(error);
        alert("Check your login and password");
        this.setState({ loading: false });
      });
  };

  render(): JSX.Element {
    return (
      <Container>
        {!this.state.isLogin ? (
          <Formik
            validationSchema={this.validationSchema}
            initialValues={{
              email: this.state.email,
              password: this.state.password,
            }}
            onSubmit={() => {
              this.onSubmit();
            }}
          >
            {({ handleSubmit, values, setFieldValue, errors }) => (
              <Stack
                spacing={2}
                alignItems={"center"}
                justifyContent={"center"}
                mt={5}
              >
                <Stack
                  spacing={2}
                  maxWidth={350}
                  padding={10}
                  border={"1px solid #1976d2"}
                  borderRadius={2}
                >
                  <FormLabel>
                    <Typography variant="h6" component="h6">
                      Please logIn
                    </Typography>
                  </FormLabel>
                  {/* // TODO: Change color if unvalid */}
                  <TextField
                    type="email"
                    name="email"
                    required
                    id="email"
                    label="Email"
                    placeholder={"email@mail.com"}
                    value={values.email ?? ""}
                    onChange={(e) => {
                      setFieldValue("email", e.target.value);
                      this.setState({ email: e.target.value });
                    }}
                  />
                  {/* // TODO: Change color if unvalid */}
                  <TextField
                    name={"password"}
                    type={"password"}
                    required
                    id="password"
                    label="Password"
                    placeholder={"enter password"}
                    value={values.password ?? ""}
                    onChange={(e) => {
                      setFieldValue("password", e.target.value);
                      this.setState({ password: e.target.value });
                    }}
                  />
                  <Button
                    size="large"
                    variant="outlined"
                    onClick={() => {
                      if (errors.password) {
                        alert(errors.password);
                      }

                      if (errors.email) {
                        alert(errors.email);
                      }
                      handleSubmit();
                    }}
                  >
                    Log in
                  </Button>
                </Stack>
              </Stack>
            )}
          </Formik>
        ) : (
          <Stack spacing={2} alignItems={"center"} justifyContent={"center"}>
            <Stack
              spacing={2}
              maxWidth={350}
              padding={10}
              border={"1px solid #1976d2"}
              borderRadius={2}
            >
              <Typography mt={5} variant="h5" component="h6">
                Hello {appContext.auth?.getUser().name}
              </Typography>
              <Button
                type="submit"
                size="large"
                variant="outlined"
                onClick={() => {
                  this.setState({ loading: true });
                  this.setState({ isLogin: appContext.auth?.isLogin() });
                  appContext.auth?.signOut();
                  window.location.reload();
                }}
              >
                Log Out
              </Button>
            </Stack>
          </Stack>
        )}
        <Preloader loading={this.state.loading} />
      </Container>
    );
  }
}
