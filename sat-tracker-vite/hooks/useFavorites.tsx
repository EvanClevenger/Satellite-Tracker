import { useState, useEffect } from "react";

const STORAGE_KEY: string = "satellite_tracker:favorites";
const MAX_FAVORITES: number = 5;

type FavoriteSatellite = {
  NORAD_CAT_ID: number;
  OBJECT_NAME: string;
};

export const useFavorites = () => {
  // favorites starts as empty array
  const [favorites, setFavorites] = useState<FavoriteSatellite[]>([]);
  const [favoritesLoaded, setFavoritesLoaded] = useState(Boolean(false));

  // Loads data upon page loading
  useEffect(() => {
    try {
      const favoritesData = localStorage.getItem(STORAGE_KEY);

      if (favoritesData) {
        setFavorites(JSON.parse(favoritesData));
      }
    } finally {
      setFavoritesLoaded(true);
    }
  }, []);

  //save favorites when favorites are changed
  useEffect(() => {
    if (!favoritesLoaded) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
    } catch (error) {
      console.error("Failed to save favorites to local storage:", error);
    }
  }, [favorites, favoritesLoaded]);

  // adds or removes satellites from favorites
  const toggleFavorites = (satellite: FavoriteSatellite) => {
    // checks if the satellite is already in favorites
    const alreadyFavorited = favorites.some(
      (favSat) => favSat.NORAD_CAT_ID === satellite.NORAD_CAT_ID,
    );

    // removes satellite if in local storage
    if (alreadyFavorited) {
      const updatedFavorites = favorites.filter(
        (favSat) => favSat.NORAD_CAT_ID !== satellite.NORAD_CAT_ID,
      );

      setFavorites(updatedFavorites);
      return;
    }

    // If its NOT already, check the max limit
    if (favorites.length >= MAX_FAVORITES) {
      alert("You can only favorite 5 satellites.");
      return;
    }

    // Adds new satellite to favorites array
    setFavorites([...favorites, satellite]);
  };

  return { favorites, toggleFavorites, favoritesLoaded };
};
