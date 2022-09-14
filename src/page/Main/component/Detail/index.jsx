import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card } from "antd";
import { useParams } from "react-router-dom";

import "./index.css";

export default function Detail() {
  const params = useParams();
  const [detail, setDetail] = useState({
    title: "default title",
    content: "default content ",
  });
  useEffect(() => {
    axios
      .get(`http://www.dell-lee.com/react/api/detail.json?id=${params.id}`)
      .then((res) => {
        //   获取数据
        setDetail(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [params]);
  return (
    <div>
      <Card title={detail.title}>
        <div
          dangerouslySetInnerHTML={{ __html: detail.content }}
          className="innerHtmlWrap"
        ></div>
      </Card>
      {/* 接口返回的数据是带有p标签的，而react做了转义，防止xss攻击 */}
    </div>
  );
}
