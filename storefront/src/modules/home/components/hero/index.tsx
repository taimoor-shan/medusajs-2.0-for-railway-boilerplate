"use client"

import { Button, Heading } from "@medusajs/ui"
import { ChevronDown } from "lucide-react"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Image from "next/image"

type HeroProps = {
  page?: {
    title: string
    excerpt?: string | null
    featured_image?: string | null
  } | null
}

const Hero = ({ page }: HeroProps) => {
  const title = page?.title || "Living Art for Timeless Interiors"
  const excerpt = page?.excerpt || "Handmade artificial trees and botanical masterpieces — each one of a kind. No watering, no sunlight, no care. Just enduring beauty for luxury spaces."

  const backgroundImage = page?.featured_image
    ? `url(${page.featured_image})`
    : undefined

  return (
    <div
      className="h-[calc(100vh-133px)] w-full border-b border-hairline relative bg-surface-card bg-center bg-cover"
      style={backgroundImage ? { backgroundImage } : undefined}
    >
      {/* <div className="absolute inset-0 z-0 bg-overlay" /> */}
      <div className=" z-10 flex flex-col justify-center items-center text-center small:p-32 gap-6 max-w-4xl mx-auto">
        <Image
          src="/logo.png"
          alt="Logo"
          width={300}
          height={300}
          className="object-contain"
        />
        <span>
          <Heading
            level="h1"
            className="lg:text-5xl text-3xl text-ink mb-5 font-serif text-white font-normal tracking-wide"
          >
            {title}
          </Heading>
          <Heading
            level="h2"
            className="text-base text-body font-normal text-white"
          >
            {excerpt}
          </Heading>
        </span>
        <LocalizedClientLink href="/store" passHref>
          <Button size="large" className="mt-2">
            Shop the collection
          </Button>
        </LocalizedClientLink>
      </div>
      <button
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 text-on-dark hover:text-on-dark transition-all duration-1000 animate-bounce"
        onClick={() => {
          window.scrollTo({
            top: window.innerHeight * 0.95,
            behavior: "smooth",
          })
        }}
        aria-label="Scroll down"
      >
        <ChevronDown size={32} />
      </button>
    </div>
  )
}

export default Hero
