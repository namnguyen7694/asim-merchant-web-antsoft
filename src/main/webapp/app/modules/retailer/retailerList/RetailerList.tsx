import { Col, Divider, Drawer, Input, Row } from "antd";
import React, { Component, useEffect, useState } from "react";
import _ from "lodash";

// import icon_filter from "content/images/icon/ic_filter.svg";
// import icon_menu from "content/images/icon/ic_menu.svg";
// import icon_retailer from "content/images/icon/ic_retailer.svg";
// import icon_discount from "content/images/icon/ic_discount.svg";

import { ROUTES } from "app/routes/appRoutes";
import ListHeading from "app/shared/layout/CustomList/ListHeading";
import ListPagination from "app/shared/layout/CustomList/ListPagination";
import CustomCheckboxGroup from "app/shared/layout/CustomList/CustomCheckboxGroup";
import RetailerCard from "./RetailerCard";
import CustomButton from "app/shared/layout/CustomButton/CustomButton";
import NullListing from "app/shared/layout/CustomList/NullListing";
import CustomRangePicker from "app/shared/layout/CustomRangePicker/CustomRangePicker";
import { commonRequestFilter } from "app/shared/util/requets.model";
import { connect } from "react-redux";
import { IRootState } from "app/shared/reducers";
import { RetailerListReducerType, RetailerOutputModel } from "../retailerTypes";
import RetailerForm from "../RetailerForm/RetailerForm";
import ToolbarSubMenu from "app/shared/layout/ToolbarSubMenu/ToolbarSubMenu";
// import RetailerForm from "./RetailerForm";

const icon_menu = "content/images/icon/ic_menu.svg";
const icon_retailer = "content/images/icon/ic_retailer.svg";
const icon_discount = "content/images/icon/ic_discount.svg";
const icon_transfer = "content/images/icon/ic_transfer.svg";

export interface RetailerListingProps extends StateProps, DispatchProps {
  history: any;
  //   retailerList: any;
  retailerList: RetailerListReducerType;
  loadRetailers: (payload: commonRequestFilter, filter?: { [key: string]: any }) => void;
}
interface ILoadList {
  page_number?: number;
  page_size?: number;
  key_word?: string;
  start_date?: string;
  end_date?: string;
}

const RetailerListing = (props: RetailerListingProps) => {
  const [visibleDrawer, setVisibleDrawer] = useState(false);
  const [drawerType, setDrawerType] = useState<"create" | "update">();
  const [updatingItem, setUpdatingItem] = useState<RetailerOutputModel>();
  const [selectingItem, setSelectingItem] = useState<string[]>();
  const [pageNumber, setPageNumber] = useState<number>();
  const [pageSize, setPageSize] = useState<number>();
  const [keyword, setKeyword] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [startDate, setStartDate] = useState<string>("");
  const [status, setStatus] = useState<string>("");
  const [menuItem, setMenuItem] = useState<0 | 1 | 2>(0);
  const handleCreateItem = () => {
    setVisibleDrawer(true);
    setDrawerType("create");
  };
  //   handleUpdateItem = (item: RetailerOutputModel) => {
  const handleUpdateItem = (item: any) => {
    setVisibleDrawer(true);
    setDrawerType("update");
  };

  const handleSearch = (key_word: string | undefined) => {
    // setState({ keyword, page_number: 1 }, () => loadListing());
    setKeyword(key_word);
    setPageNumber(1);
    loadListing();
  };
  const debounceSearch = _.debounce(handleSearch, 800);

  const onCloseDrawer = () => {
    setUpdatingItem(null);
    setVisibleDrawer(false);
  };

  const handleSelectItem = (id: string, type: "check" | "uncheck") => {
    // const selectingItem2 = [...selectingItem];
    const selectingItem2 = _.cloneDeep(selectingItem);

    if (type === "uncheck") {
      selectingItem2.splice(selectingItem.indexOf(id), 1);
    } else {
      selectingItem2.push(id);
    }

    setSelectingItem(selectingItem2);
  };

  const handleChangeDateRange = (val: any) => {
    if (val) {
      const start_date = val[0]?.format("YYYY-MM-DD");
      const end_date = val[1]?.format("YYYY-MM-DD");
      //   setState({ end_date, start_date }, () => {
      //     loadListing();
      //   });
      setEndDate(end_date);
      setStartDate(start_date);
    } else {
      //   setState({ end_date: undefined, start_date: undefined }, () => {
      //     loadListing();
      //   });
      setEndDate("");
      setStartDate("");
      loadListing();
    }
  };

  const onShowSizeChange = (current: number, page_size: number) => {
    // setState({ pageNumber: current, page_size: pageSize }, () => loadListing());
    setPageSize(page_size);
    setPageNumber(current);
    loadListing();
  };

  const loadListing = (param?: ILoadList) => {
    !!props.loadRetailers &&
      props.loadRetailers({
        page_number: param?.page_number ?? pageNumber,
        page_size: param?.page_size ?? pageSize,
        keyword: param?.key_word ?? keyword,
        start_date: param?.start_date ?? startDate,
        end_date: param?.end_date ?? endDate,
      });
  };

  const filterStatusOptions = () => {
    const options: string[] = ["Active", "Inactive"];
    return options;
  };
  useEffect(() => {
    loadListing();
    return () => {};
  }, []);

  const retailerList = [
    {
      id: 0,
      username: "Nguyễn Trần Công Duy",
      merchant_profile: {
        merchant_name: "AntSoft",
        represent_name: "AntSoft",
        represent_phone_number: "0123456789",
      },
      user_wallet: {
        balance: 1000000000,
      },
    },
  ];
  return (
    <div className="listing">
      <Row gutter={[24, 0]}>
        <Col span={5}>
          <div className="listing-toolbar">
            <h2>Quản lý đại lý</h2>
            <ToolbarSubMenu
              menuItem={[
                {
                  title: "Đại lý",
                  icon: icon_retailer,
                  pathName: ROUTES.RETAILER.path.BASE,
                },
                {
                  title: "Chiết khấu",
                  icon: icon_discount,
                  pathName: ROUTES.RETAILER.path.DISCOUNT,
                },
                {
                  title: "Chuyển tiền cho đại lý",
                  icon: icon_transfer,
                  pathName: ROUTES.RETAILER.path.TRANSFER,
                },
              ]}
              header={{ title: "Danh mục", icon: icon_menu }}
              onChange={setMenuItem}
            />

            <div className="listing-toolbar__filter">
              <img src="content/images/icon/ic_filter.svg" alt="filter" />
              <h3>Bộ lọc</h3>
              <CustomButton
                // onClick={() => setState({ pageNumber: 1 }, () => loadListing())}
                onClick={() => {
                  setPageNumber(1);
                  loadListing();
                }}
                item="Áp dụng"
                type="secondary"
                size="medium"
                style={{ width: "100%" }}
              />

              <Divider />
              <div style={{ marginTop: "4rem" }}>
                <CustomRangePicker
                  startDate={startDate}
                  endDate={endDate}
                  handleChangeDateRange={handleChangeDateRange}
                  title="Thời gian"
                />
              </div>
              <Divider />

              <div className="filter_group">
                <CustomCheckboxGroup
                  title="Trạng thái:"
                  defaultCheckedList={filterStatusOptions()}
                  plainOptions={filterStatusOptions()}
                  handleChange={(val) => {
                    // setState({ status: val ? val.map((v) => v) : undefined });
                    setStatus(val.length ? val[0] : "[]");
                  }}
                />
              </div>
            </div>
          </div>
        </Col>
        <Col span={19}>
          {menuItem === 0 && (
            <div className="listing-main">
              <ListPagination
                pageNumber={pageNumber}
                total={props.retailerList ? props.retailerList.listing.total : 0}
                pageSize={pageSize}
                onShowSizeChange={onShowSizeChange}
                handleChangePage={(page_number) => {
                  loadListing();
                  setPageNumber(page_number);
                }}
                //   handleChangePage={(pageNumber) => setState({ pageNumber }, () => loadListing())}
                length={props.retailerList ? props.retailerList.listing.data.length : 0}
              />
              <div className="listing-main__container">
                <div className="d_flex sp_bw">
                  <Input
                    placeholder="Chưa làm search"
                    allowClear
                    // defaultValue={keyword!}
                    onChange={(event) => {
                      const key = event.target.value;
                      if (key.trim() !== "") {
                        debounceSearch(key);
                      } else {
                        debounceSearch(undefined);
                      }
                    }}
                  />
                  <CustomButton
                    item={"+ Tạo mới"}
                    type="primary"
                    size="small"
                    onClick={handleCreateItem}
                    style={{ width: "16rem" }}
                  />
                </div>
                <ListHeading
                  column={[
                    { name: "STT" },
                    { name: "Tên đại lý", width: "25%" },
                    { name: "Tên đăng nhập", width: "15%" },
                    { name: "Người liên hệ", width: "15%" },
                    { name: "Số điện thoại", width: "15%" },
                    { name: "Số dư (VNĐ)" },
                    { name: "Trạng Thái", align: "center" },
                  ]}
                  useCheckAll={false}
                />

                {retailerList.length > 0 && (
                  <div className="listing-main__container--listing">
                    {retailerList?.map((ctm, index) => (
                      <RetailerCard
                        key={index}
                        data={ctm}
                        handleSelectItem={handleSelectItem}
                        defaulSelect={selectingItem ? selectingItem.includes(ctm.id.toString()) : null}
                        index={index + 1}
                        handleUpdateItem={handleUpdateItem}
                      />
                    ))}
                  </div>
                )}
                {retailerList.length === 0 && <NullListing type="Lịch sử bán hàng" />}
              </div>
            </div>
          )}
        </Col>
      </Row>

      <Drawer width={960} onClose={onCloseDrawer} visible={visibleDrawer} footer={null} destroyOnClose>
        <RetailerForm
          handleCancel={() => onCloseDrawer()}
          formType={drawerType}
          updatingItem={updatingItem}
          loadListing={loadListing}
        />
      </Drawer>
    </div>
  );
};

const mapStateToProps = (storeState: IRootState) => ({
  // balance: storeState.userManagement.user,
});

const mapDispatchToProps = {};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(RetailerListing);
