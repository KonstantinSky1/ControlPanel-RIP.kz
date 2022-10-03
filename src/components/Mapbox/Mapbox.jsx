import React, { useEffect, useState } from 'react';

import 'mapbox-gl/dist/mapbox-gl.css';
import './Mapbox.css';

import Map, { Marker, Popup } from 'react-map-gl';

import markerPic from '../../images/icons/iconMarker.png';

function Mapbox({ viewState, setViewState, ripData }) {
  const [selectedPost, setSelectedPost] = useState(null);

  useEffect(() => {
    const handleClosePopup = (event) => {
      if (event.key === "Escape") {
        setSelectedPost(null);
      }
    }

    window.addEventListener('keydown', handleClosePopup);

    return () => {
      window.removeEventListener('keydown', handleClosePopup);
    }
  }, []);

  return (
    <div className="mapbox-block">
    <Map
      {...viewState}
      onMove={evt => setViewState(evt.viewState)}
      style={{width: '100%', height: '100vh'}}
      mapStyle="mapbox://styles/mapbox/streets-v9"
      mapboxAccessToken="pk.eyJ1Ijoia29uc3RhbnRpbnNreSIsImEiOiJjbDhiYW8zNDQwcDBjM3FuM3MwMXg3MDBqIn0.4WDqm5CpXmykKPm_b1W-LA"
      id="mapbox-map"
    >
      <Marker
        longitude={ripData.cemetery_coordinates_longitude}
        latitude={ripData.cemetery_coordinates_latitude}
        anchor="bottom"
      >
        <button
          onClick={(e) => setSelectedPost(ripData)}
          type="button"
          className="markerButton"
        >
          <img
            src={markerPic}
            alt="Marker Icon"
          />
        </button>
      </Marker>
      {
        selectedPost ? (
          <Popup
            closeOnClick={false}
            longitude={ripData.cemetery_coordinates_longitude}
            latitude={ripData.cemetery_coordinates_latitude}
            onClose={() => setSelectedPost(null)}
          >
            <div className="popup">
              <div className="popup__text-block">
                <div className="popup__text-block-title">
                  <p>Имя:</p>
                  <p className="popup__text">{ripData.name}</p>
                </div>
                <div className="popup__text-block-title">
                  <p>Фамилия:</p>
                  <p className="popup__text">{ripData.surname}</p>
                </div>
                <div className="popup__text-block-title">
                  <p>Дата рождения:</p>
                  <p className="popup__text">{ripData.birthday}</p>
                </div>
                <div className="popup__text-block-title">
                  <p>Дата смерти:</p>
                  <p className="popup__text">{ripData.date_of_death}</p>
                </div>
                <p className="popup__small-text">id: {ripData.id}</p>
              </div>
              <button type="button" className="popup__button-route">Проложить маршрут</button>
            </div>
          </Popup>
        ) : null
      }
    </Map>
    <a href="#controlPanel-form" className="link-up"></a>
  </div>
  );
}

export default Mapbox;