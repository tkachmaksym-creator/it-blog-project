'use client';
import { FormEvent, useState } from 'react';
import { trackEvent } from '@/lib/analytics';

export default function LeadCaptureForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [started, setStarted] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const markStarted = () => {
    if (started) return;
    setStarted(true);
    trackEvent('form_start', { form_name: 'about_contact_form', page_type: 'about' });
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    trackEvent('generate_lead', {
      form_name: 'about_contact_form',
      page_type: 'about',
      has_message: Boolean(message.trim()),
    });
    trackEvent('form_submit', {
      form_name: 'about_contact_form',
      page_type: 'about',
    });
    setSubmitted(true);
  };

  return (
    <div className="win-box" style={{ marginTop: 16 }}>
      <div className="win-box-title">Зв&apos;язок з командою</div>
      <div className="win-box-body">
        <p style={{ marginBottom: 10, fontSize: 13 }}>
          Якщо хочете запропонувати тему статті або поставити запитання, залиште коротке повідомлення.
        </p>
        <form className="lead-form" onSubmit={handleSubmit}>
          <input
            className="lead-input"
            type="text"
            value={name}
            onFocus={markStarted}
            onChange={(event) => setName(event.target.value)}
            placeholder="Ваше ім&apos;я"
            required
          />
          <input
            className="lead-input"
            type="email"
            value={email}
            onFocus={markStarted}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Email"
            required
          />
          <textarea
            className="lead-textarea"
            value={message}
            onFocus={markStarted}
            onChange={(event) => setMessage(event.target.value)}
            placeholder="Коротке повідомлення"
            rows={4}
          />
          <button className="win-btn" type="submit">
            Надіслати
          </button>
        </form>
        {submitted && (
          <p style={{ marginTop: 10, fontSize: 12, color: '#006400' }}>
            Дякуємо. Подія відправки форми зафіксована для GA4/DebugView.
          </p>
        )}
      </div>
    </div>
  );
}
