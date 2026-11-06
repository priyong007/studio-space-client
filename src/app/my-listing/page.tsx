import ListingActions from '@/component/ListingActions';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import Image from 'next/image';
import Link from 'next/link';

interface Studio {
  _id: string;
  title: string;
   studioId: string;
  category: string;
  hourlyRate: number;
  securityDeposit: number;
  maxCapacity: number;
  location: string;
  imageUrl: string;
  overview: string;
  amenities?: string[];
  username?: string;
  email?: string;
}

const MyListingPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const user = session?.user;

  if (!user) {
    return <div>Please login first!</div>;
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/my-listing/${user.email}`,
    {
      cache: 'no-store',
    },
  );

  if (!res.ok) {
    throw new Error('Failed to fetch my listings');
  }

  const response = await res.json();

  const listingData: Studio[] = Array.isArray(response)
    ? response
    : (response.result ?? []);

  console.log({listingData});

  return (
    <div className="min-h-screen bg-[#fafafa] px-4 py-10 md:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
          <div>
            <span className="inline-block rounded-md bg-amber-100 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-amber-600">
              Host Workspace Manager
            </span>

            <h1 className="mt-2 text-2xl font-extrabold tracking-tight text-gray-900 md:text-3xl">
              My Studio Listings
            </h1>

            <p className="mt-1 text-xs text-gray-500">
              Manage your published creative production spaces, rates, and
              listings.
            </p>
          </div>

          <Link
            href="/add-studio"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-amber-500 px-5 py-3 text-xs font-bold text-gray-950 shadow-sm transition hover:bg-amber-600"
          >
            <span className="text-base">⊕</span>
            Add New Studio
          </Link>
        </div>

        {/* Listings */}
        {listingData.length === 0 ? (
          <div className="rounded-xl border border-gray-200 bg-white py-16 text-center shadow-sm">
            <h2 className="text-lg font-bold text-gray-800">
              No Studio Listings Yet
            </h2>
            <p className="mt-2 text-sm text-gray-500">
              Start by adding your first creative workspace.
            </p>
            <Link
              href="/add-studio"
              className="mt-5 inline-block rounded-lg bg-amber-500 px-5 py-2.5 text-sm font-semibold text-black hover:bg-amber-600"
            >
              Add Studio
            </Link>
          </div>
        ) : (
          <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
            {/* Desktop Table */}
            <div className="hidden overflow-x-auto md:block">
              <table className="w-full text-left">
                <thead className="border-b border-gray-200 bg-gray-50">
                  <tr className="text-[10px] font-bold uppercase tracking-wider text-gray-500">
                    <th className="px-5 py-4">Studio Space</th>
                    <th className="px-4 py-4">Category</th>
                    <th className="px-4 py-4">Hourly Rate</th>
                    <th className="px-4 py-4">Deposit</th>
                    <th className="px-4 py-4">Capacity</th>
                    <th className="px-5 py-4 text-center">Actions</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-100">
                  {listingData.map((studio) => (
                    <tr
                      key={studio._id}
                      className="transition hover:bg-gray-50"
                    >
                      {/* Studio Info */}
                      <td className="px-5 py-4">
                        <div className="flex min-w-60 items-center gap-3">
                          <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-lg bg-gray-100">
                            <Image
                              src={studio.imageUrl}
                              alt={studio.title}
                              fill
                              sizes="44px"
                              className="object-cover"
                            />
                          </div>

                          <div className="min-w-0">
                            <h3 className="truncate text-xs font-bold text-gray-900">
                              {studio.title}
                            </h3>
                            <p className="mt-1 truncate text-[10px] text-gray-400">
                              {studio.location}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Category */}
                      <td className="px-4 py-4">
                        <span className="whitespace-nowrap rounded-full bg-gray-100 px-2.5 py-1 text-[10px] font-medium text-gray-600">
                          {studio.category}
                        </span>
                      </td>

                      {/* Hourly Rate */}
                      <td className="px-4 py-4">
                        <span className="whitespace-nowrap text-xs font-bold text-amber-600">
                          ${studio.hourlyRate}/hr
                        </span>
                      </td>

                      {/* Deposit */}
                      <td className="px-4 py-4 text-xs text-gray-600">
                        ${studio.securityDeposit}
                      </td>

                      {/* Capacity */}
                      <td className="px-4 py-4 text-xs text-gray-600">
                        {studio.maxCapacity} people
                      </td>

                      {/* Actions */}
                      <td className="px-5 py-4">
                        <ListingActions id={studio.studioId} studioData={studio} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards */}

            <div className="divide-y divide-gray-100 md:hidden">
  {listingData.map((studio) => (
    <div key={studio._id} className="p-4">
      <div className="flex items-start gap-3">
        <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-gray-100">
          <Image
            src={studio.imageUrl}
            alt={studio.title}
            fill
            sizes="64px"
            className="object-cover"
          />
        </div>

        <div className="min-w-0 flex-1">
          <h3 className="truncate text-sm font-bold text-gray-900">
            {studio.title}
          </h3>
          <p className="mt-0.5 truncate text-xs text-gray-400">
            {studio.location}
          </p>
          <span className="mt-2 inline-block rounded-full bg-gray-100 px-2.5 py-1 text-[10px] font-medium text-gray-600">
            {studio.category}
          </span>
        </div>
      </div>

      <div className="mt-3 grid grid-cols-3 gap-2 rounded-lg bg-gray-50 p-3 text-center">
        <div>
          <p className="text-[10px] uppercase text-gray-400">Rate</p>
          <p className="text-xs font-bold text-amber-600">
            ${studio.hourlyRate}/hr
          </p>
        </div>
        <div>
          <p className="text-[10px] uppercase text-gray-400">Deposit</p>
          <p className="text-xs font-semibold text-gray-700">
            ${studio.securityDeposit}
          </p>
        </div>
        <div>
          <p className="text-[10px] uppercase text-gray-400">Capacity</p>
          <p className="text-xs font-semibold text-gray-700">
            {studio.maxCapacity}
          </p>
        </div>
      </div>

      <div className="mt-3 flex justify-end">
        <ListingActions id={studio._id} />
      </div>
    </div>
  ))}
</div>

          </div>
        )}
      </div>
    </div>
  );
};

export default MyListingPage;
