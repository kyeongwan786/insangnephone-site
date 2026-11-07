import { homeData } from "../data/home-data.js";

// Replace this adapter with the real API when backend endpoints are ready.
export async function getHomeData() {
  const endpoint = document.documentElement.dataset.homeApi;
  if (!endpoint) return homeData;
  const response = await fetch(endpoint, { headers: { Accept: "application/json" } });
  if (!response.ok) throw new Error(`Home data request failed: ${response.status}`);
  return response.json();
}
