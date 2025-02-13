import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { api } from "@/services/api";
import { jwtDecode } from "jwt-decode";
import { useState } from "react";

export function ProductsCreate() {
  const [name, setName] = useState("");
  const [color, setColor] = useState("");
  const [price, setPrice] = useState(0);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const companyId = jwtDecode(token!).id;
    const data = { name, color, price, companyId };
    console.log(data);

    try {
      const response = await api.post("/products", data);

      if (response.status === 201) {
        console.log("Produto criado com sucesso");
        window.location.reload();
      } else {
        console.log("Erro ao criar produto");
      }
    } catch (error) {
      console.error("Erro ao criar produto", error);
    }
  };
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Cadastrar produto</DialogTitle>
        <DialogDescription>Criar um novo produto</DialogDescription>
      </DialogHeader>
      <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
        <Label htmlFor="name">Nome do produto</Label>
        <Input
          type="text"
          id="name"
          placeholder="Nome do produto"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Label htmlFor="color">Cor</Label>
        <Input
          type="text"
          id="color"
          placeholder="Cor"
          value={color}
          onChange={(e) => setColor(e.target.value)}
        />
        <Label htmlFor="price">Preço</Label>
        <Input
          type="number"
          step="0.01"
          id="price"
          placeholder="Preço"
          min="0"
          className="appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
          value={price}
          onChange={(e) => setPrice(parseFloat(e.target.value))}
        />
        <Button type="submit" className="h-8" variant="secondary">
          Adicionar
        </Button>
      </form>
    </DialogContent>
  );
}
