import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CheckCircle2 } from "lucide-react";

const AboutPage = () => {
  return (
    <main className="bg-white">
      {/* Hero Section */}
      <section className="mx-auto max-w-7xl px-5 py-20 md:px-10">
        <div className="grid items-center gap-12 md:grid-cols-2">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-orange-500">
              About StudioSpace
            </p>

            <h1 className="mt-5 text-4xl font-bold leading-tight text-gray-900 sm:text-5xl">
              A Better Space for
              <span className="text-orange-500"> Every Idea.</span>
            </h1>

            <p className="mt-6 max-w-lg leading-8 text-gray-500">
              StudioSpace makes it easy to discover and book creative
              workspaces. From photography studios to podcast rooms,
              find the perfect place to bring your ideas to life.
            </p>

            <Link
              href="/listing"
              className="mt-8 inline-flex items-center gap-2 rounded-xl bg-orange-500 px-6 py-3 font-semibold text-white transition hover:bg-orange-600"
            >
              Explore Spaces <ArrowRight size={18} />
            </Link>
          </div>

          <div>
            <Image
              src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=1200"
              alt="Modern workspace"
              width={700}
              height={500}
              className="h-86 w-full rounded-2xl object-cover md:h-105"
            />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="bg-gray-50 py-20">
        <div className="mx-auto max-w-7xl px-5 md:px-10">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-orange-500">
              Who We Are
            </p>

            <h2 className="mt-4 text-3xl font-bold text-gray-900 sm:text-4xl">
              Making Creative Spaces Accessible
            </h2>

            <p className="mt-5 leading-8 text-gray-500">
              We connect creative professionals with inspiring spaces
              where they can work, collaborate, and create something
              amazing. Our goal is to make workspace booking simple,
              flexible, and convenient for everyone.
            </p>
          </div>

          <div className="mt-14 grid gap-6 sm:grid-cols-3">
            {[
              {
                number: "500+",
                title: "Creative Spaces",
              },
              {
                number: "10K+",
                title: "Happy Creators",
              },
              {
                number: "50+",
                title: "Locations",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-gray-100 bg-white p-8 text-center"
              >
                <h3 className="text-4xl font-bold text-orange-500">
                  {item.number}
                </h3>
                <p className="mt-3 text-gray-500">{item.title}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="mx-auto max-w-7xl px-5 py-20 md:px-10">
        <div className="grid items-center gap-12 md:grid-cols-2">
          <div>
            <Image
              src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?q=80&w=1200"
              alt="Creative team workspace"
              width={650}
              height={450}
              className="h-86 w-full rounded-2xl object-cover"
            />
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-orange-500">
              Why Choose Us
            </p>

            <h2 className="mt-4 text-3xl font-bold text-gray-900 sm:text-4xl">
              Everything You Need in One Place
            </h2>

            <p className="mt-5 leading-8 text-gray-500">
              Finding the right space shouldn&apos;t be complicated.
              We bring quality spaces and creative people together.
            </p>

            <div className="mt-7 space-y-5">
              {[
                "Easy and simple booking process",
                "A variety of creative workspaces",
                "Flexible options for every project",
                "Trusted hosts and quality spaces",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <CheckCircle2
                    size={21}
                    className="shrink-0 text-orange-500"
                  />
                  <span className="text-gray-700">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-5 pb-20 md:px-10">
        <div className="mx-auto max-w-7xl rounded-2xl bg-[#101828] px-6 py-14 text-center sm:py-16">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            Ready to Find Your Space?
          </h2>

          <p className="mx-auto mt-4 max-w-lg text-gray-400">
            Explore amazing creative spaces and start creating
            something special today.
          </p>

          <Link
            href="/studios"
            className="mt-7 inline-flex items-center gap-2 rounded-xl bg-orange-500 px-7 py-3 font-semibold text-white transition hover:bg-orange-600"
          >
            Explore Now <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </main>
  );
};

export default AboutPage;