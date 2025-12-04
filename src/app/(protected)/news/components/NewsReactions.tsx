"use client";

import { FC } from "react";
import { ThumbsDown, ThumbsUp, Heart, Eye } from "lucide-react";
import { NewsReactionProps } from "@/types/news";



const getReactionCount = (reactions: NewsReactionProps["reactions"], type: number) => {
  return reactions?.find((r) => r.type === type)?.count || 0;
};

export const NewsReactions: FC<NewsReactionProps> = ({
  reactions,
  views,
  size = 18,
  viewColor = "text-blue-600",
}) => {
  return (
    <div className="flex justify-between items-center text-sm mt-2">
      {/* LEFT — Reactions */}
      <div className="flex items-center gap-5">
        {/* Dislike */}
        <div className="flex items-center gap-1 text-gray-500">
          <ThumbsDown size={size} />
          <span>{getReactionCount(reactions, 0)}</span>
        </div>

        {/* Like */}
        <div className="flex items-center gap-1 text-blue-600">
          <ThumbsUp size={size} />
          <span>{getReactionCount(reactions, 1)}</span>
        </div>

        {/* Heart */}
        <div className="flex items-center gap-1 text-red-500">
          <Heart size={size} className="fill-red-500" />
          <span>{getReactionCount(reactions, 2)}</span>
        </div>
      </div>

      {/* RIGHT — Views */}
      <div className={`flex items-center gap-2 cursor-pointer ${viewColor}`}>
        <Eye size={size - 2} />
        <span className="hover:underline">{views || 0}</span>
      </div>
    </div>
  );
};