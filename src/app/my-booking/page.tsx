import CancelBookingButton from "@/component/CancelBooking";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Image from "next/image";

type Booking = {
  _id: string;
  imageUrl: string;
  title: string;
  category: string;
  location: string;
  hourlyRate: number;
  securityDeposit: number;
  username: string;
};

const MyBookingPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const user = session?.user;

  if (!user) {
    return <p>Please login first!</p>;
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/my-booking/${user.email}`,
    { cache: "no-store" }

  );
  console.log(" user email",user.email)

  const bookingData: Booking[] = await res.json();
  console.log("booking data ",bookingData)

  return (
    <div className="min-h-screen bg-[#fafafa] px-4 py-10 sm:px-6">
    <div className="mx-auto max-w-6xl">

      {/* Header */}
      <div className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
        <div>
          <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-orange-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-orange-600">
            <span className="h-2 w-2 rounded-full bg-orange-500" />
            Production Schedule
          </div>

          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            My Studio Bookings
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Track your reservations and manage your studio bookings.
          </p>
        </div>

        <a
          href="/studios"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-orange-500 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-orange-600"
        >
          Explore More Studios
          <span>→</span>
        </a>
      </div>

      {/* Booking Count */}
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-lg font-bold text-gray-800">
          Your Reservations
        </h2>

        <span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-bold text-orange-600">
          {bookingData.length} Bookings
        </span>
      </div>

      {/* Booking List */}
      {bookingData.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-gray-300 bg-white px-6 py-16 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-orange-50 text-3xl">
            🎬
          </div>

          <h2 className="text-xl font-bold text-gray-900">
            No bookings yet!
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            Explore our studios and book your perfect creative space.
          </p>

          <a
            href="/studios"
            className="mt-6 inline-block rounded-xl bg-orange-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-orange-600"
          >
            Explore Studios
          </a>
        </div>
      ) : (
        <div className="space-y-4">
          {bookingData.map((booking) => (
            <div
              key={booking._id}
              className="group flex flex-col gap-5 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm transition duration-300 hover:border-orange-200 hover:shadow-md sm:flex-row sm:items-center sm:p-5"
            >
              {/* Studio Image */}
              <div className="relative h-48 w-full shrink-0 overflow-hidden rounded-xl bg-gray-100 sm:h-28 sm:w-32">
                <Image
                  width={300}
                  height={200}
                  src={booking.imageUrl}
                  alt={booking.title}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
              </div>

              {/* Booking Information */}
              <div className="min-w-0 flex-1">
                <div className="mb-2 flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-orange-50 px-3 py-1 text-xs font-semibold text-orange-600">
                    {booking.category}
                  </span>

                  <span className="text-xs text-gray-400">
                    ID: #{booking._id.slice(-6)}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-gray-900 transition group-hover:text-orange-600 sm:text-xl">
                  {booking.title}
                </h3>

                <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-500">
                  <span className="flex items-center gap-1.5">
                    <span>📍</span>
                    {booking.location}
                  </span>

                  <span className="flex items-center gap-1.5">
                    <span>🕒</span>
                    ${booking.hourlyRate} / hour
                  </span>
                </div>

                <p className="mt-2 text-xs text-gray-400">
                  Booked By: {booking.username}
                </p>
              </div>

              {/* Price Information */}
              <div className="flex items-center justify-between border-t border-gray-100 pt-4 sm:min-w-36 sm:flex-col sm:items-end sm:justify-center sm:border-l sm:border-t-0 sm:pl-5 sm:pt-0">
                <div className="sm:text-right">
                  <p className="text-xs font-medium text-gray-400">
                    Hourly Rate
                  </p>

                  <p className="mt-1 text-2xl font-extrabold text-orange-500">
                    ${booking.hourlyRate}
                  </p>

                  <p className="mt-2 text-xs text-gray-500">
                    Deposit: ${booking.securityDeposit}
                  </p>
                </div>

                <CancelBookingButton bookingId={booking._id}/>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Footer */}
      <div className="mt-8 rounded-2xl bg-orange-50 p-5">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="font-bold text-gray-900">
              Need another creative space?
            </h3>
            <p className="mt-1 text-sm text-gray-600">
              Find the perfect studio for your next project.
            </p>
          </div>

          <a
            href="/studios"
            className="text-sm font-bold text-orange-600 hover:text-orange-700"
          >
            Browse Studios →
          </a>
        </div>
      </div>

    </div>
  </div>
  );
};

export default MyBookingPage;