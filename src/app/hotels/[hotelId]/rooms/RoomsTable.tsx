"use client";

import { useEffect, useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

export type Room = {
  _id: string;
  name: string;
  type: string;
  capacity: number;
};

interface Props {
  hotelId: string;
  refreshTrigger?: unknown;
  onDeleteSuccess: () => void;
  search?: string;
}

export default function RoomsTable({
  hotelId,
  refreshTrigger,
  onDeleteSuccess,
  search = "",
}: Props) {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let ignore = false;

    async function fetchRooms() {
      setLoading(true);
      try {
        const res = await fetch(`/api/hotels/${hotelId}/rooms`);
        const data: Room[] = await res.json();
        if (!ignore) {
          setRooms(data);
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    }

    fetchRooms();

    return () => {
      ignore = true;
    };
  }, [hotelId, refreshTrigger]);

  const handleDelete = async (roomId: string) => {
    await fetch(`/api/hotels/${hotelId}/rooms/${roomId}`, { method: "DELETE" });
    onDeleteSuccess();
  };

  const columns: GridColDef[] = [
    { field: "name", headerName: "Name", flex: 1 },
    { field: "type", headerName: "Type", flex: 1 },
    { field: "capacity", headerName: "Capacity", type: "number", flex: 1 },
    {
      field: "actions",
      headerName: "",
      sortable: false,
      renderCell: (params) => (
        <IconButton
          aria-label="delete"
          color="error"
          onClick={() => handleDelete(params.row.id as string)}
        >
          <DeleteIcon />
        </IconButton>
      ),
      width: 80,
    },
  ];

  const filteredRooms = rooms.filter((room) => {
    const query = search.toLowerCase();
    return (
      room.name.toLowerCase().includes(query) ||
      room.type.toLowerCase().includes(query)
    );
  });

  const rows = filteredRooms.map((room) => ({ id: room._id, ...room }));

  return (
    <DataGrid rows={rows} columns={columns} loading={loading} autoHeight />
  );
}
