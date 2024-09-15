import { NextApiRequest, NextApiResponse } from 'next';
import db from "@/app/lib/db";
import { userTable } from '@/app/lib/db/schema';
import { eq } from 'drizzle-orm';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).end();
  }

  const { userId } = req.query;

  if (typeof userId !== 'string') {
    return res.status(400).json({ error: 'Invalid username' });
  }

  try {
    const user = await db.select({
      id: userTable.id,
      email: userTable.email,
      createdAt: userTable.createdAt,
    })
    .from(userTable)
    .where(eq(userTable.email, userId))
    .limit(1);

    if (!user.length) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json(user[0]);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}