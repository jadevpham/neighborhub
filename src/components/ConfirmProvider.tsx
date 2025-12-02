"use client";

import { createContext, useContext, useState } from "react";
import { ConfirmContextType, ConfirmOptions } from "@/types/common";

const ConfirmContext = createContext<ConfirmContextType | null>(null);

export const useConfirm = () => useContext(ConfirmContext)!;

export const ConfirmProvider = ({ children }: { children: React.ReactNode }) => {
  const [options, setOptions] = useState<ConfirmOptions | null>(null);
  const [inputValue, setInputValue] = useState("");

  const openConfirm = (opts: ConfirmOptions) => {
    setInputValue("");
    setOptions(opts);
  };

  const close = () => setOptions(null);

  return (
    <ConfirmContext.Provider value={{ openConfirm }}>
      {children}

      {options && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-xl w-[380px]">
            <h3 className="text-lg font-semibold text-gray-800">
              {options.title || "Are you sure?"}
            </h3>

            <p className="text-gray-600 mt-2">{options.message}</p>

            {/* Nếu cần ô nhập reject_reason */}
            {options.showInput && (
              <textarea
                className="mt-4 w-full border p-2 rounded"
                rows={3}
                placeholder={options.inputPlaceholder || "Enter reason..."}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
            )}

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={close}
                className="px-4 py-2 rounded border hover:bg-gray-100"
              >
                {options.cancelText || "Cancel"}
              </button>

              <button
                onClick={() => {
                  options.onConfirm(inputValue);
                  close();
                }}
                className="px-4 py-2 rounded bg-emerald-600 text-white hover:bg-emerald-700"
              >
                {options.confirmText || "Confirm"}
              </button>
            </div>
          </div>
        </div>
      )}
    </ConfirmContext.Provider>
  );
};
