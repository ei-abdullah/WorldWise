import { useParams } from "react-router-dom";
import styles from "./City.module.css";
import { useEffect } from "react";
import { useCities } from "../context/CitiesContext";
import Spinner from "./Spinner";
import BackButton from "./BackButton";

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));

function City() {
  // When clicked on specific city item, the link will change
  // and we will get the id through the useParams and use the
  // id to call the getCity function as soon as comp. mounts
  // after mounting we start calling this func which came from CitiesContext.jsx
  // in CitiesContext.jsx file, we have getCity(id) func. which will start fetching the
  // city data for that id, when that arrives it get stored in currentCity state in CitiesContext.jsx
  // which we also pass as context value, which the city comp. recieves that value as it updates and destructur everything and
  // display everything in the UI.
  // It's basically a child to parent communication
  // We call the getCity func. in the City.jsx which will then update the current city and then
  // the current city will comes back down into the city comp. where we can use it

  const { id } = useParams(); // Used to read params
  const { getCity, currentCity, isLoading } = useCities();

  //? Get the current city as soons as comp. mounts or id changes
  useEffect(
    function () {
      getCity(id);
    },
    [id]
  );

  const { cityName, emoji, date, notes } = currentCity;

  // const [searchParams, setSearchParams] = useSearchParams(); // Used to read query string, comes after ?
  // const lat = searchParams.get("lat");
  // const lng = searchParams.get("lng");

  if (isLoading) return <Spinner />;

  return (
    <div className={styles.city}>
      <div className={styles.row}>
        <h6>City name</h6>
        <h3>
          <span>{emoji}</span> {cityName}
        </h3>
      </div>

      <div className={styles.row}>
        <h6>You went to {cityName} on</h6>
        <p>{formatDate(date || null)}</p>
      </div>

      {notes && (
        <div className={styles.row}>
          <h6>Your notes</h6>
          <p>{notes}</p>
        </div>
      )}

      <div className={styles.row}>
        <h6>Learn more</h6>
        <a
          href={`https://en.wikipedia.org/wiki/${cityName}`}
          target="_blank"
          rel="noreferrer"
        >
          Check out {cityName} on Wikipedia &rarr;
        </a>
      </div>

      <div>
        <BackButton />
      </div>
    </div>
  );
}

export default City;
