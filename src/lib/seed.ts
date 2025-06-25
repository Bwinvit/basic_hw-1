import { getDb } from './mongodb'
import { ObjectId } from 'mongodb'

export async function seed(): Promise<void> {
  const db = await getDb()
  const hotelsCollection = db.collection('hotels')
  const roomsCollection = db.collection('rooms')

  const hotelCount = await hotelsCollection.countDocuments()
  if (hotelCount === 0) {
    const hotels = Array.from({ length: 5 }).map((_, i) => ({
      _id: new ObjectId(),
      name: `Hotel ${i + 1}`,
      city: `City ${i + 1}`,
    }))

    await hotelsCollection.insertMany(hotels)

    for (const hotel of hotels) {
      const roomCount = 2 + Math.floor(Math.random() * 2) // 2–3 rooms
      const rooms = Array.from({ length: roomCount }).map((_, i) => ({
        hotelId: hotel._id,
        name: `Room ${i + 1}`,
        type: i % 2 === 0 ? 'single' : 'double',
        capacity: i % 2 === 0 ? 2 : 4,
      }))
      await roomsCollection.insertMany(rooms)
    }
    console.log('Seeding completed.')
  }
}

export default seed
