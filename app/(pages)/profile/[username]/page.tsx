

import { cookies } from 'next/headers';
import { validateRequest } from '@/app/lib/auth'; // Adjust the path based on your project structure
import UsersOwnProfile from '@/app/custom_components/UsersOwnProfile'; // Adjust the path based on your project structure
import ProfilePageComponent from '@/app/custom_components/ProfilePageComponent';
import db from '@/app/lib/db';
import { sql } from 'drizzle-orm';
import { userTable } from '@/app/lib/db/schema';
import { PgText } from 'drizzle-orm/pg-core';
// import UsersOwnProfile from './UsersOwnProfile'; // Adjust the path based on your project structure
// import UserProfile from './UserProfile'; // Adjust the path based on your project structure

// interface Params {
//   params: {
//     userId: string;
//   };
// }

interface UserDisplayInfo {
  id: string;
  displayInfo: string;
  email: string;
  profilePicture: string;
  location: string;
  website: string;
  bio: string;
  occupation: string;
  createdAt: string;
}

export async function getUserDisplayInfo(userId: string): Promise<UserDisplayInfo> {
  try {
    const result = await db
      .select({
        id: userTable.id,
        email: userTable.email,
        displayName: userTable.displayName,
        profilePicture: userTable.profilePicture,
        location: userTable.location,
        website: userTable.website,
        bio: userTable.bio,
        occupation: userTable.occupation,
        createdAt: userTable.createdAt,
      })
      .from(userTable)
      .where(sql`${userTable.id} = ${userId}`)
      .limit(1)

    const user = result[0];
    return {
      id: user.id,
      displayInfo: user.displayName ?? user.email ?? 'Unknown User',
      email: user.email ?? '',
      profilePicture: user.profilePicture ?? '',
      location: user.location ?? '',
      website: user.website ?? '',
      bio: user.bio ?? '',
      occupation: user.occupation ?? '',
      createdAt: user.createdAt.toISOString(),
    };
  } catch (error) {
    console.error('Error fetching user display info:', error)
    throw error
  }
}

function isUserDisplayInfo(displayInfo: UserDisplayInfo | null): displayInfo is UserDisplayInfo {
  return displayInfo !== null;
}

export default async function ProfilePage({
  params,
}: {
  params: { username: string };

}) {

  const id = params.username
  const userInfo = await getUserDisplayInfo(id)
  console.log("User info: " + userInfo)


  const user = await validateRequest();

  

  if (user.user?.id === id) {
    return <UsersOwnProfile userInfo={userInfo} />;
  } else {
    return <ProfilePageComponent userInfo={userInfo} />;
  }

  // if (user && user.userId === userId) {
  //   return <UsersOwnProfile userId={userId} />;
  // } else {
  //   return <UserProfile userId={userId} />;
  // }
}
