import { NextResponse } from 'next/server'
import { ObjectId } from 'mongodb'
import { getDb } from '@/lib/mongodb'

export async function GET(
  request: Request,
  { params }: { params: { hotelId: string } }
) {
  try {
    const db = await getDb()
    const rooms = await db
      .collection('rooms')
      .find({ hotelId: new ObjectId(params.hotelId) })
      .toArray()
    return NextResponse.json(rooms)
  } catch (error) {
    console.error('Error fetching rooms:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

export async function POST(
  request: Request,
  { params }: { params: { hotelId: string } }
) {
  try {
    const { name, type, capacity } = await request.json()

    if (
      typeof name !== 'string' ||
      typeof type !== 'string' ||
      typeof capacity !== 'number'
    ) {
      return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
    }

    const db = await getDb()
    const room = {
      _id: new ObjectId(),
      hotelId: new ObjectId(params.hotelId),
      name,
      type,
      capacity,
    }
    await db.collection('rooms').insertOne(room)
    return NextResponse.json(room, { status: 201 })
  } catch (error) {
    console.error('Error creating room:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
