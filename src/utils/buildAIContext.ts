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
      ctx += `- ${e.title} | ${e.start_date}\n`;
    });
  }

  if (facilities.length) {
    ctx += "\nFacilities:\n";
    facilities.forEach((f) => {
      ctx += `- ${f.name} | type: ${f.type_id}\n`;
    });
  }

  if (news.length) {
    ctx += "\nNews:\n";
    news.forEach((n) => {
      ctx += `- ${n.title}\n`;
    });
  }

  if (feedbacks.length) {
    ctx += "\nFeedbacks:\n";
    feedbacks.forEach((n) => {
      ctx += `- ${n.title}\n`;
    });
  }

  if (referendums.length) {
    ctx += "\nReferendums:\n";
    referendums.forEach((n) => {
      ctx += `- ${n.title}\n`;
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
    zones.forEach((n) => {
      ctx += `- ${n.title}\n`;
    });
  }
  return ctx.trim();
}
