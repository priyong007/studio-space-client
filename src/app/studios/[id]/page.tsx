import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  MapPin,
  Star,
  Users,
  ShieldCheck,
  Clock,
  ArrowLeft,
} from 'lucide-react';
import ListCard from '@/component/mylistCard/page';
// import BookingModal from '@/component/BookingModal';

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
  userName?: string;
  userEmail?: string;
  rating?: number;
  reviews?: {
    _id: string;
    userName: string;
    rating: number;
    comment: string;
  }[];
}

const StudioDetailPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

  const res = await fetch(`http://localhost:8000/studios/${id}`, {
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error('Failed to fetch studio details');
  }

  const data = await res.json();

  const studio: Studio = data.result ?? data;

  const amenities = studio.amenities ?? [];
  const reviews = studio.reviews ?? [];

  return (
    <div className="min-h-screen bg-[#f7f8fa] px-4 py-8 md:py-12">
      <div className="mx-auto max-w-7xl">
        {/* Back Navigation */}
        <Link
          href="/studios"
          className="mb-8 inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-600 shadow-sm transition hover:border-gray-400 hover:text-black"
        >
          <ArrowLeft size={16} />
          Back to Studios
        </Link>

        {/* Header */}
        <div className="mb-8">
          <div className="mb-4 flex flex-wrap items-center gap-3">
            <span className="rounded-full bg-gray-800 px-4 py-1.5 text-xs font-semibold tracking-wide text-white">
              {studio.category}
            </span>

            <span className="flex items-center gap-1.5 text-sm text-gray-500">
              <MapPin size={16} />
              {studio.location}
            </span>
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-gray-950 md:text-5xl">
            {studio.title}
          </h1>

          <div className="mt-4 flex flex-wrap items-center gap-2 text-sm text-gray-500">
            <Star size={17} className="fill-amber-400 text-amber-400" />

            {studio.rating ? (
              <span className="font-semibold text-gray-900">
                {studio.rating} / 5
              </span>
            ) : (
              <span className="font-medium text-gray-700">New Workspace</span>
            )}

            <span className="text-gray-300">|</span>
            <span>{reviews.length} Reviews</span>
          </div>
        </div>

        {/* Single Studio Image */}
        {studio.imageUrl && (
          <div className="relative h-70 overflow-hidden rounded-3xl bg-gray-200 md:h-120">
            <Image
              src={studio.imageUrl}
              alt={studio.title}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 1200px"
              className="object-cover transition duration-700 hover:scale-105"
            />
          </div>
        )}

        {/* Main Content */}
        <div className="mt-12 grid items-start gap-10 lg:grid-cols-3">
          {/* Left Content */}
          <div className="space-y-10 lg:col-span-2">
            {/* Overview */}
            <section className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm md:p-8">
              <h2 className="text-2xl font-bold tracking-tight text-gray-950">
                About This Workspace
              </h2>

              <p className="mt-5 text-base leading-8 text-gray-600">
                {studio.overview}
              </p>
            </section>

            {/* Specifications */}
            <section>
              <div className="mb-5">
                <h2 className="text-2xl font-bold text-gray-950">
                  Workspace Specifications
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Everything you need to know before booking.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                {/* Capacity */}
                <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
                  <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                    <Users size={22} />
                  </div>

                  <p className="text-sm text-gray-500">Maximum Capacity</p>

                  <p className="mt-2 text-xl font-bold text-gray-950">
                    {studio.maxCapacity}
                    <span className="ml-1 text-sm font-normal text-gray-500">
                      People
                    </span>
                  </p>
                </div>

                {/* Hourly Rate */}
                <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
                  <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-green-50 text-green-600">
                    <Clock size={22} />
                  </div>

                  <p className="text-sm text-gray-500">Hourly Rate</p>

                  <p className="mt-2 text-xl font-bold text-gray-950">
                    ${studio.hourlyRate}
                    <span className="ml-1 text-sm font-normal text-gray-500">
                      /hr
                    </span>
                  </p>
                </div>

                {/* Security Deposit */}
                <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
                  <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
                    <ShieldCheck size={22} />
                  </div>

                  <p className="text-sm text-gray-500">Security Deposit</p>

                  <p className="mt-2 text-xl font-bold text-gray-950">
                    ${studio.securityDeposit}
                  </p>
                </div>
              </div>
            </section>

            {/* Amenities */}
            <section className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm md:p-8">
              <h2 className="text-2xl font-bold text-gray-950">
                Available Amenities
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Facilities available at this workspace.
              </p>

              {amenities.length > 0 ? (
                <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3">
                  {amenities.map((amenity) => (
                    <div
                      key={amenity}
                      className="flex items-center gap-3 rounded-xl bg-gray-50 p-4 transition hover:bg-gray-100"
                    >
                      <ShieldCheck
                        size={19}
                        className="shrink-0 text-green-600"
                      />

                      <span className="text-sm font-medium text-gray-700">
                        {amenity}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="mt-5 text-sm text-gray-500">
                  No amenities information available.
                </p>
              )}
            </section>

            {/* Host Details */}
            <section className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm md:p-8">
              <h2 className="text-2xl font-bold text-gray-950">
                Meet Your Host
              </h2>

              <div className="mt-6 flex items-center gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-gray-900 text-xl font-bold text-white">
                  {studio.userName?.charAt(0).toUpperCase() || 'H'}
                </div>

                <div className="min-w-0">
                  <h3 className="font-semibold text-gray-950">
                    {studio.userName || 'Studio Host'}
                  </h3>

                  <p className="mt-1 break-all text-sm text-gray-500">
                    {studio.userEmail || 'Host information unavailable'}
                  </p>
                </div>
              </div>
            </section>

            {/* Reviews */}
            <section id="reviews" className="scroll-mt-24">
              <h2 className="text-2xl font-bold text-gray-950">
                Guest Reviews
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Feedback from people who visited this workspace.
              </p>

              {reviews.length > 0 ? (
                <div className="mt-6 space-y-4">
                  {reviews.map((review) => (
                    <div
                      key={review._id}
                      className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm"
                    >
                      <div className="flex items-center justify-between gap-3">
                        <h3 className="font-semibold text-gray-900">
                          {review.userName}
                        </h3>

                        <div className="flex items-center gap-1 rounded-full bg-amber-50 px-3 py-1 text-sm font-semibold text-amber-700">
                          <Star
                            size={14}
                            className="fill-amber-400 text-amber-400"
                          />
                          {review.rating}
                        </div>
                      </div>

                      <p className="mt-4 text-sm leading-7 text-gray-600">
                        {review.comment}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="mt-6 rounded-2xl border border-dashed border-gray-300 bg-white p-8 text-center">
                  <Star size={28} className="mx-auto text-gray-300" />

                  <p className="mt-3 font-semibold text-gray-800">
                    No reviews yet
                  </p>

                  <p className="mt-1 text-sm text-gray-500">
                    Be the first to review this workspace!
                  </p>
                </div>
              )}
            </section>
          </div>

          {/* Booking Sidebar */}

        <ListCard studio={studio}/>
          
        </div>
      </div>
    </div>
  );
};

export default StudioDetailPage;
