import { useEffect, useState } from "react";

// material-ui
import { Grid } from "@mui/material";

// project imports
import TotalWorkersHired from "../dashboard/Default/TotalWorkersHired";
import TotalContractsApproved from "../dashboard/Default/TotalContractsApproved";
import RejectedContracts from "../dashboard/Default/RejectedContracts";

import { gridSpacing } from "store/constant";
import { Link as RouterLink, useNavigate } from "react-router-dom";

// ==============================|| DEFAULT DASHBOARD ||============================== //
function getSessionStorageOrDefault(key, defaultValue) {
  const stored = sessionStorage.getItem(key);
  if (!stored) {
    return defaultValue;
  }

  return stored;
}
const Reports = () => {
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
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <Grid container spacing={gridSpacing}>
          <Grid item lg={4} md={6} sm={6} xs={12}>
            <TotalWorkersHired isLoading={isLoading} />
          </Grid>
          <Grid item lg={4} md={6} sm={6} xs={12}>
            <TotalContractsApproved isLoading={isLoading} />
          </Grid>
          <Grid item lg={4} md={6} sm={6} xs={12}>
            <RejectedContracts isLoading={isLoading} />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Reports;
