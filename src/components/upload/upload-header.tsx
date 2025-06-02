import React from 'react'
import HeroBadge from '../landing/hero/hero-badge'
import { Sparkles } from 'lucide-react'

export default function UploadHeader() {
  return (
    <div className="flex flex-col items-center justify-center gap-5 text-center">
          <div className="flex items-center justify-center">
            <HeroBadge
              text="AI powered content creation"
              icon={<Sparkles className="h-4 w-4 text-rose-600" />}
              endIcon={<></>}
              className="text-rose-500"
            />
          </div>
          <h2 className={`text-4xl tracking-tighter font-geist md:text-5xl font-semibold`}
          >
            Start Uploading 
            <span className="ml-2 text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-pink-500 to-pink-800 dark:from-purple-300 dark:to-orange-200">
            Your PDFs
            </span>
          </h2>
          <p className="text-gray-700 max-w-2xl">Upload your PDF and let our AI do the magic! ✨</p>
        </div>
  )
}
