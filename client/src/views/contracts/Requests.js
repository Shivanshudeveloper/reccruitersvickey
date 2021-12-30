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

import PreviewIcon from "@mui/icons-material/Preview";
import DeleteIcon from "@mui/icons-material/Delete";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import Tooltip from "@mui/material/Tooltip";
import Chip from "@mui/material/Chip";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Grid from "@mui/material/Grid";
import Slide from "@mui/material/Slide";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import CloseIcon from "@mui/icons-material/Close";
import TextField from "@mui/material/TextField";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useState, useEffect } from "react";
import { CircularProgress, Typography, Box, Container } from "@mui/material";
import CommercialContract2 from "../../utils/APPENDIX A - SCOPE OF WORK.pdf";
import CommercialContract1 from "../../utils/Master service agreement.pdf";
import firebase from "../../../src/Firebase/index";
import { API_SERVICE } from "../../URI";
// ==============================|| SAMPLE Ptype ||============================== //

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="left" ref={ref} {...props} />;
});

const Request = () => {
  const [type, setType] = React.useState("");
  const [request, setRequest] = React.useState({});
  const [requests, setRequests] = useState([]);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [open1, setOpen1] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  useEffect(() => {
    const getRequests = async () => {
      try {
        const rawres = await fetch(
          `${API_SERVICE}/api/v1/main/request/getrequests/abc@gmail.com`
        );
        const content = await rawres.json();
        setRequests(content);
      } catch (err) {
        console.log(err);
      }
    };
    getRequests();
  }, []);
  const handleClose1 = () => {
    setOpen1(false);
  };

  const handleClose11 = () => {
    setOpen1(false);
  };
  return (
    <>
      <Dialog
        open={open1}
        fullWidth
        maxWidth="md"
        onClose={handleClose1}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        {console.log(selectedRequest)}
        <DialogContent>
          {selectedRequest?.type === "Vacation" ? (
            <Container
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Box sx={{ backgroundColor: "grey" }}>
                <Typography sx={{ mb: 3 }} variant="h4" component="h2">
                  Request Type
                </Typography>
                <Typography variant="h5" component="h2">
                  {selectedRequest?.type}
                </Typography>
              </Box>
              <Box sx={{ backgroundColor: "grey" }}>
                <Typography sx={{ mb: 3 }} variant="h4" component="h2">
                  DATE FROM
                </Typography>
                <Typography variant="h5" component="h2">
                  {selectedRequest?.request.dateFrom}
                </Typography>
              </Box>

              <Box sx={{ backgroundColor: "grey" }}>
                <Typography sx={{ mb: 3 }} variant="h4" component="h2">
                  DATE TO
                </Typography>
                <Typography variant="h5" component="h2">
                  {selectedRequest?.request.dateTo}
                </Typography>
              </Box>

              <Box sx={{ backgroundColor: "grey" }}>
                <Typography sx={{ mb: 3 }} variant="h4" component="h2">
                  Comments
                </Typography>
                <Typography variant="h5" component="h2">
                  {selectedRequest?.request.comments}
                </Typography>
              </Box>
            </Container>
          ) : selectedRequest?.type === "Sick Leave" ? (
            <Container
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Box sx={{ backgroundColor: "grey" }}>
                <Typography sx={{ mb: 3 }} variant="h4" component="h2">
                  Request Type
                </Typography>
                <Typography variant="h5" component="h2">
                  {selectedRequest?.type}
                </Typography>
              </Box>
              <Box sx={{ backgroundColor: "grey" }}>
                <Typography sx={{ mb: 3 }} variant="h4" component="h2">
                  DATE FROM
                </Typography>
                <Typography variant="h5" component="h2">
                  {selectedRequest?.request.dateFrom}
                </Typography>
              </Box>
              <Box sx={{ backgroundColor: "grey" }}>
                <Typography sx={{ mb: 3 }} variant="h4" component="h2">
                  DATE TO
                </Typography>
                <Typography variant="h5" component="h2">
                  {selectedRequest?.request.dateTo}
                </Typography>
              </Box>
              <Box sx={{ backgroundColor: "grey" }}>
                <Typography sx={{ mb: 3 }} variant="h4" component="h2">
                  Comments
                </Typography>
                <Typography variant="h5" component="h2">
                  {selectedRequest?.request.comments}
                </Typography>
              </Box>
            </Container>
          ) : selectedRequest?.type === "Budget" ? (
            <Container
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Box sx={{ backgroundColor: "grey" }}>
                <Typography sx={{ mb: 3 }} variant="h4" component="h2">
                  Request Type
                </Typography>
                <Typography variant="h5" component="h2">
                  {selectedRequest?.type}
                </Typography>
              </Box>
              <Box sx={{ backgroundColor: "grey" }}>
                <Typography sx={{ mb: 3 }} variant="h4" component="h2">
                  Amount
                </Typography>
                <Typography variant="h5" component="h2">
                  {selectedRequest?.request.amount}
                </Typography>
              </Box>

              <Box sx={{ backgroundColor: "grey" }}>
                <Typography sx={{ mb: 3 }} variant="h4" component="h2">
                  DATE FROM
                </Typography>
                <Typography variant="h5" component="h2">
                  {selectedRequest?.request.dateFrom}
                </Typography>
              </Box>
              <Box sx={{ backgroundColor: "grey" }}>
                <Typography sx={{ mb: 3 }} variant="h4" component="h2">
                  Comments
                </Typography>
                <Typography variant="h5" component="h2">
                  {selectedRequest?.request.comments}
                </Typography>
              </Box>
            </Container>
          ) : selectedRequest?.type === "Downpayment" ? (
            <Container
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Box sx={{ backgroundColor: "grey" }}>
                <Typography sx={{ mb: 3 }} variant="h4" component="h2">
                  Request Type
                </Typography>
                <Typography variant="h5" component="h2">
                  {selectedRequest?.type}
                </Typography>
              </Box>
              <Box sx={{ backgroundColor: "grey" }}>
                <Typography sx={{ mb: 3 }} variant="h4" component="h2">
                  Amount
                </Typography>
                <Typography variant="h5" component="h2">
                  {selectedRequest?.request.amount}
                </Typography>
              </Box>
              <Box sx={{ backgroundColor: "grey" }}>
                <Typography sx={{ mb: 3 }} variant="h4" component="h2">
                  DATE FROM
                </Typography>
                <Typography variant="h5" component="h2">
                  {selectedRequest?.request.dateFrom}
                </Typography>
              </Box>
              <Box sx={{ backgroundColor: "grey" }}>
                <Typography sx={{ mb: 3 }} variant="h4" component="h2">
                  Comments
                </Typography>
                <Typography variant="h5" component="h2">
                  {selectedRequest?.request.comments}
                </Typography>
              </Box>
            </Container>
          ) : null}
          {selectedRequest?.request.fileUrl !== "" ? (
            <img
              src={selectedRequest?.request.fileUrl}
              alt=""
              width="100px"
              height="100px"
            />
          ) : null}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose11} autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>

      <br />
      <br />
      <br />
      <MainCard title="Applications">
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell align="center">Name</TableCell>
                <TableCell align="center">Request Type</TableCell>
                <TableCell align="center">Date</TableCell>
                <TableCell align="center">Request Status</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {requests.map((req, id) => {
                return (
                  <TableRow
                    key={id + 1}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {id + 1}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {req.name}
                    </TableCell>
                    <TableCell align="center">{req.type}</TableCell>
                    <TableCell align="center">
                      {new Date(req.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell align="center">
                      <Chip
                        sx={
                          req.requestStatus === "Under Process"
                            ? { backgroundColor: "#D6B12E", color: "#fff" }
                            : { backgroundColor: "green", color: "#fff" }
                        }
                        label={req.requestStatus}
                      />
                    </TableCell>
                    <TableCell align="center">
                      {/* <Tooltip title="View More">
                                        <IconButton color="primary" component="span">
                                            <PreviewIcon />
                                        </IconButton>
                                    </Tooltip> */}
                      <Tooltip title="View More">
                        <IconButton
                          onClick={() => {
                            setSelectedRequest(req);
                            setOpen1(true);
                          }}
                          color="primary"
                          component="span"
                        >
                          <PreviewIcon />
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

export default Request;
