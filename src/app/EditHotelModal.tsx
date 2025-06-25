"use client"

import { useState, useEffect } from "react"
import { z } from "zod"
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Stack,
} from "@mui/material"

const hotelSchema = z.object({
  name: z.string().min(1),
  city: z.string().min(1),
})

type Props = {
  hotel: { _id: string; name: string; city: string }
  open: boolean
  onClose: () => void
  onSuccess: () => void
}

export default function EditHotelModal({ hotel, open, onClose, onSuccess }: Props) {
  const [name, setName] = useState(hotel.name)
  const [city, setCity] = useState(hotel.city)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (open) {
      setName(hotel.name)
      setCity(hotel.city)
      setError(null)
    }
  }, [open, hotel])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)

    const result = hotelSchema.safeParse({ name, city })
    if (!result.success) {
      setError("Please provide valid values.")
      return
    }

    const res = await fetch(`/api/hotels/${hotel._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(result.data),
    })

    if (res.ok) {
      onSuccess()
      onClose()
    } else {
      const data = await res.json().catch(() => null)
      setError(data?.error || "Failed to update hotel.")
    }
  }

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit Hotel</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 1, minWidth: 300 }}>
            <TextField
              label="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              fullWidth
            />
            <TextField
              label="City"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
              fullWidth
            />
            {error && (
              <p style={{ color: "red" }} data-testid="hotel-error">
                {error}
              </p>
            )}
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="contained">
            Save
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}
