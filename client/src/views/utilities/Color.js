// project imports
import React from 'react';
import MainCard from 'ui-component/cards/MainCard';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';

import PreviewIcon from '@mui/icons-material/Preview';
import DeleteIcon from '@mui/icons-material/Delete';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import Tooltip from '@mui/material/Tooltip';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Grid from '@mui/material/Grid';
import Slide from '@mui/material/Slide';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import CloseIcon from '@mui/icons-material/Close';
import TextField from '@mui/material/TextField';
import CommercialContract2 from '../../utils/APPENDIX A - SCOPE OF WORK.pdf';
import CommercialContract1 from '../../utils/Master service agreement.pdf';
// ==============================|| SAMPLE PAGE ||============================== //




const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="left" ref={ref} {...props} />;
});



const Color = () => {

    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const [open1, setOpen1] = React.useState(false);
    const handleClickOpen1 = () => {
        setOpen1(true);
    };
    const handleClose1 = () => {
        setOpen1(false);
        handleClickOpen();
    };

    const handleClose11 = () => {
        setOpen1(false);
    };


    const [open2, setOpen2] = React.useState(false);
    const handleClickOpen2 = () => {
        setOpen2(true);
        setOpen1(false);
    };
    const handleClose2 = () => {
        setOpen2(false);
    };

    const handleClose22 = () => {
        handleClose2();
        handleClickOpencontract2();
    };


    const [opencontract2, setOpencontract2] = React.useState(false);
    const handleClickOpencontract2 = () => {
        setOpencontract2(true);
    };
    const handleClosecontract2 = () => {
        setOpencontract2(false);
    };


    
    return (
        <>
        
        <Dialog
            fullScreen
            open={open2}
            onClose={handleClose2}
            TransitionComponent={Transition}
        >
            <AppBar sx={{ position: 'relative' }}>
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
                    <h1>
                        MASTER SERVICES AGREEMENT
                    </h1>
                    <Grid sx={{ mt: 4 }} container spacing={2}>
                        <Grid item xs={6}>
                            <TextField fullWidth id="outlined-basic" label="SOW DATE" variant="outlined" />
                            <TextField sx={{ mt: 2 }} fullWidth id="outlined-basic" label="CUSTOMER TITLE" variant="outlined" />
                            <TextField sx={{ mt: 2 }} fullWidth id="outlined-basic" label="AUTHORITY NAME" variant="outlined" />
                        </Grid>
                        <Grid item xs={6}>
                            <iframe src={CommercialContract1}
                                width="800" height="950" />
                        </Grid>
                    </Grid>
                </center>
            </DialogContent>
            <DialogActions>
            <Button onClick={handleClose2} autoFocus>
                Close
            </Button>
            <Button onClick={handleClose22}>
                Next
            </Button>
            </DialogActions>
        </Dialog>


        <Dialog
            fullScreen
            open={opencontract2}
            onClose={handleClosecontract2}
            TransitionComponent={Transition}
        >
            <AppBar sx={{ position: 'relative' }}>
            <Toolbar>
                <IconButton
                    edge="start"
                    color="inherit"
                    onClick={handleClosecontract2}
                    aria-label="close"
                >
                    <CloseIcon />
                </IconButton>
            </Toolbar>
            </AppBar>
            <DialogContent>
                <center>
                    <h1>
                        APPENDIX A
                    </h1>
                    <Grid sx={{ mt: 4 }} container spacing={2}>
                        <Grid item xs={6}>
                            <TextField fullWidth id="outlined-basic" label="SOW DATE" variant="outlined" />
                            <TextField sx={{ mt: 2 }} type="date" fullWidth id="outlined-basic" label="SIGNING DATE" variant="outlined" />
                            <TextField sx={{ mt: 2 }} fullWidth id="outlined-basic" label="EMAIL" variant="outlined" />
                            <TextField sx={{ mt: 2 }} fullWidth id="outlined-basic" label="PHONE" variant="outlined" />
                            <TextField sx={{ mt: 2 }} fullWidth id="outlined-basic" label="WORK COUNTRY" variant="outlined" />
                            <TextField sx={{ mt: 2 }} fullWidth id="outlined-basic" label="EMPLOYEE NAME" variant="outlined" />
                            <TextField sx={{ mt: 2 }} fullWidth id="outlined-basic" label="EMPLOYEE ID" variant="outlined" />
                            <TextField sx={{ mt: 2 }} fullWidth id="outlined-basic" label="EMPLOYEE DAYS OFF" variant="outlined" />
                            <TextField sx={{ mt: 2 }} fullWidth id="outlined-basic" label="SCOPE OF WORK" variant="outlined" />
                            <TextField sx={{ mt: 2 }} fullWidth id="outlined-basic" label="EMPLOYEE JOB TITLE" variant="outlined" />
                            <TextField sx={{ mt: 2 }} fullWidth id="outlined-basic" label="SENIORITY" variant="outlined" />
                            <TextField sx={{ mt: 2 }} fullWidth id="outlined-basic" label="EMPLOYMENT TRIAL PERIOD" variant="outlined" />
                            <TextField sx={{ mt: 2 }} fullWidth id="outlined-basic" label="SALARY" variant="outlined" />
                            <TextField sx={{ mt: 2 }} fullWidth id="outlined-basic" label="BENEFITS" variant="outlined" />
                            <TextField sx={{ mt: 2 }} fullWidth id="outlined-basic" label="CURRENCY" variant="outlined" />
                            <TextField sx={{ mt: 2 }} fullWidth id="outlined-basic" value="Test Name" label="USER NAME" variant="outlined" />
                            <TextField sx={{ mt: 2 }} fullWidth id="outlined-basic" value="Test Title" label="USER TITLE" variant="outlined" />
                            <TextField sx={{ mt: 2 }} fullWidth id="outlined-basic" value="Test Company" label="CUSTOMER COMPANY NAME" variant="outlined" />
                            <TextField sx={{ mt: 2 }} fullWidth id="outlined-basic" value="Test Customer Name" label="CUSTOMER NAME" variant="outlined" />

                        </Grid>
                        <Grid item xs={6}>
                            <iframe src={CommercialContract2}
                                width="800" height="950" />
                        </Grid>
                    </Grid>
                </center>
            </DialogContent>
            <DialogActions>
            <Button onClick={handleClosecontract2} autoFocus>
                Close
            </Button>
            <Button onClick={() => window.location.href = "/app/dashboard/createcontract"}>
                Submit
            </Button>
            </DialogActions>
        </Dialog>




        <Dialog
            open={open1}
            fullWidth
            maxWidth="md"
            onClose={handleClose1}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogContent>
                <center>
                    <h1>
                       Please Sign Commercial Aggrement from Vicky
                    </h1>
                    <img style={{ width: '50%', cursor: 'pointer' }} src="https://res.cloudinary.com/dx9dnqzaj/image/upload/v1636620123/Vicky/Meeting-bro_uzxy0k.png" />
                    <br />
                    <Button onClick={handleClickOpen2} size="large" variant="text">Sign Now</Button>
                </center>
            </DialogContent>
            <DialogActions>
            <Button onClick={handleClose11} autoFocus>
                Cancel
            </Button>
            {/* <Button onClick={handleClickOpen2} autoFocus>
                Sign Now
            </Button> */}
            </DialogActions>
        </Dialog>


        <Dialog
            open={open}
            fullWidth
            maxWidth="md"
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogContent>
                <center>
                    <h1>
                       Choose Contract
                    </h1>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <img onClick={handleClickOpen1} style={{ width: '80%', cursor: 'pointer' }} src="https://res.cloudinary.com/dx9dnqzaj/image/upload/v1636618430/Vicky/Hidden-cuate_gofta4.png" />
                        <h2>Employment Aggrement</h2>
                    </Grid>
                    <Grid item xs={6}>
                        <img onClick={handleClickOpen1} style={{ width: '80%', cursor: 'pointer' }} src="https://res.cloudinary.com/dx9dnqzaj/image/upload/v1636618430/Vicky/Accept_terms-rafiki_t2rra8.png" />
                        <h2>Contractor Aggrement</h2>
                    </Grid>
                </Grid>
                </center>
            </DialogContent>
            <DialogActions>
            <Button onClick={handleClose} autoFocus>
                Close
            </Button>
            </DialogActions>
        </Dialog>


        <MainCard title="Applications">
            <TableContainer component={Paper}>
                <Table aria-label="simple table">
                    <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell align="center">Full Name</TableCell>
                        <TableCell align="center">Email</TableCell>
                        <TableCell align="center">Applied for</TableCell>
                        <TableCell align="center">Actions</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow
                            key={1}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                            <TableCell component="th" scope="row">
                                1001
                            </TableCell>
                            <TableCell align="center">
                                Shivanshu Gupta    
                            </TableCell>
                            <TableCell align="center">
                                shivanshu@gmail.com
                            </TableCell>
                            <TableCell align="center">
                                Software Engineer Post
                            </TableCell>
                            <TableCell align="center">
                                <Tooltip title="View More">
                                    <IconButton color="primary" component="span">
                                        <PreviewIcon />
                                    </IconButton>
                                </Tooltip>

                                <Tooltip title="Delete User">
                                    <IconButton color="secondary" component="span">
                                        <DeleteIcon />
                                    </IconButton>
                                </Tooltip>

                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </MainCard>
        </>
    );
};

export default Color;
