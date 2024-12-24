"user client";

import { useCallback, useEffect, useState } from "react";
import { SelectImage } from "./SelectImage";
import { Button } from "../Button";
import { ImageType } from "@/@types/product-types";

interface SelectColorProps {
  item: ImageType;
  addImageToState: (value: ImageType) => void;
  removeImageFromState: (value: ImageType) => void;
  isProductCreated: boolean;
}

export const SelectColor = ({
  item,
  addImageToState,
  removeImageFromState,
  isProductCreated,
}: SelectColorProps) => {
  const [isSelected, setIsSelected] = useState<boolean>(false);
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    if (isProductCreated) {
      setIsSelected(false);
      setFile(null);
    }
  }, [isProductCreated]);

  const handleFileChange = useCallback(
    (value: File) => {
      setFile(value);
      addImageToState({ ...item, image: value });
    },
    [addImageToState, item]
  );

  const handleCheck = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setIsSelected(e.target.checked);

      if (!e.target.checked) {
        setFile(null);
        removeImageFromState(item);
      }
    },
    [item, removeImageFromState]
  );

  return (
    <>
      <div className=" grid grid-cols-1 overflow-y-auto border-b-[1.2px] border-zinc-200 items-center p-2 ">
        <div className=" flex flex-row gap-2 items-center h-[60px]">
          <input
            onChange={handleCheck}
            type="checkbox"
            id={item.color}
            checked={isSelected}
            className=" cursor-pointer"
          />
          <label htmlFor={item.color} className=" font-medium cursor-pointer">
            {item.color}
          </label>
        </div>
        <>
          {isSelected && !file && (
            <div className=" col-span-2 text-center">
              <SelectImage item={item} handleFileChange={handleFileChange} />
            </div>
          )}
          {file && (
            <div>
              <p>{file.name}</p>
              <div className=" flex flex-row gap-2 text-sm col-span-2 items-center justify-between">
                <div className=" w-[70px] my-2">
                  <Button
                    label="Cancel"
                    small
                    outline
                    onClick={() => {
                      setFile(null);
                      removeImageFromState(item);
                    }}
                  />
                </div>
              </div>
            </div>
          )}
        </>
      </div>
    </>
  );
};
