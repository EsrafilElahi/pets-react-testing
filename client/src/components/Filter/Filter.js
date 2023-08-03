import "./Filter.css";

const Filter = ({ filters, setFilters }) => (
  <div className="pet-filter-container">
    <div className="filter-container">
      <label htmlFor="favourite">Favourite</label>
      <select
        name="favourite"
        id="favourite"
        className="form-select"
        onChange={(e) => {
          setFilters({
            ...filters,
            favoured: e.target.value,
          });
        }}
      >
        <option value="any">Any</option>
        <option value="favoured">Favoured</option>
        <option value="not favoured">Not Favoured</option>
      </select>
    </div>
    <div className="filter-container">
      <label htmlFor="gender">Gender</label>
      <select
        name="gender"
        id="gender"
        className="form-select"
        onChange={(e) => {
          setFilters({
            ...filters,
            gender: e.target.value,
          });
        }}
      >
        <option value="any">Any</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
      </select>
    </div>
  </div>
);

export default Filter;
