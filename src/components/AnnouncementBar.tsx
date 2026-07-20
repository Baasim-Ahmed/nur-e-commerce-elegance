import { useState } from "react";
import { X } from "lucide-react";

export function AnnouncementBar() {
  const [visible, setVisible] = useState(true);
  if (!visible) return null;
  return (
    <div className="bg-matte-black text-ivory">
      <div className="mx-auto flex max-w-[1440px] items-center justify-center gap-3 px-6 py-2.5 text-[10.5px] tracking-[0.22em] uppercase">
        <span className="opacity-90">Complimentary shipping on orders over $200</span>
        <button
          onClick={() => setVisible(false)}
          aria-label="Dismiss announcement"
          className="ml-auto opacity-70 transition-opacity hover:opacity-100"
        >
          <X size={14} strokeWidth={1.25} />
        </button>
      </div>
    </div>
  );
}