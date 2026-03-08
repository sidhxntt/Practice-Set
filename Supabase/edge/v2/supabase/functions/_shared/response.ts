export const headers = { "Content-Type": "application/json" };

export const sendResponse = (status: number, message: string, data?: any, error?: string) =>
  new Response(
    JSON.stringify({ message, ...(data !== undefined && { data }), ...(error && { error }) }),
    { status, headers }
  );

export const getAuth = async (req: Request, supabase: any) => {
  const token = req.headers.get("Authorization")?.replace("Bearer ", "");
  if (!token) return { user: null, error: "Missing token" };
  const { data: { user }, error } = await supabase.auth.getUser(token);
  return { user, error: error?.message ?? null };
};

export const parseBody = async (req: Request, hint: string) => {
  return req.json().catch(() => {
    throw { status: 400, message: `Invalid JSON. Expected: ${hint}` };
  });
};