'use client'

import { useState } from 'react'
import { Button, TextField } from '@mui/material'
import AddRoomModal from './AddRoomModal'
import RoomsTable from './RoomsTable'

interface Props {
  hotelId: string
}

export default function RoomsPageClient({ hotelId }: Props) {
  const [open, setOpen] = useState(false)
  const [refreshTrigger, setRefreshTrigger] = useState(0)
  const [search, setSearch] = useState('')

  const handleSuccess = () => {
    setRefreshTrigger((prev) => prev + 1)
  }

  return (
    <div style={{ padding: '16px' }}>
      <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
        <Button variant="contained" onClick={() => setOpen(true)}>
          Add Room
        </Button>
        <TextField
          label="Search rooms"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          size="small"
        />
      </div>
      <AddRoomModal
        hotelId={hotelId}
        open={open}
        onClose={() => setOpen(false)}
        onSuccess={handleSuccess}
      />
      <div style={{ marginTop: '16px' }}>
        <RoomsTable
          hotelId={hotelId}
          refreshTrigger={refreshTrigger}
          onDeleteSuccess={handleSuccess}
          search={search}
        />
      </div>
    </div>
  )
}
