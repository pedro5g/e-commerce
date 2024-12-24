"use client";

import { Button } from "@/app/components/Button";
import { Heading } from "@/app/components/Heading";
import { CategoryInput } from "@/app/components/inputs/CategoryInput";
import { CustomCheckbox } from "@/app/components/inputs/CustomCheckbox";
import { Input } from "@/app/components/inputs/Input";
import { SelectColor } from "@/app/components/inputs/SelectColor";
import { TextArea } from "@/app/components/inputs/TextArea";
import { categories } from "@/utils/categories";
import { colors } from "@/utils/colors";
import { useCallback, useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { firebaseApp } from "@/libs/firebase";
import axios from "axios";
import { useRouter } from "next/navigation";
import { ImageType, UploadedImageType } from "@/@types/product-types";

export const AddProductForm = () => {
  //router
  const router = useRouter();
  // states
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [images, SetImages] = useState<ImageType[] | null>(null);
  const [isProductCreated, setIsProductCreated] = useState<boolean>(false);

  //react-rook-form
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<FieldValues>({
    // set default values
    defaultValues: {
      name: "",
      description: "",
      brand: "",
      category: "",
      inStock: false,
      images: [],
      price: "",
    },
  });

  useEffect(() => {
    setCustomValue("images", images);
  }, [images]);

  useEffect(() => {
    if (isProductCreated) {
      reset();
      SetImages(null);
      setIsProductCreated(false);
    }
  }, [isProductCreated, reset]);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    //upload images to firebase
    //save product to mongodb

    setIsLoading(true);
    let uploadedImages: UploadedImageType[] = [];

    if (!data.category) {
      setIsLoading(false);
      return toast.error("Category is not selected");
    }
    if (!data.images || data.images.length === 0) {
      setIsLoading(false);
      return toast.error("No selected image!");
    }

    const handleImageUpload = async () => {
      toast("Creating product, please wait...");
      try {
        for (const item of data.images) {
          if (item.image) {
            const fileName = new Date().getTime() + "-" + item.image.name;
            const storage = getStorage(firebaseApp);
            const storageRef = ref(storage, `products/${fileName}`);
            const uploadTask = uploadBytesResumable(storageRef, item.image);

            await new Promise((resolve, reject) => {
              uploadTask.on(
                "state_changed",
                (snapshot) => {
                  const progress =
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                  console.log("Upload is " + progress + "% done");
                  switch (snapshot.state) {
                    case "paused":
                      console.log("Upload is paused");
                      break;
                    case "running":
                      console.log("Upload is running");
                      break;
                  }
                },
                (error) => {
                  console.log("Error uploading image", error);
                  reject(error);
                },
                () => {
                  getDownloadURL(uploadTask.snapshot.ref)
                    .then((downloadURL) => {
                      uploadedImages.push({
                        ...item,
                        image: downloadURL,
                      });
                      console.log("File available at", downloadURL);
                      resolve(uploadedImages);
                    })
                    .catch((err) => {
                      console.log("Error getting the download URl", err);
                      reject(err);
                    });
                }
              );
            });
          }
        }
      } catch (err) {
        setIsLoading(false);
        console.log("Error handling image upload", err);
        return toast.error("Error handling image upload");
      }
    };

    await handleImageUpload();
    const productData = { ...data, images: uploadedImages };

    axios
      .post("/api/product", productData)
      .then(() => {
        toast.success("Product created");
        setIsProductCreated(true);
        router.refresh();
      })
      .catch((err) => {
        toast.error("Something went wrong when saving product to db :(");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  const category = watch("category");

  const setCustomValue = (id: string, value: string | ImageType[] | null) => {
    setValue(id, value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  const addImageToState = useCallback((value: ImageType) => {
    SetImages((prev) => {
      if (!prev) {
        return [value];
      }

      return [...prev, value];
    });
  }, []);

  const removeImageFromState = useCallback((value: ImageType) => {
    SetImages((prev) => {
      if (prev) {
        const filteredImages = prev.filter(
          (item) => item.color !== value.color
        );
        return filteredImages;
      }
      return prev;
    });
  }, []);

  return (
    <>
      <Heading title="Add a Product" center />
      <Input
        id="name"
        label="Name"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="price"
        label="Price"
        disabled={isLoading}
        register={register}
        errors={errors}
        type="number"
        required
      />
      <Input
        id="brand"
        label="Brand"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <TextArea
        id="description"
        label="Description"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <CustomCheckbox
        id="inStock"
        label="This product is in stock ?"
        register={register}
      />
      <hr className=" w-full pt-2" />
      <div className="w-full font-medium">
        <p className="md-2 font-semibold">Select a Category</p>
        <div className=" grid grid-cols-2 mt-4 gap-2 md:grid-cols-3 max-h-[50vh] overflow-y-auto">
          {categories.map((item) => {
            if (item.label === "All") {
              return null;
            }
            return (
              <div key={item.label}>
                <CategoryInput
                  label={item.label}
                  icon={item.icon}
                  selected={category === item.label}
                  onClick={(category) => setCustomValue("category", category)}
                />
              </div>
            );
          })}
        </div>
      </div>
      <div className=" w-full flex flex-col flex-wrap gap-4">
        <div>
          <p className=" font-semibold">
            Select available product colors and upload image.
          </p>
          <p className=" text-sm">
            You must upload an image for each the color selected otherwise your
            color selection will be ignored
          </p>
        </div>
        <div className=" grid grid-cols-2 gap-2">
          {colors.map((item, index) => {
            return (
              <SelectColor
                key={index}
                item={item}
                addImageToState={addImageToState}
                removeImageFromState={removeImageFromState}
                isProductCreated={isProductCreated}
              />
            );
          })}
        </div>
      </div>
      <hr className=" w-full pt-2" />
      <Button
        label={isLoading ? "Loading..." : "Add Product"}
        onClick={handleSubmit(onSubmit)}
      />
    </>
  );
};
