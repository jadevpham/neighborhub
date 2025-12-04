import { User } from "@/types/user";
import { dataURLtoFile } from "./dataURLtoFile";
import { formatDob } from "./formatDate";
export function buildCreateUserFormData(form: User, selectedRole: string) {
  const fd = new FormData();

  // ===== USER =====
  fd.append("user.email", form.user.email);
  fd.append("user.password", form.user.password || "");
  fd.append("user.name", form.user.name);
  fd.append("user.role", form.user.role);
  fd.append("user.status", String(form.user.status));

  if (form.user.phone) fd.append("user.phone", form.user.phone);
  if (form.user.title) fd.append("user.title", form.user.title);
  if (form.user.gender) fd.append("user.gender", form.user.gender);
  if (form.user.dob) fd.append("user.dob", formatDob(form.user.dob));

  // Avatar (nếu có)
  if (form.user.avatar) {
    const avatarFile = dataURLtoFile(form.user.avatar, "avatar.png");
    fd.append("user.avatar", avatarFile);
  }

  // ============ SCOPE (CHỈ GỬI NẾU CÓ DỮ LIỆU) ============

  // Nếu có site info
  if (
    form.scope.site?.name ||
    form.scope.site?.address ||
    form.scope.site?.logo ||
    form.scope.site?.description
  ) {
    if (form.scope.site?.name)
      fd.append("scope.site.name", form.scope.site.name);
    if (form.scope.site?.address)
      fd.append("scope.site.address", form.scope.site.address);
    if (form.scope.site?.description)
      fd.append("scope.site.description", form.scope.site.description);

    if (form.scope.site?.logo) {
      const logoFile = dataURLtoFile(form.scope.site.logo, "site-logo.png");
      fd.append("scope.site.logo", logoFile);
    }
  }

  // Nếu có zone info
  if (
    form.scope.zone?.name ||
    form.scope.zone?.address ||
    form.scope.zone?.emergency_contact
  ) {
    if (form.scope.zone?.name)
      fd.append("scope.zone.name", form.scope.zone.name);
    if (form.scope.zone?.address)
      fd.append("scope.zone.address", form.scope.zone.address);
    if (form.scope.zone?.emergency_contact) {
      fd.append(
        "scope.zone.emergency_contact",
        form.scope.zone.emergency_contact
      );
    }
  }

  return fd;
}
