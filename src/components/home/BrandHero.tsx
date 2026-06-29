import Link from "next/link";
import Image from "next/image";
import { heroActions, siteConfig } from "@/data/site";

export function BrandHero() {
  return (
    <section className="hero-shell">
      <Image src="/game-cover.png" alt="Lucky Block Rush official Roblox cover art" width={768} height={432} priority sizes="100vw" className="hero-bg" />
      <div className="hero-scrim" />
      <div className="mx-auto flex min-h-[620px] max-w-7xl items-end px-4 py-10">
        <div className="relative w-full min-w-0 max-w-4xl pb-8">
          <p className="mb-4 block max-w-[21rem] whitespace-normal rounded-full border border-white/20 bg-black/45 px-3 py-1 text-xs font-semibold leading-5 text-[color:var(--accent)] sm:inline-flex sm:max-w-full sm:text-sm">
            Updated {siteConfig.lastUpdated} - {siteConfig.freshnessLabel}
          </p>
          <h1 className="max-w-[21rem] break-words text-4xl font-extrabold leading-tight text-white sm:max-w-4xl sm:text-5xl md:text-7xl">
            {siteConfig.gameName} Wiki
          </h1>
          <p className="mt-5 max-w-[21rem] text-lg leading-8 text-white/82 sm:max-w-3xl sm:text-xl md:text-2xl">
            {siteConfig.valueProposition}
          </p>
          <div className="mt-7 grid max-w-[21rem] gap-3 sm:flex sm:max-w-none sm:flex-wrap">
            {heroActions.map((action, index) => (
              <Link key={action.href} href={action.href} className={index === 0 ? "button-primary" : "button-secondary"}>
                {action.label}
              </Link>
            ))}
          </div>
          <p className="mt-5 max-w-3xl text-sm leading-6 text-white/58">
            {siteConfig.shortDisclosure}
          </p>
        </div>
      </div>
    </section>
  );
}
