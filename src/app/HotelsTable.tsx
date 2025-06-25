"use client";

import { useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Link from "next/link";
import EditHotelModal from "./EditHotelModal";

export type Hotel = {
  _id: string;
  name: string;
  city: string;
};

interface Props {
  hotels: Hotel[];
  onEditSuccess?: () => void;
}

export default function HotelsTable({ hotels, onEditSuccess }: Props) {
  const [selectedHotel, setSelectedHotel] = useState<Hotel | null>(null);
  const [openEditModal, setOpenEditModal] = useState(false);

  const handleEditClick = (hotel: Hotel) => {
    setSelectedHotel(hotel);
    setOpenEditModal(true);
  };

  const columns: GridColDef[] = [
    { field: "name", headerName: "Name", flex: 1 },
    { field: "city", headerName: "City", flex: 1 },
    {
      field: "actions",
      headerName: "",
      sortable: false,
      width: 120,
      renderCell: (params) => {
        const hotel = params.row as Hotel;
        return (
          <>
            <IconButton
              aria-label="edit"
              onClick={() => handleEditClick(hotel)}
            >
              <EditIcon />
            </IconButton>
            <IconButton
              aria-label="rooms"
              component={Link}
              href={`/hotels/${hotel._id}/rooms`}
            >
              <ArrowForwardIcon />
            </IconButton>
          </>
        );
      },
    },
  ];

  const rows = hotels.map((hotel) => ({ id: hotel._id, ...hotel }));

  const handleClose = () => setOpenEditModal(false);

  const handleSuccess = () => {
    onEditSuccess?.();
  };

  return (
    <>
      <DataGrid rows={rows} columns={columns} autoHeight />
      {selectedHotel && (
        <EditHotelModal
          hotel={selectedHotel}
          open={openEditModal}
          onClose={handleClose}
          onSuccess={handleSuccess}
        />
      )}
    </>
  );
}
