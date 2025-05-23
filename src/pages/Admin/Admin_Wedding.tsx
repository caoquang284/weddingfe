import { useState } from "react";

interface WeddingBooking {
  id: number;
  tenchure: string;
  tencodau: string;
  dienthoai: string;
  ngaydactiec: string;
  tiendatcoc: number;
  soluongban: number;
  soluongbandutru: number;
  hall?: string;
  dishes?: number[];
  services?: string[]; // Sửa từ service thành services
}

interface Hall {
  id: number;
  name: string;
  capacity: number;
  imageUrl: string;
  note: string;
}

interface Dish {
  id: number;
  name: string;
  categoryId: number;
  imageUrl?: string;
}

interface Menu {
  id: number;
  name: string;
  dishIds: number[];
  imageUrl: string;
}

interface Category {
  id: number;
  name: string;
}

interface ServiceType {
  id: number;
  name: string;
  note: string;
  imageUrl: string;
}

interface Service {
  id: number;
  name: string;
  typeId: number; // Liên kết với ServiceType
  price: number; // Giá tiền
}

interface FormData {
  id: number | null;
  tenchure: string;
  tencodau: string;
  dienthoai: string;
  ngaydactiec: string;
  tiendatcoc: string;
  soluongban: string;
  soluongbandutru: string;
}

function Admin_Wedding() {
  // Dữ liệu mẫu
  const [bookings, setBookings] = useState<WeddingBooking[]>([
    {
      id: 1,
      tenchure: "Nguyễn Văn A",
      tencodau: "Trần Thị B",
      dienthoai: "0901234567",
      ngaydactiec: "2025-06-15",
      tiendatcoc: 5000000,
      soluongban: 20,
      soluongbandutru: 2,
    },
    {
      id: 2,
      tenchure: "Lê Minh C",
      tencodau: "Phạm Thị D",
      dienthoai: "0912345678",
      ngaydactiec: "2025-07-20",
      tiendatcoc: 7000000,
      soluongban: 30,
      soluongbandutru: 3,
    },
  ]);

  const [halls] = useState<Hall[]>([
    {
      id: 1,
      name: "Sảnh Ngọc Trai",
      capacity: 50,
      imageUrl:
        "https://crystalpalacevn.com/wp-content/uploads/2020/06/classic.jpg",
      note: "Sảnh sang trọng với ánh sáng lung linh, phù hợp cho tiệc cưới cao cấp.",
    },
    {
      id: 2,
      name: "Sảnh Phượng Hoàng",
      capacity: 80,
      imageUrl:
        "https://crystalpalacevn.com/wp-content/uploads/2023/03/T4_07087-scaled.jpg",
      note: "Không gian rộng rãi, phong cách hoàng gia, lý tưởng cho tiệc đông khách.",
    },
    {
      id: 3,
      name: "Sảnh Hoa Sen",
      capacity: 30,
      imageUrl:
        "https://crystalpalacevn.com/wp-content/uploads/2020/06/royal.png",
      note: "Sảnh ấm cúng, thiết kế gần gũi thiên nhiên, phù hợp tiệc thân mật.",
    },
  ]);

  const [dishes] = useState<Dish[]>([
    { id: 1, name: "Soup bò củ quả xào", categoryId: 1 },
    { id: 2, name: "Gỏi cuốn tôm thịt", categoryId: 1 },
    { id: 3, name: "Cà ri gà + Bánh mì", categoryId: 2 },
    { id: 4, name: "Soup củ nâu bắp", categoryId: 1 },
    { id: 5, name: "Chả giò hongkong", categoryId: 3 },
  ]);

  const [menus] = useState<Menu[]>([
    {
      id: 1,
      name: "Thực Đơn Sang Trọng",
      dishIds: [1, 2, 3],
      imageUrl:
        "https://nautiecthienphuc.com/wp-content/uploads/2023/04/image-cach-lam-bo-nau-pate-nong-thom-dam-da-an-la-me-164968420927226.png",
    },
    {
      id: 2,
      name: "Thực Đơn Truyền Thống",
      dishIds: [4, 5, 3],
      imageUrl:
        "https://nautiecthienphuc.com/wp-content/uploads/2023/04/mucxao-1634791524-8363-1634791758.png",
    },
    {
      id: 3,
      name: "Thực Đơn Nhẹ Nhàng",
      dishIds: [1, 4, 5],
      imageUrl:
        "https://nautiecthienphuc.com/wp-content/uploads/2023/04/cach-nau-lau-de.jpeg",
    },
  ]);

  const [categories] = useState<Category[]>([
    { id: 1, name: "Khai vị" },
    { id: 2, name: "Chính" },
    { id: 3, name: "Tráng miệng" },
  ]);

  // Dữ liệu mẫu cho loại dịch vụ và dịch vụ
  const [serviceTypes] = useState<ServiceType[]>([
    {
      id: 1,
      name: "Chụp Ảnh",
      note: "Gói chụp ảnh chuyên nghiệp, lưu giữ khoảnh khắc đẹp.",
      imageUrl:
        "https://khoistudio.vn/wp-content/uploads/2023/09/chup-anh-cuoi-27.jpg",
    },
    {
      id: 2,
      name: "Âm Thanh Ánh Sáng",
      note: "Thiết bị âm thanh và ánh sáng sân khấu hiện đại.",
      imageUrl:
        "https://amthanhanhsangsukien.com/wp-content/uploads/2019/10/IMG_8655.jpg",
    },
    {
      id: 3,
      name: "Thiệp Cưới",
      note: "Thiết kế thiệp cưới độc đáo, sang trọng.",
      imageUrl: "https://thiepcuoikk.com/upload/news/1-7-8216.jpg",
    },
    {
      id: 4,
      name: "Váy Cưới",
      note: "Váy cưới cao cấp, đa phong cách cho cô dâu.",
      imageUrl:
        "https://maxi.vn/wp-content/uploads/2024/06/z5544165856412_593d24ced318fd7645232a00f00dc759.jpg",
    },
  ]);

  const [services] = useState<Service[]>([
    { id: 1, name: "Chụp Ảnh Cơ Bản", typeId: 1, price: 5000000 },
    { id: 2, name: "Chụp Ảnh Chuyên Nghiệp", typeId: 1, price: 10000000 },
    { id: 3, name: "Chụp Ảnh Drone", typeId: 1, price: 15000000 },
    { id: 4, name: "Âm Thanh Cơ Bản", typeId: 2, price: 3000000 },
    { id: 5, name: "Ánh Sáng Sân Khấu", typeId: 2, price: 5000000 },
    { id: 6, name: "Ban Nhạc Sống", typeId: 2, price: 8000000 },
    { id: 7, name: "Thiệp Cưới Tiêu Chuẩn", typeId: 3, price: 2000000 },
    { id: 8, name: "Thiệp Cưới Cao Cấp", typeId: 3, price: 4000000 },
    { id: 9, name: "Váy Cưới Thiết Kế", typeId: 4, price: 10000000 },
    { id: 10, name: "Váy Cưới Nhập Khẩu", typeId: 4, price: 20000000 },
  ]);

  // State quản lý wizard
  const [showWizard, setShowWizard] = useState<boolean>(false);
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [selectedHall, setSelectedHall] = useState<string | null>(null);
  const [selectedDishes, setSelectedDishes] = useState<number[]>([]);
  const [selectedMenu, setSelectedMenu] = useState<number | null>(null);
  const [selectedServices, setSelectedServices] = useState<string[]>([]); // Sửa từ selectedService
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormData>({
    id: null,
    tenchure: "",
    tencodau: "",
    dienthoai: "",
    ngaydactiec: "",
    tiendatcoc: "",
    soluongban: "",
    soluongbandutru: "",
  });
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedServiceType, setSelectedServiceType] = useState<number | null>(
    null
  ); // Loại dịch vụ đang chọn

  // Handler mở modal thêm
  const openAddModal = () => {
    setFormData({
      id: null,
      tenchure: "",
      tencodau: "",
      dienthoai: "",
      ngaydactiec: "",
      tiendatcoc: "",
      soluongban: "",
      soluongbandutru: "",
    });
    setIsEditMode(false);
    setCurrentStep(1);
    setSelectedHall(null);
    setSelectedDishes([]);
    setSelectedMenu(null);
    setSelectedServices([]); // Reset danh sách dịch vụ
    setSelectedServiceType(null); // Reset loại dịch vụ
    setShowWizard(true);
  };

  // Handler mở modal thêm
  // Handler mở modal sửa
  const openEditModal = (booking: WeddingBooking) => {
    setFormData({
      id: booking.id,
      tenchure: booking.tenchure,
      tencodau: booking.tencodau,
      dienthoai: booking.dienthoai,
      ngaydactiec: booking.ngaydactiec,
      tiendatcoc: booking.tiendatcoc.toString(),
      soluongban: booking.soluongban.toString(),
      soluongbandutru: booking.soluongbandutru.toString(),
    });
    setIsEditMode(true);
    setCurrentStep(1);
    setSelectedHall(booking.hall || null);
    setSelectedDishes(booking.dishes || []);
    setSelectedMenu(null);
    setSelectedServices(booking.services || []);
    setSelectedServiceType(null);
    setShowWizard(true);
  };

  // Handler đóng wizard
  const closeWizard = () => {
    setShowWizard(false);
    setCurrentStep(1);
    setSelectedHall(null);
    setSelectedDishes([]);
    setSelectedMenu(null);
    setSelectedServices([]); // Sửa từ setSelectedService(null)
    setSelectedServiceType(null); // Reset loại dịch vụ
  };

  // Handler thay đổi input
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handler chọn thực đơn
  const handleMenuSelect = (menu: Menu) => {
    setSelectedMenu(menu.id);
    setSelectedDishes(menu.dishIds);
  };

  // Handler submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate dữ liệu
    const tiendatcocNumber = Number(formData.tiendatcoc);
    const soluongbanNumber = Number(formData.soluongban);
    const soluongbandutruNumber = Number(formData.soluongbandutru);

    if (isNaN(tiendatcocNumber) || tiendatcocNumber < 0) {
      alert("Tiền đặt cọc phải là số không âm");
      return;
    }
    if (isNaN(soluongbanNumber) || soluongbanNumber <= 0) {
      alert("Số lượng bàn phải là số dương");
      return;
    }
    if (isNaN(soluongbandutruNumber) || soluongbandutruNumber < 0) {
      alert("Số lượng bàn dự trữ phải là số không âm");
      return;
    }
    if (!selectedHall) {
      alert("Vui lòng chọn sảnh");
      return;
    }
    if (selectedDishes.length === 0) {
      alert("Vui lòng chọn ít nhất một món ăn");
      return;
    }
    if (selectedServices.length === 0) {
      alert("Vui lòng chọn ít nhất một dịch vụ");
      return;
    }
    // Kiểm tra sức chứa sảnh
    const selectedHallData = halls.find((hall) => hall.name === selectedHall);
    if (
      selectedHallData &&
      soluongbanNumber + soluongbandutruNumber > selectedHallData.capacity
    ) {
      alert("Tổng số bàn vượt quá sức chứa của sảnh");
      return;
    }

    // Hộp thoại xác nhận
    const confirmAction = window.confirm(
      isEditMode
        ? "Bạn có chắc chắn muốn cập nhật thông tin đặt tiệc này?"
        : "Bạn có chắc chắn muốn thêm đặt tiệc này?"
    );

    if (!confirmAction) return;

    if (isEditMode) {
      setBookings((prev) =>
        prev.map((booking) =>
          booking.id === formData.id
            ? {
                ...booking,
                tenchure: formData.tenchure,
                tencodau: formData.tencodau,
                dienthoai: formData.dienthoai,
                ngaydactiec: formData.ngaydactiec,
                tiendatcoc: tiendatcocNumber,
                soluongban: soluongbanNumber,
                soluongbandutru: soluongbandutruNumber,
                hall: selectedHall,
                dishes: selectedDishes,
                services: selectedServices,
              }
            : booking
        )
      );
    } else {
      const newBooking: WeddingBooking = {
        id:
          bookings.length > 0 ? Math.max(...bookings.map((b) => b.id)) + 1 : 1,
        tenchure: formData.tenchure,
        tencodau: formData.tencodau,
        dienthoai: formData.dienthoai,
        ngaydactiec: formData.ngaydactiec,
        tiendatcoc: tiendatcocNumber,
        soluongban: soluongbanNumber,
        soluongbandutru: soluongbandutruNumber,
        hall: selectedHall,
        dishes: selectedDishes,
        services: selectedServices,
      };
      setBookings((prev) => [...prev, newBooking]);
    }
    closeWizard();
  };

  // Handler chọn dịch vụ
  const handleServiceSelect = (serviceName: string, checked: boolean) => {
    setSelectedServices((prev) =>
      checked
        ? [...prev, serviceName]
        : prev.filter((name) => name !== serviceName)
    );
  };

  // Handler xóa đặt tiệc
  const handleDelete = (id: number) => {
    const confirmDelete = window.confirm(
      "Bạn có chắc chắn muốn xóa đặt tiệc này?"
    );
    if (confirmDelete) {
      setBookings((prev) => prev.filter((booking) => booking.id !== id));
    }
  };

  // Handler tìm kiếm
  const filteredBookings = bookings.filter(
    (booking) =>
      booking.tenchure.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.tencodau.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.dienthoai.includes(searchTerm)
  );

  // Handler chuyển bước
  const nextStep = () => {
    if (currentStep === 1 && !selectedHall) {
      alert("Vui lòng chọn sảnh trước khi tiếp tục");
      return;
    }
    if (currentStep === 2 && selectedDishes.length === 0) {
      alert("Vui lòng chọn ít nhất một món ăn trước khi tiếp tục");
      return;
    }
    setCurrentStep((prev) => prev + 1);
  };

  const prevStep = () => {
    setCurrentStep((prev) => prev - 1);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Trang danh sách đặt tiệc */}
        {!showWizard ? (
          <>
            {/* Tiêu đề và tìm kiếm */}
            <div className="mb-6">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">
                Quản Lý Đặt Tiệc Cưới
              </h2>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <input
                  type="text"
                  placeholder="Tìm kiếm theo tên chú rể, cô dâu hoặc số điện thoại..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full sm:w-64 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={openAddModal}
                  className="w-full sm:w-auto bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                >
                  Thêm Đặt Tiệc
                </button>
              </div>
            </div>

            {/* Danh sách đặt tiệc */}
            <div>
              {/* Bảng trên desktop */}
              <div className="hidden sm:block bg-white shadow-md rounded-lg overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Tên Chú Rể
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Tên Cô Dâu
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Điện Thoại
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Ngày Đặt Tiệc
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Tiền Đặt Cọc (VNĐ)
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Số Lượng Bàn
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Bàn Dự Trữ
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Hành Động
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredBookings.map((booking) => (
                      <tr key={booking.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {booking.tenchure}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {booking.tencodau}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {booking.dienthoai}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(booking.ngaydactiec).toLocaleDateString(
                            "vi-VN"
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {booking.tiendatcoc.toLocaleString("vi-VN")}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {booking.soluongban}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {booking.soluongbandutru}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button
                            onClick={() => openEditModal(booking)}
                            className="text-blue-600 hover:text-blue-800 mr-4"
                          >
                            Sửa
                          </button>
                          <button
                            onClick={() => handleDelete(booking.id)}
                            className="text-red-600 hover:text-red-800"
                          >
                            Xóa
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Card trên mobile */}
              <div className="block sm:hidden space-y-4">
                {filteredBookings.map((booking) => (
                  <div
                    key={booking.id}
                    className="bg-white shadow-md rounded-lg p-4"
                  >
                    <div className="flex flex-col gap-2">
                      <div className="flex justify-between">
                        <h3 className="text-lg font-medium text-gray-900">
                          {booking.tenchure} & {booking.tencodau}
                        </h3>
                        <div className="flex gap-2">
                          <button
                            onClick={() => openEditModal(booking)}
                            className="text-blue-600 hover:text-blue-800 text-sm"
                          >
                            Sửa
                          </button>
                          <button
                            onClick={() => handleDelete(booking.id)}
                            className="text-red-600 hover:text-red-800 text-sm"
                          >
                            Xóa
                          </button>
                        </div>
                      </div>
                      <p className="text-sm text-gray-500">
                        Điện thoại: {booking.dienthoai}
                      </p>
                      <p className="text-sm text-gray-500">
                        Ngày đặt tiệc:{" "}
                        {new Date(booking.ngaydactiec).toLocaleDateString(
                          "vi-VN"
                        )}
                      </p>
                      <p className="text-sm text-gray-500">
                        Tiền đặt cọc:{" "}
                        {booking.tiendatcoc.toLocaleString("vi-VN")} VNĐ
                      </p>
                      <p className="text-sm text-gray-500">
                        Số lượng bàn: {booking.soluongban} (Dự trữ:{" "}
                        {booking.soluongbandutru})
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : (
          /* Trang wizard */
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              {isEditMode ? "Sửa Đặt Tiệc" : "Thêm Đặt Tiệc"}
            </h2>

            {/* Thông tin cơ bản */}
            <div className="mb-8">
              <h4 className="text-lg font-semibold text-gray-700 mb-4">
                Thông Tin Cơ Bản
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Tên Chú Rể
                  </label>
                  <input
                    type="text"
                    name="tenchure"
                    value={formData.tenchure}
                    onChange={handleInputChange}
                    className="py-2 px-3 mt-1 w-full rounded border border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Tên Cô Dâu
                  </label>
                  <input
                    type="text"
                    name="tencodau"
                    value={formData.tencodau}
                    onChange={handleInputChange}
                    className="py-2 px-3 mt-1 w-full rounded border border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Điện Thoại
                  </label>
                  <input
                    type="text"
                    name="dienthoai"
                    value={formData.dienthoai}
                    onChange={handleInputChange}
                    className="py-2 px-3 mt-1 w-full rounded border border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Ngày Đặt Tiệc
                  </label>
                  <input
                    type="date"
                    name="ngaydactiec"
                    value={formData.ngaydactiec}
                    onChange={handleInputChange}
                    className="py-2 px-3 mt-1 w-full rounded border border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Chọn sảnh */}
            <div className="mb-8">
              <h4 className="text-lg font-semibold text-gray-700 mb-4">
                Chọn Sảnh
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {halls.map((hall) => (
                  <div
                    key={hall.id}
                    onClick={() => setSelectedHall(hall.name)}
                    className={`rounded-lg shadow-md cursor-pointer border transition-all duration-300 ${
                      selectedHall === hall.name
                        ? "bg-blue-50 border-blue-500 shadow-lg"
                        : "bg-white border-gray-200 hover:shadow-lg hover:border-blue-300"
                    }`}
                  >
                    <div className="h-48 overflow-hidden rounded-t-lg">
                      <img
                        src={hall.imageUrl}
                        alt={hall.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <h5 className="text-lg font-medium text-gray-800 mb-2">
                        {hall.name}
                      </h5>
                      <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                        {hall.note}
                      </p>
                      <p className="text-sm text-gray-600 font-medium">
                        Sức chứa tối đa: {hall.capacity} bàn
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Chọn thực đơn và số bàn */}
            <div className="mb-8">
              <h4 className="text-lg font-semibold text-gray-700 mb-4">
                Chọn Thực Đơn & Số Bàn
              </h4>

              {/* Thực đơn có sẵn */}
              <div className="mb-6">
                <h5 className="text-sm font-medium text-gray-600 mb-3">
                  Thực Đơn Có Sẵn
                </h5>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {menus.map((menu) => {
                    const menuDishes = menu.dishIds
                      .map((dishId) =>
                        dishes.find((dish) => dish.id === dishId)
                      )
                      .filter(Boolean) as Dish[];

                    return (
                      <div
                        key={menu.id}
                        onClick={() => handleMenuSelect(menu)}
                        className={`rounded-lg shadow-md cursor-pointer border transition-all duration-300 ${
                          selectedMenu === menu.id
                            ? "bg-blue-50 border-blue-500 shadow-lg"
                            : "bg-white border-gray-200 hover:shadow-lg hover:border-blue-300"
                        }`}
                      >
                        <div className="h-48 overflow-hidden rounded-t-lg">
                          <img
                            src={menu.imageUrl}
                            alt={menu.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="p-4">
                          <h5 className="text-lg font-medium text-gray-800 mb-2">
                            {menu.name}
                          </h5>
                          <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                            Món ăn:{" "}
                            {menuDishes.map((dish) => dish.name).join(", ")}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Tùy chỉnh thực đơn */}
              <div className="mb-6">
                <h5 className="text-sm font-medium text-gray-600 mb-3">
                  Tùy Chỉnh Thực Đơn
                </h5>
                <div className="border rounded-lg p-4 bg-white shadow-sm">
                  {categories.map((category) => (
                    <div key={category.id} className="mb-4">
                      <h6 className="text-sm font-semibold text-gray-700 mb-2">
                        {category.name}
                      </h6>
                      <div className="space-y-2">
                        {dishes
                          .filter((dish) => dish.categoryId === category.id)
                          .map((dish) => (
                            <div
                              key={dish.id}
                              className="flex items-center gap-3"
                            >
                              <input
                                type="checkbox"
                                checked={selectedDishes.includes(dish.id)}
                                onChange={(e) => {
                                  setSelectedDishes((prev) =>
                                    e.target.checked
                                      ? [...prev, dish.id]
                                      : prev.filter((id) => id !== dish.id)
                                  );
                                  // Bỏ chọn thực đơn có sẵn nếu tùy chỉnh
                                  if (e.target.checked) setSelectedMenu(null);
                                }}
                                className="h-4 w-4 text-blue-500 rounded"
                              />
                              <span className="text-sm text-gray-700">
                                {dish.name}
                              </span>
                            </div>
                          ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tiền đặt cọc và số bàn */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Tiền Đặt Cọc (VNĐ)
                  </label>
                  <input
                    type="number"
                    name="tiendatcoc"
                    value={formData.tiendatcoc}
                    onChange={handleInputChange}
                    className="py-2 px-3 mt-1 w-full rounded border border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Số Lượng Bàn
                  </label>
                  <input
                    type="number"
                    name="soluongban"
                    value={formData.soluongban}
                    onChange={handleInputChange}
                    className="py-2 px-3 mt-1 w-full rounded border border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Số Lượng Bàn Dự Trữ
                  </label>
                  <input
                    type="number"
                    name="soluongbandutru"
                    value={formData.soluongbandutru}
                    onChange={handleInputChange}
                    className="py-2 px-3 mt-1 w-full rounded border border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Chọn loại dịch vụ */}
            <div className="mb-8">
              <h4 className="text-lg font-semibold text-gray-700 mb-4">
                Chọn Loại Dịch Vụ
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                {serviceTypes.map((type) => (
                  <div
                    key={type.id}
                    onClick={() => setSelectedServiceType(type.id)}
                    className={`rounded-lg shadow-md cursor-pointer border transition-all duration-300 ${
                      selectedServiceType === type.id
                        ? "bg-blue-50 border-blue-500 shadow-lg"
                        : "bg-white border-gray-200 hover:shadow-lg hover:border-blue-300"
                    }`}
                  >
                    <div className="h-48 overflow-hidden rounded-t-lg">
                      <img
                        src={type.imageUrl}
                        alt={type.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <h5 className="text-lg font-medium text-gray-800 mb-2">
                        {type.name}
                      </h5>
                      <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                        {type.note}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {selectedServiceType && (
                <div className="border rounded-lg p-4 bg-white shadow-sm">
                  <h5 className="text-sm font-semibold text-gray-700 mb-3">
                    Dịch Vụ:{" "}
                    {
                      serviceTypes.find(
                        (type) => type.id === selectedServiceType
                      )?.name
                    }
                  </h5>
                  <div className="space-y-2">
                    {services
                      .filter(
                        (service) => service.typeId === selectedServiceType
                      )
                      .map((service) => (
                        <div
                          key={service.id}
                          className="flex items-center gap-3"
                        >
                          <input
                            type="checkbox"
                            checked={selectedServices.includes(service.name)}
                            onChange={(e) =>
                              handleServiceSelect(
                                service.name,
                                e.target.checked
                              )
                            }
                            className="h-4 w-4 text-blue-500 rounded"
                          />
                          <span className="text-sm text-gray-700">
                            {service.name} (
                            {new Intl.NumberFormat("vi-VN", {
                              style: "currency",
                              currency: "VND",
                            }).format(service.price)}
                            )
                          </span>
                        </div>
                      ))}
                  </div>
                </div>
              )}
            </div>

            {/* Nút điều hướng */}
            <div className="flex justify-between space-x-3">
              <button
                type="button"
                onClick={closeWizard}
                className="bg-gray-300 text-gray-700 py-2 px-4 rounded hover:bg-gray-400"
              >
                Hủy
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                disabled={!selectedHall || selectedDishes.length === 0}
              >
                {isEditMode ? "Cập Nhật" : "Thêm"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Admin_Wedding;
