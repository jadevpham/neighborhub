"use client";
import { FC } from "react";
import { NewsData } from "@/types/news";
import { MoreVertical } from "lucide-react";
import { NewsReactions } from "./NewsReactions";
import { newsStatusMap } from "@/components/StatusBadge";
import { formatDate } from "@/utils/formatDate";
import Link from "next/link";

export const NewsCard: FC<{ item: NewsData }> = ({ item }) => {
  const st = newsStatusMap[item.status ?? 0];

  return (
    <Link
      href={`/news/${item.id}`}
      className={`
    group
    rounded-2xl
    bg-white
    shadow-sm
    overflow-hidden
    flex flex-col
    transition-all duration-300 cursor-pointer

    border ${st.border}

    hover:-translate-y-1
    hover:shadow-xl
    ${st.hoverBorder}
    ${st.hoverShadow}

    hover:rounded-3xl
  `}
    >
      {/* <div className="rounded-xl border bg-white shadow-sm hover:shadow-md transition flex flex-col overflow-hidden"> */}
      {/* ===== COVER ===== */}
      <div className="w-full h-44 overflow-hidden rounded-t-xl">
        {item.cover_image ? (
          <img
            src={item.cover_image}
            alt={item.title || "cover-image"}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400 text-sm">
            No Image
          </div>
        )}
      </div>

      {/* ===== CONTENT ===== */}
      <div className="p-4 flex flex-col flex-grow">
        {/* STATUS + MENU */}
        <div className="flex justify-between items-center mb-2">
          <span
            className={`px-3 py-1 text-xs rounded-full font-medium ${st.badge}`}
          >
            {st.label}
          </span>
          {item.status === 0 && (
            <span className="text-sm text-gray-400">
              {formatDate(item.created_at)}
            </span>
          )}
          {item.status === 1 && (
            <span className="text-sm text-gray-400">
              {formatDate(item.published_at)}
            </span>
          )}
          {item.status === 2 && (
            <span className="text-sm text-gray-400">
              {formatDate(item.created_at)}
            </span>
          )}
          {item.status === 3 && (
            <span className="text-sm text-gray-400">{item.go_live}</span>
          )}
        </div>

        {/* TITLE */}
        <h2 className="font-semibold text-lg text-gray-900 leading-snug">
          {item.title}
        </h2>

        {/* AUTHOR + TIME */}
        <div className="flex justify-between items-center text-gray-600 text-sm mt-3">
          <div className="flex items-center gap-2">
            <img
              src={item.author?.avatar || ""}
              className="w-7 h-7 rounded-full object-cover"
              onError={(e) => (e.currentTarget.style.display = "none")}
            />
            <span>{item.author?.name}</span>
          </div>
          <span className="text-gray-400">{item.distance_time}</span>
        </div>
      </div>

      {/* ===== FOOTER (REACTIONS + VIEWS) — ALWAYS AT BOTTOM ===== */}
      <div className="px-4 py-3 border-t bg-white">
        <NewsReactions reactions={item.reactions} views={item.views} />
      </div>
      {/* </div> */}
    </Link>
  );
};
