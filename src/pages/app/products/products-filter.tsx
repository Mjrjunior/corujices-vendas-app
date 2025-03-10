import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { ProductsCreate } from "./products-create";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { FilterForm } from "@/components/filter-form";

export function ProductsFilter() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [product, setProduct] = useState("");

  useEffect(() => {
    const name = searchParams.get("name");
    if (name) {
      setProduct(name);
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSearchParams({ name: product });
  };

  const handleClear = () => {
    setSearchParams({});
    setProduct("");
  };
  return (
    <div className="flex justify-between">
      <FilterForm
        value={product}
        setValue={setProduct}
        handleSubmit={handleSubmit}
        handleClear={handleClear}
        placeholder="Nome do produto"
      />
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
