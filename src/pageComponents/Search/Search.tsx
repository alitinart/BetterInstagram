import * as React from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../pageComponents.css";

export default function Search() {
  const [searchQuery, setSearchQuery] = React.useState("");
  const nav = useNavigate();
  const { query } = useParams();

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        nav(`/search/${searchQuery}`);
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
      <i
        className="bi bi-search"
        style={{
          cursor: "pointer",
        }}
        onClick={() => {
          nav(`/search/${searchQuery}`);
        }}
      ></i>
    </form>
  );
}
