import { generateCircles } from "../Map";

export function haversine(lat1, lon1, lat2, lon2) {
    const toRadians = (degrees) => (degrees * Math.PI) / 180;
    const earthRadius = 6371000; // Radius of the Earth in meters

    const φ1 = toRadians(lat1);
    const φ2 = toRadians(lat2);
    const Δφ = toRadians(lat2 - lat1);
    const Δλ = toRadians(lon2 - lon1);

    const a =
        Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
        Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const distance = earthRadius * c;

    return distance;
}

export const handleRadiusChange = (value, setSelectedRadius, setActiveCircle, activeMarker) => {

    setSelectedRadius((prev) => {
        const uniqueValues = new Set(prev);

        if (uniqueValues.has(value)) {
            uniqueValues.delete(value);
        } else {
            uniqueValues.add(value);
        }

        const selectedRadiusArray = [...uniqueValues];

        // Update the active circles here using selectedRadiusArray
        const newCircles = generateCircles(selectedRadiusArray, activeMarker);

        // Set the activeCircle state with the new circles
        setActiveCircle(newCircles);

        return selectedRadiusArray;
    });
};
