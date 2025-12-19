"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { toast } from "sonner";
import { X } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export default function AboutPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [consultDialogOpen, setConsultDialogOpen] = useState(false);
  const [consultSubmitting, setConsultSubmitting] = useState(false);

  // Handle consultation form submit
  const handleConsultationSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    setConsultSubmitting(true);

    // capture form element to avoid synthetic event pooling issues
    const form = event.currentTarget as HTMLFormElement;
    const formData = new FormData(form);

    const consultData = {
      name: formData.get("name")?.toString() || "",
      email: formData.get("email")?.toString() || "",
      phone: formData.get("phone")?.toString() || "",
      company: formData.get("company")?.toString() || "",
      preferredDate: formData.get("preferredDate")?.toString() || "",
      preferredTime: formData.get("preferredTime")?.toString() || "",
      projectType: formData.get("projectType")?.toString() || "",
      message: formData.get("message")?.toString() || "",
    };

    try {
      const response = await fetch("/api/consultations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(consultData),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Consultation request sent successfully! 📞", {
          description:
            "We'll contact you soon to confirm your consultation schedule.",
        });
        setConsultDialogOpen(false);
        form.reset();
      } else {
        // If server sent which fields are missing, show them in the toast
        if (
          data?.missing &&
          Array.isArray(data.missing) &&
          data.missing.length
        ) {
          toast.error("Missing required fields", {
            description: `Please fill: ${data.missing.join(", ")}`,
          });
        } else if (data?.details && typeof data.details === "object") {
          const details = Object.entries(data.details)
            .map(([k, v]) => `${k}: ${v}`)
            .join("; ");
          toast.error("Validation failed", { description: details });
        } else {
          toast.error("Failed to submit consultation request! ❌", {
            description: data.error || "Please try again.",
          });
        }
      }
    } catch (error) {
      toast.error("Something went wrong! ❌", {
        description: "Please check your connection and try again.",
      });
    } finally {
      setConsultSubmitting(false);
    }
  };
  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      <section className="pt-24 pb-16 bg-gradient-to-br from-brown-50 to-brown-100 relative overflow-hidden">
        {/* Background decorative text - Mobile friendly */}
        <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
          <span className="text-[8rem] sm:text-[12rem] md:text-[16rem] lg:text-[20rem] font-black creative-text select-none whitespace-nowrap">
            ABOUT
          </span>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <div className="mb-8">
              <span className="diagonal-text bg-brown-600 text-white px-6 py-2 text-lg font-bold creative-text">
                WHO WE ARE
              </span>
            </div>

            <h1 className="text-4xl md:text-6xl font-black text-brown-800 mb-8 creative-text leading-tight">
              <span className="block">ABOUT</span>
              <span className="curved-text italic text-brown-600">
                Opyra Infotech
              </span>
            </h1>

            <div className="relative max-w-4xl mx-auto">
              <p className="text-lg sm:text-xl md:text-2xl text-gray-700 creative-text italic leading-relaxed mb-6">
                "We are a team of
                <span className="hidden sm:inline vertical-text mx-2 text-brown-700 font-bold">
                  40
                </span>
                <span className="sm:hidden text-brown-700 font-bold">40</span>
                web experts with over
                <span className="diagonal-text bg-brown-100 px-2 font-bold">
                  12 years
                </span>
                of experience in website building and marketing to help
                businesses grow online."
              </p>

              <p className="text-lg text-gray-600 creative-text leading-relaxed">
                If you are looking for the
                <span className="curved-text font-bold text-brown-700">
                  best website design
                </span>
                , development, and marketing services to grow your business
                online, we are here to help. We are a team of
                <span className="diagonal-text bg-brown-600 text-white px-2 font-bold">
                  certified experts
                </span>
                with tremendous experience who'll walk with you all through.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              {/* Creative background element - Mobile friendly */}
              <div className="absolute -top-4 -left-2 sm:-top-8 sm:-left-8 outline-text text-6xl sm:text-8xl md:text-9xl font-black opacity-10 pointer-events-none">
                OUR
              </div>

              <div className="relative z-10">
                <h2 className="text-4xl font-black text-brown-800 mb-8 creative-text">
                  <span className="diagonal-text bg-brown-100 px-4 py-1">
                    Our Story
                  </span>
                </h2>

                <div className="space-y-6">
                  <p className="text-lg text-gray-700 leading-relaxed creative-text">
                    Founded with a vision to
                    <span className="curved-text font-bold text-brown-700">
                      empower businesses
                    </span>
                    in the digital world, Opyra Infotech has been at the
                    forefront of web design and digital marketing innovation for
                    over a decade.
                  </p>

                  <p className="text-lg text-gray-700 leading-relaxed creative-text italic">
                    Our team combines creativity with technical expertise to
                    deliver solutions that not only look great but also drive
                    real business results for our clients.
                  </p>
                </div>
              </div>
            </div>

            <div className="relative overflow-hidden">
              <div className="floating-element bg-brown-100 rounded-lg p-8 sm:p-12 text-center transform rotate-2 hover:rotate-0 transition-transform duration-300">
                <div className="text-6xl sm:text-8xl mb-4 sm:mb-6">🚀</div>
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-brown-800 creative-text">
                  <span className="outline-text">12+</span>
                </h3>
                <p className="text-lg sm:text-xl text-gray-600 font-bold creative-text tracking-wider">
                  YEARS OF EXCELLENCE
                </p>
              </div>

              {/* Decorative elements - Mobile safe */}
              <div className="absolute -bottom-2 -right-2 sm:-bottom-4 sm:-right-4 w-16 h-16 sm:w-24 sm:h-24 bg-brown-600 opacity-20 transform rotate-45"></div>
              <div className="absolute -top-2 -left-2 sm:-top-4 sm:-left-4 w-12 h-12 sm:w-16 sm:h-16 bg-brown-300 opacity-30 rounded-full"></div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-brown-50 relative overflow-hidden">
        {/* Background pattern - Mobile safe */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 hidden sm:block vertical-text text-brown-200 text-xl font-bold opacity-20">
            VALUES • PRINCIPLES • COMMITMENT
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Core Values Section */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-brown-800 mb-12 creative-text">
              <span className="diagonal-text bg-brown-100 px-6 py-2">
                Our Core Values
              </span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
            <div className="group text-center">
              <div className="floating-element bg-white p-8 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-16 h-16 bg-brown-600 transform rotate-45 translate-x-8 -translate-y-8 opacity-10"></div>
                <div className="text-4xl mb-4">🎯</div>
                <h3 className="text-lg font-black text-brown-700 mb-3 creative-text">
                  <span className="curved-text">Committed to Excellence</span>
                </h3>
                <p className="text-gray-600 creative-text italic">
                  Delivering the best results for every project
                </p>
              </div>
            </div>

            <div className="group text-center">
              <div className="floating-element bg-white p-8 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-16 h-16 bg-brown-300 rounded-full transform -translate-x-8 -translate-y-8 opacity-20"></div>
                <div className="text-4xl mb-4">💎</div>
                <h3 className="text-lg font-black text-brown-700 mb-3 creative-text">
                  <span className="curved-text">Honest & Transparent</span>
                </h3>
                <p className="text-gray-600 creative-text italic">
                  Building trust through transparent services
                </p>
              </div>
            </div>

            <div className="group text-center">
              <div className="floating-element bg-white p-8 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300 relative overflow-hidden">
                <div className="absolute bottom-0 right-0 w-12 h-12 bg-brown-500 transform -rotate-12 translate-x-6 translate-y-6 opacity-15"></div>
                <div className="text-4xl mb-4">❤️</div>
                <h3 className="text-lg font-black text-brown-700 mb-3 creative-text">
                  <span className="curved-text">We Care</span>
                </h3>
                <p className="text-gray-600 creative-text italic">
                  Your business matters to us like our own
                </p>
              </div>
            </div>

            <div className="group text-center">
              <div className="floating-element bg-white p-8 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-20 h-20 bg-brown-400 transform rotate-45 translate-x-10 -translate-y-10 opacity-10"></div>
                <div className="text-4xl mb-4">🚀</div>
                <h3 className="text-lg font-black text-brown-700 mb-3 creative-text">
                  <span className="curved-text">Always Learning</span>
                </h3>
                <p className="text-gray-600 creative-text italic">
                  Adapting to new technologies constantly
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Client Testimonials Section */}
      <section className="py-20 relative overflow-hidden">
        {/* Background decorative text - Mobile friendly */}
        <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
          <span className="text-[8rem] sm:text-[10rem] md:text-[12rem] lg:text-[15rem] font-black creative-text select-none whitespace-nowrap">
            REVIEWS
          </span>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <div className="mb-8">
              <span className="diagonal-text bg-brown-600 text-white px-6 py-2 text-lg font-bold creative-text">
                TESTIMONIALS
              </span>
            </div>

            <h2 className="text-4xl md:text-5xl font-black text-brown-800 mb-8 creative-text leading-tight">
              <span className="block">What Our</span>
              <span className="curved-text italic text-brown-600">
                Clients Say
              </span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
            <div className="group">
              <div className="bg-white p-8 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300 relative overflow-hidden">
                <div className="absolute top-0 right-0 text-brown-100 text-6xl font-black">
                  "
                </div>
                <div className="flex items-center mb-6">
                  <div className="text-3xl mr-3">⭐</div>
                  <span className="text-2xl font-black text-brown-700 creative-text">
                    5.0/5
                  </span>
                </div>
                <p className="text-gray-700 italic mb-6 creative-text leading-relaxed">
                  "Opyra Infotech transformed our business completely! Their
                  team delivered an outstanding website that exceeded our
                  expectations. The design is modern, user-friendly, and has
                  significantly increased our customer engagement. Highly
                  recommend their services!"
                </p>
                <div className="flex items-center">
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face&auto=format&q=80"
                    alt="Arjun Rajesh Mahindra"
                    className="w-12 h-12 rounded-full mr-4 object-cover"
                  />
                  <div>
                    <h4 className="font-black text-brown-800 creative-text">
                      Abhishek Jha
                    </h4>
                    <p className="text-brown-600 text-sm">
                      Chairman & CEO, Mahindra Tech Ventures
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="group">
              <div className="bg-white p-8 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300 relative overflow-hidden">
                <div className="absolute top-0 right-0 text-brown-100 text-6xl font-black">
                  "
                </div>
                <div className="flex items-center mb-6">
                  <div className="text-3xl mr-3">⭐</div>
                  <span className="text-2xl font-black text-brown-700 creative-text">
                    4.8/5
                  </span>
                </div>
                <p className="text-gray-700 italic mb-6 creative-text leading-relaxed">
                  "Working with Opyra Infotech was a game-changer for our
                  startup. They understood our vision perfectly and created a
                  digital presence that truly represents our brand. The team is
                  professional, responsive, and delivers on time. Outstanding
                  work!"
                </p>
                <div className="flex items-center">
                  <img
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop&crop=face&auto=format&q=80"
                    alt="Ananya Priya Agarwal"
                    className="w-12 h-12 rounded-full mr-4 object-cover"
                  />
                  <div>
                    <h4 className="font-black text-brown-800 creative-text">
                      Ananya Priya Agarwal
                    </h4>
                    <p className="text-brown-600 text-sm">
                      Founder & Managing Director, Agarwal Innovations
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="group">
              <div className="bg-white p-8 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300 relative overflow-hidden">
                <div className="absolute top-0 right-0 text-brown-100 text-6xl font-black">
                  "
                </div>
                <div className="flex items-center mb-6">
                  <div className="text-3xl mr-3">⭐</div>
                  <span className="text-2xl font-black text-brown-700 creative-text">
                    4.9/5
                  </span>
                </div>
                <p className="text-gray-700 italic mb-6 creative-text leading-relaxed">
                  "Incredible experience with Opyra Infotech! They redesigned
                  our e-commerce platform and the results have been phenomenal.
                  Our sales increased by 60% within the first month. The team's
                  expertise in digital marketing is unmatched. Truly the best
                  investment we made!"
                </p>
                <div className="flex items-center">
                  <img
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face&auto=format&q=80"
                    alt="Vikram Suresh Bajaj"
                    className="w-12 h-12 rounded-full mr-4 object-cover"
                  />
                  <div>
                    <h4 className="font-black text-brown-800 creative-text">
                      Vikram Suresh Bajaj
                    </h4>
                    <p className="text-brown-600 text-sm">
                      Executive Director, Bajaj Fashion Empire
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="group">
              <div className="bg-white p-8 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300 relative overflow-hidden">
                <div className="absolute top-0 right-0 text-brown-100 text-6xl font-black">
                  "
                </div>
                <div className="flex items-center mb-6">
                  <div className="text-3xl mr-3">⭐</div>
                  <span className="text-2xl font-black text-brown-700 creative-text">
                    5.0/5
                  </span>
                </div>
                <p className="text-gray-700 italic mb-6 creative-text leading-relaxed">
                  "Opyra Infotech exceeded all our expectations! Their creative
                  team designed a stunning website for our restaurant chain, and
                  their digital marketing strategies brought us so many new
                  customers. Professional, creative, and results-driven.
                  Couldn't be happier!"
                </p>
                <div className="flex items-center">
                  <img
                    src="https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&crop=face&auto=format&q=80"
                    alt="Ishita Kavya Singhania"
                    className="w-12 h-12 rounded-full mr-4 object-cover"
                  />
                  <div>
                    <h4 className="font-black text-brown-800 creative-text">
                      Ishita Kavya Singhania
                    </h4>
                    <p className="text-brown-600 text-sm">
                      Owner & CEO, Singhania Hospitality Group
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-brown-100 to-brown-50 relative overflow-hidden">
        {/* Background decorative elements - Mobile safe */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 right-1/4 hidden lg:block vertical-text text-brown-200 text-xl font-bold opacity-20">
            PROJECT • GROWTH • SUCCESS
          </div>
          <div className="absolute bottom-1/4 left-1/4 outline-text text-4xl sm:text-6xl md:text-8xl font-black opacity-5">
            CTA
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="mb-8">
                <span className="diagonal-text bg-brown-600 text-white px-6 py-2 text-lg font-bold creative-text">
                  LET'S WORK TOGETHER
                </span>
              </div>

              <h2 className="text-4xl md:text-5xl font-black text-brown-800 mb-8 creative-text leading-tight">
                <span className="block">Have a</span>
                <span className="curved-text italic text-brown-600">
                  Project in Mind?
                </span>
              </h2>

              <p className="text-xl text-gray-700 mb-8 creative-text italic leading-relaxed">
                We can help you bring your
                <span className="diagonal-text bg-brown-100 px-2 font-bold">
                  ideas to life
                </span>
                . Let's talk about what we can build and raise together.
              </p>

              <p className="text-lg text-gray-600 mb-10 creative-text">
                When connected with us, you aren't growing your business alone.
                We have your back and put in our best to contribute to the
                growth of your entire team and organization.
              </p>

              <div className="flex flex-col sm:flex-row gap-6">
                <a
                  onClick={(e) => {
                    e.preventDefault();
                    setConsultDialogOpen(true);
                  }}
                  href="#"
                  className="group relative overflow-hidden bg-brown-700 text-white px-10 py-4 text-xl font-bold creative-text transform -rotate-1 hover:rotate-0 transition-all duration-300 shadow-2xl inline-block text-center"
                >
                  <span className="relative z-10">SCHEDULE A CALL</span>
                  <div className="absolute inset-0 bg-brown-800 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                </a>

                <div className="relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-brown-600 to-brown-800 rounded-lg blur opacity-25"></div>
                  <a
                    href="/portfolio"
                    className="relative bg-transparent border-2 border-brown-700 text-brown-700 px-10 py-4 text-xl font-bold creative-text transform rotate-1 hover:rotate-0 transition-all duration-300 hover:bg-brown-700 hover:text-white inline-block text-center"
                  >
                    VIEW PORTFOLIO
                  </a>
                </div>
              </div>
            </div>

            <div className="relative overflow-hidden">
              <div className="floating-element">
                <div className="bg-white p-6 sm:p-8 rounded-lg shadow-xl transform rotate-3 hover:rotate-0 transition-transform duration-300">
                  <div className="text-center mb-4 sm:mb-6">
                    <div className="text-4xl sm:text-6xl mb-3 sm:mb-4">🚀</div>
                    <h3 className="text-xl sm:text-2xl font-black text-brown-800 creative-text">
                      <span className="curved-text">
                        Let's Build Something Great
                      </span>
                    </h3>
                  </div>

                  <div className="space-y-3 sm:space-y-4 text-center">
                    <div className="flex items-center justify-center">
                      <span className="text-brown-600 mr-2">✓</span>
                      <span className="creative-text font-bold text-sm sm:text-base">
                        Free Consultation
                      </span>
                    </div>
                    <div className="flex items-center justify-center">
                      <span className="text-brown-600 mr-2">✓</span>
                      <span className="creative-text font-bold text-sm sm:text-base">
                        Custom Solutions
                      </span>
                    </div>
                    <div className="flex items-center justify-center">
                      <span className="text-brown-600 mr-2">✓</span>
                      <span className="creative-text font-bold text-sm sm:text-base">
                        Proven Results
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Decorative elements - Mobile safe */}
              <div className="absolute -bottom-3 -right-3 sm:-bottom-6 sm:-right-6 w-20 h-20 sm:w-32 sm:h-32 bg-brown-600 opacity-10 transform rotate-45"></div>
              <div className="absolute -top-3 -left-3 sm:-top-6 sm:-left-6 w-16 h-16 sm:w-24 sm:h-24 bg-brown-300 opacity-20 rounded-full"></div>
            </div>
          </div>
        </div>
      </section>
      {/* Consultation Dialog */}
      <AlertDialog open={consultDialogOpen} onOpenChange={setConsultDialogOpen}>
        <AlertDialogContent
          className="
      bg-white
      border-2 border-brown-200
      w-[95vw] sm:w-[90vw] md:w-full
      max-w-2xl
      h-auto
      max-h-[95vh]
      rounded-xl
      overflow-hidden
      p-4 sm:p-6
    "
        >
          {/* ❌ Close Button */}
          <button
            type="button"
            onClick={() => setConsultDialogOpen(false)}
            className="absolute top-3 right-3 sm:top-4 sm:right-4 p-2 rounded-full
                 text-gray-500 hover:text-brown-900 hover:bg-brown-100 transition"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header */}
          <AlertDialogHeader className="pr-10">
            <AlertDialogTitle className="flex items-center text-xl sm:text-2xl font-black text-brown-900">
              <span className="text-2xl sm:text-3xl mr-3">📞</span>
              Schedule Free Consultation
            </AlertDialogTitle>
            <AlertDialogDescription className="text-gray-600 text-sm sm:text-base">
              Fill in your details and we'll contact you to confirm your
              consultation schedule
            </AlertDialogDescription>
          </AlertDialogHeader>

          {/* FORM */}
          <form onSubmit={handleConsultationSubmit} className="space-y-5 mt-4">
            {/* Personal Info */}
            <div>
              <h3 className="text-base sm:text-lg font-semibold text-brown-900 mb-3">
                Personal Information
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  required
                  className="input"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  required
                  className="input"
                />
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  required
                  className="input"
                />
                <input
                  type="text"
                  name="company"
                  placeholder="Company (Optional)"
                  className="input"
                />
              </div>
            </div>

            {/* Schedule */}
            <div>
              <h3 className="text-base sm:text-lg font-semibold text-brown-900 mb-3">
                Preferred Schedule
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="date"
                  name="preferredDate"
                  required
                  className="input"
                />
                <input
                  type="time"
                  name="preferredTime"
                  required
                  className="input"
                />
              </div>
            </div>

            {/* Project */}
            <div>
              <h3 className="text-base sm:text-lg font-semibold text-brown-900 mb-3">
                Project Details
              </h3>

              <div className="space-y-4">
                <select name="projectType" required className="input">
                  <option value="">Select Project Type</option>
                  <option value="web-development">Web Development</option>
                  <option value="mobile-app">Mobile App</option>
                  <option value="ui-ux">UI / UX Design</option>
                  <option value="ecommerce">E-Commerce</option>
                  <option value="seo">SEO & Marketing</option>
                  <option value="other">Other</option>
                </select>

                <textarea
                  name="message"
                  placeholder="Brief description of your project"
                  rows={3}
                  required
                  className="input resize-none w-full"
                />
              </div>
            </div>

            <input type="hidden" name="status" value="pending" />
            <input type="hidden" name="priority" value="medium" />

            <button
              type="submit"
              className="w-full py-3 rounded-lg bg-brown-900 text-white font-semibold
                   hover:bg-brown-800 transition text-sm sm:text-base"
            >
              Schedule Consultation
            </button>
          </form>
        </AlertDialogContent>
      </AlertDialog>

      <Footer />
    </main>
  );
}
