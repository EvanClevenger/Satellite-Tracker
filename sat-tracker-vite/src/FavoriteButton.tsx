type FavoriteButtonProps = {
  NORAD_CAT_ID: string;
  favorites: Record<string, boolean>;
  toggleFavorites: (id: string) => void;
};

export default function FavoriteButton({
  favorites,
  toggleFavorites,
  NORAD_CAT_ID,
}: FavoriteButtonProps) {
  return (
    <button
      onClick={() => toggleFavorites(NORAD_CAT_ID)}
      title={"Favorite a Satellite!"}
      className="text-2xl focus:outline-none"
    >
      {favorites[NORAD_CAT_ID] ? "❤️" : "🤍"}
    </button>
  );
}
