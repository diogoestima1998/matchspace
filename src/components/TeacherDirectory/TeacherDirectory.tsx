"use client";

import { useCallback, useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

import { TeacherCard } from "@/components/TeacherCard/TeacherCard";
import { Button } from "@/components/ui/Button/Button";
import { EmptyState } from "@/components/ui/EmptyState/EmptyState";
import { PRICE_MAX_CHF } from "@/lib/constants";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { fetchPublishedTeachers } from "@/services/teachers";

import { FilterBar } from "./FilterBar";
import type { DirectoryFilters, TeacherDirectoryProps } from "./types";

function matchesFilters({
  teacher,
  filters,
}: {
  teacher: TeacherDirectoryProps["initialTeachers"][number];
  filters: DirectoryFilters;
}) {
  if (teacher.hourly_price_chf > filters.maxPrice) {
    return false;
  }

  if (filters.mode !== "all") {
    const supportsMode =
      teacher.teaching_mode === "both" ||
      teacher.teaching_mode === filters.mode;
    if (!supportsMode) {
      return false;
    }
  }

  if (filters.instrument !== "all") {
    const playsInstrument = teacher.instruments.some(
      function matchesSlug(instrument) {
        return instrument.slug === filters.instrument;
      }
    );
    if (!playsInstrument) {
      return false;
    }
  }

  return true;
}

export function TeacherDirectory({
  initialTeachers,
  instruments,
}: TeacherDirectoryProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const filters: DirectoryFilters = useMemo(
    function readFilters() {
      return {
        instrument: searchParams.get("instrument") || "all",
        mode: searchParams.get("mode") || "all",
        maxPrice: Number(searchParams.get("max_price")) || PRICE_MAX_CHF,
      };
    },
    [searchParams]
  );

  const teachersQuery = useQuery({
    queryKey: ["published-teachers"],
    queryFn: function loadTeachers() {
      return fetchPublishedTeachers({ client: createSupabaseBrowserClient() });
    },
    initialData: initialTeachers,
  });

  const handleFilterChange = useCallback(
    function handleFilterChange({
      name,
      value,
    }: {
      name: string;
      value: string;
    }) {
      const params = new URLSearchParams(searchParams.toString());
      const paramName = name === "maxPrice" ? "max_price" : name;
      const isDefault =
        value === "all" ||
        (name === "maxPrice" && Number(value) === PRICE_MAX_CHF);
      if (isDefault) {
        params.delete(paramName);
      } else {
        params.set(paramName, value);
      }
      const queryString = params.toString();
      router.replace(queryString ? `${pathname}?${queryString}` : pathname, {
        scroll: false,
      });
    },
    [pathname, router, searchParams]
  );

  const visibleTeachers = useMemo(
    function filterTeachers() {
      return teachersQuery.data.filter(function applyFilters(teacher) {
        return matchesFilters({ teacher, filters });
      });
    },
    [teachersQuery.data, filters]
  );

  return (
    <div className="space-y-8">
      <FilterBar
        instruments={instruments}
        filters={filters}
        onFilterChange={handleFilterChange}
      />
      {visibleTeachers.length === 0 ? (
        <EmptyState
          title="No teachers match"
          description="Try widening your search - remove a filter or raise the price range."
          action={
            <Button variant="secondary" href="/teachers">
              Clear all filters
            </Button>
          }
        />
      ) : (
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {visibleTeachers.map(function renderTeacher(teacher, index) {
            return (
              <li key={teacher.id} className="flex">
                <TeacherCard teacher={teacher} staggerIndex={index} />
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
