/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// COMPONENTES
import AnimatedButton from '../../components/AnimatedButton/AnimatedButton';
import StatBar from './components/StatBar';

// HOOKS Y UTILIDADES
import { usePokemonDetails } from './hooks/usePokemonDetails';
import { formatTypes } from '../../utils/formatTypes';

// LIBRERIAS DE TERCEROS
import { LazyLoadImage } from 'react-lazy-load-image-component';

// ESTILOS
import './PokemonDetailsPage.scss';
import 'react-lazy-load-image-component/src/effects/blur.css';

const PokemonDetailsPage = () => {

    // HOOK DE DETALLES DEL POKEMON
    const { 
        name,
        loading,
        pokemon,
        getPokemon,
        evolutions
    } = usePokemonDetails();

    const navigate = useNavigate();

    const formatAbility = (ab: string) => {
        // Convierte el nombre de la habilidad a formato "Title Case" (ej: "overgrow" -> "Overgrow")
        return ab.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
    }

    useEffect(() => {
        getPokemon();
    }, [name]);

    return (
        <>
            { loading ? (
                <div className="pokemon-detail">
                    <div className="spinner">
                        <div className="spinnerin"></div>
                    </div>
                </div>
            )  :  (
                <>
                    { pokemon && (
                        <div className="pokemon-detail">
                            {/* From Uiverse.io by Jedi-hongbin */}
                            <button className="animated-button" onClick={() => navigate(-1)}>
                                <AnimatedButton 
                                    text='Atrás' 
                                    icon={
                                        <path
                                            d="M7.8284 11H20V13H7.8284L13.1924 18.364L11.7782 19.7782L4 12L11.7782 4.22183L13.1924 5.63604L7.8284 11Z"
                                        />
                                    }
                                />
                            </button>

                            <div className="card">
                                <div className='pokemon-img-container'>
                                    <LazyLoadImage
                                        src={pokemon.img}
                                        alt={`Imagen de ${pokemon.name}`}
                                        className='pokemon-img'
                                        effect="blur"     // Añadimos un blur bonito
                                        threshold={150}   // Carga un poco antes de aparecer
                                    />
                                </div>
                                <h1 style={{ marginBottom: "30px" }}>{pokemon.name}</h1>
                                <span className="card-id">ID: {pokemon.id}</span>
                                <p>Altura: {pokemon.height}</p>
                                <p>Peso: {pokemon.weight}</p>
                                <div className="types-container">Tipos: {formatTypes(pokemon.types)}</div>

                                <div className="stats">
                                    <h2>Estadísticas</h2>
                                    {pokemon.stats.map((stat: any) => (
                                        <div key={stat.name} className="stat-item">
                                            <StatBar 
                                                label={stat.name}
                                                value={stat.value}
                                                color={pokemon.color}
                                            />
                                        </div>
                                    ))}
                                </div>

                                <div className="abilities">
                                    <h2>Habilidades</h2>
                                    <ul>
                                        {pokemon.abilities.map((ab: string) => (
                                            <li key={ab}>{formatAbility(ab)}</li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="evolutions">
                                    <h2>Evoluciones</h2>
                                    <div className="evolution-chain">
                                        {evolutions.map((evo) => (
                                            <div key={evo.name} className="evo-card" onClick={() => navigate(`/pokemon/${evo.name}`)}>
                                                <LazyLoadImage
                                                    src={evo.img}
                                                    alt={`Imagen de ${evo.name}`}
                                                    effect="blur"
                                                    threshold={150}
                                                />
                                                <p>{evo.name.charAt(0).toUpperCase() + evo.name.slice(1)}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                            </div>
                        </div>
                    )}
                </>
            )}
        </>
    );

}

export default PokemonDetailsPage;