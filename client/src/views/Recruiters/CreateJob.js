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
import EditIcon from "@mui/icons-material/Edit";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

import DownloadIcon from "@mui/icons-material/Download";
import Tooltip from "@mui/material/Tooltip";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import EmployementContract from "../../utils/Consultant employment agreement.pdf";
import {
  DialogTitle,
  Snackbar,
  Alert,
  DialogContentText,
  StepContent,
  Radio,
  FormControl,
  MenuItem,
  InputLabel,
  Select,
} from "@mui/material";
import { useState, useEffect } from "react";
import { API_SERVICE } from "../../URI";

// ==============================|| SAMPLE PAGE ||============================== //

const steps = [{}, {}, {}];
function getSessionStorageOrDefault(key, defaultValue) {
  const stored = sessionStorage.getItem(key);
  if (!stored) {
    return defaultValue;
  }

  return stored;
}
const CreateJob = () => {
  const [open, setOpen] = useState(false);
  const [activeStep, setActiveStep] = React.useState(0);
  const [jobTitle, setJobTitle] = useState("");
  const [country, setCountry] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [jobs, setJobs] = useState([]);
  const [editJob, setEditJob] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const userEmail = getSessionStorageOrDefault("userEmail1", "");
  const [viewJob, setViewJob] = useState(false);
  const handleClickOpenJob = () => {
    setOpen(true);
  };
  const handleClickCloseJob = () => {
    setOpen(false);
    setJobTitle("");
    setCountry("");
    setJobDescription("");
    handleReset();
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };
  const createJob = async () => {
    if (jobDescription !== "" && jobTitle !== "" && country !== "") {
      handleNext();
      try {
        await fetch(`${API_SERVICE}/api/v1/main/job/add`, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: userEmail,
            country: country,
            jobtitle: jobTitle,
            description: jobDescription,
            category: "Employee",
          }),
        });
        let Jobs = [...jobs];
        Jobs.push({
          email: userEmail,
          country: country,
          jobtitle: jobTitle,
          description: jobDescription,
          category: "Employee",
          date: new Date(),
        });
        setJobs(Jobs);
      } catch (err) {
        console.log(err);
      }
    }
  };
  useEffect(() => {
    const get = async () => {
      const rawRes = await fetch(
        `${API_SERVICE}/api/v1/main/job/getjobs/${userEmail}`
      );
      let res = await rawRes.json();

      res.sort((a, b) => new Date(b.date) - new Date(a.date));
      setJobs(res);
    };
    get();
  }, []);
  const deleteJob = async (job) => {
    await fetch(`${API_SERVICE}/api/v1/main/job/deletejob/${job._id}`, {
      method: "delete",
    });
    let Jobs = [...jobs];
    Jobs = Jobs.filter((e) => e._id !== job._id);
    setJobs(Jobs);
  };
  const handleClickCloseViewJob = () => {
    setViewJob(false);
    setEditJob(false);
    setSelectedJob(null);
  };
  const updateJob = async () => {
    await fetch(`${API_SERVICE}/api/v1/main/job/updatejob`, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(selectedJob),
    });
    let Jobs = [...jobs];
    Jobs = Jobs.filter((e) => e._id !== selectedJob._id);
    Jobs.push(selectedJob);
    Jobs.sort((a, b) => new Date(b.date) - new Date(a.date));
    setJobs(Jobs);
    handleClickCloseViewJob();
  };
  return (
    <>
      <Dialog
        fullWidth
        maxWidth="md"
        open={viewJob}
        onClose={handleClickCloseViewJob}
      >
        <DialogContent>
          <Box>
            <Box sx={{ display: "flex" }}>
              {" "}
              <h1
                style={{
                  fontWeight: "500",
                  color: "black",
                }}
              >
                Job Ad
              </h1>
              {!editJob ? (
                <Tooltip onClick={() => {}} title="Edit">
                  <IconButton color="primary" component="span">
                    <EditIcon
                      sx={{ fontSize: "1.3em" }}
                      onClick={() => setEditJob(true)}
                    />
                  </IconButton>
                </Tooltip>
              ) : null}
            </Box>

            <h3>CATEGORY</h3>
            <Button disabled={editJob ? false : true} variant="outlined">
              <Radio checked />
              <h3>Employees</h3>
            </Button>
            <h3>JOB DETAILS</h3>
            <TextField
              id="outlined-required"
              label="Job Title"
              value={selectedJob?.jobtitle}
              disabled={editJob ? false : true}
              onChange={(e) =>
                setSelectedJob({ ...selectedJob, jobtitle: e.target.value })
              }
              defaultValue=""
              sx={{ width: "100%" }}
            />
            <h3> Job for Country</h3>
            <FormControl sx={{ width: "100%" }}>
              <InputLabel id="demo-simple-select-label">Country</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={selectedJob?.country}
                disabled={editJob ? false : true}
                label="Country"
                onChange={(e) =>
                  setSelectedJob({ ...selectedJob, country: e.target.value })
                }
              >
                <MenuItem value={"Israel"}>Israel</MenuItem>
                <MenuItem value={"Jordan"}>Jordan</MenuItem>
                <MenuItem value={"India"}>India</MenuItem>
                <MenuItem value={"Romania"}>Romania</MenuItem>
                <MenuItem value={"Bulgaria"}>Bulgaria</MenuItem>
                <MenuItem value={"Egypt"}>Egypt</MenuItem>
                <MenuItem value={"Mexico"}>Mexico</MenuItem>
                <MenuItem value={"Argentina"}>Argentina</MenuItem>
              </Select>
            </FormControl>
            <h3>DESCRIPTION</h3>
            <TextField
              id="outlined-required"
              label="Description"
              multiline
              disabled={editJob ? false : true}
              rows={4}
              value={selectedJob?.description}
              onChange={(e) =>
                setSelectedJob({ ...selectedJob, description: e.target.value })
              }
              defaultValue=""
              sx={{ width: "100%", fontSize: "1.3em" }}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          {editJob ? (
            <Box>
              <Button onClick={updateJob}>Save Changes</Button>
              <Button onClick={handleClickCloseViewJob}>Cancel</Button>
            </Box>
          ) : (
            <Button onClick={handleClickCloseViewJob}>Close</Button>
          )}
        </DialogActions>
      </Dialog>

      <Dialog fullWidth maxWidth="md" open={open} onClose={handleClickCloseJob}>
        <DialogContent>
          <Box>
            <h1
              style={{
                fontWeight: "500",
                color: "black",
              }}
            >
              Create Job Ad
            </h1>
            <Stepper activeStep={activeStep} orientation="vertical">
              {steps.map((step, index) => {
                if (index === 0) {
                  return (
                    <Step>
                      <StepLabel
                        optional={
                          index === 2 ? (
                            <Typography variant="caption">Last step</Typography>
                          ) : null
                        }
                      >
                        <h3>CATEGORY</h3>
                      </StepLabel>
                      <StepContent>
                        <h2> I'm looking for... </h2>
                        <Button variant="outlined">
                          <Radio checked />
                          <h3>Employees</h3>
                        </Button>
                        <Box sx={{ mb: 2, mt: 5 }}>
                          <div>
                            <Button
                              variant="contained"
                              onClick={handleNext}
                              sx={{ mt: 1, mr: 1 }}
                            >
                              {index === steps.length - 1
                                ? "Finish"
                                : "Continue"}
                            </Button>
                            <Button
                              disabled={index === 0}
                              onClick={handleBack}
                              sx={{ mt: 1, mr: 1 }}
                            >
                              Back
                            </Button>
                          </div>
                        </Box>
                      </StepContent>
                    </Step>
                  );
                } else if (index === 1) {
                  return (
                    <Step>
                      <StepLabel>
                        <h3>JOB DETAILS</h3>
                      </StepLabel>
                      <StepContent>
                        <h2> What is the job about? </h2>
                        <TextField
                          id="outlined-required"
                          label="Job Title"
                          value={jobTitle}
                          onChange={(e) => setJobTitle(e.target.value)}
                          defaultValue=""
                          sx={{ width: "100%" }}
                        />
                        <h2> Job for Countries</h2>
                        <FormControl sx={{ width: "100%" }}>
                          <InputLabel id="demo-simple-select-label">
                            Country
                          </InputLabel>
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={country}
                            label="Country"
                            onChange={(e) => setCountry(e.target.value)}
                          >
                            <MenuItem value={"Israel"}>Israel</MenuItem>
                            <MenuItem value={"Jordan"}>Jordan</MenuItem>
                            <MenuItem value={"India"}>India</MenuItem>
                            <MenuItem value={"Romania"}>Romania</MenuItem>
                            <MenuItem value={"Bulgaria"}>Bulgaria</MenuItem>
                            <MenuItem value={"Egypt"}>Egypt</MenuItem>
                            <MenuItem value={"Mexico"}>Mexico</MenuItem>
                            <MenuItem value={"Argentina"}>Argentina</MenuItem>
                          </Select>
                        </FormControl>
                        <Box sx={{ mb: 2, mt: 5 }}>
                          <div>
                            <Button
                              variant="contained"
                              onClick={handleNext}
                              sx={{ mt: 1, mr: 1 }}
                            >
                              {index === steps.length - 1
                                ? "Finish"
                                : "Continue"}
                            </Button>
                            <Button
                              disabled={index === 0}
                              onClick={handleBack}
                              sx={{ mt: 1, mr: 1 }}
                            >
                              Back
                            </Button>
                          </div>
                        </Box>
                      </StepContent>
                    </Step>
                  );
                }
                return (
                  <Step key={step.label}>
                    <StepLabel>
                      {" "}
                      <h3>DESCRIPTION</h3>
                    </StepLabel>
                    <StepContent>
                      <h2> How would you describe the job post? </h2>
                      <TextField
                        id="outlined-required"
                        label="Description"
                        multiline
                        rows={4}
                        value={jobDescription}
                        onChange={(e) => setJobDescription(e.target.value)}
                        defaultValue=""
                        sx={{ width: "100%", fontSize: "1.3em" }}
                      />
                      <Box sx={{ mb: 2 }}>
                        <div>
                          <Button
                            variant="contained"
                            onClick={createJob}
                            sx={{ mt: 1, mr: 1 }}
                          >
                            {index === steps.length - 1
                              ? "Create Job"
                              : "Continue"}
                          </Button>
                          <Button
                            disabled={index === 0}
                            onClick={handleBack}
                            sx={{ mt: 1, mr: 1 }}
                          >
                            Back
                          </Button>
                        </div>
                      </Box>
                    </StepContent>
                  </Step>
                );
              })}
            </Stepper>
            {activeStep === steps.length && (
              <Paper square elevation={0} sx={{ p: 3 }}>
                <CheckCircleIcon sx={{ color: "green", fontSize: "3em" }} />
                <h3>All done !</h3>
                {/* <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
                  Reset
                </Button> */}
              </Paper>
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClickCloseJob}>Close</Button>
        </DialogActions>
      </Dialog>
      <Button
        sx={{ float: "right", mb: 2 }}
        onClick={handleClickOpenJob}
        variant="contained"
      >
        Create Job
      </Button>
      <br />
      <br />
      <br />
      <MainCard title="Job">
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell align="center">Job Title</TableCell>
                <TableCell align="center">Date</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {jobs.map((job, id) => {
                return (
                  <TableRow
                    key={job._id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {id + 1}
                    </TableCell>
                    <TableCell align="center">{job.jobtitle}</TableCell>
                    <TableCell align="center">
                      {new Date(job.date).toLocaleDateString()}
                    </TableCell>
                    <TableCell align="center">
                      <Tooltip title="View">
                        <IconButton
                          onClick={() => {
                            setSelectedJob(job);
                            setViewJob(true);
                          }}
                          color="primary"
                          component="span"
                        >
                          <VisibilityIcon />
                        </IconButton>
                      </Tooltip>

                      <Tooltip onClick={() => {}} title="Delete">
                        <IconButton color="secondary" component="span">
                          <DeleteIcon onClick={() => deleteJob(job)} />
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

export default CreateJob;
