import DestinationCard from "@/components/DestinationCard";
import { Compass, Sparkles } from "lucide-react";

const DestinationPage = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/destination`,
    {
      cache: "no-store",
    }
  );

  const destination = await res.json();

  return (
    <div className="min-h-screen bg-[#081120] px-4 py-12 text-white">
      <div className="container mx-auto max-w-7xl">

        {/* Heading Section */}
        <div className="mb-12 text-center">

          {/* Badge */}
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-5 py-2 text-sm font-medium text-cyan-300 backdrop-blur-md">
            <Sparkles size={16} />
            Explore The World
          </div>

          {/* Title */}
          <h1 className="text-5xl font-bold tracking-tight">
            All Destinations
          </h1>

          {/* Subtitle */}
          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-gray-400">
            Discover breathtaking destinations, premium travel experiences and
            unforgettable adventures crafted for your next journey.
          </p>
        </div>

        {/* Stats / Top Banner */}
        <div className="mb-10 flex flex-wrap items-center justify-between gap-5 rounded-[28px] border border-white/10 bg-[#0b1220]/90 p-6 shadow-[0_10px_50px_rgba(0,0,0,0.35)] backdrop-blur-xl">

          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-cyan-400">
              Travel Collection
            </p>

            <h2 className="mt-2 text-3xl font-bold">
              {destination.length}+ Destinations
            </h2>
          </div>

          <div className="flex items-center gap-3 rounded-2xl border border-cyan-400/20 bg-cyan-400/10 px-5 py-3 text-cyan-300">
            <Compass size={20} />
            <span className="text-sm font-medium">
              Premium Travel Experience
            </span>
          </div>
        </div>

        {/* Destination Grid */}
        <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {destination.map((dest) => (
            <div
              key={dest._id}
              className="transition-all duration-300 hover:-translate-y-2"
            >
              <DestinationCard dest={dest} />
            </div>
          ))}
        </div>

        {/* Empty State */}
        {destination.length === 0 && (
          <div className="flex min-h-[400px] flex-col items-center justify-center rounded-[32px] border border-dashed border-white/10 bg-[#0b1220]/80 text-center">
            
            <div className="mb-5 rounded-full border border-cyan-400/20 bg-cyan-400/10 p-5">
              <Compass size={38} className="text-cyan-400" />
            </div>

            <h2 className="text-3xl font-bold">
              No Destinations Found
            </h2>

            <p className="mt-4 max-w-md text-sm leading-7 text-gray-400">
              There are currently no destinations available.
              Add new destinations to showcase amazing travel experiences.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DestinationPage;