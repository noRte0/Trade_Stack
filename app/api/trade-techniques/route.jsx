import { getToken } from 'next-auth/jwt';
import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(request) {
  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });

  if (!token) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const { technique, Contract, LongShort, Leverage, lotsize, EntryPrice, ExitPrice, Pip, Note, Timeframe, result } = await request.json();

  if (!technique || !result) {
    return NextResponse.json({ message: 'Technique and result are required' }, { status: 400 });
  }

  try {
    const newTradeTechnique = await prisma.tradeTechnique.create({
      data: {
        userId: token.id,
        technique,
        Contract,
        LongShort,
        Leverage,
        lotsize,
        EntryPrice,
        ExitPrice,
        Pip,
        Note,
        Timeframe,
        result,
      },
    });
    return NextResponse.json(newTradeTechnique, { status: 201 });
  } catch (error) {
    console.error('Error during registration:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
//---------------------------สำหรับ winrate/breakeven/lose-----------------------------v-//
export async function GET(request) {

  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });

  if (!token) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {

    const techniques = await prisma.tradeTechnique.findMany({
      where: {
        userId: token.id, // กรองข้อมูลตาม userId ที่ล็อกอินอยู่
      },
    });
    
    const summary = techniques.reduce((acc, curr) => {
      
      if (!acc[curr.technique]) {
        acc[curr.technique] = { win: 0, breakeven: 0, lose: 0, total: 0, details: [] };
      }
      acc[curr.technique][curr.result]++;
      acc[curr.technique].total++;
      acc[curr.technique].details.push({
        Contract: curr.Contract,
        LongShort: curr.LongShort,
        Leverage: curr.Leverage,
        lotsize: curr.lotsize,
        EntryPrice: curr.EntryPrice,
        ExitPrice: curr.ExitPrice,
        Pip: curr.Pip,
        Note: curr.Note,
        Timeframe: curr.Timeframe,
        result: curr.result
      });
      return acc;
    }, {});

    const resultSummary = Object.keys(summary).map(technique => {
      const total = summary[technique].total;
      return {
        technique,
        win: ((summary[technique].win / total) * 100).toFixed(2),
        breakeven: ((summary[technique].breakeven / total) * 100).toFixed(2),
        lose: ((summary[technique].lose / total) * 100).toFixed(2),
        details: summary[technique].details
      };
    });

    return NextResponse.json(resultSummary);
  } catch (error) {
    console.error('Error retrieving summary:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}