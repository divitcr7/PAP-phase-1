import { useState, useRef } from "react";
import { MapPin, Phone, Mail, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import BannerSection from "@/components/common/BannerSection";

export default function ContactPage() {
  const formRef = useRef<HTMLFormElement>(null);
  const [success, setSuccess] = useState(true);
  const [showMessage, setShowMessage] = useState(false);

  const handleShowMessage = () => {
    setShowMessage(true);
    setTimeout(() => {
      setShowMessage(false);
    }, 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would add your email sending logic
    // For now, just show success message
    setSuccess(true);
    handleShowMessage();
    if (formRef.current) {
      formRef.current.reset();
    }
  };

  // FAQ data
  const faqItems = [
    {
      question: "Why should I use your services?",
      answer:
        "Pick A Pad offers a streamlined rental experience with verified listings, transparent pricing, and personalized support throughout your journey to find the perfect home.",
    },
    {
      question: "How do I get started with your services?",
      answer:
        "Simply create an account, browse our listings, and save your favorites. When you're ready, you can schedule viewings directly through our platform and apply for properties you love.",
    },
    {
      question: "How secure are your services?",
      answer:
        "We prioritize your security with encrypted data transmission, secure payment processing, and strict privacy policies to ensure your personal information remains protected.",
    },
    {
      question: "Is there customer support available?",
      answer:
        "Yes, our dedicated support team is available via phone, email, and live chat to assist you with any questions or concerns throughout your rental journey.",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="w-full bg-gradient-to-r from-blue-400 to-blue-500 py-20 px-6">
        <div className="container mx-auto">
          <div className="text-center text-white mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-8">Contact Us</h1>
            <p className="text-xl max-w-3xl mx-auto">
              We're here to help you find your perfect pad. Reach out to us with
              any questions.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="container mx-auto py-16 px-20">
        <div className="flex flex-col gap-10">
          <div className="flex gap-24 mx-auto">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-6">
                Drop Us A Line
              </h2>
              <p className="text-gray-600 mb-8">
                Feel free to connect with us through our online channels for
                updates, news, and more.
              </p>

              <form ref={formRef} onSubmit={handleSubmit} className="space-y-6 border rounded-md p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium">
                      Full Name:
                    </label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="Your name"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">
                      Email Address:
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="Email"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="phone" className="text-sm font-medium">
                      Phone Number:
                    </label>
                    <Input
                      id="phone"
                      name="phone"
                      placeholder="ex 012345678"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-sm font-medium">
                      Subject:
                    </label>
                    <Input
                      id="subject"
                      name="subject"
                      placeholder="Enter Subject"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium">
                    Your Message:
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Message"
                    rows={6}
                    required
                  />
                </div>

                {showMessage && (
                  <div
                    className={`p-3 rounded-md ${
                      success
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {success
                      ? "Message has been sent successfully"
                      : "Something went wrong"}
                  </div>
                )}

                <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                  <Send className="mr-2 h-4 w-4" /> Send Message
                </Button>
              </form>
            </div>

            <div>
              <div className="bg-gray-50 p-8 rounded-lg shadow-sm mb-8">
                <h3 className="text-2xl font-bold text-slate-900 mb-6">
                  Contact Information
                </h3>
                <ul className="space-y-6">
                  <li className="flex items-start">
                    <MapPin className="text-blue-600 mr-4 h-6 w-6 mt-1" />
                    <div>
                      <h4 className="font-medium text-gray-900">
                        Our Location
                      </h4>
                      <p className="text-gray-600 mt-1">
                        2507 South Blvd, Houston, TX 77004
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <Phone className="text-blue-600 mr-4 h-6 w-6 mt-1" />
                    <div>
                      <h4 className="font-medium text-gray-900">
                        Phone Number
                      </h4>
                      <p className="text-gray-600 mt-1">
                        <a
                          href="tel:+1-713-894-1937"
                          className="hover:text-blue-600"
                        >
                          +1-713-894-1937
                        </a>
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <Mail className="text-blue-600 mr-4 h-6 w-6 mt-1" />
                    <div>
                      <h4 className="font-medium text-gray-900">
                        Email Address
                      </h4>
                      <p className="text-gray-600 mt-1">
                        <a
                          href="mailto:admin@pick-a-pad.com"
                          className="hover:text-blue-600"
                        >
                          admin@pick-a-pad.com
                        </a>
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="rounded-lg overflow-hidden shadow-sm w-5xl h-96 mx-auto">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3465.0876702389!2d-95.37376492392709!3d29.72731997560281!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8640bf4476b3123b%3A0x601a6ea3d2f79d04!2s2507%20South%20Blvd%2C%20Houston%2C%20TX%2077004!5e0!3m2!1sen!2sus!4v1688000000000!5m2!1sen!2sus"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </section>

      {/* FAQ Section with Accordion */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <p className="text-lg font-semibold text-blue-400 uppercase">
              FAQs
            </p>
            <h2 className="text-3xl font-bold text-slate-900 mt-2">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="max-w-3xl mx-auto space-y-8">
            <Accordion type="single" collapsible className="w-full">
              {faqItems.map((item, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-2xl font-semibold text-slate-900 hover:text-blue-600 py-8">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600 text-base py-2">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* Banner Section */}
      <BannerSection />
    </div>
  );
}
