"use client"

import { useState } from "react"
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

const roomSchema = z.object({
  name: z.string().min(1),
  type: z.string().min(1),
  capacity: z.preprocess((val) => Number(val), z.number().int().positive()),
})

type Props = {
  hotelId: string
  open: boolean
  onClose: () => void
  onSuccess: () => void
}

export default function AddRoomModal({
  hotelId,
  open,
  onClose,
  onSuccess,
}: Props) {
  const [name, setName] = useState("")
  const [type, setType] = useState("")
  const [capacity, setCapacity] = useState("")
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)

    const result = roomSchema.safeParse({ name, type, capacity })
    if (!result.success) {
      setError("Please provide valid values.")
      return
    }

    await fetch(`/api/hotels/${hotelId}/rooms`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(result.data),
    })

    onSuccess()
    onClose()

    setName("")
    setType("")
    setCapacity("")
  }

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add Room</DialogTitle>
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
              label="Type"
              value={type}
              onChange={(e) => setType(e.target.value)}
              required
              fullWidth
            />
            <TextField
              label="Capacity"
              type="number"
              value={capacity}
              onChange={(e) => setCapacity(e.target.value)}
              required
              fullWidth
              inputProps={{ min: 1 }}
            />
            {error && (
              <p style={{ color: "red" }} data-testid="room-error">
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
