import { eventStatusMap, referendumStatusMap } from "@/components/StatusBadge";
export function buildAIContext({
  events = [],
  facilities = [],
  news = [],
  feedbacks = [],
  referendums = [],
  users = [],
  sites = [],
  zones = [],
}: {
  events: any[];
  facilities: any[];
  news: any[];
  feedbacks: any[];
  referendums: any[];
  users: any[];
  sites: any[];
  zones: any[];
}) {
  let ctx = "";

  if (events.length) {
    ctx += "Events:\n";
  
    events.forEach((e) => {
      const statusLabel =
        eventStatusMap[e.status as keyof typeof eventStatusMap]?.label ??
        "Unknown";
  
      ctx += `
  - Title: ${e.event_title}
    Created by: ${e.created_by}
    Status: ${statusLabel}
    Location: ${e.location?.siteName}${
        e.location?.zoneName ? " - " + e.location.zoneName : ""
      }
    Time: ${e.overall_start_date} → ${e.overall_end_date}
    Hashtags: ${e.hash_tags?.length ? e.hash_tags.join(", ") : "None"}
  `;
    });
  }
  

  if (facilities.length) {
    ctx += "\nFacilities:\n";
  
    facilities.forEach((f) => {
      const statusLabel =
        f.status === 1 ? "Active" :
        f.status === 0 ? "Inactive" :
        "Unknown";
  
      ctx += `
  - Name: ${f.name}
    Type: ${f.type}
    Description: ${f.description}
    Status: ${statusLabel}
  `;
    });
  }
  

  if (news.length) {
    ctx += "\nNews:\n";
  
    news.forEach((n) => {
      const scopeLabel =
        n.scope === "site"
          ? "Site-wide"
          : n.scope === "zone"
          ? "Zone-specific"
          : "Unknown scope";
  
      const totalReactions = n.reactions?.length
        ? n.reactions.reduce((sum: number, r: any) => sum + (r.count ?? 0), 0)
        : 0;
  
      ctx += `
  - Title: ${n.title}
    Author: ${n.author?.name}
    Scope: ${scopeLabel}
    Published at: ${n.published_at}
    Views: ${n.views}
    Total reactions: ${totalReactions}
  `;
    });
  }
  

  if (feedbacks.length) {
    ctx += "\nFeedbacks:\n";
  
    feedbacks.forEach((f) => {
      const statusLabel =
        f.status === 1 ? "Pending" :
        f.status === 2 ? "Processed" :
        "Unknown";
  
      const residentName = f.is_anonymous
        ? "Anonymous Resident"
        : f.resident?.name ?? "Unknown Resident";
  
      const zoneNames = f.resident?.zones?.length
        ? f.resident.zones.map((z: any) => z.name).join(", ")
        : "Unknown Zone";
  
      ctx += `
  - Title: ${f.title}
    Created by: ${residentName}
    Status: ${statusLabel}
    Zone: ${zoneNames}
    Created at: ${f.created_at}
  `;
    });
  }
  

  if (referendums.length) {
    ctx += "\nReferendums:\n";
  
    referendums.forEach((r) => {
      const statusLabel =
        referendumStatusMap[r.status as keyof typeof referendumStatusMap]
          ?.label ?? "Unknown";
  
      ctx += `
  - Title: ${r.title}
    Created by: ${r.creator_name}
    Status: ${statusLabel}
    Location: ${r.site_name} - ${r.zone_name}
    Created at: ${r.created_at}
  `;
    });
  }
  
  

  if (users.length) {
    ctx += "\nUsers:\n";
    users.forEach((n) => {
      ctx += `- ${n.title}\n`;
    });
  }

    if (sites.length) {
    ctx += "\nSites:\n";
    sites.forEach((n) => {
      ctx += `- ${n.title}\n`;
    });
  }

  if (zones.length) {
    ctx += "\nZones:\n";
  
    zones.forEach((z) => {
      ctx += `
  - Zone name: ${z.name}
    Address: ${z.adress}
    Emergency contact: ${z.emergency_contact ?? "Not provided"}
  `;
    });
  }
  
  return ctx.trim();
}
