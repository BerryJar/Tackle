// "use server"

// // import { useRouter } from 'next/router';
// import { useEffect, useState } from 'react';
// import { Card, CardHeader, CardContent } from "@/components/ui/card"
// import { validateRequest } from '@/app/lib/auth';

// interface UserProfile {
//   id: string;
//   username: string;
//   createdAt: string;
// }

// export default async function ProfilePage() {

//   const user = await validateRequest();
//   const userId = user.user?.id;


//   // const router = useRouter();
//   // const { username } = router.query;
//   const [profile, setProfile] = useState<UserProfile | null>(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     if (userId) {
//       fetch(`/api/profile/${userId}`)
//         .then(res => res.json())
//         .then(data => {
//           setProfile(data);
//           setLoading(false);
//         })
//         .catch(err => {
//           console.error('Error fetching profile:', err);
//           setLoading(false);
//         });
//     }
//   }, [userId]);

//   if (loading) {
//     return <div className="flex justify-center items-center h-screen">Loading...</div>;
//   }

//   if (!profile) {
//     return <div className="flex justify-center items-center h-screen">User not found</div>;
//   }

//   return (
//     <div className="container mx-auto p-4">
//       <Card className="w-full max-w-md mx-auto">
//         <CardHeader>
//           <h2 className="text-2xl font-bold">{profile.username}'s Profile</h2>
//         </CardHeader>
//         <CardContent>
//           <p className="text-gray-600">User ID: {profile.id}</p>
//           <p className="text-gray-600">Joined: {new Date(profile.createdAt).toLocaleDateString()}</p>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }


// import { validateRequest } from '@/app/lib/auth';
// import { Card, CardHeader, CardContent } from '@/components/ui/card';

// export default async function ProfilePage({ params }: { params: { userId: string } }) {
//   const { userId } = params;

//   const user = await validateRequest();
//   if (user.user?.id !== userId) {
//     return <div className="flex justify-center items-center h-screen">Unauthorized</div>;
//   }

//   try {
//     const res = await fetch(`/api/profile?username=${encodeURIComponent(user.user?.id)}`, { cache: 'no-store' });
//     const profile = await res.json();

//     if (!profile) {
//       return <div className="flex justify-center items-center h-screen">User not found</div>;
//     }

//     return (
//       <div className="container mx-auto p-4">
//         <Card className="w-full max-w-md mx-auto">
//           <CardHeader>
//             <h2 className="text-2xl font-bold">{profile.username}'s Profile</h2>
//           </CardHeader>
//           <CardContent>
//             <p className="text-gray-600">User ID: {profile.id}</p>
//             <p className="text-gray-600">Joined: {new Date(profile.createdAt).toLocaleDateString()}</p>
//           </CardContent>
//         </Card>
//       </div>
//     );
//   } catch (error) {
//     console.error('Error fetching profile:', error);
//     return <div className="flex justify-center items-center h-screen">Error fetching profile</div>;
//   }
// }


// import { useRouter } from 'next/router';
// import { useEffect, useState } from 'react';
// import db from '@/app/lib/db'; // Assuming you have a db connection setup
// import { eq } from 'drizzle-orm';
// import { userTable } from '@/app/lib/db/schema'; // Assuming you have a users table defined

// export default function UserProfile() {

//   type User = {
//     id: string;
//     hashedPassword: string | null;
//     displayName: string | null;
//     email: string | null;
//     isEmailVerified: string;
//     googleId: string | null;
//     profilePicture: string | null;
//     darkMode: boolean;
//     createdAt: Date;
//     isPrivate: boolean;
//   } | null;

//   const router = useRouter();
//   const { userId } = router.query;
//   const [user, setUser] = useState<User>(null);

//   useEffect(() => {
//     async function fetchUser() {
//       if (userId && typeof userId === 'string') {
//         const fetchedUser = await db.select().from(userTable).where(eq(userTable.id, userId)).limit(1);
//         setUser(fetchedUser[0] || null);
//       }
//     }

//     fetchUser();
//   }, [userId]);

//   if (!user) return <div>Loading...</div>;

//   return (
//     <div>
//       <h1>User Profile</h1>
//       <p>User ID: {user.id}</p>
//       <p>Email: {user.email}</p>
//       {/* Add more user details as needed */}
//     </div>
//   );
// }

// import { eq } from 'drizzle-orm';
// import { userTable } from '@/app/lib/db/schema';
// import db from '@/app/lib/db';


// export default async function ProfilePage({params}: any) {

//   const userId = params.id;

//   // Execute the query to fetch the user data based on the userId
//   const user = await db
//     .select()
//     .from(userTable)
//     .where(eq(userTable.id, String(userId)))
//     .limit(1);

//     console.log("TEST TEST " + userId)

//   if (!user[0]) {
//     return <div>User not found</div>;
//   }

//   return (
//     <div>
//       <h1>Profile Page</h1>
//       <p>User ID: {user[0].id}</p>
//       <p>Email: {user[0].email}</p>
//       {/* Render other user details */}
//     </div>
//   );
// }

// "use client"

// import { useRouter, useSearchParams } from "next/navigation"

// export default function ProfilePage() {

//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const search = searchParams.get('id')
//   // const params = useParams();
//   console.log(search)

//   return (
//     <div>
//       <h1>Profile Page</h1>
//       <p>User ID: {search}</p>
//       {/* Render other user details */}
//     </div>
//   );

// }


// "use client"

// import ProfilePageComponent from "@/app/custom_components/ProfilePageComponent"
// import { validateRequest } from "@/app/lib/auth";
// import { redirect, useParams } from "next/navigation";
// import { useRouter } from "next/navigation";

// export default function ProfilePage({
//     params
// }: { params: { userId: string }}) {

//     const router = useRouter();
//     // const params = useParams();
//     console.log("TEST OH " + params.userId)
  

//     // const visitorUser = await validateRequest();

//     // if (!visitorUser) {
//     //     return redirect('/sign-in');
//     // }

//     // const visitorUserId = visitorUser.user?.id;
//     // const visitorId = visitorUserId?.toString();

//     return(
//         <div>
//             {/* <ProfilePageComponent id={searchParams}></ProfilePageComponent> */}
//             <p>{params.userId}</p>
//         </div>
//         )

// }

// "use client"

// import ProfilePageComponent from "@/app/custom_components/ProfilePageComponent";
// import { useParams } from "next/navigation";

// export default function ProfilePage() {

//   const params = useParams<{ username: string }>();

//   const userId = params.username;

//   console.log(params)

//   return (
//     <ProfilePageComponent id={userId}></ProfilePageComponent>
//   )

// }

import { cookies } from 'next/headers';
import { validateRequest } from '@/app/lib/auth'; // Adjust the path based on your project structure
import UsersOwnProfile from '@/app/custom_components/UsersOwnProfile'; // Adjust the path based on your project structure
import ProfilePageComponent from '@/app/custom_components/ProfilePageComponent';
// import UsersOwnProfile from './UsersOwnProfile'; // Adjust the path based on your project structure
// import UserProfile from './UserProfile'; // Adjust the path based on your project structure

// interface Params {
//   params: {
//     userId: string;
//   };
// }

export default async function ProfilePage({
  params,
}: {
  params: { username: string };

}) {

  const id = params.username

  const user = await validateRequest();
  console.log("Visiting user " + user.user?.id)
  console.log("User ID " + id)

  if (user.user?.id === id) {
    return <UsersOwnProfile id={id} />;
  } else {
    return <ProfilePageComponent id={id} />;
  }

  // if (user && user.userId === userId) {
  //   return <UsersOwnProfile userId={userId} />;
  // } else {
  //   return <UserProfile userId={userId} />;
  // }
}
