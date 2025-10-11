import { redirect } from "next/navigation";

// Redirect to onboarding step 1 for the default landing experience
export default function Home() {
  redirect("/onboarding/step1");
}
