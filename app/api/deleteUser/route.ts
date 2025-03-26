"use server";

import { auth, clerkClient } from "@clerk/nextjs/server";

export async function handleServerDelete() {
  const { userId } = await auth();
  const clerk = await clerkClient();
  if (!userId) {
    return { error: "Unauthorized", status: 401 };
  }
  try {
    await clerk.users.deleteUser(userId);
    return { message: "User deleted" };
  } catch (error) {
    console.log(error);
    return { error: "Error deleting user" };
  }
}
