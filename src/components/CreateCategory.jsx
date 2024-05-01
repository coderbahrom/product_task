import { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
} from "@nextui-org/react";
function CreateCategory() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [category, setCategory] = useState("");

  const categories = localStorage.getItem("categories")?.split(",");

  const onCreate = () => {
    if (categories) {
      categories.push(category);
      localStorage.setItem("categories", categories);
    } else {
      localStorage.setItem("categories", [category]);
    }
  };

  return (
    <div>
      <Button onPress={onOpen} color="primary">
        Create category
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Modal Title
              </ModalHeader>
              <ModalBody>
                <Input
                  type="text"
                  label="Category"
                  onChange={(e) => setCategory(e.target.value)}
                  //   placeholder="Enter your email"
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button
                  color="success"
                  onPress={onClose}
                  onClick={onCreate}
                  className="text-[#FFFFFF]"
                >
                  Create
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}

export default CreateCategory;
