import React, { useState } from "react";
import { Container, Typography, Divider } from "@material-ui/core";
import StoresService from "../services/stores";
import { makeStyles } from "@material-ui/core/styles";
import CardCarousel from "./card-carousel";
import "./Home.css";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const kiezList = [
  "Körtekiez",
  "Donaukiez",
  "Weserkiez",
  "Kollwitzkiez",
  "Helmholtzkiez",
  "Boxhagener Kiez",
  "Samariterkiez",
  "Graefekiez",
  "Wrangelkiez",
  "Ludwigkirchkiez",
  "Stuttgarter Platz",
  "Brüsseler Kiez",
  "Neukölln",
  "Treptow",
  "Kreuzberg",
  "Bohnenviertel",
  "Heusteigviertel",
  "Belgisches Viertel",
  "Agnesviertel",
  "Severinsviertel",
  "Kwartier Latäng",
  "Eigelstein",
  "Kunibertsviertel",
  "Rathenauviertel",
  "Kortländer-Kiez",
  "Ehrenfeld",
  "Treppenviertel",
  "Karolinenviertel",
  "Schanzenviertel",
  "St. Georg",
  "St. Pauli",
  "Glockenbachviertel",
  "Schwabing",
  "Maxvorstadt",
  "Au"
];

const useStyles = makeStyles(theme => ({
  root: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    maxWidth: 400
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1
  },
  iconButton: {
    padding: 10
  },
  divider: {
    height: 30,
    margin: 4,
    backgroundColor: "white"
  }
}));

export default function Home() {
  const classes = useStyles();
  const [kiez, setKiez] = useState("");
  const [filteredLocations, setFilteredLocations] = useState([]);

  const [storeData, setStoreData] = useState([]);

  const fetchStoreData = async (location) => {
    const StoreServiceInstance = new StoresService();
    setStoreData(await StoreServiceInstance.getStores(location));
    console.log(kiez, storeData);
  };

  const onSearchKeyUp = event => {
    if (event.key === "Enter") {
      fetchStoreData(event);
    }
  };

  return (
    <>
      <Container maxWidth={"xs"} class="home__container">
        <Divider className={classes.divider} />
        <div class="home__typo-wrapper"></div>
        <Typography variant="h5" className="home__align-right">
          Your favourite neighborhood stores, now delivering straight to your
          door
        </Typography>
        <Divider className={classes.divider} />
        <div className="home__search_panel">
          <form class="home__form" onSubmit={e => fetchStoreData(e)}>
            <div className="home__search-wrapper">
              <label for="home__search" className="home__search-label">
                Ort
              </label>
              <FontAwesomeIcon
                className="home__search-marker"
                icon={faMapMarkerAlt}
              />
              <input
                id="home__search"
                className="home__search"
                type="text"
                value={kiez}
                placeholder="Wähle einen Ort…"
                autoComplete="new-password"
                onBlur={() => setFilteredLocations([])}
                onChange={e => {
                  setKiez(e.target.value);
                  setFilteredLocations(e.target.value ?
                    kiezList.filter((location) => location.toLowerCase().match(e.target.value.toLowerCase())) : []);
                }}
              />
            </div>
            <button className="home__submit-btn" onClick={(e) => {
              e.preventDefault();
              fetchStoreData(kiez)
            }}>Suchen
            </button>
            {filteredLocations &&
            <ul className="home__selection-list">
              {filteredLocations.map(option => (
                <li
                  className="home__selection-list-item"
                  onClick={e => {
                    e.preventDefault();
                    console.log("option", option);
                    setKiez(option);
                    setFilteredLocations([]);
                    fetchStoreData(option);
                  }}
                >
                  {option}
                </li>
              ))}
            </ul>}
          </form>
        </div>
        {storeData.length > 0 ?
          <>
            <CardCarousel storeData={storeData} />
          </> : "No results"}
      </Container>
    </>
  );
}
