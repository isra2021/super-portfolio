import {NextResponse, NextRequest} from "next/server";
import {z} from "zod";
import bcrypt from "bcrypt";
import prisma from "@/prisma/client";

const socialMediaAccountSchema = z.object({
  platform: z.string(),
  url: z.string().url(),
});

const createUser = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
  password: z.string(),
  role: z.string().optional(),
  birthdate: z.string().optional(),
  socialMediaAccounts: z.array(socialMediaAccountSchema).optional(),
});

export async function POST(request: NextRequest) {
  const body = await request.json();

  const result = createUser.safeParse(body);
  if (!result.success) {
    return NextResponse.json(result.error);
  }

  const user = await prisma.user.findUnique({
    where: {email: body.email},
  });

  if (user) {
    return NextResponse.json({status: 409, message: "Email already in use"});
  }

  const hashedPassword = await bcrypt.hash(body.password, 10);

  try {
    await prisma.user.create({
      data: {...body, password: hashedPassword},
    });
  } catch (error) {
    return NextResponse.json({message: "Internal error while attempting to create user"}, {status: 500});
  }

  return NextResponse.json({status: 201, message: "User created successfully"});
}
