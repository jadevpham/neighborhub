"use client";

import { useRouter } from "next/navigation";

interface Action {
  label: string;
  color: string;
  path: string;
}

export default function QuickActions() {
  const router = useRouter();

  const actions: Action[] = [
    {
      label: "+ Create news",
      color: "bg-emerald-600 hover:bg-emerald-700",
      path: "/news/create",
    },
    {
      label: "+ Create event",
      color: "bg-blue-600 hover:bg-blue-700",
      path: "/events/create",
    },
    {
      label: "+ Add facility",
      color: "bg-purple-600 hover:bg-purple-700",
      path: "/facilities",
    },
    {
      label: "+ Open referendum",
      color: "bg-orange-600 hover:bg-orange-700",
      path: "/referendums/create",
    },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-sm border p-4">
      <h3 className="font-semibold text-sm mb-3">Quick actions</h3>

      <div className="flex flex-wrap gap-2">
        {actions.map((action) => (
          <button
            key={action.label}
            onClick={() => router.push(action.path)}
            className={`cursor-pointer px-3 py-1.5 rounded-xl text-xs font-medium text-white transition ${action.color}`}
          >
            {action.label}
          </button>
        ))}
      </div>
    </div>
  );
}
