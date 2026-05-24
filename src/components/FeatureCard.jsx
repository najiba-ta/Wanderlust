export default function FeatureCard() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-16 text-white">
      <h2 className="text-3xl font-bold text-center mb-10">
        Why Wanderlust
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

        <div className="p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md hover:scale-105 transition">
          <h3 className="text-xl font-semibold mb-2">Easy Booking</h3>
          <p className="text-sm text-gray-400">
            Book your dream destinations easily with smooth and simple flow.
          </p>
        </div>

        <div className="p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md hover:scale-105 transition">
          <h3 className="text-xl font-semibold mb-2">Secure System</h3>
          <p className="text-sm text-gray-400">
            Authentication and protected routes keep your data safe.
          </p>
        </div>

        <div className="p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md hover:scale-105 transition">
          <h3 className="text-xl font-semibold mb-2">Modern UI</h3>
          <p className="text-sm text-gray-400">
            Clean, responsive and modern design experience.
          </p>
        </div>

      </div>
    </section>
  );
}