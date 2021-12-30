// assets
import { IconDashboard } from "@tabler/icons";

// constant
const icons = { IconDashboard };

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const reports = {
  id: "Reports",
  title: "Reports",
  type: "group",
  children: [
    {
      id: "Reports",
      title: "Reports",
      type: "item",
      url: "/reports",
      icon: icons.IconDashboard,
      breadcrumbs: false,
    },
  ],
};

export default reports;
