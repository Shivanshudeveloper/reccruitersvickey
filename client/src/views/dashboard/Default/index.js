import { useEffect, useState } from "react";

// material-ui
import { Grid, Box } from "@mui/material";

// project imports
import TotalWorkersHired from "./TotalWorkersHired";
import PopularCard from "./PopularCard";
import TotalContractsApproved from "./TotalContractsApproved";
import RejectedContracts from "./RejectedContracts";
import TotalIncomeLightCard from "./TotalIncomeLightCard";
import TotalGrowthBarChart from "./TotalGrowthBarChart";
import { gridSpacing } from "store/constant";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import TotalJobs from "./TotalJobs";
// ==============================|| DEFAULT DASHBOARD ||============================== //
function getSessionStorageOrDefault(key, defaultValue) {
  const stored = sessionStorage.getItem(key);
  if (!stored) {
    return defaultValue;
  }

  return stored;
}
const Dashboard = () => {
  const [isLoading, setLoading] = useState(true);
  const userId = getSessionStorageOrDefault("userId1", "");
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(false);
    if (userId === "") {
      navigate("/app/pages/login/login3", { replace: true });
    }
  }, []);

  return (
    <Box sx={{ width: "100%" }}>
      {/* <Grid item xs={12}>
        <Grid container spacing={gridSpacing}>
          <Grid item lg={4} md={6} sm={6} xs={12}>
            <TotalWorkersHired isLoading={isLoading} />
          </Grid>
          <Grid item lg={4} md={6} sm={6} xs={12}>
            <TotalContractsApproved isLoading={isLoading} />
          </Grid>
          <Grid item lg={4} md={12} sm={12} xs={12}>
            <Grid container spacing={gridSpacing}>
              <Grid item sm={6} xs={12} md={6} lg={12}>
                <RejectedContracts isLoading={isLoading} />
              </Grid>
              <Grid item sm={6} xs={12} md={6} lg={12}>
                <TotalIncomeLightCard isLoading={isLoading} />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={gridSpacing}>
          <Grid item xs={12} md={8}>
            <TotalGrowthBarChart isLoading={isLoading} />
          </Grid>
          <Grid item xs={12} md={4}>
            <PopularCard isLoading={isLoading} />
          </Grid>
        </Grid>
      </Grid> */}
      <TotalJobs />
    </Box>
  );
};

export default Dashboard;
