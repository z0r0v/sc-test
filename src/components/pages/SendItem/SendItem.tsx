import React from "react";
import {
  Autocomplete,
  Box,
  Button,
  Container,
  Grid,
  TextField,
} from "@mui/material";
import { Formik } from "formik";

import * as yup from "yup";
export default class SendItem extends React.Component {
  state = {
    gamer: { label: "", id: 0 },
    item: null,
  };

  validationSchema = yup.object().shape({
    gamers: yup.string().required().trim().min(5).max(220),
    item: yup.string().required().trim().min(1).max(220),
  });

  onSubmit = () => {};

  render() {
    return (
      <Container>
        <Box>
          <h1 style={{ padding: 50 }}>Items:</h1>
        </Box>
        <Formik
          validationSchema={this.validationSchema}
          initialValues={{
            gamer: this.state.gamer,
            item: this.state.item,
          }}
          onSubmit={() => this.onSubmit()}
        >
          {({ handleSubmit, values, setFieldValue }) => (
            <Grid
              container
              xs={10}
              justifyContent={"center"}
              alignItems={"center"}
              style={{
                border: "1px solid rgba(25, 118, 210, 0.5)",
                borderRadius: 2,
                padding: 30,
              }}
            >
              <Grid mb={2} item xs={7}>
                <Autocomplete
                  disablePortal
                  id="gamer"
                  value={this.state.gamer ?? ""}
                  options={[
                    { label: "The Godfather", id: 1 },
                    { label: "Pulp Fiction", id: 2 },
                  ]}
                  sx={{ width: 300 }}
                  renderInput={(params) => (
                    <TextField {...params} label="Select Gamer" />
                  )}
                />
              </Grid>
              <Grid mb={2} item xs={7}>
                <Autocomplete
                  disablePortal
                  id="item"
                  value={this.state.gamer ?? ""}
                  options={[
                    { label: "The Godfather", id: 1 },
                    { label: "Pulp Fiction", id: 2 },
                  ]}
                  sx={{ width: 300 }}
                  renderInput={(params) => (
                    <TextField {...params} label="Select Gamer" />
                  )}
                />
              </Grid>
              <Grid mb={2} item xs={7}>
                <Button
                  type="submit"
                  size="large"
                  variant="outlined"
                  onClick={() => {
                    console.log(values);
                    console.log(setFieldValue);
                    console.log(handleSubmit);
                  }}
                >
                  Send Item
                </Button>
              </Grid>
            </Grid>
          )}
        </Formik>
      </Container>
    );
  }
}
