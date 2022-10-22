import classes from "./SearchForm.module.css";

const SearchForm = () => {
  return (
    <form className={classes.searchForm}>
      <input className={classes.searchBar} type="text" placeholder="Search" />
      <button className={classes.searchBtn} type="submit">
        Search
      </button>
    </form>
  );
};

export default SearchForm;
