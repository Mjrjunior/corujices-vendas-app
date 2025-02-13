import { Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { ProductsCreate } from "./products-create";

export function ProductsFilter() {
  return (
    <div className="flex justify-between">
      <form className="flex items-center gap-2">
        <span className="text-sm font-semibold">Filtros:</span>
        <Input placeholder="Nome do produto" className="h-8 w-[320px]" />
        <Button variant="secondary" size="sm" type="submit">
          <Search className="mr-2 h-4 w-4" />
          Filtrar resultados
        </Button>
        <Button variant="outline" size="sm" type="button">
          <X className="mr-2 h-4 w-4" />
          Remover filtros
        </Button>
      </form>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" size="sm" type="button">
            Adicionar Produto
          </Button>
        </DialogTrigger>
        <ProductsCreate />
      </Dialog>
    </div>
  );
}
