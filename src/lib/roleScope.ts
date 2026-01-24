export const ROLE_SCOPE = {
    partner: ["events"],
    site_admin: ["user", "resident", "event", "feedback", "facilities", "referendum", "news", "bookings"],
    management_board: ["resident", "event", "feedback", "facilities", "referendum", "news", "bookings"],
  } as const;
  
  export type Role = keyof typeof ROLE_SCOPE;
  