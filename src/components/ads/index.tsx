"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { runtimeConfig } from "@/lib/runtime-config";

type BannerSize = "300x250" | "320x50" | "728x90";

type BannerConfig = {
  height: number;
  key?: string;
  scriptUrl?: string;
  width: number;
};

const bannerConfigs: Record<BannerSize, BannerConfig> = {
  "300x250": {
    width: 300,
    height: 250,
    key: runtimeConfig.adsterraBanner300x250Key,
    scriptUrl: runtimeConfig.adsterraBanner300x250ScriptUrl
  },
  "320x50": {
    width: 320,
    height: 50,
    key: runtimeConfig.adsterraBanner320x50Key,
    scriptUrl: runtimeConfig.adsterraBanner320x50ScriptUrl
  },
  "728x90": {
    width: 728,
    height: 90,
    key: runtimeConfig.adsterraBanner728x90Key || runtimeConfig.adsterraLeaderboardId,
    scriptUrl: runtimeConfig.adsterraBanner728x90ScriptUrl
  }
};

declare global {
  interface Window {
    atOptions?: {
      key?: string;
      format: "iframe";
      height: number;
      width: number;
      params: Record<string, unknown>;
    };
  }
}

function normalizeScriptUrl(url?: string) {
  if (!url) return undefined;
  if (url.startsWith("//")) return `https:${url}`;
  return url;
}

function getBannerScriptUrl(config: BannerConfig) {
  if (config.scriptUrl) return normalizeScriptUrl(config.scriptUrl);
  if (!config.key) return undefined;
  return `https://www.highperformanceformat.com/${config.key}/invoke.js`;
}

function AdvertisementShell({
  children,
  className = "",
  label = "Advertisement"
}: {
  children: React.ReactNode;
  className?: string;
  label?: string;
}) {
  return (
    <aside className={`ad-shell ${className}`} aria-label={label}>
      <span className="ad-label">{label}</span>
      {children}
    </aside>
  );
}

function AdsterraBannerUnit({
  className = "",
  size
}: {
  className?: string;
  size: BannerSize;
}) {
  const hostRef = useRef<HTMLDivElement>(null);
  const config = bannerConfigs[size];
  const scriptUrl = getBannerScriptUrl(config);

  useEffect(() => {
    const host = hostRef.current;
    if (!host || !scriptUrl || !config.key) return;

    host.replaceChildren();
    window.atOptions = {
      key: config.key,
      format: "iframe",
      height: config.height,
      width: config.width,
      params: {}
    };

    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = scriptUrl;
    script.async = false;
    host.appendChild(script);

    return () => {
      host.replaceChildren();
    };
  }, [config.height, config.key, config.width, scriptUrl]);

  if (!scriptUrl || !config.key) return null;

  return (
    <AdvertisementShell className={className}>
      <div
        ref={hostRef}
        className="ad-host"
        style={{ minHeight: config.height, width: "100%", maxWidth: config.width }}
      />
    </AdvertisementShell>
  );
}

function usePreferredLeaderboardSize() {
  const [size, setSize] = useState<BannerSize | null>(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 768px)");
    const chooseSize = () => {
      const desktopConfig = bannerConfigs["728x90"];
      const mobileConfig = bannerConfigs["320x50"];
      if (mediaQuery.matches && (desktopConfig.key || desktopConfig.scriptUrl)) {
        setSize("728x90");
        return;
      }
      if (mobileConfig.key || mobileConfig.scriptUrl) {
        setSize("320x50");
        return;
      }
      if (desktopConfig.key || desktopConfig.scriptUrl) {
        setSize("728x90");
        return;
      }
      setSize(null);
    };

    chooseSize();
    mediaQuery.addEventListener("change", chooseSize);
    return () => mediaQuery.removeEventListener("change", chooseSize);
  }, []);

  return size;
}

function AdsterraNativeUnit({
  className = "",
  containerId,
  scriptUrl
}: {
  className?: string;
  containerId?: string;
  scriptUrl?: string;
}) {
  const hostRef = useRef<HTMLDivElement>(null);
  const cleanContainerId = useMemo(() => containerId?.replace(/^#/, ""), [containerId]);
  const normalizedScriptUrl = normalizeScriptUrl(scriptUrl);

  useEffect(() => {
    const host = hostRef.current;
    if (!host || !cleanContainerId || !normalizedScriptUrl) return;

    host.replaceChildren();

    const container = document.createElement("div");
    container.id = cleanContainerId;
    host.appendChild(container);

    const script = document.createElement("script");
    script.async = true;
    script.dataset.cfasync = "false";
    script.src = normalizedScriptUrl;
    host.appendChild(script);

    return () => {
      host.replaceChildren();
    };
  }, [cleanContainerId, normalizedScriptUrl]);

  if (!cleanContainerId || !normalizedScriptUrl) return null;

  return (
    <AdvertisementShell className={className}>
      <div ref={hostRef} className="ad-host ad-host-native" />
    </AdvertisementShell>
  );
}

export function AdsterraSmartLink() {
  return null;
}

export function AdsterraSmartLinkAnchor({
  children = "Sponsored link",
  className = ""
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  if (!runtimeConfig.adsterraSmartLinkUrl) return null;

  return (
    <a
      className={className}
      href={runtimeConfig.adsterraSmartLinkUrl}
      rel="nofollow sponsored noopener noreferrer"
      target="_blank"
    >
      {children}
    </a>
  );
}

export function AdsterraBanner() {
  return <AdsterraBannerUnit size="300x250" />;
}

export function AdsterraLeaderboard() {
  const size = usePreferredLeaderboardSize();
  if (!size) return null;

  return (
    <div className="ad-leaderboard">
      <AdsterraBannerUnit size={size} />
    </div>
  );
}

export function AdsterraNative1() {
  return (
    <AdsterraNativeUnit
      containerId={runtimeConfig.adsterraNative1Id}
      scriptUrl={runtimeConfig.adsterraNative1ScriptUrl}
    />
  );
}

export function AdsterraNative2() {
  return (
    <AdsterraNativeUnit
      containerId={runtimeConfig.adsterraNative2Id}
      scriptUrl={runtimeConfig.adsterraNative2ScriptUrl}
    />
  );
}

export function AdDisclosure() {
  return (
    <p className="text-xs leading-5 text-white/42">
      This fan site may show third-party ads to support hosting and updates.
    </p>
  );
}
