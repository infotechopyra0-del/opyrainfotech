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

export default function GetQuotePage() {
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

  const services = [
    "Web Design & Development",
    "E-commerce Solutions",
    "Mobile App Development",
    "Custom Software Development",
    "ERP Systems",
    "CRM Solutions",
    "Digital Marketing",
    "SEO Services",
    "Brand Identity & Design",
    "Other",
  ];

  const budgetRanges = [
    "Under ₹50,000",
    "₹50,000 - ₹1,00,000",
    "₹1,00,000 - ₹2,50,000",
    "₹2,50,000 - ₹5,00,000",
    "₹5,00,000 - ₹10,00,000",
    "Above ₹10,00,000",
  ];

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    // capture the form element reference before any await (React synthetic event pooling)
    const form = event.currentTarget as HTMLFormElement;

    const formData = new FormData(form);

    // Get all selected services
    const selectedServices: string[] = [];
    formData.getAll("services").forEach((service) => {
      selectedServices.push(service.toString());
    });

    // Validate that at least one service is selected
    if (selectedServices.length === 0) {
      toast.error("Please select at least one service! ⚠️", {
        description:
          "You must choose at least one service for your quote request.",
      });
      setIsSubmitting(false);
      return;
    }

    // Create quote object
    const quoteData = {
      name: formData.get("name")?.toString() || "",
      email: formData.get("email")?.toString() || "",
      phone: formData.get("phone")?.toString() || "",
      company: formData.get("company")?.toString() || "",
      services: selectedServices,
      budget: formData.get("budget")?.toString() || "",
      timeline: formData.get("timeline")?.toString() || "",
      description: formData.get("description")?.toString() || "",
      additional_info: formData.get("additional_info")?.toString() || "",
    };

    // Validate all required fields
    if (
      !quoteData.name ||
      !quoteData.email ||
      !quoteData.phone ||
      !quoteData.budget ||
      !quoteData.timeline ||
      !quoteData.description
    ) {
      toast.error("Please fill all required fields! ⚠️", {
        description: "All fields marked with * are required.",
      });
      setIsSubmitting(false);
      return;
    }

    // Validate description length (minimum 50 characters)
    if (quoteData.description.length < 50) {
      toast.error("Description too short! ⚠️", {
        description:
          "Please provide at least 50 characters in your project description.",
      });
      setIsSubmitting(false);
      return;
    }

    try {
      // Send to database
      const response = await fetch("/api/quotes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(quoteData),
      });

      const data = await response.json();

      if (response.ok) {
        // Success
        toast.success("Quote request sent successfully! ✅", {
          description:
            "We'll prepare your custom quote and get back to you within 24 hours.",
        });

        // Reset form using captured reference
        form.reset();

        // Scroll to top
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        // Error from server
        toast.error("Failed to submit quote request! ❌", {
          description: data.error || "Please try again or contact us directly.",
        });
      }
    } catch (error) {
      toast.error("Something went wrong! ❌", {
        description: "Please check your internet connection and try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-brown-50 to-brown-100 relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
          <span className="text-[8rem] sm:text-[12rem] md:text-[16rem] lg:text-[20rem] font-black creative-text select-none whitespace-nowrap">
            QUOTE
          </span>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <div className="mb-8">
              <span className="diagonal-text bg-brown-600 text-white px-6 py-2 text-lg font-bold creative-text">
                FREE CONSULTATION
              </span>
            </div>

            <h1 className="text-4xl md:text-6xl font-black text-brown-800 mb-8 creative-text leading-tight">
              <span className="block">GET A</span>
              <span className="curved-text italic text-brown-600">
                Custom Quote
              </span>
            </h1>

            <div className="relative max-w-4xl mx-auto">
              <p className="text-lg sm:text-xl md:text-2xl text-gray-700 creative-text italic leading-relaxed mb-6">
                "Tell us about your
                <span className="diagonal-text bg-brown-100 px-2 font-bold">
                  project vision
                </span>
                and we'll provide you with a detailed, transparent quote within
                24 hours."
              </p>

              <p className="text-lg text-gray-600 creative-text leading-relaxed">
                No hidden fees, no surprises - just
                <span className="curved-text font-bold text-brown-700">
                  honest pricing
                </span>
                for exceptional results.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Quote Form Section */}
      <section className="py-16 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative">
            {/* Decorative background */}
            <div className="absolute -inset-4 bg-gradient-to-br from-brown-100 to-brown-200 rounded-2xl transform rotate-1"></div>

            <div className="relative bg-white p-8 md:p-12 rounded-lg shadow-xl transform -rotate-1 hover:rotate-0 transition-transform duration-300">
              <div className="mb-8 text-center">
                <h2 className="text-3xl md:text-4xl font-black text-brown-800 creative-text mb-4">
                  <span className="diagonal-text bg-brown-100 px-4 py-2">
                    Project Details
                  </span>
                </h2>
                <p className="text-gray-600">
                  Fill out the form below and our team will prepare a custom
                  quote for your project
                </p>
              </div>

              <form onSubmit={onSubmit} className="space-y-8">
                {/* Personal Information */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-bold text-brown-800 mb-2 creative-text"
                    >
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      className="w-full px-4 py-3 border-2 border-brown-300 rounded-lg focus:ring-brown-500 focus:border-brown-500 creative-text transition-all duration-300"
                      required
                      placeholder="Your full name"
                      minLength={3}
                      maxLength={100}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-bold text-brown-800 mb-2 creative-text"
                    >
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="w-full px-4 py-3 border-2 border-brown-300 rounded-lg focus:ring-brown-500 focus:border-brown-500 creative-text transition-all duration-300"
                      required
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-bold text-brown-800 mb-2 creative-text"
                    >
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      className="w-full px-4 py-3 border-2 border-brown-300 rounded-lg focus:ring-brown-500 focus:border-brown-500 creative-text transition-all duration-300"
                      required
                      placeholder="+91 XXXXX XXXXX"
                      pattern="[\+]?[(]?[0-9]{1,4}[)]?[-\s\.]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{1,9}"
                      title="Please enter a valid phone number"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="company"
                      className="block text-sm font-bold text-brown-800 mb-2 creative-text"
                    >
                      Company Name
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      className="w-full px-4 py-3 border-2 border-brown-300 rounded-lg focus:ring-brown-500 focus:border-brown-500 creative-text transition-all duration-300"
                      placeholder="Your company (optional)"
                      maxLength={150}
                    />
                  </div>
                </div>

                {/* Services Selection */}
                <div>
                  <label className="block text-sm font-bold text-brown-800 mb-4 creative-text">
                    Services Required * (Select all that apply)
                  </label>
                  <div className="grid md:grid-cols-2 gap-3">
                    {services.map((service, index) => (
                      <label
                        key={index}
                        className="flex items-center p-3 border-2 border-brown-200 rounded-lg hover:bg-brown-50 cursor-pointer transition-all duration-300"
                      >
                        <input
                          type="checkbox"
                          name="services"
                          value={service}
                          className="mr-3 text-brown-600 focus:ring-brown-500 rounded w-4 h-4"
                        />
                        <span className="text-brown-700 font-medium">
                          {service}
                        </span>
                      </label>
                    ))}
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    * Please select at least one service
                  </p>
                </div>

                {/* Budget Range */}
                <div>
                  <label
                    htmlFor="budget"
                    className="block text-sm font-bold text-brown-800 mb-3 creative-text"
                  >
                    Estimated Budget Range *
                  </label>
                  <select
                    id="budget"
                    name="budget"
                    className="w-full px-4 py-3 border-2 border-brown-300 rounded-lg focus:ring-brown-500 focus:border-brown-500 creative-text transition-all duration-300"
                    required
                  >
                    <option value="">Select your budget range</option>
                    {budgetRanges.map((range, index) => (
                      <option key={index} value={range}>
                        {range}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Timeline */}
                <div>
                  <label
                    htmlFor="timeline"
                    className="block text-sm font-bold text-brown-800 mb-3 creative-text"
                  >
                    Project Timeline *
                  </label>
                  <select
                    id="timeline"
                    name="timeline"
                    className="w-full px-4 py-3 border-2 border-brown-300 rounded-lg focus:ring-brown-500 focus:border-brown-500 creative-text transition-all duration-300"
                    required
                  >
                    <option value="">When do you need this completed?</option>
                    <option value="ASAP (Rush job)">ASAP (Rush job)</option>
                    <option value="Within 2 weeks">Within 2 weeks</option>
                    <option value="Within 1 month">Within 1 month</option>
                    <option value="Within 2-3 months">Within 2-3 months</option>
                    <option value="3-6 months">3-6 months</option>
                    <option value="No specific deadline">
                      No specific deadline
                    </option>
                  </select>
                </div>

                {/* Project Description */}
                <div>
                  <label
                    htmlFor="description"
                    className="block text-sm font-bold text-brown-800 mb-3 creative-text"
                  >
                    Project Description *
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    rows={6}
                    className="w-full px-4 py-3 border-2 border-brown-300 rounded-lg focus:ring-brown-500 focus:border-brown-500 creative-text resize-none transition-all duration-300"
                    required
                    placeholder="Please describe your project in detail. Include features, functionality, design preferences, target audience, and any specific requirements..."
                    minLength={50}
                    maxLength={2000}
                  ></textarea>
                  <p className="text-xs text-gray-500 mt-2">
                    * Minimum 50 characters required
                  </p>
                </div>

                {/* Additional Information */}
                <div>
                  <label
                    htmlFor="additional_info"
                    className="block text-sm font-bold text-brown-800 mb-3 creative-text"
                  >
                    Additional Information
                  </label>
                  <textarea
                    id="additional_info"
                    name="additional_info"
                    rows={4}
                    className="w-full px-4 py-3 border-2 border-brown-300 rounded-lg focus:ring-brown-500 focus:border-brown-500 creative-text resize-none transition-all duration-300"
                    placeholder="Any additional details, existing systems to integrate with, preferred technologies, examples of similar projects, etc."
                    maxLength={1000}
                  ></textarea>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full px-8 py-4 rounded-lg transition-all duration-300 font-bold text-lg creative-text transform shadow-xl ${
                    isSubmitting
                      ? "bg-gray-500 cursor-not-allowed"
                      : "bg-brown-700 hover:bg-brown-800 hover:scale-105 text-white"
                  }`}
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center">
                      <svg
                        className="animate-spin h-5 w-5 mr-3"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                          fill="none"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      SENDING QUOTE REQUEST...
                    </span>
                  ) : (
                    "GET MY CUSTOM QUOTE"
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-brown-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-brown-800 mb-4 creative-text">
              Why Choose Our Quote Process?
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-lg text-center hover:shadow-xl transition-all duration-300">
              <div className="text-5xl mb-4">⚡</div>
              <h3 className="text-xl font-black text-brown-800 mb-3">
                Fast Response
              </h3>
              <p className="text-gray-600">
                Get your detailed quote within 24 hours of submission
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg text-center hover:shadow-xl transition-all duration-300">
              <div className="text-5xl mb-4">💎</div>
              <h3 className="text-xl font-black text-brown-800 mb-3">
                Transparent Pricing
              </h3>
              <p className="text-gray-600">
                No hidden fees or surprise costs - everything is clearly
                outlined
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg text-center hover:shadow-xl transition-all duration-300">
              <div className="text-5xl mb-4">🎯</div>
              <h3 className="text-xl font-black text-brown-800 mb-3">
                Tailored Solutions
              </h3>
              <p className="text-gray-600">
                Custom quotes based on your specific project requirements
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-brown-800 to-brown-900 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-6">
            Need to Discuss Your Project First?
          </h2>
          <p className="text-xl text-brown-100 mb-8 max-w-2xl mx-auto">
            Schedule a free consultation call to discuss your project
            requirements before requesting a quote.
          </p>

          <a
            onClick={(e) => {
              e.preventDefault();
              setConsultDialogOpen(true);
            }}
            href="#"
            className="bg-white text-brown-800 px-8 py-4 rounded-xl..."
          >
            <span>📞</span>
            Schedule Free Consultation
          </a>
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
