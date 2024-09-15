import { NextApiRequest, NextApiResponse } from 'next';
import { lucia, validateRequest } from '@/app/lib/auth';
import db from '@/app/lib/db';
import { userTable } from '@/app/lib/db/schema';
import { eq } from 'drizzle-orm';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {

    const session = await validateRequest();

    if (!session) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const { userId, location, website, bio, occupation } = req.body;

    // Ensure the authenticated user is updating their own profile
    if (session.user?.id !== userId) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    // Update the user profile in the database
    const updatedUser = await db.update(userTable)
      .set({
        location,
        website,
        bio,
        occupation,
      })
      .where(eq(userTable.id, userId))
      .returning();

    if (!updatedUser || updatedUser.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(updatedUser[0]);
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}