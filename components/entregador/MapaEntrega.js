import { MapContainer, TileLayer, Marker, Polyline } from "react-leaflet";
import { useEffect, useState } from "react";

export default function MapaEntrega({ pedido }) {

  const [posicao, setPosicao] = useState(null);
  const [rota, setRota] = useState([]);

  // 🔥 LOCALIZAÇÃO EM TEMPO REAL
  useEffect(() => {
    const watch = navigator.geolocation.watchPosition((pos) => {
      setPosicao([
        pos.coords.latitude,
        pos.coords.longitude
      ]);
    });

    return () => navigator.geolocation.clearWatch(watch);
  }, []);

  // 🔥 BUSCA ROTA REAL (GPS)
  useEffect(() => {
    if (!posicao) return;

    // 👉 pega destino do pedido (ajusta depois com endereço real)
    const destino = [-8.0476, -34.8770];

    async function buscarRota() {
      try {
        const url = `https://router.project-osrm.org/route/v1/driving/${posicao[1]},${posicao[0]};${destino[1]},${destino[0]}?overview=full&geometries=geojson`;

        const res = await fetch(url);
        const data = await res.json();

        const coords = data.routes[0].geometry.coordinates.map(c => [
          c[1],
          c[0]
        ]);

        setRota(coords);

      } catch (e) {
        console.log("Erro rota:", e);
      }
    }

    buscarRota();

  }, [posicao]);

  if (!posicao) return null;

  const destino = [-8.0476, -34.8770];

  return (
    <MapContainer
      center={posicao}
      zoom={15}
      style={{
        height: 300,
        width: "100%",
        borderRadius: 16
      }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {/* ENTREGADOR */}
      <Marker position={posicao} />

      {/* CLIENTE */}
      <Marker position={destino} />

      {/* 🔥 ROTA REAL */}
      <Polyline positions={rota} color="#ff2a2a" weight={5} />

    </MapContainer>
  );
}