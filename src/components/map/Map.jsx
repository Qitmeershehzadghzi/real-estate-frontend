import { useEffect, useRef } from "react";
import L from "leaflet";
import "./map.scss";
import "leaflet/dist/leaflet.css";

const markerIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

function Map({ items }) {
  const mapRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const validItems = (items || []).filter(
      (item) => item.latitude && item.longitude
    );
    const center =
      validItems.length === 1
        ? [Number(validItems[0].latitude), Number(validItems[0].longitude)]
        : [51.0175, 73.0647];

    const map = L.map(containerRef.current, {
      center,
      zoom: 7,
      scrollWheelZoom: false,
    });

    mapRef.current = map;

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    validItems.forEach((item) => {
      L.marker([Number(item.latitude), Number(item.longitude)], {
        icon: markerIcon,
      })
        .addTo(map)
        .bindPopup(
          `<div class="popupContainer">
            <img src="${item.img || item.images?.[0] || "/logo.png"}" alt="" />
            <div class="textContainer">
              <a href="/${item.id}">${item.title}</a>
              <span>${item.bedroom || item.bedRooms || 0} bedroom</span>
              <b>$ ${item.price}</b>
            </div>
          </div>`
        );
    });

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, [items]);

  return <div ref={containerRef} className="map" />;
}

export default Map;
