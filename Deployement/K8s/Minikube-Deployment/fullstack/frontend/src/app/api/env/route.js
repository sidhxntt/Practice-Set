// app/api/env/route.js
export async function GET() {
    const envVars = {
      APP_SERVER_URL: process.env.APP_SERVER_URL,
    };
  
    return new Response(JSON.stringify(envVars), {
      headers: { "Content-Type": "application/json" },
    });
  }
  