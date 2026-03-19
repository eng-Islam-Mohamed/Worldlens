import type { ExploreResponse } from "@/types/country";

export async function exploreCountry(query: string): Promise<ExploreResponse> {
  if (!query || query.trim().length === 0) {
    return { success: false, error: "Please enter a country name." };
  }

  try {
    const response = await fetch("/api/explore", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query: query.trim() }),
    });

    const data = (await response.json()) as ExploreResponse;

    if (!response.ok) {
      return {
        success: false,
        error: data.error || "AI interpretation service is temporarily unavailable.",
      };
    }

    return data;
  } catch (error) {
    console.error("Explore request failed:", error);
    return { success: false, error: "Network error. Please try again." };
  }
}
