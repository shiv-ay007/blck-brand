import { ArrowUpRight, Mail, MapPin, MessageCircle, Send } from 'lucide-react';
import { useState } from 'react';

export default function ContactInfoSection() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const update = (event) => setForm((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  const openEmail = (event) => {
    event.preventDefault();
    const subject = encodeURIComponent(`BLCK Enquiry: ${form.subject}`);
    const body = encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`);
    window.location.href = `mailto:blckofficial2026@gmail.com?subject=${subject}&body=${body}`;
  };
  return <section className="contact-page shell simple-page"><div className="simple-page__head"><span className="eyebrow">SAY WHAT'S UP</span><h1>LET'S <em>TALK.</em></h1><p>Questions about a drop, an order or an idea? Reach out.</p></div><div className="contact-layout"><div className="contact-details"><h2>DROP US<br/>A LINE.</h2><div className="contact-link-block"><Mail size={23}/><div><span>EMAIL</span><a href="mailto:blckofficial2026@gmail.com">blckofficial2026@gmail.com <ArrowUpRight size={15}/></a></div></div><div className="contact-link-block"><MessageCircle size={23}/><div><span>WHATSAPP</span><a href="https://wa.me/919899733351" target="_blank" rel="noreferrer">+91 98997 33351 <ArrowUpRight size={15}/></a></div></div><div className="contact-link-block"><MapPin size={23}/><div><span>LOCATION</span><p>New Delhi, India</p></div></div><div className="contact-stamp"><img src="/assets/blck-monogram.png" alt="BLCK mark" /></div></div><form className="contact-form" onSubmit={openEmail}><h2>SEND AN ENQUIRY.</h2><p>Opens your email app with a prefilled message. A server-based contact form can be connected later.</p><div className="form-grid"><label><span>YOUR NAME *</span><input required name="name" value={form.name} onChange={update} placeholder="Full name" /></label><label><span>EMAIL ADDRESS *</span><input type="email" required name="email" value={form.email} onChange={update} placeholder="you@example.com" /></label><label className="full-span"><span>SUBJECT *</span><input required name="subject" value={form.subject} onChange={update} placeholder="What's on your mind?" /></label><label className="full-span"><span>MESSAGE *</span><textarea required rows="6" name="message" value={form.message} onChange={update} placeholder="Tell us more..." /></label></div><button type="submit" className="btn btn-dark">OPEN EMAIL TO SEND <Send size={16}/></button></form></div></section>;
}
