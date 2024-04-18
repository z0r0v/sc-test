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
  created_at: string;
  actioned_by: { email: string; id: number; name: string; role: string };
  id: number;
  message: {
    created_at: string;
    created_by: number;
    id: number;
    item: {
      id: number;
      name: string;
    };
    item_id: number;
    message: string | null;
    player: {
      id: number;
      name: string;
    };
    player_id: number;
    status: string;
    type: string;
  };
};

type InitialState = {
  loading: boolean;
  rows: rowsItem[];
};

export default class UserList extends React.Component {
  componentDidMount(): void {
    this.setState({ loading: true });
    new Api()
      .getAuditLog()
      .then((response) => {
        console.log(response);
        this.setState({ rows: response.data });
        this.setState({ loading: false });
      })
      .catch((error) => console.debug(error));
  }

  state: InitialState = {
    loading: false,
    rows: [
      {
        created_at: "",
        actioned_by: { email: "", id: 0, name: "", role: "" },
        id: 0,
        message: {
          created_at: "",
          created_by: 0,
          id: 0,
          item: {
            id: 0,
            name: "",
          },
          item_id: 0,
          message: null,
          player: {
            id: 0,
            name: "",
          },
          player_id: 0,
          status: "",
          type: "",
        },
      },
    ],
  };

  render() {
    return (
      <Container>
        <Box>
          <h1 style={{ padding: 50 }}>Audit Logs:</h1>
        </Box>

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">Status</TableCell>
                <TableCell align="center">Gamer Id</TableCell>
                <TableCell align="center">Gamer Name</TableCell>
                <TableCell align="center">Operation Type</TableCell>
                <TableCell align="center">Operation Value</TableCell>
                <TableCell align="center">Actioned User Name</TableCell>
                <TableCell align="center">Actioned User Role</TableCell>
                <TableCell align="center">Created At</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.rows.map((row) => (
                <TableRow
                  key={row.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell
                    style={{
                      color:
                        row.message.status === "approved" ? "green" : "gray",
                    }}
                    align="center"
                  >
                    {row.message.status}
                  </TableCell>
                  <TableCell align="center">{row.message.player.id}</TableCell>
                  <TableCell align="center">
                    {row.message.player.name}
                  </TableCell>
                  <TableCell align="center">{row.message.type}</TableCell>
                  <TableCell align="center">
                    {row.message.type == "item"
                      ? row.message.item.name
                      : row.message.message}
                  </TableCell>
                  <TableCell align="center">{row.actioned_by.name}</TableCell>
                  <TableCell align="center">{row.actioned_by.role}</TableCell>
                  <TableCell align="center">{row.created_at}</TableCell>
                </TableRow>
              ))}
            </TableBody>
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
          </Table>
        </TableContainer>
      </Container>
    );
  }
}
