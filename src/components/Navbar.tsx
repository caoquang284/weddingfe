import { useUser } from "../contexts/userContext";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const { user, toggleRole } = useUser();
  const location = useLocation();

  const isAdmin = user?.role === "admin";

  const navItems = isAdmin
    ? [
        { path: "/admin", label: "Tổng quan" },
        { path: "/admin/halls", label: "Quản lý sảnh" },
        { path: "/admin/menus", label: "Quản lý thực đơn" },
        { path: "/admin/services", label: "Quản lý dịch vụ" },
        { path: "/admin/invoices", label: "Quản lý hóa đơn" },
        { path: "/admin/reports", label: "Báo cáo doanh thu" },
        { path: "/admin/permissions", label: "Phân quyền" },
      ]
    : [
        { path: "/", label: "Tổng quan" },
        { path: "/halls", label: "Danh sách sảnh" },
        { path: "/menus", label: "Danh sách thực đơn" },
        { path: "/services", label: "Danh sách dịch vụ" },
        { path: "/booking", label: "Đặt tiệc cưới" },
        { path: "/invoices", label: "Hóa đơn" },
      ];

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white text-black px-6 py-4 shadow-md z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Menu */}
        <div className="flex-1 flex justify-center gap-8 font-medium">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`hover:text-gray-600 transition-colors ${
                location.pathname === item.path ? "font-bold text-blue-600" : ""
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Toggle Role Button */}
        <button
          onClick={toggleRole}
          className="bg-gradient-to-r from-black to-gray-700 text-white px-5 py-2 rounded-full font-semibold shadow hover:scale-105 transition-transform"
        >
          {isAdmin ? "Chuyển sang User" : "Chuyển sang Admin"}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
