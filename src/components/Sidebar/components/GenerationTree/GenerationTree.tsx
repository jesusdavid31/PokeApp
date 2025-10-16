/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// MUI
import { Box } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

// Mis componentes
import AccordionSkeleton from '../AccordionSkeleton/AccordionSkeleton';

// HOOKS, STORE Y UTILIDADES
import { usePokemonGenerations } from '../../../../hooks/usePokemonGenerations';
import { usePaginationStore } from '../../../../store/pagination.store';
import { usePokemonGenerationsStore } from '../../../../store/pokemonGenerations.store';

// ESTILOS
import './GenerationTree.scss';

const GenerationTree = () => {

    // HOOK DE GENERACIONES DE POKEMON
    const { 
        loading,
        fetchGenerations
    } = usePokemonGenerations();

    const navigate = useNavigate();

    // STORE
    const { generations } = usePokemonGenerationsStore();
    const { setPage } = usePaginationStore();

    const [expanded, setExpanded] = useState<string | false>(false);

    const handleAccordionChange = (panel: string) => (_: any, isExpanded: boolean) => {
        setExpanded(isExpanded ? panel : false); // solo uno abierto
        if (isExpanded) {
            console.log(panel);
            handleGenerationSelect(panel);
        }
    };

    const handleGenerationSelect = (genName: string) => {
        // Resetea la paginación al cambiar de generación
        setPage(1);
        // Navega a la página de la generación seleccionada
        navigate(`/${genName}`);
    }

    useEffect(() => {
        fetchGenerations();
    }, []);

    return (
        <Box sx={{ width: '100%', marginBottom: 10 }} className="generation-tree">
            {loading ? (
                <AccordionSkeleton />
            ): (
                <>
                    {generations.map((gen) => (
                        <Accordion 
                            key={gen.id} 
                            className='generation-accordion'
                            expanded={expanded === gen.name}
                            onChange={handleAccordionChange(gen.name)}
                        >
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon sx={{ color: '#fff' }} />}
                                aria-controls={`panel${gen.id}-content`}
                                id={`panel${gen.id}-header`}
                            >
                                <Typography component="span" sx={{ color: '#fff' }}>Generación {gen.id}</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Box className="pokemon-list">
                                    {gen.pokemon.map((pokemon, index) => (
                                        <Box key={`pokemon-${pokemon.name}-${index}`} 
                                            sx={{ 
                                                mb: 1, 
                                                cursor: 'pointer',
                                            }}
                                        >
                                            <Typography sx={{ color: '#fff' }}>{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</Typography> 
                                        </Box>
                                    ))}
                                </Box>
                            </AccordionDetails>
                        </Accordion>
                    ))}
                </>
            )}
        </Box>
    );

}

export default GenerationTree