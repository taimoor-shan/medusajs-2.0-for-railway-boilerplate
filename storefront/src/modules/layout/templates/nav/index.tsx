import { Suspense } from "react"

import { listRegions } from "@lib/data/regions"
import { listLocales } from "@lib/data/locales"
import { getLocale } from "@lib/data/locale-actions"
import { retrieveStore } from "@lib/data/store"
import { ShoppingCart } from "@medusajs/icons"
import { StoreRegion } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CartButton from "@modules/layout/components/cart-button"
import SideMenu from "@modules/layout/components/side-menu"
import NavCountrySelect from "@modules/layout/components/nav-country-select"
import NavLanguageSelect from "@modules/layout/components/nav-language-select"

export default async function Nav() {
  const [regions, locales, currentLocale, store] = await Promise.all([
    listRegions().then((regions: StoreRegion[]) => regions),
    listLocales(),
    getLocale(),
    retrieveStore(),
  ])
  const storeName = store?.name || "Luxe Linen"

  return (
    <div className="sticky top-0 inset-x-0 z-[100] group">
      <header className="relative h-16 mx-auto border-b duration-200 bg-white border-ui-border-base">
        <nav className="content-container txt-xsmall-plus text-ui-fg-subtle flex h-full w-full items-center justify-between gap-x-4 text-small-regular small:grid small:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)]">
          <div className="flex h-full min-w-0 items-center gap-x-4 justify-self-start">
            <LocalizedClientLink
              href="/"
              className="flex items-center gap-3 text-3xl font-serif text-black hover:text-black"
              data-testid="nav-store-link"
            >
              <img src="/logo-mark.png" alt="Logo" className="w-8 h-8 object-contain" />
              {storeName}
            </LocalizedClientLink>
          </div>

          <div className="hidden h-full items-center justify-self-center small:flex">
            <div className="flex items-center gap-x-8 whitespace-nowrap">
              <LocalizedClientLink
                className="hover:text-primary text-sm text-black uppercase"
                href="/"
                data-testid="nav-home-link"
              >
                Home
              </LocalizedClientLink>
              <LocalizedClientLink
                className="hover:text-primary text-sm text-black uppercase"
                href="/store"
                data-testid="nav-store-link-center"
              >
                Store
              </LocalizedClientLink>
              <LocalizedClientLink
                className="hover:text-primary text-sm text-black uppercase"
                href="/about"
                data-testid="nav-about-link"
              >
                About
              </LocalizedClientLink>
              <LocalizedClientLink
                className="hover:text-primary text-sm text-black uppercase"
                href="/contact"
                data-testid="nav-contact-link"
              >
                Contact
              </LocalizedClientLink>
            </div>
          </div>

          <div className="flex h-full items-center justify-self-end gap-x-1 small:gap-x-0">
            <div className="hidden small:flex items-center gap-x-4 whitespace-nowrap rounded-full border border-ui-border-base px-4 py-2">
              <LocalizedClientLink
                className="hover:text-ui-fg-base"
                href="/account"
                data-testid="nav-account-link"
              >
                Account
              </LocalizedClientLink>
              <span
                aria-hidden="true"
                className="h-4 w-px bg-ui-border-base"
              />
              {/* <div className="flex items-center">
                <NavLanguageSelect locales={locales} currentLocale={currentLocale} />
              </div> */}
              {/* <span
                aria-hidden="true"
                className="h-4 w-px bg-ui-border-base"
              /> */}
              <div className="flex items-center">
                <NavCountrySelect regions={regions as any} />
              </div>
              <span
                aria-hidden="true"
                className="h-4 w-px bg-ui-border-base"
              />
              <Suspense
                fallback={
                  <LocalizedClientLink
                    className="hover:text-ui-fg-base"
                    href="/cart"
                    data-testid="nav-cart-link"
                  >
                    Cart (0)
                  </LocalizedClientLink>
                }
              >
                <CartButton />
              </Suspense>
            </div>

            <Suspense
              fallback={
                <LocalizedClientLink
                  className="small:hidden flex h-11 w-11 items-center justify-center rounded-full hover:text-ui-fg-base"
                  href="/cart"
                  data-testid="mobile-nav-cart-link"
                  aria-label="Shopping cart"
                >
                  <ShoppingCart />
                  <span className="sr-only">Cart (0)</span>
                </LocalizedClientLink>
              }
            >
              <div className="small:hidden">
                <CartButton iconOnly />
              </div>
            </Suspense>

            <div className="small:hidden">
              <SideMenu
                regions={regions}
                locales={locales}
                currentLocale={currentLocale}
                storeName={storeName}
              />
            </div>
          </div>
        </nav>
      </header>
    </div>
  )
}
