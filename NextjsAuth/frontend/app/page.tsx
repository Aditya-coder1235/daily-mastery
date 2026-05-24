import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar";
import React from "react";

const page = () => {
    return (
        <main className="min-h-screen bg-gradient-to-b from-slate-50 via-slate-100 to-white text-slate-900">
            <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
                <header className="mb-16 flex flex-col gap-8 rounded-3xl border border-slate-200 bg-white/80 p-10 shadow-xl shadow-slate-200/70 lg:flex-row lg:items-center lg:justify-between">
                    <div className="max-w-2xl">
                        <span className="inline-flex rounded-full bg-emerald-100 px-4 py-1 text-sm font-semibold text-emerald-800">
                            Launch your next product
                        </span>
                        <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl">
                            Build beautiful experiences for your customers.
                        </h1>
                        <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
                            A modern landing page for product discovery and a
                            friendly chat app experience, crafted with Tailwind
                            CSS for clarity, freshness, and ease of use.
                        </p>
                        <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                            <a
                                href="#products"
                                className="inline-flex items-center justify-center rounded-full bg-sky-600 px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-sky-200/50 transition hover:bg-sky-700"
                            >
                                Explore products
                            </a>
                            <a
                                href="#chat"
                                className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-7 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:bg-slate-50"
                            >
                                Open chat preview
                            </a>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 lg:w-[420px]">
                        <div className="rounded-3xl bg-slate-50 p-6 shadow-sm shadow-slate-200/80">
                            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-sky-600">
                                Fresh design
                            </p>
                            <p className="mt-4 text-3xl font-bold">120+</p>
                            <p className="mt-2 text-sm text-slate-500">
                                Elements and patterns ready to use.
                            </p>
                        </div>
                        <div className="rounded-3xl bg-slate-50 p-6 shadow-sm shadow-slate-200/80">
                            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-emerald-600">
                                Fast launch
                            </p>
                            <p className="mt-4 text-3xl font-bold">7 days</p>
                            <p className="mt-2 text-sm text-slate-500">
                                Ready-to-go layouts for your landing page.
                            </p>
                        </div>
                    </div>
                </header>

                <section id="products" className="space-y-10">
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                        <div>
                            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">
                                Product showcase
                            </p>
                            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
                                Stylish products for happy users.
                            </h2>
                        </div>
                        <p className="max-w-xl text-sm leading-7 text-slate-600">
                            Browse curated items designed to help your customers
                            enjoy a polished and pleasant experience, with
                            modern visuals and clean layouts.
                        </p>
                    </div>
                    <div className="grid gap-6 md:grid-cols-3">
                        {[
                            {
                                name: "Zen Tuner",
                                description:
                                    "Smart productivity tool with gentle reminders and elegant notifications.",
                                price: "$19",
                            },
                            {
                                name: "Cloud Desk",
                                description:
                                    "Collaborate instantly with a friendly interface for modern teams.",
                                price: "$32",
                            },
                            {
                                name: "Pulse Plan",
                                description:
                                    "Organize your day with clear milestones and soft pastel visuals.",
                                price: "$26",
                            },
                        ].map((product) => (
                            <article
                                key={product.name}
                                className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-200/60 transition hover:-translate-y-1 hover:shadow-md"
                            >
                                <div className="flex items-center justify-between text-slate-500">
                                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em]">
                                        New
                                    </span>
                                    <span className="text-lg font-semibold text-slate-700">
                                        {product.price}
                                    </span>
                                </div>
                                <h3 className="mt-6 text-2xl font-semibold text-slate-900">
                                    {product.name}
                                </h3>
                                <p className="mt-4 text-sm leading-6 text-slate-600">
                                    {product.description}
                                </p>
                                <button className="mt-8 inline-flex items-center rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800">
                                    Add to cart
                                </button>
                            </article>
                        ))}
                    </div>
                </section>

                <section
                    id="chat"
                    className="mt-20 rounded-[2rem] border border-slate-200 bg-slate-50 p-8 shadow-xl shadow-slate-200/70"
                >
                    <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                        <div className="max-w-2xl">
                            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">
                                Chat app
                            </p>
                            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
                                A friendly conversation space for your team.
                            </h2>
                            <p className="mt-4 text-sm leading-7 text-slate-600">
                                Preview a calm and clean chat window that helps
                                users communicate clearly, with gentle colors
                                and an inviting layout.
                            </p>
                        </div>
                        <div className="inline-flex items-center gap-3 rounded-full bg-white px-5 py-3 shadow-sm shadow-slate-200">
                            <span className="h-3.5 w-3.5 rounded-full bg-emerald-500"></span>
                            <span className="text-sm font-medium text-slate-700">
                                Online now
                            </span>
                        </div>
                    </div>
                    <div className="mt-10 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
                        <div className="space-y-4 rounded-[1.75rem] bg-white p-6 shadow-sm shadow-slate-200">
                            <div className="flex items-center gap-4">
                                <div className="h-12 w-12 rounded-2xl bg-sky-100 text-sky-700 flex items-center justify-center font-semibold">
                                    AI
                                </div>
                                <div>
                                    <p className="font-semibold text-slate-900">
                                        Avery
                                    </p>
                                    <p className="text-sm text-slate-500">
                                        Designer · Today
                                    </p>
                                </div>
                            </div>
                            <div className="space-y-4 text-slate-700">
                                <div className="rounded-3xl bg-slate-100 p-5 text-sm leading-7">
                                    Hey there! Ready to discover the newest
                                    updates from our product lineup?
                                </div>
                                <div className="rounded-3xl bg-slate-100 p-5 text-sm leading-7">
                                    Absolutely. I love the clean look — it feels
                                    calm and polished.
                                </div>
                                <div className="rounded-3xl bg-sky-50 p-5 text-sm leading-7 text-slate-900">
                                    Let’s highlight the most elegant pieces and
                                    make the chat feel just as smooth.
                                </div>
                            </div>
                        </div>
                        <aside className="rounded-[1.75rem] bg-white p-6 shadow-sm shadow-slate-200">
                            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">
                                Active contacts
                            </p>
                            <div className="mt-6 space-y-4">
                                {[
                                    { name: "Mia Harper", status: "Available" },
                                    { name: "Noah Bennett", status: "Busy" },
                                    { name: "Luna James", status: "Available" },
                                ].map((contact) => (
                                    <div
                                        key={contact.name}
                                        className="flex items-center justify-between rounded-3xl bg-slate-50 px-4 py-4"
                                    >
                                        <div>
                                            <p className="font-semibold text-slate-900">
                                                {contact.name}
                                            </p>
                                            <p className="text-sm text-slate-500">
                                                {contact.status}
                                            </p>
                                        </div>
                                        <span
                                            className={`h-3.5 w-3.5 rounded-full ${contact.status === "Available" ? "bg-emerald-500" : "bg-amber-400"}`}
                                        />
                                    </div>
                                ))}
                            </div>
                            <button className="mt-8 w-full rounded-full bg-sky-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-sky-700">
                                Start new conversation
                            </button>
                        </aside>
                    </div>
                </section>
            </section>
        </main>
    );
};

export default page;
