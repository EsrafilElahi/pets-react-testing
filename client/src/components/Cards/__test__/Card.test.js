import { screen, render, cleanup, fireEvent, waitFor } from '@testing-library/react';
import Cards from '../Cards';
import cats from '../../../mocks/cats.json';
import { PetsContext } from '../../Pets/Pets';
import * as api from '../../../mocks/api'; // Import the mock API module

jest.mock('./api'); // Mock the API module
const mockedSetCats = jest.fn();

afterEach(cleanup)


test('successful login', async () => {
  api.login.mockResolvedValue({ token: 'mockedToken' }); // Set a mock response

  render(<Cards />);

  fireEvent.change(screen.getByLabelText('Username'), { target: { value: 'validUser' } });
  fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'validPassword' } });
  fireEvent.click(screen.getByText('Login'));

  await waitFor(() => {
    expect(screen.getByText('Welcome')).toBeInTheDocument();
  });
});

test('failed login', async () => {
  api.login.mockRejectedValue(new Error('Invalid credentials')); // Set a mock error response

  render(<Cards />);

  fireEvent.change(screen.getByLabelText('Username'), { target: { value: 'invalidUser' } });
  fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'invalidPassword' } });
  fireEvent.click(screen.getByText('Login'));

  await waitFor(() => {
    expect(screen.getByText('Invalid credentials')).toBeInTheDocument();
  });
});



describe("Cards", () => {
  test("render 5 cards in page", () => {
    // render PetsContext with values
    render(
      <PetsContext.Provider
        value={{
          cats: cats,
          // setCats: () => { }, // this is ok too
          setCats: mockedSetCats,
        }}
      >
        <Cards />
      </PetsContext.Provider>
    );
    // assertion
    const cards = screen.getAllByRole("article");
    expect(cards).toHaveLength(5)
  });

  test("snapshot test", () => {
    const { asFragment } = render(
      <PetsContext.Provider
        value={{
          cats: cats,
          setCats: () => { },
        }}
      >
        <Cards />
      </PetsContext.Provider>
    );

    expect(asFragment()).toMatchSnapshot()
  })
});