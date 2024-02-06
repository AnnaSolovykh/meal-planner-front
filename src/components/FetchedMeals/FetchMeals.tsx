import { Box, Typography } from "@mui/material";

const FetchMeals = () => {
    return (
        <Box display='flex' flexDirection='column' alignItems='center' justifyContent='center' sx={{ width: '100vw', height: '100vh' }}>
            <Typography variant='h3' component='h3'>
            Search for Meals
            </Typography>
        </Box>
    )
}

export default FetchMeals;