import { useState } from "react";

// Định nghĩa interface
interface Dish {
  id: number | null;
  name: string;
  category: string;
  price: number;
  image: string;
}

interface QuoteFormData {
  name: string;
  email: string;
  phone: string;
  requirements: string;
}

function Home() {
  // State cho danh sách món ăn
  const [dishes, setDishes] = useState<Dish[]>([
    {
      id: 1,
      name: "Soup bò củ quả xào",
      category: "Khai vị",
      price: 150000,
      image: "https://img-global.cpcdn.com/recipes/c3eb610fb2d0025f/680x482cq70/sup-bo-h%E1%BA%A7m-rau-c%E1%BB%A7-recipe-main-photo.jpg",
    },
    {
      id: 2,
      name: "Gỏi cuốn tôm thịt",
      category: "Khai vị",
      price: 120000,
      image: "https://khaihoanphuquoc.com.vn/wp-content/uploads/2023/11/nu%CC%9Bo%CC%9B%CC%81c-ma%CC%86%CC%81m-cha%CC%82%CC%81m-go%CC%89i-cuo%CC%82%CC%81n.png",
    },
    {
      id: 3,
      name: "Cà ri gà + Bánh mì",
      category: "Chính",
      price: 200000,
      image: "https://cdn.tgdd.vn/2021/03/CookProduct/22cachnaucari-1200x676.jpg",
    },
  ]);

  // State cho modal món ăn và form
  const [isDishModalOpen, setIsDishModalOpen] = useState<boolean>(false);
  const [dishFormData, setDishFormData] = useState<Dish>({
    id: null,
    name: "",
    category: "",
    price: 0,
    image: "",
  });
  const [isEditMode, setIsEditMode] = useState<boolean>(false);

  // State cho modal nhận báo giá
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState<boolean>(false);
  const [quoteFormData, setQuoteFormData] = useState<QuoteFormData>({
    name: "",
    email: "",
    phone: "",
    requirements: "",
  });

  // State cho tìm kiếm
  const [searchTerm, setSearchTerm] = useState<string>("");

  // Mở modal để thêm/sửa món ăn
  const openAddDishModal = () => {
    setDishFormData({ id: null, name: "", category: "", price: 0, image: "" });
    setIsEditMode(false);
    setIsDishModalOpen(true);
  };

  const openEditDishModal = (dish: Dish) => {
    setDishFormData({ ...dish });
    setIsEditMode(true);
    setIsDishModalOpen(true);
  };

  // Mở modal nhận báo giá
  const openQuoteModal = () => setIsQuoteModalOpen(true);

  // Đóng modal
  const closeDishModal = () => setIsDishModalOpen(false);
  const closeQuoteModal = () => setIsQuoteModalOpen(false);

  // Xử lý thay đổi input trong form món ăn
  const handleDishInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setDishFormData((prev) => ({
      ...prev,
      [name]: name === "price" ? Number(value) : value,
    }));
  };

  // Xử lý thay đổi input trong form báo giá
  const handleQuoteInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setQuoteFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Thêm hoặc sửa món ăn
  const handleDishSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (dishFormData.price <= 0) {
      alert("Giá phải là số dương");
      return;
    }
    if (isEditMode) {
      setDishes((prev) =>
        prev.map((dish) =>
          dish.id === dishFormData.id ? { ...dishFormData } : dish
        )
      );
    } else {
      const newDish: Dish = {
        id:
          dishes.length > 0 ? Math.max(...dishes.map((d) => d.id || 0)) + 1 : 1,
        name: dishFormData.name,
        category: dishFormData.category,
        price: dishFormData.price,
        image: dishFormData.image,
      };
      setDishes((prev) => [...prev, newDish]);
    }
    closeDishModal();
  };

  // Gửi yêu cầu báo giá
  const handleQuoteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Giả lập gửi yêu cầu báo giá (thay thế bằng API call nếu cần)
    console.log("Yêu cầu báo giá:", quoteFormData);
    alert("Yêu cầu báo giá đã được gửi thành công!");
    setQuoteFormData({ name: "", email: "", phone: "", requirements: "" });
    closeQuoteModal();
  };

  // Xóa món ăn
  const handleDeleteDish = (id: number | null) => {
    setDishes((prev) => prev.filter((dish) => dish.id !== id));
  };

  // Lọc món ăn
  const filteredDishes = dishes.filter((dish) =>
    dish.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      {/* Banner */}
      <div
        className="relative bg-cover bg-center h-96"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80')",
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center">
          <h1 className="text-5xl font-bold text-white mb-4">
            Thực Đơn Tiệc Sang Trọng
          </h1>
          <p className="text-xl text-white mb-6">
            Lựa chọn hoàn hảo cho mọi dịp đặc biệt
          </p>
          <button
            onClick={openQuoteModal}
            className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-white py-3 px-6 rounded-full text-lg font-semibold hover:from-yellow-500 hover:to-yellow-700 transition duration-300"
          >
            Nhận Báo Giá Ngay
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Tìm kiếm và nút thêm */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800">
            Danh Sách Thực Đơn
          </h2>
          <div className="flex items-center gap-4">
            <input
              type="text"
              placeholder="Tìm kiếm món ăn..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-64 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
            <button
              onClick={openAddDishModal}
              className="bg-gradient-to-r from-green-400 to-green-600 text-white py-2 px-4 rounded-md hover:from-green-500 hover:to-green-700 transition duration-300"
            >
              Thêm Món Ăn
            </button>
          </div>
        </div>

        {/* Danh sách món ăn */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDishes.map((dish) => (
            <div
              key={dish.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-xl"
            >
              <img
                src={dish.image}
                alt={dish.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold text-gray-800">
                  {dish.name}
                </h3>
                <p className="text-gray-600">{dish.category}</p>
                <p className="text-lg font-bold text-yellow-600">
                  {dish.price.toLocaleString("vi-VN")} VNĐ
                </p>
                <div className="flex justify-end gap-2 mt-4">
                  <button
                    onClick={() => openEditDishModal(dish)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    Sửa
                  </button>
                  <button
                    onClick={() => handleDeleteDish(dish.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    Xóa
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal thêm/sửa món ăn */}
      {isDishModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              {isEditMode ? "Sửa món ăn" : "Thêm món ăn"}
            </h3>
            <form onSubmit={handleDishSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Tên món ăn
                </label>
                <input
                  type="text"
                  name="name"
                  value={dishFormData.name}
                  onChange={handleDishInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring focus:ring-green-500 focus:ring-opacity-50"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Loại món ăn
                </label>
                <select
                  name="category"
                  value={dishFormData.category}
                  onChange={handleDishInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring focus:ring-green-500 focus:ring-opacity-50"
                  required
                >
                  <option value="">Chọn loại</option>
                  <option value="Khai vị">Khai vị</option>
                  <option value="Chính">Chính</option>
                  <option value="Tráng miệng">Tráng miệng</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Giá (VNĐ)
                </label>
                <input
                  type="number"
                  name="price"
                  value={dishFormData.price}
                  onChange={handleDishInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring focus:ring-green-500 focus:ring-opacity-50"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  URL hình ảnh
                </label>
                <input
                  type="text"
                  name="image"
                  value={dishFormData.image}
                  onChange={handleDishInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring focus:ring-green-500 focus:ring-opacity-50"
                  placeholder="Nhập URL hình ảnh"
                  required
                />
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={closeDishModal}
                  className="bg-gray-300 text-gray-700 py-2 px-4 rounded hover:bg-gray-400"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
                >
                  {isEditMode ? "Cập nhật" : "Thêm"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal nhận báo giá */}
      {isQuoteModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Yêu Cầu Báo Giá
            </h3>
            <form onSubmit={handleQuoteSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Họ và tên
                </label>
                <input
                  type="text"
                  name="name"
                  value={quoteFormData.name}
                  onChange={handleQuoteInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring focus:ring-yellow-500 focus:ring-opacity-50"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={quoteFormData.email}
                  onChange={handleQuoteInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring focus:ring-yellow-500 focus:ring-opacity-50"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Số điện thoại
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={quoteFormData.phone}
                  onChange={handleQuoteInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring focus:ring-yellow-500 focus:ring-opacity-50"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Yêu cầu của bạn
                </label>
                <textarea
                  name="requirements"
                  value={quoteFormData.requirements}
                  onChange={handleQuoteInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring focus:ring-yellow-500 focus:ring-opacity-50"
                  rows={3}
                  placeholder="Ví dụ: Tôi cần thực đơn cho tiệc cưới 100 khách..."
                />
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={closeQuoteModal}
                  className="bg-gray-300 text-gray-700 py-2 px-4 rounded hover:bg-gray-400"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-white py-2 px-4 rounded hover:from-yellow-500 hover:to-yellow-700"
                >
                  Gửi Yêu Cầu
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;