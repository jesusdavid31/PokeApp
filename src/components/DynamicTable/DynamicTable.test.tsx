import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import DynamicTable from './DynamicTable';

const columns = [
    { id: 'name', label: 'Nombre' },
    { id: 'weight', label: 'Peso' },
];

const currentData = [
    { name: 'Bulbasaur', weight: '6.9 kg' },
    { name: 'Charmeleon', weight: '25 kg' },
];

const handlePageClick = jest.fn();

describe('BasicTable Component', () => {
    it('renders without crashing', () => {
        render(
            <DynamicTable 
                isLoading={false}
                columns={columns}
                currentData={currentData}
                actualPage={1}
                totalPages={2}
                itemsPerPage={2}
                totalItems={4}
                handlePageClick={handlePageClick}
            />
        );

        // Verificar si las cabeceras de la tabla se renderizan
        columns.forEach((column) => {
            expect(screen.getByText(column.label)).toBeInTheDocument();
        });
    });

    it('displays loading spinner when data is loading', () => {
        render(
            <DynamicTable 
                isLoading={true}
                columns={columns}
                currentData={[]}
                actualPage={1}
                totalPages={1}
                itemsPerPage={1}
                totalItems={0}
                handlePageClick={handlePageClick}
            />
        );

        // Verificar que el spinner de carga se muestra
        expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
    });

    it('displays no content message when no data is available', () => {
        render(
            <DynamicTable 
                isLoading={false}
                columns={columns}
                currentData={[]}
                actualPage={1}
                totalPages={1}
                itemsPerPage={1}
                totalItems={0}
                handlePageClick={handlePageClick}
            />
        );

        // Verificar que el mensaje "Sin contenido" se muestra
        expect(screen.getByText(/Sin contenido/i)).toBeInTheDocument();
    });

    it('displays data correctly when available', () => {
        render(
            <DynamicTable 
                isLoading={false}
                columns={columns}
                currentData={currentData}
                actualPage={1}
                totalPages={1}
                itemsPerPage={2}
                totalItems={2}
                handlePageClick={handlePageClick}
            />
        );

        // Verificar que los datos se muestran correctamente
        expect(screen.getByText('Bulbasaur')).toBeInTheDocument();
        expect(screen.getByText('Charmeleon')).toBeInTheDocument();
    });

    it('calls handlePageClick when pagination is changed', () => {
        render(
            <DynamicTable 
                isLoading={false}
                columns={columns}
                currentData={currentData}
                actualPage={1}
                totalPages={2}
                itemsPerPage={2}
                totalItems={4}
                handlePageClick={handlePageClick}
            />
        );

        // Simular un cambio de página
        fireEvent.click(screen.getByText('2'));

        // Verificar que la función handlePageClick fue llamada
        expect(handlePageClick).toHaveBeenCalledTimes(1);
    });
});
