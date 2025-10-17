import { render, screen } from '@testing-library/react';
import SkeletonTable from './SkeletonTable';

test('renders SkeletonTable correctly', () => {
    const { container } = render(<SkeletonTable />);  // Obtenemos el container directamente de render()

    // Verifica si la tabla está presente
    const tableElement = screen.getByRole('table');
    expect(tableElement).toBeInTheDocument();

    // Verifica si la cabecera de la tabla (thead) tiene 7 celdas
    const headerCells = screen.getAllByRole('columnheader'); // "th" son los headers
    expect(headerCells.length).toBe(7); // Esperamos que haya 7 celdas en el encabezado

    // Verifica si el cuerpo de la tabla (tbody) tiene 10 filas, y cada fila tiene 7 celdas de "sk-shimmer"
    const rows = screen.getAllByRole('row'); // Todos los tr, incluidas las filas de los datos
    expect(rows.length).toBe(12); // 1 fila de encabezado + 10 filas de datos


    // Verifica si la paginación está presente en el pie de la tabla (tfoot)
    const pagination = container.querySelector('.sk-pagination'); // Usamos querySelector en el container
    expect(pagination).toBeInTheDocument(); // Verifica que el div con la clase "sk-pagination" esté en el DOM

    // Verifica si los botones de paginación están presentes
    const paginationButtons = screen.getAllByTestId('button');
    expect(paginationButtons.length).toBeGreaterThan(0); // Al menos un botón de paginación
});
