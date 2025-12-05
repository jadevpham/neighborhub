export function canManageNews(role: any, scope: any) {
         // "system_admin" | "site_admin" | "management_board" | ...      
  if (!role || !scope) return false;

  if (role === "system_admin") return true;

  if (role === "site_admin") {
    return scope === "site";
  }

  if (role === "management_board") {
    return scope === "zone";
  }

  return false;
}
