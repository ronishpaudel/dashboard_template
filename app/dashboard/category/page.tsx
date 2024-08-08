"use client";
import React, { useState } from "react";

import { ArrowLeft, Trash2 } from "lucide-react";
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
import { useRouter } from "next/navigation";
import { CategoryDialog } from "@/app/component/categoryDialog";
import withAuth from "@/utils/withAuth";

const Page = () => {
  const { back } = useRouter();
  // Dummy data
  const [data, setData] = useState([
    {
      id: "1",
      name: "Technology",
    },
    { id: "2", name: "Life Style" },
  ]);

  const handleDeleteRow = (id: string) => {
    setData(data.filter((item) => item.id !== id));
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
          <Table className="rounded-[10px]">
            <TableCaption>A list of your categories.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>
                    <Trash2
                      className="text-red-400 cursor-pointer w-[20px]"
                      onClick={() => handleDeleteRow(row.id)}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </main>
      </div>
    </div>
  );
};

export default withAuth(Page);
