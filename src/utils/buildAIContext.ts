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

  // if (events.length) {
  //   ctx += "Events:\n";
  
  //   events.forEach((e) => {
  //     const statusLabel =
  //       eventStatusMap[e.status as keyof typeof eventStatusMap]?.label ??
  //       "Unknown";
  
  //     ctx += `
  // - Title: ${e.event_title}
  //   Created by: ${e.created_by}
  //   Status: ${statusLabel}
  //   Location: ${e.location?.siteName}${
  //       e.location?.zoneName ? " - " + e.location.zoneName : ""
  //     }
  //   Time: ${e.overall_start_date} → ${e.overall_end_date}
  //   Hashtags: ${e.hash_tags?.length ? e.hash_tags.join(", ") : "None"}
  // `;
  //   });
  // }
  

  // if (facilities.length) {
  //   ctx += "\nFacilities:\n";
  
  //   facilities.forEach((f) => {
  //     const statusLabel =
  //       f.status === 1 ? "Active" :
  //       f.status === 0 ? "Inactive" :
  //       "Unknown";
  
  //     ctx += `
  // - Name: ${f.name}
  //   Type: ${f.type}
  //   Description: ${f.description}
  //   Status: ${statusLabel}
  // `;
  //   });
  // }
  

  // if (news.length) {
  //   ctx += "\nNews:\n";
  
  //   news.forEach((n) => {
  //     const scopeLabel =
  //       n.scope === "site"
  //         ? "Site-wide"
  //         : n.scope === "zone"
  //         ? "Zone-specific"
  //         : "Unknown scope";
  
  //     const totalReactions = n.reactions?.length
  //       ? n.reactions.reduce((sum: number, r: any) => sum + (r.count ?? 0), 0)
  //       : 0;
  
  //     ctx += `- News titled "${n.title}" was published by ${n.author?.name} (${scopeLabel}), has ${n.views} views and ${totalReactions} reactions.\n`;
  //   });
  // }
  
  

  // if (feedbacks.length) {
  //   ctx += "\nFeedbacks:\n";
  
  //   feedbacks.forEach((f) => {
  //     const statusLabel =
  //       f.status === 1 ? "Pending" :
  //       f.status === 2 ? "Processed" :
  //       "Unknown";
  
  //     const residentName = f.is_anonymous
  //       ? "Anonymous Resident"
  //       : f.resident?.name ?? "Unknown Resident";
  
  //     const zoneNames = f.resident?.zones?.length
  //       ? f.resident.zones.map((z: any) => z.name).join(", ")
  //       : "Unknown Zone";
  
  //     ctx += `
  // - Title: ${f.title}
  //   Created by: ${residentName}
  //   Status: ${statusLabel}
  //   Zone: ${zoneNames}
  //   Created at: ${f.created_at}
  // `;
  //   });
  // }
  

  // if (referendums.length) {
  //   ctx += "\nReferendums:\n";
  
  //   referendums.forEach((r) => {
  //     const statusLabel =
  //       referendumStatusMap[r.status as keyof typeof referendumStatusMap]
  //         ?.label ?? "Unknown";
  
  //     ctx += `
  // - Title: ${r.title}
  //   Created by: ${r.creator_name}
  //   Status: ${statusLabel}
  //   Location: ${r.site_name} - ${r.zone_name}
  //   Created at: ${r.created_at}
  // `;
  //   });
  // }
  
  

  // if (users.length) {
  //   ctx += "\nUsers:\n";
  //   users.forEach((n) => {
  //     ctx += `- ${n.title}\n`;
  //   });
  // }

  //   if (sites.length) {
  //   ctx += "\nSites:\n";
  //   sites.forEach((n) => {
  //     ctx += `- ${n.title}\n`;
  //   });
  // }

  // if (zones.length) {
  //   ctx += "\nZones:\n";
  
  //   zones.forEach((z) => {
  //     ctx += `
  // - Zone name: ${z.name}
  //   Address: ${z.adress}
  //   Emergency contact: ${z.emergency_contact ?? "Not provided"}
  // `;
  //   });
  // }

    /* ===================== EVENTS ===================== */
    if (events.length) {
      ctx += "\nEVENTS:\n";
      events.forEach((e) => {
        ctx += `Event "${e.event_title}" was created by ${e.created_by}. `;
        ctx += `Its status is ${e.status}. `;
        ctx += `It takes place at ${e.location?.siteName}`;
        if (e.location?.zoneName) ctx += ` - ${e.location.zoneName}`;
        ctx += `. `;
        ctx += `The event starts at ${e.overall_start_date} and ends at ${e.overall_end_date}. `;
        ctx += `Hashtags include ${e.hash_tags?.length ? e.hash_tags.join(", ") : "none"}.`;
        ctx += "\n";
      });
    }
  
    /* ===================== FACILITIES ===================== */
    if (facilities.length) {
      ctx += "\nFACILITIES:\n";
      facilities.forEach((f) => {
        ctx += `Facility "${f.name}" is a ${f.type}. `;
        ctx += `Description: ${f.description}. `;
        ctx += `Current status is ${f.status === 1 ? "active" : "inactive"}.`;
        ctx += "\n";
      });
    }
  
    /* ===================== NEWS ===================== */
    if (news.length) {
      ctx += "\nNEWS:\n";
      news.forEach((n) => {
        const scope =
          n.scope === "site"
            ? "site-wide"
            : n.scope === "zone"
            ? "zone-specific"
            : "unknown scope";
  
        const totalReactions = n.reactions?.length
          ? n.reactions.reduce((sum: number, r: any) => sum + (r.count ?? 0), 0)
          : 0;
  
        ctx += `News titled "${n.title}" was published by ${n.author?.name}. `;
        ctx += `It is a ${scope} news item. `;
        ctx += `It was published at ${n.published_at}. `;
        ctx += `This news has ${n.views} views and ${totalReactions} total reactions.`;
        ctx += "\n";
      });
    }
  
    /* ===================== FEEDBACKS ===================== */
    if (feedbacks.length) {
      ctx += "\nFEEDBACKS:\n";
      feedbacks.forEach((f) => {
        const residentName = f.is_anonymous
          ? "an anonymous resident"
          : f.resident?.name ?? "an unknown resident";
  
        const zones =
          f.resident?.zones?.length
            ? f.resident.zones.map((z: any) => z.name).join(", ")
            : "unknown zone";
  
        const status =
          f.status === 1 ? "pending" :
          f.status === 2 ? "processed" :
          "unknown";
  
        ctx += `Feedback titled "${f.title}" was submitted by ${residentName}. `;
        ctx += `It belongs to zone ${zones}. `;
        ctx += `The feedback status is ${status}. `;
        ctx += `It was created at ${f.created_at}.`;
        ctx += "\n";
      });
    }
  
    /* ===================== REFERENDUMS ===================== */
    if (referendums.length) {
      ctx += "\nREFERENDUMS:\n";
      referendums.forEach((r) => {
        ctx += `Referendum "${r.title}" was created by ${r.creator_name}. `;
        ctx += `It is located at ${r.site_name} - ${r.zone_name}. `;
        ctx += `Current status is ${r.status}. `;
        ctx += `It was created at ${r.created_at}.`;
        ctx += "\n";
      });
    }
  
    /* ===================== ZONES ===================== */
    if (zones.length) {
      ctx += "\nZONES:\n";
      zones.forEach((z) => {
        ctx += `Zone "${z.name}" is located at ${z.adress}. `;
        ctx += `Emergency contact is ${z.emergency_contact ?? "not provided"}.`;
        ctx += "\n";
      });
    }
  
    /* ===================== SITES ===================== */
    if (sites.length) {
      ctx += "\nSITES:\n";
    
      sites.forEach((s) => {
        const statusLabel =
          s.status === null ? "unknown" : s.status === 1 ? "active" : "inactive";
    
        ctx += `Site "${s.siteName}" is located at ${s.address}. `;
        ctx += `Description: ${s.description}. `;
        ctx += `Current status is ${statusLabel}.`;
        ctx += "\n";
      });
    }
    
  
    /* ===================== USERS ===================== */
    if (users.length) {
      ctx += "\nUSERS:\n";
    
      users.forEach((u) => {
        const statusLabel =
          u.user?.status === 1 ? "active" : "inactive";
    
        ctx += `User "${u.user.name}" has role "${u.user.role}". `;
        ctx += `This user is responsible for site "${u.scope.site.name}"`;
        if (u.scope.zone?.name) {
          ctx += ` and zone "${u.scope.zone.name}"`;
        }
        ctx += `. `;
        ctx += `Contact email is ${u.user.email}, phone number is ${u.user.phone}. `;
        ctx += `Current status is ${statusLabel}.`;
        ctx += "\n";
      });
    }
    
  
  
  return ctx.trim();
}
