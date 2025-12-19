"use client";

import { useState } from 'react'
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

export default function CTA() {
  const [email, setEmail] = useState('')
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle newsletter subscription
    setEmail('')
  }

  return (
    <>
    <section className="py-16 bg-brown-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-poppins font-black text-white mb-8 tracking-wide heading-sharp uppercase">
              Have a Project on Mind?
            </h2>
            <p className="text-brown-100 text-lg mb-10 leading-relaxed font-roboto font-light tracking-wide">
              We can help you bring your ideas to life. Let's talk about what we can build and raise together.
            </p>
            <a 
              onClick={(e) => {
                  e.preventDefault();
                  setConsultDialogOpen(true);
                }}
              href="#"
              className="bg-white text-brown-700 px-10 py-4 rounded-none font-roboto font-black tracking-wide uppercase hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-sharp-xl btn-sharp inline-block text-center"
            >
              Schedule a Call
            </a>
          </div>
          
          <div className="bg-white p-10 rounded-none shadow-sharp-xl">
            <h3 className="text-2xl font-roboto font-black text-brown-800 mb-8 tracking-wide uppercase heading-sharp">
              Let us together build a flourishing business
            </h3>
            <p className="text-gray-600 mb-8 leading-relaxed font-roboto font-light tracking-wide">
              When connected with us, you aren't growing your business alone. We have your back and put in our best 
              to contribute to the growth of your entire team and organization.
            </p>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-roboto font-bold text-brown-800 mb-3 tracking-wide uppercase">
                  Subscribe to our newsletter
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="EMAIL ADDRESS"
                  className="w-full px-4 py-4 border-2 border-brown-300 rounded-none focus:ring-brown-500 focus:border-brown-500 font-roboto tracking-wide uppercase text-sm font-medium"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-brown-700 text-white px-6 py-4 rounded-none hover:bg-brown-800 transition-all duration-300 font-roboto font-bold tracking-wide uppercase btn-sharp shadow-sharp-md"
              >
                I'm Interested
              </button>
            </form>
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
    </>
  )
}