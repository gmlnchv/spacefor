import { json } from '@remix-run/node';
import type { ActionFunctionArgs } from '@remix-run/node';

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();

  // create a subscriber in MailerLite
  const response = await fetch(
    'https://connect.mailerlite.com/api/subscribers',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${process.env.MAILERLITE_API_KEY}`,
      },
      body: JSON.stringify({
        email: formData.get('email'),
      }),
    }
  );

  if (!response.ok) {
    return json({
      message: 'Failed to subscribe. Please try again later.',
      status: 400,
    });
  }

  return json({
    message: 'You are now subscribed to Spacefor Newsletter.',
    status: 201,
  });
};
