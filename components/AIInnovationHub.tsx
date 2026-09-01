
"use client";

import React from "react";
import { Carousel, Card } from "@/components/ui/apple-cards-carousel";

export function AIInnovationHub() {
  const cards = data.map((card, index) => (
    <Card key={card.title} card={card} index={index} />
  ));

  return (
    <section className="w-full py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-neutral-800 dark:text-neutral-200 md:text-5xl">
          AI & Innovation <span className="rounded-lg border border-blue-700 bg-blue-600 px-2 py-1 text-white">Hub</span>
        </h2>

        <p className="mt-4 text-base text-neutral-600 dark:text-neutral-400 md:text-lg">
          Intelligent solutions designed to transform enterprise operations,
          accelerate innovation, and unlock new possibilities.
        </p>
      </div>

      <div className="mx-auto max-w-7xl">
        <Carousel items={cards} />
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* Card Content                                                               */
/* -------------------------------------------------------------------------- */

const CardContent = ({
  category,
  description,
}: {
  category: string;
  description: string;
}) => {
  return (
    <div className="rounded-3xl bg-neutral-100 p-8 dark:bg-neutral-800 md:p-14">
      <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
        {category}
      </p>

      <p className="max-w-3xl text-base leading-relaxed text-neutral-600 dark:text-neutral-300 md:text-2xl">
        {description}
      </p>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* AI Solutions                                                               */
/* -------------------------------------------------------------------------- */

const data = [
  {
    category: "Generative AI",

    title: "Create novel content, code, and designs.",

    // description:
    //   "Create novel content, code, and designs autonomously with fine-tuned foundation models.",

    src: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1600&auto=format&fit=crop",

    content: (
      <CardContent
        category="Generative AI"
        description="Create novel content, code, and designs autonomously with fine-tuned foundation models."
      />
    ),
  },

  {
    category: "AI Agents",

    title: "Autonomous intelligence for enterprise.",

    // description:
    //   "Deploy autonomous agents that reason, plan, and execute complex multi-step enterprise workflows.",

    src: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=1600&auto=format&fit=crop",

    content: (
      <CardContent
        category="AI Agents"
        description="Deploy autonomous agents that reason, plan, and execute complex multi-step enterprise workflows."
      />
    ),
  },

  {
    category: "Enterprise Automation",

    title: "Automate complex business processes.",

    // description:
    //   "Streamline legacy processes with intelligent RPA and cognitive automation pipelines.",

    src: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1600&auto=format&fit=crop",

    content: (
      <CardContent
        category="Enterprise Automation"
        description="Streamline legacy processes with intelligent RPA and cognitive automation pipelines."
      />
    ),
  },

  {
    category: "Retrieval-Augmented Gen",

    title: "Ground AI in your enterprise data.",

    // description:
    //   "Ground LLM responses in your proprietary enterprise data for hallucination-free insights.",

    src: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1600&auto=format&fit=crop",

    content: (
      <CardContent
        category="Retrieval-Augmented Gen"
        description="Ground LLM responses in your proprietary enterprise data for hallucination-free insights."
      />
    ),
  },

  {
    category: "LLM Integration",

    title: "Embed intelligence into your products.",

    description:
      "Seamlessly embed state-of-the-art language models into your existing applications and products.",

    src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1600&auto=format&fit=crop",

    content: (
      <CardContent
        category="LLM Integration"
        description="Seamlessly embed state-of-the-art language models into your existing applications and products."
      />
    ),
  },

  {
    category: "AI Chatbots",

    title: "Conversational AI that understands.",

    // description:
    //   "Deliver 24/7 intelligent customer and employee support with context-aware conversational AI.",

    src: "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=1600&auto=format&fit=crop",

    content: (
      <CardContent
        category="AI Chatbots"
        description="Deliver 24/7 intelligent customer and employee support with context-aware conversational AI."
      />
    ),
  },

  {
    category: "Computer Vision",

    title: "Turn visual data into intelligence.",

    // description:
    //   "Extract actionable intelligence from images and video for quality control and security.",

    src: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1600&auto=format&fit=crop",

    content: (
      <CardContent
        category="Computer Vision"
        description="Extract actionable intelligence from images and video for quality control and security."
      />
    ),
  },

  {
    category: "Predictive Analytics",

    title: "Predict trends before they happen.",

    // description:
    //   "Forecast trends, detect anomalies, and optimize supply chains with advanced machine learning.",

    src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1600&auto=format&fit=crop",

    content: (
      <CardContent
        category="Predictive Analytics"
        description="Forecast trends, detect anomalies, and optimize supply chains with advanced machine learning."
      />
    ),
  },
];