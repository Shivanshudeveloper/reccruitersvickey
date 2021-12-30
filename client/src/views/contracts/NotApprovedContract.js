// project imports
import MainCard from "ui-component/cards/MainCard";
import React from "react";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";
import AttachFileIcon from "@mui/icons-material/AttachFile";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Grid from "@mui/material/Grid";
import PersonIcon from "@mui/icons-material/Person";
import Slide from "@mui/material/Slide";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import TextField from "@mui/material/TextField";
import SendIcon from "@mui/icons-material/Send";
import LocalPrintshopIcon from "@mui/icons-material/LocalPrintshop";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import EditIcon from "@mui/icons-material/Edit";
import DownloadIcon from "@mui/icons-material/Download";
import Tooltip from "@mui/material/Tooltip";
import { DialogTitle } from "@mui/material";
import EmployementContract from "../../utils/Consultant employment agreement.pdf";
import { useState, useEffect } from "react";
import { API_SERVICE } from "../../URI";
// ==============================|| SAMPLE PAGE ||============================== //
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="left" ref={ref} {...props} />;
});
const NotApprovedContract = () => {
  const [contracts, setContracts] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedContract, setSelectedContract] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedToDelete, setSelectedToDelete] = useState(null);
  useEffect(() => {
    const getAllContracts = async () => {
      try {
        const RAWres = await fetch(
          `${API_SERVICE}/api/v1/main/contract/getnotfinalizecontracts`
        );
        const res = await RAWres.json();
        setContracts(res);
        console.log(res);
      } catch (err) {
        console.log(err);
      }
    };
    getAllContracts();
  }, []);
  const handleclose = () => {
    setOpen(false);
  };
  const deleteContract = async () => {
    let cont = [...contracts];
    cont = cont.filter((ele) => ele._id !== selectedToDelete._id);
    setContracts(cont);
    try {
      const rawres = await fetch(
        `${API_SERVICE}/api/v1/main/contract/removecontract/${selectedToDelete._id}`,
        {
          method: "delete",
        }
      );
      const content = await rawres.json();
      setSelectedToDelete(null);
      setShowConfirm(false);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <Dialog
        open={showConfirm}
        onClose={() => {
          setSelectedToDelete(null);
          setShowConfirm(false);
        }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Do you want to delete?"}
        </DialogTitle>

        <DialogActions>
          <Button
            onClick={() => {
              setShowConfirm(false);
              deleteContract();
            }}
          >
            Yes
          </Button>
          <Button
            onClick={() => {
              setSelectedToDelete(null);
              setShowConfirm(false);
            }}
            autoFocus
          >
            No
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        fullScreen
        open={open}
        onClose={handleclose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleclose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>

        <DialogContent>
          <Container>
            <h3>Remarks</h3>
            <Box>{selectedContract?.remarks}</Box>
          </Container>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleclose} autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
      <MainCard title="Contracts Rejected">
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell align="center">Aggrement Type</TableCell>
                <TableCell align="center">Aggrement For</TableCell>
                <TableCell align="center">status</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {contracts.map((Contract, id) => {
                return (
                  <TableRow
                    key={id + 1}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {id + 1}
                    </TableCell>
                    <TableCell align="center">
                      {Contract.AggrementType} Aggrement
                    </TableCell>
                    <TableCell align="center">
                      {Contract.workFirstName} {Contract.workLastName}
                    </TableCell>

                    <TableCell align="center">{Contract.status}</TableCell>
                    <TableCell align="center">
                      <Tooltip title="View Profile">
                        <IconButton color="primary" component="span">
                          <PersonIcon />
                        </IconButton>
                      </Tooltip>

                      <Tooltip
                        onClick={() => {
                          setSelectedToDelete(Contract);
                          setShowConfirm(true);
                        }}
                        title="Delete Contract"
                      >
                        <IconButton color="secondary" component="span">
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="View More">
                        <IconButton
                          onClick={() => {
                            setSelectedContract(Contract);
                            console.log(Contract);
                            setOpen(true);
                          }}
                          color="primary"
                          component="span"
                        >
                          <RemoveRedEyeIcon />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </MainCard>
    </>
  );
};

export default NotApprovedContract;
