import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import DashboardPage from "./pages/DashboardPage";
import ClientsPage from "./pages/ClientsPage";
import CarsPage from "./pages/CarsPage";
import OrdersPage from "./pages/OrdersPage";
import MechanicsPage from "./pages/MechanicsPage";
import ServicesPage from "./pages/ServicesPage";
import SparesPage from "./pages/SparesPage";

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/clients" element={<ClientsPage />} />
        <Route path="/cars" element={<CarsPage />} />
        <Route path="/orders" element={<OrdersPage />} />
        <Route path="/mechanics" element={<MechanicsPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/spares" element={<SparesPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Layout>
  );
}
