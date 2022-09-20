import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableSortLabel from "@mui/material/TableSortLabel";
import { visuallyHidden } from "@mui/utils";
import Box from "@mui/material/Box";
import clsx from "clsx";

import { columns } from "../data";

export const EnhancedTableHead = ({
  order,
  orderBy,
  rowCount,
  onRequestSort,
}) => {
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };
  return (
    <TableHead>
      <TableRow>
        {columns.map((column) => {
          const isUserColumn = column.id === "user";
          const isMonthlyColumn = column.id === "monthly";
          return (
            <TableCell
              key={column.id}
              align={column.align}
              style={{
                minWidth: column.minWidth,
              }}
              className={clsx(
                (isUserColumn || isMonthlyColumn) && "sticky",
                isUserColumn && "sticky-left",
                isMonthlyColumn && "sticky-right"
              )}
            >
              <TableSortLabel
                active={orderBy === column.id}
                direction={orderBy === column.id ? order : "asc"}
                onClick={createSortHandler(column.id)}
              >
                {column.label}
                {orderBy === column.id ? (
                  <Box component="span" sx={visuallyHidden}>
                    {order === "desc"
                      ? "sorted descending"
                      : "sorted ascending"}
                  </Box>
                ) : null}
              </TableSortLabel>
            </TableCell>
          );
        })}
      </TableRow>
    </TableHead>
  );
};
