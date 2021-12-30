// assets
import { IconKey } from "@tabler/icons";
import PersonIcon from "@mui/icons-material/Person";
// constant
const icons = {
  IconKey,
};

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

export const pages1 = {
  id: "pages1",
  title: "Contracts",
  caption: "Contracts / Offer Letter",
  type: "group",
  children: [
    {
      id: "authentication",
      title: "Contracts",
      type: "collapse",
      icon: icons.IconKey,

      children: [
        {
          id: "login3",
          title: "Create Contracts",
          type: "item",
          url: "/dashboard/createcontract",
        },
        {
          id: "register3",
          title: "Contracts Rejected",
          type: "item",
          url: "/dashboard/contractsrejected",
        },
        {
          id: "register4",
          title: "Contracts Approved",
          type: "item",
          url: "/dashboard/contractapproved",
        },
        {
          id: "register5",
          title: "Workers Hired",
          type: "item",
          url: "/dashboard/workershired",
        },
        {
          id: "register6",
          title: "Requests",
          type: "item",
          url: "/dashboard/requests",
        },
      ],
    },
  ],
};
export const pages2 = {
  id: "pages2",
  title: "Recruiters",
  caption: "Recruiters",
  type: "group",
  children: [
    {
      id: "authentication",
      title: "Recruiters",
      type: "collapse",
      icon: PersonIcon,

      children: [
        {
          id: "register7",
          title: "Create Job",
          type: "item",
          url: "/dashboard/createjob",
        },
      ],
    },
  ],
};
