import React from 'react';
import MenuItem from 'app/shared/layout/menus/menu-item';
import { DropdownItem } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Menu } from 'antd';

// const adminMenuItems = (
//   <>
//     <MenuItem icon="users" to="/admin/user-management">
//       User management
//     </MenuItem>
//     {/* jhipster-needle-add-element-to-admin-menu - JHipster will add entities to the admin menu here */}
//   </>
// );

// const openAPIItem = (
//   <MenuItem icon="book" to="/admin/docs">
//     API
//   </MenuItem>
// );

// const databaseItem = (
//   <DropdownItem tag="a" href="./h2-console/" target="_tab">
//     <FontAwesomeIcon icon="database" fixedWidth /> Database
//   </DropdownItem>
// );

export const MenuSidebar = ({ showOpenAPI, showDatabase }) => (
  <>
    <Menu
      // defaultSelectedKeys={this.getDefaultSelectedKeys().key}
      // defaultOpenKeys={this.getDefaultSelectedKeys().open}
      // selectedKeys={this.getDefaultSelectedKeys().key}
      theme={'light'}
      mode={'inline'}
      className="layout__menu"
    ></Menu>
  </>
);

export default MenuSidebar;
