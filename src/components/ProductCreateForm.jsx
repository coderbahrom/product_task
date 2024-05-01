/* eslint-disable react/prop-types */
import { Input, Select, SelectItem, Textarea } from "@nextui-org/react";

function ProductCreateForm({ register, errors }) {
  const categories = localStorage.getItem("categories")?.split(",") || [];

  return (
    <>
      <Input
        {...register("product", { required: "Product title is required" })}
        type="text"
        label="Product title"
        //   placeholder="Enter your email"
      />{" "}
      {errors?.product && (
        <p role="alert" className="text-[#eb5757] text-[14px]">
          {errors?.product?.message}
        </p>
      )}
      <Input
        {...register("price", { required: "Price is required" })}
        type="number"
        label="Price"
        placeholder="0.00"
        labelPlacement="outside"
        startContent={
          <div className="pointer-events-none flex items-center">
            <span className="text-default-400 text-small">$</span>
          </div>
        }
      />
      {errors?.price && (
        <p role="alert" className="text-[#eb5757] text-[14px]">
          {errors?.price?.message}
        </p>
      )}
      <Select
        {...register("category", { required: "Category is required" })}
        label="Category"
        placeholder="Select category"
        // selectionMode="multiple"
        // className="max-w-xs"
      >
        {categories.map((item) => (
          <SelectItem key={item} value={item}>
            {item}
          </SelectItem>
        ))}
      </Select>
      {errors?.category && (
        <p role="alert" className="text-[#eb5757] text-[14px]">
          {errors?.category?.message}
        </p>
      )}
      <Textarea
        {...register("description")}
        label="Description"
        placeholder="Enter your description"
      />
    </>
  );
}

export default ProductCreateForm;
