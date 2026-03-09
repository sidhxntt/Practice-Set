import "jsr:@supabase/functions-js/edge-runtime.d.ts"

console.log("Hello from Function 2")

Deno.serve(async (req) => {
  try {
    const body = await req.json().catch(() => {
      throw { status: 400, message: 'Invalid JSON body. Expected: { "name": "string" }' };
    });

    const { name } = body;

    if (!name || typeof name !== "string") {
      throw { status: 422, message: 'Missing required field: "name" (string)' };
    }

    return new Response(
      JSON.stringify({ message: `Hello ${name}!` }),
      { headers: { "Content-Type": "application/json" } }
    );

  } catch (err: any) {
    const isKnown = err?.status;

    const status  = isKnown ? err.status : 500;
    const message = isKnown ? err.message : "Internal server error";
    const hint    = isKnown ? null : 'Expected request body: { "name": "string" }';

    return new Response(
      JSON.stringify({ error: message, ...(hint && { hint }) }),
      { status, headers: { "Content-Type": "application/json" } }
    );
  }
});