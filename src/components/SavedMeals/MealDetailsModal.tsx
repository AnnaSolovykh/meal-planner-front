import { Article } from "@mui/icons-material";
import CloseIcon from "@mui/icons-material/Close";
import { Box, IconButton, Link, Modal, Paper, Typography } from "@mui/material";
import { SavedMealType } from "../../utils/types";

type MealDetailsModalType = {
    meal: SavedMealType, 
    onDetailsClick: () => void,  
    onDetailesClose: () => void, 
    isDetailsModalOpen: boolean
}

const MealDetailsModal = ({ meal, onDetailsClick, onDetailesClose, isDetailsModalOpen }: MealDetailsModalType) => {
    return (
        <Box sx={{ position: 'relative' }}>
            <IconButton
                aria-label='details'
                color="primary"
                onClick={onDetailsClick}
                sx={{
                    width: 46,
                    height: 46,
                }}
            >
                <Article sx={{ width: 31, height: 31 }} />
            </IconButton>
            <Modal
                open={isDetailsModalOpen}
                onClose={onDetailesClose}
                aria-labelledby="details-modal"
                aria-describedby="details-modal-description"
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >   
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)'
                    }}
                >
                    <Paper                           
                        sx={{
                            width: '500px', 
                            height: 'fit-content',
                            padding: '40px', 
                        }}>
                        <Typography variant="h6">Recipe Details</Typography>
                        <Typography variant="body1">Calories: {meal.calories} kkal per 100 gram</Typography>
                        <Typography variant="body1">Ingredients:</Typography>
                            <ul>
                            {meal.ingredients && meal.ingredients.map((ingredient, id) => (
                                <li key={id}>
                                    <Typography component="span">{ingredient}</Typography>
                                </li>
                            ))}
                            </ul>
                        <Typography variant="body1">Link: <Link href={meal.link} target="_blank">{meal.link}</Link></Typography>
                        <IconButton
                            aria-label="close"
                            onClick={onDetailesClose}
                            sx={{ position: "absolute", right: 8, top: 8, color: "grey" }}
                        >
                            <CloseIcon />
                        </IconButton>
                    </Paper>
                </Box>
            </Modal>
        </Box>
    )

}

export default MealDetailsModal;