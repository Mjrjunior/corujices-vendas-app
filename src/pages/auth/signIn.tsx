import { NavLink } from "@/components/nav-link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { api } from "@/services/api";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = { email, password };

    try {
      const response = await api.post("/auth/login", data);

      if (response.status === 201) {
        localStorage.setItem("token", response.data.access_token);
        navigate("/products");
      } else {
        console.log("Erro ao fazer login");
      }
    } catch (error) {
      console.error("Erro ao fazer login", error);
    }
  };
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Login</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="Email">Email</Label>
              <Input
                id="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="password">Senha</Label>
              <Input
                id="password"
                placeholder="Senha"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button type="submit">Entrar</Button>
          <NavLink to="/signup">Criar conta</NavLink>
        </CardFooter>
      </form>
    </Card>
  );
}
