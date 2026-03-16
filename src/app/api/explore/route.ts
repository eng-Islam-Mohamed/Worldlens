import { NextRequest, NextResponse } from "next/server";
import type { CountryData, ExploreResponse } from "@/types/country";

const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY;

/**
 * POST /api/explore
 * 1. Takes a raw user query (any language, typos, etc.)
 * 2. Uses DeepSeek to interpret and return an ISO alpha-3 code
 * 3. Fetches structured data from REST Countries API
 * 4. Returns compiled result
 */
export async function POST(request: NextRequest) {
  try {
    const { query } = await request.json();

    if (!query || typeof query !== "string" || query.trim().length === 0) {
      return NextResponse.json<ExploreResponse>(
        { success: false, error: "Please enter a country name." },
        { status: 400 }
      );
    }

    /* ── Step 1: Ask DeepSeek to normalize the country name ──────── */
    const deepseekResponse = await fetch(
      "https://api.deepseek.com/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${DEEPSEEK_API_KEY}`,
        },
        body: JSON.stringify({
          model: "deepseek-chat",
          messages: [
            {
              role: "system",
              content: `You are a country name interpreter. Given ANY text input (in any language, with possible typos, abbreviations, or slang), identify the country the user is referring to. Respond with ONLY a JSON object in this exact format, nothing else:
{"code":"XXX","name":"English Name"}
where "code" is the ISO 3166-1 alpha-3 code and "name" is the common English name.
If you cannot identify any country, respond with:
{"code":"","name":"","error":"Could not identify a country from the input."}`,
            },
            {
              role: "user",
              content: query.trim(),
            },
          ],
          temperature: 0.1,
          max_tokens: 100,
        }),
      }
    );

    if (!deepseekResponse.ok) {
      console.error("DeepSeek API error:", deepseekResponse.status);
      return NextResponse.json<ExploreResponse>(
        {
          success: false,
          error: "AI interpretation service is temporarily unavailable.",
        },
        { status: 502 }
      );
    }

    const deepseekData = await deepseekResponse.json();
    const aiContent = deepseekData.choices?.[0]?.message?.content?.trim();

    if (!aiContent) {
      return NextResponse.json<ExploreResponse>(
        { success: false, error: "Failed to interpret country name." },
        { status: 500 }
      );
    }

    let interpretation: { code: string; name: string; error?: string };
    try {
      // Strip markdown code fences if present
      const cleaned = aiContent.replace(/```json?\n?/g, "").replace(/```/g, "").trim();
      interpretation = JSON.parse(cleaned);
    } catch {
      console.error("Failed to parse DeepSeek response:", aiContent);
      return NextResponse.json<ExploreResponse>(
        { success: false, error: "Failed to interpret the input." },
        { status: 500 }
      );
    }

    if (interpretation.error || !interpretation.code) {
      return NextResponse.json<ExploreResponse>(
        {
          success: false,
          error:
            interpretation.error ||
            "Could not identify a country from your input. Try again with a different name.",
        },
        { status: 404 }
      );
    }

    /* ── Step 2: Fetch country data from REST Countries API ──────── */
    const countryRes = await fetch(
      `https://restcountries.com/v3.1/alpha/${interpretation.code}`
    );

    if (!countryRes.ok) {
      return NextResponse.json<ExploreResponse>(
        {
          success: false,
          error: `Could not fetch data for "${interpretation.name}". Please try again.`,
        },
        { status: 404 }
      );
    }

    const countryArr = await countryRes.json();
    const raw = countryArr[0];

    /* ── Step 3: Resolve border country names ────────────────────── */
    let borderNames: string[] = [];
    if (raw.borders && raw.borders.length > 0) {
      try {
        const borderCodes = raw.borders.join(",");
        const borderRes = await fetch(
          `https://restcountries.com/v3.1/alpha?codes=${borderCodes}&fields=name,cca3,flags`
        );
        if (borderRes.ok) {
          const borderData = await borderRes.json();
          borderNames = borderData.map(
            (b: { name: { common: string } }) => b.name.common
          );
        }
      } catch {
        borderNames = raw.borders;
      }
    }

    /* ── Step 4: Build structured response ───────────────────────── */
    const country: CountryData = {
      name: raw.name,
      capital: raw.capital || [],
      region: raw.region || "",
      subregion: raw.subregion || "",
      population: raw.population || 0,
      area: raw.area || 0,
      flags: raw.flags,
      borders: raw.borders || [],
      borderNames,
      languages: raw.languages || {},
      currencies: raw.currencies || {},
      timezones: raw.timezones || [],
      latlng: raw.latlng || [0, 0],
      maps: raw.maps || {},
      cca2: raw.cca2 || "",
      cca3: raw.cca3 || "",
      coatOfArms: raw.coatOfArms || {},
    };

    return NextResponse.json<ExploreResponse>({
      success: true,
      data: country,
      interpretedAs: interpretation.name,
    });
  } catch (error) {
    console.error("Explore API error:", error);
    return NextResponse.json<ExploreResponse>(
      { success: false, error: "An unexpected error occurred." },
      { status: 500 }
    );
  }
}
