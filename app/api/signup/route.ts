import { prisma } from '@/prisma/prisma-client';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const body = await req.json();

  if (!body?.name || !body?.email || !body?.password) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  const user = await prisma.user.create({
    data: {
      name: body.name,
      mail: body.email,
      password: body.password,
    },
  });

  return NextResponse.json(user);
}
