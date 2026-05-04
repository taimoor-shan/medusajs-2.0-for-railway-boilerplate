import { Metadata } from "next"
import { retrievePageBySlug } from "@lib/data/pages"

const SLUG = "privacy-policy"
const FALLBACK_TITLE = "Privacy Policy"

export async function generateMetadata(): Promise<Metadata> {
  const page = await retrievePageBySlug(SLUG)
  return {
    title: page?.seo_title || page?.title || `${FALLBACK_TITLE} | Infinytree`,
    description:
      page?.seo_description || page?.excerpt || "How we collect, use and protect your data.",
  }
}

export default async function PrivacyPolicyPage() {
  const page = await retrievePageBySlug(SLUG)

  return (
    <div className="content-container py-16">
      <div className="max-w-4xl mx-auto">
        {page?.content ? (
          <div
            className="prose max-w-none text-ui-fg-subtle"
            dangerouslySetInnerHTML={{ __html: page.content }}
          />
        ) : (
          <>
            <h1 className="text-2xl font-semibold text-ui-fg-base">
              {FALLBACK_TITLE}
            </h1>
            <div className="mt-6 space-y-4 text-ui-fg-subtle">
              <p>This page is being updated. Please check back soon.</p>
              <p>
                For privacy-related requests, contact us at:{" "}
                <a
                  href="mailto:info@infinytree.com"
                  className="text-ui-fg-base underline"
                >
                  info@infinytree.com
                </a>
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
