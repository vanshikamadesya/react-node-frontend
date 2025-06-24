import * as AlertDialog from "@radix-ui/react-alert-dialog";
import React from "react";

interface DeleteProductDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onDelete: () => void;
}

const DeleteProductDialog: React.FC<DeleteProductDialogProps> = ({ open, onOpenChange, onDelete }) => (
  <AlertDialog.Root open={open} onOpenChange={onOpenChange}>
    <AlertDialog.Portal>
      <AlertDialog.Overlay className="fixed inset-0 bg-black/50" />
      <AlertDialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <AlertDialog.Title className="text-lg font-semibold mb-2">
          Delete Product
        </AlertDialog.Title>
        <AlertDialog.Description className="text-gray-600 mb-4">
          Are you sure you want to delete this product?
        </AlertDialog.Description>
        <div className="flex justify-end space-x-2">
          <AlertDialog.Cancel asChild>
            <button className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300">
              Cancel
            </button>
          </AlertDialog.Cancel>
          <AlertDialog.Action asChild>
            <button
              onClick={onDelete}
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
            >
              Delete
            </button>
          </AlertDialog.Action>
        </div>
      </AlertDialog.Content>
    </AlertDialog.Portal>
  </AlertDialog.Root>
);

export default DeleteProductDialog; 