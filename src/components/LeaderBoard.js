// https://www.material-react-table.com/docs/examples/advanced

// Internal state: data
// External state:
// * users
// * questions. Need utility function to convert questions to "answered" and "created" by user
// * authedUser is not needed

import React, { useMemo } from "react";
import MaterialReactTable from "material-react-table";
import { useGetUsersQuery } from "../apiSlice";

import { Box } from "@mui/material";

const processGetApis = ({ data, isLoading, isSuccess, isError, error }) => {
  return {
    users: data,
    isLoading,
  };
};

const generateData = (users) => {
  let data = [];
  if (users === undefined) {
    return data;
  }
  Object.keys(users).forEach((id) => {
    const user = users[id];
    data.push({
      id: user.id,
      name: user.name,
      avatar: user.avatarURL,
      answered: Object.keys(user.answers).length,
      created: user.questions.length,
    });
  });
  return data;
};

const Leaderboard = () => {
  const { users, isLoading } = processGetApis(useGetUsersQuery());
  const newData = generateData(users);

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
      <MaterialReactTable
        columns={columns}
        data={newData}
        enableColumnOrdering
        enableGlobalFilter={false} //turn off a feature
        state={{ isLoading }}
      />
    </div>
  );
};

export default Leaderboard;
