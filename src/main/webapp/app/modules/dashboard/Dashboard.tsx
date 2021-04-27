import React, { useEffect } from "react";
import { Spin } from "antd";
import { connect } from "react-redux";
import { IRootState } from "app/shared/reducers";
import { logDebug, logInfo } from "react-jhipster";
// import { RootState } from "app/store/config/rootReducer";

export interface IDashboardProps extends StateProps, DispatchProps {}

const Dashboard = (props: IDashboardProps) => {
  // const balance = useSelector<RootState>((state) => state.auth.data.wallet.balance) as number;
  useEffect(() => {}, []);
  return (
    <div className="dashboard" id="dashboard">
      <Spin spinning={false}>
        <h1 className="module-header">Tổng quan</h1>
        <div className="dashboard-content">
          <h1>Thông tin tài khoản</h1>
          <div className="d_flex sp_bw">
            <div className="dashboard-content__overview balance">
              <p>Số dư tài khoản</p>
              <h1>{10000} đ</h1>
            </div>
            <div className="dashboard-content__overview balance-retailer">
              <p>Tổng số dư của tất cả đại lý</p>
              <h1>483.000.000 đ</h1>
            </div>
            <div className="dashboard-content__overview total-transaction">
              <p>Tổng số bán của tất cả đại lý</p>
              <h1>3.548.430.000 đ</h1>
            </div>
          </div>
          <h1>Thống kê doanh số bán hàng cả hệ thống</h1>
        </div>
      </Spin>
    </div>
  );
};

const mapStateToProps = (storeState: IRootState) => ({
  balance: storeState.userManagement.user,
});

const mapDispatchToProps = {};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
