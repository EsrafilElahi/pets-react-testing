import { screen, render, getByRole } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Card from '../Card';
import cats from '../../../mocks/cats.json';
import { PetsContext } from '../../Pets/Pets';


const cardProps = {
  name: "Sydney",
  phone: "111-111-1111",
  email: "laith@hotmail.com",
  image: {
    url: "https://images.unsplash.com/photo-1548247416-ec66f4900b2e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Y2F0fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=1000&q=60",
    alt: "cute cat",
  },
  favoured: false,
  updateFavourite: () => { },
  index: 1,
};

const renderCardComponentWithProvider = (props) => {
  render(
    <PetsContext.Provider
      value={{
        cats: cats,
        setCats: () => { }
      }}
    >
      <Card {...props} />
    </PetsContext.Provider>
  );
};

describe('Card', () => {
  test("snapshot test", () => {
    const { asFragment } = render(
      <PetsContext.Provider
        value={{
          cats: cats,
          setCats: () => { }
        }}
      >
        <Card {...cardProps} />
      </PetsContext.Provider>
    );;
    expect(asFragment()).toMatchSnapshot();
  });

  describe("displays card details", () => {
    beforeEach(() => {
      return renderCardComponentWithProvider(cardProps);
    });

    test("name display in page", () => {
      // find card element
      const nameText = screen.getByRole("heading", { name: /sydney/i });
      // assertion
      expect(nameText).toBeInTheDocument();
    });

    test("phone-number display in page", () => {
      const phoneText = screen.getByText(/111-111-1111/i);
      expect(phoneText).toBeInTheDocument()
    });

    test("email display in page", () => {
      const emailText = screen.getByText(/laith@hotmail.com/i);
      expect(emailText).toBeInTheDocument();
    });

    test("image url display in page", () => {
      const imgElement = screen.getByAltText(/cute cat/i);
      expect(imgElement.src).toBe(cardProps.image.url);
    });
  });

  describe('like, dislike status', () => {

    test("outlined heart display in page", () => {
      renderCardComponentWithProvider(cardProps);

      const outlinedHeart = screen.getByAltText(/outlined heart/i);
      const filledHeart = screen.queryByAltText(/filled heart/i);

      expect(outlinedHeart).toBeInTheDocument();
      expect(filledHeart).not.toBeInTheDocument();
    });

    test("filled heart display in page", () => {
      renderCardComponentWithProvider({ ...cardProps, favoured: true });

      const filledHeart = screen.getByAltText(/filled heart/i);
      const outlinedHeart = screen.queryByAltText(/outlined heart/i);

      expect(filledHeart).toBeInTheDocument();
      expect(outlinedHeart).not.toBeInTheDocument();
    });

    test("toggle like", () => {
      renderCardComponentWithProvider(cardProps);

      const toggleBtn = screen.getByRole("button");

      // click 1 - like
      userEvent.click(toggleBtn);

      // assertion two items
      const filledHeart = screen.getByAltText(/filled heart/i);
      const outlinedHeart = screen.queryByAltText(/outlined heart/i);
      expect(filledHeart).toBeInTheDocument();
      expect(outlinedHeart).not.toBeInTheDocument();

      // click 2 - dislike
      userEvent.click(toggleBtn);

      // assertion two items
      const outlinedHeart2 = screen.getByAltText(/outlined heart/i);
      const filledHeart2 = screen.queryByAltText(/filled heart/i);

      expect(outlinedHeart2).toBeInTheDocument();
      expect(filledHeart2).not.toBeInTheDocument();
    });
  });

})
