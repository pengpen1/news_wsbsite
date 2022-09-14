import React, { useState, useEffect } from "react";
import { Menu } from "antd";
import axios from "axios";
import { SendOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

import logo from "./logo.png";
import "./index.css";
import Login from "../../page/Login";

export default function Header() {
  const [menuData, setmenuData] = useState([]);
  const [current, setCurrent] = useState("1");

  const onClick = (e) => {
    setCurrent(e.key);
  };
  useEffect(() => {
    axios
      .get("http://www.dell-lee.com/react/api/header.json")
      .then((res) => {
        setmenuData(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const items = menuData.map((item) => {
    return {
      label: <Link to={`/main/${item.id}`}>{item.title}</Link>,
      key: item.id,
      icon: <SendOutlined />,
    };
  });
  return (
    <div className="header_wrap">
      <Link to="/">
        <img src={logo} alt="logo" className="header_logo"></img>
      </Link>
      <Menu
        onClick={onClick}
        selectedKeys={[current]}
        mode="horizontal"
        items={items}
        className="header_Menu"
      />
      <Login />
    </div>
  );
}
