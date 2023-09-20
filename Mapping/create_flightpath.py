import math
import folium
from geopy.geocoders import Nominatim
from geopy.distance import distance as geopy_distance
import pandas as pd
import create_geofence as cgf


def create_flight(event: any, context: any):
    init_location = event["init_location"]
    final_location = event["final_location"]

    geolocation = Nominatim(user_agent="flight_pathing")

    address = event['address']  # '300 E University Dr, Tempe, AZ 85281, USA'
    location = geolocation.geocode(address, timeout=None)
    print(location)
    lat = location.latitude
    long = location.longitude

    json_file = {
        "location": location,
        "radius": 3
    }

    coord_pair = (lat, long)

    is_in_geofence = in_geofence(coord_pair, json_file['radius'], init_location, final_location)

    if False in is_in_geofence:
        print("You are not in the geofence")
        return {
            "statusCode": 400,
            "body": "You are not in the geofence"
        }

    flight = cgf.create_map(event=json_file, context=None)

    folium.Marker(
        init_location, popup="<i>Initial Location</i>"
    ).add_to(flight)
    folium.Marker(
        final_location, popup="<i>Final Location</i>"
    ).add_to(flight)

    folium.PolyLine([init_location, final_location], color="red", weight=2.5, opacity=1).add_to(flight)
    flight.save('maps.html')


def in_geofence(location, radius, init_location, final_location):
    distance_meters_init = geopy_distance(location, init_location).meters
    distance_meters_final = geopy_distance(location, final_location).meters
    return (distance_meters_init <= radius * 100, distance_meters_final <= radius * 1000)


if __name__ == "__main__":
    json_clip = {
        "init_location": [33.422, -111.933],
        "final_location": [33.432, -111.933],
        "address": "300 E University Dr, Tempe, AZ 85281, USA"
    }

    create_flight(event=json_clip, context=None)
