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
      onClick={(e) => toggleFavorites(sat)}
      title={"Favorite a Satellite!"}
      className="text-2xl focus:outline-none"
    >
      {isFavorites[NORAD_CAT_ID] ? "❤️" : "🤍"}
    </button>
  );
}
