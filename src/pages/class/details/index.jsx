import { Container } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import { Link } from "react-router-dom";

const classRoom = {
  id: "1",
  name: "L��p Toán 10A",
  description: "aaaaaa",
  teacher: "Teacher 1",
  students: [
    { id: "1", name: "Student 1" },
    { id: "2", name: "Student 2" },
    //...
  ],
  subjects: ["Toán", "Văn", "Sử"],
  //...
  // more properties...
};
const ClassDetail = () => {
  return (
    <Container>
      <div id="class-header" className="flex justify-start items-center pb-8">
        {/* logo class */}
        <Stack direction="row" spacing={2}>
          <Avatar sx={{ height: 200, width: 200 }}>{classRoom.name}</Avatar>
        </Stack>
        {/* class detail */}
        <div id="class-details" className="px-8">
          <p className="p-4">Class ID: {classRoom.id}</p>
          <p className="p-4">Class Name: {classRoom.name}</p>
          <p className="p-4">Class Description: {classRoom.description}</p>
          <p className="p-4">Teacher: {classRoom.teacher}</p>
        </div>
      </div>
      <div>
        <Link>
          <p className="py-2">De tai 1</p>
        </Link>
        <Link>
          <p className="py-2">De tai 1</p>
        </Link>
        <Link>
          <p className="py-2">De tai 1</p>
        </Link>
      </div>
    </Container>
  );
};

export default ClassDetail;
