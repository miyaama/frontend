import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import clsx from "clsx";

import { columns } from "../data";

export const EnhancedTableBody = ({
  users,
  orderBy,
  order,
  page,
  rowsPerPage,
}) => {
  function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }

  function getComparator(order, orderBy) {
    return order === "desc"
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }

  return (
    <TableBody>
      {users
        .slice()
        .sort(getComparator(order, orderBy))
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        .map((user, index) => {
          return (
            <TableRow hover role="checkbox" tabIndex={-1} key={user.key}>
              {columns.map((column) => {
                const isUserColumn = column.id === "user";
                const isMonthlyColumn = column.id === "monthly";

                const value = user[column.id];
                return (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    sortDirection={orderBy === user.id ? order : false}
                    className={clsx(
                      (isUserColumn || isMonthlyColumn) && "sticky",
                      isUserColumn && "sticky-left",
                      isMonthlyColumn && "sticky-right"
                    )}
                  >
                    {value}
                  </TableCell>
                );
              })}
            </TableRow>
          );
        })}
    </TableBody>
  );
};
