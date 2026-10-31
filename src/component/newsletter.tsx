
"use client";

import { HiArrowRight } from "react-icons/hi2";

export default function Newsletter() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const email = new FormData(form).get("email");

    console.log("Subscribed email:", email);

    form.reset();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white p-1.5 shadow-sm transition focus-within:border-orange-400"
    >
      <input
        type="email"
        name="email"
        required
        placeholder="Enter your email"
        aria-label="Email address"
        className="min-w-0 flex-1 bg-transparent px-3 py-2 text-sm text-gray-800 outline-none placeholder:text-gray-400"
      />

      <button
        type="submit"
        aria-label="Subscribe"
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-orange-500 text-white transition hover:bg-orange-600"
      >
        <HiArrowRight size={21} />
      </button>
    </form>
  );
}
