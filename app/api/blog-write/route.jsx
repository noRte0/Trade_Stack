import { getToken } from 'next-auth/jwt';
import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

// ฟังก์ชันสำหรับสร้าง slug
const slugify = (str) =>
  str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");

// ฟังก์ชันสำหรับตรวจสอบและสร้าง slug ที่ไม่ซ้ำกัน
const generateUniqueSlug = async (product) => {
  let slug = slugify(product);
  let count = 1;

  // ตรวจสอบว่า slug มีอยู่ในฐานข้อมูลหรือไม่
  let existingBlog = await prisma.blog.findUnique({
    where: { slug },
  });

  // ถ้ามี slug ซ้ำ ให้เพิ่มตัวเลขต่อท้าย slug
  while (existingBlog) {
    slug = `${slugify(product)}-${count}`;
    count += 1;
    existingBlog = await prisma.blog.findUnique({
      where: { slug },
    });
  }

  return slug;
};




export async function POST(request) {
  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });

  if (!token) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const { product, about, photo } = await request.json(); // เพิ่มการดึงค่า photo

  if (!product || !about || !photo) { // ตรวจสอบว่ามี photo หรือไม่
    return NextResponse.json({ message: 'Productname, detail and photo are required' }, { status: 400 });
  }

  try {
    const slug = await generateUniqueSlug(product);

    const createBlog = await prisma.blog.create({
      data: {
        userId: token.id,
        product,
        about,
        slug,
        photo, // บันทึก photo
      },
    });
    return NextResponse.json(createBlog, { status: 201 });
  } catch (error) {
    console.error('Error during createBlog:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}

