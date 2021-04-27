import "react-toastify/dist/ReactToastify.css";
import "./app.scss";
import "app/config/dayjs.ts";

import React, { useDebugValue, useEffect, useState } from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import { hot } from "react-hot-loader";

import { IRootState } from "app/shared/reducers";
import { getSession } from "app/shared/reducers/authentication";
import { getProfile } from "app/shared/reducers/application-profile";
// import Footer from 'app/shared/layout/footer/footer';
import { hasAnyAuthority } from "app/shared/auth/private-route";
import { AUTHORITIES } from "app/config/constants";

import ErrorBoundaryRoute from "./shared/error/error-boundary-route";
import Login from "app/modules/login/Login";
import MenuSidebar from "./shared/layout/MenuSidebar/MenuSidebar";
import { Avatar, Badge, Card, Dropdown, Layout, Menu } from "antd";
import ErrorBoundary from "./shared/error/error-boundary";
import Routes from "./Routes";
import { Header } from "antd/lib/layout/layout";
import { logDebug } from "react-jhipster";
import { MessageOutlined } from "@ant-design/icons";
import { ROUTES } from "./routes/appRoutes";

const baseHref = document.querySelector("base").getAttribute("href").replace(/\/$/, "");

export interface IAppProps extends StateProps, DispatchProps {
  actions;
  auth;
}
const { Content, Sider } = Layout;
export const App = (props: IAppProps) => {
  const [collapsed, setCollapsed] = useState(true);

  const userPopoverAction = () => (
    <Menu>
      <Menu.Item key={undefined} onClick={() => props.actions.logoutAction()}>
        <div className="filter-item">Đăng xuất</div>
      </Menu.Item>
    </Menu>
  );

  useEffect(() => {
    // props.getSession();
    // props.getProfile();
  }, []);

  const paddingTop = "60px";
  return (
    <Router basename={baseHref}>
      <Switch>
        <ErrorBoundaryRoute path="/login" component={Login} />
        <Route exact path="*">
          <Layout className="layout" id="layout">
            <Sider
              width={"32rem"}
              collapsible
              collapsed={false}
              collapsedWidth={"6.4rem"}
              className="layout__sider"
              trigger={null}
            >
              <div className="layout__sider--user">
                <div className="d_flex sp_bw">
                  <Card.Meta avatar={<Avatar>NN</Avatar>} title={""} description={"Nhà bán lẻ"} />
                  <Dropdown getPopupContainer={(node) => node} overlay={userPopoverAction} trigger={["click"]}>
                    <div className="layout__sider--user--trigger" onClick={(e) => e.preventDefault()}>
                      <span style={{ fontSize: "8px", marginLeft: "1rem" }}>▼</span>{" "}
                    </div>
                  </Dropdown>
                </div>
                <div className="layout__sider--user--balance">
                  <p>Số dư tài khoản</p>
                  <h2>{"10.000"} đ</h2>
                </div>
              </div>
              <MenuSidebar></MenuSidebar>
            </Sider>
            <Layout>
              <Header>
                <div className="layout__header">
                  <span className="layout__header-label">Tiêu đề</span>
                  {/* <Badge count={12}>
                    <Link to={ROUTES.CHAT.path.BASE}>
                      <MessageOutlined />
                    </Link>
                  </Badge> */}
                </div>
              </Header>
              <Content>
                <div className="app-container" style={{ paddingTop }}>
                  <div className="layout__sider--contact" id="app-view-container">
                    <Card className="jh-card" bordered={false}>
                      <Routes />
                    </Card>
                  </div>
                </div>
              </Content>
            </Layout>
          </Layout>
        </Route>
      </Switch>
    </Router>
  );
};

const mapStateToProps = ({ authentication, applicationProfile }: IRootState) => ({
  isAuthenticated: authentication.isAuthenticated,
  isAdmin: hasAnyAuthority(authentication.account.authorities, [AUTHORITIES.ADMIN]),
  ribbonEnv: applicationProfile.ribbonEnv,
  isInProduction: applicationProfile.inProduction,
  isOpenAPIEnabled: applicationProfile.isOpenAPIEnabled,
});

const mapDispatchToProps = { getSession, getProfile };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(hot(module)(App));
