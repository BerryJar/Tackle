import { lucia, validateRequest } from '@/app/lib/auth';
import { cookies } from "next/headers";

export async function POST() {
  const { session } = await validateRequest();

  if (!session) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  await lucia.invalidateSession(session.id);

  const sessionCookie = lucia.createBlankSessionCookie();
  cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);

  return Response.json({ success: true });
}
