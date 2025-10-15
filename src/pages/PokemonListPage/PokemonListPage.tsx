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
import DynamicTable from '../../components/DynamicTable/DynamicTable';
import AnimatedButton from '../../components/AnimatedButton/AnimatedButton';

// HOOKS, STORE Y UTILIDADES
import { usePokemons } from './hooks/usePokemons';
import { usePaginationStore } from '../../store/usePaginationStore.store';

// ESTILOS
import './PokemonListPage.scss';

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

    // HOOK DE POKEMON
    const { 
        loading,
        totalItems,
        pokemons,
        getPokemons
    } = usePokemons();

    const { page, setPage } = usePaginationStore();

    const [tableData, setTableData] = useState<TableData[]>([]);

    const handlePageClick = (_: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
        getPokemons(value);
    };

    const mapPokemons = (data: Pokemon[]) => {
        const result = data.map((item: Pokemon) => ({
            ...item,
            img: (
                <>
                    { item.img ? (
                        <Box sx={{ display: 'flex', gap: '5px' }} className="circle-bg">
                            <img 
                                src={item.img}
                                alt="Product Image"
                                className='tableImages'
                                width="80"
                                height="80"
                                // onClick={() => handleDisplayImage(item.img)}
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
                    <Link to={`/pokemon/${item.name}`} className="animated-button">
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
        getPokemons(page);
    }, [page]);

    useEffect(() => {
        mapPokemons(pokemons);
    }, [loading]);

    return (
        <Box className='pokemon-list-page-container'>
            <Grid container spacing={3}>
                <Grid size={{ xs: 12, md: 12, lg: 12 }}> 
                    <Box className='title-container'>
                        <Typography variant="h4">Lista de Pokémon</Typography>
                    </Box>
                    <Box className='table-container'>
                        <DynamicTable 
                            isLoading={loading}
                            columns={columns}
                            currentData={tableData}
                            actualPage={page}
                            handlePageClick={handlePageClick}
                            totalPages={Math.ceil(totalItems / 10)}
                            itemsPerPage={10}
                            totalItems={totalItems}
                        />
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );

}

export default PokemonListPage;