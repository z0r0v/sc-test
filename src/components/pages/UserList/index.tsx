import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import React from "react";
import Api from "../../../lib/api/Api";
import { Container } from "@mui/material";
import appContext from "../../../lib/AppContext";
import Preloader from "../../common/Preloader";
import PageTitle from "../../common/PageTitle";
import { UserData } from "../../../lib/types/UserData";

type InitialState = {
  loading: boolean;
  rows: UserData[];
};

export default class UserList extends React.Component {
  componentDidMount(): void {
    this.setState({ loading: true });
    new Api()
      .getUsers()
      .then((response) => {
        this.setState({ rows: response.data });
        this.setState({ loading: false });
      })
      .catch((error) => console.debug(error));
  }

  state: InitialState = {
    loading: false,
    rows: [{ id: null, role: null, email: null, token: null, name: null }],
  };

  render(): JSX.Element {
    return (
      <Container>
        <PageTitle text="Users List:" />
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">Id</TableCell>
                <TableCell align="center">Name</TableCell>
                <TableCell align="center">Email</TableCell>
                <TableCell align="center">Role</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.rows.map((row) => (
                <TableRow
                  style={
                    appContext.auth?.getUser().id === row.id
                      ? { background: "rgba(25, 118, 210, 0.2)" }
                      : {}
                  }
                  key={row.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="center">{row.id}</TableCell>
                  <TableCell align="center">{row.name}</TableCell>
                  <TableCell align="center">{row.email}</TableCell>
                  <TableCell align="center">{row.role}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Preloader loading={this.state.loading} />
      </Container>
    );
  }
}
