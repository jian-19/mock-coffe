import { Button } from "@/components/ui/button";
import { Coffee, CupSoda, Sandwich } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center gap-8">
      <h1 className="text-4xl font-bold text-center">
        Página de Administrador do Koffi
      </h1>
      <div className="flex gap-4">
        <Button className="w-fit" asChild>
          <Link href="/items/snacks">
            <Sandwich className="!h-8 !w-8" />
            Lanches
          </Link>
        </Button>
        <Button className="w-fit" asChild>
          <Link href="/items/cold_drinks">
            <CupSoda className="!h-8 !w-8" />
            Bebidas
            <br />
            Geladas
          </Link>
        </Button>
        <Button className="w-fit" asChild>
          <Link href="/items/hot_drinks">
            <Coffee className="!h-8 !w-8" />
            Bebidas
            <br />
            Quentes
          </Link>
        </Button>
      </div>
    </div>
  );
}
