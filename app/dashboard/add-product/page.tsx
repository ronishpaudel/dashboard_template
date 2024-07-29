"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { PanelLeftIcon } from "lucide-react";
import NavBar from "@/app/component/navbar";
import { SideNavBar } from "@/app/component/side-nabar";
import dynamic from "next/dynamic";
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import Header from "@/app/component/header";
// Dynamically import MDEditor to avoid SSR issues
const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

export default function Component() {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState<string | undefined>("");

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      setSelectedImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <SideNavBar />
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <Header />
        <main className="grid flex-1 items-center gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 ">
          <div className="grid auto-rows-max items-center gap-4 md:gap-8 lg:col-span-2">
            <div className="flex flex-col gap-4">
              <div>
                <label className="font-sans font-semibold text-[18px]">
                  Title<span className="text-red-500">*</span>
                </label>
                <Input
                  placeholder="Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div>
                <label className="font-sans font-semibold text-[18px]">
                  Image<span className="text-red-500">*</span>
                </label>
                <div
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  className="border-dashed border-2 border-gray-400 p-4 rounded-md h-full"
                >
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="image-upload"
                  />
                  <label
                    htmlFor="image-upload"
                    className="flex flex-col items-center justify-center cursor-pointer"
                  >
                    {preview ? (
                      <img
                        src={preview}
                        alt="Selected"
                        className="max-w-full h-auto object-cover"
                      />
                    ) : (
                      <div className="text-center flex justify-center h-full w-full">
                        <p>
                          Drag and drop an image here, or click to select an
                          image
                        </p>
                      </div>
                    )}
                  </label>
                </div>
              </div>
              <div>
                <label className="font-sans font-semibold text-[18px]">
                  Description<span className="text-red-500">*</span>
                </label>
                <MDEditor
                  value={description}
                  onChange={setDescription}
                  height={400}
                  style={{ background: "#ffff", color: "black" }}
                />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
