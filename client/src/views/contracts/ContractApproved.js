// project imports
import React from "react";
import MainCard from "ui-component/cards/MainCard";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import {
  Link,
  selectClasses,
  List,
  ListItemButton,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import { Document, Page, pdfjs } from "react-pdf";
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
import EmployementContract from "../../utils/Consultant employment agreement.pdf";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { tableCellClasses } from "@mui/material/TableCell";
import { useState, useEffect } from "react";

import { API_SERVICE } from "../../URI";

// ==============================|| SAMPLE PAGE ||============================== //

const steps = ["Master Service Aggrement", "Appendix A", "Aggrement"];

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="left" ref={ref} {...props} />;
});

const ContractApproved = () => {
  const [open2, setOpen2] = React.useState(false);
  const [finalizeContracts, setFinalizeContracts] = useState([]);
  const [selectedContract, setSelectedContract] = useState(null);
  const handleClickOpen2 = () => {
    setOpen2(true);
  };
  const handleClose2 = () => {
    setOpen2(false);
  };

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [openContract, setOpenContract] = React.useState(false);

  const handleClickOpenContract = () => {
    setOpenContract(true);
  };

  const handleCloseContract = () => {
    setOpenContract(false);
  };

  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());

  const isStepOptional = (step) => {
    return step === 1;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  useEffect(() => {
    const getfinalizeContracts = async () => {
      try {
        const RAWres = await fetch(
          `${API_SERVICE}/api/v1/main/contract/getfinalizecontracts`
        );
        const res = await RAWres.json();
        setFinalizeContracts(res);
        console.log(res);
      } catch (err) {
        console.log(err);
      }
    };
    getfinalizeContracts();
  }, []);
  const payDownPayment = async () => {
    try {
      const RAWres = await fetch(`${API_SERVICE}/api/v1/main/offer/addoffer`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          workEmail: selectedContract.workEmail,
          workFirstName: selectedContract.workFirstName,
          workLastName: selectedContract.workLastName,
          nationality: selectedContract.nationality,
          position: selectedContract.jobTitle,
          scopeOfWork: {
            jobTitle: selectedContract.jobTitle,
            jobDescription: selectedContract.jobDescription,
            workCountry: selectedContract.workCountry,
            otherValidity: selectedContract.otherValidity,
            jobRequiresVisa: selectedContract.jobRequiresVisa,
            trialPeriod: selectedContract.trialPeriod,
          },
          grossSalary: selectedContract.grossSalary,
        }),
      });
      const res = await RAWres.json();
      try {
        const RAWres = await fetch(
          `${API_SERVICE}/api/v1/main/contract/changecontractstatus`,
          {
            method: "PATCH",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              workEmail: selectedContract.workEmail,
              status: "Done",
            }),
          }
        );
        const res = await RAWres.json();
        handleClose2();
        console.log(res);
      } catch (err) {
        console.log(err);
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <Dialog
        fullScreen
        open={open2}
        onClose={handleClose2}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose2}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <DialogContent
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignContent: "center",
          }}
        >
          <Container
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              textAlign: "center",
              alignItems: "center",
            }}
          >
            <h2>Vicky Signature</h2>

            <img
              src={selectedContract?.signUrl}
              width="300px"
              height="300px"
              alt=""
            />
            <h2>Down Payment and Breakdown</h2>

            {selectedContract?.downPayment ? null : (
              <Button onClick={payDownPayment}>Pay Down Payment</Button>
            )}
          </Container>
          <Container
            sx={{
              width: "100%",
              maxWidth: 360,
              bgcolor: "background.paper",
              display: "flex",
              justifyContent: "center",
              textAlign: "center",
              flexDirection: "row",
            }}
          >
            <Table>
              <TableBody>
                <StyledTableRow>
                  <StyledTableCell component="th" scope="row">
                    Total
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {Number(Number(selectedContract?.grossSalary) + 500) / 5 +
                      Number(selectedContract?.grossSalary) +
                      500}{" "}
                    USD
                  </StyledTableCell>
                </StyledTableRow>
                <StyledTableRow>
                  <StyledTableCell component="th" scope="row">
                    Gross Salary
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {selectedContract?.grossSalary} USD
                  </StyledTableCell>
                </StyledTableRow>
                <StyledTableRow>
                  <StyledTableCell component="th" scope="row">
                    Employer Cost
                  </StyledTableCell>
                  <StyledTableCell align="right">20 %</StyledTableCell>
                </StyledTableRow>
                <StyledTableRow>
                  <StyledTableCell component="th" scope="row">
                    Platform Fee
                  </StyledTableCell>
                  <StyledTableCell align="right">500 USD</StyledTableCell>
                </StyledTableRow>
              </TableBody>
            </Table>
          </Container>
          <Container
            sx={{
              mt: 5,
              width: "50%",
              display: "flex",
              justifyContent: "space-between",
              alignContent: "center",
            }}
          >
            <Link href={selectedContract?.commercialContract1}>
              Master Service Aggrement
            </Link>

            <Link href={selectedContract?.commercialContract2}>Appendix A</Link>
          </Container>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose2} autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>

      <MainCard title="Contract Approved">
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell align="center">Aggrement Type</TableCell>
                <TableCell align="center">Aggrement For</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {finalizeContracts.map((Contract, id) => {
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
                    <TableCell align="center">
                      <Tooltip title="View More">
                        <IconButton
                          onClick={() => {
                            setSelectedContract(Contract);
                            console.log(Contract);
                            handleClickOpen2();
                          }}
                          color="primary"
                          component="span"
                        >
                          <RemoveRedEyeIcon />
                        </IconButton>
                      </Tooltip>

                      {/* <Tooltip title="View Employement Aggrement">
                                        <IconButton onClick={handleClickOpen2} component="span">
                                            <AttachFileIcon />
                                        </IconButton>
                                    </Tooltip> */}

                      {/* <Tooltip title="Send Employement Aggrement">
                                        <IconButton onClick={handleClickOpen2} component="span">
                                            <SendIcon />
                                        </IconButton>
                                    </Tooltip> */}
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

export default ContractApproved;
