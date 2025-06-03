// app/routes/index.tsx
import { createFileRoute, useRouter } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { BinDataResponse } from "../types/api";

export const Route = createFileRoute("/")({
  component: Home,
  loader: async () => {
    const response = await fetch(import.meta.env.VITE_API_ENDPOINT as string);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  },
});

function Home() {
  const router = useRouter();
  const data = Route.useLoaderData() as BinDataResponse;
  return <Button type="button">Add 1 to?</Button>;
}
