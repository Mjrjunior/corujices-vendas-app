import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { api } from "@/services/api";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";

interface Product {
  id: string;
  name: string;
  color?: string;
  price: number;
}

interface CartItem extends Product {
  quantity: number;
}

export function OrdersCreate() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [fantasyName, setFantasyName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [phone, setPhone] = useState("");
  const [cpf, setCpf] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await api.get("/products");
      setProducts(response.data);
    };
    fetchProducts();
  }, []);

  const handleAddToCart = () => {
    if (selectedProduct) {
      const product = products.find((p) => p.id === selectedProduct);
      if (product) {
        setCartItems([...cartItems, { ...product, quantity: 1 }]);
        setSelectedProduct(null);
        console.log(cartItems);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const companyId = jwtDecode(token!).id;
    const orderItems = cartItems.map((item) => ({
      productName: item.name,
      quantity: item.quantity,
      price: item.price,
      color: item.color,
      productId: item.id,
    }));

    const client = {
      name,
      email,
      nameFantasy: fantasyName,
      dateBirth: new Date(birthDate),
      phone,
      cpf,
      cnpj,
    };
    const data = {
      client,
      orderItems,
      companyId,
    };
    console.log(data);

    try {
      const response = await api.post("/orders", data);

      if (response.status === 201) {
        console.log("Pedido criado com sucesso");
        window.location.reload();
      } else {
        console.log("Erro ao criar pedido");
      }
    } catch (error) {
      console.error("Erro ao criar pedido", error);
    }
  };

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Cadastrar pedido</DialogTitle>
        <DialogDescription>Criar um novo pedido</DialogDescription>
      </DialogHeader>
      <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
        <Label htmlFor="clientName">
          Nome do Cliente <span className="text-green-500">*</span>
        </Label>
        <Input
          type="text"
          id="clientName"
          placeholder="Nome do cliente"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Label htmlFor="email">
          Email <span className="text-green-500">*</span>
        </Label>
        <Input
          type="email"
          id="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Label htmlFor="fantasyName">Nome da Empresa</Label>
        <Input
          type="text"
          id="fantasyName"
          placeholder="Nome da Empresa"
          value={fantasyName}
          onChange={(e) => setFantasyName(e.target.value)}
        />
        <div className="flex gap-3 ">
          <div className="flex flex-col gap-2">
            <Label htmlFor="birthDate">Data de nascimento</Label>
            <Input
              type="date"
              id="birthDate"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="phone">
              Telefone <span className="text-green-500">*</span>
            </Label>
            <Input
              type="tel"
              id="phone"
              placeholder="Telefone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
        </div>
        <div className="flex gap-3 ">
          <div className="flex flex-col gap-2">
            <Label htmlFor="cpf">CPF</Label>
            <Input
              type="text"
              id="cpf"
              placeholder="CPF"
              value={cpf}
              onChange={(e) => setCpf(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="cnpj">CNPJ</Label>
            <Input
              type="text"
              id="cnpj"
              placeholder="CNPJ"
              value={cnpj}
              onChange={(e) => setCnpj(e.target.value)}
            />
          </div>
        </div>
        <Separator orientation="horizontal" className="h-6 border" />
        <div className="flex gap-3 items-center">
          <Select value={selectedProduct} onValueChange={setSelectedProduct}>
            <SelectTrigger className="w-[260px]">
              <SelectValue placeholder="Selecione o produto" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Produtos</SelectLabel>
                {products.map((product) => (
                  <SelectItem key={product.id} value={product.id}>
                    {product.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <Button
            type="button"
            className="h-8"
            variant="secondary"
            onClick={handleAddToCart}
          >
            Adicionar
          </Button>
        </div>
        <DialogTitle>Itens do pedido</DialogTitle>
        <div className="flex gap-3 font-medium text-sm">
          <div className="w-1/2">Produto</div>
          <div className="w-1/4">Cor</div>
          <div className="w-1/4">Preço</div>
          <div className="w-1/8">Qtd</div>
        </div>
        {cartItems.map((item, index) => (
          <div key={index} className="flex gap-3">
            <Input
              type="text"
              value={item.name}
              className="w-1/2 font-bold"
              readOnly
            />
            <Input
              type="text"
              value={item.color}
              className="w-1/4 font-bold"
              readOnly
            />
            <Input
              type="text"
              value={`R$ ${item.price.toFixed(2)}`}
              className="w-1/4 font-bold"
              readOnly
            />
            <Input
              type="number"
              value={item.quantity}
              className="w-1/8 font-bold appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
              onChange={(e) => {
                const newQuantity = parseInt(e.target.value, 10);
                setCartItems((prevItems) =>
                  prevItems.map((cartItem, i) =>
                    i === index
                      ? { ...cartItem, quantity: newQuantity }
                      : cartItem
                  )
                );
              }}
            />
          </div>
        ))}
        <Button type="submit" className="h-8" variant="secondary">
          Finalizar pedido
        </Button>
      </form>
    </DialogContent>
  );
}
