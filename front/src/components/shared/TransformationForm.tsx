"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { CustomField } from "./CustomField";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { aspectRatioOptions, transformationTypes } from "@/constants";
import { useState } from "react";
import { AspectRatioKey } from "@/lib/utils";

export const formSchema = z.object({
  title: z.string(),
  aspectRatio: z.string().optional(),
  color: z.string().optional(),
  prompt: z.string().optional(),
  publicId: z.string(),
});

export function TransformationForm({
  data = null,
  action,
  userId,
  type,
  creditBalance,
  config = null,
}: TransformationFormProps) {
  const transformationType = transformationTypes[type];
  const [image, setImage] = useState(data);
  const [newTransformation, setNewTransformation] =
    useState<Transformations | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isTransforming, setIsTransforming] = useState(false);
  const [transformationConfig, setTransformationConfig] = useState(config);
  const initialValues =
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
    defaultValues: initialValues,
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  const onSelectFieldHandler = (
    value: string,
    onChangeField: (value: string) => void
  ) => {};

  const onInputChangeHandler = (
    fieldName: string,
    value: string,
    type: string,
    onChangeField: (value: string) => void
  ) => {};

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <CustomField
          control={form.control}
          name="title"
          formLabel="Image Title"
          className="w-full"
          render={({ field }) => <Input {...field} className="input-field" />}
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
                  onSelectFieldHandler(value, field.onChange)
                }
              >
                <SelectTrigger className="select-field">
                  <SelectValue placeholder="Select Size" />
                </SelectTrigger>
                <SelectContent>
                  {Object.keys(aspectRatioOptions).map((key) => (
                    <SelectItem key={key} value={key} className="select-item">
                      {aspectRatioOptions[key as AspectRatioKey].label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
        )}

        {(type === "remove" || type === "recolor") && (
          <CustomField
            control={form.control}
            name="prompt"
            formLabel={
              type === "remove" ? "Object to remove" : "Object to recolor"
            }
            className="w-full"
            render={({ field }) => (
              <Input
                className="input-field"
                value={field.value}
                onChange={(e) =>
                  onInputChangeHandler(
                    "prompt",
                    e.target.value,
                    type,
                    field.onChange
                  )
                }
              />
            )}
          />
        )}
        {type === "recolor" && (
          <CustomField
            control={form.control}
            name="color"
            formLabel="Replacement Color"
            className="w-full"
            render={({ field }) => (
              <Input
                className="input-field"
                value={field.value}
                onChange={(e) =>
                  onInputChangeHandler(
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
        <Button
          type="submit"
          className="w-full submit-button capitalize"
          disabled={isSubmitting}
        >
          Submit
        </Button>
      </form>
    </Form>
  );
}