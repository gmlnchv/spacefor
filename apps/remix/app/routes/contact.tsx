import { json } from '@remix-run/node';
import { Resend } from 'resend';
import type { ActionFunctionArgs } from '@remix-run/node';

const resend = new Resend(process.env.RESEND_API_KEY);

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();

  const { error } = await resend.emails.send({
    from: 'Spacefor <spacefor@devbox.sbs>',
    to: ['georgy@malanichev.com'],
    subject: 'New contact form submission',
    html: `
      <p>First Name: ${formData.get('firstName')}</p>
      <p>Last Name: ${formData.get('lastName')}</p>
      <p>Email: ${formData.get('email')}</p>
      <p>Company Name: ${formData.get('companyName')}</p>
      <p>Reason: ${formData.get('reason')}</p>
      <p>Message: ${formData.get('message')}</p>
    `,
  });

  if (error) {
    return json({
      message: 'Failed to send your enquiry. Please try again later.',
      status: 400,
    });
  }

  return json({
    message: 'Thank you for your enquiry. We will be in touch soon.',
    status: 200,
  });
};
