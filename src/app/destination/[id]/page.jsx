import BookingCard from "@/components/BookingCard";
import { DeleteDest } from "@/components/DeleteDest";
import { EditModal } from "@/components/EditModal";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Image from "next/image";

import {
  CalendarDays,
  Globe,
  MapPin,
  Sparkles,
} from "lucide-react";

const DestinationDetailsPage = async ({ params }) => {
  const { id } = await params;

  const { token } = await auth.api.getToken({
    headers: await headers(),
  });

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/destination/${id}`,
    {
      headers: {
        authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    }
  );

  const dest = await res.json();

  const {
    _id,
    imageUrl,
    price,
    country,
    destinationName,
    duration,
    category,
    description,
  } = dest;

  return (
    <div className="min-h-screen bg-[#081120] px-4 py-10 text-white">
      <div className="container mx-auto max-w-7xl">

        {/* Top Actions */}
        <div className="mb-6 flex items-center justify-end gap-3">
          <div className="transition-transform duration-300 hover:scale-[1.03]">
            <EditModal dest={dest} />
          </div>

          <div className="transition-transform duration-300 hover:scale-[1.03]">
            <DeleteDest dest={dest} />
          </div>
        </div>

        {/* Main Layout */}
        <div className="grid gap-8 lg:grid-cols-[1fr_380px]">

          {/* Left Content */}
          <div>

            {/* Hero Image */}
            <div className="group relative overflow-hidden rounded-[32px] border border-white/10 bg-[#0b1220] shadow-[0_10px_60px_rgba(0,0,0,0.45)]">
              
              <Image
                className="h-[520px] w-full object-cover transition-transform duration-700 group-hover:scale-105"
                alt={destinationName}
                src={imageUrl}
                height={700}
                width={1200}
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#081120] via-black/10 to-transparent" />

              {/* Floating Info */}
              <div className="absolute bottom-6 left-6 flex flex-wrap gap-3">

                <div className="flex items-center gap-2 rounded-full border border-white/10 bg-black/30 px-4 py-2 text-sm backdrop-blur-xl">
                  <MapPin size={16} className="text-cyan-400" />
                  <span>{country}</span>
                </div>

                <div className="flex items-center gap-2 rounded-full border border-white/10 bg-black/30 px-4 py-2 text-sm backdrop-blur-xl">
                  <CalendarDays
                    size={16}
                    className="text-cyan-400"
                  />
                  <span>{duration}</span>
                </div>

                <div className="flex items-center gap-2 rounded-full border border-white/10 bg-black/30 px-4 py-2 text-sm backdrop-blur-xl">
                  <Sparkles
                    size={16}
                    className="text-cyan-400"
                  />
                  <span>{category}</span>
                </div>
              </div>
            </div>

            {/* Details Card */}
            <div className="relative mt-8 overflow-hidden rounded-[32px] border border-white/10 bg-[#0b1220]/95 p-8 shadow-[0_10px_60px_rgba(0,0,0,0.45)] backdrop-blur-2xl">

              {/* Glow */}
              <div className="absolute -top-24 right-0 h-64 w-64 rounded-full bg-cyan-500/10 blur-3xl" />

              <div className="relative z-10">

                {/* Category */}
                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm font-medium text-cyan-300">
                  <Globe size={16} />
                  {category} Destination
                </div>

                {/* Title */}
                <h1 className="text-5xl font-bold tracking-tight">
                  {destinationName}
                </h1>

                {/* Price */}
                <div className="mt-6 flex items-center gap-3">
                  <span className="text-sm uppercase tracking-[0.25em] text-gray-500">
                    Starting From
                  </span>

                  <div className="h-px flex-1 bg-gradient-to-r from-cyan-400/30 to-transparent" />
                </div>

                <h2 className="mt-3 text-4xl font-bold text-cyan-400">
                  ${price}
                  <span className="ml-2 text-lg font-normal text-gray-400">
                    / Person
                  </span>
                </h2>

                {/* Overview */}
                <div className="mt-10">
                  <h3 className="mb-4 text-2xl font-bold tracking-tight">
                    Overview
                  </h3>

                  <p className="leading-8 text-gray-400">
                    {description}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side Booking */}
          <div className="sticky top-6 h-fit">
            <BookingCard destination={dest} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DestinationDetailsPage;