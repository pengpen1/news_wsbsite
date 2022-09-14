import React, { useState, Fragment, useEffect } from "react";
import {
  LoginOutlined,
  UserAddOutlined,
  LogoutOutlined,
  SketchOutlined,
} from "@ant-design/icons";
import axios from "axios";
import { Link } from "react-router-dom";
import { Button, Modal, Checkbox, Form, Input, message } from "antd";
import { useDispatch } from "react-redux";

import "./index.css";
import {
  gotoHomeIsFalse,
  gotoHomeIsTrue,
} from "../../redux/slices/pageVip_slice";

export default function Login() {
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const dispatch = useDispatch();
  // 网络请求，看用户登录没
  useEffect(() => {
    axios
      .get("http://www.dell-lee.com/react/api/isLogin.json", {
        withCredentials: true,
      })
      .then((res) => {
        setLoading(res.data.data.login);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // 控制登录、退出、注册按钮逻辑
  const enterLoading = () => {
    setIsModalVisible(true);
  };
  const quitLoading = () => {
    axios
      .get("http://www.dell-lee.com/react/api/logout.json", {
        withCredentials: true,
      })
      .then((res) => {
        const isLogout = res.data.data.logout;
        if (isLogout) {
          setLoading(false);
          dispatch(gotoHomeIsTrue());
          message.success("已退出登录！");
        } else {
          message.error("退出登录失败！");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // 控制对话框逻辑
  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  // 表单登录逻辑
  const onFinish = (values) => {
    axios
      .get(
        `http://www.dell-lee.com/react/api/login.json?user=${values.username}&password=${values.password}`,
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        const isLogin = res.data.data.login;
        if (isLogin) {
          message.success("登录成功!欢迎来到EasyEnglish!");
          setLoading(res.data.data.login);
          dispatch(gotoHomeIsFalse());
          // 成功自动关闭对话框
          setIsModalVisible(false);
        } else {
          message.error("登录失败!请检查账号和密码是否输入正确！");
        }
      })
      .catch((err) => {
        console.log(err);
      });
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  // 根据状态确定的按钮元素
  const notLogin = (
    <Fragment>
      <Button
        type="primary"
        icon={<LoginOutlined />}
        loading={loading}
        onClick={() => enterLoading()}
        size="small"
      >
        登录
      </Button>
      <Button icon={<UserAddOutlined />} size="small">
        注册
      </Button>
    </Fragment>
  );
  const isLogin = (
    <Fragment>
      <Button
        icon={<LogoutOutlined />}
        onClick={() => quitLoading()}
        size="small"
      >
        退出登录
      </Button>
      <Link to="/main/vip">
        <Button icon={<SketchOutlined />} size="small" type="primary">
          vip页面
        </Button>
      </Link>
    </Fragment>
  );
  return (
    <div className="loginWrap">
      {loading ? isLogin : notLogin}
      <Modal
        title="登录"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="确定"
        cancelText="取消"
      >
        <Form
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[
              {
                required: true,
                message: "Please input your username!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <div className="rememberWrap">
            <Form.Item
              name="remember"
              valuePropName="checked"
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <Checkbox className="remember">Remember me</Checkbox>
            </Form.Item>
            <Form.Item
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </div>
        </Form>
      </Modal>
    </div>
  );
}
