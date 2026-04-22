"use client"

import Back from "@modules/common/icons/back"
import FastDelivery from "@modules/common/icons/fast-delivery"
import Refresh from "@modules/common/icons/refresh"

import Accordion from "./accordion"
import { HttpTypes } from "@medusajs/types"

type ProductTabsProps = {
  product: HttpTypes.StoreProduct
}

const ProductTabs = ({ product }: ProductTabsProps) => {
  const metadata = (product.metadata as Record<string, any>) || {}

  const keyFeaturesRaw = metadata?.key_features
  let parsedKeyFeatures: string[] = []
  
  if (Array.isArray(keyFeaturesRaw)) {
    parsedKeyFeatures = keyFeaturesRaw
  } else if (typeof keyFeaturesRaw === "string") {
    try {
      // If the user pasted `"A", "B"`, wrapping in brackets makes it valid JSON
      const wrapped = keyFeaturesRaw.trim().startsWith("[") 
        ? keyFeaturesRaw 
        : `[${keyFeaturesRaw}]`;
      const parsed = JSON.parse(wrapped);
      if (Array.isArray(parsed)) {
        parsedKeyFeatures = parsed;
      }
    } catch (e) {
      // Fallback: split by newlines or commas, and remove extra quotes
      parsedKeyFeatures = keyFeaturesRaw
        .split(/\n|,(?=\s*")/)
        .map((s) => s.replace(/^"|"$/g, "").trim())
        .filter((s) => s.length > 0)
    }
  }

  const care = metadata?.care_instructions as string | undefined
  const packagingInfo = metadata?.packaging_info as string | undefined

  const potRaw = metadata?.pot
  let parsedPot: Record<string, any> | undefined = undefined
  if (typeof potRaw === "object" && potRaw !== null && !Array.isArray(potRaw)) {
    parsedPot = potRaw
  } else if (typeof potRaw === "string") {
    try {
      const parsed = JSON.parse(potRaw)
      if (typeof parsed === "object" && parsed !== null && !Array.isArray(parsed)) {
        parsedPot = parsed
      }
    } catch (e) {
      // Not valid JSON, ignore
    }
  }

  // Build tabs dynamically — only show tabs that have data
  const tabs: { label: string; component: React.ReactNode }[] = []

  if (parsedKeyFeatures.length > 0) {
    tabs.push({
      label: "Key Features",
      component: <KeyFeaturesTab features={parsedKeyFeatures} />,
    })
  }

  // Specifications tab always shows if product has any native fields
  tabs.push({
    label: "Specifications",
    component: <SpecificationsTab product={product} pot={parsedPot} />,
  })

  if (care) {
    tabs.push({
      label: "Maintenance & Care",
      component: <CareTab instructions={care} />,
    })
  }

  if (packagingInfo) {
    tabs.push({
      label: "Packaging & Delivery",
      component: <PackagingTab info={packagingInfo} />,
    })
  }

  tabs.push({
    label: "Shipping & Returns",
    component: <ShippingInfoTab />,
  })

  return (
    <div className="w-full">
      <Accordion type="multiple">
        {tabs.map((tab, i) => (
           <Accordion.Item
            key={i}
            title={tab.label}
            headingSize="medium"
            value={tab.label}
          >
            {tab.component}
          </Accordion.Item>
        ))}
      </Accordion>
    </div>
  )
}

const KeyFeaturesTab = ({ features }: { features: string[] }) => {
  return (
    <div className="text-small-regular py-8">
      <ul className="list-disc pl-4 flex flex-col gap-y-2">
        {features.map((feature, i) => (
          <li key={i} className="text-ui-fg-subtle">
            {feature}
          </li>
        ))}
      </ul>
    </div>
  )
}

const CareTab = ({ instructions }: { instructions: string }) => {
  return (
    <div className="text-small-regular py-8">
      <p className="text-ui-fg-subtle leading-loose">{instructions}</p>
    </div>
  )
}

const PackagingTab = ({ info }: { info: string }) => {
  return (
    <div className="text-small-regular py-8">
      <p className="text-ui-fg-subtle leading-loose">{info}</p>
    </div>
  )
}

type SpecificationsTabProps = {
  product: HttpTypes.StoreProduct
  pot?: Record<string, any>
}

const SpecificationsTab = ({ product, pot }: SpecificationsTabProps) => {
  // Build tree specs from native Medusa fields
  const treeSpecs: Record<string, string> = {}

  // Dimensions in compact format: LxWxH
  if (product.length || product.width || product.height) {
    const parts = []
    if (product.length) parts.push(`${product.length}L`)
    if (product.width) parts.push(`${product.width}W`)
    if (product.height) parts.push(`${product.height}H`)
    treeSpecs["Dimensions (approx.)"] = parts.join(" x ")
  }

  if (product.weight) {
    treeSpecs["Weight"] = `${product.weight} g`
  }
  if (product.material) {
    treeSpecs["Material"] = product.material
  }
  if (product.origin_country) {
    treeSpecs["Country of origin"] = product.origin_country
  }

  // Build pot specs from metadata.pot
  const potSpecs: Record<string, string> = {}
  if (pot) {
    if (pot.width && pot.depth && pot.height) {
      const unit = pot.unit || "cm"
      potSpecs["Dimensions"] = `${pot.width} x ${pot.depth} x ${pot.height}H ${unit}`
    }
    if (pot.material) {
      potSpecs["Material"] = pot.material
    }
    if (pot.finish) {
      potSpecs["Finish"] = pot.finish
    }
    if (pot.care) {
      potSpecs["Care"] = pot.care
    }
  }

  const hasTreeSpecs = Object.keys(treeSpecs).length > 0
  const hasPotSpecs = Object.keys(potSpecs).length > 0

  return (
    <div className="text-small-regular py-8">
      {/* Tree specifications */}
      {hasTreeSpecs && (
        <div>
          {hasPotSpecs && (
            <span className="font-semibold text-ui-fg-base text-xs uppercase tracking-wider mb-4 block">
              Tree (including pot)
            </span>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
            {Object.entries(treeSpecs).map(([key, value], i) => (
              <div key={i} className="flex flex-col gap-y-1">
                <span className="font-semibold text-ui-fg-base">{key}</span>
                <p className="text-ui-fg-subtle">{value}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Pot specifications */}
      {hasPotSpecs && (
        <div className={hasTreeSpecs ? "mt-8 pt-8 border-t border-ui-border-base" : ""}>
          <span className="font-semibold text-ui-fg-base text-xs uppercase tracking-wider mb-4 block">
            Pot
          </span>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
            {Object.entries(potSpecs).map(([key, value], i) => (
              <div key={i} className="flex flex-col gap-y-1">
                <span className="font-semibold text-ui-fg-base">{key}</span>
                <p className="text-ui-fg-subtle">{value}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {!hasTreeSpecs && !hasPotSpecs && (
        <p className="text-ui-fg-muted">No specifications available.</p>
      )}
    </div>
  )
}

const ShippingInfoTab = () => {
  return (
    <div className="text-small-regular py-8">
      <div className="grid grid-cols-1 gap-y-8">
        <div className="flex items-start gap-x-2">
          <FastDelivery />
          <div>
            <span className="font-semibold">Fast delivery</span>
            <p className="max-w-sm text-ui-fg-subtle mt-1">
              Your package will arrive in 3-5 business days at your pick up
              location or in the comfort of your home.
            </p>
          </div>
        </div>
        <div className="flex items-start gap-x-2">
          <Refresh />
          <div>
            <span className="font-semibold">Simple exchanges</span>
            <p className="max-w-sm text-ui-fg-subtle mt-1">
              Is the fit not quite right? No worries - we&apos;ll exchange your
              product for a new one.
            </p>
          </div>
        </div>
        <div className="flex items-start gap-x-2">
          <Back />
          <div>
            <span className="font-semibold">Easy returns</span>
            <p className="max-w-sm text-ui-fg-subtle mt-1">
              Just return your product and we&apos;ll refund your money. No
              questions asked – we&apos;ll do our best to make sure your return
              is hassle-free.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductTabs
