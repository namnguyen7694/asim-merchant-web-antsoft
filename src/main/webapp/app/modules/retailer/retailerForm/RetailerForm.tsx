import * as React from "react";
import { Row, Col, Form, Button, Spin, Divider } from "antd";
import { FormInstance } from "antd/lib/form";
// import apiUtil from "utils/api.util";
// import { UserService } from "services";
import moment from "moment";
// import { CustomNotiMessage } from "app/components/Message/Message";
import CustomButton from "app/shared/layout/CustomButton/CustomButton";
import CustomSelectItem from "app/shared/layout/CustomFormItem/CustomSelectItem";
import CustomTextInputItem from "app/shared/layout/CustomFormItem/CustomTextInputItem";
import { RetailerOutputModel } from "../retailerTypes";
import { connect } from "react-redux";
import { IRootState } from "app/shared/reducers";
import { useEffect, useState } from "react";
import axios from "axios";
import { log } from "react-jhipster";
import { CustomNotiMessage } from "app/shared/layout/Message/Message";
import { getLocationsApi } from "app/shared/util/apiUtil";

type Location = {
  fullName: string;
  name: string;
  payAreaCode: string;
};
interface RetailerFormProps extends StateProps, DispatchProps {
  handleCancel: () => void;
  formType: "create" | "update";
  updatingItem: RetailerOutputModel | null;
  loadListing: () => void;
}
export interface State {
  loading: boolean;
  provinceList?: Location[];
  districtList?: Location[];
  wardList?: Location[];
}

const RetailerForm = (props: RetailerFormProps) => {
  // constructor(props) {
  //   super(props);
  //   state = {
  //     loading: false,
  //   };
  // }
  const [loading, setLoading] = useState(false);
  const [provinceList, setProvinceList] = useState<Location[]>();
  const [districtList, setDistrictList] = useState<Location[]>();
  const [wardList, setWardList] = useState<Location[]>();

  let formRef: FormInstance;

  const handleSelectProvince = (code: string) => {
    formRef.setFieldsValue({ addressLine02: undefined, addressLine03: undefined });
    setWardList([]);
    getLocations("district", code);
  };

  const handleSelectDistrict = (code: string) => {
    formRef.setFieldsValue({ addressLine03: undefined });
    getLocations("ward", code);
  };

  const handelSubmit = async (formData) => {
    const submitData: any = {};
    setLoading(true);
    for (const [key, val] of Object.entries(formData)) {
      if (val) {
        submitData[key] = val;
      } else {
        submitData[key] = null;
      }
    }
    if (props.formType === "update") submitData["id"] = props.updatingItem;
    const rs = await axios.post("api/merchants", submitData);
    if (rs.statusText === "Created") {
      props.loadListing();
      CustomNotiMessage(
        "success",
        props.formType === "create" ? "Tạo đại lý thành công" : "Cập nhật đại lý thành công"
      );
    }
    setLoading(false);

    // setState({ loading: true }, () => {
    //   apiUtil.post({ url: `user/retailer/${props.formType}/`, data: submitData }).then((res) => {
    //     if (res && res.status === 200) {
    //       CustomNotiMessage(
    //         "success",
    //         props.formType === "create" ? "Tạo đại lý thành công" : "Cập nhật đại lý thành công"
    //       );
    //       setState({ loading: false });
    //       props.loadListing();
    //     } else {
    //       setState({ loading: false });
    //     }
    //   });
    // });
  };

  const getInitFormValue = (updatingItem: RetailerOutputModel) => {
    const retailerDetail = updatingItem;
    const merchant_profile = props.updatingItem?.merchant_profile;
    formRef.setFieldsValue({
      ...merchant_profile,
      username: retailerDetail.username,
      password: "********",
      created_at: convertDate(retailerDetail.created_at),
      updated_at: convertDate(retailerDetail.created_at), // missing updated_at
      is_active: retailerDetail.is_active ? 1 : 0,
      balance: Number(retailerDetail.user_wallet.balance).toLocaleString(),
    });
  };

  const getLocations = async (type: "province" | "district" | "ward", code) => {
    const rs = await getLocationsApi(code);
    if (rs.statusText === "OK") {
      log("rs", rs);
      if (type === "province") {
        setProvinceList(rs.data);
      } else if (type === "district") {
        setDistrictList(rs.data);
      } else if (type === "ward") {
        setWardList(rs.data);
      }
    }
  };
  useEffect(() => {
    if (props.formType === "update" && props.updatingItem) {
      getInitFormValue(props.updatingItem);
    }
    getLocations("province", null); // get Province
    return () => {};
  }, []);

  const merchant_profile = props.updatingItem?.merchant_profile;
  return (
    <div className="retailer__form">
      <Spin spinning={loading} style={{ width: "100%", height: "80rem", margin: "10rem auto" }}>
        <Form
          initialValues={{
            created_at: moment().format("DD/MM/YYYY"),
            updated_at: moment().format("DD/MM/YYYY"),
            is_active: 1,
          }}
          onFinish={(val) => handelSubmit(val)}
          ref={(ref) => (formRef = ref)}
        >
          <div className="retailer__form__content">
            <div className="retailer__form__content-header">
              {props.formType === "create" ? "Tạo đại lý mới" : merchant_profile?.merchant_name}
            </div>

            <Row gutter={40}>
              <Col lg={8}>
                <CustomTextInputItem
                  title="Tên đại lý"
                  rules={[{ required: true, message: "Tên đại lý là trường bắt buộc" }]}
                  name="merchantName"
                  placeholder="Nhập tên đại lý"
                  disabled={props.formType === "update"}
                />
              </Col>
              {/* <Col lg={8}>
                <CustomTextInputItem
                  title="Tên đăng nhập"
                  rules={[{ required: true, message: "Tên đăng nhập là trường bắt buộc" }]}
                  name="username"
                  placeholder="Nhập tên đăng nhập"
                  disabled={props.formType === "update"}
                />
              </Col> */}
              {/* <Col lg={8}>
                <CustomTextInputItem
                  type="password"
                  title="Mật khẩu"
                  rules={[{ required: true, message: "Mật khẩu là trường bắt buộc" }]}
                  name="password"
                  placeholder="Mật khẩu"
                  disabled={props.formType === "update"}
                />
              </Col> */}
              <Col lg={8}>
                <CustomTextInputItem title="Ngày tạo" name="created_at" disabled />
              </Col>
              <Col lg={8}>
                <CustomTextInputItem title="Ngày cập nhập gần nhất" name="updated_at" disabled />
              </Col>
              {/* <Col lg={8}>
                <CustomSelectItem
                  title="Trạng thái"
                  name="is_active"
                  options={[
                    { label: "Đang hoạt động", value: 1 },
                    { label: "Đang ẩn", value: 0 },
                  ]}
                  disabled={props.formType === "update"}
                />
              </Col> */}

              {/* <Col lg={8}>
                <CustomTextInputItem
                  title="addressLine01"
                  name="addressLine01"
                  rules={[{ required: true, message: "Địa chỉ là trường bắt buộc" }]}
                  placeholder={"Nhập địa chỉ, tên đường"}
                  disabled={props.formType === "update"}
                />
              </Col>
              <Col lg={8}>
                <CustomTextInputItem
                  title="addressLine02"
                  name="addressLine02"
                  rules={[{ required: true, message: "Đường là trường bắt buộc" }]}
                  placeholder={"Nhập địa chỉ, tên đường"}
                  disabled={props.formType === "update"}
                />
              </Col>
              <Col lg={8}>
                <CustomTextInputItem
                  title="addressLine03"
                  name="addressLine03"
                  rules={[{ required: true, message: "Đường là trường bắt buộc" }]}
                  placeholder={"Nhập địa chỉ, tên đường"}
                  disabled={props.formType === "update"}
                />
              </Col> */}
              <Col lg={8}>
                <CustomTextInputItem
                  title="branchCode"
                  name="branchCode"
                  // rules={[{ required: true, message: "Đường là trường bắt buộc" }]}
                  placeholder={"Nhập branchCode"}
                  disabled={props.formType === "update"}
                />
              </Col>
              <Col lg={8}>
                <CustomTextInputItem
                  title="cityCode"
                  name="cityCode"
                  // rules={[{ required: true, message: "cityCode là trường bắt buộc" }]}
                  placeholder={"Nhập cityCode"}
                  disabled={props.formType === "update"}
                />
              </Col>
              <Col lg={8}>
                <CustomTextInputItem
                  title="countryCode"
                  name="countryCode"
                  // rules={[{ required: true, message: "countryCode là trường bắt buộc" }]}
                  placeholder={"Nhập countryCode"}
                  disabled={props.formType === "update"}
                />
              </Col>
              <Col lg={8}>
                <CustomTextInputItem
                  title="merchantGUID"
                  name="merchantGUID"
                  rules={[{ required: true, message: "merchantGUID là trường bắt buộc" }]}
                  placeholder={"Nhập merchantGUID"}
                  disabled={props.formType === "update"}
                />
              </Col>
              <Col lg={8}>
                <CustomSelectItem
                  title="Thành phố/ Tỉnh"
                  name="addressLine01"
                  // options={[]}
                  options={
                    provinceList?.length
                      ? provinceList.map((p) => {
                          return {
                            label: p.fullName,
                            value: p.payAreaCode,
                          };
                        })
                      : []
                  }
                  placeholder={"Chọn Thành phố/ Tỉnh"}
                  rules={[{ required: true, message: "Thành phố/ Tỉnh là trường bắt buộc" }]}
                  onChange={(val) => handleSelectProvince(val)}
                  disabled={props.formType === "update"}
                />
              </Col>
              <Col lg={8}>
                <CustomSelectItem
                  title="Quận/ Huyện"
                  name="addressLine02"
                  options={
                    districtList?.length
                      ? districtList?.map((p) => {
                          return {
                            label: p.fullName,
                            value: p.payAreaCode,
                          };
                        })
                      : []
                  }
                  placeholder={"Chọn Quận/ Huyện"}
                  rules={[{ required: true, message: "Quận/ Huyện là trường bắt buộc" }]}
                  onChange={(val) => handleSelectDistrict(val)}
                  disabled={props.formType === "update"}
                />
              </Col>
              <Col lg={8}>
                <CustomSelectItem
                  title="Phường/ Xã"
                  name="addressLine03"
                  // options={[]}
                  options={
                    wardList?.length
                      ? wardList?.map((p) => {
                          return {
                            label: p.fullName,
                            value: p.payAreaCode,
                          };
                        })
                      : []
                  }
                  placeholder={"Chọn Phường/ Xã"}
                  rules={[{ required: true, message: "Phường/ Xã là trường bắt buộc" }]}
                  disabled={props.formType === "update"}
                />
              </Col>
              <Col lg={24}>
                <h2>Thông tin liên hệ</h2>
              </Col>
              {/* <Col lg={8}>
                <CustomTextInputItem
                  title="Người đại diện"
                  rules={[{ required: true, message: "Tên người đại diện là trường bắt buộc" }]}
                  name="represent_name"
                  placeholder="Nhập tên người đại diện"
                  disabled={props.formType === "update"}
                />
              </Col> */}
              <Col lg={8}>
                <CustomTextInputItem
                  title="Số điện thoại"
                  rules={[{ required: true, message: "Số điện thoại người đại diện là trường bắt buộc" }]}
                  name="phoneNumber"
                  placeholder="Nhập Số điện thoại người đại diện"
                  disabled={props.formType === "update"}
                />
                <CustomTextInputItem
                  title="Email"
                  rules={[{ required: true, message: "Email là trường bắt buộc" }]}
                  name="email"
                  placeholder="Nhập Email người đại diện"
                  disabled={props.formType === "update"}
                />
              </Col>
              <Col lg={8}>
                <CustomTextInputItem title="Số dư" disabled name="balance" placeholder="--" />
              </Col>
            </Row>
          </div>

          <div className="retailer__form__footer">
            <div></div>
            <div style={{ display: "flex" }}>
              <CustomButton type="secondary" item="Huỷ" onClick={() => props.handleCancel()} />

              <Form.Item>
                <Button type="primary" htmlType="submit" disabled={props.formType === "update"}>
                  {props.formType === "create" ? "Tạo mới" : "Lưu thay đổi"}
                </Button>
              </Form.Item>
            </div>
          </div>
        </Form>
      </Spin>
    </div>
  );
};
const mapStateToProps = (storeState: IRootState) => ({});

const mapDispatchToProps = {};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;
export default connect(mapStateToProps, mapDispatchToProps)(RetailerForm);

function convertDate(created_at: string) {
  throw new Error("Function not implemented.");
}
