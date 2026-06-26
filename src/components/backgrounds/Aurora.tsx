import "./Aurora.css";
import { cn } from "@/lib/utils";

// Aurora · fond animé coloré, palette marque GemmaS.
// Usage : <Aurora /> en absolute dans un parent relative + overflow-hidden.
export function Aurora({ className }: { className?: string }) {
  return (
    <div className={cn("zl-aurora-root", className)} aria-hidden>
      <div className="zl-aurora-inner">
        <div className="zl-aurora-blob is-1" />
        <div className="zl-aurora-blob is-2" />
        <div className="zl-aurora-blob is-3" />
        <div className="zl-aurora-blob is-4" />
      </div>
    </div>
  );
}
