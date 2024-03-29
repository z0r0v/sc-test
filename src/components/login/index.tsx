import React from "react";
import { Box, FormControl, Grid, TextField } from "@mui/material";
import FormLabel from '@mui/material/FormLabel';

export default class Login extends React.Component {
render() {
  return (
    <Box sx={{ '& > :not(style)': { m: 1 } }} component="form">
      <FormControl variant="standard">
        <Grid
          container spacing={3}
          direction="column"
          justifyContent="flex-end"
          alignItems="center"
        >
          <Grid item xs={6}>
            <FormLabel>Please log in</FormLabel>
          </Grid>

          <Grid item xs={6}>
            <TextField
              type={'email'}
              required
              id="outlined-required"
              label="Email"
              placeholder={'email@mail.com'}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              type={'password'}
              required
              id="outlined-required"
              label="Password"
              placeholder={'enter password'}
            />
          </Grid>
        </Grid>
      </FormControl>
    </Box>
  );
}
}