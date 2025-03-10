import { useState, useEffect } from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ScrollArea } from "./ui/scroll-area";
import { ecosystems } from "@/data/filterOptions";

export function EcosystemDropdown({ onChange }) {
  const [open, setOpen] = useState(false);
  const [selectedValues, setSelectedValues] = useState([]);

  useEffect(() => {
    onChange(selectedValues);
  }, [selectedValues, onChange]);

  const handleSelect = (currentValue) => {
    setSelectedValues((current) =>
      current.includes(currentValue)
        ? current.filter((value) => value !== currentValue)
        : [...current, currentValue]
    );
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="justify-between bg-[#151226]/70 text-white hover:bg-[#151226] hover:text-white border-[#151226]">
          <span>Ecosystem</span>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0 bg-[#151226]">
        <Command className="bg-[#151226] text-white">
          <CommandInput placeholder="Search" />
          <CommandList>
            <CommandEmpty>No Ecosystem found.</CommandEmpty>
            <ScrollArea className="h-[200px]">
              <CommandGroup className="text-white border-none">
                {ecosystems.map((ecosystem) => (
                  <CommandItem
                    key={ecosystem.value}
                    onSelect={() => handleSelect(ecosystem.value)}
                    className="cursor-pointer mr-2">
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        selectedValues.includes(ecosystem.value) ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {ecosystem.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </ScrollArea>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
