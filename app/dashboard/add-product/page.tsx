"use client";
import { ArrowLeft, Plus } from "lucide-react";
import React, { useState, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDropzone } from "react-dropzone";
import { SideNavBar } from "@/app/component/side-nabar";
import Header from "@/app/component/header";
import { RichTextEditor } from "@mantine/rte";

interface IFormValues {
  productName: string;
  description: string;
  sellingPrice: number;
  crossedPrice?: number;
  quantity: number;
  productSku: number;
  productImages: File[];
  categories: string;
  variant: string;
  size: string[];
  status: string;
}

const schema = z
  .object({
    productName: z.string().min(2, "This field is required").max(20),
    description: z.string().min(20, "Minimum 20 characters required"),
    sellingPrice: z.number().min(1),
    crossedPrice: z.number().optional(),
    quantity: z.number().min(1),
    productSku: z.number().min(1),
    productImages: z.array(z.instanceof(File)),
    categories: z.string().min(2).max(20),
    variant: z.string().min(2).max(20),
    size: z.array(z.string().min(1)).nonempty("At least one size is required"),
    status: z.enum(["Active", "Draft"]),
  })
  .required();

const Page = () => {
  const { back } = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<IFormValues>({
    resolver: zodResolver(schema),
  });

  const [productImages, setProductImages] = useState<File[]>([]);
  const [sizes, setSizes] = useState<string[]>([]);
  const [sizeInput, setSizeInput] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setProductImages((prevImages) => [...prevImages, ...acceptedFiles]);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".gif", ".jpeg", ".jpg"],
    },
    multiple: true, // Allow multiple file selection
  });

  const clearImage = (index: number) => {
    const updatedImages = [...productImages];
    updatedImages.splice(index, 1);
    setProductImages(updatedImages);
  };

  const addSize = () => {
    if (sizeInput && !sizes.includes(sizeInput)) {
      setSizes([...sizes, sizeInput]);
      setSizeInput(""); // Clear the input field
    }
  };

  const removeSize = (sizeToRemove: string) => {
    setSizes(sizes.filter((size) => size !== sizeToRemove));
  };

  const handleSizeKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" || event.key === ",") {
      event.preventDefault();
      addSize();
    }
  };

  const handleSizeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSizeInput(event.target.value);
  };

  const onSubmit: SubmitHandler<IFormValues> = (data) => {
    data.size = sizes;
    data.productImages = productImages;
    data.description = description;
    alert(JSON.stringify(data));
  };

  useEffect(() => {
    setValue("size", sizes);
  }, [sizes, setValue]);

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <SideNavBar />
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <Header />
        <main className="grid flex-1 items-center gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 ">
          <div className="flex items-center justify-between gap-2 w-full py-1">
            <div className="flex items-center gap-2">
              <ArrowLeft className="text-orange-500" onClick={back} />
              <div className="text-[18px] font-semibold">Add Product</div>
            </div>
            {/* <div className="text-violet-300 p-1 border rounded border-violet-200 opacity-75">
              Bulk upload
            </div> */}
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="text-[16px] font-medium py-2"
          >
            <div className="flex w-full gap-4 sm:gap-10 sm:flex-row flex-col mt-4 sm:mt-0">
              <div className="flex flex-col gap-4 w-full sm:w-[50%]">
                <div className="border border-gray-300 rounded-xl px-2 py-4">
                  <div className="flex flex-col gap-2">
                    <label>
                      Product Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      {...register("productName", { required: true })}
                      className="border-gray-300 border rounded p-1"
                    />
                    {errors.productName && (
                      <p className="text-red-400 text-[12px]">
                        {errors.productName?.message}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-col gap-2">
                    <label>
                      Description <span className="text-red-500">*</span>
                    </label>
                    <RichTextEditor
                      id="rte"
                      value={description}
                      onChange={setDescription}
                      controls={[
                        ["bold", "italic", "underline"],
                        ["unorderedList", "orderedList"],
                        ["link", "image", "blockquote"],
                        ["alignLeft", "alignCenter", "alignRight"],
                      ]}
                      className="border-gray-300 border rounded p-1"
                    />
                    {errors.description && (
                      <p className="text-red-400 text-[12px]">
                        {errors.description?.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="border border-gray-300 rounded-xl px-2 py-4">
                  <div className="flex flex-col gap-2">
                    <label>
                      Selling Price <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      {...register("sellingPrice", { required: true })}
                      className="border-gray-300 border rounded p-1"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="line-through">Crossed Price</label>
                    <input
                      type="number"
                      {...register("crossedPrice")}
                      className="border-gray-300 border rounded p-1"
                    />
                  </div>
                </div>

                <div className="border border-gray-300 rounded-xl px-2 py-4">
                  <div className="flex flex-col gap-2">
                    <label>Quantity</label>
                    <input
                      type="number"
                      {...register("quantity", { required: true })}
                      className="border-gray-300 border rounded p-1"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label>Product SKU</label>
                    <input
                      type="number"
                      {...register("productSku", { required: true })}
                      className="border-gray-300 border rounded p-1"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label>
                      Status <span className="text-red-500">*</span>
                    </label>
                    <select
                      {...register("status", { required: true })}
                      className="border-gray-300 border rounded p-1"
                    >
                      <option value="Active">Active</option>
                      <option value="Draft">Draft</option>
                    </select>
                    {errors.status && (
                      <p className="text-red-400 text-[12px]">
                        {errors.status?.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-4 w-full sm:w-[50%]">
                <div className="border border-gray-300 rounded-xl p-4">
                  <div className="flex flex-col gap-2">
                    <label>
                      Product Images <span className="text-red-500">*</span>
                    </label>
                    {productImages.length > 0 ? (
                      <div className="flex gap-2 mt-2 flex-wrap">
                        {productImages.map((file, index) => (
                          <div key={index} className="relative">
                            <img
                              src={URL.createObjectURL(file)}
                              alt={`preview-${index}`}
                              className="w-20 h-20 object-cover rounded"
                            />
                            <button
                              type="button"
                              className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                              onClick={() => clearImage(index)}
                            >
                              X
                            </button>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div
                        {...getRootProps()}
                        className="border border-dashed border-gray-300 rounded p-4 text-center"
                      >
                        <input {...getInputProps()} />
                        <p className="text-gray-500">
                          Drag and drop images here, or click to select files
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="border border-gray-300 rounded-xl p-4">
                  <div className="flex flex-col gap-2">
                    <label>Categories</label>
                    <input
                      {...register("categories", { required: true })}
                      className="border-gray-300 border rounded p-1"
                    />
                    {errors.categories && (
                      <p className="text-red-400 text-[12px]">
                        {errors.categories?.message}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-col gap-2">
                    <label>Variant</label>
                    <input
                      {...register("variant", { required: true })}
                      className="border-gray-300 border rounded p-1"
                    />
                    {errors.variant && (
                      <p className="text-red-400 text-[12px]">
                        {errors.variant?.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="border border-gray-300 rounded-xl p-4">
                  <div className="flex flex-col gap-2">
                    <label>
                      Size <span className="text-red-500">*</span>
                    </label>
                    <input
                      value={sizeInput}
                      onChange={handleSizeChange}
                      onKeyDown={handleSizeKeyDown}
                      className="border-gray-300 border rounded p-1"
                      placeholder="Enter size and press Enter"
                    />
                    {errors.size && (
                      <p className="text-red-400 text-[12px]">
                        {errors.size?.message}
                      </p>
                    )}
                    <div className="flex flex-wrap gap-2 mt-2">
                      {sizes.map((size) => (
                        <div
                          key={size}
                          className="flex items-center gap-1 border border-gray-300 rounded p-1"
                        >
                          <span>{size}</span>
                          <button
                            type="button"
                            className="text-red-500"
                            onClick={() => removeSize(size)}
                          >
                            x
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end mt-4">
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Submit
              </button>
            </div>
          </form>
        </main>
      </div>
    </div>
  );
};

export default Page;
