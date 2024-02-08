import { Box } from "@mui/material";
import Login from "./Login";

const LoginComponent = () => {
    return (
        <Box
            display='flex'
            flexDirection='column'
            alignItems='center'
            justifyContent='center'
            sx={{ width: '100vw', height: '100vh', backgroundColor: '#f5f5f5' }}
        >
            <Login/>
        </Box>
    );
};

export default LoginComponent;
