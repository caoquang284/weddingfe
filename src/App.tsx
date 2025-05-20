import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "./components/AppLayout";
import Home from "./pages/Home";
import Halls from "./pages/Halls";
import Menus from "./pages/Menus";
import Booking from "./pages/Booking";
import Invoices from "./pages/Invoices";
import Admin from "./pages/Admin";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Services from "./pages/Services";
import Reports from "./pages/Reports";
import Permissions from "./pages/Permissions";
import './index.css'; 

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/halls", element: <Halls /> },
      { path: "/menus", element: <Menus /> },
      { path: "/booking", element: <Booking /> },
      { path: "/invoices", element: <Invoices /> },
      { path: "/admin", element: <Admin /> },
      { path: "/login", element: <Login /> },
      { path: "/signup", element: <SignUp /> },
      { path: "/services", element: <Services /> },
      { path: "/reports", element: <Reports />},
      { path: "/permissions", element: <Permissions />}
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;