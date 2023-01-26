import { useState, useEffect, useMemo } from "react";
import "./style.css";
import Card from "./components/card";
import NavBar from "./components/navbar";
import Pagination from "./components/pagination";

function App() {
  const [country, setCountry] = useState([]);

  const [sortAscending, setSortAscending] = useState(true);

  const [check, setCheck] = useState({
    region: false,
    area: false,
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(30);

  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;

  useEffect(() => {
    async function getCountry() {
      const res = await fetch(
        "https://restcountries.com/v2/all?fields=name,region,area"
      );
      const data = await res.json();
      setCountry(data);
    }
    getCountry();
  }, []);

  const lithuania = useMemo(
    () =>
      country
        .filter((countries) => countries.name === "Lithuania")
        .map((lt) => lt.area),
    [country]
  );

  function handleCheck(event) {
    event.target.name === "region"
      ? setCheck((oldValue) => ({ ...oldValue, region: !oldValue.region }))
      : setCheck((oldValue) => ({ ...oldValue, area: !oldValue.area }));
    setCurrentPage(1);
  }

  function sortChange() {
    setSortAscending((oldValue) => !oldValue);
  }

  function filterData(instance) {
    if (check.region && !check.area) {
      return instance.region === "Oceania";
    } else if (!check.region && check.area) {
      return instance.area < lithuania;
    } else if (check.region && check.area) {
      return instance.region === "Oceania" && instance.area < lithuania;
    } else return instance;
  }

  const sortedItems = country
    .sort((a, b) => {
      if (sortAscending) {
        return a.name.localeCompare(b.name);
      } else {
        return b.name.localeCompare(a.name);
      }
    })
    .filter(filterData);

  const countryCards = sortedItems.map((obj) => {
    return <Card key={obj.name} {...obj} />;
  });

  const currentCards = countryCards.slice(firstPostIndex, lastPostIndex);

  return (
    <div className="page">
      <NavBar
        sortChange={sortChange}
        sortAscending={sortAscending}
        handleCheck={handleCheck}
        check={check}
      />
      {currentCards}
      <Pagination
        totalPosts={countryCards.length}
        postsPerPage={postsPerPage}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
      />
    </div>
  );
}

export default App;
