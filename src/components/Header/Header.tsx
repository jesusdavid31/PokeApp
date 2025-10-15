import { useState } from "react";

// Components
import {
    Box,
    Typography,
    Drawer,
} from "@mui/material";

// Icons
import { HiOutlineBars3 } from "react-icons/hi2";

// ESTILOS
import './Header.scss';

const Header = () => {

    const [openMenu, setOpenMenu] = useState(false);

    return (
        <>
            <nav className="header-container">
                <Box className='header-logo-container'>
                    <Box className='title-container'>
                        <Box className="pokeball"></Box>
                        <h1 className="title">
                            Pokémon <span className="subtitle">PokeApp</span>
                        </h1>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <Box className='prueba-cs3'>
                            <Typography variant='h5'>Prueba cs3</Typography>
                        </Box>
                        <Box className="header-menu-container">
                            <HiOutlineBars3 onClick={() => setOpenMenu(true)} />
                        </Box>
                    </Box>
                </Box>
                <Drawer open={openMenu} onClose={() => setOpenMenu(false)} anchor="left">
                    <Box
                        sx={{ width: 250, backgroundColor: "#C9511D" }}
                        role="presentation"
                        onClick={() => setOpenMenu(false)}
                        onKeyDown={() => setOpenMenu(false)}
                    >
                        Hola Mundo
                    </Box>
                </Drawer>
            </nav>
        </>
    );
};

export default Header;