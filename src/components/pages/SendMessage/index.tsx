import React from "react";
import {
  Autocomplete,
  Button,
  Container,
  Stack,
  TextField,
} from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import Api from "../../../lib/api/Api";
import Preloader from "../../common/Preloader";
import PageTitle from "../../common/PageTitle";
import { Gamer } from "../../../lib/types/Gamer";

type InitialState = {
  gamer: Gamer;
  gamers: Gamer[];
  textMessage: string;
  loading: boolean;
};
export default class SendMessage extends React.Component {
  state: InitialState = {
    gamer: { id: 0, label: "" },
    gamers: [{ id: 0, label: "" }],
    textMessage: "",
    loading: false,
  };

  componentDidMount(): void {
    this.setState({ loading: true });
    new Api().getPlayers().then((responce) => {
      const options = this.changePropertyNameToLabel(
        responce.data,
        "name",
        "label",
      );
      this.setState({ gamers: options });
      this.setState({ loading: false });
    });
  }

  private changePropertyNameToLabel = (
    array: Array<any>,
    oldPropName: string,
    newPropName: string,
  ): Gamer[] => {
    return array.map((item) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { [oldPropName]: old, ...others } = item;
      return { ...others, [newPropName]: item[oldPropName] };
    });
  };

  private submitForm(): void {
    new Api()
      .sendMessages({
        type: "text",
        player_id: this.state.gamer.id,
        message: this.state.textMessage,
      })
      .then(() => {
        alert("Message is sended");
        window.location.reload();
      })
      .catch((error) => {
        alert(error);
      });
  }

  private validationSchema = yup.object().shape({
    gamer: yup.object(),
    textMessage: yup.string().required().trim().min(1).max(220),
  });

  render(): JSX.Element {
    return (
      <Container>
        <PageTitle text={"Messages:"} />
        <Formik
          validationSchema={this.validationSchema}
          initialValues={{
            gamer: this.state.gamer,
            textMessage: this.state.textMessage,
          }}
          onSubmit={() => this.submitForm()}
        >
          {({ handleSubmit, values, setFieldValue, errors }) => (
            <Stack spacing={2}>
              <Autocomplete
                disablePortal
                id="gamer"
                value={values.gamer}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                options={this.state.gamers}
                getOptionLabel={(option) => option.label}
                onChange={(e, newValue) => {
                  setFieldValue("gamer", newValue);
                  this.setState({ gamer: newValue });
                }}
                renderInput={(params) => (
                  <TextField {...params} label="Select Gamer" />
                )}
              />
              <TextField
                rows={10}
                id="textMessage"
                label="Text message"
                placeholder="Message for Gamer"
                value={values.textMessage ?? ""}
                multiline
                onChange={(e) => {
                  setFieldValue("textMessage", e.target.value);
                  this.setState({ textMessage: e.target.value });
                }}
              />
              <Button
                type="submit"
                size="large"
                variant="outlined"
                onClick={() => {
                  if (errors.gamer) {
                    alert(errors.gamer);
                  }

                  if (errors.textMessage) {
                    alert(errors.textMessage);
                  }

                  handleSubmit();
                }}
              >
                Send message
              </Button>
            </Stack>
          )}
        </Formik>
        <Preloader loading={this.state.loading} />
      </Container>
    );
  }
}
