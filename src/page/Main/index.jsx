import React from "react";
import { Layout } from "antd";
import { useRoutes } from "react-router-dom";

import "./index.css";
import HeaderComponent from "../../component/Header";
import routes from "../../routes";

const { Header, Footer, Content } = Layout;
export default function Main() {
  const routesEl = useRoutes(routes);
  return (
    <div>
      <Layout className="layout_wrap">
        <Header className="layout_header">
          <HeaderComponent />
        </Header>
        <Layout>
          <Content className="layout_content">{routesEl}</Content>
        </Layout>
        <Footer className="layout_footer">
          <p> 电话:19182064170</p>
          <p> 邮箱coderpengfq@gmail</p>
          <p>所在地:成都东软学院</p>
        </Footer>
      </Layout>
    </div>
  );
}
