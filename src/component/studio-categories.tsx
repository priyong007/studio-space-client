
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const categories = [
  {
    id: 1,
    name: "Photo Studios",
    slug: "photo-studios",
    description: "Perfect spaces for every shot.",
    image:
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=80",
    count: "120+ Spaces",
  },
  {
    id: 2,
    name: "Sound Stages",
    slug: "sound-stages",
    description: "Bring your productions to life.",
    image:
      "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=1200&q=80",
    count: "80+ Spaces",
  },
  {
    id: 3,
    name: "Podcast Rooms",
    slug: "podcast-rooms",
    description: "Make your voice heard.",
    image:
      "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=1200&q=80",
    count: "65+ Spaces",
  },
  {
    id: 4,
    name: "Music Suites",
    slug: "music-suites",
    description: "Create your next masterpiece.",
    image:
      "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=1200&q=80",
    count: "90+ Spaces",
  },
  {
    id: 5,
    name: "Art Workshops",
    slug: "art-workshops",
    description: "A home for creative minds.",
    image:
      "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?auto=format&fit=crop&w=1200&q=80",
    count: "50+ Spaces",
  },
];

export default function StudioCategories() {
  return (
    <section className="bg-background px-4 py-14 sm:px-6 sm:py-20 lg:px-16 lg:py-12">
      <div className="mx-auto max-w-7xl">

        {/* Section Heading */}
        <div className="mb-8 flex flex-col justify-between gap-5 sm:mb-12 md:flex-row md:items-end">
          <div>
            <span className="mb-3 block text-[10px] font-bold uppercase tracking-[3px] text-primary sm:text-xs">
              Find Your Perfect Space
            </span>

            <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl lg:text-5xl">
              Browse by Studio
              <span className="text-primary"> Categories.</span>
            </h2>

            <p className="mt-3 max-w-xl text-sm leading-7 text-muted-foreground sm:mt-4 sm:text-base">
              Explore unique creative spaces designed to inspire
              your next big project.
            </p>
          </div>

          <Link
            href="/studios"
            className="inline-flex w-fit items-center gap-2 text-sm font-semibold text-foreground transition hover:text-primary"
          >
            View All Studios
            <ArrowUpRight size={18} />
          </Link>
        </div>

        {/* Category Cards */}
        
{/* Category Cards */}
<div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-5 lg:gap-5">
  {categories.map((category) => (
    <Link
      key={category.id}
      href={`/studios?category=${encodeURIComponent(category.slug)}`}
      className="group relative isolate aspect-square w-full overflow-hidden rounded-xl bg-muted sm:rounded-2xl"
    >
      {/* Background Image */}
      <Image
        src={category.image}
        alt={category.name}
        fill
        unoptimized
        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
        className="object-cover transition-transform duration-700 group-hover:scale-110"
      />

      {/* Image Overlay */}
      <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/20 to-black/10 transition-all duration-300 group-hover:from-black/90" />

      {/* Card Content */}
      <div className="absolute inset-0 flex flex-col justify-between p-3 sm:p-5 lg:p-6">
        <div className="flex items-start justify-between gap-1">
          <span className="rounded-full border border-white/30 bg-white/10 px-2 py-1 text-[9px] font-medium text-white backdrop-blur-md sm:px-3 sm:py-1.5 sm:text-xs">
            {category.count}
          </span>

          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/50 text-white transition-all duration-300 group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground sm:h-10 sm:w-10">
            <ArrowUpRight
              size={18}
              className="transition-transform duration-300 group-hover:rotate-45"
            />
          </span>
        </div>

        <div>
          <p className="mb-1 text-[10px] text-white/70 sm:mb-2 sm:text-xs lg:text-sm">
            {category.description}
          </p>

          <h3 className="text-sm font-bold text-white sm:text-lg lg:text-xl">
            {category.name}
          </h3>

          <div className="mt-3 h-0.5 w-8 rounded-full bg-primary transition-all duration-300 group-hover:w-16" />
        </div>
      </div>
    </Link>
  ))}
</div>

      </div>
    </section>
  );
}
