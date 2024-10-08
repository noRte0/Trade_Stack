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
    const techniques = await prisma.tradeTechnique.groupBy({
      by: ['technique'],
      _count: {
        technique: true,
      },
      where: {
        userId: token.id,
      },
    });

    return NextResponse.json(techniques);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch technique data' }, { status: 500 });
  }
}
