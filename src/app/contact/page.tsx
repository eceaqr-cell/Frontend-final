"use client";

import { FormEvent, useState } from "react";

type Service = {
  icon: string;
  title: string;
  description: string;
  details: string;
  button: string;
};

const services: Service[] = [
  {
    icon: "◉",
    title: "Chat to sales",
    description: "Speak to our friendly team.",
    details:
      "Our sales team can help you understand NEXUS ECOM features, pricing, products, and solutions for your business.",
    button: "Chat to sales",
  },
  {
    icon: "♧",
    title: "Chat to support",
    description: "We're here to help.",
    details:
      "Our support team can help with technical questions, account problems, orders, and general questions about NEXUS ECOM.",
    button: "Chat to support",
  },
  {
    icon: "⌖",
    title: "Visit us",
    description: "Visit our Phnom Penh HQ.",
    details:
      "Our NEXUS ECOM office is located in Phnom Penh, Cambodia. Click Get directions to view the location on Google Maps.",
    button: "Get directions",
  },
  {
    icon: "☎",
    title: "Call us",
    description: "Mon-Fri from 8am to 5pm.",
    details:
      "You can contact our team during business hours for support, sales questions, and general information.",
    button: "Call our team",
  },
];

const faqs = [
  {
    question: "Is there a free trial available?",
    answer:
      "Yes. You can try our service and explore the main features before deciding which plan works for you.",
  },
  {
    question: "Can I change my plan later?",
    answer:
      "Yes. You can change your plan whenever your business needs change.",
  },
  {
    question: "What is your cancellation policy?",
    answer:
      "You can contact our support team whenever you want to discuss cancellation or account changes.",
  },
  {
    question: "Can other information be added to an invoice?",
    answer:
      "Yes. Contact our team if you need additional company information included on your invoice.",
  },
  {
    question: "How does billing work?",
    answer:
      "Billing depends on the plan and services selected. Our team can explain the available options.",
  },
  {
    question: "How do I change my account email?",
    answer:
      "You can request an email change through account settings or contact our support team.",
  },
  {
    question: "How does support work?",
    answer:
      "Our support team can help you with technical problems, account questions, and general assistance.",
  },
  {
    question: "Do you provide tutorials?",
    answer:
      "Yes. We provide helpful guides and documentation to make it easier to get started.",
  },
];

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setSubmitted(true);

    setTimeout(() => {
      setSubmitted(false);
    }, 4000);
  };

  const openDirections = () => {
    window.open(
      "https://www.google.com/maps/search/?api=1&query=Phnom+Penh,Cambodia",
      "_blank",
      "noopener,noreferrer"
    );
  };

  const callTeam = () => {
    // eslint-disable-next-line react-hooks/immutability
    window.location.href = "tel:+855714097399";
  };

  const scrollToForm = () => {
    document
      .getElementById("contact-form")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main className="theme-page min-h-screen bg-white text-[#171717] dark:bg-background dark:text-foreground">

      {/* =====================================================
          CONTACT SECTION
      ====================================================== */}
      <section className="mx-auto max-w-[1180px] px-5 py-12 sm:px-6 sm:py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          {/* LEFT SIDE */}
          <div className="pt-2 sm:pt-8">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-600">
              Contact us
            </p>

            <h1 className="mt-3 text-4xl font-bold tracking-[-0.045em] sm:text-5xl">
              How can we help?
            </h1>

            <p className="mt-4 max-w-md text-sm leading-6 text-gray-500">
              Looking for support? Chat to our friendly team 24/7.
              We&apos;re here to help you with NEXUS ECOM.
            </p>

            {/* Quick contact */}
            <div className="mt-7 space-y-3">
              <button
                onClick={scrollToForm}
                className="flex items-center gap-3 text-xs font-semibold text-blue-600 transition hover:text-blue-800"
              >
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-50">
                  ♧
                </span>
                Start a live chat
              </button>

              <a
                href="mailto:hello@nexusecom.com"
                className="flex items-center gap-3 text-xs font-semibold text-blue-600 transition hover:text-blue-800"
              >
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-50">
                  ✉
                </span>
                Shoot us an email
              </a>

              <a
                href="https://x.com"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 text-xs font-semibold text-blue-600 transition hover:text-blue-800"
              >
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-50">
                  X
                </span>
                Message us on X
              </a>
            </div>

            {/* FORM */}
            <form
              id="contact-form"
              onSubmit={handleSubmit}
              className="mt-8 scroll-mt-28"
            >
              {/* First + Last */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-[11px] font-semibold">
                    First name
                  </label>

                  <input
                    required
                    type="text"
                    placeholder="First name"
                    className="h-10 w-full rounded-lg border border-gray-200 px-3 text-xs outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-[11px] font-semibold">
                    Last name
                  </label>

                  <input
                    required
                    type="text"
                    placeholder="Last name"
                    className="h-10 w-full rounded-lg border border-gray-200 px-3 text-xs outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>
              </div>

              {/* Email */}
              <div className="mt-4">
                <label className="mb-2 block text-[11px] font-semibold">
                  Work email
                </label>

                <input
                  required
                  type="email"
                  placeholder="you@company.com"
                  className="h-10 w-full rounded-lg border border-gray-200 px-3 text-xs outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>


              {/* Phone */}
              <div className="mt-4">
                <label className="mb-2 block text-[11px] font-semibold">
                  Phone number
                </label>

                <div className="flex">
                  <select className="h-10 rounded-l-lg border border-r-0 border-gray-200 bg-gray-50 px-2 text-xs outline-none">
                    <option>KH</option>
                    <option>US</option>
                    <option>UK</option>
                    <option>AU</option>
                  </select>

                  <input
                    type="tel"
                    placeholder="+855 00 000 000"
                    className="h-10 flex-1 rounded-r-lg border border-gray-200 px-3 text-xs outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>
              </div>

              {/* Products */}
              <div className="mt-4">
                <label className="mb-3 block text-[11px] font-semibold">
                  Which products are you interested in?
                </label>

                <div className="grid grid-cols-2 gap-y-2">
                  {[
                    "NEXUS Mall",
                    "NEXUS VPN",
                    "NEXUS Calendar",
                    "NEXUS Workspace",
                    "NEXUS Drive",
                    "Other",
                  ].map((product) => (
                    <label
                      key={product}
                      className="flex cursor-pointer items-center gap-2 text-[10px] text-gray-600"
                    >
                      <input
                        type="checkbox"
                        className="h-3.5 w-3.5 accent-blue-600"
                      />

                      {product}
                    </label>
                  ))}
                </div>
              </div>

              {/* Message */}
              <div className="mt-4">
                <label className="mb-2 block text-[11px] font-semibold">
                  Message
                </label>

                <textarea
                  required
                  rows={5}
                  placeholder="Is there anything particular you need help with?"
                  className="w-full resize-none rounded-lg border border-gray-200 px-3 py-3 text-xs outline-none placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="mt-4 h-10 w-full rounded-lg border border-gray-300 bg-white text-xs font-semibold transition hover:border-blue-500 hover:bg-blue-50"
              >
                {submitted ? "✓ Message sent successfully" : "Send message"}
              </button>

              {submitted && (
                <p className="mt-3 rounded-lg bg-green-50 p-3 text-center text-xs font-medium text-green-700">
                  Thank you! We received your message.
                </p>
              )}
            </form>
          </div>

          {/* =================================================
              CAMBODIA MAP
          ================================================== */}
          <div className="relative h-[500px] overflow-hidden rounded-2xl border border-gray-200 bg-blue-50 shadow-sm sm:h-[620px]">
            <iframe
              title="NEXUS ECOM Phnom Penh Cambodia Location"
              src="https://www.google.com/maps?q=Phnom+Penh,Cambodia&output=embed"
              className="h-full w-full border-0"
              loading="lazy"
            />

            {/* Location card */}
            <div className="absolute bottom-5 left-5 right-5 rounded-xl border border-white/70 bg-white/95 p-4 shadow-lg backdrop-blur">
              <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-600 text-white">
                  ⌖
                </div>

                <div className="min-w-0 flex-1">
                  <p className="text-xs font-bold text-gray-900">
                    NEXUS ECOM
                  </p>

                  <p className="mt-1 text-xs text-gray-500">
                    Phnom Penh, Cambodia
                  </p>

                  <p className="mt-1 text-[10px] text-gray-400">
                    Our main office location
                  </p>
                </div>

                <button
                  onClick={openDirections}
                  className="rounded-lg bg-blue-600 px-3 py-2 text-[10px] font-semibold text-white transition hover:bg-blue-700"
                >
                  Directions
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          FAQ
      ====================================================== */}
      <section className="mx-auto max-w-[1080px] px-5 py-14 sm:px-6 sm:py-20">
        <div className="text-center">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-blue-600">
            Support
          </p>

          <h2 className="mt-3 text-3xl font-bold tracking-[-0.04em] sm:text-4xl">
            Frequently asked questions
          </h2>
        </div>

        <div className="mt-10 grid gap-x-12 gap-y-3 md:grid-cols-2">
          {faqs.map((faq, index) => {
            const isOpen = openFaq === index;

            return (
              <div
                key={faq.question}
                className="border-b border-gray-100 py-4"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : index)}
                  className="flex w-full items-start justify-between gap-4 text-left"
                >
                  <div className="flex gap-3">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-gray-200 bg-white text-xs text-blue-600">
                      {index + 1}
                    </span>

                    <div>
                      <h3 className="text-xs font-bold text-gray-900 sm:text-sm">
                        {faq.question}
                      </h3>

                      {isOpen && (
                        <p className="mt-2 text-[11px] leading-5 text-gray-500">
                          {faq.answer}
                        </p>
                      )}
                    </div>
                  </div>

                  <span className="text-gray-400">
                    {isOpen ? "−" : "+"}
                  </span>
                </button>
              </div>
            );
          })}
        </div>

        <div className="mt-8 text-center">
          <button
            onClick={() => setOpenFaq(null)}
            className="rounded-lg border border-gray-300 px-5 py-2 text-[11px] font-semibold transition hover:bg-gray-50"
          >
            Close all
          </button>
        </div>
      </section>

      {/* =====================================================
          STILL HAVE QUESTIONS
      ====================================================== */}
      <section className="mx-auto max-w-[1080px] px-5 pb-8 sm:px-6">
        <div className="flex flex-col gap-5 rounded-2xl border border-gray-200 p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-500 font-bold text-white">
              N
            </div>

            <div>
              <h3 className="text-sm font-bold">Still have questions?</h3>

              <p className="mt-1 text-xs text-gray-500">
                Can&apos;t find the answer you&apos;re looking for?{" "}
                <button
                  onClick={scrollToForm}
                  className="font-semibold text-gray-700 underline"
                >
                  Chat to our friendly team.
                </button>
              </p>
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setSelectedService(services[1])}
              className="rounded-lg border border-gray-300 px-4 py-2 text-[11px] font-semibold transition hover:bg-gray-50"
            >
              Documentation ↗
            </button>

            <button
              onClick={scrollToForm}
              className="rounded-lg bg-blue-600 px-4 py-2 text-[11px] font-semibold text-white transition hover:bg-blue-700"
            >
              Get in touch
            </button>
          </div>
        </div>
      </section>

      {/* =====================================================
          SERVICE CARDS
      ====================================================== */}
      <section className="mx-auto max-w-[1080px] px-5 py-10 sm:px-6 sm:py-14">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, index) => (
            <div
              key={service.title}
              className="group rounded-2xl border border-gray-200 bg-white p-5 transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 text-sm text-blue-600 transition group-hover:border-blue-200 group-hover:bg-blue-50">
                {service.icon}
              </div>

              <h3 className="mt-6 text-sm font-bold">{service.title}</h3>

              <p className="mt-2 text-xs text-gray-500">
                {service.description}
              </p>

              <div className="mt-5 flex flex-col gap-2">
                {/* ABOUT THIS BUTTON */}
                <button
                  onClick={() => setSelectedService(service)}
                  className="rounded-lg border border-gray-300 px-3 py-2 text-[10px] font-semibold transition hover:border-blue-500 hover:bg-blue-50 hover:text-blue-600"
                >
                  About this
                </button>

                {/* MAIN BUTTON */}
                <button
                  onClick={() => {
                    if (index === 2) {
                      openDirections();
                    } else if (index === 3) {
                      callTeam();
                    } else {
                      scrollToForm();
                    }
                  }}
                  className="rounded-lg bg-blue-600 px-3 py-2 text-[10px] font-semibold text-white transition hover:bg-blue-700"
                >
                  {service.button}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>


      {/* =====================================================
          ABOUT THIS MODAL
      ====================================================== */}
      {selectedService && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-5 backdrop-blur-sm"
          onClick={() => setSelectedService(null)}
        >
          <div
            className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal icon */}
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-lg text-blue-600">
                  {selectedService.icon}
                </div>

                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-blue-600">
                    NEXUS ECOM
                  </p>

                  <h2 className="mt-1 text-lg font-bold">
                    {selectedService.title}
                  </h2>
                </div>
              </div>

              <button
                onClick={() => setSelectedService(null)}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-500 transition hover:bg-gray-200"
              >
                ×
              </button>
            </div>

            {/* Modal content */}
            <div className="mt-6 rounded-xl bg-gray-50 p-4">
              <p className="text-sm leading-6 text-gray-600">
                {selectedService.details}
              </p>
            </div>

            {/* Modal actions */}
            <div className="mt-5 flex gap-2">
              <button
                onClick={() => setSelectedService(null)}
                className="flex-1 rounded-lg border border-gray-300 px-4 py-2.5 text-xs font-semibold transition hover:bg-gray-50"
              >
                Close
              </button>

              <button
                onClick={() => {
                  setSelectedService(null);

                  if (selectedService.title === "Visit us") {
                    openDirections();
                  } else if (selectedService.title === "Call us") {
                    callTeam();
                  } else {
                    scrollToForm();
                  }
                }}
                className="flex-1 rounded-lg bg-blue-600 px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-blue-700"
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

