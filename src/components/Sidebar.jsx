import React from "react";
import "./Sidebar.css"

export default function SideBar({favorites, watched}){
    return (
        <aside className="side-bar">
            <section>
                <h3>Favorites</h3>
                <ul>
                    {favorites.length ? favorites.map(m=> <li key={m.id}>{m.title}</li>)
                : <li><em>No Favorites Yet!</em></li>    
                }
                </ul>
            </section>
            <section>
                <h3>Watched</h3>
                <ul>
                    {watched.length ? watched.map(m=> <li key={m.id}>{m.title}</li>)
                : <li><em>Nothing Watched Yet!</em></li>    
                }
                </ul>
            </section>

        </aside>
    );
    
}