import { render } from '@testing-library/react';
import AccordionSkeleton from './AccordionSkeleton'; // Asegúrate de que la ruta sea correcta
import '@testing-library/jest-dom';

describe('AccordionSkeleton Component', () => {
    it('renders correctly', () => {
        const { container } = render(<AccordionSkeleton />);

        // Verificar que la clase del contenedor esté presente
        expect(container.querySelector('.accordion-skeleton')).toBeInTheDocument();
    });

    it('renders 7 accordion items', () => {
        const { container } = render(<AccordionSkeleton />);

        // Verificar que haya 7 elementos con la clase "accordion-item"
        const items = container.querySelectorAll('.accordion-item');
        expect(items).toHaveLength(7); // Debe renderizar 7 items
    });

    it('renders skeleton elements inside accordion items', () => {
        const { container } = render(<AccordionSkeleton />);

        // Verificar que los elementos de tipo "skeleton" estén presentes
        const skeletons = container.querySelectorAll('.skeleton');
        expect(skeletons.length).toBeGreaterThan(0); // Debe haber al menos un elemento con la clase "skeleton"
    });

    it('renders skeleton-title and skeleton-icon inside each accordion item', () => {
        const { container } = render(<AccordionSkeleton />);

        // Verificar que cada acordeón tenga un "skeleton-title" y un "skeleton-icon"
        const skeletonTitle = container.querySelectorAll('.skeleton-title');
        const skeletonIcon = container.querySelectorAll('.skeleton-icon');

        // Verificar que haya 7 de cada uno (uno por acordeón)
        expect(skeletonTitle).toHaveLength(7);
        expect(skeletonIcon).toHaveLength(7);
    });
});
