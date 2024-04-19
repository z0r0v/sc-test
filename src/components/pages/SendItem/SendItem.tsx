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

type Gamer = {
  label: string;
  id: number;
};

type Item = {
  label: string;
  id: number;
};

type InitialState = {
  gamer: Gamer;
  gamers: Gamer[];
  item: Item;
  items: Item[];
  loading: boolean;
};
export default class SendItem extends React.Component {
  state: InitialState = {
    gamer: { id: 0, label: "" },
    gamers: [{ id: 0, label: "" }],
    item: { id: 0, label: "" },
    items: [{ id: 0, label: "" }],
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

    new Api().getItems().then((responce) => {
      const options = this.changePropertyNameToLabel(
        responce.data,
        "name",
        "label",
      );
      this.setState({ items: options });
      this.setState({ loading: false });
    });
  }

  private changePropertyNameToLabel = (
    array: Array<any>,
    oldPropName: string,
    newPropName: string,
  ) => {
    return array.map((item) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { [oldPropName]: old, ...others } = item;
      return { ...others, [newPropName]: item[oldPropName] };
    });
  };

  private submitForm(): void {
    new Api()
      .sendMessages({
        type: "item",
        item_id: this.state.item.id,
        player_id: this.state.gamer.id,
      })
      .then(() => {
        alert("Item is sended");
        window.location.reload();
      })
      .catch((error) => {
        alert(error);
      });
  }

  validationSchema = yup.object().shape({
    // TODO: Add bether validation for gamers
    gamer: yup.object(),
    item: yup.object(),
  });

  render(): JSX.Element {
    return (
      <Container>
        <PageTitle text={"Items:"} />
        <Formik
          validationSchema={this.validationSchema}
          initialValues={{
            gamer: this.state.gamer,
            item: this.state.item,
          }}
          onSubmit={() => this.submitForm()}
        >
          {({ handleSubmit, values, setFieldValue, errors }) => (
            <Stack spacing={2}>
              {/* // TODO: Change color if unvalid */}
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
              {/* // TODO: Change color if unvalid */}
              <Autocomplete
                disablePortal
                id="item"
                value={values.item}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                options={this.state.items}
                getOptionLabel={(option) => option.label}
                onChange={(e, newValue) => {
                  setFieldValue("item", newValue);
                  this.setState({ item: newValue });
                }}
                renderInput={(params) => (
                  <TextField {...params} label="Select Item" />
                )}
              />
              <Button
                type="submit"
                size="large"
                variant="outlined"
                onClick={() => {
                  if (errors.gamer) {
                    alert(errors.gamer);
                  }

                  if (errors.item) {
                    alert(errors.item);
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
