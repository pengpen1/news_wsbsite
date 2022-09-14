import React from "react";
import { List } from "antd";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";

export default function PageList() {
  const [listData, setListData] = useState([]);
  const params = useParams();
  console.log(params);
  useEffect(() => {
    axios
      .get(`http://www.dell-lee.com/react/api/list.json?id=${params.id}`)
      .then((res) => {
        //   获取list数据
        setListData(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [params]);
  return (
    <div>
      <List
        style={{ background: "#fff", width: "100%" }}
        bordered
        dataSource={listData}
        renderItem={(item) => (
          <List.Item>
            <Link to={`/main/detail/${item.id}`}>{item.title}</Link>
          </List.Item>
        )}
      />
    </div>
  );
}
