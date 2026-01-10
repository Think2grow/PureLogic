export const onRequestPost: PagesFunction = async ({ request }) => {
  try {
    const formData = await request.formData();
    
    // Extract form fields
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      city: formData.get('city'),
      projectType: formData.get('projectType'),
      timeline: formData.get('timeline'),
      budget: formData.get('budget'),
      message: formData.get('message'),
    };

    // Send to your CRM webhook
    const webhookUrl = 'YOUR_CRM_WEBHOOK_URL'; // Replace with your CRM webhook URL
    
    const webhookPayload = {
      ...data,
      submittedAt: new Date().toISOString(),
      source: 'Website Contact Form'
    };

    const webhookResponse = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(webhookPayload)
    });

    if (!webhookResponse.ok) {
      throw new Error('Webhook delivery failed');
    }

    // Redirect to thank you page
    return Response.redirect(new URL('/thank-you', request.url), 303);
    
  } catch (error) {
    console.error('Form submission error:', error);
    return new Response(JSON.stringify({ error: 'Submission failed' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
