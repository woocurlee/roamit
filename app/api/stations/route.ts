import { stations } from "@/mock/stations";

export async function GET() {
  return Response.json(stations);
}
