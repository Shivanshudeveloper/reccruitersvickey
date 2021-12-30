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
import FileUploadIcon from "@mui/icons-material/FileUpload";
import DownloadIcon from "@mui/icons-material/Download";
import Tooltip from "@mui/material/Tooltip";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CalendarViewMonthIcon from "@mui/icons-material/CalendarViewMonth";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDropzone } from "react-dropzone";
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
  CircularProgress,
} from "@mui/material";
import { useState, useEffect } from "react";
import { API_SERVICE } from "URI";
import { tableCellClasses } from "@mui/material/TableCell";
import { styled } from "@mui/material/styles";
import firebase from "../../../Firebase/index";
// ==============================|| SAMPLE PAGE ||============================== //

const steps = [{}, {}, {}];
function getSessionStorageOrDefault(key, defaultValue) {
  const stored = sessionStorage.getItem(key);
  if (!stored) {
    return defaultValue;
  }

  return stored;
}

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
const TotalJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [editJob, setEditJob] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const userEmail = getSessionStorageOrDefault("userEmail1", "");
  const [viewJob, setViewJob] = useState(false);
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [showUpload, setShowUpload] = useState(false);
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone();
  const [files, setFiles] = useState(null);
  const [JobFiles, setJobFiles] = useState([]);
  const [showTable, setShowTable] = useState(false);
  useEffect(() => {
    const get = async () => {
      const rawRes = await fetch(
        `${API_SERVICE}/api/v1/main/job/getjobsbycountry/Israel`
      );
      let res = await rawRes.json();

      res.sort((a, b) => new Date(b.date) - new Date(a.date));
      console.log(res);
      setJobs(res);
    };
    get();
  }, []);
  useEffect(() => {
    setFiles(
      acceptedFiles.map((file) => (
        <li key={file.path}>
          {file.path} - {file.size} bytes
        </li>
      ))
    );
  }, [acceptedFiles]);
  const handleClickCloseViewJob = () => {
    setViewJob(false);
    setEditJob(false);
    setSelectedJob(null);
  };
  const hanldeCloseUpload = () => {
    setShowUpload(false);
    setSelectedJob(null);
    setDescription("");
    setFiles(null);
  };

  const uploadFileAsPromise = (item) => {
    return new Promise((resolve, reject) => {
      const storage = firebase.storage();

      const uploadTask = storage.ref(`files/${item.name}`).put(item);
      uploadTask.on(
        "state_changed",
        () => {},
        (error) => {
          reject(error);
          console.log(error);
        },
        () => {
          storage
            .ref("files")
            .child(item.name)
            .getDownloadURL()
            .then((ul) => {
              resolve(ul);
            });
        }
      );
    });
  };
  const fileSubmit = () => {
    setLoading(true);
    if (acceptedFiles[0] === undefined) {
      setLoading(false);
      hanldeCloseUpload();
      return;
    }

    uploadFileAsPromise(acceptedFiles[0])
      .then(async (url) => {
        await fetch(`${API_SERVICE}/api/v1/main/files/add`, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            jobid: selectedJob._id,
            fileurl: url,
            description: description,
            filename: acceptedFiles[0].name,
          }),
        });
        setLoading(false);
        hanldeCloseUpload();
      })
      .catch((err) => console.log(err));
  };
  const handleCloseTable = () => {
    setSelectedJob(null);
    setShowTable(false);
  };
  useEffect(() => {
    if (showTable) {
      const get = async () => {
        const rawRes = await fetch(
          `${API_SERVICE}/api/v1/main/files/getfiles/${selectedJob._id}`
        );
        let res = await rawRes.json();
        res.sort((a, b) => new Date(b.date) - new Date(a.date));
        setJobFiles(res);
      };
      get();
    }
  }, [showTable]);
  const handleDeleteFile = async (Jfile) => {
    await fetch(`${API_SERVICE}/api/v1/main/files/deletefile/${Jfile._id}`, {
      method: "delete",
    });
    let Jfiles = [...JobFiles];
    Jfiles = Jfiles.filter((e) => e._id !== Jfile._id);
    Jfiles.sort((a, b) => new Date(b.date) - new Date(a.date));
    setJobFiles(Jfiles);
  };
  return (
    <>
      <Dialog
        fullWidth
        maxWidth="md"
        open={showTable}
        onClose={handleCloseTable}
      >
        <DialogContent>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>File Name</StyledTableCell>
                  <StyledTableCell align="center">Date</StyledTableCell>
                  <StyledTableCell align="center">Actions</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {JobFiles?.map((Jfile) => (
                  <StyledTableRow key={Jfile._id}>
                    <StyledTableCell component="th" scope="row">
                      {Jfile.filename}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {new Date(Jfile.date).toLocaleDateString()}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-evenly",
                        }}
                      >
                        <Tooltip title="Download">
                          <a href={Jfile.fileurl}>
                            <DownloadIcon color="primary" />
                          </a>
                        </Tooltip>
                        <Tooltip title="Delete">
                          <DeleteIcon
                            sx={{ cursor: "pointer", color: "#8B0000" }}
                            onClick={() => {
                              handleDeleteFile(Jfile);
                            }}
                            color="secondary"
                          />
                        </Tooltip>
                      </Box>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseTable}>Close</Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={showUpload}
        fullWidth
        maxWidth="md"
        onClose={hanldeCloseUpload}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Upload</DialogTitle>
        <DialogContent>
          <Container>
            <section
              style={{
                backgroundColor: "#F0F8FF",
                border: "1px solid white",
                borderRadius: "10px",
                padding: "10px",
                cursor: "pointer",
              }}
              className="dropzone"
              {...getRootProps()}
            >
              <Box
                sx={{
                  display: "flex",

                  justifyContent: "space-evenly",
                  justifyItems: "center",
                  alignItems: "center",
                }}
              >
                <input {...getInputProps()} />
                <h2>Drag and Drop files here</h2> <h2>or</h2>
                <Button variant="outlined"> Browse Files</Button>
                <CloudUploadIcon sx={{ fontSize: "2.2em" }} />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-evenly",
                }}
              >
                <ul>{files}</ul>
              </Box>
            </section>

            <TextField
              id="outlined-multiline-static"
              fullWidth
              label="Description( Optional )"
              multiline
              rows={6}
              sx={{ mt: 2 }}
            />
          </Container>
        </DialogContent>
        <DialogActions>
          {loading ? <CircularProgress /> : null}
          <Button disabled={loading} size="large" onClick={hanldeCloseUpload}>
            Cancel
          </Button>
          <Button
            disabled={loading}
            size="large"
            onClick={fileSubmit}
            autoFocus
          >
            Upload
          </Button>
        </DialogActions>
      </Dialog>

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
            </Box>

            <h3>CATEGORY</h3>
            <Button disabled variant="outlined">
              <Radio checked />
              <h3>Employees</h3>
            </Button>
            <h3>JOB DETAILS</h3>
            <TextField
              id="outlined-required"
              label="Job Title"
              value={selectedJob?.jobtitle}
              disabled
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
                disabled
                label="Country"
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
              disabled
              rows={4}
              value={selectedJob?.description}
              defaultValue=""
              sx={{ width: "100%", fontSize: "1.3em" }}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClickCloseViewJob}>Close</Button>
        </DialogActions>
      </Dialog>

      <MainCard title="Jobs">
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
                      <Tooltip title="Upload">
                        <IconButton
                          onClick={() => {
                            setSelectedJob(job);
                            setShowUpload(true);
                          }}
                          color="secondary"
                          component="span"
                        >
                          <FileUploadIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="View">
                        <IconButton
                          onClick={() => {
                            setSelectedJob(job);
                            setShowTable(true);
                          }}
                          color="primary"
                          component="span"
                        >
                          <CalendarViewMonthIcon />
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

export default TotalJobs;
