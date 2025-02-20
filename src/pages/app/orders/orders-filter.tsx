import { FilterForm } from "@/components/filter-form";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { OrdersCreate } from "./orders-create";

export function OrdersFilter() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [order, setOrder] = useState("");

  useEffect(() => {
    const clientName = searchParams.get("clientName");
    if (clientName) {
      setOrder(clientName);
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSearchParams({ clientName: order });
  };

  const handleClear = () => {
    setSearchParams({});
    setOrder("");
  };

  return (
    <div className="flex justify-between">
      <FilterForm
        value={order}
        setValue={setOrder}
        handleSubmit={handleSubmit}
        handleClear={handleClear}
        placeholder="Nome do cliente"
      />
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" size="sm" type="button">
            Adicionar Pedido
          </Button>
        </DialogTrigger>
        <OrdersCreate />
      </Dialog>
    </div>
  );
}
