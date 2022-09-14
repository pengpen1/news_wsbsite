import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

import "./index.css";
import { Navigate } from "react-router-dom";

export default function PageVip() {
  const [isLogin, setIsLogin] = useState(true);
  const gotoHome = useSelector((state) => state.pageVip.gotoHome);
  useEffect(() => {
    axios
      .get("http://www.dell-lee.com/react/api/isLogin.json", {
        withCredentials: true,
      })
      .then((res) => {
        setIsLogin(res.data.data.login);
        console.log(res.data.data.login);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div className="pageVip">
      {isLogin ? (
        <div>
          <h2>vip 内容</h2>
          {gotoHome ? <Navigate to="/" /> : ""}
        </div>
      ) : (
        <Navigate to="/" />
      )}
    </div>
  );
}
