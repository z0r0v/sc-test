import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import React from "react";
import Api from "../../../lib/api/Api";
import {
  Box,
  Button,
  Container,
  FormControlLabel,
  Radio,
  RadioGroup,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import Preloader from "../../common/Preloader";
import PageTitle from "../../common/PageTitle";
import { Formik } from "formik";
import * as yup from "yup";

type rowsItem = {
  created_by: number;
  id: number;
  item_id: number | null;
  message: string | null;
  player_id: number;
  status: string;
  type: string;
  created_at: string;
  changed: boolean | null;
};

enum Status {
  Approved = "approved",
  Rejected = "rejected",
}

enum Type {
  Item = "item",
  Text = "text",
}

type InitialState = {
  loading: boolean;
  rows: rowsItem[];
  filterType: Type.Item | Type.Text;
  initRow: rowsItem[];
};

export default class ManageReviews extends React.Component {
  validationSchema = yup.object().shape({
    rows: yup.array(),
  });

  componentDidMount(): void {
    this.setState({ loading: true });
    new Api()
      .getMessages({})
      .then((response) => {
        this.setState({ initRow: response.data });
        this.setState({ rows: response.data });
        this.setState({ loading: false });
      })
      .catch((error) => console.debug(error));
  }

  state: InitialState = {
    loading: false,
    filterType: Type.Item,
    initRow: [
      {
        created_by: 1,
        id: 4,
        item_id: null,
        message: "",
        player_id: 1,
        status: "",
        type: "",
        created_at: "",
        changed: false,
      },
    ],
    rows: [
      {
        created_by: 1,
        id: 4,
        item_id: null,
        message: "",
        player_id: 1,
        status: "",
        type: "",
        created_at: "",
        changed: false,
      },
    ],
  };

  private onSubmit = (): void => {
    const changetItemsArray = this.state.rows.filter(
      (item) => item.changed === true,
    );
    changetItemsArray.forEach((item, index) => {
      new Api().aproveMessages({ status: item.status }, item.id).then(() => {
        if (changetItemsArray.length - 1 === index) {
          window.location.reload();
        }
      });
    });
  };

  private changeStatusForMessage = (value: string, row: rowsItem): void => {
    const changedRow: rowsItem[] = this.state.rows.map((item) => {
      if (item.id === row.id) {
        item.changed = true;
        item.status = value;

        return item;
      }

      return item;
    });

    this.setState({ rows: changedRow });
  };

  private filterdRowsFromType = (type: Type.Item | Type.Text): void => {
    console.log(type);
    this.setState({ rows: this.state.initRow });

    const filterdArray: rowsItem[] = this.state.initRow.filter(
      (item: rowsItem) => item.type === type,
    );

    this.setState({ rows: filterdArray });
  };

  render(): JSX.Element {
    return (
      <Container>
        <PageTitle text="Manage Reviews:" />
        <Formik
          validationSchema={this.validationSchema}
          initialValues={{
            rows: this.state.rows,
          }}
          onSubmit={() => {
            this.onSubmit();
          }}
        >
          {({ handleSubmit, setFieldValue, errors }) => (
            <Container>
              <Box mt={5} mb={5}>
                <Button
                  size="large"
                  variant="contained"
                  onClick={() => {
                    handleSubmit();
                  }}
                >
                  Send Changes
                </Button>
              </Box>
              <ToggleButtonGroup
                color="primary"
                value={this.state.filterType}
                exclusive
                aria-label="Platform"
              >
                <ToggleButton
                  onChange={(e, newValue) => {
                    localStorage.setItem("FilterType", Type.Item);
                    this.filterdRowsFromType(Type.Item);
                    this.setState({ filterType: newValue });
                  }}
                  value={Type.Item}
                >
                  Item
                </ToggleButton>
                <ToggleButton
                  onChange={(e, newValue) => {
                    localStorage.setItem("FilterType", Type.Text);
                    this.filterdRowsFromType(Type.Text);
                    this.setState({ filterType: newValue });
                  }}
                  value={Type.Text}
                >
                  Text
                </ToggleButton>
              </ToggleButtonGroup>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell align="center">status</TableCell>
                      <TableCell align="center">Id</TableCell>
                      <TableCell align="center">User created ID</TableCell>
                      <TableCell align="center">Operation Type</TableCell>
                      <TableCell align="center">Message / Item Id</TableCell>
                      <TableCell align="center">Payer Id</TableCell>
                      <TableCell align="center">Date</TableCell>
                      <TableCell align="center">Aprove / Reject</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {this.state.rows.map((row) => (
                      <TableRow
                        key={row.id}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell align="center">
                          <Typography
                            variant="body2"
                            component="span"
                            color="Orange"
                          >
                            {row.status}
                          </Typography>
                        </TableCell>
                        <TableCell align="center">{row.id}</TableCell>
                        <TableCell align="center">{row.created_by}</TableCell>
                        <TableCell align="center">{row.type}</TableCell>
                        <TableCell align="center">
                          {row.item_id ? row.item_id : row.message}
                        </TableCell>
                        <TableCell align="center">{row.player_id}</TableCell>
                        <TableCell align="center">{row.created_at}</TableCell>
                        <TableCell align="center">
                          <RadioGroup
                            aria-labelledby="demo-radio-buttons-group-label"
                            name="radio-buttons-group"
                          >
                            <FormControlLabel
                              value={Status.Approved}
                              control={
                                <Radio
                                  value={Status.Approved}
                                  onChange={(e) => {
                                    setFieldValue("status", e.target.value);
                                    this.changeStatusForMessage(
                                      e.target.value,
                                      row,
                                    );
                                  }}
                                />
                              }
                              label="Aprove"
                            />
                            <FormControlLabel
                              value={Status.Rejected}
                              control={
                                <Radio
                                  value={Status.Rejected}
                                  onChange={(e) => {
                                    setFieldValue("status", e.target.value);
                                    this.changeStatusForMessage(
                                      e.target.value,
                                      row,
                                    );
                                  }}
                                />
                              }
                              label="Reject"
                            />
                          </RadioGroup>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <Box mt={5} mb={5}>
                <Button
                  size="large"
                  variant="contained"
                  onClick={() => {
                    handleSubmit();
                    console.log(errors);
                  }}
                >
                  Send Changes
                </Button>
              </Box>
            </Container>
          )}
        </Formik>
        <Preloader loading={this.state.loading} />
      </Container>
    );
  }
}
