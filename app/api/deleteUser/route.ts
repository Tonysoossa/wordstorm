import { auth } from "@clerk/nextjs/server";

export async function DELETE() {
  const { userId } = await auth();

  if (!userId) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await fetch(`https://api.clerk.dev/v1/users/${userId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${process.env.CLERK_SECRET_KEY}`,
        "Content-Type": "application/json",
      },
    });

    return Response.json({ message: "User deleted" });
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Error deleting user" }, { status: 500 });
  }
}
