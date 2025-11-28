// src/app/policies/data-confidentiality/page.tsx

import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
export default function DataConfidentialityPolicyPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      {/* Background gradient */}
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(circle_at_top,_#1e293b,_#020617)]" />

      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-10 lg:flex-row lg:py-16">
        {/* === LEFT: Intro + Meta === */}
        <section className="lg:w-1/3 lg:pr-10">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-500/40 bg-emerald-500/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.16em] text-emerald-200">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            Data Security Policy
          </div>

          <h1 className="mb-4 text-3xl font-semibold tracking-tight text-slate-50 lg:text-4xl">
            Thỏa thuận & Cam kết bảo mật dữ liệu
          </h1>

          <p className="mb-6 text-sm text-slate-300/90 lg:text-base">
            Áp dụng giữa{" "}
            <span className="font-semibold text-emerald-300">Bên A</span> (Nhà
            cung cấp nền tảng phần mềm quản lý cư dân) và{" "}
            <span className="font-semibold text-emerald-300">Bên B</span> (Đối
            tác là các chung cư/ban quản lý vận hành).
          </p>

          {/* Meta info */}
          <div className="space-y-3 rounded-2xl border border-slate-700/70 bg-slate-900/60 p-4 shadow-[0_18px_60px_rgba(15,23,42,0.75)]">
            <div className="flex items-center justify-between text-xs text-slate-300">
              <span className="text-slate-400">Phiên bản</span>
              <span className="rounded-full bg-slate-800/80 px-2 py-0.5 text-[11px] font-semibold text-slate-100">
                v1.0
              </span>
            </div>
            <div className="flex items-center justify-between text-xs text-slate-300">
              <span className="text-slate-400">Ngày cập nhật</span>
              <span>13/11/2025</span>
            </div>
            <div className="h-px w-full bg-gradient-to-r from-slate-800 via-slate-700/60 to-slate-800" />
            <p className="text-xs leading-relaxed text-slate-400">
              Bằng việc tiếp tục sử dụng nền tảng, Bên B xác nhận đã đọc, hiểu
              và đồng ý với toàn bộ nội dung chính sách bảo mật dữ liệu này.
            </p>
          </div>

          {/* Table of contents */}
          <nav className="mt-8 hidden rounded-2xl border border-slate-800/60 bg-slate-900/60 p-4 text-sm text-slate-300 shadow-[0_18px_40px_rgba(15,23,42,0.85)] lg:block">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
              Mục lục
            </p>
            <ul className="space-y-2">
              {[
                { id: "muc-dich", label: "1. Mục đích" },
                { id: "pham-vi", label: "2. Phạm vi dữ liệu" },
                { id: "ben-a", label: "3. Trách nhiệm bảo mật của Bên A" },
                { id: "ben-b", label: "4. Trách nhiệm bảo mật của Bên B" },
                { id: "quyen-truy-cap", label: "5. Quyền truy cập dữ liệu" },
                { id: "luu-tru", label: "6. Lưu trữ & Sao lưu" },
                { id: "cham-dut", label: "7. Chấm dứt & Xóa dữ liệu" },
                { id: "tai-lieu-ma-nguon", label: "8. Tài liệu & mã nguồn" },
                { id: "xu-ly-vi-pham", label: "9. Xử lý vi phạm" },
                { id: "hieu-luc", label: "10. Hiệu lực" },
                { id: "cam-ket-chung", label: "11. Cam kết chung" },
              ].map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    className="inline-flex items-center gap-2 rounded-md px-2 py-1 text-xs text-slate-300 hover:bg-slate-800/70 hover:text-emerald-200"
                  >
                    <span className="h-[2px] w-4 rounded-full bg-slate-600" />
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </section>

        {/* === RIGHT: Policy Content === */}
        <section className="lg:w-2/3">
          <div className="rounded-3xl border border-slate-700/80 bg-slate-900/80 p-6 shadow-[0_24px_70px_rgba(15,23,42,0.95)] backdrop-blur-md sm:p-8">
            {/* Mobile TOC */}
            <div className="mb-6 flex gap-3 overflow-x-auto pb-2 text-xs text-slate-300 lg:hidden">
              {[
                { id: "muc-dich", label: "Mục đích" },
                { id: "pham-vi", label: "Phạm vi dữ liệu" },
                { id: "ben-a", label: "Bên A" },
                { id: "ben-b", label: "Bên B" },
                { id: "quyen-truy-cap", label: "Truy cập" },
                { id: "cham-dut", label: "Chấm dứt" },
              ].map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className="whitespace-nowrap rounded-full border border-slate-700 bg-slate-900/70 px-3 py-1 hover:border-emerald-500/60 hover:text-emerald-200"
                >
                  {item.label}
                </a>
              ))}
            </div>

            {/* Header */}
            <header className="mb-6 border-b border-slate-800 pb-4">
              <p className="text-xs font-medium uppercase tracking-[0.16em] text-slate-400">
                Thỏa thuận bảo mật dữ liệu
              </p>
              <h2 className="mt-2 text-xl font-semibold text-slate-50">
                Áp dụng giữa:
              </h2>
              <div className="mt-2 space-y-1 text-sm text-slate-200">
                <p>
                  <span className="font-semibold text-emerald-300">Bên A:</span>{" "}
                  NeighborHub - The Hyperlocal Community Platform
                </p>
                <p>
                  <span className="font-semibold text-emerald-300">Bên B:</span>{" "}
                  [Tên chung cư/ban quản lý vận hành sử dụng nền tảng]
                </p>
              </div>
            </header>

            <div className="space-y-6 text-sm leading-relaxed text-slate-200">
              {/* 1. Mục đích */}
              <section id="muc-dich" className="scroll-mt-24">
                <h3 className="mb-2 text-base font-semibold text-emerald-300">
                  1. Mục đích
                </h3>
                <p className="text-slate-200/90">
                  Thỏa thuận này nhằm thiết lập các nguyên tắc và cam kết bảo
                  mật dữ liệu giữa hai bên trong quá trình triển khai, vận hành
                  và sử dụng nền tảng phần mềm quản lý cư dân. Mục tiêu là đảm
                  bảo mọi dữ liệu được trao đổi, lưu trữ và xử lý đều được bảo
                  vệ đúng quy định pháp luật và theo các tiêu chuẩn bảo mật phù
                  hợp.
                </p>
              </section>

              {/* 2. Phạm vi dữ liệu */}
              <section id="pham-vi" className="scroll-mt-24">
                <h3 className="mb-2 text-base font-semibold text-emerald-300">
                  2. Phạm vi dữ liệu
                </h3>
                <p className="mb-2 text-slate-200/90">
                  Dữ liệu được bảo vệ trong thỏa thuận này bao gồm nhưng không
                  giới hạn:
                </p>
                <ul className="ml-4 list-disc space-y-1 text-slate-200/90">
                  <li>
                    Thông tin cư dân: họ tên, số điện thoại, email, mã căn hộ,
                    biển số xe, thông tin liên hệ, thông tin người thân…
                  </li>
                  <li>
                    Thông tin vận hành chung cư: phản ánh, yêu cầu hỗ trợ,
                    ticket, thông báo, đăng ký dịch vụ, lịch sử thanh toán, lịch
                    sử sử dụng tiện ích.
                  </li>
                  <li>
                    Dữ liệu kỹ thuật phát sinh trong quá trình sử dụng hệ thống:
                    log hệ thống, lịch sử truy cập, sự kiện hệ thống.
                  </li>
                  <li>
                    Tài liệu nghiệp vụ, quy trình nội bộ, báo cáo thống kê, file
                    đính kèm do Bên B tải lên hoặc cung cấp.
                  </li>
                  <li>
                    Bất kỳ dữ liệu nào khác do Bên B cung cấp và được Bên A lưu
                    trữ/xử lý trên nền tảng.
                  </li>
                </ul>
              </section>

              {/* 3. Trách nhiệm bảo mật của Bên A */}
              <section id="ben-a" className="scroll-mt-24">
                <h3 className="mb-2 text-base font-semibold text-emerald-300">
                  3. Trách nhiệm bảo mật của Bên A
                </h3>
                <ul className="ml-4 list-disc space-y-1 text-slate-200/90">
                  <li>
                    Không sử dụng dữ liệu của Bên B cho bất kỳ mục đích nào
                    ngoài việc cung cấp, vận hành và cải tiến nền tảng theo thỏa
                    thuận giữa hai bên.
                  </li>
                  <li>
                    Không tiết lộ, chia sẻ, chuyển giao dữ liệu cho bên thứ ba
                    khi chưa có sự đồng ý bằng văn bản của Bên B, trừ trường hợp
                    theo yêu cầu của cơ quan nhà nước có thẩm quyền.
                  </li>
                  <li>
                    Áp dụng các biện pháp kỹ thuật bảo mật phù hợp, bao gồm
                    nhưng không giới hạn:
                    <ul className="ml-5 mt-1 list-[circle] space-y-1">
                      <li>Mã hóa dữ liệu trong quá trình truyền và lưu trữ.</li>
                      <li>
                        Kiểm soát truy cập dựa trên phân quyền (Role-based
                        Access Control – RBAC).
                      </li>
                      <li>
                        Sao lưu dữ liệu định kỳ và lưu trữ trong môi trường an
                        toàn.
                      </li>
                      <li>
                        Giám sát hệ thống, phát hiện và cảnh báo truy cập bất
                        thường.
                      </li>
                    </ul>
                  </li>
                  <li>
                    Đảm bảo đội ngũ nhân sự của Bên A tuân thủ các quy trình,
                    quy định bảo mật nội bộ liên quan đến dữ liệu của Bên B.
                  </li>
                  <li>
                    Thông báo cho Bên B trong thời hạn tối đa{" "}
                    <span className="font-semibold">24 giờ</span> kể từ khi phát
                    hiện sự cố rò rỉ, xâm nhập hoặc mất mát dữ liệu có liên quan
                    đến Bên B (nếu có).
                  </li>
                </ul>
              </section>

              {/* 4. Trách nhiệm bảo mật của Bên B */}
              <section id="ben-b" className="scroll-mt-24">
                <h3 className="mb-2 text-base font-semibold text-emerald-300">
                  4. Trách nhiệm bảo mật của Bên B
                </h3>
                <ul className="ml-4 list-disc space-y-1 text-slate-200/90">
                  <li>
                    Chỉ cung cấp cho Bên A những dữ liệu hợp pháp và chịu trách
                    nhiệm về tính chính xác, hợp lệ của dữ liệu được cung cấp.
                  </li>
                  <li>
                    Không chia sẻ tài khoản truy cập hệ thống cho người không có
                    thẩm quyền hoặc bên thứ ba không liên quan.
                  </li>
                  <li>
                    Thiết lập và quản lý phân quyền nội bộ hợp lý (Ban quản lý,
                    Lễ tân, Bảo vệ, Kế toán, Kỹ thuật...) trên nền tảng.
                  </li>
                  <li>
                    Thông báo cho Bên A ngay khi phát hiện hoặc nghi ngờ có hành
                    vi truy cập trái phép, mất tài khoản, lộ mật khẩu từ phía
                    nội bộ Bên B.
                  </li>
                  <li>
                    Chịu trách nhiệm đối với thiệt hại phát sinh từ việc lộ, mất
                    mật khẩu hoặc cho phép sai đối tượng sử dụng tài khoản được
                    cấp.
                  </li>
                </ul>
              </section>

              {/* 5. Quyền truy cập dữ liệu */}
              <section id="quyen-truy-cap" className="scroll-mt-24">
                <h3 className="mb-2 text-base font-semibold text-emerald-300">
                  5. Quyền truy cập dữ liệu
                </h3>
                <p className="mb-2 text-slate-200/90">
                  Bên A chỉ được phép truy cập dữ liệu của Bên B trong các
                  trường hợp:
                </p>
                <ul className="ml-4 list-disc space-y-1 text-slate-200/90">
                  <li>Thực hiện hỗ trợ kỹ thuật theo yêu cầu của Bên B.</li>
                  <li>Kiểm tra, khắc phục lỗi, tối ưu hiệu năng hệ thống.</li>
                  <li>
                    Thực hiện các công việc vận hành hệ thống đã được hai bên
                    thống nhất trước đó.
                  </li>
                </ul>
                <p className="mt-2 text-slate-200/90">
                  Mọi truy cập từ phía Bên A đều được ghi nhận log và bảo mật,
                  phục vụ nhu cầu truy vết khi cần thiết.
                </p>
              </section>

              {/* 6. Lưu trữ & Sao lưu */}
              <section id="luu-tru" className="scroll-mt-24">
                <h3 className="mb-2 text-base font-semibold text-emerald-300">
                  6. Lưu trữ và sao lưu dữ liệu
                </h3>
                <ul className="ml-4 list-disc space-y-1 text-slate-200/90">
                  <li>
                    Dữ liệu được lưu trữ tại hệ thống máy chủ đặt tại các trung
                    tâm dữ liệu đạt tiêu chuẩn theo quy định (ví dụ: Viettel
                    IDC, FPT, AWS hoặc tương đương).
                  </li>
                  <li>
                    Dữ liệu được sao lưu định kỳ (hàng ngày/tuần/tháng) tùy theo
                    cấu hình và thỏa thuận dịch vụ.
                  </li>
                  <li>
                    Bên A không tự ý xóa hoặc chỉnh sửa dữ liệu của Bên B nếu
                    không có yêu cầu hợp lệ từ Bên B hoặc quy định pháp luật.
                  </li>
                </ul>
              </section>

              {/* 7. Chấm dứt hợp tác & Xóa dữ liệu */}
              <section id="cham-dut" className="scroll-mt-24">
                <h3 className="mb-2 text-base font-semibold text-emerald-300">
                  7. Chấm dứt hợp tác và xóa dữ liệu
                </h3>
                <ul className="ml-4 list-disc space-y-1 text-slate-200/90">
                  <li>
                    Khi chấm dứt hợp tác, Bên B có quyền yêu cầu Bên A cung cấp
                    bản xuất dữ liệu (ví dụ: CSV, Excel, JSON) chứa toàn bộ dữ
                    liệu của Bên B trên hệ thống.
                  </li>
                  <li>
                    Trong vòng tối đa{" "}
                    <span className="font-semibold">30 ngày</span> kể từ ngày
                    chấm dứt, Bên A phải xóa dữ liệu của Bên B khỏi hệ thống sản
                    xuất, trừ phần dữ liệu cần lưu giữ theo yêu cầu của cơ quan
                    nhà nước có thẩm quyền.
                  </li>
                  <li>
                    Hai bên lập biên bản xác nhận việc bàn giao và xóa dữ liệu
                    (nếu được yêu cầu) để làm căn cứ đối chiếu sau này.
                  </li>
                </ul>
              </section>

              {/* 8. Bảo mật tài liệu & mã nguồn */}
              <section id="tai-lieu-ma-nguon" className="scroll-mt-24">
                <h3 className="mb-2 text-base font-semibold text-emerald-300">
                  8. Bảo mật tài liệu và mã nguồn
                </h3>
                <ul className="ml-4 list-disc space-y-1 text-slate-200/90">
                  <li>
                    Các tài liệu kỹ thuật, đặc tả hệ thống, API, thiết kế kiến
                    trúc và mã nguồn nền tảng do Bên A phát triển thuộc quyền sở
                    hữu trí tuệ của Bên A.
                  </li>
                  <li>
                    Bên B không được sao chép, chỉnh sửa, dịch ngược, tái sử
                    dụng hoặc cung cấp cho bên thứ ba bất kỳ phần nào của hệ
                    thống mà không có sự chấp thuận bằng văn bản của Bên A.
                  </li>
                </ul>
              </section>

              {/* 9. Xử lý vi phạm */}
              <section id="xu-ly-vi-pham" className="scroll-mt-24">
                <h3 className="mb-2 text-base font-semibold text-emerald-300">
                  9. Xử lý vi phạm
                </h3>
                <ul className="ml-4 list-disc space-y-1 text-slate-200/90">
                  <li>
                    Bên nào vi phạm các cam kết về bảo mật dữ liệu gây thiệt hại
                    cho bên còn lại phải chịu trách nhiệm bồi thường theo mức
                    thiệt hại thực tế và theo quy định của pháp luật hiện hành.
                  </li>
                  <li>
                    Các hành vi vi phạm nghiêm trọng có thể bị xem xét, xử lý
                    theo quy định pháp luật, bao gồm cả trách nhiệm dân sự và
                    hình sự (nếu có).
                  </li>
                </ul>
              </section>

              {/* 10. Hiệu lực */}
              <section id="hieu-luc" className="scroll-mt-24">
                <h3 className="mb-2 text-base font-semibold text-emerald-300">
                  10. Hiệu lực
                </h3>
                <ul className="ml-4 list-disc space-y-1 text-slate-200/90">
                  <li>
                    Thỏa thuận này có hiệu lực kể từ ngày đại diện hợp pháp của
                    hai bên ký xác nhận hoặc kể từ thời điểm hai bên chính thức
                    triển khai sử dụng nền tảng (tùy theo điều kiện nào đến
                    trước).
                  </li>
                  <li>
                    Cam kết bảo mật dữ liệu vẫn tiếp tục có hiệu lực trong{" "}
                    <span className="font-semibold">24 tháng</span> sau khi hai
                    bên chấm dứt hợp tác, trừ khi có thỏa thuận khác bằng văn
                    bản.
                  </li>
                </ul>
              </section>

              {/* 11. Cam kết chung */}
              <section id="cam-ket-chung" className="scroll-mt-24">
                <h3 className="mb-2 text-base font-semibold text-emerald-300">
                  11. Cam kết chung
                </h3>
                <p className="mb-3 text-slate-200/90">
                  Hai bên xác nhận đã đọc, hiểu đầy đủ nội dung của Thỏa thuận &
                  Cam kết bảo mật dữ liệu này và tự nguyện cam kết tuân thủ. Mọi
                  sửa đổi, bổ sung (nếu có) phải được lập thành văn bản và có
                  xác nhận của đại diện hợp pháp hai bên.
                </p>
                <p className="text-slate-200/90">
                  Thỏa thuận này là một phần không tách rời của Hợp đồng cung
                  cấp và sử dụng nền tảng phần mềm quản lý cư dân giữa Bên A và
                  Bên B.
                </p>
              </section>
            </div>

            {/* Footer note */}
            <div className="mt-8 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 px-4 py-3 text-xs text-emerald-100">
              <p className="font-medium">
                Gợi ý sử dụng trong hợp đồng chính thức:
              </p>
              <p className="mt-1 text-emerald-100/90">
                Bạn có thể trích nguyên văn nội dung page này thành phụ lục hợp
                đồng (Phụ lục: Chính sách bảo mật dữ liệu) giữa công ty bạn và
                từng chung cư/đối tác.
              </p>
            </div>
          </div>
          {/* BACK BUTTON */}
          <div className="max-w-7xl mx-auto px-6 lg:px-12 pt-8">
            <Link
              href="/"
              className="
    fixed top-6 left-6 z-50
    inline-flex items-center gap-2
    px-5 py-2 rounded-full
    text-sm font-medium text-gray-800

    border border-white/30
    bg-white/10 backdrop-blur-xl

    shadow-[0_4px_20px_rgba(0,0,0,0.08)]
    hover:shadow-[0_6px_30px_rgba(0,0,0,0.15)]
    transition-all duration-300

    hover:bg-white/20 hover:border-white/40
  "
            >
              <ArrowLeft size={18} className="text-white" />
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}