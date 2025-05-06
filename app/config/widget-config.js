const config = {
    api_base_url: process.env.NEXT_PUBLIC_API_BASE_URL,
    render_url: process.env.NEXT_PUBLIC_WIDGET_RENDER_URL,
    client_id: process.env.NEXT_PUBLIC_CLIENT_ID,
    client_secret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
    currency_id: process.env.NEXT_PUBLIC_CURRENCY_ID || 'USD'
  };

export default config;
