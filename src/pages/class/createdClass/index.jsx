import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import { alpha } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { useState } from "react";


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

const CreatedForm = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        id: "",
        name: "",
        description: ""
    });
    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [id]: value
        }));
    };

    const handleSubmit = () => {
        navigate("/user/class-room", {
            state: formData
        });
    }

    return (
        <div className="flex justify-between items-center flex-col w-full py-16 min-h-screen p-4">
            <FormControl variant="standard" className="min-w-full">
                <div className="text-2xl font-bold text-center">TẠO LỚP HỌC</div>
                <div className="mb-4"></div>
                <FormControl variant="standard" sx={{
                    mb: 2,
                    display: 'flex',
                    alignItems: 'center',
                    width: '100%',
                }}>
                    <InputLabel shrink htmlFor="id">ID</InputLabel>
                    <BootstrapInput
                        id="id"
                        value={formData.id}
                        onChange={handleInputChange}
                        sx={{
                            width: '100%'
                        }}
                    />
                </FormControl>

                <FormControl variant="standard" sx={{ mb: 2 }}>
                    <InputLabel shrink htmlFor="name">Name</InputLabel>
                    <BootstrapInput
                        id="name"
                        value={formData.name}
                        onChange={handleInputChange}
                    />
                </FormControl>

                <FormControl variant="standard" sx={{ mb: 2 }}>
                    <InputLabel shrink htmlFor="description">Description</InputLabel>
                    <BootstrapInput
                        id="description"
                        value={formData.description}
                        onChange={handleInputChange}
                    />
                </FormControl>

                <Stack
                    spacing={2}
                    direction="row"
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        mt: 2
                    }}
                >
                    <Button
                        variant="contained"
                        color="primary"
                        sx={{
                            width: '100%'
                        }}
                        onClick={handleSubmit}
                    >
                        TẠO
                    </Button>
                </Stack>
            </FormControl>
        </div>
    );
};
export default CreatedForm;