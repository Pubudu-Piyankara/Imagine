"use client";
import React, { useEffect, useState, useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { config, title } from "process";
import { CustomField } from "./CustomField";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../ui/select";
import { aspectRatioOptions, creditFee, transformationTypes } from "@/constants";
import { AspectRatioKey, debounce, deepMergeObjects } from "@/lib/utils";
import MediaUploader from "./MediaUploader";
import { getUserById, updateCredits } from "@/lib/actions/user.actions";
import { updateImage } from "@/lib/actions/image.actions";
import TransformImage from "./TransformImage";
import { addImage } from "@/lib/actions/image.actions";
import { getCldImageUrl } from "next-cloudinary";
import { useRouter } from "next/navigation";
import CreditBalanceAlert from "./CreditBalanceAlert";

export const formSchema = z.object({
  title: z.string(),
  aspectRatio: z.string().optional(),
  color: z.string().optional(),
  publicId: z.string().optional(),
  prompt: z.string(),
});

type Props = {};

const TransformationForm = ({
  data = null,
  action,
  type,
  creditBalance,
  userId,
}: TransformationFormProps) => {
  const transformationType = transformationTypes[type];
  const [image, setImage] = useState(data);
  const [newTransform, setNewTransform] = useState<Transformations | null>(
    null
  );
  const [isTransforming, setIsTransforming] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [transformConfig, setTransformConfig] = useState(config);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const defaultValue =
    data && action === "Update"
      ? {
          title: data?.title,
          aspectRatio: data?.aspectRatio,
          color: data?.color,
          prompt: data?.prompt,
          publicId: data?.publicId,
        }
      : {
          title: "",
          aspectRatio: "",
          color: "",
          prompt: "",
          publicId: "",
        };

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValue,
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);

    if (data || image) {
      const transformationUrl = getCldImageUrl({
        width: image?.width,
        height: image?.height,
        src: image?.publicId,
        ...transformConfig,
      });

      const imageData = {
        title: values.title,
        publicId: image?.publicId,
        transformationType: type,
        width: image?.width,
        height: image?.height,
        config: transformConfig,
        secureURL: image?.secureURL,
        transformationURL: transformationUrl,
        aspectRatio: values.aspectRatio,
        prompt: values.prompt,
        color: values.color,
      };

      if (action === "Add") {
        try {
          const newImage = await addImage({
            image: imageData,
            userId,
            path: "/",
          });

          if (newImage) {
            form.reset();
            setImage(data);
            router.push(`/transformation/${newImage._id}`);
          }
        } catch (error) {
          console.log(error);
        }
      }

      if (action === "Update") {
        try {
          const updatedImage = await updateImage({
            image: {
              ...imageData,
              _id: data._id,
            },
            userId,
            path: `/transformation/${data._id}`,
          });

          if (updatedImage) {
            router.push(`/transformation/${updatedImage._id}`);
          }
        } catch (error) {
          console.log(error);
        }
      }
    }

    setIsSubmitting(false);
  }

  const onSelectHandler = (
    value: string,
    onChangeField: (value: string) => void
  ) => {
    const imageSize = aspectRatioOptions[value as AspectRatioKey];

    setImage((prevState: any) => ({
      ...prevState,
      aspectRatio: imageSize.aspectRatio,
      width: imageSize.width,
      height: imageSize.height,
    }));

    setNewTransform(transformationType.config);

    return onChangeField(value);
  };

  const onInputHandler = (
    fieldName: string,
    value: string,
    type: string,
    onChangeField: (value: string) => void
  ) => {
    debounce(() => {
      setNewTransform((prevState: any) => ({
        ...prevState,
        [type]: {
          ...prevState?.[type],
          [fieldName === "prompt" ? "prompt" : "to"]: value,
        },
      }));
    }, 1000)();

    return onChangeField(value);
  };

  //############### transform image
  const onTransformHandler = () => {
    setIsTransforming(true);

    setTransformConfig(deepMergeObjects(newTransform, transformConfig));

    setNewTransform(null);

    startTransition(async () => {
      await updateCredits(userId, creditFee )
    })
  };

  // console.log(getUserById(userId))

  useEffect(() => {
    if (image && (type === 'removeBackground' || type==='restore')) {
      setNewTransform(transformationType.config);
    }
},[image, transformationType.config,type]);
  //##############################
  const onValueChange = (value: string) => {};
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {creditBalance < Math.abs(creditFee) && <CreditBalanceAlert/>}
        <CustomField
          control={form.control}
          name="title"
          render={({ field }) => <Input {...field} placeholder="Title" />}
          formLabel="Title"
        />

        {type === "fill" && (
          <CustomField
            control={form.control}
            name="aspectRatio"
            formLabel="Aspect Ratio"
            className="w-full"
            render={({ field }) => (
              <Select
                onValueChange={(value) =>
                  onSelectHandler(value, field.onChange)
                }
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Theme" />
                </SelectTrigger>
                <SelectContent>
                  {Object.keys(aspectRatioOptions).map((key) => (
                    <SelectItem
                      key={key}
                      value={key}
                      className="py-3 cursor-pointer hover:bg-blue-100"
                    >
                      {aspectRatioOptions[key as AspectRatioKey].label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
        )}

        {(type === "remove" || type === "recolor") && (
          <div className="flex flex-col gap-5 lg:flex-row lg:gap-10">
            <CustomField
              className="w-full"
              control={form.control}
              name="prompt"
              formLabel={type === "remove" ? "Remove Color" : "Change Color"}
              render={({ field }) => (
                <Input
                  className=""
                  value={field.value}
                  onChange={(e) =>
                    onInputHandler(
                      "prompt",
                      e.target.value,
                      type,
                      field.onChange
                    )
                  }
                />
              )}
            />

            {type === "recolor" && (
              <CustomField
                control={form.control}
                name="color"
                formLabel="Replacement Color"
                className="w-full"
                render={({ field }) => (
                  <Input
                    value={field.value}
                    className="input-field"
                    onChange={(e) =>
                      onInputHandler(
                        "color",
                        e.target.value,
                        "recolor",
                        field.onChange
                      )
                    }
                  />
                )}
              />
            )}
          </div>
        )}

        <div className="grid h-fit min-h-[200px] grid-cols-1 gap-5 py-4 md:grid-cols-2">
          <CustomField
            className="flx flex-col"
            control={form.control}
            name="publicId"
            render={({ field }) => (
              <MediaUploader
                onValueChange={field.onChange}
                setImage={setImage}
                publicId={field.value}
                image={image}
                type={type}
              />
            )}
            formLabel="Public ID"
          />
          <TransformImage
            image={image}
            type={type}
            title={form.getValues().title}
            // transformationConfig={null}
            isTransforming={isTransforming}
            setIsTransforming={setIsTransforming}
            transformationConfig={transformConfig}
          />
        </div>

        <div className="flex flex-col gap-4">
          <Button
            type="button"
            className="submit-button capitalize"
            disabled={isTransforming || newTransform === null}
            onClick={onTransformHandler}
          >
            {isTransforming ? "Transforming..." : "Apply Transformation"}
          </Button>
          <Button
            type="submit"
            className="submit-button capitalize"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Save Image"}
          </Button>
          {/* <p>{JSON.stringify(userId)}</p> */}
        </div>
      </form>
    </Form>
  );
};

export default TransformationForm;
