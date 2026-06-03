import {
  Routes,
  Route,
} from "react-router-dom";

import ProductPage from "../../features/product/pages/ProductPage";

export default function AppRouter() {
  return (
    <Routes>
      <Route
        path="/"
        element={<ProductPage />}
      />
    </Routes>
  );
}