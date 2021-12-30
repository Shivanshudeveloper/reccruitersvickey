// project imports
import MainCard from "ui-component/cards/MainCard";
import {
  Dialog,
  AppBar,
  Toolbar,
  IconButton,
  Button,
  ListItemButton,
  List,
  ListItem,
  ListItemText,
  Link,
  TableContainer,
  Slide,
  Container,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Tooltip,
  Box,
} from "@mui/material";
import { useState, Containe, forwardRef, useEffect } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import { Document, Page, pdfjs } from "react-pdf";
import Paper from "@mui/material/Paper";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Grid from "@mui/material/Grid";
import PersonIcon from "@mui/icons-material/Person";
import { styled } from "@mui/material/styles";
import { tableCellClasses } from "@mui/material/TableCell";
import SendIcon from "@mui/icons-material/Send";
import LocalPrintshopIcon from "@mui/icons-material/LocalPrintshop";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { API_SERVICE } from "../../URI";
// ==============================|| SAMPLE PAGE ||============================== //
const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="left" ref={ref} {...props} />;
});

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "black",
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
const WorkersHired = () => {
  const [open2, setOpen2] = useState(false);
  const [selectedOffer, setSelectedOffer] = useState(null);
  const [offers, setOffers] = useState([]);
  const [contract, setContract] = useState(null);
  const handleClose2 = () => {
    setSelectedOffer(null);
    setContract(null);
    setOpen2(false);
  };
  const handleClickOpen2 = () => {
    setOpen2(true);
  };

  useEffect(() => {
    const getfinalizeContracts = async () => {
      try {
        const RAWres = await fetch(
          `${API_SERVICE}/api/v1/main/offer/getworkerhired`
        );
        const res = await RAWres.json();
        setOffers(res);
        console.log(res);
      } catch (err) {
        console.log(err);
      }
    };
    getfinalizeContracts();
  }, []);
  useEffect(() => {
    const getContract = async () => {
      try {
        const RAWres = await fetch(
          `${API_SERVICE}/api/v1/main/contract/getcontract/${selectedOffer.workEmail}`
        );
        const res = await RAWres.json();
        setContract(res[0]);
        console.log(res);
      } catch (err) {
        console.log(err);
      }
    };
    if (selectedOffer !== null) getContract();
  }, [selectedOffer]);
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
          {console.log(selectedOffer)}
          <Box sx={{ width: "50%", placeSelf: "center" }}>
            <TableContainer sx={{ mb: 3, mt: 2 }} component={Paper}>
              <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell>Personal Information</StyledTableCell>
                    <StyledTableCell align="center">First Name</StyledTableCell>
                    <StyledTableCell align="center">Last Name</StyledTableCell>

                    <StyledTableCell align="center">
                      Nationality
                    </StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <StyledTableRow>
                    <StyledTableCell
                      component="th"
                      scope="row"
                    ></StyledTableCell>
                    <StyledTableCell align="center">
                      {selectedOffer?.workFirstName}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {selectedOffer?.workLastName}
                    </StyledTableCell>

                    <StyledTableCell align="center">
                      {selectedOffer?.nationality}
                    </StyledTableCell>
                  </StyledTableRow>
                </TableBody>
              </Table>
            </TableContainer>
            <TableContainer sx={{ mb: 3 }} component={Paper}>
              <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell>Scope of Work</StyledTableCell>
                    <StyledTableCell align="center">Job Title</StyledTableCell>
                    <StyledTableCell align="center">
                      Job Description
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      Work Country
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      Offer Validity
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      Job Requires Visa
                    </StyledTableCell>

                    <StyledTableCell align="center">
                      Trial Period
                    </StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <StyledTableRow>
                    <StyledTableCell
                      component="th"
                      scope="row"
                    ></StyledTableCell>
                    <StyledTableCell align="center">
                      {selectedOffer?.scopeOfWork?.jobTitle}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {selectedOffer?.scopeOfWork?.jobDescription}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {selectedOffer?.scopeOfWork?.workCountry}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {selectedOffer?.scopeOfWork?.otherValidity}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {selectedOffer?.scopeOfWork?.jobRequiresVisa}
                    </StyledTableCell>

                    <StyledTableCell align="center">
                      {selectedOffer?.scopeOfWork?.trialPeriod}
                    </StyledTableCell>
                  </StyledTableRow>
                </TableBody>
              </Table>
            </TableContainer>

            <TableContainer sx={{ mb: 3 }} component={Paper}>
              <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell>Bank details</StyledTableCell>
                    <StyledTableCell align="center">Bank Name</StyledTableCell>
                    <StyledTableCell align="center">
                      Bank Address
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      Bank Number
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      Account Number
                    </StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <StyledTableRow>
                    <StyledTableCell
                      component="th"
                      scope="row"
                    ></StyledTableCell>
                    <StyledTableCell align="center">
                      {selectedOffer?.bankName}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {selectedOffer?.bankAddress}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {selectedOffer?.bankNumber}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {selectedOffer?.AccountNumber}
                    </StyledTableCell>
                  </StyledTableRow>
                </TableBody>
              </Table>
            </TableContainer>
            <TableContainer sx={{}} component={Paper}>
              <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell>Salary and details</StyledTableCell>

                    <StyledTableCell align="center">Salary</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <StyledTableRow>
                    <StyledTableCell
                      component="th"
                      scope="row"
                    ></StyledTableCell>
                    <StyledTableCell align="center">
                      {selectedOffer?.grossSalary} RS /month
                    </StyledTableCell>
                  </StyledTableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
          <Container
            sx={{
              mt: 5,
              width: "50%",
              display: "flex",
              justifyContent: "space-between",
              alignContent: "center",
            }}
          >
            <Link href={contract?.commercialContract1}>
              Master Service Aggrement
            </Link>

            <Link href={contract?.commercialContract2}>Appendix A</Link>
          </Container>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose2} autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>

      <MainCard title="Workers Hired">
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell align="center">Name</TableCell>
                <TableCell align="center">Aggrement For</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {offers.map((offer, id) => {
                return (
                  <TableRow
                    key={id + 1}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {id + 1}
                    </TableCell>
                    <TableCell align="center">
                      {offer.workFirstName} {offer.workLastName}
                    </TableCell>
                    <TableCell align="center">
                      {offer.workFirstName} {offer.workLastName}
                    </TableCell>
                    <TableCell align="center">
                      <Tooltip title="View More">
                        <IconButton
                          onClick={() => {
                            setSelectedOffer(offer);
                            console.log(offer);
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

export default WorkersHired;
