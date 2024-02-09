import {
    Modal,
    Paper,
    TextField,
    Button,
    IconButton,
    Typography,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useEffect, useState } from "react";
import { SavedMealType } from "../../utils/types";

type EditingModalProps = {
    meal: SavedMealType,
    isModalOpen: boolean,
    onModalClose: () => void,
    onUpdateMeal: Function
};

const EditingModal = ({ meal, isModalOpen, onModalClose, onUpdateMeal }: EditingModalProps )=> {
    const [editedMeal, setEditedMeal] = useState({
        title: "",
        type: "",
    });

    useEffect(() => {
        if (isModalOpen) {
            setEditedMeal(meal);
        }
    }, [isModalOpen, meal]);

    const handleInputChange = (e: { target: { name: string; value: string; }; }) => {
        const { name, value } = e.target;
        setEditedMeal({
            ...editedMeal,
            [name]: value,
        });
    };

    const handleSave = () => {
        onUpdateMeal(meal._id, editedMeal);
        onModalClose();
    };

    return (
        <Modal
        open={isModalOpen}
        onClose={onModalClose}
        aria-labelledby="edit-modal-title"
        aria-describedby="edit-modal-description"
        >
        <Paper
            sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            }}
        >
            <Typography variant="h6" id="edit-modal-title" sx={{ mb: 2 }}>
            Edit Meal
            </Typography>
            <TextField
            label="title"
            name="title"
            value={editedMeal.title}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            />
            <FormControl fullWidth>
            <InputLabel>type</InputLabel> 
            <Select
                label="type"
                name="type"
                value={editedMeal.type}
                onChange={handleInputChange}
            >
                <MenuItem value="breakfast">breakfast</MenuItem>
                <MenuItem value="lunch">lunch</MenuItem>
                <MenuItem value="dinner">dinner</MenuItem>
                <MenuItem value="snack">snack</MenuItem>
            </Select>
            </FormControl>
            <Button
            variant="contained"
            onClick={handleSave}
            >
            Save
            </Button>
            <IconButton
            aria-label="close"
            onClick={onModalClose}
            sx={{ position: "absolute", right: 8, top: 8, color: "grey" }}
            >
                <CloseIcon />
            </IconButton>
        </Paper>
        </Modal>
    );
};

export default EditingModal;
