import { lazy } from "react";

// project imports
import MainLayout from "layout/MainLayout";
import Loadable from "ui-component/Loadable";
import CreateJob from "views/Recruiters/CreateJob";

// dashboard routing
const DashboardDefault = Loadable(
  lazy(() => import("views/dashboard/Default"))
);

// utilities routing
const UtilsTypography = Loadable(
  lazy(() => import("views/utilities/Typography"))
);
const UtilsColor = Loadable(lazy(() => import("views/utilities/Color")));
const UtilsShadow = Loadable(lazy(() => import("views/utilities/Shadow")));
const UtilsMaterialIcons = Loadable(
  lazy(() => import("views/utilities/MaterialIcons"))
);
const UtilsTablerIcons = Loadable(
  lazy(() => import("views/utilities/TablerIcons"))
);

const Createcontract = Loadable(
  lazy(() => import("views/contracts/Createcontract"))
);
const NotApprovedContract = Loadable(
  lazy(() => import("views/contracts/NotApprovedContract"))
);
const ContractApproved = Loadable(
  lazy(() => import("views/contracts/ContractApproved"))
);
const WorkersHired = Loadable(
  lazy(() => import("views/contracts/WorkersHired"))
);
const Reports = Loadable(lazy(() => import("views/Reports/index")));
const Requests = Loadable(lazy(() => import("views/contracts/Requests")));
// sample page routing
const SamplePage = Loadable(lazy(() => import("views/sample-page")));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: "/",
  element: <MainLayout />,
  children: [
    {
      path: "/",
      element: <DashboardDefault />,
    },
    {
      path: "/dashboard/default",
      element: <DashboardDefault />,
    },
    {
      path: "/reports",
      element: <Reports />,
    },
    {
      path: "/dashboard/createcontract",
      element: <Createcontract />,
    },
    {
      path: "/dashboard/contractsrejected",
      element: <NotApprovedContract />,
    },
    {
      path: "/dashboard/contractapproved",
      element: <ContractApproved />,
    },
    {
      path: "/dashboard/workershired",
      element: <WorkersHired />,
    },
    {
      path: "/dashboard/requests",
      element: <Requests />,
    },
    {
      path: "/dashboard/createjob",
      element: <CreateJob />,
    },
    {
      path: "/utils/util-typography",
      element: <UtilsTypography />,
    },
    {
      path: "/dashboard/appointments",
      element: <UtilsColor />,
    },

    {
      path: "/utils/util-shadow",
      element: <UtilsShadow />,
    },
    {
      path: "/icons/tabler-icons",
      element: <UtilsTablerIcons />,
    },
    {
      path: "/icons/material-icons",
      element: <UtilsMaterialIcons />,
    },
    {
      path: "/sample-page",
      element: <SamplePage />,
    },
  ],
};

export default MainRoutes;
