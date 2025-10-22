import React from "react";
import Image from "next/image";
import LoginIconButton from "./login/components/LoginIconButton";

export default function Page() {
  return (
    <main className="relative min-h-dvh overflow-hidden">
      {/* Global background image */}
      <div className="fixed inset-0 -z-10">
        <img
          src="https://images.unsplash.com/photo-1507089947368-19c1da9775ae?q=80&w=2200&auto=format&fit=crop"
          alt="Background palm trees"
          className="h-full w-full object-cover"
        />
        {/* Dim overlay for contrast */}
        <div className="absolute inset-0 bg-neutral-900/60" />
      </div>
      {/* Background tree photo hint */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 bg-[radial-gradient(80%_60%_at_50%_-10%,#ffffff0f,transparent_60%)]"
      />

      {/* Shell card */}
      <div className="mx-auto max-w-[1200px] px-4 py-8 md:py-12">
        <div className="relative grid gap-6 rounded-[28px] bg-white/95 p-4 shadow-2xl ring-1 ring-black/5 backdrop-blur md:grid-cols-[520px_1fr] md:p-6 lg:p-8">
          {/* Left column */}
          <aside className="relative rounded-[22px] bg-white p-6 md:p-8">
            {/* Top nav */}
            <nav className="mb-10 flex items-center gap-6 text-sm text-neutral-500">
              <a className="font-medium text-neutral-900" href="#">Home</a>
              <a href="#">Villas</a>
              <a href="#">Manor</a>
            </nav>

            <h1 className="text-5xl font-extrabold leading-[1.05] tracking-tight text-neutral-900 md:text-6xl">
              Reserve Your
              <br />
              Ideal Holiday
            </h1>

            <p className="mt-6 text-sm font-medium uppercase tracking-widest text-neutral-400">
              Let’s get acquainted!
            </p>

            {/* Blurb */}
            <p className="mt-3 max-w-[46ch] text-neutral-600">
              We specialize in curating exceptional villa rentals, providing an unparalleled level of comfort, privacy, and convenience for your dream vacation.
            </p>

            <div className="mt-6 flex items-center gap-3">
              <button className="inline-flex items-center gap-2 rounded-full bg-black px-5 py-3 text-white transition hover:opacity-90">
                <span>More</span>
                <span aria-hidden>↗</span>
              </button>
              <div className="flex -space-x-3">
                {([
                  "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=64&h=64&fit=crop&crop=faces&auto=format",
                  "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?q=80&w=64&h=64&fit=crop&crop=faces&auto=format",
                  "https://images.unsplash.com/photo-1527980965255-d3b416303d12?q=80&w=64&h=64&fit=crop&crop=faces&auto=format",
                ] as const).map((url, idx) => (
                  <Image
                    key={idx}
                    src={url}
                    alt="guest"
                    width={40}
                    height={40}
                    className="h-10 w-10 rounded-full ring-2 ring-white"
                    unoptimized
                  />
                ))}
              </div>
            </div>

            {/* Stats */}
            <div className="mt-10 grid grid-cols-3 gap-4 text-center md:text-left">
              <div>
                <div className="text-2xl font-extrabold text-neutral-900">115k+</div>
                <div className="text-sm text-neutral-500">Capital Raised</div>
              </div>
              <div>
                <div className="text-2xl font-extrabold text-neutral-900">70k+</div>
                <div className="text-sm text-neutral-500">Happy Customers</div>
              </div>
              <div>
                <div className="text-2xl font-extrabold text-neutral-900">47k+</div>
                <div className="text-sm text-neutral-500">Property Options</div>
              </div>
            </div>

            {/* Featured card */}
            <div className="mt-8 rounded-3xl bg-neutral-900/5 p-2">
              <div className="relative overflow-hidden rounded-2xl">
                <img
                  src="https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1400&auto=format&fit=crop"/>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                <div className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-neutral-800 backdrop-blur">
                  Vancouver, Canada
                </div>

                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                  <div className="rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-neutral-800 backdrop-blur">
                    Popular
                  </div>
                  <div className="flex items-center gap-1 text-sm font-semibold text-yellow-400">
                    ★★★★★
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* Right hero */}
          <section className="relative overflow-hidden rounded-[22px]">
            {/* Hero image */}
            <img
              src="https://images.unsplash.com/photo-1523217582562-09d0def993a6?q=80&w=1800&auto=format&fit=crop"
              alt="Modern villa"
              className="absolute inset-0 h-full w-full object-cover"/>

            {/* White frame effect */}
            <div className="pointer-events-none absolute inset-0 rounded-[22px] ring-1 ring-white/70" />

            {/* Overlay content */}
            <div className="absolute inset-0 flex flex-col justify-between p-5 sm:p-6 md:p-8">
              {/* Top right controls */}
              <div className="flex items-center justify-end gap-3">
                <button className="rounded-full bg-white/90 px-4 py-2 text-sm font-medium text-neutral-900 shadow hover:bg-white">Contact Us</button>
                <button className="grid h-10 w-10 place-items-center rounded-full bg-white/90 text-neutral-900 shadow">⚙️</button>
                <LoginIconButton/>
              </div>

              {/* Location pill */}
              <div className="self-start">
                <div className="flex items-center gap-3 rounded-2xl bg-white/90 p-2 pr-3 shadow backdrop-blur">
                  <div className="relative h-14 w-20 overflow-hidden rounded-xl">
                    <img
                      src="https://images.unsplash.com/photo-1505691938895-1758d7feb511?q=80&w=400&auto=format&fit=crop"/>
                  </div>
                  <div>
                    <p className="text-xs text-neutral-500">Melbourne VIC,</p>
                    <p className="text-sm font-semibold text-neutral-900">Australia</p>
                  </div>
                  <button className="ml-2 grid h-8 w-8 place-items-center rounded-full bg-black text-white">1</button>
                </div>
              </div>

              {/* Bottom search + caption */}
              <div className="space-y-4">
                <p className="max-w-[56ch] text-base/relaxed text-white drop-shadow">
                  Enjoy a luxurious Melbourne vacation in a villa with breathtaking city views and easy access to the vibrant city life and culinary delights.
                </p>
                <div className="flex flex-wrap items-center gap-3">
                  <div className="flex items-center gap-2 rounded-full bg-white/95 px-4 py-2 text-sm text-neutral-700 shadow">
                    <span className="font-semibold">Select Type</span>
                    <span>▾</span>
                  </div>
                  <div className="flex items-center gap-2 rounded-full bg-white/95 px-4 py-2 text-sm text-neutral-700 shadow">
                    <span className="font-semibold">Location</span>
                    <span>▾</span>
                  </div>
                  <button className="ml-auto rounded-full bg-white/10 px-6 py-2 text-white ring-1 ring-white/70 backdrop-blur transition hover:bg-white/20">Search</button>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}