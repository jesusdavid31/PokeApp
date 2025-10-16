/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';

// MUI
import { Box } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

// HOOKS, STORE Y UTILIDADES
import { usePokemonGenerationsStore } from '../../../../store/pokemonGenerations.store';
import { usePokemonGenerations } from '../../../../hooks/usePokemonGenerations';

// ESTILOS
import './GenerationTree.scss';

const GenerationTree = () => {

    // HOOK DE GENERACIONES DE POKEMON
    const { 
        loading,
        fetchGenerations
    } = usePokemonGenerations();

    // STORE
    const { generations } = usePokemonGenerationsStore();

    useEffect(() => {
        fetchGenerations();
    }, []);

    return (
        <Box sx={{ width: '100%', marginBottom: 10 }} className="generation-tree">
            {loading ? (
                <Typography>Cargando generaciones...</Typography>
            ): (
                <>
                    {generations.map((gen) => (
                        <Accordion key={gen.id} className='generation-accordion'>
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