'use client';

import { useState } from 'react';
import Image from 'next/image';

const contactInfo = [
  {
    title: 'Visit Our Atelier',
    details: ['Keizersgracht 123', '1015 CW Amsterdam', 'The Netherlands'],
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    title: 'Contact Us',
    details: ['+31 20 123 4567', 'hello@veenuskleding.com'],
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    title: 'Opening Hours',
    details: ['Monday - Friday: 10:00 - 19:00', 'Saturday: 11:00 - 18:00', 'Sunday: By Appointment'],
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    setIsSubmitted(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[50vh] sm:h-[55vh] min-h-[350px] sm:min-h-[400px] md:min-h-[450px] flex items-center justify-center overflow-hidden">
        {/* Background */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=1920&q=80')",
          }}
        />
        <div className="absolute inset-0" style={{ backgroundColor: 'rgba(var(--image-overlay), 0.9)' }} />

        {/* background-optimized.webp ornamental overlay */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "url('/background-optimized.webp')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 'var(--pattern-opacity)',
          }}
        />

        {/* Gold radial glow */}
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 50% 60%, rgba(180,130,20,0.08) 0%, transparent 70%)' }} />

        {/* Decorative corner frames */}
        <div className="absolute top-6 left-4 sm:top-8 sm:left-8 w-14 h-14 sm:w-20 sm:h-20 hidden sm:block rounded-tl-3xl border-t border-l border-gold-600/15" />
        <div className="absolute top-6 right-4 sm:top-8 sm:right-8 w-14 h-14 sm:w-20 sm:h-20 hidden sm:block rounded-tr-3xl border-t border-r border-gold-600/15" />
        <div className="absolute bottom-6 left-4 sm:bottom-8 sm:left-8 w-14 h-14 sm:w-20 sm:h-20 hidden sm:block rounded-bl-3xl border-b border-l border-gold-600/15" />
        <div className="absolute bottom-6 right-4 sm:bottom-8 sm:right-8 w-14 h-14 sm:w-20 sm:h-20 hidden sm:block rounded-br-3xl border-b border-r border-gold-600/15" />

        {/* Content */}
        <div className="relative text-center px-4">
          <p className="text-gold-400 text-xs sm:text-sm uppercase tracking-[0.3em] sm:tracking-[0.4em] mb-3 sm:mb-4 animate-fade-in" style={{ textShadow: '0 0 20px rgba(212,175,55,0.3)' }}>
            Get in Touch
          </p>
          <h1 className="heading-display text-luxury-cream mb-4 animate-fade-in-up" style={{ textShadow: 'var(--heading-text-shadow)' }}>
            Contact <span className="text-gradient-gold">Us</span>
          </h1>
          {/* Ornamental divider */}
          <div className="flex items-center justify-center gap-4 mb-6 animate-fade-in delay-100">
            <div className="h-[1px] w-16 md:w-24 rounded-full" style={{ background: 'linear-gradient(90deg, transparent, #B8860B)' }} />
            <div className="w-2 h-2 rounded-full bg-gold-500/50 shadow-[0_0_8px_rgba(184,134,11,0.3)]" />
            <div className="h-[1px] w-16 md:w-24 rounded-full" style={{ background: 'linear-gradient(270deg, transparent, #B8860B)' }} />
          </div>
          <p className="text-luxury-cream/80 text-base sm:text-lg max-w-2xl mx-auto animate-fade-in-up delay-100">
            We&apos;d love to hear from you. Reach out for inquiries, appointments, or just to say hello.
          </p>
          <div className="divider-gold mt-8 animate-fade-in delay-200" />
        </div>

        {/* Bottom gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-24" style={{ background: 'linear-gradient(to top, var(--bg-section), transparent)' }} />
      </section>

      {/* Contact Info & Form */}
      <section className="relative py-16 md:py-20 overflow-hidden" style={{ backgroundColor: 'var(--bg-section)' }}>
        {/* background-optimized.webp subtle overlay */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "url('/background-optimized.webp')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 'var(--pattern-opacity)',
          }}
        />

        <div className="container-luxury relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
            {/* Contact Information */}
            <div>
              {/* Gold accent line */}
              <div className="w-12 h-[2px] mb-6" style={{ background: 'linear-gradient(90deg, #5C4305, #D4AF37, #5C4305)' }} />
              <p className="text-gold-400 text-sm uppercase tracking-[0.4em] mb-4" style={{ textShadow: '0 0 15px rgba(212,175,55,0.2)' }}>
                Find Us
              </p>
              <h2 className="heading-section text-luxury-cream mb-10">
                Our <span className="text-gradient-gold">Details</span>
              </h2>

              <div className="space-y-8 mb-12">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex gap-5 group">
                    <div
                      className="flex-shrink-0 w-14 h-14 border border-gold-800/40 flex items-center justify-center text-gold-400 group-hover:border-gold-500/60 transition-all duration-500 rounded-xl"
                      style={{ background: 'linear-gradient(135deg, rgba(var(--gold-accent),0.1), rgba(var(--overlay-section),0.5))' }}
                    >
                      {info.icon}
                    </div>
                    <div>
                      <h3 className="text-luxury-cream font-display text-lg mb-2 group-hover:text-gold-300 transition-colors duration-300">{info.title}</h3>
                      {info.details.map((detail, i) => (
                        <p key={i} className="text-luxury-cream/70 text-sm leading-relaxed">{detail}</p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Map placeholder */}
              <div className="relative aspect-video overflow-hidden border border-gold-900/30 rounded-2xl" style={{ backgroundColor: 'var(--bg-section-alt)' }}>
                <Image
                  src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=800&q=80"
                  alt="Location"
                  fill
                  className="object-cover opacity-40"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                {/* Gold radial overlay */}
                <div className="absolute inset-0" style={{ background: 'radial-gradient(circle at center, rgba(184,134,11,0.08) 0%, transparent 70%)' }} />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div
                      className="w-14 h-14 mx-auto mb-3 flex items-center justify-center rounded-xl"
                      style={{
                        border: '1px solid rgba(184,134,11,0.5)',
                        background: 'linear-gradient(135deg, rgba(var(--gold-accent),0.2), rgba(var(--overlay-section),0.6))',
                        boxShadow: '0 0 20px rgba(184,134,11,0.15)',
                      }}
                    >
                      <svg className="w-6 h-6 text-gold-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <p className="text-gold-400 text-sm uppercase tracking-[0.3em]" style={{ textShadow: '0 0 15px rgba(212,175,55,0.3)' }}>Amsterdam, NL</p>
                  </div>
                </div>
                {/* Gold border overlay */}
                <div className="absolute inset-3 border border-gold-800/25 rounded-xl" />
              </div>
            </div>

            {/* Contact Form */}
            <div>
              {/* Gold accent line */}
              <div className="w-12 h-[2px] mb-6" style={{ background: 'linear-gradient(90deg, #5C4305, #D4AF37, #5C4305)' }} />
              <p className="text-gold-400 text-sm uppercase tracking-[0.4em] mb-4" style={{ textShadow: '0 0 15px rgba(212,175,55,0.2)' }}>
                Send a Message
              </p>
              <h2 className="heading-section text-luxury-cream mb-10">
                Write to <span className="text-gradient-gold">Us</span>
              </h2>

              {isSubmitted ? (
                <div
                  className="relative p-14 text-center border border-gold-800/40 overflow-hidden rounded-2xl"
                  style={{ backgroundColor: 'var(--input-bg)' }}
                >
                  {/* Gold radial glow */}
                  <div className="absolute inset-0" style={{ background: 'radial-gradient(circle at center, rgba(184,134,11,0.06) 0%, transparent 70%)' }} />

                  <div className="relative">
                    <div
                      className="w-20 h-20 mx-auto mb-8 flex items-center justify-center rounded-2xl"
                      style={{
                        border: '1px solid rgba(184,134,11,0.6)',
                        background: 'linear-gradient(135deg, rgba(var(--gold-accent),0.2), rgba(var(--overlay-section),0.5))',
                        boxShadow: '0 0 30px rgba(184,134,11,0.2)',
                      }}
                    >
                      <svg className="w-10 h-10 text-gold-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className="text-3xl text-luxury-cream font-display mb-4">Thank You</h3>
                    <p className="text-luxury-cream/60 mb-8 max-w-sm mx-auto">
                      Your message has been received. We&apos;ll get back to you within 24 hours.
                    </p>
                    <button
                      onClick={() => {
                        setIsSubmitted(false);
                        setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
                      }}
                      className="btn-outline"
                    >
                      Send Another Message
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-7">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-xs uppercase tracking-[0.2em] text-gold-600/80 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3.5 border text-luxury-cream placeholder-luxury-cream/30 focus:outline-none transition-all duration-300"
                        style={{
                          backgroundColor: 'var(--input-bg)',
                          borderColor: 'var(--input-border)',
                        }}
                        onFocus={(e) => { e.target.style.borderColor = '#B8860B'; e.target.style.boxShadow = '0 0 15px rgba(184,134,11,0.15)'; }}
                        onBlur={(e) => { e.target.style.borderColor = 'rgba(92,67,5,0.3)'; e.target.style.boxShadow = 'none'; }}
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-xs uppercase tracking-[0.2em] text-gold-600/80 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3.5 border text-luxury-cream placeholder-luxury-cream/30 focus:outline-none transition-all duration-300"
                        style={{
                          backgroundColor: 'var(--input-bg)',
                          borderColor: 'var(--input-border)',
                        }}
                        onFocus={(e) => { e.target.style.borderColor = '#B8860B'; e.target.style.boxShadow = '0 0 15px rgba(184,134,11,0.15)'; }}
                        onBlur={(e) => { e.target.style.borderColor = 'rgba(92,67,5,0.3)'; e.target.style.boxShadow = 'none'; }}
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="phone" className="block text-xs uppercase tracking-[0.2em] text-gold-600/80 mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3.5 border text-luxury-cream placeholder-luxury-cream/30 focus:outline-none transition-all duration-300"
                        style={{
                          backgroundColor: 'var(--input-bg)',
                          borderColor: 'var(--input-border)',
                        }}
                        onFocus={(e) => { e.target.style.borderColor = '#B8860B'; e.target.style.boxShadow = '0 0 15px rgba(184,134,11,0.15)'; }}
                        onBlur={(e) => { e.target.style.borderColor = 'rgba(92,67,5,0.3)'; e.target.style.boxShadow = 'none'; }}
                        placeholder="+31 20 123 4567"
                      />
                    </div>
                    <div>
                      <label htmlFor="subject" className="block text-xs uppercase tracking-[0.2em] text-gold-600/80 mb-2">
                        Subject *
                      </label>
                      <select
                        id="subject"
                        name="subject"
                        required
                        value={formData.subject}
                        onChange={handleChange}
                        className="w-full px-4 py-3.5 border text-luxury-cream focus:outline-none transition-all duration-300"
                        style={{
                          backgroundColor: 'var(--input-bg)',
                          borderColor: 'var(--input-border)',
                        }}
                        onFocus={(e) => { e.target.style.borderColor = '#B8860B'; e.target.style.boxShadow = '0 0 15px rgba(184,134,11,0.15)'; }}
                        onBlur={(e) => { e.target.style.borderColor = 'rgba(92,67,5,0.3)'; e.target.style.boxShadow = 'none'; }}
                      >
                        <option value="">Select a subject</option>
                        <option value="general">General Inquiry</option>
                        <option value="product">Product Information</option>
                        <option value="appointment">Book an Appointment</option>
                        <option value="press">Press &amp; Media</option>
                        <option value="careers">Careers</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-xs uppercase tracking-[0.2em] text-gold-600/80 mb-2">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={6}
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-4 py-3.5 border text-luxury-cream placeholder-luxury-cream/30 focus:outline-none transition-all duration-300 resize-none"
                      style={{
                        backgroundColor: 'var(--input-bg)',
                        borderColor: 'var(--input-border)',
                      }}
                      onFocus={(e) => { e.target.style.borderColor = '#B8860B'; e.target.style.boxShadow = '0 0 15px rgba(184,134,11,0.15)'; }}
                      onBlur={(e) => { e.target.style.borderColor = 'rgba(92,67,5,0.3)'; e.target.style.boxShadow = 'none'; }}
                      placeholder="Tell us how we can help..."
                    />
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-2">
                    <p className="text-luxury-cream/40 text-xs uppercase tracking-wider">* Required fields</p>
                    <button type="submit" className="btn-primary">
                      Send Message
                      <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Grand Separator */}
      <div className="relative py-4" style={{ backgroundColor: 'var(--bg-page)' }}>
        <div className="flex items-center justify-center gap-3">
          <div className="h-[1px] w-16 md:w-32 rounded-full" style={{ background: 'linear-gradient(90deg, transparent, #5C4305)' }} />
          <div className="w-1.5 h-1.5 rounded-full bg-gold-600/40 shadow-[0_0_6px_rgba(184,134,11,0.3)]" />
          <div className="h-[1px] w-8 md:w-16 rounded-full" style={{ background: 'linear-gradient(90deg, #5C4305, #D4AF37, #5C4305)' }} />
          <div className="w-1.5 h-1.5 rounded-full bg-gold-600/40 shadow-[0_0_6px_rgba(184,134,11,0.3)]" />
          <div className="h-[1px] w-16 md:w-32 rounded-full" style={{ background: 'linear-gradient(270deg, transparent, #5C4305)' }} />
        </div>
      </div>

      {/* FAQ Section */}
      <section className="relative py-16 md:py-20 overflow-hidden" style={{ backgroundColor: 'var(--bg-page)' }}>
        {/* background-optimized.webp overlay */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "url('/background-optimized.webp')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 'var(--pattern-opacity)',
          }}
        />
        {/* Gold radial glow */}
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 50% 30%, rgba(180,130,20,0.05) 0%, transparent 60%)' }} />

        <div className="container-luxury relative">
          <div className="text-center mb-16">
            {/* Ornamental accent */}
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="h-[1px] w-12 md:w-20 rounded-full" style={{ background: 'linear-gradient(90deg, transparent, #B8860B)' }} />
              <div className="w-1.5 h-1.5 rounded-full bg-gold-500/50 shadow-[0_0_6px_rgba(184,134,11,0.3)]" />
              <div className="h-[1px] w-12 md:w-20 rounded-full" style={{ background: 'linear-gradient(270deg, transparent, #B8860B)' }} />
            </div>
            <p className="text-gold-400 text-sm uppercase tracking-[0.4em] mb-4" style={{ textShadow: '0 0 15px rgba(212,175,55,0.2)' }}>
              Common Questions
            </p>
            <h2 className="heading-section text-luxury-cream">
              Frequently Asked <span className="text-gradient-gold">Questions</span>
            </h2>
            <div className="divider-gold mt-6" />
          </div>

          <div className="max-w-3xl mx-auto space-y-6">
            {[
              {
                q: 'Do you offer international shipping?',
                a: 'Yes, we ship to over 50 countries worldwide. Shipping times and costs vary by destination.',
              },
              {
                q: 'Can I book a private appointment?',
                a: 'Absolutely. We offer private shopping experiences at our Amsterdam atelier. Please contact us to schedule.',
              },
              {
                q: 'What is your return policy?',
                a: 'We accept returns within 30 days of purchase for items in original condition with tags attached.',
              },
              {
                q: 'Do you offer alterations?',
                a: 'Yes, we provide complimentary alterations for all purchases to ensure the perfect fit.',
              },
            ].map((faq, index) => (
              <div
                key={index}
                className="relative border border-gold-900/25 p-5 sm:p-8 hover:border-gold-700/40 transition-all duration-500 group"
                style={{ backgroundColor: 'var(--input-bg)' }}
              >
                {/* Gold glow on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: 'radial-gradient(ellipse at center, rgba(184,134,11,0.04) 0%, transparent 70%)' }} />
                {/* Corner accents */}
                <div className="absolute top-0 left-0 w-5 h-5 border-t border-l border-gold-700/30 group-hover:border-gold-500/50 transition-colors duration-500" />
                <div className="absolute top-0 right-0 w-5 h-5 border-t border-r border-gold-700/30 group-hover:border-gold-500/50 transition-colors duration-500" />
                <div className="absolute bottom-0 left-0 w-5 h-5 border-b border-l border-gold-700/30 group-hover:border-gold-500/50 transition-colors duration-500" />
                <div className="absolute bottom-0 right-0 w-5 h-5 border-b border-r border-gold-700/30 group-hover:border-gold-500/50 transition-colors duration-500" />
                
                <div className="relative">
                  <h3 className="text-luxury-cream font-display text-lg mb-3 group-hover:text-gold-300 transition-colors duration-300">{faq.q}</h3>
                  <p className="text-luxury-cream/60 leading-relaxed">{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
