import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";
import { Toaster } from "sonner";

/**
 * #### I. Hàm getCurrentUser()
 * -------------------------------------------------
 * ### 1. Mục đích:
 *  - Dùng để kiểm tra xem người dùng hiện tại (request này)
 *    có đang đăng nhập hay không.
 *  - Lấy token từ cookie (HttpOnly cookie do BE set khi login thành công).
 *  - Nếu cookie không tồn tại → coi như chưa login → redirect về trang /login.
 *
 * ### 2. Cách hoạt động:
 *  - Chạy ở SERVER SIDE (vì layout này là Server Component).
 *  - Không thể dùng localStorage/sessionStorage vì đó là client-side.
 *  - Dùng `cookies()` của Next.js để đọc cookie từ HTTP request thật.
 *
 * ### 3. Vì sao phải có?
 *  - Khi user mở link trực tiếp (vd: /dashboard), FE cần kiểm tra
 *    xem trình duyệt có gửi cookie đăng nhập hợp lệ không.
 *  - Nếu không có → chặn render UI admin, tránh lộ layout.
 *  - Nếu có → cho phép load Dashboard và các component bên trong.
 *  - Mặc dù có BE check lại decode token để xem role có đc phép call api không
 *    nhưng vẫn cần check lại ở FE để tránh lỗi hiện thị UI trong các TH:
 *    copy link sang tab ẩn danh, ...
 *   - Nếu FE có check cookies().get(), Next.js SSR sẽ redirect trước khi render → người dùng không bao giờ thấy UI
 *
 * ### 4. Thực tế:
 *  - Trong production, bạn có thể gọi API `/auth/me` ở đây để
 *    lấy thông tin thật từ BE (role, name, email, ...).
 *  - Ở đây chỉ mock dữ liệu user để demo.
 */

/**
 * #### II. ProtectedLayout()
 * -------------------------------------------------
 * ### 1. Mục đích:
 *  - Là layout bao ngoài cho tất cả các trang yêu cầu đăng nhập.
 *  - Dùng để kiểm tra quyền truy cập (authentication guard).
 *  - Nếu user chưa login → redirect về trang /login.
 *
 * ### 2. Cách hoạt động:
 *  - Chạy ở server trước khi render HTML (SSR guard).
 *  - Nhờ vậy, người chưa login/copy link sang tab ẩn danh, xóa cookie trên F12 Netword sẽ không bao giờ thấy UI admin.
 */

// HIỆN TẠI CHƯA CÓ ĐỦ API BE THẬT ĐỂ CHECK TOKEN COOKIE NÊN TẠM THỜI COMMENT ĐOẠN CODE NÀY LẠI
// async function getCurrentUser() {
//     const token = (await cookies()).get("access_token")?.value;
//   if (!token) return null;
//   return { name: "Admin", email: "admin@example.com" }; // mock
// }

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // HIỆN TẠI CHƯA CÓ ĐỦ API BE THẬT ĐỂ CHECK TOKEN COOKIE NÊN TẠM THỜI COMMENT ĐOẠN CODE NÀY LẠI
  //   const user = await getCurrentUser();
  // Nếu không có user (chưa login) → redirect thẳng về trang login
  //   if (!user) redirect("/login");

  // Nếu có user (đã login) → render layout admin: dashboard, sidebar, topbar, ...
  return (
    <main className="relative min-h-screen flex overflow-hidden">
      {/* Background image */}
      <img
        src="https://images.unsplash.com/photo-1507089947368-19c1da9775ae?q=80&w=2200&auto=format&fit=crop"
        alt="Background"
        className="absolute inset-0 h-full w-full object-cover -z-10"
      />
      {/* Overlay gradient (để dễ đọc chữ trên nền) */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/60 via-white/70 to-emerald-50/60 backdrop-blur-sm -z-10" />

      {/* === LAYOUT CONTENT === */}
      <div className="relative z-10 flex min-h-screen w-full">
        {/* Topbar glass */}
        <header
          className="
      fixed top-0 left-0 right-0 z-30
      bg-white/40 backdrop-blur-md
      border-b border-emerald-100/40
      shadow-xl
            "
        >
          <Topbar />
        </header>

        {/* Right side (Topbar + content) */}
        {/* <div className="flex flex-col flex-1"> */}
        <div className="relative z-10 flex min-h-screen w-full pt-[60px]">
          {/* Sidebar glass */}
          <aside
            className="
            w-60 min-h-screen sticky top-[64px]
            bg-white/30 backdrop-blur-md
            border-r border-emerald-100/40
            shadow-[inset_0_0_20px_rgba(16,185,129,0.08)]
          "
          >
            <Sidebar />
          </aside>

          {/* Main content */}
          <div className="flex-1 overflow-y-auto p-6 bg-white/30 backdrop-blur-sm">
            {children}
          </div>
        </div>
      </div>
    </main>
  );
}