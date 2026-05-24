import { BookingCancelAlert } from "@/components/BookingCancelAlert";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Image from "next/image";
import { CalendarDays, MapPin, ReceiptText } from "lucide-react";

const MyBookingsPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const user = session?.user;

  const { token } = await auth.api.getToken({
    headers: await headers(),
  });
  
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/booking/${user?.id}`,
    {
      headers: {
        authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    }
  );

  const bookings = await res.json();

  return (
    <div className="min-h-screen bg-[#081120] px-4 py-10 text-white">
      <div className="mx-auto max-w-7xl">

        {/* Heading */}
        <div className="mb-10">
          <p className="mb-2 text-sm uppercase tracking-[0.3em] text-cyan-400">
            Travel Dashboard
          </p>

          <h1 className="text-4xl font-bold tracking-tight">
            My Bookings
          </h1>

          <p className="mt-3 max-w-2xl text-sm text-gray-400">
            Manage your booked destinations, departure schedules and travel plans.
          </p>
        </div>

        {/* Booking Cards */}
        <div className="grid gap-7">
          {bookings.map((booking) => (
            <div
              key={booking._id}
              className="group overflow-hidden rounded-[30px] border border-white/10 bg-[#0b1220]/95 shadow-[0_10px_60px_rgba(0,0,0,0.45)] backdrop-blur-xl transition-all duration-500 hover:-translate-y-1 hover:border-cyan-400/30"
            >
              <div className="flex flex-col lg:flex-row">

                {/* Image */}
                <div className="relative overflow-hidden lg:w-[360px]">
                  <Image
                    src={booking.destinationImage}
                    alt={booking.destinationCountry}
                    width={400}
                    height={300}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

                  {/* Country */}
                  <div className="absolute bottom-5 left-5 flex items-center gap-2 rounded-full border border-white/10 bg-black/30 px-4 py-2 text-sm backdrop-blur-md">
                    <MapPin size={16} className="text-cyan-400" />
                    <span>{booking.destinationCountry}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="flex flex-1 flex-col justify-between p-7">

                  <div>

                    {/* Top */}
                    <div className="mb-5 flex flex-wrap items-start justify-between gap-4">
                      <div>
                        <p className="mb-2 text-xs uppercase tracking-[0.25em] text-cyan-400">
                          Premium Destination
                        </p>

                        <h2 className="text-3xl font-bold tracking-tight text-white">
                          {booking.destinationName}
                        </h2>
                      </div>

                      {/* Price */}
                      <div className="rounded-2xl border border-cyan-400/20 bg-cyan-400/10 px-5 py-3 text-center">
                        <p className="text-xs uppercase tracking-wider text-cyan-300">
                          Total Price
                        </p>

                        <h3 className="mt-1 text-2xl font-bold text-white">
                          ${booking.destinationPrice}
                        </h3>
                      </div>
                    </div>

                    {/* Divider */}
                    <div className="mb-6 h-px w-full bg-gradient-to-r from-transparent via-gray-700 to-transparent" />

                    {/* Info */}
                    <div className="space-y-4">

                      {/* Date */}
                      <div className="flex items-center gap-3 rounded-2xl border border-white/5 bg-white/[0.03] p-4 transition-all duration-300 hover:border-cyan-400/20">
                        <div className="rounded-xl bg-cyan-400/10 p-3">
                          <CalendarDays
                            size={20}
                            className="text-cyan-400"
                          />
                        </div>

                        <div>
                          <p className="text-xs uppercase tracking-wider text-gray-500">
                            Departure Date
                          </p>

                          <p className="mt-1 text-sm text-gray-200">
                            {new Date(
                              booking.departureDate
                            ).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}
                          </p>
                        </div>
                      </div>

                      {/* Booking ID */}
                      <div className="flex items-center gap-3 rounded-2xl border border-white/5 bg-white/[0.03] p-4 transition-all duration-300 hover:border-cyan-400/20">
                        <div className="rounded-xl bg-cyan-400/10 p-3">
                          <ReceiptText
                            size={20}
                            className="text-cyan-400"
                          />
                        </div>

                        <div>
                          <p className="text-xs uppercase tracking-wider text-gray-500">
                            Booking ID
                          </p>

                          <p className="mt-1 text-sm break-all text-gray-300">
                            {booking._id}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Bottom */}
                  <div className="mt-7 flex items-center justify-between gap-4 border-t border-white/5 pt-5">

                    <div className="flex items-center gap-2 text-sm text-emerald-400">
                      <div className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                      Confirmed Booking
                    </div>

                    <div className="transition-transform duration-300 hover:scale-[1.03]">
                      <BookingCancelAlert bookingId={booking._id} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {bookings.length === 0 && (
          <div className="flex min-h-[400px] flex-col items-center justify-center rounded-[30px] border border-dashed border-white/10 bg-[#0b1220]/80 text-center">
            <h2 className="text-2xl font-semibold text-white">
              No Bookings Found
            </h2>

            <p className="mt-3 text-sm text-gray-400">
              You haven’t booked any destination yet.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBookingsPage;