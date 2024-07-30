import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function CategoryDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="link"
          className="text-white p-2 text-[14px] cursor-pointer rounded bg-orange-500 "
        >
          Add Category
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Category</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4  py-4">
          <div className="grid grid-cols-4 items-center grid-flow-col gap-4">
            <Label htmlFor="name" className="text-right">
              Category Name
              <span className="text-red-500">*</span>
            </Label>
            <Input
              id="name"
              placeholder="eg: Clothing"
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Save </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
