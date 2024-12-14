import { Avatar, Button, Container } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import InputBase from "@mui/material/InputBase";
import FormControl from "@mui/material/FormControl";
import { alpha, styled } from "@mui/material/styles";
import { useState } from "react";

const unShowField = ["is_active", "is_identity", "avatar_url"];

const BootstrapInput = styled(InputBase)(({ theme }) => ({
  "label + &": {
    marginTop: theme.spacing(3),
  },
  "& .MuiInputBase-input": {
    borderRadius: 4,
    position: "relative",
    backgroundColor: "#F3F6F9",
    border: "1px solid",
    borderColor: "#E0E3E7",
    fontSize: 16,
    width: "auto",
    padding: "10px 12px",
    transition: theme.transitions.create([
      "border-color",
      "background-color",
      "box-shadow",
    ]),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    "&:focus": {
      boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
      borderColor: theme.palette.primary.main,
    },
    ...theme.applyStyles("dark", {
      backgroundColor: "#1A2027",
      borderColor: "#2D3843",
    }),
  },
}));
const ProfilePage = () => {
  const [editMode, setEditMode] = useState(false);
  const [user, setUser] = useState({
    id: "1",
    email: "john.doe@example.com",
    password: "Password@123",
    first_name: "John",
    last_name: "Doe",
    dob: "01-01-90",
    address: "123 Đường ABC, Phường XYZ, Quận 1, Thành phố HCM",
    phone: "0901234567",
    avatar_url:
      "https://cellphones.com.vn/sforum/wp-content/uploads/2024/02/anh-avatar-cute-23.jpg",
    is_active: true,
    is_identity: false,
  });

  const handleEdit = () => {
    setEditMode(!editMode);
  };

  const handleSubmit = () => {
    console.log(JSON.stringify(user));
    setEditMode(!editMode);
  };

  const handleOnChange = (e) => {
    console.log(e.target.id);
    let cloneUser = user;
    const { id, value } = e.target;
    cloneUser[id] = value;
    setInterval(setUser(cloneUser) && console.log(user), 1000);
  };

  return (
    <Container className="flex justify-between items-center flex-col w-full py-16">
      <div className="w-full flex justify-between items-center py-8">
        <Avatar
          src={user.avatar_url}
          sx={{ width: 200, height: 200, border: 5 }}
        />
      </div>
      <div className="w-full">
        {Object.keys(user).map((key, index) =>
          unShowField.includes(index) ||
          key === "password" ||
          key === "id" ? null : (
            <div key={key} className="py-2 min-w-full">
              <FormControl
                variant="standard"
                id="form-data"
                className="min-w-full"
              >
                <InputLabel shrink htmlFor={key}>
                  {key}
                </InputLabel>
                <BootstrapInput
                  defaultValue={user[key]}
                  id={key}
                  onChange={handleOnChange}
                  disabled={!editMode}
                />
              </FormControl>
            </div>
          )
        )}
      </div>
      <div className="w-full flex justify-center items-center py-8 gap-2">
        <Button
          variant="contained"
          color="primary"
          disabled={editMode}
          onClick={handleEdit}
        >
          Edit Profile
        </Button>
        {!editMode ? null : (
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Save
          </Button>
        )}
      </div>
    </Container>
  );
};

export default ProfilePage;
