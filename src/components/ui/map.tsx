import { MapContainer, Marker, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";

import L from "leaflet";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

// Fix default icon
const DefaultIcon = L.icon({
	iconUrl: icon,
	shadowUrl: iconShadow,
});

L.Marker.prototype.options.icon = DefaultIcon;

export const Map = ({
	latitude,
	longitude,
}: {
	latitude: number;
	longitude: number;
}) => {
	const lat = Number(latitude);
	const lng = Number(longitude);

	return (
		<MapContainer
			center={[lat, lng]}
			zoom={15}
			style={{ height: "50vh", width: "100%", zIndex: 0 }}
		>
			<TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
			<Marker position={[lat, lng]}></Marker>
		</MapContainer>
	);
};
