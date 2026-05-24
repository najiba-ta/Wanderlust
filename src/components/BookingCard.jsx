'use client'

import { authClient } from "@/lib/auth-client";
import { Button, Card, DateField, Label } from "@heroui/react";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { CalendarDays, MapPin, ArrowRight } from "lucide-react";

const BookingCard = ({ destination }) => {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const [departureDate, setDepartureDate] = useState(null);

  const handleBooking = async () => {
    const bookingData = {
      userId: user?.id,
      userImage: user?.image,
      userName: user?.name,
      destinationId: destination._id,
      destinationName: destination.name,
      destinationPrice: destination.price,
      destinationImage: destination.imageUrl,
      destinationCountry: destination.country,
      departureDate: new Date(departureDate),
    };

    const { data: tokenData } = await authClient.token();

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/booking`,
      {
        method: "post",
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${tokenData?.token}`,
        },
        body: JSON.stringify(bookingData),
      }
    );

    await res.json();

    toast.success("You booked successfully!");
  };

  const { price } = destination;

  return (
    <Card className="group relative mt-8 overflow-hidden rounded-[28px] border border-white/10 bg-[#0b1220]/95 p-7 shadow-[0_10px_60px_rgba(0,0,0,0.45)] backdrop-blur-2xl transition-all duration-500 hover:-translate-y-1 hover:border-cyan-400/30">
      
      {/* Glow Effect */}
      <div className="absolute -top-20 -right-20 h-52 w-52 rounded-full bg-cyan-500/10 blur-3xl transition-all duration-500 group-hover:bg-cyan-500/20" />

      {/* Badge + Country */}
      <div className="relative z-10 mb-6 flex items-center justify-between">
        <div className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-1.5 text-xs font-semibold tracking-wide text-cyan-300 backdrop-blur-md">
          Premium Package
        </div>

        <div className="flex items-center gap-1.5 text-sm text-gray-400">
          <MapPin size={16} className="text-cyan-400" />
          <span>{destination.country}</span>
        </div>
      </div>

      {/* Price */}
      <div className="relative z-10 mb-7">
        <p className="text-xs uppercase tracking-[0.25em] text-gray-500">
          Starting From
        </p>

        <div className="mt-3 flex items-end gap-2">
          <h2 className="text-5xl font-bold tracking-tight text-white">
            ${price}
          </h2>

          <span className="mb-1 text-sm text-gray-400">
            / person
          </span>
        </div>
      </div>

      {/* Date Field */}
      <div className="relative z-10 mb-7">
        <div className="mb-3 flex items-center gap-2 text-sm font-medium text-gray-300">
          <CalendarDays size={17} className="text-cyan-400" />
          <span>Choose Departure Date</span>
        </div>

        <DateField
          onChange={setDepartureDate}
          className="w-full"
          name="date"
        >
          <Label className="hidden">Departure Date</Label>

          <DateField.Group className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-white transition-all duration-300 hover:border-cyan-400/30 focus-within:border-cyan-400 focus-within:bg-white/[0.06] focus-within:shadow-[0_0_20px_rgba(34,211,238,0.15)]">
            <DateField.Input>
              {(segment) => (
                <DateField.Segment
                  segment={segment}
                  className="text-sm text-white"
                />
              )}
            </DateField.Input>
          </DateField.Group>
        </DateField>
      </div>

      {/* Button */}
      <Button
        onClick={handleBooking}
        className="group/btn relative h-14 w-full overflow-hidden rounded-2xl border border-cyan-400/20 bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-600 text-base font-semibold text-white shadow-[0_8px_30px_rgba(14,165,233,0.35)] transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_12px_35px_rgba(14,165,233,0.45)] active:scale-[0.98]"
      >
        {/* Shine Animation */}
        <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000 group-hover/btn:translate-x-full" />

        <span className="relative flex items-center gap-2">
          Book Your Trip
          <ArrowRight
            size={18}
            className="transition-transform duration-300 group-hover/btn:translate-x-1"
          />
        </span>
      </Button>

      {/* Footer */}
      <div className="relative z-10 mt-5 flex items-center justify-center gap-2 text-xs text-gray-500">
        <div className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
        <span>Secure booking & instant confirmation</span>
      </div>
    </Card>
  );
};

export default BookingCard;