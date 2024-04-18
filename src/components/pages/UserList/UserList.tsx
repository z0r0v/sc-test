import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import React from "react";
import Api from "../../../lib/api/Api";
import { Box, CircularProgress, Container } from "@mui/material";

type rowsItem = {
  id: string;
  email: string;
  name: string;
  role: string;
};

type InitialState = {
  loading: boolean;
  rows: rowsItem[];
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
    rows: [{ id: "", email: "", name: "", role: "" }],
  };

  render() {
    return (
      <Container>
        <Box>
          <h1 style={{ padding: 50 }}>Users List:</h1>
        </Box>
        <Box>
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
            </Table>
          </TableContainer>
        </Box>
      </Container>
    );
  }
}
