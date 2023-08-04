import {screen, render, within} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Pets from '../Pets';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import catsMock from '../../../mocks/cats.json';

const server = setupServer(
  rest.get("http://localhost:4000/cats", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json(catsMock)
    )
  })
)

beforeAll(() => server.listen());
afterAll(() => server.close());
afterEach(() => server.resetHandlers());

describe("Pets", () => {
  // render
  beforeEach(() => render(<Pets />));

  test('cats init', async () => {
    // find elements
    const cats = await screen.findAllByRole("article");

    // assertion
    expect(cats).toHaveLength(5)

  });

  describe("favour filter", () => {
    describe('favour filter', () => { 
      test('compare cats after select favoured', async () => {
        // before
        const beforeCats = await screen.findAllByRole("article");

        // click favour card
        const favourBtn1 = within(beforeCats[0]).getByRole("button");
        const favourBtn2 = within(beforeCats[1]).getByRole("button");
        userEvent.click(favourBtn1);
        userEvent.click(favourBtn2);

        // after
        const afterCats = await screen.findAllByRole("article"); 

        // assertion
        expect(beforeCats).not.toStrictEqual(afterCats);
      })
    })
  });

  describe('gender filter', () => {
    describe("male filter", () => {
      test('compare before after select male option', async () => {
        // before
        const beforeCards = await screen.findAllByRole("article");

        // select male
        const genderOptions = screen.getByLabelText(/gender/i);
        userEvent.selectOptions(genderOptions, "male");

        // after
        const afterCards = await screen.findAllByRole("article");

        // assertions
        expect(afterCards.length).toBeGreaterThan(0); // Ensure there are some male cats
        expect(afterCards.length).toBeLessThanOrEqual(beforeCards.length); // Filtered count <= Total count

        afterCards.forEach(card => {
          expect(card).toHaveTextContent(/male/i)
        })

      });
      test("display male cards in page", async () => {
        // before
        const beforeCards = await screen.findAllByRole("article");

        // select male
        const genderOptions = screen.getByLabelText(/gender/i);
        userEvent.selectOptions(genderOptions, "male");

        // after
        const afterCards = screen.getAllByRole("article");

        // assertion
        expect(afterCards).toStrictEqual([beforeCards[1], beforeCards[3]])

      })
    });

    describe('female filter', () => {
      test("compare before after select female option", async () => {
        // before
        const beforeCards = await screen.findAllByRole("article");

        // select female
        const genderOptions = screen.getByLabelText(/gender/i);
        userEvent.selectOptions(genderOptions, "female");

        // after
        const afterCards = await screen.findAllByRole("article");

        // assertions
        expect(afterCards.length).toBeGreaterThan(0); // Ensure there are some male cats
        expect(afterCards.length).toBeLessThanOrEqual(beforeCards.length); // Filtered count <= Total count

        afterCards.forEach(card => {
          expect(card).toHaveTextContent(/female/i)
        })
      });
      test("display female cards in page", async () => {
        // before
        const beforeCards = await screen.findAllByRole("article");

        // select female
        const genderOptions = screen.getByLabelText(/gender/i);
        userEvent.selectOptions(genderOptions, "female");

        // after
        const afterCards = await screen.findAllByRole("article");

        // assertion
        expect(afterCards).toStrictEqual([beforeCards[0], beforeCards[2], beforeCards[4]]);
      })

    })
  });



})