export default function CTASection() {
  return (
    <section className="py-20 px-6 text-white">
      <div className="max-w-5xl mx-auto text-center rounded-3xl border border-white/10 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 backdrop-blur-md p-10">

        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Start Your Journey with Wanderlust
        </h2>

        <p className="text-gray-400 mb-8">
          Explore beautiful destinations and book your next adventure easily.
        </p>

        <button className="px-6 py-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:scale-105 transition">
          Explore Now
        </button>

      </div>
    </section>
  );
}