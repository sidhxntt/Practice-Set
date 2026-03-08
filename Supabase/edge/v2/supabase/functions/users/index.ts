// supabase/functions/user/index.ts
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const headers = { "Content-Type": "application/json" };

const sendResponse = (
  status: number,
  message: string,
  data?: any,
  error?: string,
) =>
  new Response(
    JSON.stringify({ message, ...(data && { data }), ...(error && { error }) }),
    { status, headers },
  );

Deno.serve(async (req: Request) => {
  try {
    // --- Auth ---
    const authHeader = req.headers.get("Authorization");

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_ANON_KEY")!,
      authHeader ? { global: { headers: { Authorization: authHeader } } } : {},
    );

    let user = null;

    // If header exists → verify
    if (authHeader) {
      const token = authHeader.replace("Bearer ", "");
      const { data, error } = await supabase.auth.getUser(token);

      if (error || !data.user) {
        return sendResponse(401, "Unauthorized", undefined, "Invalid token");
      }

      user = data.user;
    } else {
      // no header → assume local dev
      console.log("No Authorization header → skipping auth (local dev)");
    }
    // --- Routing ---
    const url = new URL(req.url);
    const parts = url.pathname
      .replace(/^\/functions\/v1\/user/, "")
      .split("/")
      .filter(Boolean);
    const id = parts[0] ?? null;
    const { method } = req;

    // GET /user
    if (method === "GET" && !id) {
      const { data, error } = await supabase
        .from("users")
        .select("*, address(*)");
      if (error) throw error;
      return sendResponse(200, "Users fetched successfully", data);
    }

    // GET /user/:id
    if (method === "GET" && id) {
      const { data, error } = await supabase
        .from("users")
        .select("*, address(*), posts(*)")
        .eq("id", id)
        .single();
      if (error) throw error;
      if (!data)
        return sendResponse(404, "User not found", undefined, "Not found");
      return sendResponse(200, "User fetched successfully", data);
    }

    // POST /user
    if (method === "POST") {
      const body = await req.json().catch(() => {
        throw {
          status: 400,
          message: 'Invalid JSON. Expected: { "name", "email", "username" }',
        };
      });

      const { name, email, username, phone, website } = body;

      if (!name || !email || !username) {
        return sendResponse(
          400,
          "name, email, and username are required",
          undefined,
          "Missing required fields",
        );
      }

      const { data, error } = await supabase
        .from("users")
        .insert({ name, email, username, phone, website })
        .select()
        .single();

      if (error) throw error;
      return sendResponse(201, "User created successfully", data);
    }

    // PATCH /user/:id
    if (method === "PATCH" && id) {
      const body = await req.json().catch(() => {
        throw {
          status: 400,
          message:
            'Invalid JSON. Expected: { "name"?, "email"?, "username"?, "phone"?, "website"? }',
        };
      });

      const { name, email, username, phone, website } = body;

      if (!name && !email && !username && !phone && !website) {
        return sendResponse(
          400,
          "At least one field must be provided",
          undefined,
          "Missing update fields",
        );
      }

      const { data, error } = await supabase
        .from("users")
        .update({
          ...(name && { name }),
          ...(email && { email }),
          ...(username && { username }),
          ...(phone && { phone }),
          ...(website && { website }),
        })
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      return sendResponse(200, "User updated successfully", data);
    }

    // DELETE /user/:id
    if (method === "DELETE" && id) {
      const { error } = await supabase.from("users").delete().eq("id", id);
      if (error) throw error;
      return sendResponse(200, "User deleted successfully");
    }

    return sendResponse(
      405,
      "Method not allowed",
      undefined,
      `${method} not supported`,
    );
  } catch (err: any) {
    const isKnown = err?.status;
    const status = isKnown ? err.status : 500;
    const message = isKnown ? err.message : "Internal server error";
    const hint = isKnown ? undefined : "Check request body and endpoint";

    return sendResponse(status, message, undefined, hint);
  }
});
