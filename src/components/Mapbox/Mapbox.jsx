import React, { useEffect, useState } from 'react';

import 'mapbox-gl/dist/mapbox-gl.css';
import './Mapbox.css';

import Map, { Marker, Popup } from 'react-map-gl';

import markerPic from '../../images/icons/iconMarker.png';

function Mapbox({ viewState, setViewState, ripData, location }) {
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
      {/* Маркер для главной страницы */}
      {
        location.pathname === '/' && (
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
        )
      }
      {/* Попап для маркера главной страницы */}
      {
        (selectedPost && location.pathname === '/') ? (
          <Popup
            closeOnClick={false}
            longitude={selectedPost.cemetery_coordinates_longitude}
            latitude={selectedPost.cemetery_coordinates_latitude}
            onClose={() => setSelectedPost(null)}
          >
            <div className="popup">
              <div className="popup__text-block">
                <div className="popup__text-block-title">
                  <p>Имя:</p>
                  <p className="popup__text">{selectedPost.name}</p>
                </div>
                <div className="popup__text-block-title">
                  <p>Фамилия:</p>
                  <p className="popup__text">{selectedPost.surname}</p>
                </div>
                <div className="popup__text-block-title">
                  <p>Дата рождения:</p>
                  <p className="popup__text">{selectedPost.birthday}</p>
                </div>
                <div className="popup__text-block-title">
                  <p>Дата смерти:</p>
                  <p className="popup__text">{selectedPost.date_of_death}</p>
                </div>
                <p className="popup__small-text">id: {selectedPost.id}</p>
              </div>
              <button type="button" className="popup__button-route">Проложить маршрут</button>
            </div>
          </Popup>
        ) : null
      }
      {/* Массив маркеров для страницы bulkupload */}
      {
        (ripData && location.pathname === '/bulkupload') ? (
          ripData.map((item, index) => (
            <Marker
              key={index}
              longitude={item.cemetery_coordinates_longitude}
              latitude={item.cemetery_coordinates_latitude}
              anchor="bottom"
            >
              <button
                onClick={(e) => setSelectedPost(item)}
                type="button"
                className="markerButton"
              >
                <img
                  src={markerPic}
                  alt="Marker Icon"
                />
              </button>
            </Marker>
          ))
        ) : null
      }
      {/* Попап для маркера страницы bulkupload*/}
      {
        (selectedPost && location.pathname === '/bulkupload') ? (
          <Popup
            closeOnClick={false}
            longitude={selectedPost.cemetery_coordinates_longitude}
            latitude={selectedPost.cemetery_coordinates_latitude}
            onClose={() => setSelectedPost(null)}
          >
            <div className="popup">
              <div className="popup__text-block">
                <div className="popup__text-block-title">
                  <p>Имя:</p>
                  <p className="popup__text">{selectedPost.name}</p>
                </div>
                <div className="popup__text-block-title">
                  <p>Фамилия:</p>
                  <p className="popup__text">{selectedPost.surname}</p>
                </div>
              </div>
              {/* <button type="button" className="popup__button-route">Проложить маршрут</button> */}
            </div>
          </Popup>
        ) : null
      }
    </Map>
    {
      (location.pathname === '/') && <a href="#controlPanel-form" className="link-up"></a>
    }
    {
      (location.pathname === '/bulkupload') && <a href="#bulkUpload__title" className="link-up"></a>
    }
  </div>
  );
}

export default Mapbox;