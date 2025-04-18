'use client'
import { AlertCircle } from 'lucide-react'
import React, { useState } from 'react'

export default function NewsletterBox() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)
  const [alreadySubscribed, setAlreadySubscribed] = useState(false)

  const handleSubscribe = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!email) return

    // Reset notification states
    setSubscribed(false)
    setAlreadySubscribed(false)

    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })

      const data = await res.json()

      if (res.status === 409) {
        // Show already subscribed notification instead of alert
        setAlreadySubscribed(true)
        setTimeout(() => setAlreadySubscribed(false), 5000)
      } else if (res.ok) {
        setSubscribed(true)
        setEmail('')
        setTimeout(() => setSubscribed(false), 5000)
      } else {
        alert(data.error || 'Something went wrong. Please try again later.')
      }
    } catch (error) {
      alert('Failed to subscribe. Please try again later.')
      console.error(error)
    }
  }
  return (
    <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
      <h3 className="text-lg font-bold text-[#13589e] mb-3">Stay Updated</h3>
      <p className="text-gray-600 text-sm mb-4">
        Subscribe to our newsletter to get the latest updates.
      </p>
      <form onSubmit={handleSubscribe} className="space-y-3">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your email address"
          className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#13589e] text-sm"
          required
        />
        <button
          type="submit"
          className="w-full bg-[#13589e] hover:bg-[#0d4175] text-white font-medium py-3 px-4 rounded-lg transition duration-200"
        >
          Subscribe
        </button>

        {/* Success notification */}
        {subscribed && (
          <div className="mt-4 px-4 py-3 bg-[#b4d23d] bg-opacity-20 rounded-md border-l-4 border-[#b4d23d] animate-fade-in">
            <p className="text-white text-sm">
              Thank you for subscribing! We{"'"}ll be in touch soon.
            </p>
          </div>
        )}

        {/* Already subscribed notification */}
        {alreadySubscribed && (
          <div className="mt-4 px-4 py-3 bg-amber-500 bg-opacity-20 rounded-md border-l-4 border-amber-500 animate-fade-in flex items-start">
            <AlertCircle className="h-5 w-5 text-amber-500 mr-2 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-white text-sm font-medium">Already Subscribed</p>
              <p className="text-white/80 text-sm">
                This email is already in our subscriber list. Thank you for your continued interest!
              </p>
            </div>
          </div>
        )}
      </form>
    </div>
  )
}
