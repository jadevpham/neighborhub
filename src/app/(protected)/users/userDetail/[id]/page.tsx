"use client";
import { useParams } from "next/navigation";
// import { useUserQuery } from "@/hooks/useUserQuery";
import { useUserQuery } from "@/hooks/useUsers";
import { formatDate } from "@/utils/formatDate";
import { ActivityItem } from "../components/ActivityItem";
import { Card } from "../components/Card";
import { FileItem } from "../components/FileItem";
import { Info } from "../components/Info";
import UserCard from "../../components/UserCard";
import { DeleteButton } from "@/components/DeleteButton";
import { useRouter } from "next/navigation";
import { EditUserModal } from "../components/EditUserModal";
import { useState } from "react";
import PageHeader from "@/components/PageHeader";
export default function UserDetailPage() {
  const router = useRouter(); // cho chuyển trang
  const { id } = useParams<{ id: string }>();
  const { data, isLoading } = useUserQuery(id);
  const [openEdit, setOpenEdit] = useState(false);

  if (isLoading) return <p className="text-gray-500">Loading...</p>;
  if (!data) return <p className="text-red-500">User not found</p>;
  const { user, scope } = data.data;

  // cho đóng mở popup Edit

  return (
    <>
      <div className="flex items-center justify-between mb-8">
        <PageHeader
          title="Users Management - User Detail"
          subtitle="View full details and permissions of this user. Update user information and roles."
          showBack={true}
        />
        {/* <Tooltip content="Delete this user"> */}
        <DeleteButton
          ids={id}
          resourceName="users"
          onDeleted={() => router.push("/users")}
        />
        {/* </Tooltip> */}
      </div>
      <div className="max-w-7xl mx-auto flex flex-col gap-6">
        {/* GRID: avatar left, info middle, files right */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          {/* Left: Avatar + basic info */}
          <UserCard user={data.data} onEdit={() => setOpenEdit(true)} />
          {openEdit && (
            <EditUserModal
              id={id}
              userInfo={{
                email: user.email,
                status: user.status,
              }}
              onClose={() => setOpenEdit(false)}
              onSaved={() => router.refresh()}
            />
          )}

          {/* Middle: General Info + Organization */}
          <div className="shadow-2xl rounded-2xl border bg-white/50 backdrop-blur-md border-emerald-400/40 p-6 space-y-6 lg:col-span-2">
            {/* General Info */}
            <section>
              <h3 className="text-lg font-semibold text-emerald-800 mb-4 flex items-center justify-between">
                General Information
                <button
                  onClick={() => setOpenEdit(true)}
                  className="text-sm text-emerald-500 hover:underline"
                >
                  Edit
                </button>
              </h3>

              <div className="grid sm:grid-cols-2 gap-y-3 text-sm text-gray-700">
                <Info label="Date of birth" value={user.dob} />
                <Info label="Gender" value={user.gender} />
                {/* <Info label="Role" value={user.role} /> */}
                <Info label="Joined at" value={formatDate(user.joined_at)} />
                <Info label="Updated at" value={formatDate(user.updated_at)} />
                <Info label="Created by" value={user.created_by?.name} />
                <Info label="Updated by" value={user.updated_by?.name} />
              </div>
            </section>

            {/* Organization Info */}
            <section>
              <h3 className="text-lg font-semibold text-emerald-800 mb-4">
                Organization Information
              </h3>

              {/* Grid 2 cột toàn bộ section */}
              <div className="grid sm:grid-cols-2 gap-y-4 gap-x-8 text-sm text-gray-700">
                {/* Hàng 1: Site, Site address */}
                <Info label="Site" value={scope.site?.name} />
                <Info label="Site address" value={scope.site?.address} />

                {/* 🟩 Hàng 2: Site logo, Site description */}
                <div>
                  <p className="font-medium text-gray-500 mb-1">Site logo</p>
                  {scope.site?.logo ? (
                    <img
                      src={scope.site.logo}
                      alt="Site logo"
                      className="w-24 h-24 rounded-lg border object-cover shadow-sm hover:scale-105 transition-transform duration-200"
                    />
                  ) : (
                    <div className="w-24 h-24 border rounded-lg flex items-center justify-center text-gray-400">
                      —
                    </div>
                  )}
                </div>

                <div>
                  <p className="font-medium text-gray-500 mb-1">
                    Site description
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    {scope.site?.description || "—"}
                  </p>
                </div>
                {user.role === "management_board" && (
                  <>
                    {/* Hàng 3: Zone, Zone address */}
                    <Info label="Zone" value={scope.zone?.name} />
                    <Info label="Zone address" value={scope.zone?.address} />

                    {/* Hàng 4: Emergency contact */}
                    <Info
                      label="Emergency contact"
                      value={scope.zone?.emergency_contact}
                    />
                  </>
                )}
              </div>
            </section>
          </div>
        </div>

        {/* GRID 2: Files / Notes / Activity */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Files */}
          <Card title="Files" actionText="Download all">
            <FileItem name="Check Up Result.pdf" size="123KB" />
            <FileItem name="Medical Prescription.pdf" size="124KB" />
            <FileItem name="Lab Report.pdf" size="132KB" />
          </Card>

          {/* Notes */}
          <Card title="Notes" actionText="Download">
            <FileItem name="Note 31.06.23.pdf" size="128KB" />
            <FileItem name="Note 23.06.23.pdf" size="130KB" />
          </Card>

          {/* Recent Activity */}
          <Card title="Recent Activity" actionText="View all">
            <ActivityItem
              user={user.created_by?.name}
              action="created this profile"
              date={user.joined_at}
            />
            {user.updated_by && (
              <ActivityItem
                user={user.updated_by?.name}
                action="updated profile information"
                date={user.updated_at}
              />
            )}
            <ActivityItem
              user="System"
              action="checked user permission"
              date={new Date().toISOString()}
            />
          </Card>
        </div>
      </div>
    </>
  );
}
