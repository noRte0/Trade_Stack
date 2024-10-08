import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server'; 
import { getToken } from 'next-auth/jwt';

const prisma = new PrismaClient();

export async function GET(request) {

    const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });

    if (!token) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

  try {
    const trades = await prisma.tradeTechnique.findMany({
      where: {
        userId: token.id, 
      },
    });

    return NextResponse.json(trades);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch trade data' }, { status: 500 });
  }
}
