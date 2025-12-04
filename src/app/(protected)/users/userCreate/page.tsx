"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { ArrowLeft, Upload, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useMeQuery } from "@/hooks/useAuth";
import { User } from "@/types/user";
import { useUserMutationCreate } from "@/hooks/useUsers";
import { toast } from "sonner";
import { buildCreateUserFormData } from "@/utils/buildCreateUserFormData";
import { AxiosError } from "axios";
import PageHeader from "@/components/PageHeader";
const defaultUser: User = {
  user: {
    email: "",
    password: "",
    name: "",
    phone: null,
    avatar: null,
    dob: null,
    gender: null,
    role: "partner",
    title: null,
    status: 1,
  },
  scope: {
    site: {
      name: "",
      address: "",
      logo: null,
      description: null,
    },
    zone: { name: "", address: "", emergency_contact: null },
  },
};

const UserCreatePage = () => {
  const [form, setForm] = useState<User>({ ...defaultUser });
  const [preview, setPreview] = useState<string | null>(null);

  // === Handle Avatar Upload ===
  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
      setForm((prev) => ({
        ...prev,
        user: { ...prev.user, avatar: reader.result as string },
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleAvatarRemove = () => {
    setPreview(null);
    setForm((prev) => ({
      ...prev,
      user: { ...prev.user, avatar: "" },
    }));
  };

  // === Handle Input Changes ===
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
    group?: "user" | "site" | "zone"
  ) => {
    const { name, value } = e.target;
    if (group === "site") {
      setForm((prev) => ({
        ...prev,
        scope: { ...prev.scope, site: { ...prev.scope.site, [name]: value } },
      }));
    } else if (group === "zone") {
      setForm((prev) => ({
        ...prev,
        scope: { ...prev.scope, zone: { ...prev.scope.zone, [name]: value } },
      }));
    } else {
      setForm((prev) => ({
        ...prev,
        user: { ...prev.user, [name]: value },
      }));
    }
  };

  const createUserMutation = useUserMutationCreate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formDataRaw = new FormData(e.currentTarget);
    const selectedRole = formDataRaw.get("role") as string;

    const finalForm = {
      ...form,
      user: {
        ...form.user,
        role: selectedRole,
      },
    };

    const formData = buildCreateUserFormData(finalForm, role);

    createUserMutation.mutate(formData, {
      onSuccess: (data) => {
        toast.success(data.message || "User created successfully");
        router.push("/users");
      },
      onError: (error: AxiosError<any>) => {
        const errors = error.response?.data?.errors;
        const message = error.response?.data?.message;

        let finalMsg = "Failed to create user";

        if (message) {
          finalMsg = message;
        } else if (errors && typeof errors === "object") {
          // Lấy message đầu tiên trong object
          const firstKey = Object.keys(errors)[0];
          const firstError = errors[firstKey];

          if (Array.isArray(firstError)) {
            finalMsg = firstError[0];
          } else {
            finalMsg = firstError;
          }
        }
        toast.error(finalMsg);
      },
    });
  };

  const router = useRouter();
  const { data } = useMeQuery();
  const role = data?.user?.role;
  console.log("role in page create: ", role);

  useEffect(() => {
    if (role === "management_board" || role === "partner") {
      router.replace("/403");
    }
  });

  return (
    <>
      <PageHeader
        title="Users Management - Create User"
        subtitle="Add a new user with appropriate access rights."
        showBack={true}
      />
      <form
        onSubmit={handleSubmit}
        className="w-full bg-white rounded-2xl shadow-2xl border border-emerald-100 p-10"
      >
        {/* === 2 CỘT CHÍNH === */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* LEFT SIDE: USER INFO */}
          <div className="lg:col-span-2 border-r border-gray-200 pr-8">
            <h2 className="text-lg font-medium text-slate-800 mb-3">
              User Information
            </h2>

            {/* Avatar */}
            <div className="flex flex-col items-center mb-6">
              <div className="relative">
                <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-md">
                  {preview ? (
                    <img
                      src={preview}
                      alt="Avatar Preview"
                      width={96}
                      height={96}
                      className="object-cover w-full h-full"
                    />
                  ) : (
                    <img
                      src={
                        form?.user.avatar ||
                        "https://cdn-icons-png.flaticon.com/512/847/847969.png"
                      }
                      alt="Default Avatar"
                      width={96}
                      height={96}
                      className="object-cover w-full h-full"
                    />
                  )}
                </div>

                {preview && (
                  <button
                    type="button"
                    onClick={handleAvatarRemove}
                    className="absolute -top-1 -right-1 bg-white/90 hover:bg-red-100 border border-gray-200 rounded-full p-1"
                  >
                    <X size={14} className="text-gray-600" />
                  </button>
                )}
              </div>

              <label
                htmlFor="avatarUpload"
                className="mt-3 flex items-center gap-2 text-sm text-emerald-700 font-medium cursor-pointer hover:text-emerald-800"
              >
                <Upload size={16} />
                {preview ? "Change Avatar" : "Upload Avatar"}
              </label>
              <input
                id="avatarUpload"
                type="file"
                accept="image/*"
                onChange={handleAvatarUpload}
                className="hidden"
              />
            </div>

            {/* User Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-600">
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={form.user.email}
                  onChange={(e) => handleChange(e, "user")}
                  required
                  className="w-full border rounded-lg px-3 py-2 mt-1 text-sm"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">
                  Password *
                </label>
                <input
                  type="password"
                  name="password"
                  value={form.user.password}
                  onChange={(e) => handleChange(e, "user")}
                  required
                  className="w-full border rounded-lg px-3 py-2 mt-1 text-sm"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-600">
                  Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={form.user.name}
                  onChange={(e) => handleChange(e, "user")}
                  required
                  className="w-full border rounded-lg px-3 py-2 mt-1 text-sm"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-600">
                  Phone
                </label>
                <input
                  type="text"
                  name="phone"
                  value={form.user.phone || ""}
                  onChange={(e) => handleChange(e, "user")}
                  className="w-full border rounded-lg px-3 py-2 mt-1 text-sm"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-600">
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={form.user.title || ""}
                  onChange={(e) => handleChange(e, "user")}
                  className="w-full border rounded-lg px-3 py-2 mt-1 text-sm"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-600">
                  Date of Birth
                </label>
                <input
                  type="date"
                  name="dob"
                  value={form.user.dob || ""}
                  onChange={(e) => handleChange(e, "user")}
                  className="w-full border rounded-lg px-3 py-2 mt-1 text-sm"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-600">
                  Gender
                </label>
                <select
                  name="gender"
                  value={form.user.gender || ""}
                  onChange={(e) => handleChange(e, "user")}
                  className="w-full border rounded-lg px-3 py-2 mt-1 text-sm"
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-600">
                  Role *
                </label>
                <select
                  name="role"
                  value={form.user.role}
                  onChange={(e) => handleChange(e, "user")}
                  required
                  className="w-full border rounded-lg px-3 py-2 mt-1 text-sm"
                >
                  {role === "system_admin" && (
                    <>
                      <option value="site_admin">Site Admin</option>
                      <option value="partner">Partner</option>
                    </>
                  )}

                  {role === "site_admin" && (
                    <>
                      <option value="management_board">Management Board</option>
                    </>
                  )}
                </select>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE: SITE + ZONE INFO */}
          <div className="lg:col-span-1">
            {role === "system_admin" && (
              <>
                <h2 className="text-lg font-medium text-slate-800 mb-3">
                  Site Information
                </h2>
                <div className="space-y-3">
                  {/* Logo Upload */}
                  <div className="flex flex-col items-center mb-4">
                    <div className="relative">
                      <div className="w-24 h-24 rounded-lg overflow-hidden border-2 border-dashed border-gray-300 bg-gray-50 flex items-center justify-center">
                        {form.scope.site?.logo ? (
                          <Image
                            src={form.scope.site?.logo}
                            alt="Site Logo"
                            width={96}
                            height={96}
                            className="object-cover w-full h-full"
                          />
                        ) : (
                          <span className="text-gray-400 text-sm">No Logo</span>
                        )}
                      </div>

                      {form.scope.site?.logo && (
                        <button
                          type="button"
                          onClick={() =>
                            setForm((prev) => ({
                              ...prev,
                              scope: {
                                ...prev.scope,
                                site: { ...prev.scope.site, logo: "" },
                              },
                            }))
                          }
                          className="absolute -top-1 -right-1 bg-white/90 hover:bg-red-100 border border-gray-200 rounded-full p-1"
                        >
                          <X size={14} className="text-gray-600" />
                        </button>
                      )}
                    </div>

                    <label
                      htmlFor="siteLogoUpload"
                      className="mt-3 flex items-center gap-2 text-sm text-emerald-700 font-medium cursor-pointer hover:text-emerald-800"
                    >
                      <Upload size={16} />
                      {form.scope.site?.logo ? "Change Logo" : "Upload Logo"}
                    </label>

                    <input
                      id="siteLogoUpload"
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (!file) return;
                        const reader = new FileReader();
                        reader.onloadend = () => {
                          setForm((prev) => ({
                            ...prev,
                            scope: {
                              ...prev.scope,
                              site: {
                                ...prev.scope.site,
                                logo: reader.result as string,
                              },
                            },
                          }));
                        };
                        reader.readAsDataURL(file);
                      }}
                      className="hidden"
                    />
                  </div>

                  <input
                    type="text"
                    name="name"
                    placeholder="Site name"
                    value={form.scope.site?.name || ""}
                    onChange={(e) => handleChange(e, "site")}
                    className="w-full border rounded-lg px-3 py-2 text-sm"
                  />
                  <input
                    type="text"
                    name="address"
                    placeholder="Address"
                    value={form.scope.site?.address || ""}
                    onChange={(e) => handleChange(e, "site")}
                    className="w-full border rounded-lg px-3 py-2 text-sm"
                  />
                  <textarea
                    name="description"
                    placeholder="Description"
                    value={form.scope.site?.description || ""}
                    onChange={(e) => handleChange(e, "site")}
                    className="w-full border rounded-lg px-3 py-2 text-sm"
                  />
                </div>
              </>
            )}
            {role === "site_admin" && (
              <>
                <h2 className="text-lg font-medium text-slate-800 mt-6 mb-3">
                  Zone Information
                </h2>
                <div className="space-y-3">
                  <input
                    type="text"
                    name="name"
                    placeholder="Zone name"
                    value={form.scope.zone?.name || ""}
                    onChange={(e) => handleChange(e, "zone")}
                    className="w-full border rounded-lg px-3 py-2 text-sm"
                  />
                  <input
                    type="text"
                    name="address"
                    placeholder="Zone address"
                    value={form.scope.zone?.address || ""}
                    onChange={(e) => handleChange(e, "zone")}
                    className="w-full border rounded-lg px-3 py-2 text-sm"
                  />
                  <input
                    type="text"
                    name="emergency_contact"
                    placeholder="Emergency contact"
                    value={form.scope.zone?.emergency_contact || ""}
                    onChange={(e) => handleChange(e, "zone")}
                    className="w-full border rounded-lg px-3 py-2 text-sm"
                  />
                </div>
              </>
            )}
          </div>
        </div>

        {/* Submit */}
        <div className="mt-5 flex justify-end">
          <button
            type="submit"
            className="mb-auto w-fit bg-emerald-200 text-emerald-900 text-sm font-medium px-4 py-2 rounded-lg hover:bg-emerald-300 transition cursor-pointer"
          >
            Create User
          </button>
        </div>
      </form>
    </>
  );
};

export default UserCreatePage;
