export const ITEMS_PER_PAGE = 20;

export enum MERCHANT_TYPE {
    PERSONAL = 1,
    TELECOM_STORE = 2,
    GROCERY_STORE = 3,
  
    DISTRIBUTOR = 4,
    RETAILER = 5,
  }

  export type subMenuModel = {
    key: string;
    path: {
      [key: string]: string;
    };
    title: string;
    groups: string[];
  };

  export type routeModel = {
    key: string;
    path: {
      [key: string]: string;
    };
    title: string;
    component: any;
    images: { def: any; act: any };
    level: number;
    subMenu?: {
      [key: string]: subMenuModel;
    };
    nextDivider?: boolean;
  };