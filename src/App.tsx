import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "./components/AppLayout";

// User Pages
import Home from "./pages/User/User_Home";
import Halls from "./pages/User/User_Hall";
import Menus from "./pages/User/User_Menu";
import Services from "./pages/User/User_Service";
import Booking from "./pages/User/User_Booking";
import Invoices from "./pages/User/User_Invoice";

// Admin Pages
import AdminHome from "./pages/Admin/Admin_Home";
import AdminMenus from "./pages/Admin/Admin_Menu";
import AdminHalls from "./pages/Admin/Admin_Hall";
import AdminServices from "./pages/Admin/Admin_Service";
import AdminInvoices from "./pages/Admin/Admin_Invoice";
import AdminReports from "./pages/Admin/Admin_Report";
import AdminPermissions from "./pages/Admin/Admin_Permission";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      // User routes
      { index: true, element: <Home /> },
      { path: "halls", element: <Halls /> },
      { path: "menus", element: <Menus /> },
      { path: "services", element: <Services /> },
      { path: "booking", element: <Booking /> },
      { path: "invoices", element: <Invoices /> },

      // Admin routes
      { path: "admin", element: <AdminHome /> },
      { path: "admin/halls", element: <AdminHalls /> },
      { path: "admin/menus", element: <AdminMenus /> },
      { path: "admin/services", element: <AdminServices /> },
      { path: "admin/invoices", element: <AdminInvoices /> },
      { path: "admin/reports", element: <AdminReports /> },
      { path: "admin/permissions", element: <AdminPermissions /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;