import type { FormSpec } from './types';

/** Mirrors the live site's Contact Form 7 fields: Name*, Email*, Phone, Subject*, Message*. */
export const contactForm: FormSpec = {
  id: 'contact',
  name: 'Contact',
  subject: 'Website contact',
  submitLabel: 'Send message',
  successTitle: 'Thanks — your message is on its way.',
  successBody: 'We read every message and typically respond within one business day.',
  reviewIntro: '',
  draftKey: 'axis-contact-draft',
  steps: [
    {
      id: 'message',
      title: 'Send us a message',
      fields: [
        { id: 'name', label: 'Name', type: 'text', required: true, autocomplete: 'name' },
        { id: 'email', label: 'Email', type: 'email', required: true, autocomplete: 'email' },
        { id: 'phone', label: 'Phone', type: 'tel', autocomplete: 'tel' },
        { id: 'subject', label: 'Subject', type: 'text', required: true },
        {
          id: 'message',
          label: 'Message',
          type: 'textarea',
          required: true,
          full: true,
          rows: 6,
          maxlength: 2000,
        },
      ],
    },
  ],
};
