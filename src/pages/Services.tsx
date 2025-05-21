import { useState } from "react";

interface Service {
  id: number;
  name: string;
  description: string;
  price: number;
  categoryId: number | null;
}
interface Category {
  id: number | null;
  name: string;
}
// Định nghĩa interface cho FormData
interface FormData {
  id: number | null;
  name: string;
  description: string;
  price: string; // price là string để khớp với input
  categoryId: number | null;
}
function Services() {
  // State cho danh sách dịch vụ và loại dịch vụ
  const [services, setServices] = useState<Service[]>([
    {
      id: 1,
      name: "Trang trí hoa",
      description: "Trang trí bàn tiệc với hoa tươi",
      price: 5000000,
      categoryId: 1,
    },
    {
      id: 2,
      name: "Âm thanh ánh sáng",
      description: "Hệ thống âm thanh và ánh sáng chuyên nghiệp",
      price: 10000000,
      categoryId: 2,
    },
    {
      id: 3,
      name: "Chụp ảnh cưới",
      description: "Gói chụp ảnh cưới chuyên nghiệp",
      price: 8000000,
      categoryId: 3,
    },
  ]);

  const [categories, setCategories] = useState<Category[]>([
    { id: 1, name: "Trang trí" },
    { id: 2, name: "Âm thanh" },
    { id: 3, name: "Chụp ảnh" },
  ]);

  // State cho modal và form
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isCategoryModalOpen, setIsCategoryModalOpen] =
    useState<boolean>(false);
  const [formData, setFormData] = useState<FormData>({
    id: null,
    name: "",
    description: "",
    price: "",
    categoryId: null,
  });
  const [categoryFormData, setCategoryFormData] = useState<Category>({
    id: null,
    name: "",
  });
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [isCategoryEditMode, setIsCategoryEditMode] = useState<boolean>(false);

  // State cho tìm kiếm
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [categoryFilter, setCategoryFilter] = useState<string>("");

  // Mở modal để thêm/sửa dịch vụ
  const openAddModal = () => {
    setFormData({
      id: null,
      name: "",
      description: "",
      price: "",
      categoryId: null,
    });
    setIsEditMode(false);
    setIsModalOpen(true);
  };

  const openEditModal = (service: Service) => {
    setFormData({
      id: service.id,
      name: service.name,
      description: service.description,
      price: service.price.toString(),
      categoryId: service.categoryId,
    });
    setIsEditMode(true);
    setIsModalOpen(true);
  };

  // Mở modal để thêm/sửa loại dịch vụ
  const openAddCategoryModal = () => {
    setCategoryFormData({ id: null, name: "" });
    setIsCategoryEditMode(false);
    setIsCategoryModalOpen(true);
  };

  const openEditCategoryModal = (category: Category) => {
    setCategoryFormData({ id: category.id, name: category.name });
    setIsCategoryEditMode(true);
    setIsCategoryModalOpen(true);
  };

  // Đóng modal
  const closeModal = () => setIsModalOpen(false);
  const closeCategoryModal = () => setIsCategoryModalOpen(false);

  // Xử lý thay đổi input và textarea
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Xử lý thay đổi select
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value === "" ? null : Number(value),
    }));
  };

  // Thêm hoặc sửa dịch vụ
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const priceNumber = Number(formData.price);
    if (isNaN(priceNumber) || priceNumber <= 0) {
      alert("Giá phải là số dương");
      return;
    }
    if (isEditMode) {
      setServices((prev) =>
        prev.map((service) =>
          service.id === formData.id
            ? {
                ...service,
                name: formData.name,
                description: formData.description,
                price: priceNumber,
                categoryId: formData.categoryId,
              }
            : service
        )
      );
    } else {
      const newService: Service = {
        id:
          services.length > 0
            ? Math.max(...services.map((s) => s.id || 0)) + 1
            : 1,
        name: formData.name,
        description: formData.description,
        price: priceNumber,
        categoryId: formData.categoryId,
      };
      setServices((prev) => [...prev, newService]);
    }
    closeModal();
  };

  // Thêm hoặc sửa loại dịch vụ
  const handleCategorySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (categoryFormData.name.length < 2) {
      alert("Tên loại dịch vụ phải dài ít nhất 2 ký tự");
      return;
    }
    if (isCategoryEditMode) {
      setCategories((prev) =>
        prev.map((category) =>
          category.id === categoryFormData.id
            ? { ...category, name: categoryFormData.name }
            : category
        )
      );
    } else {
      const newCategory: Category = {
        id:
          categories.length > 0
            ? Math.max(...categories.map((c) => c.id || 0)) + 1
            : 1,
        name: categoryFormData.name,
      };
      setCategories((prev) => [...prev, newCategory]);
    }
    closeCategoryModal();
  };

  // Xóa dịch vụ
  const handleDelete = (id: number | null) => {
    setServices((prev) => prev.filter((service) => service.id !== id));
  };

  // Xóa loại dịch vụ
  const handleDeleteCategory = (id: number | null) => {
    const isCategoryInUse = services.some(
      (service) => service.categoryId === id
    );
    if (isCategoryInUse) {
      alert("Không thể xóa loại dịch vụ đang được sử dụng!");
      return;
    }
    setCategories((prev) => prev.filter((category) => category.id !== id));
  };

  const handleCategoryInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setCategoryFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Lọc dịch vụ theo từ khóa và loại
  const filteredServices = services.filter(
    (service) =>
      (service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        service.description.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (categoryFilter === "" || service.categoryId === Number(categoryFilter))
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800">Quản lý dịch vụ</h2>
        <div className="flex items-center gap-4">
          <input
            type="text"
            placeholder="Tìm kiếm dịch vụ..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-64 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Tất cả loại dịch vụ</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id || ""}>
                {category.name}
              </option>
            ))}
          </select>
          <button
            onClick={openAddModal}
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            Thêm dịch vụ
          </button>
          <button
            onClick={openAddCategoryModal}
            className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
          >
            Thêm loại dịch vụ
          </button>
        </div>
      </div>

      {/* Danh sách dịch vụ */}
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Tên dịch vụ
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Mô tả
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Giá (VNĐ)
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Loại dịch vụ
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Hành động
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredServices.map((service) => {
              const category = categories.find(
                (cat) => cat.id === service.categoryId
              );
              return (
                <tr key={service.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {service.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {service.description}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {service.price.toLocaleString("vi-VN")}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {category ? category.name : "Chưa phân loại"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => openEditModal(service)}
                      className="text-blue-600 hover:text-blue-800 mr-4"
                    >
                      Sửa
                    </button>
                    <button
                      onClick={() => handleDelete(service.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      Xóa
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Modal thêm/sửa dịch vụ */}
      {isModalOpen && (
        <div className="fixed top-1/2 left-1/2 z-50 transform -translate-x-1/2 -translate-y-1/2 bg-white shadow-xl rounded-lg w-full max-w-md p-6 border border-gray-300">
          <h3 className="text-lg font-semibold mb-4">
            {isEditMode ? "Sửa dịch vụ" : "Thêm dịch vụ"}
          </h3>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="block text-sm font-medium">Tên dịch vụ</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="mt-1 w-full rounded border border-gray-300 px-2 py-1"
                required
              />
            </div>
            <div className="mb-3">
              <label className="block text-sm font-medium">Mô tả</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                className="mt-1 w-full rounded border border-gray-300 px-2 py-1"
                rows={3}
              />
            </div>
            <div className="mb-3">
              <label className="block text-sm font-medium">Giá (VNĐ)</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                className="mt-1 w-full rounded border border-gray-300 px-2 py-1"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium">Loại dịch vụ</label>
              <select
                name="categoryId"
                value={formData.categoryId || ""}
                onChange={handleSelectChange}
                className="mt-1 w-full rounded border border-gray-300 px-2 py-1"
              >
                <option value="">Chưa phân loại</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id || ""}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex justify-end space-x-2">
              <button
                type="button"
                onClick={closeModal}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Hủy
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                {isEditMode ? "Cập nhật" : "Thêm"}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Modal thêm/sửa loại dịch vụ */}
      {isCategoryModalOpen && (
        <div className="fixed top-1/2 left-1/2 z-50 transform -translate-x-1/2 -translate-y-1/2 bg-white border border-gray-300 rounded-lg p-6 w-full max-w-sm shadow-lg">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            {isCategoryEditMode ? "Sửa loại dịch vụ" : "Thêm loại dịch vụ"}
          </h3>
          <form onSubmit={handleCategorySubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Tên loại dịch vụ
              </label>
              <input
                type="text"
                name="name"
                value={categoryFormData.name}
                onChange={handleCategoryInputChange}
                className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                required
              />
            </div>
            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={closeCategoryModal}
                className="bg-gray-300 text-gray-700 py-2 px-4 rounded hover:bg-gray-400"
              >
                Hủy
              </button>
              <button
                type="submit"
                className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
              >
                {isCategoryEditMode ? "Cập nhật" : "Thêm"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default Services;
