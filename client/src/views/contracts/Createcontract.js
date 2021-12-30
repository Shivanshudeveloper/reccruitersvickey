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
import EmployementContract from "../../utils/Consultant employment agreement.pdf";
import { DialogTitle, Snackbar, Alert } from "@mui/material";
import { useState, useEffect } from "react";

import { API_SERVICE } from "../../URI";

// ==============================|| SAMPLE PAGE ||============================== //

const steps = [
  "Employee Information",
  "Scope of Work",
  "Salary and details",
  "Review and submit",
];

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="left" ref={ref} {...props} />;
});

const Createcontract = () => {
  const [open2, setOpen2] = React.useState(false);
  const [contract, setContract] = useState({
    AggrementType: "",
    workFirstName: "",
    workLastName: "",
    nationality: "",
    workEmail: "",
    jobTitle: "",
    jobDescription: "",
    workCountry: "",
    otherValidity: "",
    jobRequiresVisa: "",
    trialPeriod: "",
    currency: "",
    grossSalary: "",
    paymentCycle: "",
    vacationsDays: "",
    sickLeave: "",
    transportation: "",
    BonusPlan: "",
    startOfWork: null,
    ContractEndDate: null,
  });
  const [showEdit, setShowEdit] = useState(false);
  const [openSnack, setOpenSnack] = useState(false);
  const [information, setInformation] = useState({
    employeeInformation: ``,
    scopeOfWork: ``,
    salaryandDetails: ``,
  });
  const handleClickOpen2 = () => {
    setOpen2(true);
  };
  const handleClose2 = () => {
    setOpen2(false);
  };

  const [open, setOpen] = React.useState(false);
  const [contracts, setContracts] = useState([]);
  const [loading, setLoading] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpenContract(false);
    setOpen(false);
  };

  const [openContract, setOpenContract] = React.useState(false);

  const handleClickOpenContract = () => {
    setOpenContract(true);
  };

  const handleCloseContract = () => {
    setActiveStep(0);
    setOpenContract(false);
  };

  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedToDelete, setSelectedToDelete] = useState(null);
  const isStepOptional = (step) => {
    return step === 1;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = async () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };
  const createContract = async () => {
    setLoading(true);
    setContract((old) => ({
      ...old,
      employeeInformation: information.employeeInformation,
      scopeOfWork: information.scopeOfWork,
      salaryandDetails: information.salaryandDetails,
    }));
    try {
      const RAWres = await fetch(
        `${API_SERVICE}/api/v1/main/contract/addcontract`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...contract,
            employeeInformation: information.employeeInformation,
            scopeOfWork: information.scopeOfWork,
            salaryandDetails: information.salaryandDetails,
          }),
        }
      );
      const res = await RAWres.json();
      let cont = [...contracts];
      console.log(res);
      if (!res.err) {
        cont.push({
          ...contract,
          employeeInformation: information.employeeInformation,
          scopeOfWork: information.scopeOfWork,
          salaryandDetails: information.salaryandDetails,
        });
        setContracts(cont);
        setOpenSnack(true);
      }

      let newSkipped = skipped;
      if (isStepSkipped(activeStep)) {
        newSkipped = new Set(newSkipped.values());
        newSkipped.delete(activeStep);
      }
      setContract({
        AggrementType: "",
        workFirstName: "",
        workLastName: "",
        nationality: "",
        workEmail: "",
        jobTitle: "",
        jobDescription: "",
        workCountry: "",
        otherValidity: "",
        jobRequiresVisa: "",
        trialPeriod: "",
        currency: "",
        grossSalary: "",
        paymentCycle: "",
        vacationsDays: "",
        sickLeave: "",
        transportation: "",
        BonusPlan: "",
        startOfWork: null,
        ContractEndDate: null,
      });
      setOpenContract(false);
      setActiveStep(0);
      setSkipped(newSkipped);
      setLoading(false);

      handleClose();
    } catch (err) {
      console.log(err);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };
  useEffect(() => {
    const getAllContracts = async () => {
      try {
        const RAWres = await fetch(
          `${API_SERVICE}/api/v1/main/contract/getcontracts`
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
        open={openContract}
        fullWidth
        maxWidth="md"
        onClose={handleCloseContract}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <center>
            <h1>Choose Contract</h1>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <img
                  alt=""
                  onClick={() => {
                    setContract((old) => ({
                      ...old,
                      AggrementType: "Employment",
                    }));
                    handleClickOpen();
                  }}
                  style={{ width: "80%", cursor: "pointer" }}
                  src="https://res.cloudinary.com/dx9dnqzaj/image/upload/v1636618430/Vicky/Hidden-cuate_gofta4.png"
                />
                <h2>Employment Aggrement</h2>
              </Grid>
              <Grid item xs={6}>
                <img
                  alt=""
                  onClick={() => {
                    setContract((old) => ({
                      ...old,
                      AggrementType: "Contractor",
                    }));
                    handleClickOpen();
                  }}
                  style={{ width: "80%", cursor: "pointer" }}
                  src="https://res.cloudinary.com/dx9dnqzaj/image/upload/v1636618430/Vicky/Accept_terms-rafiki_t2rra8.png"
                />
                <h2>Contractor Aggrement</h2>
              </Grid>
            </Grid>
          </center>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseContract} autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Container sx={{ mt: 4, mb: 4 }}>
          <Box sx={{ width: "100%" }}>
            <Stepper activeStep={activeStep}>
              {steps.map((label, index) => {
                const stepProps = {};
                const labelProps = {};
                if (isStepOptional(index)) {
                  labelProps.optional = (
                    <Typography variant="caption"></Typography>
                  );
                }
                if (isStepSkipped(index)) {
                  stepProps.completed = false;
                }
                return (
                  <Step key={label} {...stepProps}>
                    <StepLabel {...labelProps}>{label}</StepLabel>
                  </Step>
                );
              })}
            </Stepper>
            {activeStep === steps.length ? (
              <React.Fragment>
                {/* <Typography sx={{ mt: 2, mb: 1 }}>
                    All steps completed - you&apos;re finished
                </Typography> */}
                <center>
                  <img
                    alt=""
                    style={{ width: "500px", marginTop: "100px" }}
                    src="https://i.gifer.com/PpMc.gif"
                  />
                  <h2>Under Process</h2>
                </center>
                <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                  <Box sx={{ flex: "1 1 auto" }} />
                  <Button onClick={handleReset}>Reset</Button>
                </Box>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <Typography sx={{ mt: 2, mb: 1 }}>
                  Step {activeStep + 1}
                </Typography>

                {activeStep === 0 ? (
                  <>
                    <TextField
                      sx={{ mt: 2 }}
                      fullWidth
                      value={contract.workFirstName}
                      onChange={(e) =>
                        setContract((old) => ({
                          ...old,
                          workFirstName: e.target.value,
                        }))
                      }
                      id="outlined-basic"
                      label="WORK FIRST NAME"
                      variant="outlined"
                    />
                    <TextField
                      sx={{ mt: 2 }}
                      fullWidth
                      id="outlined-basic"
                      label="WORK LAST NAME"
                      variant="outlined"
                      value={contract.workLastName}
                      onChange={(e) =>
                        setContract((old) => ({
                          ...old,
                          workLastName: e.target.value,
                        }))
                      }
                    />
                    <TextField
                      sx={{ mt: 2 }}
                      fullWidth
                      id="outlined-basic"
                      label="WORK NATIONALITY"
                      variant="outlined"
                      value={contract.nationality}
                      onChange={(e) =>
                        setContract((old) => ({
                          ...old,
                          nationality: e.target.value,
                        }))
                      }
                    />
                    <TextField
                      sx={{ mt: 2 }}
                      fullWidth
                      id="outlined-basic"
                      label="WORK EMAIL"
                      variant="outlined"
                      value={contract.workEmail}
                      onChange={(e) =>
                        setContract((old) => ({
                          ...old,
                          workEmail: e.target.value,
                        }))
                      }
                    />
                  </>
                ) : activeStep === 1 ? (
                  <>
                    <TextField
                      sx={{ mt: 2 }}
                      fullWidth
                      id="outlined-basic"
                      label="JOB TITLE"
                      variant="outlined"
                      value={contract.jobTitle}
                      onChange={(e) =>
                        setContract((old) => ({
                          ...old,
                          jobTitle: e.target.value,
                        }))
                      }
                    />
                    <TextField
                      sx={{ mt: 2 }}
                      multiline
                      row={3}
                      fullWidth
                      id="outlined-basic"
                      label="JOB DESCRIPTION (max 250 words)"
                      variant="outlined"
                      value={contract.jobDescription}
                      onChange={(e) =>
                        setContract((old) => ({
                          ...old,
                          jobDescription: e.target.value.substring(0,1700),
                        }))
                      }
                    />
                    <TextField
                      sx={{ mt: 2 }}
                      fullWidth
                      id="outlined-basic"
                      label="WORK COUNTRY"
                      variant="outlined"
                      value={contract.workCountry}
                      onChange={(e) =>
                        setContract((old) => ({
                          ...old,
                          workCountry: e.target.value,
                        }))
                      }
                    />
                    <TextField
                      sx={{ mt: 2 }}
                      fullWidth
                      id="outlined-basic"
                      label="OFFER VALIDITY"
                      variant="outlined"
                      value={contract.otherValidity}
                      onChange={(e) =>
                        setContract((old) => ({
                          ...old,
                          otherValidity: e.target.value,
                        }))
                      }
                    />
                    <TextField
                      sx={{ mt: 2 }}
                      fullWidth
                      id="outlined-basic"
                      label="JOB REQUIRES VISA"
                      placeholder="Yes/No"
                      variant="outlined"
                      value={contract.jobRequiresVisa}
                      onChange={(e) =>
                        setContract((old) => ({
                          ...old,
                          jobRequiresVisa: e.target.value,
                        }))
                      }
                    />
                    <TextField
                      sx={{ mt: 2 }}
                      fullWidth
                      id="outlined-basic"
                      label="TRIAL PERIOD"
                      variant="outlined"
                      value={contract.trialPeriod}
                      onChange={(e) =>
                        setContract((old) => ({
                          ...old,
                          trialPeriod: e.target.value,
                        }))
                      }
                    />
                  </>
                ) : activeStep === 2 ? (
                  <>
                    <TextField
                      sx={{ mt: 2 }}
                      fullWidth
                      id="outlined-basic"
                      label="CURRENCY"
                      variant="outlined"
                      value={contract.currency}
                      onChange={(e) =>
                        setContract((old) => ({
                          ...old,
                          currency: e.target.value,
                        }))
                      }
                    />
                    <TextField
                      sx={{ mt: 2 }}
                      fullWidth
                      id="outlined-basic"
                      label="GROSS SALARY"
                      variant="outlined"
                      value={contract.grossSalary}
                      onChange={(e) =>
                        setContract((old) => ({
                          ...old,
                          grossSalary: e.target.value,
                        }))
                      }
                    />
                    <TextField
                      sx={{ mt: 2 }}
                      fullWidth
                      id="outlined-basic"
                      label="PAYMENT CYCLE"
                      variant="outlined"
                      value={contract.paymentCycle}
                      onChange={(e) =>
                        setContract((old) => ({
                          ...old,
                          paymentCycle: e.target.value,
                        }))
                      }
                    />
                    <TextField
                      sx={{ mt: 2 }}
                      fullWidth
                      id="outlined-basic"
                      label="VACATIONS DAYS"
                      variant="outlined"
                      value={contract.vacationsDays}
                      onChange={(e) =>
                        setContract((old) => ({
                          ...old,
                          vacationsDays: e.target.value,
                        }))
                      }
                    />
                    <TextField
                      sx={{ mt: 2 }}
                      fullWidth
                      id="outlined-basic"
                      label="SICK LEAVE"
                      variant="outlined"
                      value={contract.sickLeave}
                      onChange={(e) =>
                        setContract((old) => ({
                          ...old,
                          sickLeave: e.target.value,
                        }))
                      }
                    />
                    <TextField
                      sx={{ mt: 2 }}
                      fullWidth
                      id="outlined-basic"
                      label="TRANSPORTATION"
                      variant="outlined"
                      value={contract.transportation}
                      onChange={(e) =>
                        setContract((old) => ({
                          ...old,
                          transportation: e.target.value,
                        }))
                      }
                    />
                    <TextField
                      sx={{ mt: 2 }}
                      fullWidth
                      id="outlined-basic"
                      label="BONUS PLAN"
                      placeholder="Fixed/Variable"
                      variant="outlined"
                      value={contract.BonusPlan}
                      onChange={(e) =>
                        setContract((old) => ({
                          ...old,
                          BonusPlan: e.target.value,
                        }))
                      }
                    />
                    <TextField
                      sx={{ mt: 2 }}
                      type="date"
                      fullWidth
                      id="outlined-basic"
                      label="START OF WORK"
                      variant="outlined"
                      value={contract.startOfWork}
                      onChange={(e) =>
                        setContract((old) => ({
                          ...old,
                          startOfWork: e.target.value,
                        }))
                      }
                    />
                    <TextField
                      sx={{ mt: 2 }}
                      type="date"
                      fullWidth
                      id="outlined-basic"
                      label="CONTRACT END DATE (Optional)"
                      variant="outlined"
                      value={contract.ContractEndDate}
                      onChange={(e) =>
                        setContract((old) => ({
                          ...old,
                          ContractEndDate: e.target.value,
                        }))
                      }
                    />
                  </>
                ) : activeStep === 3 ? (
                  <>
                    <center>
                      <Tooltip title="Print">
                        <IconButton
                          color="primary"
                          aria-label="upload picture"
                          component="span"
                        >
                          <LocalPrintshopIcon />
                        </IconButton>
                      </Tooltip>

                      <Tooltip title="Download">
                        <IconButton
                          color="primary"
                          aria-label="upload picture"
                          component="span"
                        >
                          <DownloadIcon />
                        </IconButton>
                      </Tooltip>
                    </center>
                    {showEdit ? (
                      <>
                        <h3 style={{ fontWeight: "bold" }}>
                          Employee Information
                        </h3>

                        <TextField
                          sx={{ mt: 2 }}
                          fullWidth
                          value={information.employeeInformation}
                          onChange={(e) =>
                            setInformation((old) => ({
                              ...old,
                              employeeInformation: e.target.value,
                            }))
                          }
                        />
                        <h3 style={{ fontWeight: "bold" }}>Scope of Work</h3>
                        <TextField
                          sx={{ mt: 2 }}
                          fullWidth
                          value={information.scopeOfWork}
                          onChange={(e) =>
                            setInformation((old) => ({
                              ...old,
                              scopeOfWork: e.target.value,
                            }))
                          }
                        />

                        <h3 style={{ fontWeight: "bold" }}>
                          Salary and details
                        </h3>
                        <TextField
                          sx={{ mt: 2 }}
                          fullWidth
                          value={information.salaryandDetails}
                          onChange={(e) =>
                            setInformation((old) => ({
                              ...old,
                              salaryandDetails: e.target.value,
                            }))
                          }
                        />
                        <Button onClick={() => setShowEdit(false)}>Save</Button>
                      </>
                    ) : (
                      <Container
                        sx={{
                          display: "flex",
                          justifyContent: "space-evenly",
                          mt: 10,
                          mb: 10,
                        }}
                      >
                        <Button
                          onClick={() => setActiveStep(0)}
                          variant="contained"
                        >
                          Employee Information <EditIcon />
                        </Button>
                        <Button
                          onClick={() => setActiveStep(1)}
                          variant="contained"
                        >
                          Scope of Work <EditIcon />
                        </Button>
                        <Button
                          onClick={() => setActiveStep(2)}
                          variant="contained"
                        >
                          Salary and details <EditIcon />
                        </Button>
                      </Container>
                    )}
                  </>
                ) : null}

                <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                  <Button
                    color="inherit"
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    sx={{ mr: 1 }}
                  >
                    Back
                  </Button>

                  <Button
                    onClick={() => {
                      if (activeStep === steps.length - 1) createContract();
                      else handleNext();
                    }}
                  >
                    {activeStep === steps.length - 1 ? "Get a Quote" : "Next"}
                  </Button>
                </Box>
              </React.Fragment>
            )}
          </Box>
        </Container>
      </Dialog>

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
        <DialogContent>
          <center>
            <h1>Fill the Contract</h1>
            <Grid sx={{ mt: 4 }} container spacing={2}>
              <Grid item xs={6}>
                {/* <TextField type="date" fullWidth id="outlined-basic" label="SIGNITURE DATE" variant="outlined" /> */}
                <TextField
                  sx={{ mt: 2 }}
                  type="date"
                  fullWidth
                  id="outlined-basic"
                  label="START OF WORK"
                  variant="outlined"
                />
                <TextField
                  sx={{ mt: 2 }}
                  fullWidth
                  id="outlined-basic"
                  value="Test User"
                  label="CLIENT NAME"
                  variant="outlined"
                />
                <TextField
                  sx={{ mt: 2 }}
                  fullWidth
                  id="outlined-basic"
                  value="1234567890"
                  label="REGISTRATION NUMBER"
                  variant="outlined"
                />
                <TextField
                  sx={{ mt: 2 }}
                  fullWidth
                  id="outlined-basic"
                  label="EMPLOYEE NAME"
                  variant="outlined"
                />
                <TextField
                  sx={{ mt: 2 }}
                  fullWidth
                  id="outlined-basic"
                  label="EMPLOYEE TITLE"
                  variant="outlined"
                />
                <TextField
                  sx={{ mt: 2 }}
                  multiline
                  row={3}
                  fullWidth
                  id="outlined-basic"
                  label="JOB DESCRIPTION"
                  variant="outlined"
                />
                <TextField
                  sx={{ mt: 2 }}
                  fullWidth
                  id="outlined-basic"
                  label="WORKING HOURS"
                  variant="outlined"
                />
                <TextField
                  sx={{ mt: 2 }}
                  fullWidth
                  id="outlined-basic"
                  label="MONTHLY GROSS"
                  variant="outlined"
                />
                <TextField
                  sx={{ mt: 2 }}
                  multiline
                  row={3}
                  fullWidth
                  id="outlined-basic"
                  label="BENEFITS"
                  variant="outlined"
                />
                <TextField
                  sx={{ mt: 2 }}
                  fullWidth
                  id="outlined-basic"
                  label="TRANSPORTATION ALLOWANCE"
                  variant="outlined"
                />
                <TextField
                  sx={{ mt: 2 }}
                  fullWidth
                  id="outlined-basic"
                  label="OFFER VALIDITY"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={6}>
                <iframe src={EmployementContract} width="800" height="750" />
              </Grid>
            </Grid>
          </center>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose2} autoFocus>
            Close
          </Button>
          <Button onClick={handleClose2}>Submit</Button>
        </DialogActions>
      </Dialog>

      <Button
        sx={{ float: "right", mb: 2 }}
        onClick={handleClickOpenContract}
        variant="contained"
      >
        Create a New Contract
      </Button>
      <br />
      <br />
      <br />
      <MainCard title="Create a new Contract">
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
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </MainCard>
      <Snackbar
        open={openSnack}
        autoHideDuration={6000}
        onClose={() => {
          setOpenSnack(false);
        }}
      >
        <Alert
          onClose={() => {
            setOpenSnack(false);
          }}
          severity="success"
          sx={{ width: "100%" }}
        >
          Contract Submitted
        </Alert>
      </Snackbar>
    </>
  );
};

export default Createcontract;
