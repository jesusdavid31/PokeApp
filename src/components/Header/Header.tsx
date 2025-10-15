
// MUI
import {
    Box,
    Typography
} from "@mui/material";

// Icons
import { HiOutlineBars3 } from "react-icons/hi2";

// ESTILOS
import './Header.scss';

interface HeaderProps {
    openMenu: boolean;
    setOpenMenu: (open: boolean) => void;
}

const Header = ({ openMenu, setOpenMenu }: HeaderProps) => {

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
                            <HiOutlineBars3 onClick={() => setOpenMenu(!openMenu)} color="white" />
                        </Box>
                    </Box>
                </Box>
            </nav>
        </>
    );
};

export default Header;