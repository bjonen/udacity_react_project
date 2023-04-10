// https://www.material-react-table.com/docs/examples/advanced

// Internal state: data
// External state:
// * users
// * questions. Need utility function to convert questions to "answered" and "created" by user
// * authedUser is not needed

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
import Switch from "@mui/material/Switch";
import { useEffect } from "react";
import { useWhatChanged } from "@simbathesailor/use-what-changed";

const data1 = [
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

const data2 = [
  {
    id: "myid1",
    name: "Leanne Graham_b",
    avatar: "https://i.pravatar.cc/300",
    answered: 2,
    created: 1,
  },
  {
    id: "myid2",
    name: "myname2_b",
    avatar: "https://i.pravatar.cc/301",
    answered: 2,
    created: 4,
  },
  {
    id: "myid3",
    name: "myname3_b",
    avatar: "https://i.pravatar.cc/302",
    answered: 5,
    created: 3,
  },
];

export function _getData(switchData) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(!switchData ? data1 : data2), 1000);
  });
}

const Leaderboard = () => {
  //column definitions - strongly typed if you are using TypeScript (optional, but recommended)
  const [data, setData] = React.useState(data1);
  const [switchData, setSwitchData] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  //if you want to avoid useEffect, look at the React Query example instead
  useEffect(() => {
    setIsLoading(true);
    _getData(switchData).then((data) => {
      setData(data);
      setIsLoading(false);
    });
  }, [switchData]);

  useEffect(() => {
    console.log("COMPONENT MOUNTED");
    return () => {
      console.log("COMPONENT UNMOUNTED");
    };
  }, []);

  let deps = [data, switchData, isLoading];
  useWhatChanged(deps, "a, b, c");
  useEffect(() => {
    console.log("COMPONENT UPDATES");
    return () => {
      console.log("COMPONENT UPDATE COMPLETE");
    };
  }, deps);

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
    <div>
      <Switch
        onChange={(e, c) => {
          return setSwitchData(c);
        }}
      />
      <MaterialReactTable
        columns={columns}
        data={data}
        enableColumnOrdering
        enableGlobalFilter={false} //turn off a feature
        state={{ switchData, isLoading }}
      />
    </div>
  );
};

export default Leaderboard;
