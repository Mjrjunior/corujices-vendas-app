import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { api } from "@/services/api";
import { useEffect, useState } from "react";

export function ProductsBody() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    api.get("/products").then((response) => {
      setProducts(response.data);
    });
  }, []);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(price);
  };

  return (
    <>
      {products.map((product) => (
        <TableRow key={product.id}>
          <TableCell>{product.name}</TableCell>
          <TableCell>{product.color}</TableCell>
          <TableCell>{formatPrice(product.price)}</TableCell>
          <TableCell className="flex justify-end">
            <Button variant="outline" size="sm" className="">
              Editar
            </Button>
          </TableCell>
        </TableRow>
      ))}
    </>
  );
}
