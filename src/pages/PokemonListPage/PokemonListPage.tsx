/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, type JSX } from 'react';

// MUI
import {
    Box,
    Grid,
    Typography
} from '@mui/material';

// Mis componentes
import DynamicTable from '../../components/DynamicTable/DynamicTable';

// HOOKS, STORE Y UTILIDADES
import { usePokemons } from './hooks/usePokemons';
import { usePaginationStore } from '../../store/usePaginationStore';

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
];

const PokemonListPage = () => {

    // HOOK DE POKEMONS
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
                        <Box sx={{ display: 'flex', gap: '5px' }} className="circleBg">
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
        <Box className='pokemonListPage'>
            <Grid container spacing={3}>
                <Grid size={{ xs: 12, md: 12, lg: 12 }}> 
                    <Box className='pageTitle'>
                        <Box className='titleContainer'>
                            <Box className="pokeball"></Box>
                            <h1 className="title">
                                Pokémon <span className="subtitle">PokeApp</span>
                            </h1>
                        </Box>
                        <Box className='pruebaCs3'>
                            <Typography variant='h5'>Prueba cs3</Typography>
                        </Box>
                    </Box>
                    <Box className='tableContainer'>
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