import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { api } from "@/services/api";
import { FormatPrice } from "@/utils/format-price";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

export function ProductsBody() {
  const [products, setProducts] = useState([]);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const name = searchParams.get("name");
    const fetchProducts = async () => {
      const response = await api.get(`/products`, {
        params: { name },
      });
      setProducts(response.data);
    };
    fetchProducts();
  }, [searchParams]);

  return (
    <>
      {products.map((product) => (
        <TableRow key={product.id}>
          <TableCell>{product.name}</TableCell>
          <TableCell>{product.color}</TableCell>
          <TableCell>{FormatPrice(product.price)}</TableCell>
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
