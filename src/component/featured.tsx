'use client'
import Image from "next/image";

interface Studio {
  _id: string;
  title: string;
  category: string;
  hourlyRate: number | string;
  securityDeposit: number | string;
  maxCapacity: number | string;
  location: string;
  imageUrl: string;
  overview: string;
  amenities?: string[];
  username?: string;
  email?: string;
}

interface Props {
  searchParams?: Promise<{
    category?: string;
  }>;
}

// const categories = [
//   {
//     name: "All",
//     slug: "all",
//   },
//   {
//     name: "Photo Studio",
//     slug: "photo-studio",
//   },
//   {
//     name: "Film Stage",
//     slug: "film-stage",
//   },
//   {
//     name: "Podcast Lounge",
//     slug: "podcast-lounge",
//   },
//   {
//     name: "Music Suite",
//     slug: "music-suite",
//   },
//   {
//     name: "Workshop",
//     slug: "workshop",
//   },
//   {
//     name: "Event Space",
//     slug: "event-space",
//   },
//   {
//     name: "Creative Studio",
//     slug: "creative-studio",
//   },
// ];

const FeatureSection = async ({ searchParams }: Props) => {
  // searchParams undefined hole empty object use korbe
  const { category } = (await searchParams) ?? {};

  let data: Studio[] = [];

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/studios`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch studios");
    }

    const result = await res.json();

    data = Array.isArray(result)
      ? result
      : Array.isArray(result.result)
        ? result.result
        : [];
  } catch (error) {
    console.error("Studio fetch error:", error);
  }

  // Category filter
  const filteredStudios = data.filter((studio) => {
    if (!category || category === "all") {
      return true;
    }

    const studioCategory = studio.category
      ?.toLowerCase()
      .trim()
      .replace(/\s+/g, "-");

    return studioCategory === category;
  });

  // Maximum 6 ta card show korbe
  const limitedStudios = filteredStudios.slice(0, 6);

  return (
    <section className="py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Section Heading */}

        {/* <div className="mb-10 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary">
            Explore Our Spaces
          </p>

          <h2 className="text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">
            Featured Creative Studios
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-gray-500">
            Discover the perfect creative space for your next project.
          </p>
        </div> */}

        {/* Category Filter */}

        {/* <div className="mb-10 flex flex-wrap justify-center gap-3">
          {categories.map((item) => (
            <a
              key={item.slug}
              href={
                item.slug === "all"
                  ? "/studios"
                  : `/studios?category=${item.slug}`
              }
              className={`rounded-full border px-5 py-2 text-sm font-medium transition ${
                (category || "all") === item.slug
                  ? "border-primary bg-primary text-white"
                  : "border-gray-200 bg-white text-gray-600 hover:border-primary hover:text-primary"
              }`}
            >
              {item.name}
            </a>
          ))}
        </div> */}

        {/* Studio Cards */}
        {limitedStudios.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {limitedStudios.map((studio) => (
              <div
                key={studio._id}
                className="group overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                {/* Image */}
                <div className="relative h-56 overflow-hidden">
                  <Image
                  width={200}
                  height={200}
                    src={studio.imageUrl}
                    alt={studio.title}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />

                  <span className="absolute left-4 top-4 rounded-full bg-white px-3 py-1 text-xs font-semibold text-gray-800 shadow">
                    {studio.category}
                  </span>
                </div>

                {/* Card Content */}
                <div className="p-5">
                  <h3 className="mb-2 text-xl font-bold text-gray-900">
                    {studio.title}
                  </h3>

                  <p className="mb-4 flex items-center gap-2 text-sm text-gray-500">
                    <span>📍</span>
                    {studio.location}
                  </p>

                  <div className="mb-5 flex items-center justify-between">
                    <div>
                      <p className="text-xs text-gray-500">Hourly Rate</p>
                      <p className="text-lg font-bold text-primary">
                        ${studio.hourlyRate}
                        <span className="text-sm font-normal text-gray-500">
                          /hour
                        </span>
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-gray-500">Capacity</p>
                      <p className="font-semibold text-gray-800">
                        {studio.maxCapacity} People
                      </p>
                    </div>
                  </div>

                  <a
                    href={`/studios/${studio._id}`}
                    className="block rounded-lg bg-primary px-4 py-3 text-center text-sm font-semibold text-white transition hover:opacity-90"
                  >
                    View Details
                  </a>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-16 text-center">
            <h3 className="text-xl font-semibold text-gray-800">
              No Studios Found
            </h3>

            <p className="mt-2 text-gray-500">
              No studios are available in this category.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default FeatureSection;