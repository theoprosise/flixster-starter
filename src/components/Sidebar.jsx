import React from "react";
import "./Sidebar.css";

export default function SideBar({isOpen, onClose, onSelect, favoritesCount, watchedCount }) {
  return (
    <aside className={`side-bar ${isOpen ? "open" : ""}`}>
      <button onClick={onClose}>Close</button>
      <nav className="side-nav">
        <button onClick={() => onSelect('home')}>
            Home
        </button>
         <button onClick={() => onSelect('favorites')}>
            Favorites {favoritesCount > 0 && `(${favoritesCount})`}
        </button>
         <button onClick={() => onSelect('watched')}>
            Watched {watchedCount > 0 && `(${watchedCount})`}
        </button>
      </nav>
    </aside>
  );
}
