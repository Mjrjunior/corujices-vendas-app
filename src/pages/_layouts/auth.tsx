import { NavLink } from "@/components/nav-link";
import { Bird } from "lucide-react";
import { Outlet } from "react-router-dom";

export function AuthLayout() {
  return (
    <div className="grid min-h-screen grid-cols-2">
      <div className="flex h-full flex-col justify-between border-r border-foreground/5 bg-muted p-10 text-muted-foreground">
        <NavLink
          to="/signin"
          className="flex w-44 items-center gap-2 text-lg text-foreground"
        >
          <Bird className="h-6 w-6" />
          <span className="font-semibold">Junior</span>
        </NavLink>
        <footer className="text-sm">
          Painel de Vendas &copy; Junior - {new Date().getFullYear()}
        </footer>
      </div>
      <div className="flex h-full items-center justify-center">
        <Outlet />
      </div>
    </div>
  );
}
