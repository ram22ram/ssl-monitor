import sslChecker from 'ssl-checker';
import { Resend } from 'resend';

// Netlify serverless function ka main handler
export default async function handler(req) {
  
  // 1. Secret keys ko environment se load karein
  const RESEND_API_KEY = process.env.RESEND_API_KEY;
  const NETLIFY_IDENTITY_TOKEN = process.env.NETLIFY_IDENTITY_TOKEN;
  const NETLIFY_SITE_URL = process.env.URL; // Netlify yeh URL khud deta hai

  if (!RESEND_API_KEY || !NETLIFY_IDENTITY_TOKEN || !NETLIFY_SITE_URL) {
    console.error('Missing environment variables');
    return new Response('Server configuration error', { status: 500 });
  }

  const resend = new Resend(RESEND_API_KEY);
  // URL se site ka ID nikaalein (jaise 'sslmonitor')
  const siteId = NETLIFY_SITE_URL.split('https://')[1].split('.netlify.app')[0];

  try {
    // 2. Netlify se sabhi users ki list nikaalein
    console.log('Fetching all users...');
    const usersResponse = await fetch(
      `https://${siteId}.netlify.app/.netlify/identity/admin/users`,
      {
        headers: {
          Authorization: `Bearer ${NETLIFY_IDENTITY_TOKEN}`,
        },
      }
    );

    if (!usersResponse.ok) {
      throw new Error(`Failed to fetch users: ${usersResponse.statusText}`);
    }

    const { users } = await usersResponse.json();
    console.log(`Found ${users.length} users.`);

    // 3. Har user ke liye loop chalaayein
    for (const user of users) {
      const email = user.email;
      const sites = user.user_metadata?.sites || [];

      if (sites.length === 0) {
        console.log(`User ${email} has no sites. Skipping.`);
        continue;
      }

      console.log(`Checking sites for ${email}...`);

      // 4. Har site ko check karein
      for (const site of sites) {
        try {
          // ssl-checker ka istemaal karein
          const result = await sslChecker(site);

          // 5. Agar 30 din se kam bache hain, toh email bhejein
          if (result.valid && result.daysRemaining <= 30) {
            console.log(`ALERT: ${site} for ${email} is expiring in ${result.daysRemaining} days.`);
            
            await resend.emails.send({
              // IMPORTANT: 'from' address ko Resend dashboard mein verify karna hoga
              from: 'onboarding@resend.dev', // Example: 'alert@sslmonitor.com'
              to: email,
              subject: `URGENT: Your SSL for ${site} is expiring soon!`,
              html: `
                <h1>SSL Expiry Warning 🚨</h1>
                <p>Hello ${email},</p>
                <p>This is an automated alert. Our monitor found that your website <strong>${site}</strong> is expiring in <strong>${result.daysRemaining} days</strong> (on ${new Date(result.validTo).toDateString()}).</p>
                <p>Please renew it soon to avoid the "Not Secure" warning.</p>
                <br/>
                <p>- The SSL Monitor Team</p>
              `,
            });
          } else {
            console.log(`OK: ${site} for ${email} has ${result.daysRemaining} days left.`);
          }
        } catch (err) {
          console.warn(`Failed to check ${site} for ${email}: ${err.message}`);
          // Yahaan aap fail hone par bhi email bhej sakte hain
        }
      }
    }

    console.log('All sites checked successfully.');
    return new Response('All sites checked successfully.', { status: 200 });

  } catch (error) {
    console.error('Main function error:', error.message);
    return new Response(`Server error: ${error.message}`, { status: 500 });
  }
}