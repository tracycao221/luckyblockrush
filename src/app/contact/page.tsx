import type { Metadata } from "next";
import { siteConfig } from "@/data/site";
import { Breadcrumbs, PageIntro } from "@/components/ui/content";

export const metadata: Metadata = {
  title: `Contact ${siteConfig.name}`,
  description: `Contact and correction guidance for ${siteConfig.name}.`,
  alternates: { canonical: `${siteConfig.domain}/contact` }
};

export default function ContactPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-10">
      <Breadcrumbs items={[{ label: "Contact", href: "/contact" }]} />
      <PageIntro
        eyebrow="Contact"
        title="Corrections and source updates"
        description="Use this page for site corrections, source updates, and editorial feedback. Official game support belongs on Roblox and creator-owned channels."
      />
      <section className="mt-10 content-card">
        <h2 className="text-2xl font-bold text-white">Before sending a correction</h2>
        <p className="mt-3 leading-7 text-white/68">
          Include the page URL, the claim that needs correction, the source that supports the change, and the date you checked it.
        </p>
      </section>
    </main>
  );
}
