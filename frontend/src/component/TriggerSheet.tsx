import { useState } from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "../components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
} from "../components/ui/select";
type NodeMetadata = any;
import type { TriggerType } from "./CreateWorkflow";
import { Input } from "@/components/ui/input";

const SUPPORTED_TRIGGERS = [
  {
    label: "Price Trigger",
    value: "price-trigger" as TriggerType,
    metadata: { kind: "price-trigger" },
  },
  {
    label: "Timer Trigger",
    value: "timer" as TriggerType,
    metadata: { kind: "timer-trigger" },
  },
];

const SUPPORTED_ASSETS = ["ETH", "BTC", "SOL", "USDC"];
export function TriggerSheet({
  onSelect,
}: {
  onSelect: (value: TriggerType, metadata: NodeMetadata) => void;
}) {
  const [selectedTrigger, setSelectedTrigger] = useState<string | null>(null);
  const [metadata, setMetadata] = useState<NodeMetadata>({
    asset: SUPPORTED_ASSETS[0],
    price: "",
  });

  const handleAdd = () => {
    if (!selectedTrigger) return;
    onSelect(selectedTrigger as TriggerType, metadata);
  };

  return (
    <Sheet open={true}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Select Trigger</SheetTitle>
          <SheetDescription>
            Select the type of trigger you want to add.
            {selectedTrigger}
          </SheetDescription>
        </SheetHeader>

        <Select
          value={selectedTrigger || undefined}
          onValueChange={(value) => setSelectedTrigger(value)}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select trigger" />
          </SelectTrigger>

          <SelectContent>
            <SelectGroup>
              {SUPPORTED_TRIGGERS.map((trigger) => (
                <SelectItem key={trigger.label} value={trigger.value}>
                  {trigger.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>

        {selectedTrigger === "timer" && (
          <div className="mt-4">
            Number of seconds until trigger:
            <Select value={metadata.seconds} onValueChange={(value) =>
              setMetadata((m: NodeMetadata) => ({ ...m, seconds: value }))
            }>
              <SelectTrigger className="w-full mt-2">
                <SelectValue placeholder="Select seconds" />
              </SelectTrigger>   
              <SelectContent>
                <SelectGroup>
                  {[10,30,60,300,600,1800,3600].map((seconds) => (  
                    <SelectItem key={seconds} value={seconds.toString()}>
                      {seconds} seconds
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select> 
          </div>
        )}

        {selectedTrigger === "price-trigger" && (
          <div>
            <label className="block mb-1">Price:</label>
            <Input
              type="number"
              className="w-full mb-2"
              value={metadata.price}
              onChange={(e) =>
                setMetadata((m: NodeMetadata) => ({ ...m, price: e.target.value }))
              }
            />
            <Select
              value={metadata.asset}
              onValueChange={(value) =>
                setMetadata((m: NodeMetadata) => ({ ...m, asset: value }))
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select an asset" />
              </SelectTrigger>

              <SelectContent>
                <SelectGroup>
                  {SUPPORTED_ASSETS.map((asset) => (
                    <SelectItem key={asset} value={asset}>
                      {asset}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        )}

        <SheetFooter>
          <SheetClose asChild>
            <button className="border px-3 py-1 rounded">Close</button>
          </SheetClose>
          <button
            onClick={handleAdd}
            className="ml-2 bg-blue-600 text-white px-3 py-1 rounded"
          >
            Add Trigger
          </button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
