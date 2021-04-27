import { lazy } from "react";
import { routeModel } from "app/shared/util/pagination.constants";
// import dashboardDef from "../../content/images/sidebar/ic_dashboard_act.svg";

// import dashboardAct from "assets/images/sidebar/ic_dashboard_act.svg";

// import transactionDef from "assets/images/sidebar/ic_transaction_def.svg";
// import transactionAct from "assets/images/sidebar/ic_transaction_act.svg";

// import saleDef from "assets/images/sidebar/ic_sale_def.svg";
// import saleAct from "assets/images/sidebar/ic_sale_act.svg";

// import topupDef from "assets/images/sidebar/ic_topup_def.svg";
// import topupAct from "assets/images/sidebar/ic_topup_act.svg";

// import wl_topupDef from "assets/images/sidebar/ic_wl_topup_def.svg";
// import wl_topupAct from "assets/images/sidebar/ic_wl_topup_act.svg";

// import retailerDef from "assets/images/sidebar/ic_retailer_def.svg";
// import retailerAct from "assets/images/sidebar/ic_retailer_act.svg";

// import orderDef from "assets/images/sidebar/ic_order_def.svg";
// import orderAct from "assets/images/sidebar/ic_order_act.svg";
import { MERCHANT_TYPE } from "app/shared/util/pagination.constants";

const Dashboard = lazy(() => import("app/modules/dashboard/Dashboard"));
const Retailer = lazy(() => import("app/modules/Retailer/RetailerList/RetailerList"));
const img = {
  dashboardDef: "../../content/images/sidebar/ic_dashboard_def.svg",
  dashboardAct: "../../content/images/sidebar/ic_dashboard_act.svg",
  retailerDef: "../../content/images/sidebar/ic_dashboard_def.svg",
  retailerAct: "../../content/images/sidebar/ic_retailer_act.svg",
};
export const ROUTES: { [key: string]: routeModel } = {
  DASHBOARD: {
    key: "1",
    path: {
      BASE: "/dashboard",
    },
    component: Dashboard,
    level: MERCHANT_TYPE.RETAILER,
    title: "Tổng quan",
    images: { def: img.dashboardDef, act: img.dashboardAct },
    nextDivider: true,
  },
  RETAILER: {
    key: "6",
    path: {
      BASE: "/retailer",
      DISCOUNT: "/retailer/discount",
      TRANSFER: "/retailer/transfer",
    },
    component: Retailer,
    level: MERCHANT_TYPE.DISTRIBUTOR,
    title: "Quản lý đại lý",
    images: { def: img.retailerDef, act: img.retailerAct },
  },
};

export const AUTH_ROUTES = {
  AUTH: "/users/auth",
};
