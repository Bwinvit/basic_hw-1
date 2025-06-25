import { NextResponse } from 'next/server'
import { ObjectId } from 'mongodb'
import { getDb } from '@/lib/mongodb'

export async function DELETE(
  request: Request,
  { params }: { params: { hotelId: string; roomId: string } }
) {
  try {
    const db = await getDb()
    await db.collection('rooms').deleteOne({ _id: new ObjectId(params.roomId) })
    return new NextResponse(null, { status: 204 })
  } catch (error) {
    console.error('Error deleting room:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
