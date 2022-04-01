import * as React from "react";
import "../pageComponents.css";

export default function Search() {
  const [searchQuery, setSearchQuery] = React.useState("");

  const searchHandler = async () => {
    alert(searchQuery);
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        searchHandler();
      }}
      className="search"
    >
      <input
        placeholder="Search"
        onChange={(e) => {
          setSearchQuery(e.target.value);
        }}
        value={searchQuery}
      />
      <i className="bi bi-search"></i>
    </form>
  );
}
