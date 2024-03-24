import { json } from '@remix-run/node';
import { Resend } from 'resend';
import type { ActionFunctionArgs } from '@remix-run/node';
import { format } from 'date-fns';

const resend = new Resend(process.env.RESEND_API_KEY);

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();

  const date = format(String(formData.get('date')), 'dd/MM/yyyy');

  const { error } = await resend.emails.send({
    from: 'Spacefor <spacefor@devbox.sbs>',
    to: ['hello@spacefor.nz'],
    subject: 'New booking form submission',
    html: `
      <p>First Name: ${formData.get('firstName')}</p>
      <p>Last Name: ${formData.get('lastName')}</p>
      <p>Email: ${formData.get('email')}</p>
      <p>Company Name: ${formData.get('companyName')}</p>
      <p>Date: ${date}</p>
      <p>Duration: ${formData.get('duration')}</p>
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
