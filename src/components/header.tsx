import { Bird } from "lucide-react";
import { NavLink } from "./nav-link";
import { ModeToggle } from "./mode-toggle";
import { AccountMenu } from "./account-menu";
import { Separator } from "@radix-ui/react-separator";

export function Header() {
  return (
    <div className="border-b flex justify-around h-16 items-center gap-6 px-6">
      <div className="flex items-center gap-10">
        <Bird className="h-6 w-6" />

        <Separator orientation="vertical" className="h-6 border" />

        <nav className="flex gap-9 font-mono">
          <NavLink to="/" className="flex font-bold">
            Início
          </NavLink>
          <NavLink to="/orders" className="flex font-bold">
            Pedidos
          </NavLink>
          <NavLink to="/products" className="flex font-bold">
            Produtos
          </NavLink>
        </nav>
      </div>

      <div className=" flex gap-3">
        <ModeToggle />
        <AccountMenu />
      </div>
    </div>
  );
}
