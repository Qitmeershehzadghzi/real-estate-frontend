import { useState } from "react";
import "./searchBar.scss";

const types = ["buy", "rent"];

const SearchBar = () => {
  const [query, setQuery] = useState({
    type: "buy",
    location: "",
    minPrice: "",
    maxPrice: "",
  });

  const switchType = (val) => {
    setQuery((prev) => ({
      ...prev,
      type: val,
    }));
  };

  const handleChange = (e) => {
    setQuery((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="searchBar">
      {/* TYPE BUTTONS */}
      <div className="type">
        {types.map((item) => (
          <button
            key={item}
            onClick={() => switchType(item)}
            className={query.type === item ? "active" : ""}
          >
            {item}
          </button>
        ))}
      </div>

      {/* FORM */}
      <form>
        <input
          type="text"
          name="location"
          placeholder="City location"
          onChange={handleChange}
        />

        <input
          type="number"
          name="minPrice"
          min={1}
          max={1000000}
          placeholder="Min Price"
          onChange={handleChange}
        />

        <input
          type="number"
          name="maxPrice"
          min={1}
          max={1000000}
          placeholder="Max Price"
          onChange={handleChange}
        />

        <button type="submit">
          <img src="/search.png" alt="search" />
        </button>
      </form>
    </div>
  );
};

export default SearchBar;