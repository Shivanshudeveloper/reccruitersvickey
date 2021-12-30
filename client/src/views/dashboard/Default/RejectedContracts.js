import PropTypes from "prop-types";
import { useEffect, useState } from "react";
// material-ui
import { styled, useTheme } from "@mui/material/styles";
import {
  Avatar,
  Box,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";

// project imports
import MainCard from "ui-component/cards/MainCard";
import TotalIncomeCard from "ui-component/cards/Skeleton/TotalIncomeCard";

// assets
import TableChartOutlinedIcon from "@mui/icons-material/TableChartOutlined";
import { API_SERVICE } from "URI";
// styles
const CardWrapper = styled(MainCard)(({ theme }) => ({
  backgroundColor: theme.palette.primary.dark,
  color: theme.palette.primary.light,
  overflow: "hidden",
  position: "relative",
  "&:after": {
    content: '""',
    position: "absolute",
    width: 210,
    height: 210,
    background: `linear-gradient(210.04deg, ${theme.palette.primary[200]} -50.94%, rgba(144, 202, 249, 0) 83.49%)`,
    borderRadius: "50%",
    top: -30,
    right: -180,
  },
  "&:before": {
    content: '""',
    position: "absolute",
    width: 210,
    height: 210,
    background: `linear-gradient(140.9deg, ${theme.palette.primary[200]} -14.02%, rgba(144, 202, 249, 0) 77.58%)`,
    borderRadius: "50%",
    top: -160,
    right: -130,
  },
}));

// ==============================|| DASHBOARD - TOTAL INCOME DARK CARD ||============================== //

const RejectedContracts = ({ isLoading }) => {
  const theme = useTheme();
  const [contracts, setContracts] = useState([]);
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
  return (
    <>
      {isLoading ? (
        <TotalIncomeCard />
      ) : (
        <CardWrapper border={false} content={false}>
          <Box sx={{ p: 3 }}>
            <List sx={{ py: 0 }}>
              <ListItem alignItems="center" disableGutters sx={{ py: 0 }}>
                <ListItemAvatar>
                  <Avatar
                    variant="rounded"
                    sx={{
                      ...theme.typography.commonAvatar,
                      ...theme.typography.largeAvatar,
                      backgroundColor: theme.palette.primary[800],
                      color: "#fff",
                    }}
                  >
                    <TableChartOutlinedIcon fontSize="inherit" />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  sx={{
                    py: 0,
                    mt: 2,
                    mb: 2,
                  }}
                  primary={
                    <Typography variant="h1" sx={{ color: "#fff" }}>
                      {contracts.length}
                    </Typography>
                  }
                  secondary={
                    <Typography
                      variant="subtitle1"
                      sx={{
                        fontSize: "1rem",
                        fontWeight: 500,
                        color: theme.palette.primary[200],
                      }}
                    >
                      Total Number of Contracts Rejected
                    </Typography>
                  }
                />
              </ListItem>
            </List>
          </Box>
        </CardWrapper>
      )}
    </>
  );
};

RejectedContracts.propTypes = {
  isLoading: PropTypes.bool,
};

export default RejectedContracts;
