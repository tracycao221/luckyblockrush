import type { Metadata } from "next";
import Link from "next/link";
import { faqs, siteConfig, tierPreview } from "@/data/site";
import { BreadcrumbJsonLd, FaqJsonLd, ItemListJsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs, PageIntro, SectionHeader } from "@/components/ui/content";

export const metadata: Metadata = {
  title: `${siteConfig.gameName} Tier List`,
  description: `Best ${siteConfig.gameName} picks ranked for beginners, farming, and late-game progression.`,
  alternates: { canonical: `${siteConfig.domain}/tier-list` },
  openGraph: {
    title: `${siteConfig.gameName} Tier List`,
    description: `Best ${siteConfig.gameName} picks ranked for beginners, farming, and late-game progression.`,
    url: `${siteConfig.domain}/tier-list`,
    images: ["/opengraph-image"]
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.gameName} Tier List`,
    description: `Best ${siteConfig.gameName} picks ranked for beginners, farming, and late-game progression.`,
    images: ["/opengraph-image"]
  }
};

export default function TierListPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-10">
      <BreadcrumbJsonLd items={[{ name: "Home", href: "/" }, { name: "Tier List", href: "/tier-list" }]} />
      <ItemListJsonLd />
      <FaqJsonLd items={faqs.tierList} />
      <Breadcrumbs items={[{ label: "Tier List", href: "/tier-list" }]} />

      <PageIntro
        eyebrow="Tier list"
        title={`${siteConfig.gameName} Tier List`}
        description="Use this tier list to compare the best current picks, what each pick is good for, and what still needs checking before you spend rare resources."
      />

      <section className="mt-8 grid gap-4 lg:grid-cols-3">
        <article className="content-card">
          <span className="mini-label">Checked date</span>
          <h2 className="mt-3 text-xl font-bold text-white">{siteConfig.lastUpdated}</h2>
          <p className="mt-2 text-sm leading-6 text-white/66">Rankings should be refreshed after codes, updates, balance changes, or repeated community reports.</p>
        </article>
        <article className="content-card">
          <span className="mini-label">Ranking criteria</span>
          <h2 className="mt-3 text-xl font-bold text-white">Power, cost, utility, and scaling</h2>
          <p className="mt-2 text-sm leading-6 text-white/66">Compare picks by clear speed, survival, unlock cost, support value, replacement risk, and late-game scaling.</p>
        </article>
        <article className="content-card">
          <span className="mini-label">Source notes</span>
          <h2 className="mt-3 text-xl font-bold text-white">Official, creator, wiki, and community checks</h2>
          <p className="mt-2 text-sm leading-6 text-white/66">Treat official Roblox and creator-owned sources as strongest. Videos and community reports help with trends and use cases.</p>
        </article>
      </section>

      <section className="mt-10">
        <SectionHeader
          eyebrow="Rankings"
          title="Best current picks"
          copy="Compare strong beginner, farming, team-combo, and late-game options with clear notes about when each pick is useful."
        />
        <div className="mt-6 grid gap-4">
          {tierPreview.map((item) => (
            <article key={item.name} className="content-card">
              <div className="flex flex-wrap items-center gap-4">
                <span className="tier-badge">{item.tier}</span>
                <div>
                  <h2 className="text-2xl font-extrabold text-white">{item.name}</h2>
                  <p className="mt-1 text-sm text-white/50">{item.role}</p>
                </div>
                {item.confidence ? <span className="status-pill">{item.confidence}</span> : null}
              </div>
              {item.bestFor?.length ? (
                <div className="mt-4 flex flex-wrap gap-2">
                  {item.bestFor.map((label) => (
                    <span key={label} className="mini-label">{label}</span>
                  ))}
                </div>
              ) : null}
              <p className="mt-4 max-w-4xl text-white/68">{item.reason}</p>
              {item.teamNote ? <p className="mt-3 text-sm text-white/60">Team combo: {item.teamNote}</p> : null}
              {item.sourceNote ? <p className="mt-2 text-xs uppercase tracking-wide text-white/45">Source check: {item.sourceNote}</p> : null}
            </article>
          ))}
        </div>
      </section>

      <section className="mt-10 grid gap-4 lg:grid-cols-3">
        <article className="content-card">
          <h3 className="text-lg font-bold text-white">Beginner ranking</h3>
          <p className="mt-2 text-sm leading-6 text-white/66">Rank easy, safe, low-investment options for first-session players.</p>
        </article>
        <article className="content-card">
          <h3 className="text-lg font-bold text-white">Farming ranking</h3>
          <p className="mt-2 text-sm leading-6 text-white/66">Rank options by repeatable grind speed, income, survivability, or mission value.</p>
        </article>
        <article className="content-card">
          <h3 className="text-lg font-bold text-white">Endgame ranking</h3>
          <p className="mt-2 text-sm leading-6 text-white/66">Rank the best late-game builds after unlock cost and skill ceiling are clear.</p>
        </article>
      </section>

      <section className="mt-10">
        <SectionHeader
          eyebrow="Team combo notes"
          title="Best picks need the right partners"
          copy="For character, unit, or squad games, rank picks with synergy in mind instead of treating every unit as a solo carry."
        />
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <Link href="/guides" className="content-card">
            <span className="mini-label">Build guide</span>
            <h3 className="mt-3 text-lg font-bold text-white">Check team roles</h3>
            <p className="mt-2 text-sm text-white/66">Use guides for carry, support, control, farming, and bossing roles after the full entity list is confirmed.</p>
          </Link>
          <Link href="/wiki" className="content-card">
            <span className="mini-label">Wiki</span>
            <h3 className="mt-3 text-lg font-bold text-white">Read entity details</h3>
            <p className="mt-2 text-sm text-white/66">Use wiki pages for unlock paths, abilities, traits, and source-backed notes on each ranked pick.</p>
          </Link>
          <Link href="/sources" className="content-card">
            <span className="mini-label">Sources</span>
            <h3 className="mt-3 text-lg font-bold text-white">Check evidence</h3>
            <p className="mt-2 text-sm text-white/66">Use source notes when creator videos, wiki pages, or community reports disagree.</p>
          </Link>
        </div>
      </section>

      <div className="mt-10 flex flex-wrap gap-3">
        <Link href="/codes" className="button-secondary">Get codes</Link>
        <Link href="/calculator" className="button-secondary">Use the calculator</Link>
        <Link href="/trello" className="button-secondary">Check source status</Link>
      </div>
    </main>
  );
}
