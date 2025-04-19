// app/api/scores/route.ts (avec import explicite)
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { auth } from "@clerk/nextjs/server";

// Créer une instance de Prisma Client
const prisma = new PrismaClient();

// GET pour récupérer les scores d'un utilisateur
export async function GET() {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }

    // Vérifier si l'utilisateur existe dans la base de données
    const userScore = await prisma.$queryRaw`
      SELECT * FROM UserScore WHERE userId = ${userId}
    `;

    // Si userScore est un tableau vide, l'utilisateur n'existe pas
    if (!userScore || (Array.isArray(userScore) && userScore.length === 0)) {
      return NextResponse.json({ lastScore: 0, highScore: 0 });
    }

    // Extraction des données (ajustez selon la structure réelle retournée)
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

// POST pour mettre à jour les scores d'un utilisateur
export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }

    const { newScore } = await request.json();

    // Vérifier si l'utilisateur existe
    const existingUser = await prisma.$queryRaw`
      SELECT * FROM UserScore WHERE userId = ${userId}
    `;

    let result;
    
    if (!existingUser || (Array.isArray(existingUser) && existingUser.length === 0)) {
      // Créer un nouvel utilisateur
      result = await prisma.$executeRaw`
        INSERT INTO UserScore (id, userId, lastScore, highScore, createdAt, updatedAt)
        VALUES (${crypto.randomUUID()}, ${userId}, ${newScore}, ${newScore}, ${new Date().toISOString()}, ${new Date().toISOString()})
      `;
      
      return NextResponse.json({
        lastScore: newScore,
        highScore: newScore,
      });
    } else {
      // Extraction des données de l'utilisateur existant
      const userData = Array.isArray(existingUser) ? existingUser[0] : existingUser;
      const currentHighScore = userData.highScore || 0;
      const newHighScore = newScore > currentHighScore ? newScore : currentHighScore;
      
      // Mise à jour de l'utilisateur
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