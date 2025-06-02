import { BrainCircuit, FileOutput, FileText, LucideIcon } from 'lucide-react';
import React from 'react'

interface Feature {
    title: string;
    description: string;
    icon: LucideIcon;
  }
  
  const features: Feature[] = [
    {
      title: "Quick Setup",
      description:
        "Simply drag and drop your paper work or click upload and we will do the rest",
      icon: FileText,
    },
    {
      title: "AI Analysis",
      description:
        "Our advanced AI processes and analyzes your all paper work instantly",
      icon: BrainCircuit,
    },
    {
      title: "Get Summary",
      description:
        "Recieve a concise summary of your paper work in seconds and download it",
      icon: FileOutput,
    },
  ];
  
export default function HowItWorksSection() {
  return (
    <section className='py-12 lg:py-24 px-4 sm:px-6 bg-gray-50' id='features'>
        <div className="max-w-5xl mx-auto">

        {/* Title and Description */}
        <div className="text-center mb-16">
          <h3 className="text-base uppercase font-bold tracking-tight sm:text-xl mb-4 text-rose-500">
            How It Works
          </h3>
          <p className="text-3xl font-bold max-w-2xl mx-auto">
            Transform any pdf into an easy-to-digest summary in three simple steps 
          </p>
        </div>
        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
              {features.map((feature, index) => {
                  const Icon = feature.icon;
                  return (
                      <div
                      key={index}
                      className="flex flex-col items-center text-center hover:border rounded-2xl p-4"
                      >
                    <div className="h-16 w-16 bg-rose-50 rounded-2xl flex items-center justify-center mb-6">
                      <Icon className="h-8 w-8 text-rose-500" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                );
            })}
            </div>
            </div>
    </section>
  )
}
