'use client'

import { useEffect, useState } from 'react'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { IconButton } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import EditHotelModal from '../EditHotelModal'

export type Hotel = {
  _id: string
  name: string
  city: string
}

export default function HotelsPage() {
  const [hotels, setHotels] = useState<Hotel[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [selectedHotel, setSelectedHotel] = useState<Hotel | null>(null)
  const [openEditModal, setOpenEditModal] = useState(false)

  const fetchHotels = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/hotels')
      const data: Hotel[] = await res.json()
      setHotels(data)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchHotels()
  }, [])

  const handleEditClick = (hotel: Hotel) => {
    setSelectedHotel(hotel)
    setOpenEditModal(true)
  }

  const columns: GridColDef[] = [
    { field: 'name', headerName: 'Name', flex: 1 },
    { field: 'city', headerName: 'City', flex: 1 },
    {
      field: 'actions',
      headerName: '',
      sortable: false,
      width: 80,
      renderCell: (params) => (
        <IconButton aria-label="edit" onClick={() => handleEditClick(params.row as Hotel)}>
          <EditIcon />
        </IconButton>
      ),
    },
  ]

  const rows = hotels.map((h) => ({ id: h._id, ...h }))

  return (
    <div style={{ padding: '16px' }}>
      <h1 style={{ marginBottom: '16px' }}>Hotels</h1>
      <DataGrid rows={rows} columns={columns} autoHeight loading={loading} />
      {selectedHotel && (
        <EditHotelModal
          hotel={selectedHotel}
          open={openEditModal}
          onClose={() => setOpenEditModal(false)}
          onSuccess={fetchHotels}
        />
      )}
    </div>
  )
}
