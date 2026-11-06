
import Link from 'next/link';
import Image from 'next/image';
import {
  MapPin,
  Star,
  ArrowRight,
  Clock,
} from 'lucide-react';

interface Studio {
  _id: string;
  title: string;
  category: string;
  hourlyRate: number;
  location: string;
  imageUrl: string;
  maxCapacity: number;
  rating?: number;
}

interface Props {
  searchParams: Promise<{
    category?: string;
  }>;
}

// Manually defined categories
const categories = [
  { name: 'All Categories', slug: 'all' },
  { name: 'Photo Studios', slug: 'photo-studio' },
  { name: 'Sound Stages', slug: 'sound-stage' },
  { name: 'Podcast Rooms', slug: 'podcast-room' },
  { name: 'Music Suites', slug: 'music-suite' },
  { name: 'Art Workshops', slug: 'art-workshop' },
];

const AllStudiosPage = async ({ searchParams }: Props) => {
  const { category } = await searchParams;

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/studios`, {
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error('Failed to fetch studios');
  }

  const response = await res.json();

  // Supports both an array and { result: [] } response
  const data: Studio[] = Array.isArray(response)
    ? response
    : response.result ?? [];

  // Filter studios using selected category
  const filteredStudios = !category || category === 'all'
    ? data
    : data.filter((studio) => {
        const studioSlug = studio.category
          .toLowerCase()
          .trim()
          .replace(/\s+/g, '-');

        return studioSlug === category;
      });

  const selectedCategory = categories.find(
    (item) => item.slug === category
  );

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-16">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-12 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary">
            Find Your Perfect Space
          </p>

          <h1 className="text-3xl font-bold text-gray-900 md:text-5xl">
            Explore Creative Studios
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-gray-500">
            Discover amazing creative spaces for photography,
            filmmaking, podcasting and more.
          </p>
        </div>

        {/* Category Filters */}
        <div className="mb-10 flex flex-wrap justify-center gap-3">
          {categories.map((item) => (
            <Link
              key={item.slug}
              href={
                item.slug === 'all'
                  ? '/studios'
                  : `/studios?category=${item.slug}`
              }
              className={`rounded-full border px-5 py-2.5 text-sm font-medium transition ${
                (category || 'all') === item.slug
                  ? 'border-black bg-black text-white'
                  : 'border-gray-200 bg-white text-gray-600 hover:border-black hover:text-black'
              }`}
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Results */}
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-800">
            {selectedCategory?.name || 'Available Studios'}
          </h2>

          <p className="text-sm text-gray-500">
            {filteredStudios.length}{' '}
            {filteredStudios.length === 1 ? 'Studio' : 'Studios'} found
          </p>
        </div>

        {/* Studio Grid */}
        {filteredStudios.length === 0 ? (
          <div className="rounded-xl border bg-white py-20 text-center">
            <h3 className="text-xl font-semibold text-gray-800">
              No Studios Available
            </h3>

            <p className="mt-2 text-gray-500">
              No studios found in this category.
            </p>

            <Link
              href="/studios"
              className="mt-5 inline-flex items-center gap-2 rounded-lg bg-black px-5 py-2.5 text-sm font-medium text-white hover:bg-gray-800"
            >
              Explore All Studios
              <ArrowRight size={16} />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">

            {filteredStudios.map((studio) => (
              <div
                key={studio._id}
                className="group overflow-hidden rounded-2xl border bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >

                {/* Image */}
                <div className="relative h-56 w-full overflow-hidden bg-gray-100">
                  {studio.imageUrl ? (
                    <Image
                      src={studio.imageUrl}
                      alt={studio.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-gray-400">
                      No Image Available
                    </div>
                  )}

                  <span className="absolute left-4 top-4 rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-gray-800 shadow-sm">
                    {studio.category}
                  </span>
                </div>

                {/* Content */}
                <div className="space-y-4 p-5">

                  <div>
                    <h3 className="line-clamp-1 text-xl font-bold text-gray-900">
                      {studio.title}
                    </h3>

                    <div className="mt-2 flex items-center gap-1.5 text-sm text-gray-500">
                      <MapPin size={16} className="shrink-0" />
                      <span className="line-clamp-1">
                        {studio.location}
                      </span>
                    </div>
                  </div>

                  {/* Rating & Capacity */}
                  <div className="flex items-center justify-between border-y py-3">
                    <div className="flex items-center gap-1.5">
                      <Star
                        size={17}
                        className="fill-yellow-400 text-yellow-400"
                      />
                      <span className="text-sm font-semibold text-gray-800">
                        {studio.rating ?? 'New'}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 text-sm text-gray-500">
                      <Clock size={16} />
                      <span>{studio.maxCapacity} Guests</span>
                    </div>
                  </div>

                  {/* Price & Button */}
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-xs text-gray-500">
                        Hourly Rate
                      </p>

                      <p className="text-xl font-bold text-gray-900">
                        ${studio.hourlyRate}
                        <span className="text-sm font-normal text-gray-500">
                          /hr
                        </span>
                      </p>
                    </div>

                    <Link
                      href={`/studios/${studio._id}`}
                      className="flex items-center gap-2 rounded-lg bg-black px-4 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800"
                    >
                      View Details
                      <ArrowRight size={16} />
                    </Link>
                  </div>

                </div>
              </div>
            ))}

          </div>
        )}
      </div>
    </div>
  );
};

export default AllStudiosPage;
