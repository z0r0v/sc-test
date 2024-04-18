import React from "react";
import {
  Autocomplete,
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  TextField,
} from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import Api from "../../../lib/api/Api";

type Gamer = {
  label: string;
  id: number;
};

type InitialState = {
  gamer: Gamer;
  gamers: Gamer[];
  textMessage: null;
  loading: boolean;
};
export default class SendMessage extends React.Component {
  state: InitialState = {
    gamer: { label: "", id: 0 },
    gamers: [{ label: "", id: 0 }],
    textMessage: null,
    loading: false,
  };

  validationSchema = yup.object().shape({
    gamers: yup.string().required().trim().min(0).max(220),
    textMessage: yup.string().required().trim().min(1).max(220),
  });

  componentDidMount(): void {
    this.setState({ loading: true });
    new Api().getPlayers().then((responce) => {
      const options = this.changePropertyNameToLabel(responce.data, 'name', 'label');
      this.setState({ gamers: options});
      this.setState({ loading: false });
    });
  }

  changePropertyNameToLabel = (array: Array<any>, oldPropName: string, newPropName: string) => {
    return array.map(item => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const {[oldPropName]: old, ...others} = item;
      return { ...others, [newPropName]: item[oldPropName] };
    });
  };

  onSubmit = () => {};

  render() {
    return (
      <Container>
        <Box>
          <h1 style={{ padding: 50 }}>Messages:</h1>
        </Box>
        <Formik
          validationSchema={this.validationSchema}
          initialValues={{
            gamer: this.state.gamer,
            textMessage: this.state.textMessage,
          }}
          onSubmit={() => this.onSubmit()}
        >
          {({ handleSubmit, values, setFieldValue }) => (
            <Grid
              container
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
          //  value={values.gamer ?? ''}
           options={this.state.gamers}
           sx={{ width: 300 }}
           onChange={() => {
            setFieldValue("gamer", values.gamer);
            this.setState({ gamer: values.gamer });
          }}
           renderInput={(params) => (
             <TextField {...params} label="Select Gamer" />
           )}
         />
       </Grid>
          
     
              <Grid mb={2} item xs={7}>
                <TextField
                  rows={10}
                  sx={{ minWidth: 300 }}
                  id="text-message"
                  label="Text message"
                  placeholder="Message for Gamer"
                  value={values.textMessage ?? ''}
                  multiline
                  onChange={() => {
                    // setFieldValue('textMessage', value);
                    // this.setState({textMessage: value});
                    console.log(handleSubmit, values, setFieldValue );
                  }}
                />
              </Grid>
              <Grid mb={2} item xs={7}>
                <Button
                  type="submit"
                  size="large"
                  variant="outlined"
                  onClick={() => {}}
                >
                  Send message
                </Button>
              </Grid>
       
            </Grid>
          )}
        </Formik>
        {/* TODO: Move to componetn */}
        {this.state.loading ? (
              <Box
                sx={{
                  position: "absolute",
                  top: 0,
                  bottom: 0,
                  left: 0,
                  right: 0,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <CircularProgress color="primary" />
              </Box>
            ) : null}
      </Container>
    );
  }
}
