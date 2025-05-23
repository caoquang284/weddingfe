import { useState } from "react";

// Định nghĩa interface
interface Dish {
  id: number | null;
  name: string;
  categoryId: number | null;
  imageUrl?: string;
}

interface Category {
  id: number | null;
  name: string;
}

interface Menu {
  id: number | null;
  name: string;
  price: number;
  dishIds: number[];
}

function Home() {
  // Dữ liệu mẫu
  const [menus] = useState<Menu[]>([
    {
      id: 1,
      name: "Menu 1",
      price: 1290000,
      dishIds: [1, 2, 3],
    },
    {
      id: 2,
      name: "Menu 2",
      price: 1330000,
      dishIds: [4, 5],
    },
    {
      id: 3,
      name: "Menu 3",
      price: 1350000,
      dishIds: [1, 2, 4],
    },
    {
      id: 4,
      name: "Menu 4",
      price: 1300000,
      dishIds: [3, 5],
    },
    {
      id: 5,
      name: "Menu 5",
      price: 1400000,
      dishIds: [1, 3, 5],
    },
  ]);

  const [dishes] = useState<Dish[]>([
    {
      id: 1,
      name: "Soup bò củ quả xào",
      categoryId: 1,
      imageUrl: "https://via.placeholder.com/150?text=Soup+Bo",
    },
    {
      id: 2,
      name: "Gỏi cuốn tôm thịt",
      categoryId: 1,
      imageUrl: "https://via.placeholder.com/150?text=Goi+Cuon",
    },
    {
      id: 3,
      name: "Cà ri gà + Bánh mì",
      categoryId: 2,
      imageUrl: "https://via.placeholder.com/150?text=Ca+Ri+Ga",
    },
    {
      id: 4,
      name: "Soup củ nâu bắp",
      categoryId: 1,
      imageUrl: "https://via.placeholder.com/150?text=Soup+Cu",
    },
    {
      id: 5,
      name: "Chả giò hongkong",
      categoryId: 3,
      imageUrl: "https://via.placeholder.com/150?text=Cha+Gio",
    },
  ]);

  const [categories] = useState<Category[]>([
    { id: 1, name: "Khai vị" },
    { id: 2, name: "Chính" },
    { id: 3, name: "Tráng miệng" },
  ]);

  // State để lưu các món ăn đã chọn
  const [selectedDishes, setSelectedDishes] = useState<number[]>([]);

  // Hàm xử lý chọn/bỏ chọn món ăn
  const handleDishSelection = (dishId: number) => {
    setSelectedDishes((prev) =>
      prev.includes(dishId)
        ? prev.filter((id) => id !== dishId)
        : [...prev, dishId]
    );
  };

  // Hàm tạo thực đơn tùy chỉnh
  const handleCreateMenu = () => {
    if (selectedDishes.length === 0) {
      alert("Vui lòng chọn ít nhất một món ăn!");
      return;
    }
    const selectedDishNames = selectedDishes
      .map((id) => dishes.find((dish) => dish.id === id)?.name)
      .filter(Boolean)
      .join(", ");
    alert(`Thực đơn tùy chỉnh của bạn: ${selectedDishNames}`);
    setSelectedDishes([]);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tiêu đề */}
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 text-center mb-8">
          Thực Đơn Hấp Dẫn
        </h1>

        {/* Danh sách thực đơn có sẵn */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {menus.map((menu) => {
            const menuDishes = menu.dishIds
              .map((dishId) => dishes.find((dish) => dish.id === dishId))
              .filter(Boolean) as Dish[];

            return (
              <div
                key={menu.id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col h-full"
              >
                <div className="h-48 bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-500">Hình ảnh thực đơn</span>
                </div>
                <div className="p-6 flex-grow">
                  <h2 className="text-xl font-semibold text-gray-800 mb-2">
                    {menu.name}
                  </h2>
                  <p className="text-lg font-medium text-green-600 mb-4">
                    {menu.price.toLocaleString("vi-VN")} VNĐ
                  </p>
                  <div className="mb-4">
                    <h3 className="text-sm font-medium text-gray-600 mb-2">
                      Món ăn trong thực đơn:
                    </h3>
                    <ul className="space-y-2">
                      {menuDishes.map((dish) => {
                        const category = categories.find(
                          (cat) => cat.id === dish?.categoryId
                        );
                        return (
                          <li
                            key={dish?.id}
                            className="text-sm text-gray-700 flex items-center gap-2"
                          >
                            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                            {dish?.name}{" "}
                            <span className="text-gray-500">
                              ({category ? category.name : "Chưa phân loại"})
                            </span>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
                <div className="p-6 pt-0">
                  <button className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors">
                    Đặt Ngay
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Section tạo thực đơn tùy chỉnh */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Tạo Thực Đơn Tùy Chỉnh
          </h2>
          <div className="space-y-6">
            {categories.map((category) => (
              <div key={category.id}>
                <h3 className="text-lg font-medium text-gray-700 mb-3">
                  {category.name}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {dishes
                    .filter((dish) => dish.categoryId === category.id)
                    .map((dish) => (
                      <div
                        key={dish.id}
                        className={`relative p-4 border rounded-lg flex items-center gap-3 cursor-pointer transition-colors ${
                          selectedDishes.includes(dish.id!)
                            ? "bg-blue-100 border-blue-500"
                            : "bg-gray-50 border-gray-300"
                        } group`}
                        onClick={() => handleDishSelection(dish.id!)}
                      >
                        <input
                          type="checkbox"
                          checked={selectedDishes.includes(dish.id!)}
                          onChange={() => handleDishSelection(dish.id!)}
                          className="h-5 w-5 text-blue-500"
                        />
                        <span className="text-gray-800">{dish.name}</span>
                        {/* Hình ảnh hiển thị khi hover */}
                        {dish.imageUrl && (
                          <div className="absolute z-10 hidden group-hover:block top-0 left-full ml-2">
                            <img
                              src={dish.imageUrl}
                              alt={dish.name}
                              className="w-32 h-32 object-cover rounded-lg shadow-lg"
                            />
                          </div>
                        )}
                      </div>
                    ))}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 flex justify-end">
            <button
              onClick={handleCreateMenu}
              className="bg-green-500 text-white py-2 px-6 rounded hover:bg-green-600 transition-colors"
            >
              Tạo Thực Đơn
            </button>
          </div>
        </div>

        {/* Hiển thị các món đã chọn */}
        {selectedDishes.length > 0 && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-medium text-gray-700 mb-3">
              Món ăn đã chọn:
            </h3>
            <ul className="space-y-2">
              {selectedDishes.map((dishId) => {
                const dish = dishes.find((d) => d.id === dishId);
                const category = categories.find(
                  (cat) => cat.id === dish?.categoryId
                );
                return (
                  <li
                    key={dishId}
                    className="text-sm text-gray-700 flex items-center gap-2"
                  >
                    <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                    {dish?.name}{" "}
                    <span className="text-gray-500">
                      ({category ? category.name : "Chưa phân loại"})
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
