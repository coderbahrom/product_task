import "./App.css";
import { useState } from "react";
import { useDisclosure } from "@nextui-org/react";
import ProductTable from "./components/ProductTable";
import CreateCategory from "./components/CreateCategory";
import CreateProduct from "./components/CreateProduct";
function App() {
  const { onOpen, onOpenChange, onClose } = useDisclosure();
  const [isOpen, setIsOpen] = useState(false);
  const [products, setProducts] = useState([]);
  return (
    <>
      {" "}
      <div className=" w-[100%] flex flex-col gap-4">
        <h1 className="text-3xl font-bold underline">All Products</h1>
        <div className="flex flex-col gap-4">
          <div className="flex gap-2 flex-end">
            <CreateCategory />

            <CreateProduct
              onOpenChange={onOpenChange}
              onOpen={onOpen}
              isOpen={isOpen}
              onClose={onClose}
              setIsOpen={setIsOpen}
              setProducts={setProducts}
            />
          </div>
          <ProductTable
            onOpen={onOpen}
            isOpen={isOpen}
            setProducts={setProducts}
            products={products}
          />
        </div>
      </div>
    </>
  );
}

export default App;
