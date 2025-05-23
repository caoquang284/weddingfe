import { useState } from "react";
import { useUser } from "../contexts/userContext";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const { user, toggleRole } = useUser();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white text-black px-4 sm:px-6 py-4 shadow-md z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo or Brand */}
        <div className="text-xl font-bold text-gray-800">
          Quản Lý Tiệc Cưới
        </div>

        {/* Desktop Menu */}
        <div className="hidden sm:flex flex-1 justify-center gap-6 font-medium">
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

        {/* Desktop Toggle */}
        <div className="hidden sm:block">
          <button
            onClick={toggleRole}
            className="bg-gradient-to-r from-black to-gray-700 text-white px-5 py-2 rounded-full font-semibold shadow hover:scale-105 transition-transform"
          >
            {isAdmin ? "Chuyển sang User" : "Chuyển sang Admin"}
          </button>
        </div>

        {/* Mobile Button */}
        <div className="sm:hidden">
          <button
            onClick={toggleMobileMenu}
            className="p-2 text-gray-600 hover:text-gray-800 focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="sm:hidden bg-white shadow-md mt-2 rounded-lg">
          <div className="flex flex-col px-4 py-2">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`py-2 px-4 text-sm font-medium hover:bg-gray-100 rounded-md transition-colors ${
                  location.pathname === item.path ? "font-bold text-blue-600" : ""
                }`}
              >
                {item.label}
              </Link>
            ))}
            <button
              onClick={() => {
                toggleRole();
                setIsMobileMenuOpen(false);
              }}
              className="py-2 px-4 text-sm font-medium text-left text-black hover:bg-gray-100 rounded-md transition-colors"
            >
              {isAdmin ? "Chuyển sang User" : "Chuyển sang Admin"}
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;