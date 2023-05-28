import { Route, Routes } from "react-router-dom";
import pagesData from "./pagesData";
const routes = (
  <>
    <Routes>
      {pagesData.map((page) => {
        const { name, path, element } = page;
        return <Route key={name} path={path} element={element} />;
      })}
    </Routes>
  </>
);

export default routes;
