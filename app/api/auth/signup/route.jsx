import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(request) {    //get data from request//
    try {
        const { name, email, password } = await request.json();   //variable name email password and format data to json file//
        const hashedPassword = bcrypt.hashSync(password, 10);    //hash password//
        
        const newUser = await prisma.user.create({     //create table using prisma command //
            data: {
                name,
                email,
                password: hashedPassword
            }
        });

        return NextResponse.json({
            message: 'Sign up Complete',
            data: { newUser }
        });
    } catch (error) {
        console.error('Error during registration:', error);
        return NextResponse.json({
            error: 'Internal Server Error'
        }, { status: 500 });
    }
}
