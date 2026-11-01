
'use client';

import { useState } from 'react';
import { CalendarDays, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface BookingModalProps {
  studio: {
    _id: string;
    title: string;
    hourlyRate: number | string;
    securityDeposit: number | string;
  };
}

const BookingModal = ({ studio }: BookingModalProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [hours, setHours] = useState('1');

  const hourlyRate = Number(studio.hourlyRate);
  const securityDeposit = Number(studio.securityDeposit);

  const totalPrice =
    hourlyRate * Number(hours) + securityDeposit;

  const handleBooking = () => {
    if (!date || !startTime || Number(hours) < 1) {
      alert('Please complete all booking details!');
      return;
    }

    const bookingData = {
      studioId: studio._id,
      studioTitle: studio.title,
      date,
      startTime,
      hours: Number(hours),
      hourlyRate,
      securityDeposit,
      totalPrice,
    };

    console.log('Booking Data:', bookingData);

    alert('Booking details are ready!');

    setIsOpen(false);
  };

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        className="w-full bg-orange-600"
      >
        Book {studio.title} Now
      </Button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">

          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">

            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold">
                  Book Workspace
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                  {studio.title}
                </p>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="text-2xl text-gray-500 hover:text-black"
                aria-label="Close booking modal"
              >
                &times;
              </button>
            </div>

            <div className="space-y-5">

              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium">
                  <CalendarDays size={17} />
                  Booking Date
                </label>

                <Input
                  type="date"
                  min={new Date().toLocaleDateString('en-CA')}
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium">
                  <Clock size={17} />
                  Start Time
                </label>

                <Input
                  type="time"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Booking Duration (Hours)
                </label>

                <Input
                  type="number"
                  min="1"
                  value={hours}
                  onChange={(e) => setHours(e.target.value)}
                />
              </div>

              {/* Price Summary */}
              <div className="space-y-3 rounded-xl bg-gray-50 p-4">

                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">
                    Hourly Rate × {hours || 0}
                  </span>
                  <span>${hourlyRate * Number(hours || 0)}</span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">
                    Security Deposit
                  </span>
                  <span>${securityDeposit}</span>
                </div>

                <div className="flex justify-between border-t pt-3 font-bold">
                  <span>Total Amount</span>
                  <span>${totalPrice}</span>
                </div>

              </div>

              <Button
                onClick={handleBooking}
                className="w-full"
                disabled={!date || !startTime || Number(hours) < 1}
              >
                Confirm Booking
              </Button>

              <button
                onClick={() => setIsOpen(false)}
                className="w-full text-sm text-gray-500 hover:text-black"
              >
                Cancel
              </button>

            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BookingModal;
