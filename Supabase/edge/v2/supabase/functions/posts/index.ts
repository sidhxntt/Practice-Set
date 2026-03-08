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
    const parts  = url.pathname.replace(/^\/functions\/v1\/posts/, "").split("/").filter(Boolean);
    const id     = parts[0] ?? null;   // uuid string
    const { method } = req;

    // GET /posts
    if (method === "GET" && !id) {
      const published = url.searchParams.get("published");
      let query = supabase.from("posts").select("*, users(id, name, email)").order("created_at", { ascending: false });
      if (published !== null) query = query.eq("published", published === "true");

      const { data, error } = await query;
      if (error) throw error;
      return sendResponse(200, "Posts fetched successfully", data);
    }

    // GET /posts/:id
    if (method === "GET" && id) {
      const { data, error } = await supabase
        .from("posts")
        .select("*, users(id, name, email)")
        .eq("id", id)
        .single();
      if (error) throw error;
      if (!data) return sendResponse(404, "Post not found", undefined, "Not found");
      return sendResponse(200, "Post fetched successfully", data);
    }

    // POST /posts
    if (method === "POST") {
      const body = await parseBody(req, '{ "authorId", "title", "body"?, "published"? }');
      const { authorId, title, body: postBody, published = false } = body;

      if (!authorId || !title) {
        return sendResponse(400, "authorId and title are required", undefined, "Missing required fields");
      }

      const { data, error } = await supabase
        .from("posts")
        .insert({ author_id: authorId, title, body: postBody, published })
        .select()
        .single();
      if (error) throw error;
      return sendResponse(201, "Post created successfully", data);
    }

    // PATCH /posts/:id
    if (method === "PATCH" && id) {
      const body = await parseBody(req, '{ "title"?, "body"?, "published"? }');
      const { title, body: postBody, published } = body;

      if (!title && postBody === undefined && published === undefined) {
        return sendResponse(400, "At least one field must be provided", undefined, "Missing update fields");
      }

      const { data, error } = await supabase
        .from("posts")
        .update({
          ...(title                !== undefined && { title }),
          ...(postBody            !== undefined && { body: postBody }),
          ...(published           !== undefined && { published }),
        })
        .eq("id", id)
        .select()
        .single();
      if (error) throw error;
      return sendResponse(200, "Post updated successfully", data);
    }

    // DELETE /posts/:id
    if (method === "DELETE" && id) {
      const { error } = await supabase.from("posts").delete().eq("id", id);
      if (error) throw error;
      return sendResponse(200, "Post deleted successfully");
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