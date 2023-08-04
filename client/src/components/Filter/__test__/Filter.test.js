import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Filters from '../Filter';


describe("Filter", () => {
  // render
  beforeEach(() => {
    render(<Filters filters={{}} setFilters={() => { }} />);
  });

  test("snapshot test", () => {
    const { asFragment } = render(<Filters filters={{}} setFilters={() => { }} />);
    expect(asFragment()).toMatchSnapshot();
  })

  test("should be able change value of fouvorite select", () => {
    // find element
    const favouriteSelect = screen.getByLabelText(/favourite/i);

    // assertion any
    expect(favouriteSelect).toHaveValue('any');

    // change favoured
    userEvent.selectOptions(favouriteSelect, "favoured");

    // assertion favoured
    expect(favouriteSelect).toHaveValue('favoured');

    // change not favoured
    userEvent.selectOptions(favouriteSelect, "not favoured");

    // assertion not favoured
    expect(favouriteSelect).toHaveValue('not favoured');
  });

  test("should be able change value of gender select", () => {
    // find element
    const genderSelect = screen.getByLabelText(/gender/i);

    // assertion any
    expect(genderSelect).toHaveValue('any');

    // change male
    userEvent.selectOptions(genderSelect, "male");

    // assertion male
    expect(genderSelect).toHaveValue("male");

    // change female
    userEvent.selectOptions(genderSelect, "female");

    // assertion female
    expect(genderSelect).toHaveValue("female");
  });
});