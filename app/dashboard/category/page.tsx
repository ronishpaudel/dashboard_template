"use client";
import React from "react";
import { XIcon } from "lucide-react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { SideNavBar } from "@/app/component/side-nabar";
import Header from "@/app/component/header";
import { CategoryDialog } from "@/app/component/categoryDialog";
import { withAuth } from "@/utils/withAuth";
import { useCategoryQuery } from "@/app/component/hooks/getHooks/useCategoryQuery";
import { Button } from "@/components/ui/button";
import Loading from "@/app/loading";
import { useDeleteCategory } from "@/app/component/hooks/postHooks/useDeleteCategory";

const Page = () => {
  const { data: categories, isLoading, isError } = useCategoryQuery();
  const { mutate } = useDeleteCategory({ onSuccess() {}, onError() {} });

  if (isLoading) {
    return (
      <div>
        <Loading />
      </div>
    );
  }

  if (isError) {
    return <div>Error loading categories</div>;
  }
  const handleOnClick = (id: number) => {
    mutate(id);
  };
  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <SideNavBar />
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <Header />
        <main className="grid flex-1 items-center gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 ">
          <div className="flex items-center justify-between gap-2 w-full py-1">
            <div className="flex items-center gap-2">
              <div className="text-[18px] font-semibold">Store Categories</div>
            </div>
            <CategoryDialog />
          </div>
          <div className="border rounded-lg overflow-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Category</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {categories?.map((category) => (
                  <TableRow key={category.id}>
                    <TableCell className="font-medium">
                      {category.name}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        size="icon"
                        variant="destructive"
                        className="h-6 w-6"
                      >
                        <XIcon
                          className="h-4 w-4"
                          onClick={() => handleOnClick(category.id)}
                        />
                        <span className="sr-only">Delete</span>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </main>
      </div>
    </div>
  );
};

export default withAuth(Page);
