import React from "react";
import ReactDOM from "react-dom";
import "./MovieModal.css";

function MovieModal() {
  return (
    <div id="movieModal" className="modal-overlay" style={{display: "none",}}>
      <div className="modal-content">
        <span className="close">x</span>
        <h2 id="modalTitle">Playlist Title</h2>
        <p id="modalCreator">Creator Name</p>
      </div>
    </div>
  );
}

export default MovieModal;
