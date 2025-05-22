import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "./components/AppLayout";
import Home from "./pages/Home";
import Halls from "./pages/Halls";
import Halls_Admin from "./pages/Halls_Admin";
import Menus from "./pages/Menus";
import Menus_Admin from "./pages/Menus_Admin";
import Booking from "./pages/Booking";
import Invoices from "./pages/Invoices";
import Admin from "./pages/Admin";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Services from "./pages/Services";
import Services_Admin from "./pages/Services_Admin";
import Reports from "./pages/Reports";
import Permissions from "./pages/Permissions";
import './index.css'; 

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/halls", element: <Halls /> },
      { path: "/halls_admin", element: <Halls_Admin/>},
      { path: "/menus", element: <Menus /> },
      { path: "/menus_admin", element: <Menus_Admin />},
      { path: "/booking", element: <Booking /> },
      { path: "/invoices", element: <Invoices /> },
      { path: "/admin", element: <Admin /> },
      { path: "/login", element: <Login /> },
      { path: "/signup", element: <SignUp /> },
      { path: "/services", element: <Services /> },
      { path: "/services_admin", element: <Services_Admin />},
      { path: "/reports", element: <Reports />},
      { path: "/permissions", element: <Permissions />}
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;