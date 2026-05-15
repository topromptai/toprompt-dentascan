'use client';

import { useState } from 'react';
import { Mail, Phone, MapPin, Clock, ChevronDown, ChevronUp, Send, MessageSquare, Shield, Zap } from 'lucide-react';
import { useToast } from '@/components/ui/toast';

const FAQ_ITEMS = [
  {
    _id: 'faq-1',
    question: 'How accurate is the AI damage detection?',
    answer: 'DentaScan achieves over 94% accuracy on standard vehicle damage assessments. Our model is trained on hundreds of thousands of real collision images across all major vehicle makes and models.',
  },
  {
    _id: 'faq-2',
    question: 'Which image formats are supported for upload?',
    answer: 'We support JPEG, PNG, WebP, and HEIC formats. Images should be at least 1 MP in resolution for best results. Multiple angles are recommended for comprehensive analysis.',
  },
  {
    _id: 'faq-3',
    question: 'How long does a damage analysis take?',
    answer: 'Most analyses complete within 8–15 seconds depending on image size and network speed. Complex multi-zone damage may take up to 30 seconds for full part-level breakdown.',
  },
  {
    _id: 'faq-4',
    question: 'Can I use DentaScan for insurance claims?',
    answer: 'Yes. Our reports are formatted for insurer review and include part identifiers, severity ratings, and cost-range estimates that align with industry appraisal standards.',
  },
  {
    _id: 'faq-5',
    question: 'Is my vehicle image data stored or shared?',
    answer: 'Images are processed in-memory and deleted within 60 seconds of analysis completion. We do not sell or share any image or result data with third parties.',
  },
  {
    _id: 'faq-6',
    question: 'Do you offer API access for enterprise integrations?',
    answer: 'Yes. Enterprise and Fleet tier subscribers receive full REST API credentials with webhook support. Contact our team for sandbox access and documentation.',
  },
];

const SUPPORT_CHANNELS = [
  {
    _id: 'ch-1',
    icon: Mail,
    label: 'Email Support',
    value: 'support@dentascan.io',
    detail: 'Replies within 4 business hours',
  },
  {
    _id: 'ch-2',
    icon: Phone,
    label: 'Phone Line',
    value: '+1 (800) 336-8272',
    detail: 'Mon–Fri, 08:00–18:00 EST',
  },
  {
    _id: 'ch-3',
    icon: MapPin,
    label: 'Headquarters',
    value: '340 Pine Street, Suite 800',
    detail: 'San Francisco, CA 94104',
  },
  {
    _id: 'ch-4',
    icon: Clock,
    label: 'Live Chat Hours',
    value: 'Available in-app',
    detail: 'Mon–Sat, 07:00–22:00 EST',
  },
];

const EMPTY_FORM = {
  name: '',
  email: '',
  company: '',
  subject: '',
  message: '',
};

type FormState = typeof EMPTY_FORM;

export default function ContactPage() {
  const { toast } = useToast();
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [submitting, setSubmitting] = useState(false);
  const [openFaq, setOpenFaq] = useState<string | null>(null);

  function validate(): boolean {
    const next: Partial<FormState> = {};
    if (!(form.name ?? '').trim()) next.name = 'Name is required';
    if (!(form.email ?? '').trim()) next.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = 'Enter a valid email';
    if (!(form.subject ?? '').trim()) next.subject = 'Subject is required';
    if ((form.message ?? '').trim().length < 20) next.message = 'Message must be at least 20 characters';
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function handleChange(field: keyof FormState, value: string) {
    setForm(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: undefined }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setForm(EMPTY_FORM);
      setErrors({});
      toast({ title: 'Message sent! We will be in touch within 4 hours.', variant: 'default' });
    }, 900);
  }

  function toggleFaq(id: string) {
    setOpenFaq(prev => (prev === id ? null : id));
  }

  return (
    <div className="animate-fade-in-up min-h-screen bg-[var(--color-background)]">
      {/* Hero Banner */}
      <section className="relative overflow-hidden py-20 px-6">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              'repeating-linear-gradient(0deg, var(--color-border) 0px, var(--color-border) 1px, transparent 1px, transparent 40px), repeating-linear-gradient(90deg, var(--color-border) 0px, var(--color-border) 1px, transparent 1px, transparent 40px)',
          }}
        />
        <div className="relative max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[var(--color-primary)]/40 bg-[var(--color-primary)]/10 text-[var(--color-primary)] text-xs font-body font-medium mb-6">
            <MessageSquare className="w-3.5 h-3.5" />
            Get in Touch
          </div>
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-[var(--color-text)] mb-4 leading-tight">
            We Are Here to Help
          </h1>
          <p className="font-body text-[var(--color-text-secondary)] text-lg max-w-xl mx-auto">
            Whether you have a technical question, a billing inquiry, or need enterprise support — our forensic team responds fast.
          </p>
        </div>
      </section>

      {/* Contact Form + Support Info */}
      <section className="max-w-7xl mx-auto px-6 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-start">

          {/* Contact Form — spans 3 cols */}
          <div className="lg:col-span-3">
            <div className="bg-[var(--color-surface)] rounded-xl border border-[var(--color-border)] p-8 shadow-md">
              <h2 className="font-heading text-xl font-bold text-[var(--color-text)] mb-1">Send a Message</h2>
              <p className="font-body text-sm text-[var(--color-text-secondary)] mb-6">Fill in the form and we will respond within one business day.</p>

              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="contact-name" className="block font-body text-sm font-medium text-[var(--color-text)] mb-1.5">
                      Full Name <span className="text-[var(--color-error)]">*</span>
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      value={form.name}
                      onChange={e => handleChange('name', e.target.value)}
                      aria-required="true"
                      aria-describedby={errors.name ? 'name-error' : undefined}
                      placeholder="Alex Mercer"
                      className={`w-full px-3 py-2.5 rounded-lg border font-body text-sm bg-[var(--color-background)] text-[var(--color-text)] placeholder:text-[var(--color-text-secondary)]/50 outline-none transition-colors focus:ring-2 focus:ring-[var(--color-primary)]/50 ${
                        errors.name ? 'border-[var(--color-error)]' : 'border-[var(--color-border)]'
                      }`}
                    />
                    {errors.name && (
                      <p id="name-error" className="mt-1 text-xs text-[var(--color-error)] font-body">{errors.name}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="contact-email" className="block font-body text-sm font-medium text-[var(--color-text)] mb-1.5">
                      Email Address <span className="text-[var(--color-error)]">*</span>
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      value={form.email}
                      onChange={e => handleChange('email', e.target.value)}
                      aria-required="true"
                      aria-describedby={errors.email ? 'email-error' : undefined}
                      placeholder="alex@company.com"
                      className={`w-full px-3 py-2.5 rounded-lg border font-body text-sm bg-[var(--color-background)] text-[var(--color-text)] placeholder:text-[var(--color-text-secondary)]/50 outline-none transition-colors focus:ring-2 focus:ring-[var(--color-primary)]/50 ${
                        errors.email ? 'border-[var(--color-error)]' : 'border-[var(--color-border)]'
                      }`}
                    />
                    {errors.email && (
                      <p id="email-error" className="mt-1 text-xs text-[var(--color-error)] font-body">{errors.email}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label htmlFor="contact-company" className="block font-body text-sm font-medium text-[var(--color-text)] mb-1.5">
                    Company / Organisation
                  </label>
                  <input
                    id="contact-company"
                    type="text"
                    value={form.company}
                    onChange={e => handleChange('company', e.target.value)}
                    placeholder="Acme Insurance Group"
                    className="w-full px-3 py-2.5 rounded-lg border border-[var(--color-border)] font-body text-sm bg-[var(--color-background)] text-[var(--color-text)] placeholder:text-[var(--color-text-secondary)]/50 outline-none transition-colors focus:ring-2 focus:ring-[var(--color-primary)]/50"
                  />
                </div>

                <div>
                  <label htmlFor="contact-subject" className="block font-body text-sm font-medium text-[var(--color-text)] mb-1.5">
                    Subject <span className="text-[var(--color-error)]">*</span>
                  </label>
                  <select
                    id="contact-subject"
                    value={form.subject}
                    onChange={e => handleChange('subject', e.target.value)}
                    aria-required="true"
                    aria-describedby={errors.subject ? 'subject-error' : undefined}
                    className={`w-full px-3 py-2.5 rounded-lg border font-body text-sm bg-[var(--color-background)] text-[var(--color-text)] outline-none transition-colors focus:ring-2 focus:ring-[var(--color-primary)]/50 ${
                      errors.subject ? 'border-[var(--color-error)]' : 'border-[var(--color-border)]'
                    }`}
                  >
                    <option value="">Select a topic...</option>
                    <option value="technical">Technical Support</option>
                    <option value="billing">Billing & Subscriptions</option>
                    <option value="enterprise">Enterprise & API Access</option>
                    <option value="accuracy">Detection Accuracy Feedback</option>
                    <option value="partnership">Partnership Enquiry</option>
                    <option value="other">Other</option>
                  </select>
                  {errors.subject && (
                    <p id="subject-error" className="mt-1 text-xs text-[var(--color-error)] font-body">{errors.subject}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="contact-message" className="block font-body text-sm font-medium text-[var(--color-text)] mb-1.5">
                    Message <span className="text-[var(--color-error)]">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    rows={5}
                    value={form.message}
                    onChange={e => handleChange('message', e.target.value)}
                    aria-required="true"
                    aria-describedby={errors.message ? 'message-error' : undefined}
                    placeholder="Describe your question or issue in detail..."
                    className={`w-full px-3 py-2.5 rounded-lg border font-body text-sm bg-[var(--color-background)] text-[var(--color-text)] placeholder:text-[var(--color-text-secondary)]/50 outline-none transition-colors focus:ring-2 focus:ring-[var(--color-primary)]/50 resize-none ${
                      errors.message ? 'border-[var(--color-error)]' : 'border-[var(--color-border)]'
                    }`}
                  />
                  {errors.message && (
                    <p id="message-error" className="mt-1 text-xs text-[var(--color-error)] font-body">{errors.message}</p>
                  )}
                  <p className="mt-1 text-xs text-[var(--color-text-secondary)] font-body">
                    {(form.message ?? '').length} / 20 characters minimum
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-[var(--color-primary)] text-[var(--color-background)] font-body font-semibold text-sm hover:-translate-y-0.5 hover:shadow-lg transition-all duration-150 active:scale-[0.97] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {submitting ? (
                    <>
                      <span className="w-4 h-4 border-2 border-[var(--color-background)] border-t-transparent rounded-full animate-spin" role="status" aria-label="Sending" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Support Info — spans 2 cols */}
          <aside className="lg:col-span-2 space-y-5">
            <div className="bg-[var(--color-surface)] rounded-xl border border-[var(--color-border)] p-6 shadow-md">
              <h2 className="font-heading text-lg font-bold text-[var(--color-text)] mb-4">Support Channels</h2>
              <div className="space-y-4" data-stagger>
                {(Array.isArray(SUPPORT_CHANNELS) ? SUPPORT_CHANNELS : []).map(channel => (
                  <div key={channel._id} className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-[var(--color-primary)]/10 flex items-center justify-center">
                      <channel.icon className="w-5 h-5 text-[var(--color-primary)]" />
                    </div>
                    <div>
                      <p className="font-body text-xs font-semibold text-[var(--color-text-secondary)] uppercase tracking-widest">{channel.label}</p>
                      <p className="font-body text-sm font-medium text-[var(--color-text)] mt-0.5">{channel.value}</p>
                      <p className="font-body text-xs text-[var(--color-text-secondary)] mt-0.5">{channel.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Trust badges */}
            <div className="bg-[var(--color-surface)] rounded-xl border border-[var(--color-border)] p-6 shadow-md">
              <h3 className="font-heading text-sm font-bold text-[var(--color-text)] mb-4">Why Teams Trust DentaScan</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Shield className="w-4 h-4 text-[var(--color-success)] flex-shrink-0" />
                  <span className="font-body text-xs text-[var(--color-text-secondary)]">SOC 2 Type II Certified — data never stored</span>
                </div>
                <div className="flex items-center gap-3">
                  <Zap className="w-4 h-4 text-[var(--color-primary)] flex-shrink-0" />
                  <span className="font-body text-xs text-[var(--color-text-secondary)]">Average 4-hour first-response SLA for Pro plans</span>
                </div>
                <div className="flex items-center gap-3">
                  <MessageSquare className="w-4 h-4 text-[var(--color-accent)] flex-shrink-0" />
                  <span className="font-body text-xs text-[var(--color-text-secondary)]">Dedicated account manager for Enterprise tier</span>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* FAQ Accordion */}
      <section className="bg-[var(--color-surface)] border-t border-[var(--color-border)]">
        <div className="max-w-3xl mx-auto px-6 py-20">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl font-bold text-[var(--color-text)] mb-3">Frequently Asked Questions</h2>
            <p className="font-body text-sm text-[var(--color-text-secondary)]">
              Quick answers to the questions we hear most often.
            </p>
          </div>

          <div className="space-y-3" data-stagger>
            {(Array.isArray(FAQ_ITEMS) ? FAQ_ITEMS : []).map(item => {
              const isOpen = openFaq === item._id;
              return (
                <div
                  key={item._id}
                  className="rounded-xl border border-[var(--color-border)] overflow-hidden bg-[var(--color-background)] transition-all duration-200"
                >
                  <button
                    onClick={() => toggleFaq(item._id)}
                    aria-expanded={isOpen}
                    className="w-full flex items-center justify-between px-5 py-4 text-left gap-4 hover:bg-[var(--color-surface)] transition-colors duration-150"
                  >
                    <span className="font-body text-sm font-semibold text-[var(--color-text)]">{item.question}</span>
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4 text-[var(--color-primary)] flex-shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-[var(--color-text-secondary)] flex-shrink-0" />
                    )}
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5">
                      <div className="border-t border-[var(--color-border)] pt-4">
                        <p className="font-body text-sm text-[var(--color-text-secondary)] leading-relaxed">
                          {item.answer}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <p className="text-center mt-10 font-body text-sm text-[var(--color-text-secondary)]">
            Still have questions?{' '}
            <button
              onClick={() => document.getElementById('contact-name')?.focus()}
              className="text-[var(--color-primary)] font-semibold hover:underline transition-colors"
            >
              Send us a message above.
            </button>
          </p>
        </div>
      </section>
    </div>
  );
}
