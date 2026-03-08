import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { sendResponse, getAuth, parseBody } from "../_shared/response.ts";

Deno.serve(async (req: Request) => {
  try {
    const token = req.headers.get("Authorization")?.replace("Bearer ", "");
    if (!token) return sendResponse(401, "Unauthorized", undefined, "Missing token");

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_ANON_KEY")!,
      { global: { headers: { Authorization: `Bearer ${token}` } } }
    );

    const { user, error: authError } = await getAuth(req, supabase);
    if (authError || !user) return sendResponse(401, "Unauthorized", undefined, "Invalid token");

    const url    = new URL(req.url);
    const parts  = url.pathname.replace(/^\/functions\/v1\/address/, "").split("/").filter(Boolean);
    const id     = parts[0] ? parseInt(parts[0]) : null;
    const { method } = req;

    // GET /address
    if (method === "GET" && !id) {
      const { data, error } = await supabase
        .from("address")
        .select("*, users(id, name, email)");
      if (error) throw error;
      return sendResponse(200, "Addresses fetched successfully", data);
    }

    // GET /address/:id
    if (method === "GET" && id) {
      const { data, error } = await supabase
        .from("address")
        .select("*, users(id, name, email)")
        .eq("id", id)
        .single();
      if (error) throw error;
      if (!data) return sendResponse(404, "Address not found", undefined, "Not found");
      return sendResponse(200, "Address fetched successfully", data);
    }

    // POST /address
    if (method === "POST") {
      const body = await parseBody(req, '{ "userId", "street", "city", "zipcode", "suite"? }');
      const { userId, street, suite, city, zipcode } = body;

      if (!userId || !street || !city || !zipcode) {
        return sendResponse(400, "userId, street, city and zipcode are required", undefined, "Missing required fields");
      }

      const { data, error } = await supabase
        .from("address")
        .insert({ user_id: userId, street, suite, city, zipcode })
        .select()
        .single();
      if (error) throw error;
      return sendResponse(201, "Address created successfully", data);
    }

    // PATCH /address/:id
    if (method === "PATCH" && id) {
      const body = await parseBody(req, '{ "street"?, "suite"?, "city"?, "zipcode"? }');
      const { street, suite, city, zipcode } = body;

      if (!street && !suite && !city && !zipcode) {
        return sendResponse(400, "At least one field must be provided", undefined, "Missing update fields");
      }

      const { data, error } = await supabase
        .from("address")
        .update({
          ...(street  && { street }),
          ...(suite   && { suite }),
          ...(city    && { city }),
          ...(zipcode && { zipcode }),
        })
        .eq("id", id)
        .select()
        .single();
      if (error) throw error;
      return sendResponse(200, "Address updated successfully", data);
    }

    // DELETE /address/:id
    if (method === "DELETE" && id) {
      const { error } = await supabase.from("address").delete().eq("id", id);
      if (error) throw error;
      return sendResponse(200, "Address deleted successfully");
    }

    return sendResponse(405, "Method not allowed", undefined, `${method} not supported`);

  } catch (err: any) {
    const isKnown = err?.status;
    return sendResponse(
      isKnown ? err.status : 500,
      isKnown ? err.message : "Internal server error",
      undefined,
      isKnown ? undefined : 'Check request body and endpoint'
    );
  }
});