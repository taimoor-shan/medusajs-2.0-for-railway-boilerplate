"use client"

import { useState } from "react"
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

  const [activeTab, setActiveTab] = useState(0)

  if (tabs.length === 0) return null

  return (
    <div className="w-full">
      <div className="flex border-b border-ui-border-base gap-x-6 overflow-x-auto no-scrollbar">
        {tabs.map((tab, i) => (
          <button
            key={i}
            onClick={() => setActiveTab(i)}
            className={`py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
              activeTab === i
                ? "border-primary text-ui-fg-base"
                : "border-transparent text-ui-fg-subtle hover:text-ui-fg-base"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="pt-4">
        {tabs[activeTab].component}
      </div>
    </div>
  )
}

const KeyFeaturesTab = ({ features }: { features: string[] }) => {
  return (
    <div className="text-sm py-4">
      <ul className="list-disc pl-4 flex flex-col gap-y-2 marker:text-primary">
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
    <div className="text-sm py-4">
      <p className="text-ui-fg-subtle leading-loose">{instructions}</p>
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

  if (product.height) {
    treeSpecs["Height"] = `${product.height}`
  }
  if (product.width) {
    treeSpecs["Width"] = `${product.width}`
  }
  if (product.length) {
    treeSpecs["Depth"] = `${product.length}`
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
    const unit = pot.unit || "cm"
    
    // Combine width and depth into Size if both exist
    if (pot.width && pot.depth) {
      potSpecs["Size"] = `${pot.width} ${unit} × ${pot.depth} ${unit}`
    } else {
      if (pot.width) potSpecs["Width"] = `${pot.width} ${unit}`
      if (pot.depth) potSpecs["Depth"] = `${pot.depth} ${unit}`
    }

    if (pot.height) {
      potSpecs["Height"] = `${pot.height} ${unit}`
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
    <div className="text-base py-4">
      {/* Tree specifications */}
      {hasTreeSpecs && (
        <div>
          {hasPotSpecs && (
            <span className="font-semibold text-primary text-base mb-4 block">
              Tree (including pot)
            </span>
          )}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-4 text-sm">
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
          <span className="font-semibold text-primary text-base mb-4 block">
            {pot.size ? `Pot Only (${pot.size})` : "Pot Only"}
          </span>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-4 text-sm">
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

export default ProductTabs
