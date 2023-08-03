import { render, screen } from "@testing-library/react";
import userEvents from "@testing-library/user-event";
import Pets, { PetsContext } from "../../Pets/Pets";
import Card from "../Card";
import cats from "../../../mocks/cats.json";

const cardProps = {
  name: "Sydney",
  phone: "111-111-1111",
  email: "laith@hotmail.com",
  image: {
    url: "https://images.unsplash.com/photo-1548247416-ec66f4900b2e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Y2F0fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=1000&q=60",
    alt: "cute cat",
  },
  favoured: false,
  updateFavourite: () => {},
  index: 1,
};

const renderCardComponentWithProvider = (props) => {
  render(
    <PetsContext.Provider value={{ cats, setCats: () => {} }}>
      <Card {...props} />
    </PetsContext.Provider>
  );
};

describe("Card", () => {
  test("should show name of cat", () => {
    renderCardComponentWithProvider(cardProps);

    expect(
      screen.getByRole("heading", {
        name: /sydney/i,
      })
    ).toBeInTheDocument();
  });

  test("should show phone number", () => {
    renderCardComponentWithProvider(cardProps);

    expect(screen.getByText(/111-111-1111/i)).toBeInTheDocument();
  });

  test("should show email", () => {
    renderCardComponentWithProvider(cardProps);

    expect(screen.getByText(/laith@hotmail.com/i)).toBeInTheDocument();
  });

  test("should show image with correct src", () => {
    renderCardComponentWithProvider(cardProps);

    expect(screen.getByAltText(/cute cat/i).src).toBe(cardProps.image.url);
  });

  test("should show outlined heart", () => {
    renderCardComponentWithProvider(cardProps);

    expect(screen.queryByAltText(/filled heart/i)).not.toBeInTheDocument();
    expect(screen.getByAltText(/outlined heart/i)).toBeInTheDocument();
  });

  test("should show filled heart", () => {
    renderCardComponentWithProvider({ ...cardProps, favoured: true });

    expect(screen.queryByAltText(/outlined heart/i)).not.toBeInTheDocument();
    expect(screen.getByAltText(/filled heart/i)).toBeInTheDocument();
  });

  test("should toggle heart status", () => {
    renderCardComponentWithProvider(cardProps);

    userEvents.click(screen.getByRole("button"));

    expect(screen.queryByAltText(/outlined heart/i)).not.toBeInTheDocument();
    expect(screen.getByAltText(/filled heart/i)).toBeInTheDocument();

    userEvents.click(screen.getByRole("button"));

    expect(screen.queryByAltText(/filled heart/i)).not.toBeInTheDocument();
    expect(screen.getByAltText(/outlined heart/i)).toBeInTheDocument();
  });
});
