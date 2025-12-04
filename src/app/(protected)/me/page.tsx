"use client";

import { useMeQuery } from "@/hooks/useAuth";
import { Mail, Phone, Calendar, MapPin, User, Building2 } from "lucide-react";
import { InfoRow } from "@/components/IntoRow";
import React, { useState } from "react";
import EditProfileModal from "./components/EditProfileModal";
import PageHeader from "@/components/PageHeader";
export default function ProfilePage() {
  const { data, isLoading } = useMeQuery();

  const user = data?.user || {};
  const scope = data?.scope || {};
  const [open, setOpen] = useState(false);

  return (
    <>
      {isLoading ? (
        <div className="text-center py-10">Loading...</div>
      ) : (
        <>
          <PageHeader
            title="Profile Management"
            subtitle="Manage your personal information and account settings."
            showBack={true}
          />
          <div className="min-h-screen p-8 flex justify-center">
            <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-6 items-start">
              {/* Left profile card */}
              <div className="bg-white rounded-2xl shadow-2xl border border-emerald-100 p-6 flex flex-col items-center">
                <img
                  src={user.avatar || "https://i.pravatar.cc/100?img=8"}
                  alt="avatar"
                  className="w-28 h-28 rounded-full object-cover border-4 border-emerald-200 shadow-md"
                />
                <h2 className="mt-4 text-xl font-semibold text-emerald-900">
                  {user.name}
                </h2>
                <p className="mt-4 text-emerald-600 text-sm capitalize">
                  {user.title || user.role?.replace("_", " ")}
                </p>
                <p className="mt-2 text-gray-500 text-xs">
                  Joined: {new Date(user.joined_at).toLocaleDateString()}
                </p>
                <div className="w-full mt-6 border-t border-emerald-100 pt-4 text-sm text-gray-700 space-y-4">
                  <InfoRow
                    icon={<Calendar size={16} />}
                    label="DOB"
                    value={user.dob}
                  />
                  <InfoRow
                    icon={<User size={16} />}
                    label="Gender"
                    value={user.gender}
                  />
                  <InfoRow
                    icon={<Phone size={16} />}
                    label="Phone"
                    value={user.phone}
                  />
                  <InfoRow
                    icon={<Mail size={16} />}
                    label="Email"
                    value={user.email}
                  />
                </div>
                <button
                  onClick={() => setOpen(true)}
                  className="mb-auto w-fit mt-4 bg-emerald-200 text-emerald-900 text-sm font-medium px-4 py-2 rounded-lg hover:bg-emerald-300 transition cursor-pointer"
                >
                  Edit Profile
                </button>
                <EditProfileModal
                  open={open}
                  onClose={() => setOpen(false)}
                  initialData={user}
                />
              </div>

              {/* Right main info */}
              <div className="flex flex-col gap-12">
                {/* Current Info */}
                <div className="bg-white rounded-2xl shadow-2xl border border-emerald-100 p-6">
                  <h3 className="text-lg font-semibold text-emerald-900 mb-3">
                    Current Assignment
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-gray-700">
                    <div className="flex items-center gap-2">
                      <Building2 size={16} className="text-emerald-700" />
                      <span className="font-medium text-emerald-800">
                        Site:
                      </span>
                      <span>{scope?.site?.name || "—"}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin size={16} className="text-emerald-700" />
                      <span className="font-medium text-emerald-800">
                        Zone:
                      </span>
                      <span>{scope?.zone?.name || "—"}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <User size={16} className="text-emerald-700" />
                      <span className="font-medium text-emerald-800">
                        Role:
                      </span>
                      <span className="capitalize">
                        {user.role?.replace("_", " ")}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar size={16} className="text-emerald-700" />
                      <span className="font-medium text-emerald-800">
                        Status:
                      </span>
                      <span
                        className={
                          user.status === 1
                            ? "text-emerald-700 font-semibold"
                            : user.status === 0
                            ? "text-yellow-700"
                            : "text-red-700"
                        }
                      >
                        {user.status === 1
                          ? "Active"
                          : user.status === 0
                          ? "Blocked"
                          : "Deleted"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Notes */}
                <div className="bg-white rounded-2xl shadow-2xl border border-emerald-100 p-6">
                  <h3 className="text-lg font-semibold text-emerald-900 mb-3">
                    Notes
                  </h3>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    {user.title
                      ? `This account is assigned as ${user.title}, managing ${
                          scope?.zone?.name || "assigned area"
                        } within ${scope?.site?.name || "the system"}.`
                      : "No additional notes for this account."}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
