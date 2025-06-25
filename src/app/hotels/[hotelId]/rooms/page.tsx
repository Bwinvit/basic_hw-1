import RoomsPageClient from './RoomsPageClient'

interface Params {
  params: { hotelId: string }
}

export default async function RoomsPage({ params }: Params) {
  return <RoomsPageClient hotelId={params.hotelId} />
}
