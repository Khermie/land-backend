import { useRef } from "react";
import { FileTextIcon } from "./Icons";
import { cn } from "../../utils/cn";

function UploadIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={cn("fill-none stroke-current", className)} aria-hidden="true">
      <path d="M12 15V4m0 0L7.5 8.5M12 4l4.5 4.5" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M4.5 15v3.5a1.5 1.5 0 001.5 1.5h12a1.5 1.5 0 001.5-1.5V15" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CloseIcon({ className }) {
  return (
    <svg viewBox="0 0 20 20" className={cn("h-3.5 w-3.5 fill-none stroke-current", className)} aria-hidden="true">
      <path d="M5 5l10 10M15 5L5 15" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function formatFileSize(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

/**
 * Document/attachment upload list — same "PDF • 1.2 MB" meta style
 * already used for land document listings on the Land Detail page
 * (see DocumentsGrid in LandDetailContent.jsx), reused here for
 * consistency rather than inventing a new file-row style.
 */
export default function FileAttachmentList({ value, onChange, maxFiles = 5, label = "Attachments" }) {
  const inputRef = useRef(null);

  function handleFiles(fileList) {
    const room = maxFiles - value.length;
    const accepted = Array.from(fileList).slice(0, Math.max(0, room));
    const next = accepted.map((file) => ({
      id: `${file.name}-${file.lastModified}-${Math.random().toString(36).slice(2, 6)}`,
      file,
      name: file.name,
      meta: `${file.type ? file.type.split("/")[1]?.toUpperCase() ?? "FILE" : "FILE"} • ${formatFileSize(file.size)}`,
    }));
    if (next.length) onChange([...value, ...next]);
  }

  function handleRemove(id) {
    onChange(value.filter((f) => f.id !== id));
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <label className="text-sm font-semibold text-ink-900">{label}</label>
        <span className="text-xs text-ink-500">
          {value.length}/{maxFiles}
        </span>
      </div>

      {value.length > 0 && (
        <ul className="mt-2 space-y-2">
          {value.map((f) => (
            <li
              key={f.id}
              className="flex items-center gap-3 rounded-lg border border-ink-900/10 bg-white px-3.5 py-2.5"
            >
              <FileTextIcon className="h-4 w-4 shrink-0 text-forest-600" />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-ink-900">{f.name}</p>
                <p className="text-xs text-ink-500">{f.meta}</p>
              </div>
              <button
                type="button"
                onClick={() => handleRemove(f.id)}
                aria-label={`Remove ${f.name}`}
                className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-ink-400 hover:bg-mist-100 hover:text-ink-700"
              >
                <CloseIcon />
              </button>
            </li>
          ))}
        </ul>
      )}

      {value.length < maxFiles && (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="mt-2 flex w-full items-center justify-center gap-2 rounded-lg border-2 border-dashed border-ink-900/15 bg-mist-50 px-4 py-3 text-sm font-medium text-ink-500 transition-colors hover:border-forest-400 hover:bg-forest-50/60 hover:text-forest-700"
        >
          <UploadIcon className="h-4 w-4" />
          Upload document
        </button>
      )}

      <input
        ref={inputRef}
        type="file"
        accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
        multiple
        className="sr-only"
        onChange={(e) => {
          handleFiles(e.target.files);
          e.target.value = "";
        }}
      />

      <p className="mt-2 text-xs text-ink-500">PDF, DOC, or image files, up to {maxFiles} attachments.</p>
    </div>
  );
}
