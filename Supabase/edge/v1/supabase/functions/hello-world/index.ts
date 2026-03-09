import "jsr:@supabase/functions-js/edge-runtime.d.ts"

console.log("Hello from Functions 1")

Deno.serve(async (req: Request) => {
  return new Response(
    JSON.stringify({ message: "Hello world" }),
    {
      headers: { 
        "Content-Type": "application/json" 
      },
      
    }
  );
});
