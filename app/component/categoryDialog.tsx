import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCreateCategory } from "./hooks/postHooks/useCreateCategory";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

export function CategoryDialog() {
  const [data, setData] = useState<string>("");
  const [isOpen, setIsOpen] = useState(false);
  const queryClient = useQueryClient();
  const { mutate, isPending } = useCreateCategory({
    onSuccess: () => {
      setIsOpen(false);
      setData("");
    },
    onError: (error) => {
      console.error("Error creating category:", error);
    },
  });

  function onClickMutate() {
    if (data.trim()) {
      mutate(data);
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="link"
          className="text-white p-2 text-[14px] cursor-pointer rounded bg-orange-500"
          onClick={() => setIsOpen(true)}
        >
          Add Category
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Category</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center grid-flow-col gap-4">
            <Label htmlFor="name" className="text-right">
              Category Name
              <span className="text-red-500">*</span>
            </Label>
            <Input
              id="name"
              placeholder="e.g., Clothing"
              className="col-span-3"
              value={data}
              onChange={(e) => setData(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={onClickMutate} disabled={isPending}>
            {isPending ? "Saving..." : "Save"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
