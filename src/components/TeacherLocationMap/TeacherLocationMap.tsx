"use client";

import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";

import { getCityCoordinates } from "@/lib/geo";

import "mapbox-gl/dist/mapbox-gl.css";

import type { TeacherLocationMapProps } from "./types";

export function TeacherLocationMap({
  location,
  teacherName,
}: TeacherLocationMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const coordinates = getCityCoordinates({ city: location });
  const lng = coordinates?.lng;
  const lat = coordinates?.lat;

  useEffect(
    function initializeMap() {
      const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
      if (
        !containerRef.current ||
        lng === undefined ||
        lat === undefined ||
        !token
      ) {
        return;
      }

      mapboxgl.accessToken = token;

      const map = new mapboxgl.Map({
        container: containerRef.current,
        style: "mapbox://styles/mapbox/streets-v12",
        center: [lng, lat],
        zoom: 11.5,
        cooperativeGestures: true,
      });

      map.addControl(new mapboxgl.NavigationControl(), "top-right");

      new mapboxgl.Marker({ color: "#ff385c" })
        .setLngLat([lng, lat])
        .addTo(map);

      return function cleanup() {
        map.remove();
      };
    },
    [lng, lat]
  );

  if (!coordinates) {
    return null;
  }

  return (
    <section aria-labelledby="location-heading">
      <h2
        id="location-heading"
        className="text-xs font-medium uppercase tracking-[0.25em] text-rausch"
      >
        Location
      </h2>
      <div
        ref={containerRef}
        role="img"
        aria-label={`Interactive map of ${location}, where ${teacherName} teaches`}
        className="mt-3 aspect-[2/1] w-full overflow-hidden rounded-2xl border border-line"
      />
      <p className="mt-2 text-sm text-ink/50">
        Lessons in {location} - the exact address is shared after booking.
      </p>
    </section>
  );
}
