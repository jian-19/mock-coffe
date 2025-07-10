import { getApiDocs } from "@/lib/getDocs";

export default async function swagger(req, res) {
    const spec = await getApiDocs();

    res.status(200).json(spec)
}