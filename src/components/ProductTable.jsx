/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Tooltip,
} from "@nextui-org/react";
import { EditIcon } from "./EditIcons";
import { DeleteIcon } from "./DeleteIcon";
import CreateProduct from "./CreateProduct";

export default function ProductTable({ onOpen, setProducts, products }) {
  const [editProductIndex, setEditProductIndex] = useState(null);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("products")) || [];
    setProducts(data);
  }, []);

  const onDelete = (index) => {
    const updatedProducts = products.filter((_, i) => i !== index);
    localStorage.setItem("products", JSON.stringify(updatedProducts));
    setProducts(updatedProducts);
  };

  const onUpdate = (index) => {
    onOpen();

    setEditProductIndex(index);
  };

  return (
    <>
      <Table aria-label="Product table">
        <TableHeader>
          <TableColumn>Name</TableColumn>
          <TableColumn>Price</TableColumn>
          <TableColumn>Category</TableColumn>
          <TableColumn>Description</TableColumn>
          <TableColumn>Actions</TableColumn>
        </TableHeader>
        <TableBody>
          {products.map((product, index) => (
            <TableRow key={index}>
              <TableCell className="text-left">{product.product}</TableCell>
              <TableCell className="text-left">{product.price}</TableCell>
              <TableCell className="text-left">{product.category}</TableCell>
              <TableCell className="text-left">{product.description}</TableCell>
              <TableCell>
                <div className="relative flex items-center gap-2">
                  <Tooltip content="Edit product">
                    <span
                      className="text-lg text-default-400 cursor-pointer active:opacity-50"
                      onClick={() => onUpdate(index)}
                    >
                      <EditIcon />
                    </span>
                  </Tooltip>
                  <Tooltip color="danger" content="Delete product">
                    <span
                      className="text-lg text-danger cursor-pointer active:opacity-50"
                      onClick={() => onDelete(index)}
                    >
                      <DeleteIcon />
                    </span>
                  </Tooltip>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {editProductIndex !== null && (
        <CreateProduct
          setProducts={setProducts}
          product={
            editProductIndex !== null ? products[editProductIndex] : null
          }
          onUpdate={() => setEditProductIndex(null)}
        />
      )}
    </>
  );
}
