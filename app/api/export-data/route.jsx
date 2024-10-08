import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { parse } from 'json2csv';

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

    // Convert data to CSV
    const csv = parse(trades);

    // Set headers for CSV download
    const headers = new Headers();
    headers.set('Content-Type', 'text/csv');
    headers.set('Content-Disposition', 'attachment; filename=trade_techniques.csv');

    return new NextResponse(csv, { headers });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch trade data' }, { status: 500 });
  }
}
