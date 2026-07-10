"use client";

import { useCallback, useEffect, useState } from "react";
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
  const [optimisticPublished, setOptimisticPublished] = useState(isPublished);

  useEffect(
    function syncFromServer() {
      setOptimisticPublished(isPublished);
    },
    [isPublished],
  );

  const mutation = useMutation({
    mutationFn: setProfilePublished,
    onSuccess: function handleSuccess(result) {
      if (!result.success) {
        setOptimisticPublished(isPublished);
        setError(result.error);
        return;
      }
      setError("");
      router.refresh();
    },
    onError: function handleError() {
      setOptimisticPublished(isPublished);
      setError("Could not change the publish state. Please try again.");
    },
  });

  const handleToggle = useCallback(
    function handleToggle() {
      const nextState = !optimisticPublished;
      setOptimisticPublished(nextState);
      mutation.mutate({ teacherId, isPublished: nextState });
    },
    [mutation, teacherId, optimisticPublished],
  );

  return (
    <section
      aria-labelledby="publish-heading"
      className="rounded-2xl border border-line bg-white p-6"
    >
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 id="publish-heading" className="font-display text-xl text-ink">
            {optimisticPublished
              ? "Your profile is live"
              : "Your profile is a draft"}
          </h2>
          <p className="mt-1 text-sm text-ink/60">
            {optimisticPublished && slug ? (
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
          variant={optimisticPublished ? "secondary" : "primary"}
          onClick={handleToggle}
          disabled={mutation.isPending || !hasProfile}
        >
          {optimisticPublished ? "Unpublish" : "Publish profile"}
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
