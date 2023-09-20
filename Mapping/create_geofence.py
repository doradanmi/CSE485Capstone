import math
import folium
from geopy.geocoders import Nominatim
import pandas as pd


def create_map(event: any, context: any):
    EARTH_CIRCUMFERENCE = 40075000

    # address = event["address"]
    radius = event["radius"]
    zoom = int(math.log2(EARTH_CIRCUMFERENCE / (radius * 2)) - 8)
    print(zoom)
    geolocation = Nominatim(user_agent="flight_pathing")

    location = event['location']  # geolocation.geocode(address, timeout=None)
    lat = location.latitude
    long = location.longitude
    print(f'Latitude: {lat}, Longitude: {long}')

    m = folium.Map(location=[lat, long], zoom_start=zoom, tiles="Stamen Terrain")

    folium.Marker(
        [lat, long], popup="<i>Arizona State University</i>"
    ).add_to(m)
    print(zoom)
    folium.Circle(
        location=(lat, long),
        radius=float(radius * 1000),
        color="#3186cc",
        fill=True,
        fill_color="#3186cc",
    ).add_to(m)

    m.save("maps.html")
    return m


if __name__ == "__main__":
    json_clip = {
        "location": "Latitude: 33.422051, Longitude: -111.934802",
        "radius": 5
    }

    create_map(event=json_clip, context=None)
