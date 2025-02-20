import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { TableCell, TableRow } from "@/components/ui/table";
import { api } from "@/services/api";
import { FormatPrice } from "@/utils/format-price";
import { Eye } from "lucide-react";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

function formatDate(dateString) {
  const options = { year: "numeric", month: "2-digit", day: "2-digit" };
  return new Date(dateString).toLocaleDateString("pt-BR", options);
}

export function OrdersBody() {
  const [orders, setOrders] = useState([]);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const clientName = searchParams.get("clientName");
    const fetchOrders = async () => {
      const response = await api.get(`/orders`, {
        params: { clientName },
      });
      setOrders(response.data);
    };
    fetchOrders();
  }, [searchParams]);
  return (
    <>
      {orders.map((order) => (
        <TableRow key={order.id}>
          <TableCell>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                  <Eye size={18} />
                  <span className="sr-only">Detalhes do pedido</span>
                </Button>
              </DialogTrigger>
            </Dialog>
          </TableCell>
          <TableCell>{formatDate(order.createdAt)}</TableCell>
          <TableCell className="font-bold">{order.Client.name}</TableCell>
          <TableCell className="font-bold">
            {FormatPrice(order.value)}
          </TableCell>
          <TableCell>{order.status}</TableCell>
        </TableRow>
      ))}
    </>
  );
}
