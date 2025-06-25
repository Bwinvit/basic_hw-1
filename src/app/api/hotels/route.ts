import { NextResponse } from 'next/server'
import { ObjectId } from 'mongodb'
import { getDb } from '@/lib/mongodb'

export async function GET() {
  try {
    const db = await getDb()
    const hotels = await db.collection('hotels').find().toArray()
    return NextResponse.json(hotels)
  } catch (error) {
    console.error('Error fetching hotels:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const { name, city } = await request.json()

    if (typeof name !== 'string' || typeof city !== 'string') {
      return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
    }

    const db = await getDb()
    const hotel = { _id: new ObjectId(), name, city }
    await db.collection('hotels').insertOne(hotel)
    return NextResponse.json(hotel, { status: 201 })
  } catch (error) {
    console.error('Error creating hotel:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
