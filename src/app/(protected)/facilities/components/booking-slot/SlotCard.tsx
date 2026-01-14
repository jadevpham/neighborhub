// booking-slots/components/SlotCard.tsx
import { SlotCardProps } from "@/types/bookingSlot";
import { bookingSlotStatusMap } from "@/components/StatusBadge";
import dayjs from "dayjs";
import { Phone } from "lucide-react";
import { formatDate } from "@/utils/formatDate";
import { useRef, useState } from "react";
function parseBEDatetime(input?: string | null) {
  if (!input) return null;

  const match = input.match(
    /^(\d{2})-(\d{2})-(\d{4})T(\d{2}):(\d{2}):(\d{2})Z$/
  );
  if (!match) return null;

  const [, dd, mm, yyyy, HH, MM, SS] = match;

  return new Date(
    Date.UTC(
      Number(yyyy),
      Number(mm) - 1,
      Number(dd),
      Number(HH),
      Number(MM),
      Number(SS)
    )
  );
}

function formatTimeOnly(input?: string | null) {
  const d = parseBEDatetime(input);
  if (!d) return "—";
  return dayjs(d).format("HH:mm");
}

export default function SlotCard({ slot, onClick }: SlotCardProps) {
  const statusInfo =
    slot.status !== null && slot.status !== undefined
      ? bookingSlotStatusMap[String(slot.status)]
      : {
          label: "Available",
          color: "bg-green-100 text-green-800 border-green-300",
        };
  const wrapRef = useRef<HTMLDivElement>(null);
  // tooltip style động: luôn bên phải nhưng clamp trong viewport
  const [tipStyle, setTipStyle] = useState<React.CSSProperties>({
    left: "calc(100% + 12px)",
    top: 0,
  });

  const handleEnter = () => {
    const el = wrapRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();

    const TIP_W = 320;
    const GAP = 12;
    const PAD = 12;

    // luôn đặt bên phải slot
    let left = rect.width + GAP;

    // tính X tuyệt đối nếu đặt bên phải
    const absLeft = rect.left + left;

    // nếu tràn phải → kéo tooltip vào (nhưng vẫn “bên phải”, không flip)
    const overflowRight = absLeft + TIP_W - (window.innerWidth - PAD);
    if (overflowRight > 0) {
      left = left - overflowRight; // lùi vào
    }

    // clamp để không bị đè sang trái quá mức (vẫn ưu tiên bên phải)
    const minLeft = Math.min(
      rect.width + GAP,
      window.innerWidth - PAD - TIP_W - rect.left
    );
    left = Math.max(minLeft, left);

    setTipStyle({
      left,
      top: 0,
    });
  };

  return (
    <div
      ref={wrapRef}
      onMouseEnter={handleEnter}
      className="group relative w-full h-full"
    >
      {/* SLOT CARD – FULL CELL */}
      <div
        onClick={onClick}
        className={`
      absolute inset-0              
      p-2
      text-xs
      cursor-pointer
      flex flex-col justify-between 
      shadow-sm
      ${statusInfo.color}
    `}
      >
        {/* ===== TOP: AVATAR + NAME + PHONE ===== */}
        <div className="flex items-center gap-2 min-w-0">
          <img
            src={
              slot.actor?.avatar ??
              "https://ui-avatars.com/api/?name=U&background=E5E7EB&color=374151"
            }
            alt="avatar"
            className="w-6 h-6 rounded-full shrink-0"
          />

          <div className="min-w-0">
            <p className="font-semibold truncate leading-tight">
              {slot.actor?.name || "—"}
            </p>

            {slot.actor?.phone && (
              <p className="text-[11px] opacity-80 truncate leading-tight">
                {slot.actor.phone}
              </p>
            )}
          </div>
        </div>

        {/* ===== BOTTOM: TIME + STATUS ===== */}
        <div className="text-[11px] leading-tight opacity-90">
          <p className="truncate">
            {formatTimeOnly(slot.start)} – {formatTimeOnly(slot.end)}
          </p>

          {slot.status != null && (
            <p className="italic truncate">{statusInfo.label}</p>
          )}
        </div>
      </div>

      {/* ===== HOVER DETAIL (FLOATING) ===== */}
      <div
        style={tipStyle}
        className={`
      absolute z-[9999] top-0 ml-3 w-64
      opacity-0 scale-95
      group-hover:opacity-100 group-hover:scale-100
      transition
      rounded-xl shadow-xl border
      p-3
      ${statusInfo.color}
    `}
      >
        <div className="flex items-center gap-3 mb-2">
          <img
            src={
              slot.actor?.avatar ??
              "https://ui-avatars.com/api/?name=U&background=E5E7EB&color=374151"
            }
            className="w-8 h-8 rounded-full"
          />
          <div>
            <p className="font-semibold">{slot.actor?.name}</p>
            <p className="text-xs opacity-70">{statusInfo.label}</p>
          </div>
        </div>

        <p className="text-xs mb-1">
          ⏰ {formatTimeOnly(slot.start)} – {formatTimeOnly(slot.end)}
        </p>

        {slot.actor?.phone && (
          <p className="text-xs mb-1">📞 {slot.actor.phone}</p>
        )}

        {slot.actor?.action_at && (
          <p className="text-xs opacity-70">
            Action at: {formatDate(slot.actor.action_at)}
          </p>
        )}

        {slot.actor?.cancel_reason && (
          <div className="mt-2 rounded-md bg-red-50 text-red-700 p-2 text-xs">
            ❗ {slot.actor.cancel_reason}
          </div>
        )}
      </div>
    </div>
  );
}
