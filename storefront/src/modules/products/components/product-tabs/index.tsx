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

  // Scalable schema: Read from metadata, but fallback to rich mock data for layout demonstration
  const keyFeatures = metadata?.key_features || [
    "Handmade artificial flower plant.",
    "Authentic texture and natural character.",
    "Highest quality artificial leaves and flowers for a realistic and natural look.",
    "Shiny black acrylic flower pot.",
    "Maintenance-free: no watering – no sun – no care and Hypoallergenic"
  ]

  const specs = metadata?.specifications || {
    "Size": "190cm - 200cm",
    "Width/Depth": "80cm - 100cm",
    "Pot Size": "72cm x 72cm, height 127cm",
    "Usage": "Designed for indoor use"
  }

  const care = metadata?.care_instructions || "Maintenance-free elegance: Enjoy the beauty of this artificial plant all year round, without any ongoing care or seasonal changes – no watering – no sun – no care. Hypoallergenic design: Free from pollen, mold, and seasonal allergens."

  const tabs = [
    {
      label: "Key Features",
      component: <KeyFeaturesTab features={keyFeatures as string[]} />,
    },
    {
      label: "Specifications",
      component: <ProductInfoTab product={product} specs={specs as Record<string, string>} />,
    },
    {
      label: "Maintenance & Care",
      component: <CareTab instructions={care as string} />,
    },
    {
      label: "Shipping & Returns",
      component: <ShippingInfoTab />,
    },
  ]

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

type ProductInfoTabProps = {
  product: HttpTypes.StoreProduct
  specs: Record<string, string>
}

const ProductInfoTab = ({ product, specs }: ProductInfoTabProps) => {
  // We merge native Medusa specs with custom metadata specs
  const combinedSpecs = {
    ...specs,
    ...(product.material && { Material: product.material }),
    ...(product.origin_country && { "Country of origin": product.origin_country }),
    ...(product.weight && { Weight: `${product.weight} g` }),
  }

  return (
    <div className="text-small-regular py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
        {Object.entries(combinedSpecs).map(([key, value], i) => (
          <div key={i} className="flex flex-col gap-y-1">
            <span className="font-semibold text-ui-fg-base">{key}</span>
            <p className="text-ui-fg-subtle">{value}</p>
          </div>
        ))}
      </div>
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
