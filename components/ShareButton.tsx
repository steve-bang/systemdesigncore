"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Check, Copy, Facebook, Linkedin, Loader2, Share2, Twitter, X } from "lucide-react";

type ShareButtonProps = {
  path: string;
  title: string;
  description?: string;
  className?: string;
};

type ShareStatus = "idle" | "loading" | "success" | "error";

async function copyToClipboard(text: string) {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(text);
    return;
  }

  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "absolute";
  textarea.style.left = "-9999px";
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  document.body.removeChild(textarea);
}

function openShareWindow(url: string) {
  window.open(url, "_blank", "noopener,noreferrer,width=640,height=720");
}

function getCanonicalUrl() {
  const canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
  return canonical?.href;
}

export function ShareButton({ path, title, description, className }: ShareButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [status, setStatus] = useState<ShareStatus>("idle");
  const rootRef = useRef<HTMLDivElement>(null);

  const url = useMemo(() => {
    if (typeof window === "undefined") {
      return path;
    }

    if (path.startsWith("http://") || path.startsWith("https://")) {
      return path;
    }

    return getCanonicalUrl() ?? new URL(path, window.location.origin).toString();
  }, [path]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (!rootRef.current) {
        return;
      }

      const target = event.target as Node;
      if (!rootRef.current.contains(target)) {
        setIsOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  useEffect(() => {
    if (status === "idle") {
      return;
    }

    const timer = window.setTimeout(() => {
      setStatus("idle");
    }, 1800);

    return () => window.clearTimeout(timer);
  }, [status]);

  const canNativeShare = typeof navigator !== "undefined" && typeof navigator.share === "function";

  const handleNativeShare = async () => {
    if (!canNativeShare) {
      return;
    }

    setStatus("loading");
    try {
      await navigator.share({
        title: title || document.title,
        text: description,
        url
      });
      setStatus("success");
      setIsOpen(false);
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") {
        setStatus("idle");
        return;
      }
      setStatus("error");
    }
  };

  const handleCopy = async () => {
    setStatus("loading");
    try {
      await copyToClipboard(url);
      setStatus("success");
      setIsOpen(false);
    } catch {
      setStatus("error");
    }
  };

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title || document.title);

  const shareItems = [
    {
      key: "facebook",
      label: "Share to Facebook",
      icon: Facebook,
      onClick: () => openShareWindow(`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`)
    },
    {
      key: "twitter",
      label: "Share to Twitter (X)",
      icon: Twitter,
      onClick: () => openShareWindow(`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`)
    },
    {
      key: "linkedin",
      label: "Share to LinkedIn",
      icon: Linkedin,
      onClick: () => openShareWindow(`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`)
    }
  ] as const;

  return (
    <div ref={rootRef} className={className ? `relative inline-flex w-full flex-col sm:w-auto ${className}` : "relative inline-flex w-full flex-col sm:w-auto"}>
      <button
        type="button"
        onClick={() => setIsOpen((value) => !value)}
        aria-label="Mở tùy chọn chia sẻ bài học"
        aria-haspopup="menu"
        aria-expanded={isOpen}
        className="inline-flex h-9 w-full items-center justify-center gap-2 rounded-xl border border-line bg-surface px-3 text-sm font-medium text-ink transition hover:bg-surface-soft active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/35 sm:h-10 sm:w-auto sm:justify-start sm:px-3.5"
      >
        {status === "loading" ? <Loader2 className="h-4 w-4 animate-spin" /> : status === "success" ? <Check className="h-4 w-4" /> : <Share2 className="h-4 w-4" />}
        <span>{status === "success" ? "Copied!" : "Share"}</span>
      </button>

      <div
        role="menu"
        aria-label="Tùy chọn chia sẻ"
        className={`absolute left-0 right-0 top-full z-30 mt-2 w-full origin-top rounded-xl border border-line bg-surface p-2 shadow-[0_16px_32px_rgba(14,21,40,0.12)] transition-all duration-150 sm:left-auto sm:right-0 sm:w-64 sm:origin-top-right ${
          isOpen ? "translate-y-0 opacity-100" : "pointer-events-none -translate-y-1 opacity-0"
        }`}
      >
        <div className="mb-1 flex items-center justify-between px-2 py-1">
          <p className="text-xs font-medium text-ink-dim">Chia sẻ bài học</p>
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            aria-label="Đóng menu chia sẻ"
            className="inline-flex h-7 w-7 items-center justify-center rounded-md text-ink-dim hover:bg-surface-soft hover:text-ink"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="space-y-1">
          {shareItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.key}
                type="button"
                role="menuitem"
                onClick={() => {
                  item.onClick();
                  setIsOpen(false);
                }}
                aria-label={item.label}
                className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-ink transition hover:bg-surface-soft"
              >
                <Icon className="h-4 w-4" />
                <span>{item.label}</span>
              </button>
            );
          })}

          {canNativeShare ? (
            <button
              type="button"
              role="menuitem"
              onClick={handleNativeShare}
              aria-label="Share bằng ứng dụng trên thiết bị"
              className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-ink transition hover:bg-surface-soft"
            >
              <Share2 className="h-4 w-4" />
              <span>Native share</span>
            </button>
          ) : null}

          <button
            type="button"
            role="menuitem"
            onClick={handleCopy}
            aria-label="Sao chép liên kết bài học"
            className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-ink transition hover:bg-surface-soft"
          >
            <Copy className="h-4 w-4" />
            <span>Copy link</span>
          </button>
        </div>
      </div>

      <p aria-live="polite" className="mt-1 min-h-4 text-xs text-ink-dim">
        {status === "success" ? "Đã chia sẻ / sao chép liên kết" : status === "error" ? "Không thể chia sẻ. Vui lòng thử lại." : ""}
      </p>
    </div>
  );
}
