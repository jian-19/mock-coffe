import CustomTable from "@/components/Table";
import { Button } from "@/components/ui/button";
import { DialogFooter, DialogHeader } from "@/components/ui/dialog";
import { fetcher } from "@/lib/utils";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Check, MoreVertical, X } from "lucide-react";
import useSWR from "swr";

const headers = ["Nome", "Descrição", "Preço"];

export default function Home() {
  const { isLoading, data } = useSWR("/api/mock/hot_drinks", fetcher);

  return (
    <div className="space-y-8">
      <h1 className="text-center text-2xl font-bold">Bebidas Quentes</h1>
      {!isLoading && (
        <CustomTable
          Options={Options}
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

function Options() {
  return (
    <Dialog>
      <DialogTrigger>
        <MoreVertical className="!h-6 !w-6 cursor-pointer" />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Atualizar Item</DialogTitle>
          <DialogDescription>
            Faça as alterações necessárias, e clique em salvar.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">
              <X />
              Cancelar
            </Button>
          </DialogClose>
          <Button variant="secondary">
            <Check />
            Salvar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
