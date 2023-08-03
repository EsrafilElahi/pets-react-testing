import { render, screen } from "@testing-library/react";
import Cards from "../Cards";
import cats from "../../../mocks/cats.json";
import { PetsContext } from "../../Pets/Pets";

describe("Cards", () => {
  test("should render five card components", () => {
    render(
      <PetsContext.Provider
        value={{
          cats,
          setCats: () => {},
        }}
      >
        <Cards />
      </PetsContext.Provider>
    );
    expect(screen.getAllByRole("article").length).toBe(5);
  });
});
