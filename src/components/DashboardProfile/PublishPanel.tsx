"use client";

import { useCallback, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";

import { Button } from "@/components/ui/Button/Button";
import { setProfilePublished } from "@/services/teacher-profile";

import type { PublishPanelProps } from "./types";

export function PublishPanel({
  teacherId,
  isPublished,
  slug,
  hasProfile,
}: PublishPanelProps) {
  const router = useRouter();
  const [error, setError] = useState("");

  const mutation = useMutation({
    mutationFn: setProfilePublished,
    onSuccess: function handleSuccess(result) {
      if (!result.success) {
        setError(result.error);
        return;
      }
      setError("");
      router.refresh();
    },
  });

  const handleToggle = useCallback(
    function handleToggle() {
      mutation.mutate({ teacherId, isPublished: !isPublished });
    },
    [mutation, teacherId, isPublished],
  );

  return (
    <section
      aria-labelledby="publish-heading"
      className="rounded-2xl border border-line bg-white p-6"
    >
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 id="publish-heading" className="font-display text-xl text-ink">
            {isPublished ? "Your profile is live" : "Your profile is a draft"}
          </h2>
          <p className="mt-1 text-sm text-ink/60">
            {isPublished && slug ? (
              <>
                Students can find you at{" "}
                <Link
                  href={`/teachers/${slug}`}
                  className="font-medium text-rausch hover:underline"
                >
                  /teachers/{slug}
                </Link>
              </>
            ) : hasProfile ? (
              "Publish it to appear in the public directory."
            ) : (
              "Save your profile first, then publish it."
            )}
          </p>
        </div>
        <Button
          variant={isPublished ? "secondary" : "primary"}
          onClick={handleToggle}
          disabled={mutation.isPending || !hasProfile}
        >
          {mutation.isPending
            ? "Updating…"
            : isPublished
              ? "Unpublish"
              : "Publish profile"}
        </Button>
      </div>
      {error ? (
        <p role="alert" className="mt-3 text-sm text-error">
          {error}
        </p>
      ) : null}
    </section>
  );
}
