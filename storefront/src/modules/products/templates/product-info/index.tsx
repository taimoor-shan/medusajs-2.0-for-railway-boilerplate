import { HttpTypes } from "@medusajs/types"
import { Heading, Text } from "@medusajs/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

type ProductInfoProps = {
  product: HttpTypes.StoreProduct
}

const ProductInfo = ({ product }: ProductInfoProps) => {
  return (
    <div id="product-info">
      <div className="">
        {product.collection && (
          <LocalizedClientLink
            href={`/collections/${product.collection.handle}`}
            className="text-medium text-ui-fg-muted hover:text-ui-fg-subtle"
          >
            {product.collection.title}
          </LocalizedClientLink>
        )}
      
        <Heading
          level="h2"
          className="text-3xl leading-10 text-ui-fg-base"
          data-testid="product-title"
        >
          {product.title}
         
        </Heading>
          <Heading
          level="h3"
          className="text-lg text-primary italic mb-6"
          data-testid="product-subtitle"
        >

          {product.subtitle}

          </Heading> 
        
        <Text
          className="text-medium text-ui-fg-subtle whitespace-pre-line"
          data-testid="product-description"
        >
          {product.description}
        </Text>

        {(product.metadata as Record<string, any>)?.uniqueness_note && (
          <Text className="text-small-regular text-ui-fg-muted italic mt-4">
            {(product.metadata as Record<string, any>).uniqueness_note}
          </Text>
        )}

        {product.tags && product.tags.length > 0 && (
          <div className="mt-6">
            <Text className="text-small-regular text-ui-fg-muted mb-2">
              Ideal for
            </Text>
            <div className="flex flex-wrap gap-2">
              {product.tags.map((tag) => (
                <span
                  key={tag.id}
                  className="text-xs px-3 py-1 rounded-full border border-ui-border-base text-ui-fg-subtle"
                >
                  {tag.value}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ProductInfo
