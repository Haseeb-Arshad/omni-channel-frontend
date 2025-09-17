import { NextResponse } from "next/server";
import { synthesizeProfileSummary } from "@/lib/profileSummary";

const MIN_RESPONSE_MS = 450;

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const normalizeName = (value: unknown): string => {
  if (typeof value !== "string") {
    return "Explorer";
  }
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : "Explorer";
};

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const name = normalizeName(body?.name);
    const summary = synthesizeProfileSummary(name);
    await sleep(MIN_RESPONSE_MS);
    return NextResponse.json({ name, summary, source: "synthetic" });
  } catch (error) {
    const name = "Explorer";
    const summary = synthesizeProfileSummary(name);
    return NextResponse.json({ name, summary, source: "synthetic", error: "invalid-payload" });
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const name = normalizeName(searchParams.get("name"));
  const summary = synthesizeProfileSummary(name);
  await sleep(MIN_RESPONSE_MS);
  return NextResponse.json({ name, summary, source: "synthetic" });
}
