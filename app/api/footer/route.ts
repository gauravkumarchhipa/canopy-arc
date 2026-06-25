import { getFooterData } from "../../lib/footer/get-footer-data";

export async function GET() {
  const data = await getFooterData();
  return Response.json(data);
}
