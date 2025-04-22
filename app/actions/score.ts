import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { auth } from "@clerk/nextjs/server";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }

    const userScore = await prisma.$queryRaw`
      SELECT * FROM UserScore WHERE userId = ${userId}
    `;

    if (!userScore || (Array.isArray(userScore) && userScore.length === 0)) {
      return NextResponse.json({ lastScore: 0, highScore: 0 });
    }

    const userData = Array.isArray(userScore) ? userScore[0] : userScore;

    return NextResponse.json({
      lastScore: userData.lastScore || 0,
      highScore: userData.highScore || 0,
    });
  } catch (error) {
    console.error("Erreur lors de la récupération des scores:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }

    const { newScore } = await request.json();

    const existingUser = await prisma.$queryRaw`
      SELECT * FROM UserScore WHERE userId = ${userId}
    `;

    let result;
    
    if (!existingUser || (Array.isArray(existingUser) && existingUser.length === 0)) {
      result = await prisma.$executeRaw`
        INSERT INTO UserScore (id, userId, lastScore, highScore, createdAt, updatedAt)
        VALUES (${crypto.randomUUID()}, ${userId}, ${newScore}, ${newScore}, ${new Date().toISOString()}, ${new Date().toISOString()})
      `;
      
      return NextResponse.json({
        lastScore: newScore,
        highScore: newScore,
      });
    } else {
      const userData = Array.isArray(existingUser) ? existingUser[0] : existingUser;
      const currentHighScore = userData.highScore || 0;
      const newHighScore = newScore > currentHighScore ? newScore : currentHighScore;
      
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      result = await prisma.$executeRaw`
        UPDATE UserScore 
        SET lastScore = ${newScore}, 
            highScore = ${newHighScore},
            updatedAt = ${new Date().toISOString()}
        WHERE userId = ${userId}
      `;
      
      return NextResponse.json({
        lastScore: newScore,
        highScore: newHighScore,
      });
    }
  } catch (error) {
    console.error("Erreur lors de la mise à jour des scores:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}