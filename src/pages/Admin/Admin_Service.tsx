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

interface FormData {
  id: number | null;
  name: string;
  description: string;
  price: string;
  categoryId: number | null;
}

function Services() {
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

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [categoryFilter, setCategoryFilter] = useState<string>("");

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

  const closeModal = () => setIsModalOpen(false);
  const closeCategoryModal = () => setIsCategoryModalOpen(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value === "" ? null : Number(value),
    }));
  };

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

  const handleDelete = (id: number | null) => {
    setServices((prev) => prev.filter((service) => service.id !== id));
  };

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

  const filteredServices = services.filter(
    (service) =>
      (service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        service.description.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (categoryFilter === "" || service.categoryId === Number(categoryFilter))
  );

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="mb-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">
            Quản lý dịch vụ
          </h2>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <input
                type="text"
                placeholder="Tìm kiếm dịch vụ..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full sm:w-64 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="w-full sm:w-48 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Tất cả loại dịch vụ</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id || ""}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <button
                onClick={openAddModal}
                className="w-full sm:w-auto bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
              >
                Thêm dịch vụ
              </button>
              <button
                onClick={openAddCategoryModal}
                className="w-full sm:w-auto bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
              >
                Thêm loại dịch vụ
              </button>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <div className="hidden sm:block bg-white shadow-md rounded-lg overflow-hidden">
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
                      <td className="px-6 py-4 text-sm text-gray-500 line-clamp-2">
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

          <div className="block sm:hidden space-y-4">
            {filteredServices.map((service) => {
              const category = categories.find(
                (cat) => cat.id === service.categoryId
              );
              return (
                <div
                  key={service.id}
                  className="bg-white shadow-md rounded-lg p-4"
                >
                  <div className="flex flex-col gap-2">
                    <h3 className="text-lg font-medium text-gray-900">
                      {service.name}
                    </h3>
                    <p className="text-sm text-gray-500 line-clamp-2">
                      {service.description}
                    </p>
                    <p className="text-sm text-gray-500">
                      Giá: {service.price.toLocaleString("vi-VN")} VNĐ
                    </p>
                    <p className="text-sm text-gray-500">
                      Loại: {category ? category.name : "Chưa phân loại"}
                    </p>
                    <div className="flex gap-2 mt-2">
                      <button
                        onClick={() => openEditModal(service)}
                        className="text-blue-600 hover:text-blue-800 text-sm"
                      >
                        Sửa
                      </button>
                      <button
                        onClick={() => handleDelete(service.id)}
                        className="text-red-600 hover:text-red-800 text-sm"
                      >
                        Xóa
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

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
                  className="py-2 px-3 mt-1 w-full rounded border border-gray-300 px-2 py-1"
                  required
                />
              </div>
              <div className="mb-3">
                <label className="block text-sm font-medium">Mô tả</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="py-2 px-3 mt-1 w-full rounded border border-gray-300 px-2 py-1"
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
                  className="py-2 px-3 mt-1 w-full rounded border border-gray-300 px-2 py-1"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium">
                  Loại dịch vụ
                </label>
                <select
                  name="categoryId"
                  value={formData.categoryId || ""}
                  onChange={handleSelectChange}
                  className="py-2 px-3 mt-1 w-full rounded border border-gray-300 px-2 py-1"
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
                  className="py-2 px-3 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
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
    </div>
  );
}

export default Services;
