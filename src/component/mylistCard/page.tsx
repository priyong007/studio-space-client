'use client'
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

import React from "react";
import { toast } from "react-toastify";

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
}

interface ListCardProps {
  studio: Studio;
}

const ListCard = ({ studio }: ListCardProps) => {

    const router = useRouter();

      const { data: session } = authClient.useSession();
      const user = session?.user;
    console.log(studio)
    console.log(user)

const handleList = async (
  e: React.MouseEvent<HTMLButtonElement>
): Promise<void> => {
  e.preventDefault();

  try {
    const { _id, ...rest } = studio;

    const data = {
      ...rest,
      studioId: _id,
      email:user?.email
    };

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/listing`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const listData = await res.json();

    if (res.ok) {
      toast.success("Studio added to your list successfully!");
      router.push("/my-listing");
    } else {
      toast.error(listData.message || "Failed to add studio!");
    }
  } catch (error) {
    console.error("Error:", error);
    alert("Something went wrong!");
  }
};

const handleBook = async () => {
  try {
    const { _id, ...rest } = studio;

    const bookingData = {
      ...rest,
      studioId: _id,
      email:user?.email
    };

    const res = await fetch("http://localhost:8000/booking", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bookingData),
    });

    const result = await res.json();

    if (res.ok) {
      toast.success("Studio added to your booking successfully!");
      router.push("/my-booking");
    } else {
      toast.error(result.message || "Booking failed!");
    }
  } catch (error) {
    console.error(error);
    toast.info("Something went wrong!");
  }
};

  return (
    <aside className="lg:sticky lg:top-24">
      <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-lg">
        {/* Price Header */}
        <div className="bg-orange-500 p-7 text-white">
          <p className="text-sm text-orange-100">Starting from</p>

          <h2 className="mt-2 text-4xl font-bold tracking-tight">
            ${studio.hourlyRate}
            <span className="ml-1 text-base font-normal text-orange-100">
              / hour
            </span>
          </h2>

          <p className="mt-3 text-sm text-orange-100">
            Book your creative space with ease.
          </p>
        </div>

        {/* Booking Information */}
        <div className="p-6">
          <div className="space-y-5">
            <div className="flex items-center justify-between gap-3 text-sm">
              <span className="text-gray-500">Security Deposit</span>
              <span className="font-semibold text-gray-900">
                ${studio.securityDeposit}
              </span>
            </div>

            <div className="flex items-center justify-between gap-3 text-sm">
              <span className="text-gray-500">Maximum Capacity</span>
              <span className="font-semibold text-gray-900">
                {studio.maxCapacity} People
              </span>
            </div>

            <div className="flex items-center justify-between gap-3 text-sm">
              <span className="text-gray-500">Category</span>
              <span className="font-semibold text-gray-900">
                {studio.category}
              </span>
            </div>
          </div>

          <div className="my-6 border-t border-gray-100" />
        

          <div className="flex gap-2">

            <button type="button"
    onClick={handleList} className="mx-auto flex items-center justify-center gap-2 rounded-xl bg-orange-500 px-8 py-3 font-semibold text-white shadow-lg shadow-orange-200 transition-all duration-300 hover:-translate-y-1 hover:bg-orange-600 hover:shadow-xl active:scale-95">
            Add to my list
          </button>


          <button type="button"
          onClick={handleBook}
           className="mx-auto flex items-center justify-center gap-2 rounded-xl bg-orange-500 px-8 py-3 font-semibold text-white shadow-lg shadow-orange-200 transition-all duration-300 hover:-translate-y-1 hover:bg-orange-600 hover:shadow-xl active:scale-95">
            Add to book
          </button>

          </div>

          

        </div>
      </div>
    </aside>
  );
};

export default ListCard;