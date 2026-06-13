import { useState, useEffect } from "react";

const STORAGE_KEY = "satellite_tracker:favorites";
const MAX_FAVORITES = 5;

type FavoriteSatellite = {
  OBJECT_NAME: string;
  NORAD_CAT_ID: number;
};

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<FavoriteSatellite[]>([]);

  const [favoritesLoaded, setFavoritesLoaded] = useState(Boolean(false));

  // Loads data upon page loading
  useEffect(() => {
    const savedFavorites = localStorage.getItem(STORAGE_KEY);

    if (savedFavorites) {
      const parsedFavorites = JSON.parse(savedFavorites);

      if (Array.isArray(parsedFavorites)) {
        setFavorites(parsedFavorites);
      } else {
        setFavorites([]);
      }
    }

    setFavoritesLoaded(true);
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

  const toggleFavorites = (satellite: FavoriteSatellite) => {
    setFavorites((prev) => {
      const alreadyFavorited = prev.some(
        (fav) => fav.NORAD_CAT_ID === satellite.NORAD_CAT_ID,
      );

      if (alreadyFavorited) {
        return prev.filter(
          (fav) => fav.NORAD_CAT_ID !== satellite.NORAD_CAT_ID,
        );
      }

      if (prev.length >= MAX_FAVORITES) {
        alert("You can only favorite 5 Satellites");
        return prev;
      }

      return [...prev, satellite];
    });
  };

  const isFavorite = (id: number) => {
    return favorites.some((fav) => fav.NORAD_CAT_ID === id);
  };

  return { favorites, toggleFavorites, favoritesLoaded, isFavorite };
};
