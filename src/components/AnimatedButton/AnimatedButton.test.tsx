import { render } from '@testing-library/react';
import AnimatedButton from './AnimatedButton';

describe('AnimatedButton', () => {
  test('renders AnimatedButton correctly', () => {
    const { getByText } = render(<AnimatedButton text="Click me" icon={[]} />);
    expect(getByText('Click me')).toBeInTheDocument();
  });
});