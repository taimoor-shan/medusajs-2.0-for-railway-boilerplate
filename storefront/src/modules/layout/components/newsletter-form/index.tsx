"use client"

import { useState } from "react"
import { clx } from "@medusajs/ui"

export default function NewsletterForm() {
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatus("loading")
    
    // Simulate API call
    setTimeout(() => {
      setStatus("success")
      setEmail("")
    }, 1000)
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col w-full mt-4 relative">
      <div className="flex w-full">
        <input 
          type="email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="youremail@example.com" 
          className="flex-grow border border-gray-400 px-4 py-3 rounded-l-sm bg-white text-base focus:outline-none focus:ring-1 focus:ring-gray-500 text-gray-900"
          required
          disabled={status === "loading" || status === "success"}
        />
        <button 
          type="submit" 
          disabled={status === "loading" || status === "success"}
          className={clx(
            "text-white px-6 py-3 font-bold text-base transition-colors rounded-r-sm min-w-[100px]",
            status === "success" ? "bg-green-600" : "bg-[#BA594C] hover:bg-[#a04a3e]",
            (status === "loading" || status === "success") && "opacity-75 cursor-not-allowed"
          )}
        >
          {status === "loading" ? "..." : status === "success" ? "Done!" : "Submit"}
        </button>
      </div>
      {status === "success" && (
        <p className="text-sm text-green-700 mt-2 absolute -bottom-6">Thank you for subscribing!</p>
      )}
    </form>
  )
}
