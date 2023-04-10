// https://www.material-react-table.com/docs/examples/advanced
// https://www.material-react-table.com/docs/guides/async-loading#react-query-source-code

import React, { useMemo } from "react";
import MaterialReactTable from "material-react-table";
import { useGetUsersQuery } from "./questionSlice";
import { useSelector } from "react-redux";
import { Box } from "@mui/material";
import { processGetApis } from "../../app/util.js";

const generateData = (users) => {
  let data = [];
  if (users === undefined) {
    return data;
  }
  Object.keys(users).forEach((id) => {
    const user = users[id];
    if (user.name !== "anonymous") {
      data.push({
        id: user.id,
        name: user.name,
        avatar: user.avatarURL,
        answered: Object.keys(user.answers).length,
        created: user.questions.length,
      });
    }
  });
  data.sort((a, b) =>
    a.answered + a.created > b.answered + b.created ? -1 : 1
  );
  return data;
};

const Leaderboard = () => {
  const { data: users, isLoading } = processGetApis(useGetUsersQuery());
  const newData = generateData(users);
  const authedUser = useSelector((state) => state.authedUser.id);

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
  if (!authedUser || authedUser === "anonymous") {
    return (
      <div style={{ padding: "10px" }}>
        Please log in using dropdown on the top right
      </div>
    );
  }
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
