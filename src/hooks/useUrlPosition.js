import { useSearchParams } from "react-router-dom";

export function useUrlPosition() {
  // Read the lat and lng through the URL
  // const [searchParams, setSearchParams] = useSearchParams();
  const [searchParams] = useSearchParams();
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  return [lat, lng];
}
