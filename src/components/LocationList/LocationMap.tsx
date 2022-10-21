import { Box } from "@chakra-ui/react";
import { Map } from "leaflet";
import { FunctionComponent, useRef } from "react";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import { Location } from "ribbon-client";

interface LocationMapProps {
  location: Location;
}

const LocationMap: FunctionComponent<LocationMapProps> = ({ location }) => {
  const mapRef = useRef<Map>(null);

  return (
    <Box flex={1} id="mapContainer" mt={3}>
      <MapContainer
        ref={mapRef}
        center={location ? [location.latitude, location.longitude] : [0, 0]}
        style={{ width: "inherit", height: "300px" }}
        zoom={15}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {location ? (
          <Marker
            key={location.uuid}
            position={[location.latitude, location.longitude]}
          ></Marker>
        ) : null}
      </MapContainer>
    </Box>
  );
};

export default LocationMap;
