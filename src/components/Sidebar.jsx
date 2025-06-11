import React from "react";
import "./Sidebar.css";

export default function SideBar({
  isOpen,
  onClose,
  onSelect,
  favoritesCount,
  watchedCount,
}) {
  //Nav bar for user to choose between home view, favorites, and watched movies
  return (
    <aside className={`side-bar ${isOpen ? "open" : ""}`}>
      <nav className="side-nav">
        <button onClick={onClose}>Close</button>

        <button onClick={() => onSelect("home")}>Home</button>
        <button onClick={() => onSelect("favorites")}>
          Favorites {favoritesCount > 0 && `(${favoritesCount})`}
        </button>
        <button onClick={() => onSelect("watched")}>
          Watched {watchedCount > 0 && `(${watchedCount})`}
        </button>
      </nav>
    </aside>
  );
}
