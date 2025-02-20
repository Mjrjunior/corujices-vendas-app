import { Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React from "react";

interface FilterFormProps {
  value: string;
  setValue: (value: string) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  handleClear: () => void;
  placeholder: string;
}

export const FilterForm: React.FC<FilterFormProps> = ({
  value,
  setValue,
  handleSubmit,
  handleClear,
  placeholder,
}) => {
  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2">
      <span className="text-sm font-semibold">Filtros:</span>
      <Input
        placeholder={placeholder}
        className="h-8 w-[320px]"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <Button variant="secondary" size="sm" type="submit">
        <Search className="mr-2 h-4 w-4" />
        Filtrar resultados
      </Button>
      <Button variant="outline" size="sm" type="button" onClick={handleClear}>
        <X className="mr-2 h-4 w-4" />
        Remover filtros
      </Button>
    </form>
  );
};
