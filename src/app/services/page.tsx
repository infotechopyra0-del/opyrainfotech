"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { toast } from "sonner";
import Link from "next/link";
import { X, Loader2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface Service {
  id?: string;
  _id?: string;
  title: string;
  description: string;
  features: string[];
  image: string;
  color: string;
  order: number;
}

interface AdditionalService {
  id?: string;
  _id?: string;
  title: string;
  description: string;
  image: string;
  order: number;
}

interface SoftwareService {
  id?: string;
  _id?: string;
  title: string;
  description: string;
  image: string;
  points: string[];
  order: number;
}

export default function ServicesPage() {
  const [consultDialogOpen, setConsultDialogOpen] = useState(false);
  const [consultSubmitting, setConsultSubmitting] = useState(false);
  
  // State for fetched data
  const [services, setServices] = useState<Service[]>([]);
  const [additionalServices, setAdditionalServices] = useState<AdditionalService[]>([]);
  const [softwareServices, setSoftwareServices] = useState<SoftwareService[]>([]);
  
  // Loading states
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch all services on mount
  useEffect(() => {
    const fetchAllServices = async () => {
      try {
        setLoading(true);
        setError(null);

        const [servicesRes, additionalRes, softwareRes] = await Promise.all([
          fetch("/api/services"),
          fetch("/api/additional-services"),
          fetch("/api/software-services"),
        ]);

        if (!servicesRes.ok || !additionalRes.ok || !softwareRes.ok) {
          throw new Error("Failed to fetch services");
        }

        const [servicesData, additionalData, softwareData] = await Promise.all([
          servicesRes.json(),
          additionalRes.json(),
          softwareRes.json(),
        ]);

        setServices(servicesData.data || []);
        setAdditionalServices(additionalData.data || []);
        setSoftwareServices(softwareData.data || []);
      } catch (err) {
        console.error("Error fetching services:", err);
        setError("Failed to load services. Please refresh the page.");
        toast.error("Failed to load services");
      } finally {
        setLoading(false);
      }
    };

    fetchAllServices();
  }, []);

  const handleConsultationSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    setConsultSubmitting(true);

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

  const clients = [
    { name: "TechCorp Solutions", logo: "🏢" },
    { name: "Creative Industries", logo: "🎭" },
    { name: "Global Ventures", logo: "🌍" },
    { name: "Innovation Labs", logo: "⚡" },
  ];

  // Loading state
  if (loading) {
    return (
      <main className="min-h-screen bg-white">
        <Navbar />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <Loader2 className="w-12 h-12 text-brown-600 animate-spin mx-auto mb-4" />
            <p className="text-gray-600 text-lg">Loading services...</p>
          </div>
        </div>
        <Footer />
      </main>
    );
  }

  // Error state
  if (error) {
    return (
      <main className="min-h-screen bg-white">
        <Navbar />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <p className="text-red-600 text-lg mb-4">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="bg-brown-600 text-white px-6 py-2 rounded-lg hover:bg-brown-700"
            >
              Retry
            </button>
          </div>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-brown-50 via-brown-100 to-brown-200 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-brown-900/5 to-brown-600/5"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-black text-brown-900 mb-4 tracking-tight">
              Services
            </h1>
            <h2 className="text-2xl md:text-3xl font-bold text-brown-700 mb-6">
              How can we help you?
            </h2>
            <p className="text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
              We offer comprehensive digital solutions designed to elevate your
              business and create lasting impact in the digital landscape.
            </p>
          </div>
        </div>
      </section>

      {/* Main Services */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {services.length === 0 ? (
            <p className="text-center text-gray-500">No services available</p>
          ) : (
            <div className="grid lg:grid-cols-3 gap-8 items-stretch">
              {services.map((service, sidx) => (
                <div key={service.id ?? service._id ?? sidx} className="group relative h-full">
                  <div className="bg-white rounded-2xl shadow-xl border-2 border-brown-100 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden h-full flex flex-col">
                    <div className="relative h-64 w-full overflow-hidden flex-shrink-0">
                      <Image
                        src={service.image}
                        alt={service.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className={`absolute inset-0 bg-gradient-to-t ${service.color} opacity-20 group-hover:opacity-30 transition-opacity duration-500`} />
                    </div>

                    <div className="p-8 flex flex-col h-full">
                      <div className={`h-1 w-16 bg-gradient-to-r ${service.color} mb-4`} />
                      <h3 className="text-2xl font-black text-brown-900 mb-4 tracking-tight min-h-[64px]">
                        {service.title}
                      </h3>
                      <p className="text-gray-600 mb-6 leading-relaxed min-h-[96px]">
                        {service.description}
                      </p>

                      <div className="mt-auto">
                        <div className="space-y-3 bg-brown-50 rounded-xl p-5">
                          {service.features.map((feature, idx) => (
                            <div key={idx} className="flex items-start text-gray-700">
                              <div className="w-2 h-2 bg-brown-600 rounded-full mr-3 flex-shrink-0 mt-2" />
                              <span className="font-medium text-sm">{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Software Development & ERP Section */}
      <section className="py-20 bg-gradient-to-br from-brown-800 to-brown-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">
              Software Development & ERP Solutions
            </h2>
            <p className="text-xl text-brown-100 max-w-4xl mx-auto leading-relaxed">
              We provide comprehensive software development services including
              various types of ERP and CRM systems tailored to your business needs
            </p>
          </div>

          {softwareServices.length === 0 ? (
            <p className="text-center text-brown-100">No software services available</p>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
              {softwareServices.map((service, sidx) => (
                <div key={service.id ?? service._id ?? sidx} className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-300 overflow-hidden h-full flex flex-col">
                  <div className="w-full h-48 flex-shrink-0">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="p-8 flex flex-col h-full">
                    <h3 className="text-2xl font-black text-white mb-4 text-center min-h-[64px]">
                      {service.title}
                    </h3>
                    <p className="text-brown-100 mb-4 leading-relaxed text-center min-h-[96px]">
                      {service.description}
                    </p>

                    <ul className="space-y-2 text-brown-200 mt-auto">
                      {service.points.map((point, i) => (
                        <li key={i} className="flex items-center">
                          <span className="text-brown-400 mr-2">✓</span>
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Additional Services */}
      <section className="py-20 bg-brown-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-brown-900 mb-4 tracking-tight">
              Additional Expertise
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Expanding our capabilities to serve all your digital needs
            </p>
          </div>

          {additionalServices.length === 0 ? (
            <p className="text-center text-gray-500">No additional services available</p>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {additionalServices.map((service, sidx) => (
                <div key={service.id ?? service._id ?? sidx} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-brown-100 overflow-hidden group">
                  <div className="relative h-48 w-full overflow-hidden">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6 text-center">
                    <h3 className="text-lg font-bold text-brown-900 mb-3">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Trust & Reviews Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-brown-900 mb-4 tracking-tight">
              Trusted by Our Clients
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              See what our clients say about our services
            </p>

            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="bg-brown-50 p-6 rounded-xl border border-brown-200 hover:shadow-lg transition-all duration-300 text-center">
                <div className="flex items-center justify-center mb-3">
                  <span className="text-2xl font-black text-brown-800 mr-2">
                    4.9
                  </span>
                  <div className="flex text-yellow-500">
                    <span>⭐⭐⭐⭐⭐</span>
                  </div>
                </div>
                <p className="text-brown-700 font-bold text-sm">
                  Based on 50+ Reviews
                </p>
              </div>

              <a
                href="https://www.trustpilot.com/review/opyrainfotech.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-600 text-white px-6 py-4 rounded-xl font-bold hover:bg-green-700 transition-all duration-300 transform hover:scale-105 shadow-lg inline-flex items-center justify-center gap-2"
              >
                <span>📋</span>
                <span className="text-sm">Trustpilot Reviews</span>
              </a>

              <a
                href="https://g.page/r/CQxYzKzKzKzKzKzKEB0/review"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-600 text-white px-6 py-4 rounded-xl font-bold hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg inline-flex items-center justify-center gap-2"
              >
                <span>🌟</span>
                <span className="text-sm">Google Reviews</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Clients Section */}
      <section className="py-20 bg-brown-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-brown-900 mb-4 tracking-tight">
              Clients We Worked With
            </h2>
            <p className="text-xl text-gray-700">
              Trusted by industry leaders and growing businesses
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {clients.map((client, index) => (
              <div key={index} className="group">
                <div className="bg-brown-50 p-8 rounded-xl text-center hover:bg-brown-100 transition-all duration-300 border border-brown-200">
                  <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
                    {client.logo}
                  </div>
                  <h3 className="font-bold text-brown-800 text-sm">
                    {client.name}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-brown-700 to-brown-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight">
                Have a Project on mind?
              </h2>
              <p className="text-xl text-brown-100 mb-8 leading-relaxed">
                We can help you bring your ideas to life. Let's talk about what
                we can build and raise together.
              </p>
              <a
                onClick={(e) => {
                  e.preventDefault();
                  setConsultDialogOpen(true);
                }}
                href="#"
                className="bg-white text-brown-800 px-8 py-4 rounded-xl font-bold text-lg hover:bg-brown-50 transition-all duration-300 transform hover:scale-105 shadow-lg inline-block text-center"
              >
                Schedule a Call
              </a>
            </div>

            <div className="relative">
              <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-white/20">
                <div className="relative h-64 w-full rounded-xl overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=80"
                    alt="Team collaboration"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 bg-brown-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-black text-brown-900 mb-6 tracking-tight">
            Let us together build a flourishing business
          </h2>
          <p className="text-lg text-gray-700 mb-8 leading-relaxed">
            When connected with us, you aren't growing your business alone. We
            have your back and put in our best to contribute to the growth of
            your entire team and organization. So, if you are looking for the
            right agency that'll help you build a good online presence and bring
            in more conversions and revenue, we are right here!
          </p>
          <Link
            href="/contact"
            className="bg-brown-700 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-brown-800 transition-all duration-300 transform hover:scale-105 shadow-lg inline-block text-center"
          >
            Start Your Project Today
          </Link>
        </div>
      </section>

      {/* Consultation Dialog */}
      <AlertDialog open={consultDialogOpen} onOpenChange={setConsultDialogOpen}>
        <AlertDialogContent className="bg-white border-2 border-brown-200 w-[95vw] sm:w-[90vw] md:w-full max-w-2xl h-auto max-h-[95vh] rounded-xl overflow-hidden p-4 sm:p-6">
          <button
            type="button"
            onClick={() => setConsultDialogOpen(false)}
            className="absolute top-3 right-3 sm:top-4 sm:right-4 p-2 rounded-full text-gray-500 hover:text-brown-900 hover:bg-brown-100 transition"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>

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

          <form onSubmit={handleConsultationSubmit} className="space-y-5 mt-4">
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

            <button
              type="submit"
              disabled={consultSubmitting}
              className="w-full py-3 rounded-lg bg-brown-900 text-white font-semibold hover:bg-brown-800 transition text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {consultSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Submitting...
                </>
              ) : (
                "Schedule Consultation"
              )}
            </button>
          </form>
        </AlertDialogContent>
      </AlertDialog>
      <Footer />
    </main>
  );
}