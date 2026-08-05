import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

let memoryContacts = [];

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search') || '';
    const status = searchParams.get('status') || '';

    let contacts = [];
    try {
      const where = {};
      if (search) {
        where.OR = [
          { name: { contains: search, mode: 'insensitive' } },
          { email: { contains: search, mode: 'insensitive' } },
          { subject: { contains: search, mode: 'insensitive' } },
        ];
      }
      if (status) {
        where.status = status;
      }

      contacts = await prisma.contact.findMany({
        where,
        orderBy: { createdAt: 'desc' },
      });
    } catch (dbErr) {
      console.warn('⚠️ Contact DB query fallback');
    }

    if (!contacts || contacts.length === 0) {
      contacts = memoryContacts;
      if (search) {
        const q = search.toLowerCase();
        contacts = contacts.filter(
          (c) => c.name.toLowerCase().includes(q) || c.email.toLowerCase().includes(q)
        );
      }
      if (status) {
        contacts = contacts.filter((c) => c.status === status);
      }
    }

    return NextResponse.json({ contacts });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch contacts' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, company, phone, subject, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Name, email, and message are required' }, { status: 400 });
    }

    let contact = null;
    try {
      contact = await prisma.contact.create({
        data: {
          name,
          email,
          company,
          phone,
          subject,
          message,
        },
      });
    } catch (createErr) {
      contact = {
        id: `contact-${Date.now()}`,
        name,
        email,
        company,
        phone,
        subject,
        message,
        status: 'UNREAD',
        createdAt: new Date().toISOString(),
      };
      memoryContacts.unshift(contact);
    }

    return NextResponse.json({ success: true, contact });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to record contact request' }, { status: 500 });
  }
}

export async function PATCH(request) {
  try {
    const { id, status } = await request.json();
    if (!id || !status) return NextResponse.json({ error: 'ID and status required' }, { status: 400 });

    try {
      await prisma.contact.update({
        where: { id },
        data: { status },
      });
    } catch (err) {
      const idx = memoryContacts.findIndex((c) => c.id === id);
      if (idx !== -1) memoryContacts[idx].status = status;
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update contact' }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 });

    try {
      await prisma.contact.delete({ where: { id } });
    } catch (err) {
      memoryContacts = memoryContacts.filter((c) => c.id !== id);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete contact' }, { status: 500 });
  }
}
