import { initialExplorations } from "@/mock/explorations";

export async function GET() {
  return Response.json(initialExplorations);
}

export async function POST(request: Request) {
  const body = await request.json();
  // 실제 백엔드에서는 DB에 저장 후 반환
  return Response.json(body, { status: 201 });
}
