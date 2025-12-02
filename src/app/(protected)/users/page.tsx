"use client";
import React, { useEffect, useState } from "react";
import UserCard from "./components/UserCard";
import { useUsersQuery } from "@/hooks/useUsers";
import { useSitesQuery } from "@/hooks/useSites";
import { useZonesQuery } from "@/hooks/useZones";
import { useMeQuery } from "@/hooks/useAuth";
import UserSearchFilter from "./components/UserSearchFilter";
import { Pagination } from "@/components/Pagination";
// import { startUserHub, userHubConnection } from "@/lib/signalr";
import { queryClient } from "@/lib/queryClient";
import { EditUserModal } from "./userDetail/components/EditUserModal";
import { useRouter } from "next/navigation";
const UsersPage = () => {
  // 1. Lấy data users để hiện list users
  // State filter local
  const [filters, setFilters] = useState({
    page: 1,
    limit: 8,
    search: "",
    status: null as number | null,
    role: "",
    site_id: "",
    zone_id: "",
  });
  const { data: usersData, isLoading: isUserLoading } = useUsersQuery(filters);

  console.log("Raw:", usersData);
  console.log("User array:", usersData);
  console.log("User đầu tiên:", usersData?.data?.[0]?.user);
  console.log("Scope đầu tiên:", usersData?.data?.[0]?.scope);

  // 2. Lấy role để phân quyền từ auth/me
  const { data: meData, isLoading: isMeLoading } = useMeQuery();
  const role = meData?.user?.role;
  console.log("UsersPage me: ", role);

  // 2. Lấy data site để dropdown filter
  const { data: sitesData } = useSitesQuery(
    { page: 1, limit: 50 },
    { enabled: role === "system_admin" }
  );

  console.log("Raw:", sitesData);
  console.log("Site array:", sitesData);
  console.log("Site đầu tiên:", sitesData?.data?.[0]);

  // 3. Lấy data zone để dropdown filter
  const { data: zonesData } = useZonesQuery(
    { page: 1, limit: 25 },
    { enabled: role === "site_admin" }
  );

  console.log("Raw:", zonesData);
  console.log("Zone array:", zonesData);
  console.log("Zone đầu tiên:", zonesData?.data?.[0]);

  // 7. Nhận callback từ filter component
  const handleFilterChange = (newFilters: any) => {
    setFilters((prev) => ({
      ...prev,
      ...newFilters,
      page: 1, // reset page khi search/filter
    }));
  };

  const handlePageChange = (page: number) => {
    setFilters((prev) => ({ ...prev, page }));
  };
  // Tạo option dropdown
  const siteOptions =
    sitesData?.data?.map((s) => ({
      value: s.id?.toString() ?? "",
      label: s.name ?? "",
    })) ?? [];
  const zonesOptions =
    zonesData?.data?.map((z) => ({
      value: z.id?.toString() ?? "",
      label: z.name ?? "",
    })) ?? [];

  // 8. Realtime
  // useEffect(() => {
  //   startUserHub();

  //   const handler = (updatedUser: any) => {
  //     queryClient.setQueryData(["users", filters], (oldData: any) => {
  //       if (!oldData) return oldData;

  //       const newList = oldData.data.map((u: any) =>
  //         u.user.id === updatedUser.user.id ? { ...u, ...updatedUser } : u
  //       );

  //       return {
  //         ...oldData,
  //         data: newList,
  //       };
  //     });
  //   };

  //   userHubConnection.on("UserUpdated", handler);

  //   return () => {
  //     userHubConnection.off("UserUpdated", handler);
  //   };
  // }, [filters]);

  // 9. Mở popup edit user
  const router = useRouter(); // cho chuyển trang
  const [openEdit, setOpenEdit] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);
  return (
    <div className="p-1">
      <h1 className="text-2xl font-semibold text-emerald-800 mb-8">
        User Management
      </h1>
      {/* Search (name, phone, email), filter status (0 - block, 1- avatar), filter (role), filter (site_id. zone_id) */}
      {isMeLoading ? (
        <p className="text-gray-500 italic mb-4">Loading user data...</p>
      ) : (
        <>
          <UserSearchFilter
            currentRole={role}
            sites={siteOptions}
            zones={zonesOptions}
            onFilterChange={handleFilterChange}
          />
          {isUserLoading ? (
            <p className="text-gray-500 italic mb-4">Loading user data...</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 items-stretch justify-items-center">
              {usersData?.data?.length ? (
                usersData.data.map((item) => (
                  <UserCard
                    key={item.user.id}
                    user={item}
                    onEdit={() => {
                      setCurrentUser(item);
                      setOpenEdit(true);
                    }}
                  />
                ))
              ) : (
                <p className="text-gray-500 mt-4">No users</p>
              )}
            </div>
          )}
          {usersData?.meta && (
            <Pagination meta={usersData.meta} onPageChange={handlePageChange} />
          )}
        </>
      )}
      {openEdit && currentUser && (
        <EditUserModal
          id={currentUser.user.id}
          userInfo={{
            email: currentUser.user.email,
            status: currentUser.user.status,
          }}
          onClose={() => setOpenEdit(false)}
          onSaved={() => router.refresh()}
        />
      )}
    </div>
  );
};

export default UsersPage;
