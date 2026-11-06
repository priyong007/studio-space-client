
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const CancelBookingButton = ({ bookingId }: { bookingId: string }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleCancelBooking = async () => {
    const confirmCancel = window.confirm(
      "Are you sure you want to cancel this booking?"
    );

    if (!confirmCancel) return;

    try {
      setLoading(true);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/my-booking/${bookingId}`,
        {
          method: "DELETE",
        }
      );

      if (!res.ok) {
        throw new Error("Failed to cancel booking");
      }

      toast.success("Booking cancelled successfully!");

      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleCancelBooking}
      disabled={loading}
      className="mt-0 rounded-lg border border-red-200 bg-red-50 px-4 py-2 text-xs font-semibold text-red-600 transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-50 sm:mt-4"
    >
      {loading ? "Cancelling..." : "Cancel Booking"}
    </button>
  );
};

export default CancelBookingButton;
