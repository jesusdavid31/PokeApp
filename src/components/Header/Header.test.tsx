import { fireEvent, render } from "@testing-library/react";
import Header from "./Header";

describe('Header', () => {
    test('renders Header correctly', () => {
        const { getByText } = render(<Header openMenu={true} setOpenMenu={() => {}} />);
        expect(getByText('Pokémon')).toBeInTheDocument();
    });
    
    test("calls setOpenMenu when the menu icon is clicked", () => {
        // 1️⃣ Creamos una función simulada (mock)
        const mockSetOpenMenu = jest.fn();

        // 2️⃣ Renderizamos el Header con esa función
        const { container } = render(
            <Header openMenu={false} setOpenMenu={mockSetOpenMenu} />
        );

        // 3️⃣ Buscamos el ícono usando su clase o tag (HiOutlineBars3)
        const menuIcon = container.querySelector(".header-menu-container svg");

        // 4️⃣ Simulamos el clic sobre el ícono
        fireEvent.click(menuIcon!);

        // 5️⃣ Verificamos que la función fue llamada una vez
        expect(mockSetOpenMenu).toHaveBeenCalledTimes(1);
    });
});