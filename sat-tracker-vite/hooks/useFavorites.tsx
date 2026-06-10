import { useState, useEffect } from "react";

const STORAGE_KEY = "satellite_tracker:favorites";

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<Record<string, boolean>>({});

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

  const toggleFavorites = (NORAD_CAT_ID: string) => {
    setFavorites((prev) => ({
      ...prev,
      [NORAD_CAT_ID]: !prev[NORAD_CAT_ID],
    }));
  };

  return { favorites, toggleFavorites, favoritesLoaded };
};
