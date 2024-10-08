import React from "react";
import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';


const prisma = new PrismaClient();

export const GET = async (request) => {
    const { searchParams } = new URL(request.url);
    const page = searchParams.get("page");
    const POST_PER_PAGE = 5;

  const query = {
    take:POST_PER_PAGE,
    skip:POST_PER_PAGE*(page-1),
    }

    try {
      const [blogs,count] = await prisma.$transaction([
      prisma.blog.findMany(query),
      prisma.blog.count(),
      ]);
      return NextResponse.json({blogs,count},{status:200});
    } catch (error) {
      console.error('Error retrieving summary:', error);
      return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
  }

