import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ProductsBody } from "./products-body";
import { ProductsFilter } from "./products-filter";

export function Products() {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-3xl font-bold tracking-tight">Produtos</h1>

      <div className="space-y-4">
        <ProductsFilter />
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Cor</TableHead>
                <TableHead>Preço</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <ProductsBody />
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
