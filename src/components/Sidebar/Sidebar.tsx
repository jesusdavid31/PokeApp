
// Mui
import {
    Box,
    // Typography,
    Drawer,
    useMediaQuery 
} from "@mui/material";

// Mis componentes
import GenerationTree from "./components/GenerationTree/GenerationTree";

import { useTheme } from "@mui/material/styles";

// ESTILOS
import './Sidebar.scss';

interface SidebarProps {
    openMenu: boolean;
    setOpenMenu: (open: boolean) => void;
}

const Sidebar = ({ openMenu, setOpenMenu }: SidebarProps) => {

    const theme = useTheme();
    // Detecta si es un dispositivo mediano o más pequeño (md = 900px por defecto)
    const isMediumOrSmallScreen = useMediaQuery(theme.breakpoints.down("md")); // 👈 detecta pantallas

    // Si es pantalla grande: Drawer permanente; si no: temporal
    const drawerVariant = isMediumOrSmallScreen ? "temporary" : "permanent";

    // Si es una pantalla mediana o más pequeña, usa un Drawer temporal
    // Si es una pantalla grande, muestra el sidebar fijo
    return (
        <Box 
            className="sidebar"
            sx={{
                width: !isMediumOrSmallScreen ? 300 : "auto",
                flexShrink: 0,
            }}
        >
            <Drawer
                variant={drawerVariant}
                open={isMediumOrSmallScreen ? openMenu : true}
                onClose={() => {
                    if (isMediumOrSmallScreen) {
                        setOpenMenu(false);
                    }
                }}
                anchor="left"
                ModalProps={{ keepMounted: true }}
                sx={{
                    // Asegura que el Drawer esté debajo del Header en pantallas pequeñas
                    zIndex: isMediumOrSmallScreen
                        ? (theme) => theme.zIndex.appBar - 1
                        : "auto",
                    "& .MuiDrawer-paper": {
                        width: 300,
                        top: 120,
                        height: `calc(100vh - 120px)`,
                        background: "linear-gradient(90deg, #7A0E0E  0%, #2A379B 70%, #2A379B 100%)",
                        borderRight: "1px solid rgba(255, 255, 255, 0.2)",
                        // Estilos para scroll bonito en navegadores Webkit (Chrome, Edge, Safari)
                        "&::-webkit-scrollbar": {
                            width: "6px",
                            background: "#004A94",
                            borderRadius: "8px",
                        },
                        "&::-webkit-scrollbar-thumb": {
                            background: "#fff",
                            borderRadius: "8px",
                        },
                        "&::-webkit-scrollbar-track": {
                            background: "#004A94",
                            borderRadius: "8px",
                        },
                        // position: isMediumOrSmallScreen ? "fixed" : "static",
                    },
                }}
            >
                <GenerationTree />
            </Drawer>
        </Box>
    );
}

export default Sidebar;