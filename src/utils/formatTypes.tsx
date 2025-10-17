import type { JSX } from 'react';
import { Box } from '@mui/material';

import { 
    FaLeaf, 
    FaFire, 
    FaTint, 
    FaBug, 
    FaSkullCrossbones, 
    FaWind, 
    FaBolt, 
    FaBrain, 
    FaMountain, 
    FaGlobe, 
    FaStar, 
    FaSnowflake, 
    FaDragon, 
    FaMoon, 
    FaGhost, 
    FaFistRaised,
    FaCircle,
    FaCog
} from 'react-icons/fa';

export const formatTypes = (types: string) => {
    const typeLabels: Record<string, string> = {
        grass: 'Planta',
        fire: 'Fuego',
        water: 'Agua',
        bug: 'Bicho',
        poison: 'Veneno',
        flying: 'Volador',
        electric: 'Eléctrico',
        psychic: 'Psíquico',
        rock: 'Roca',
        ground: 'Tierra',
        fairy: 'Hada',
        ice: 'Hielo',
        dragon: 'Dragón',
        dark: 'Oscuro',
        ghost: 'Fantasma',
        fighting: 'Lucha',
        steel: 'Acero',
        normal: 'Normal'
    };

    const typeIcons: Record<string, JSX.Element> = {
        grass: <FaLeaf />,
        fire: <FaFire />,
        water: <FaTint />,
        bug: <FaBug />,
        poison: <FaSkullCrossbones />,
        flying: <FaWind />,
        electric: <FaBolt />,
        psychic: <FaBrain />,
        rock: <FaMountain />,
        ground: <FaGlobe  />,
        fairy: <FaStar />,
        ice: <FaSnowflake />,
        dragon: <FaDragon />,
        dark: <FaMoon />,
        ghost: <FaGhost />,
        fighting: <FaFistRaised />,
        steel: <FaCog />,
        normal: <FaCircle />
    };
    
    const typeStyles: Record<string, string> = {
        grass: '#388e3c',        // Más oscuro que el verde Planta
        fire: '#d84f14',         // Más oscuro que el rojo Fuego
        water: '#005a8c',        // Más oscuro que el azul Agua
        bug: '#4b7f00',          // Más oscuro que el verde Bicho
        poison: '#5d00a3',       // Más oscuro que el morado Veneno
        flying: '#1a73e8',       // Más oscuro que el azul Claro Volador
        electric: '#e65100',     // Más oscuro que el amarillo Eléctrico
        psychic: '#9c2c7e',      // Más oscuro que el morado Claro Psíquico
        rock: '#6e4e2f',         // Más oscuro que el gris Roca
        ground: '#9e7b4f',       // Más oscuro que el marrón Tierra
        fairy: '#c74a7f',        // Más oscuro que el rosa Hada
        ice: '#007f91',          // Más oscuro que el cian Hielo
        dragon: '#3e1e8c',       // Más oscuro que el azul Oscuro Dragón
        dark: '#4e3327',         // Más oscuro que el gris Oscuro
        ghost: '#5e367f',        // Más oscuro que el morado Oscuro Fantasma
        fighting: '#9e251b',     // Más oscuro que el rojo Lucha
        steel: '#6e7090',        // Más oscuro que el gris Claro Acero
        normal: '#666c3d'        // Más oscuro que el gris Normal
    };

    // Dividir los tipos por la barra (/) y eliminar espacios extra
    const typesArray = types.split('/').map(type => type.trim());

    return typesArray.map((t, index) => (
        <Box key={index} className={`type-badge`} style={{ backgroundColor: typeStyles[t] }}>
            {/* Icono al lado del texto */}
            <span style={{ marginRight: '8px', display: 'inline-flex', alignItems: 'center' }}>
                {typeIcons[t]}
            </span>
            {typeLabels[t] || t}
        </Box>
    ));
}