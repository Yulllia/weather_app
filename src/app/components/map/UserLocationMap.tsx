"use client"
import {useState, useEffect, FC} from 'react';

import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import { LatLngExpression } from 'leaflet';
import {Popup} from "rc-tooltip";
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import styles from "./map.module.css"

interface UserLocationMapProps {
    latitude: number;
    longitude: number;
    locationName: string;
    profileImage: string;
}

const UserLocationMap: FC<UserLocationMapProps> = ({ latitude, longitude, locationName, profileImage }) => {
    const [position, setPosition] = useState<LatLngExpression>([latitude, longitude]);


    useEffect(() => {
        setPosition([latitude, longitude]);
    }, [latitude, longitude]);

    return (
        <MapContainer id="leaflet-map" center={position} zoom={12} style={{ width: '100%', height: '200px' }}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker
                position={position}
                icon={L.divIcon({
                    iconSize: [12, 12],
                    iconAnchor: [6, 21],
                    className: "markerIcon",
                    html: `
                       <div class="${styles.markerIcon}">
                           <img src="${profileImage}" alt="User Profile" class="${styles.profileImage}" />
                           <p class="${styles.locationName}">${locationName}</p>
                        </div>
                        `,
                })}
            >
                <Popup>{locationName}</Popup>
            </Marker>
        </MapContainer>
    );
}
export default UserLocationMap;
