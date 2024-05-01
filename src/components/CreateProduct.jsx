/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";
import { useForm } from "react-hook-form";
import ProductCreateForm from "./ProductCreateForm";

function CreateProduct({ product, onUpdate, setProducts }) {
  const [isOpen, setIsOpen] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm();

  useEffect(() => {
    setIsOpen(!!product);
    if (product) {
      setValue("product", product.product);
      setValue("price", product.price);
      setValue("category", product.category);
      setValue("description", product.description);
      // Set other form values accordingly
    } else {
      reset();
    }
  }, [product, setValue, reset]);

  const handleClose = () => {
    setIsOpen(false);
    onUpdate();
  };

  const onSubmit = (data) => {
    const productData = { ...data };
    let updatedProducts = JSON.parse(localStorage.getItem("products")) || [];
    if (product) {
      // Update existing product
      updatedProducts = updatedProducts.map((item) =>
        item.product === product.product ? productData : item
      );
    } else {
      // Add new product
      updatedProducts.push(productData);
    }
    setProducts(updatedProducts);
    localStorage.setItem("products", JSON.stringify(updatedProducts));
    handleClose();
  };

  return (
    <>
      <Button
        onPress={() => setIsOpen(true)}
        color="success"
        className="text-[#FFFFFF]"
      >
        {product ? "Edit Product" : "Create Product"}
      </Button>
      <Modal isOpen={isOpen} onOpenChange={setIsOpen}>
        <ModalContent>
          <form
            className="flex flex-col gap-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            <ModalHeader className="flex flex-col gap-1">
              {product ? "Edit Product" : "Create Product"}
            </ModalHeader>
            <ModalBody>
              <ProductCreateForm register={register} errors={errors} />
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={handleClose}>
                Close
              </Button>
              <Button color="success" type="submit" className="text-[#FFFFFF]">
                {product ? "Update" : "Create"}
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
}

export default CreateProduct;
