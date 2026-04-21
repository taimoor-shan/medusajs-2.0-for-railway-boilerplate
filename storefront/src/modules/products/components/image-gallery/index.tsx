"use client"

import { HttpTypes } from "@medusajs/types"
import { Container } from "@medusajs/ui"
import Image from "next/image"
import { useState, useEffect } from "react"

type ImageGalleryProps = {
  images: HttpTypes.StoreProductImage[]
}

const ImageGallery = ({ images }: ImageGalleryProps) => {
  const [activeIndex, setActiveIndex] = useState(0)

  // Reset active index if the images array changes (e.g. variant selected)
  useEffect(() => {
    setActiveIndex(0)
  }, [images])

  if (!images || images.length === 0) {
    return null
  }

  const activeImage = images[activeIndex]
  // Determine if we should show the "second image on hover" effect
  // Valid if we are on the first image and a second image exists
  const canShowAlternateOnHover = activeIndex === 0 && images.length > 1
  const hoverImage = canShowAlternateOnHover ? images[1] : null

  return (
    <div className="flex flex-col gap-y-4 relative w-full">
      {/* Main Image */}
      <Container
        className="relative aspect-[4/5] w-full overflow-hidden bg-ui-bg-subtle group cursor-crosshair"
        id={activeImage.id}
      >
        {!!activeImage.url && (
          <Image
            src={activeImage.url}
            priority={true}
            className={`absolute inset-0 rounded-rounded transition-opacity duration-300 ease-in-out ${
              canShowAlternateOnHover ? "group-hover:opacity-0" : ""
            }`}
            alt="Product image"
            fill
            sizes="(max-width: 576px) 100vw, (max-width: 992px) 50vw, 800px"
            style={{
              objectFit: "cover",
            }}
          />
        )}

        {/* Hover Image (Second Image) */}
        {canShowAlternateOnHover && hoverImage?.url && (
          <Image
            src={hoverImage.url}
            priority={false}
            className="absolute inset-0 rounded-rounded opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100"
            alt="Product image alternate"
            fill
            sizes="(max-width: 576px) 100vw, (max-width: 992px) 50vw, 800px"
            style={{
              objectFit: "cover",
            }}
          />
        )}
      </Container>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="grid grid-cols-5 gap-4">
          {images.map((image, index) => {
            return (
              <button
                key={image.id}
                className={`relative aspect-square w-full overflow-hidden rounded-md border-2 transition-all ${
                  index === activeIndex
                    ? "border-ui-border-interactive"
                    : "border-transparent hover:border-ui-border-strong"
                }`}
                onClick={() => setActiveIndex(index)}
              >
                {!!image.url && (
                  <Image
                    src={image.url}
                    alt={`Thumbnail ${index + 1}`}
                    fill
                    sizes="100px"
                    style={{
                      objectFit: "cover",
                    }}
                  />
                )}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default ImageGallery
