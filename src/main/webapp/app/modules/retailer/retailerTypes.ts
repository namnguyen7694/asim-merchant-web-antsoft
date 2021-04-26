import { ErrorModel } from "app/shared/util/error.model";
import PaginationOutputModel from "app/shared/util/pagination.output.model";
import { BaseUserModel } from "app/shared/util/user.model";

export enum MERCHANT_TYPE {
  PERSONAL = 1,
  TELECOM_STORE = 2,
  GROCERY_STORE = 3,

  DISTRIBUTOR = 4,
  RETAILER = 5,
}

export enum GENDER {
  MALE = 1,
  FEMALE = 2,
  OTHER = 3,
}

export type UploadUrls = {
  signature: {
    path: string;
    link: string;
  };
  selfie: {
    path: string;
    link: string;
  };
  id_front: {
    path: string;
    link: string;
  };
  id_back: {
    path: string;
    link: string;
  };
  merchant_image: {
    path: string;
    link: string;
  };
};
export class KYCProfileModel {
  id: string;
  fullname: string;
  gender: GENDER;
  dob: string;
  id_number: string;

  province: string;
  district: string;
  ward: string;
  address: string;

  upload_urls: UploadUrls;

  constructor(input: any) {
    this.id = input.id ?? "";
    this.fullname = input.fullname ?? "";
    this.gender = input.gender ?? GENDER.OTHER;
    this.dob = input.dob ?? "";
    this.id_number = input.id_number ?? "";
    this.province = input.province ?? "";
    this.district = input.district ?? "";
    this.ward = input.ward ?? "";
    this.address = input.address ?? "";
    this.upload_urls = input.upload_urls ?? null;
  }
}

export class MechantProfileModel {
  id: string;
  type: MERCHANT_TYPE;

  represent_name: string;
  represent_phone_number: string;
  represent_email: string;

  merchant_image?: string;
  merchant_name: string;
  merchant_province: string;
  merchant_district: string;
  merchant_ward: string;
  merchant_address: string;

  is_send_bill: boolean;
  tax_code: string | null;
  referral_code: string | null;
  user: string;

  shipping_address: MechantShippingModel;

  constructor(input: any) {
    this.id = input.id ?? "";
    this.type = input.type ?? "";

    this.represent_name = input.represent_name ?? "";
    this.represent_phone_number = input.represent_phone_number ?? "";
    this.represent_email = input.represent_email ?? "";

    this.merchant_image = input.merchant_image ?? "";
    this.merchant_name = input.merchant_name ?? "";
    this.merchant_province = input.merchant_province ?? "";
    this.merchant_district = input.merchant_district ?? "";
    this.merchant_ward = input.merchant_ward ?? "";
    this.merchant_address = input.merchant_address ?? "";

    this.is_send_bill = input.is_send_bill ?? false;
    this.tax_code = input.tax_code ?? null;
    this.referral_code = input.referral_code ?? null;
    this.user = input.user ?? "";
    this.shipping_address = input.shipping_address ?? new MechantShippingModel({});
  }
}

export class MechantShippingModel {
  id: string;
  receiver_name: string;
  receiver_phone: string;
  deliver_province: string;
  deliver_district: string;
  deliver_ward: string;
  deliver_address: string;
  user: string;

  constructor(input: any) {
    this.id = input.id ?? "";
    this.receiver_name = input.receiver_name ?? "";
    this.receiver_phone = input.receiver_phone ?? "";
    this.deliver_province = input.deliver_province ?? "";
    this.deliver_district = input.deliver_district ?? "";
    this.deliver_ward = input.deliver_ward ?? "";
    this.deliver_address = input.deliver_address ?? "";
    this.user = input.user ?? "";
  }
}

export class RetailerOutputModel extends BaseUserModel {
  merchant_profile: MechantProfileModel;
  user_wallet: {
    balance: number;
  };

  constructor(input: any) {
    super({});
    this.merchant_profile = input.merchant_profile ?? new MechantProfileModel({});
  }
}

export type RetailerListReducerType = {
  listing: PaginationOutputModel<RetailerOutputModel[]>;
  loading: boolean;
  error: ErrorModel;
};
