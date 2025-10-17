import { render } from '@testing-library/react';
import GenerationTree from './GenerationTree';

// Mock de las funciones de react-router-dom
jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
  useLocation: jest.fn(),
}));

test('renders correctly', () => {
  const { container } = render(<GenerationTree />);
  expect(container).toMatchSnapshot();
});
