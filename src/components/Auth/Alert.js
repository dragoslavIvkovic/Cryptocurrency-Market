import { Snackbar } from "@material-ui/core";

import MuiAlert from '@mui/material/Alert';
import { useContext } from "react";
import { StateContext } from '../../context/GlobalState'

const Alert = () => {
  const { alert, setAlert } = useContext(StateContext);

  const handleCloseAlert = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setAlert({ open: false });
  };

  return (
    <Snackbar
      open={alert.open}
      autoHideDuration={3000}
      onClose={handleCloseAlert}
    >
      <MuiAlert
        onClose={handleCloseAlert}
        elevation={10}
        variant="filled"
        severity={alert.type}
      >
        {alert.message}
      </MuiAlert>
    </Snackbar>
  );
};

export default Alert;