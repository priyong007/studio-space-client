
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
} from "lucide-react";

const slides = [
  {
    title: "Where Creativity Finds Its Space.",
    description:
      "Discover inspiring studios and unique creative spaces designed to bring your biggest ideas to life.",
    image: "/images/studio-1.jpg",
    tag: "FIND YOUR CREATIVE SPACE",
  },
  {
    title: "Make Room for Your Next Big Idea.",
    description:
      "Find beautiful and modern workspaces that inspire creativity and productivity.",
    image: "/images/studio-2.jpg",
    tag: "DESIGNED FOR CREATORS",
  },
  {
    title: "Turn Your Space Into Opportunity.",
    description:
      "Share your creative space with a community of passionate people.",
    image: "/images/studio-3.jpg",
    tag: "YOUR SPACE, YOUR STORY",
  },
  {
    title: "Find a Space That Inspires You.",
    description:
      "Explore unique locations and make every creative project unforgettable.",
    image: "/images/studio-4.jpg",
    tag: "EXPLORE WITHOUT LIMITS",
  },
];

export default function StudioHero() {
  const [current, setCurrent] = useState(0);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrent(
      (prev) => (prev - 1 + slides.length) % slides.length
    );
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative h-162 w-full overflow-hidden bg-foreground md:h-187">

      {slides.map((slide, index) => (
        <div
          key={slide.title}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            current === index
              ? "opacity-100"
              : "pointer-events-none opacity-0"
          }`}
        >
          <Image
            src={slide.image}
            alt="Creative studio interior"
            fill
            priority={index === 0}
            sizes="100vw"
            className="object-cover"
          />

          <div className="absolute inset-0 bg-foreground/60" />
          <div className="absolute inset-0 bg-linear-to-r from-foreground/80 to-transparent" />

          <div className="relative z-10 mx-auto flex h-full max-w-7xl items-center px-6 sm:px-10 lg:px-16">
            <div className="max-w-3xl">

              <span className="mb-6 inline-block rounded-full border border-background/30 bg-background/10 px-5 py-2 text-xs font-semibold tracking-[3px] text-background backdrop-blur-md">
                {slide.tag}
              </span>

              <h1 className="mb-6 text-4xl font-bold leading-tight text-background sm:text-5xl md:text-6xl lg:text-7xl">
                {slide.title}
              </h1>

              <p className="mb-9 max-w-xl text-base leading-8 text-background/80 md:text-lg">
                {slide.description}
              </p>

              <div className="flex flex-col gap-4 sm:flex-row">
                <Link
                  href="/studios"
                  className="flex items-center justify-center gap-3 rounded-lg bg-primary px-7 py-4 font-semibold text-primary-foreground transition hover:opacity-90"
                >
                  Explore Studios
                  <ArrowRight size={18} />
                </Link>

                <Link
                  href="/studios"
                  className="flex items-center justify-center gap-3 rounded-lg border border-background/60 px-7 py-4 font-semibold text-background transition hover:bg-background hover:text-foreground"
                >
                  Host Your Space
                  <ArrowUpRight size={18} />
                </Link>
              </div>

            </div>
          </div>
        </div>
      ))}

      {/* Navigation */}
      <div className="absolute bottom-10 right-6 z-20 flex items-center gap-4 md:right-16">

        <button
          onClick={prevSlide}
          aria-label="Previous slide"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-background/50 text-background transition hover:bg-background hover:text-foreground"
        >
          <ArrowLeft size={20} />
        </button>

        <div className="flex items-center gap-2">
          {slides.map((slide, index) => (
            <button
              key={slide.title}
              onClick={() => setCurrent(index)}
              aria-label={`Go to slide ${index + 1}`}
              aria-current={current === index ? "true" : undefined}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                current === index
                  ? "w-10 bg-background"
                  : "w-5 bg-background/50"
              }`}
            />
          ))}
        </div>

        <button
          onClick={nextSlide}
          aria-label="Next slide"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-background/50 text-background transition hover:bg-background hover:text-foreground"
        >
          <ArrowRight size={20} />
        </button>

      </div>

    </section>
  );
}

