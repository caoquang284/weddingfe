import { useUser } from "../contexts/userContext";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { user, toggleRole } = useUser();

  const userNav = [
    { path: "/", label: "Tổng quan" },
    { path: "/halls", label: "Danh sách sảnh" },
    { path: "/menus", label: "Danh sách thực đơn" },
    { path: "/services", label: "Danh sách dịch vụ" },
    { path: "/booking", label: "Đặt tiệc cưới" },
  ];

  const adminNav = [
    { path: "/", label: "Tổng quan" },
    { path: "/halls", label: "Quản lý sảnh" },
    { path: "/menus", label: "Quản lý thực đơn" },
    { path: "/services", label: "Quản lý dịch vụ" },
    { path: "/invoices", label: "Quản lý hóa đơn" },
    { path: "/reports", label: "Báo cáo doanh thu" },
    { path: "/permissions", label: "Phân quyền" },
  ];

  const navItems = user?.role === "admin" ? adminNav : userNav;

  return (
    <nav className="bg-white text-black px-6 py-4 shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Menu */}
        <div className="flex-1 flex justify-center gap-8 font-medium">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className="hover:text-gray-600 transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Button */}
        <button
          onClick={toggleRole}
          className="bg-gradient-to-r from-white to-black text-white px-5 py-2 rounded-full font-semibold shadow hover:scale-105 transition-transform"
        >
          {user?.role === "admin" ? "Chuyển sang User" : "Chuyển sang Admin"}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
