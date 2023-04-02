// https://www.material-react-table.com/docs/examples/advanced

import React, { useMemo } from "react";
import MaterialReactTable from "material-react-table";
import {
  Box,
  Button,
  ListItemIcon,
  MenuItem,
  Typography,
  TextField,
} from "@mui/material";

const exampleData = [
  {
    id: "myid1",
    name: "Leanne Graham",
    avatar: "https://i.pravatar.cc/300",
    answered: 2,
    created: 1,
  },
  {
    id: "myid2",
    name: "myname2",
    avatar: "https://i.pravatar.cc/301",
    answered: 2,
    created: 4,
  },
  {
    id: "myid3",
    name: "myname3",
    avatar: "https://i.pravatar.cc/302",
    answered: 5,
    created: 3,
  },
];

const Leaderboard = () => {
  //column definitions - strongly typed if you are using TypeScript (optional, but recommended)
  const columns = useMemo(
    () => [
      {
        accessorKey: "id", //simple recommended way to define a column
        header: "ID",
        muiTableHeadCellProps: { sx: { color: "green" } }, //custom props
      },
      {
        accessorKey: "name", //simple recommended way to define a column
        header: "Name",
        muiTableHeadCellProps: { sx: { color: "green" } }, //custom props
        Cell: ({ renderedCellValue, row }) => (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "1rem",
            }}
          >
            <img
              alt="avatar"
              height={30}
              src={row.original.avatar}
              loading="lazy"
              style={{ borderRadius: "50%" }}
            />
            {/* using renderedCellValue instead of cell.getValue() preserves filter match highlighting */}
            <span>{renderedCellValue}</span>
          </Box>
        ),
      },
      {
        accessorKey: "answered", //simple recommended way to define a column
        header: "Answered",
        muiTableHeadCellProps: { sx: { color: "green" } }, //custom props
      },
      {
        accessorKey: "created", //simple recommended way to define a column
        header: "Created",
        muiTableHeadCellProps: { sx: { color: "green" } }, //custom props
      },
    ],
    []
  );

  return (
    <MaterialReactTable
      columns={columns}
      data={exampleData}
      enableColumnOrdering
      enableGlobalFilter={false} //turn off a feature
    />
  );
};

export default Leaderboard;
