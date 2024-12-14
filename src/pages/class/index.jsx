import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { Link } from "react-router-dom";
import { Box } from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";

// const classRooms = [
//   {
//     id: "1",
//     name: "Lớp Toán 10A",
//     description:
//       "Lớp học dành cho học sinh lớp 10, tập trung vào các kiến thức cơ bản về đại số và hình học.",
//   },
//   {
//     id: "2",
//     name: "Lớp Văn 11B",
//     description:
//       "Lớp học dành cho học sinh lớp 11, chú trọng vào phân tích tác phẩm văn học và viết luận.",
//   },
//   {
//     id: "3",
//     name: "Lớp Lý 12C",
//     description:
//       "Lớp học dành cho học sinh lớp 12, bao gồm các chủ đề như cơ học và điện từ học.",
//   },
//   {
//     id: "4",
//     name: "Lớp Hóa 10D",
//     description:
//       "Lớp học dành cho học sinh lớp 10, khám phá các khái niệm cơ bản trong hóa học.",
//   },
//   {
//     id: "5",
//     name: "Lớp Tiếng Anh 11E",
//     description:
//       "Lớp học dành cho học sinh lớp 11, tập trung vào giao tiếp và ngữ pháp tiếng Anh.",
//   },
// ];

const columns = [
  { id: "id", label: "ID", minWidth: 50 },
  {
    id: "name",
    label: "Name",
    minWidth: 170,
    align: "left",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "description",
    label: "Description",
    minWidth: 170,
    align: "left",
    format: (value) => value.toLocaleString("en-US"),
  },
];

function createData(id, name, description) {
  return { id, name, description };
}

const handleClose = () => {
  setOpen(false);
};
const handleOpen = () => {
  setOpen(true);
};

const rows = [
  createData(
    "1",
    "Lớp Toán 10A",
    "Lớp học dành cho học sinh lớp 10, tập trung vào các kiến thức cơ bản về đại số và hình học."
  ),
  createData(
    "2",
    "Lớp Văn 11B",
    "Lớp học dành cho học sinh lớp 11, chú trọng vào phân tích tác phẩm văn học và viết luận."
  ),
  createData(
    "3",
    "Lớp Lý 12C",
    "Lớp học dành cho học sinh lớp 12, bao gồm các chủ đề như cơ học và điện từ học."
  ),
  createData(
    "4",
    "Lớp Hóa 10D",
    "Lớp học dành cho học sinh lớp 10, khám phá các khái niệm cơ bản trong hóa học."
  ),
  createData(
    "5",
    "Lớp Tiếng Anh 11E",
    "Lớp học dành cho học sinh lớp 11, tập trung vào giao tiếp và ngữ pháp tiếng Anh."
  ),
];

const ClassPage = () => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [open, setOpen] = React.useState(false);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Box>
      <Button onClick={handleOpen}>them moi</Button>
      <Backdrop
        sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
        open={open}
        onClick={handleClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, key) => {
                  return (
                    <TableRow key={key}>
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            <Link to={"/user/class-room/" + row.id}>
                              {value}
                            </Link>
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
};

export default ClassPage;
