"use client";

import React from "react";
import Image from "next/image";

const projects = [
  {
    title: "Modern Studio",
    category: "Interior Design",
    image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0",
    description: "A clean and elegant interior designed for modern living.",
  },
  {
    title: "Creative Workspace",
    category: "Workspace",
    image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72",
    description: "A comfortable and inspiring space for creative minds.",
  },
  {
    title: "Minimal Living",
    category: "Architecture",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
    description: "A beautiful combination of simplicity and functionality.",
  },
];

const Works = () => {
  return (
    <main className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-5 md:px-10 pt-24 pb-16">
        <p className="text-sm font-semibold uppercase tracking-[4px] text-orange-500 mb-4">
          Our Portfolio
        </p>

        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight max-w-3xl">
          Our Works, <span className="text-orange-500">Our Stories.</span>
        </h1>

        <p className="text-gray-500 mt-6 max-w-xl text-base md:text-lg leading-8">
          Explore our latest projects and discover the creativity,
          passion, and dedication behind every work we create.
        </p>
      </section>

      {/* Projects Section */}
      <section className="max-w-7xl mx-auto px-5 md:px-10 pb-24">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-gray-900">
            Featured Projects
          </h2>
          <span className="text-sm text-gray-400">
            01 — 03
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div key={index} className="group">
              <div className="relative h-70 md:h-80 overflow-hidden rounded-2xl bg-gray-100">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  unoptimized
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              <div className="pt-5">
                <p className="text-xs uppercase tracking-widest text-orange-500 font-semibold mb-2">
                  {project.category}
                </p>

                <h3 className="text-xl font-bold text-gray-900 group-hover:text-orange-500 transition-colors">
                  {project.title}
                </h3>

                <p className="text-sm text-gray-500 mt-2 leading-6">
                  {project.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default Works;