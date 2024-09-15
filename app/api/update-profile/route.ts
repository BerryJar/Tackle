import { NextRequest, NextResponse } from 'next/server';
import { validateRequest } from '@/app/lib/auth';
import db from '@/app/lib/db';
import { userTable } from '@/app/lib/db/schema';
import { eq } from 'drizzle-orm';

export async function POST(request: NextRequest) {
  try {
    const session = await validateRequest();

    if (!session) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const { userId, location, website, bio, occupation } = await request.json();

    // Ensure the authenticated user is updating their own profile
    if (session.user?.id !== userId) {
      return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
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
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    return NextResponse.json(updatedUser[0]);
  } catch (error) {
    console.error('Error updating profile:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}