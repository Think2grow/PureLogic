export const onRequestPost: PagesFunction = async ({ request }) => {
  try {
    const formData = await request.formData();
    
    // Extract form fields
    const data = {
      firstName: formData.get('firstName')?.toString().trim() || '',
      lastName: formData.get('lastName')?.toString().trim() || '',
      email: formData.get('email')?.toString().trim() || '',
      phone: formData.get('phone')?.toString().trim() || '',
      request: formData.get('request')?.toString().trim() || '',
      city: formData.get('city')?.toString().trim() || '',
      projectType: formData.get('projectType')?.toString().trim() || '',
      timeline: formData.get('timeline')?.toString().trim() || '',
      budget: formData.get('budget')?.toString().trim() || ''
    };

    const notes = [
      `Source: Website Contact Form`,
      `City: ${data.city || 'N/A'}`,
      `Project Type: ${data.projectType || 'N/A'}`,
      `Timeline: ${data.timeline || 'N/A'}`,
      `Budget: ${data.budget || 'N/A'}`,
      `Request: ${data.request || 'N/A'}`
    ].join('\n');

    // Send to your CRM webhook
    const webhookUrl = 'https://services.leadconnectorhq.com/hooks/0D3c4ZHt2RrTnSl27Qgl/webhook-trigger/3672958f-cf62-465f-b5e9-d78885b3f6f7';
    
    const webhookPayload = {
      firstname: data.firstName,
      lastname: data.lastName,
      email: data.email,
      phone: data.phone,
      notes,
      submittedAt: new Date().toISOString()
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
