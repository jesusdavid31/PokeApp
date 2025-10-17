/* eslint-disable react-hooks/exhaustive-deps */

import { useState, useEffect, type JSX } from 'react';
import { Link } from 'react-router-dom';

// MUI
import {
    Box,
    Grid,
    Typography
} from '@mui/material';

// Mis componentes
import SkeletonTable from '../../components/SkeletonTable/SkeletonTable';
import DynamicTable from '../../components/DynamicTable/DynamicTable';
import AnimatedButton from '../../components/AnimatedButton/AnimatedButton';

// HOOKS, STORE Y UTILIDADES
import { usePokemonByGeneration } from './hooks/usePokemonByGeneration';
import { useListPokemonStore } from '../../store/listPokemon.store';
import { usePaginationStore } from '../../store/pagination.store';

// LIBRERIAS DE TERCEROS
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { AnimatePresence, motion } from 'framer-motion';

// ESTILOS
import './PokemonGenerationsPage.scss';
import 'react-lazy-load-image-component/src/effects/blur.css';

interface Pokemon {
    id: string;
    name: string;
    img: string;
    weight: string;
    height: string;
    type: string;
    color: string;
}

interface TableData {
    id: string;
    name: string;
    img: JSX.Element;
    weight: string;
    height: string;
    type: string;
    color: string;
}

const columns = [
    { id: "id", label: "ID" },
    { id: "name", label: "Nombre" },
    { id: "img", label: "Imagen" },
    { id: "weight", label: "Peso" },
    { id: "height", label: "Altura" },
    { id: "type", label: "Tipo" },
    { id: "actions", label: "Acciones" },
];

const PokemonListPage = () => {

    // HOOK DE POKEMON POR GENERACIÓN
    const { generationIdentifier, generation, loadGeneration } = usePokemonByGeneration();

    // STORE
    const { loading, setLoading, pokemon, totalPokemon } = useListPokemonStore();
    const { page, setPage } = usePaginationStore();

    // Estado local para la tabla
    const [tableData, setTableData] = useState<TableData[]>([]);

    const handlePageClick = (_: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
        setLoading(true);
        const timeoutId = setTimeout(() => {
            loadGeneration(value); // Demora la ejecución del fetch 900ms
        }, 900);
        // Función de limpieza: cuando el componente se desmonte o cambien las dependencias
        return () => {
            clearTimeout(timeoutId); // Limpiamos el timeout si el componente se desmonta
        };
    };

    const mapPokemons = (data: Pokemon[]) => {
        const result = data.map((pokemon: Pokemon) => ({
            ...pokemon,
            img: (
                <>
                    { pokemon.img ? (
                        <Box sx={{ display: 'flex', gap: '5px' }} className="circle-bg">
                            <LazyLoadImage
                                src={pokemon.img}
                                alt={`Imagen de ${pokemon.name}`}
                                width="80"
                                height="80"
                                effect="blur"     // Añadimos un blur bonito
                                threshold={150}   // Carga un poco antes de aparecer
                            />
                        </Box>
                    ) : (
                        <Box sx={{ display: 'flex', gap: '5px' }}>
                            Sin imagen
                        </Box>
                    )}
                </>
            ),
            actions: (
                <>
                    <Link to={`/pokemon/${pokemon.name}`} className="animated-button">
                        <AnimatedButton 
                            text='Ver detalles'
                            icon={
                                <path
                                    d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"
                                ></path>
                            }
                        />
                    </Link>
                </>
            )
        }));
        setTableData(result);
    }

    useEffect(() => {
        setLoading(true);
        const timeoutId = setTimeout(() => {
            loadGeneration(page); // Demora la ejecución del fetch 1000ms
        }, 1000);
        // Función de limpieza: cuando el componente se desmonte o cambien las dependencias
        return () => {
            clearTimeout(timeoutId); // Limpiamos el timeout si el componente se desmonta
        };
    }, [generation]);

    useEffect(() => {
        mapPokemons(pokemon);
    }, [loading]);

    return (
        <Box className='pokemon-generations-page-container'>
            <Grid container spacing={3}>
                <Grid size={{ xs: 12, md: 12, lg: 12 }}> 
                    { !loading && (
                        <Box className='title-container'>
                            <Typography variant="h4">Lista de Pokémon de la generación {generationIdentifier}</Typography>
                        </Box>
                    )}
                    <AnimatePresence mode="wait">
                        {loading ? (
                            <motion.div
                                key="skeleton"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.5 }}
                            >
                                <SkeletonTable />
                            </motion.div>
                        ) : (
                            <motion.div
                                key={`table-page-${page}`} // clave única por página
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.5 }}
                            >
                                <Box className='table-container'>
                                    <DynamicTable 
                                        isLoading={loading}
                                        columns={columns}
                                        currentData={tableData}
                                        actualPage={page}
                                        handlePageClick={handlePageClick}
                                        totalPages={Math.ceil(totalPokemon / 10)}
                                        itemsPerPage={10}
                                        totalItems={totalPokemon}
                                    />
                                </Box>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </Grid>
            </Grid>
        </Box>
    );

}

export default PokemonListPage;