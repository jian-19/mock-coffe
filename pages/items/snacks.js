import CustomTable from "@/components/Table";
import { fetcher } from "@/lib/utils";
import useSWR from "swr";

const headers = ["Nome", "Descrição", "Preço"];

export default function Home() {
  const { isLoading, data } = useSWR("/api/mock/snacks", fetcher);

  return (
    <div className="space-y-8">
      <h1 className="text-center text-2xl font-bold">Lanches</h1>
      {!isLoading && (
        <CustomTable
          headers={headers}
          rows={data.map((val) => {
            delete val.image;
            val.amount = `R$${Number(val.amount).toFixed(2).replace(".", ",")}`;
            return val;
          })}
        />
      )}
    </div>
  );
}
