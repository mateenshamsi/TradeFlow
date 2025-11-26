import React from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
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

const SUPPORTED_TRIGGERS: {
  label: string;
  value: TriggerType;
  metadata: NodeMetadata;
}[] = [
  {
    label: "Price Trigger",
    value: "trigger",
    metadata: { kind: "price-trigger" },
  },
  {
    label: "Timer Trigger",
    value: "trigger",
    metadata: { kind: "timer-trigger" },
  },
];

export function TriggerSheet({
  onSelect,
}: {
  onSelect: (value: TriggerType, metadata: NodeMetadata) => void;
}) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className="border px-3 py-1 rounded">Open Trigger Picker</button>
      </SheetTrigger>

      <SheetContent>
        <SheetHeader>
          <SheetTitle>Select Trigger</SheetTitle>
          <SheetDescription>
            Select the type of trigger you want to add.
          </SheetDescription>
        </SheetHeader>

        <Select
          onValueChange={(value) => {
            const trigger = SUPPORTED_TRIGGERS.find((t) => t.value === value);
            if (trigger) onSelect(trigger.value, trigger.metadata);
          }}
        >
          <SelectTrigger className="w-[180px]">
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

        <SheetFooter>
          <SheetClose asChild>
            <button className="border px-3 py-1 rounded">Close</button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
