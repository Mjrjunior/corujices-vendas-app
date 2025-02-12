import { Bird } from "lucide-react";
import { NavLink } from "./nav-link";
import { ModeToggle } from "./mode-toggle";
import { AccountMenu } from "./account-menu";
import { Separator } from "./ui/separator";

export function Header() {
  return (
    <div className="border-b flex justify-around h-16 items-center gap-6 px-6">
      <div className="flex items-center gap-6">
        <Bird className="h-6 w-6" />

        <Separator orientation="vertical" className="h-6 border" />

        <nav className="flex items-center space-x-4 lg:space-x-6">
          <NavLink to="/" className="flex gap-2 font-medium">
            Início
          </NavLink>
          <NavLink to="/orders" className="flex gap-2 font-medium">
            Pedidos
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
