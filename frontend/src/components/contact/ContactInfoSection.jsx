import { ArrowUpRight, CheckCircle2, Mail, MapPin, MessageCircle, Send } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';

export default function ContactInfoSection() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const update = (event) => setForm((prev) => ({ ...prev, [event.target.name]: event.target.value }));

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitting(true);

    // Simulate instant form submission
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
      toast.success('Message submitted successfully!', {
        duration: 3500,
      });
    }, 500);
  };

  const handleReset = () => {
    setForm({ name: '', email: '', subject: '', message: '' });
    setSubmitted(false);
  };

  return (
    <section className="contact-page shell simple-page">
      <div className="simple-page__head">
        <span className="eyebrow">SAY WHAT'S UP</span>
        <h1>
          LET'S <em>TALK.</em>
        </h1>
        <p>Questions about a drop, an order or an idea? Reach out directly.</p>
      </div>

      <div className="contact-layout">
        <div className="contact-details">
          <h2>
            DROP US
            <br />
            A LINE.
          </h2>

          <div className="contact-link-block">
            <Mail size={23} />
            <div>
              <span>EMAIL</span>
              <a href="mailto:blckofficial2026@gmail.com">
                blckofficial2026@gmail.com <ArrowUpRight size={15} />
              </a>
            </div>
          </div>

          <div className="contact-link-block">
            <MessageCircle size={23} />
            <div>
              <span>WHATSAPP</span>
              <a href="https://wa.me/919899733351" target="_blank" rel="noreferrer">
                +91 98997 33351 <ArrowUpRight size={15} />
              </a>
            </div>
          </div>

          <div className="contact-link-block">
            <MapPin size={23} />
            <div>
              <span>LOCATION</span>
              <p>New Delhi, India</p>
            </div>
          </div>

          <div className="contact-stamp">
            <img src="/assets/blck-monogram.png" alt="BLCK mark" />
          </div>
        </div>

        {submitted ? (
          <div className="contact-form bg-white border border-[#deded8] p-8 md:p-12 rounded-lg flex flex-col items-start justify-center">
            <div className="flex items-center gap-3 text-emerald-600 mb-4">
              <CheckCircle2 size={32} />
              <h2 className="text-2xl font-bold uppercase tracking-tight text-neutral-900 m-0">
                MESSAGE SUBMITTED.
              </h2>
            </div>
            <p className="text-sm text-neutral-600 leading-relaxed mb-6 font-normal">
              Thank you, <strong>{form.name}</strong>. Your message regarding <em>"{form.subject}"</em> has been received by the BLCK support desk. We will respond to <strong>{form.email}</strong> shortly.
            </p>
            <button
              type="button"
              onClick={handleReset}
              className="btn btn-dark"
            >
              SEND ANOTHER MESSAGE
            </button>
          </div>
        ) : (
          <form className="contact-form" onSubmit={handleSubmit}>
            <h2>SEND A MESSAGE.</h2>
            <p>
              Leave your inquiry or feedback below and our support team will get back to you promptly.
            </p>

            <div className="form-grid">
              <label>
                <span>YOUR NAME *</span>
                <input
                  required
                  name="name"
                  value={form.name}
                  onChange={update}
                  placeholder="Full name"
                />
              </label>

              <label>
                <span>EMAIL ADDRESS *</span>
                <input
                  type="email"
                  required
                  name="email"
                  value={form.email}
                  onChange={update}
                  placeholder="you@example.com"
                />
              </label>

              <label className="full-span">
                <span>SUBJECT *</span>
                <input
                  required
                  name="subject"
                  value={form.subject}
                  onChange={update}
                  placeholder="What's on your mind?"
                />
              </label>

              <label className="full-span">
                <span>MESSAGE *</span>
                <textarea
                  required
                  rows="6"
                  name="message"
                  value={form.message}
                  onChange={update}
                  placeholder="Tell us more..."
                />
              </label>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="btn btn-dark flex items-center gap-2"
            >
              <span>{submitting ? 'SUBMITTING MESSAGE...' : 'SUBMIT MESSAGE'}</span>
              <Send size={16} />
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
