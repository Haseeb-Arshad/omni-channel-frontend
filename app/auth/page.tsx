"use client";

import { redirect } from "next/navigation";

export default function AuthIndex() {
  redirect("/onboarding/step1");
}
