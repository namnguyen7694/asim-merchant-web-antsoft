import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Redirect, RouteComponentProps, useHistory } from "react-router-dom";

import { IRootState } from "app/shared/reducers";
import { login } from "app/shared/reducers/authentication";
import { Button, Form, Input } from "antd";
import { logInfo } from "react-jhipster";

export interface ILoginProps extends StateProps, DispatchProps, RouteComponentProps<any> {}

export const Login = (props: ILoginProps) => {
  const { location, isAuthenticated } = props;
  const { from } = (location.state as any) || { from: { pathname: "/", search: location.search } };
  // if (isAuthenticated) {
  //   return <Redirect to={from} />;
  // }
  const handleLogin = (username, password, rememberMe = false) => props.login(username, password, rememberMe);

  const handleSubmit = (val: any) => {
    handleLogin(val.username, val.password);
  };

  return (
    <div className="auth">
      <div>
        <img src="content/images/merchant_login.png" alt="banner" />
      </div>
      <Form
        onFinish={(val) => {
          handleSubmit(val);
        }}
      >
        <h1>Xin chào mừng quý khách!</h1>
        <h2>Để đăng nhập, xin mời quý khách nhập tên truy cập và mật khẩu.</h2>

        <h3>Tên truy cập</h3>
        <Form.Item name="username" rules={[{ required: true, message: "Tên đăng nhập là trường bắt buộc" }]}>
          <Input className="input__text-lg" placeholder="Nhập tên truy cập" />
        </Form.Item>

        <h3>Mật khẩu</h3>
        <Form.Item name="password" rules={[{ required: true, message: "Mật khẩu là trường bắt buộc" }]}>
          <Input.Password className="input__text-lg" placeholder="Nhập mật khẩu" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Đăng nhập
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

const mapStateToProps = ({ authentication }: IRootState) => ({
  isAuthenticated: authentication.isAuthenticated,
  loginError: authentication.loginError,
  showModal: authentication.showModalLogin,
});

const mapDispatchToProps = {
  login,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Login);
