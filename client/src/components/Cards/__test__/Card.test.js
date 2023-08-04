import { screen, render } from '@testing-library/react';
import Cards from '../Cards';
import cats from '../../../mocks/cats.json';
import { PetsContext } from '../../Pets/Pets';


describe("Cards", () => {
  test("render 5 cards in page", () => {
    // render PetsContext with values
    render(
      <PetsContext.Provider
        value={{
          cats: cats,
          setCats: () => { },
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