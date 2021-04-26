import React from "react";
import { Menu } from "antd";
import { ROUTES } from "app/routes/appRoutes";
import { connect, MapStateToProps } from "react-redux";
import { NavLink } from "react-router-dom";
import { MERCHANT_TYPE } from "app/shared/util/pagination.constants";
import { IRootState } from "app/shared/reducers";

const { SubMenu } = Menu;

export interface IMenuSidebarProps extends StateProps, DispatchProps {}

export const MenuSidebar = (props: IMenuSidebarProps) => {
  const authRoute = (level: number) => {
    // const auth: boolean = true;
    // if (props.auth.data.merchant_profile?.type === MERCHANT_TYPE.DISTRIBUTOR) {
    //   auth = true;
    // } else if (props.auth.data.merchant_profile?.type === level) {
    //   auth = true;
    // }
    return true;
  };

  const _activeRoute = (routeName: any, childrens?: any) => {
    // if (routeName === "/") {
    //   return props.history.location.pathname === routeName;
    // } else {
    //   return props.history.location.pathname.indexOf(routeName) > -1 ? true : false;
    // }
    return true;
  };

  return (
    <Menu
      // defaultSelectedKeys={this.getDefaultSelectedKeys().key}
      // defaultOpenKeys={this.getDefaultSelectedKeys().open}
      // selectedKeys={this.getDefaultSelectedKeys().key}
      theme={"light"}
      mode={"inline"}
      className="layout__menu"
    >
      {Object.values(ROUTES).map((route, index: number) =>
        route.subMenu
          ? authRoute(route.level) && (
              <SubMenu
                key={route.key}
                title={
                  <>
                    {route.images && <img src={route.images.def} alt="icon_menu" />}
                    <span>{route.title}</span>
                  </>
                }
              >
                {Object.values(route.subMenu).map((sub, idx) => (
                  <Menu.Item key={sub.key} title={sub.title}>
                    <NavLink exact={true} title="" to={sub.path.BASE}>
                      <span>{sub.title}</span>
                    </NavLink>
                  </Menu.Item>
                ))}
              </SubMenu>
            )
          : authRoute(route.level) && (
              <Menu.Item key={route.key} title={route.title}>
                <NavLink exact={true} title="" to={route.path.BASE}>
                  {route.images && (
                    <img src={_activeRoute(route.path.BASE) ? route.images.act : route.images.def} alt="icon_menu" />
                  )}
                  <span>{route.title}</span>
                </NavLink>
              </Menu.Item>
            )
      )}
    </Menu>
  );
};

// export default MenuSidebar;
// export default connect<MapStateToProps, MapDispatchToProps, AppLayoutModule.Props>(
//   (state: RootState) => {
//     return {
//       auth: state.auth,
//     };
//   },
//   (dispatch: Dispatch) => {
//     return {
//       actions: bindActionCreators(Object.assign(sagaActions), dispatch),
//     };
//   }
// )(MenuSidebar);
const mapStateToProps = (storeState: IRootState) => ({
  auth: storeState.userManagement.user,
});

const mapDispatchToProps = {};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(MenuSidebar);
