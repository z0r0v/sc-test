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
import Preloader from "../../common/Preloader";
import PageTitle from "../../common/PageTitle";
import { OperationData } from "../../../lib/types/OperationData";
import { Statuses } from "../../../lib/enums/Statuses";
import Moment from 'moment';

type InitialState = {
  loading: boolean;
  rows: OperationData[];
};

export default class UserList extends React.Component {
  componentDidMount(): void {
    this.setState({ loading: true });
    new Api()
      .getAuditLog()
      .then((response) => {
        [].length;
        if (Array.isArray(response.data)) {
          this.setState({ rows: response.data });
          this.setState({ loading: false });
          return;
        }
        this.setState({ loading: false });
        alert("Have not data from serve");
      })
      .catch((error) => console.debug(error));
  }

  state: InitialState = {
    loading: false,
    rows: [
      {
        created_at: "",
        actioned_by: {
          email: "",
          id: 0,
          name: "",
          role: "",
        },
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

  render(): JSX.Element {
    return (
      <Container>
        <PageTitle text="Audit Logs:" />
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
                        row.message.status === Statuses.Approved
                          ? "green"
                          : row.message.status === Statuses.Rejected
                            ? "red"
                            : row.message.status === Statuses.Waiting
                              ? "gray"
                              : "",
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
                  <TableCell align="center">{Moment(row.created_at).format("YYYY-MM-DD HH:mm")}</TableCell>
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
