import { useEffect, useState } from "react";

interface StatBarProps {
    label: string;
    value: number; // de 0 a 100
    color?: string;
}

const StatBar = ({ label, value, color = "#66ccff" }: StatBarProps) => {

    const [width, setWidth] = useState("0%");

    const formatLabel = (label: string) => {
        const statLabels: Record<string, string> = {
            hp: "HP",
            attack: "Ataque",
            defense: "Defensa",
            "special-attack": "Ataque Especial",
            "special-defense": "Defensa Especial",
            speed: "Velocidad"
        };

        return statLabels[label].toUpperCase() || label.toUpperCase();
    };

    useEffect(() => {
        // Animar después del render
        const timeout = setTimeout(() => {
            setWidth(`${value}%`);
        }, 100); // pequeño delay para asegurar transición

        // Limpiar timeout si el componente se desmonta o el valor cambia
        // Esto es importante para evitar fugas de memoria y comportamientos inesperados
        return () => clearTimeout(timeout);
    }, [value]);

    return (
        <div className="stat">
            <div className="stat-label">
                <strong>{formatLabel(label)}</strong>
                <span>{value}</span>
            </div>
            <div className="progress-bar">
                <div
                    className="progress-fill"
                    style={{ 
                        width, 
                        backgroundColor: color 
                    }}
                ></div>
            </div>
        </div>
    );
};

export default StatBar;
