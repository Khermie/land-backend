import { useRef } from "react";
import { cn } from "../../utils/cn";

function UploadCloudIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={cn("fill-none stroke-current", className)} aria-hidden="true">
      <path
        d="M7 18a4.5 4.5 0 01-1-8.9A5.5 5.5 0 0116.9 8H17a4 4 0 011 7.87"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M12 12v7m0-7l-2.5 2.5M12 12l2.5 2.5" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function TrashIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={cn("fill-none stroke-current", className)} aria-hidden="true">
      <path d="M4 6.5h16M9 6.5V4.8a1 1 0 011-1h4a1 1 0 011 1v1.7M6.5 6.5l.7 12.3a1.5 1.5 0 001.5 1.4h6.6a1.5 1.5 0 001.5-1.4l.7-12.3" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function StarBadgeIcon({ className }) {
  return (
    <svg viewBox="0 0 20 20" className={cn("fill-current", className)} aria-hidden="true">
      <path d="M10 1.5l2.6 5.6 6.1.6-4.6 4.1 1.3 6-5.4-3.1-5.4 3.1 1.3-6-4.6-4.1 6.1-.6z" />
    </svg>
  );
}

/**
 * Multi-image upload control with live previews, used by both Post a
 * Project and List Your Land. Images are read client-side into object
 * URLs (this project has no upload endpoint/storage backend — see
 * ListingsContext.jsx) — the first image is marked "Cover" to match
 * how every listing card elsewhere in the app shows one primary photo.
 *
 * `value` is an array of { id, file, url }. Parent owns the state so
 * it can be included in the submitted record.
 */
export default function ImageUploadGrid({ value, onChange, maxImages = 8, label = "Photos" }) {
  const inputRef = useRef(null);

  function handleFiles(fileList) {
    const incoming = Array.from(fileList).filter((f) => f.type.startsWith("image/"));
    const room = maxImages - value.length;
    const accepted = incoming.slice(0, Math.max(0, room));

    const next = accepted.map((file) => ({
      id: `${file.name}-${file.lastModified}-${Math.random().toString(36).slice(2, 6)}`,
      file,
      url: URL.createObjectURL(file),
    }));

    if (next.length) onChange([...value, ...next]);
  }

  function handleRemove(id) {
    const target = value.find((img) => img.id === id);
    if (target) URL.revokeObjectURL(target.url);
    onChange(value.filter((img) => img.id !== id));
  }

  function handleDrop(e) {
    e.preventDefault();
    handleFiles(e.dataTransfer.files);
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <label className="text-sm font-semibold text-ink-900">{label}</label>
        <span className="text-xs text-ink-500">
          {value.length}/{maxImages}
        </span>
      </div>

      <div className="mt-2 grid grid-cols-3 gap-3 sm:grid-cols-4">
        {value.map((img, i) => (
          <div
            key={img.id}
            className="group relative aspect-square overflow-hidden rounded-lg border border-ink-900/10 bg-mist-100"
          >
            <img src={img.url} alt="" className="h-full w-full object-cover" />
            {i === 0 && (
              <span className="absolute left-1.5 top-1.5 flex items-center gap-1 rounded-full bg-forest-600 px-2 py-0.5 text-[10px] font-bold text-white">
                <StarBadgeIcon className="h-2.5 w-2.5" />
                Cover
              </span>
            )}
            <button
              type="button"
              onClick={() => handleRemove(img.id)}
              aria-label="Remove photo"
              className="absolute right-1.5 top-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-ink-900/70 text-white opacity-0 transition-opacity group-hover:opacity-100 focus:opacity-100"
            >
              <TrashIcon className="h-3.5 w-3.5" />
            </button>
          </div>
        ))}

        {value.length < maxImages && (
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
            className="flex aspect-square flex-col items-center justify-center gap-1.5 rounded-lg border-2 border-dashed border-ink-900/15 bg-mist-50 text-ink-500 transition-colors hover:border-forest-400 hover:bg-forest-50/60 hover:text-forest-700"
          >
            <UploadCloudIcon className="h-6 w-6" />
            <span className="text-[11px] font-medium">Add photo</span>
          </button>
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        className="sr-only"
        onChange={(e) => {
          handleFiles(e.target.files);
          e.target.value = "";
        }}
      />

      <p className="mt-2 text-xs text-ink-500">
        JPG or PNG, up to {maxImages} photos. The first photo is used as the cover image.
      </p>
    </div>
  );
}
