type FavoriteButtonProps = {
  NORAD_CAT_ID: string;
  favorites: Record<string, boolean>;
  toggleFavorites: (id: string) => void;
};

export function FavoriteButton({
  favorites,
  toggleFavorites,
}: FavoriteButtonProps) {
  return (
    <button
      onClick={(e) => toggleFavorites(id)}
      title={"Favorite a Satellite!"}
      className="text-2xl focus:outline-none"
    >
      {favorites[NORAD_CAT_ID] ? "❤️" : "🤍"}
    </button>
  );
}
