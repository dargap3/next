"use client";

import { useActionState } from "react";

import { Submit } from "@/components/submit";
import { editProduct, FormState } from "@/actions/products";

type Product = {
  id: number;
  title: string;
  price: number;
  description: string | null;
};

export const EditProductForm = ({ product }: { product: Product }) => {
  const initialState: FormState = {
    errors: {},
  };

  const editProductWithId = editProduct.bind(null, product.id);

  const [state, formAction, isPending] = useActionState(
    editProductWithId,
    initialState
  );

  return (
    <form className="p-4 space-y-4 max-w-96" action={formAction}>
      <div>
        <label className="text-white">
          Title
          <input
            type="text"
            className="block w-full p-2 text-black border rounded bg-amber-50"
            name="title"
            defaultValue={product.title}
          />
        </label>
        {state.errors.title && (
          <p className="text-red-500">{state.errors.title}</p>
        )}
      </div>

      <div>
        <label className="text-white">
          Price
          <input
            type="number"
            className="block w-full p-2 text-black border rounded bg-amber-50"
            name="price"
            defaultValue={product.price}
          />
        </label>
        {state.errors.price && (
          <p className="text-red-500">{state.errors.price}</p>
        )}
      </div>

      <div>
        <label className="text-white">
          Description
          <textarea
            className="block w-full p-2 text-black border rounded bg-amber-50"
            name="description"
            defaultValue={product.description ?? ""}
          />
        </label>
        {state.errors.description && (
          <p className="text-red-500">{state.errors.description}</p>
        )}
      </div>

      <Submit />

      <button
        type="submit"
        className="block w-full p-2 text-white bg-blue-500 rounded disabled:bg-gray-500"
        disabled={isPending}
      >
        Submit 2
      </button>
    </form>
  );
};
