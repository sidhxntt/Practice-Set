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
    const parts  = url.pathname.replace(/^\/functions\/v1\/todos/, "").split("/").filter(Boolean);
    const id     = parts[0] ? parseInt(parts[0]) : null;
    const { method } = req;

    // GET /todos
    if (method === "GET" && !id) {
      const userId    = url.searchParams.get("userId");
      const completed = url.searchParams.get("completed");

      let query = supabase
        .from("todos")
        .select("*, users(id, name, email)")
        .order("created_at", { ascending: false });

      if (userId)    query = query.eq("user_id", userId);
      if (completed) query = query.eq("completed", completed === "true");

      const { data, error } = await query;
      if (error) throw error;
      return sendResponse(200, "Todos fetched successfully", data);
    }

    // GET /todos/:id
    if (method === "GET" && id) {
      const { data, error } = await supabase
        .from("todos")
        .select("*, users(id, name, email)")
        .eq("id", id)
        .single();
      if (error) throw error;
      if (!data) return sendResponse(404, "Todo not found", undefined, "Not found");
      return sendResponse(200, "Todo fetched successfully", data);
    }

    // POST /todos
    if (method === "POST") {
      const body = await parseBody(req, '{ "userId", "title", "completed"? }');
      const { userId, title, completed = false } = body;

      if (!userId || !title) {
        return sendResponse(400, "userId and title are required", undefined, "Missing required fields");
      }

      const { data, error } = await supabase
        .from("todos")
        .insert({ user_id: userId, title, completed })
        .select()
        .single();
      if (error) throw error;
      return sendResponse(201, "Todo created successfully", data);
    }

    // PATCH /todos/:id
    if (method === "PATCH" && id) {
      const body = await parseBody(req, '{ "title"?, "completed"? }');
      const { title, completed } = body;

      if (!title && completed === undefined) {
        return sendResponse(400, "At least one field must be provided", undefined, "Missing update fields");
      }

      const { data, error } = await supabase
        .from("todos")
        .update({
          ...(title     !== undefined && { title }),
          ...(completed !== undefined && { completed }),
        })
        .eq("id", id)
        .select()
        .single();
      if (error) throw error;
      return sendResponse(200, "Todo updated successfully", data);
    }

    // DELETE /todos/:id
    if (method === "DELETE" && id) {
      const { error } = await supabase.from("todos").delete().eq("id", id);
      if (error) throw error;
      return sendResponse(200, "Todo deleted successfully");
    }

    return sendResponse(405, "Method not allowed", undefined, `${method} not supported`);

  } catch (err: any) {
    const isKnown = err?.status;
    return sendResponse(
      isKnown ? err.status : 500,
      isKnown ? err.message : "Internal server error",
      undefined,
      isKnown ? undefined : "Check request body and endpoint"
    );
  }
});