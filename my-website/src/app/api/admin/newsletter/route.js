import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search') || '';

    const where = {};
    if (search) {
      where.email = { contains: search, mode: 'insensitive' };
    }

    const subscribers = await prisma.newsletter.findMany({
      where,
      orderBy: { subscribedAt: 'desc' },
    });

    return NextResponse.json({ subscribers, total: subscribers.length });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch subscribers' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const { email } = await request.json();
    if (!email) return NextResponse.json({ error: 'Email is required' }, { status: 400 });

    const subscriber = await prisma.newsletter.upsert({
      where: { email },
      update: {},
      create: { email },
    });

    return NextResponse.json({ success: true, subscriber });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to subscribe' }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 });

    await prisma.newsletter.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete subscriber' }, { status: 500 });
  }
}
