import { Navigate } from "react-router-dom";

import PageList from "../page/Main/component/PageList";
import Detail from "../page/Main/component/Detail";
import PageVip from "../page/Main/component/PageVip";

const routes = [
  {
    path: "/main",
    children: [
      {
        path: ":id",
        element: <PageList />,
      },
      {
        path: "detail/:id",
        element: <Detail />,
      },
      {
        path: "vip",
        element: <PageVip />,
      },
    ],
  },
  {
    path: "/",
    element: <Navigate to="/main/1" />,
  },
];
export default routes;
