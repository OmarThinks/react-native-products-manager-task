import { Header } from "@/src/components/Views/Header";
import { useProducts } from "@/src/redux/slices/productsSlice/productsHooks";
import { useColors } from "@/src/redux/slices/themeSlice/colorsHooks";
import { ProductType } from "@/src/types/ProductType";
import { useLocalSearchParams } from "expo-router";
import { useFormik } from "formik";
import React from "react";
import {
  KeyboardTypeOptions,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import * as Yup from "yup";

const EditProduct = () => {
  const { id }: { id: string } = useLocalSearchParams();
  const products = useProducts();

  const product = products.find(
    (item) => item.id === Number(id)
  ) as ProductType;

  const colors = useColors();

  const formik = useFormik({
    initialValues: {
      title: product.title,
      description: product.description,
      price: product.price,
      image: product.image,
    },
    validationSchema: EditProductSchema,
    onSubmit: (values) => {
      // Handle form submission
    },
  });

  const FieldContainer = ({
    title,
    fieldName,
    keyboardType,
  }: {
    title: string;
    fieldName: "title" | "description" | "price" | "image";
    keyboardType: KeyboardTypeOptions;
  }) => {
    return (
      <View className=" self-stretch gap-2">
        <Text className=" text-[24px] font-bold" style={{ color: colors.text }}>
          {title}
        </Text>
        <TextInput
          className=" border-b  p-2"
          style={{ borderColor: colors.secondary, color: colors.text }}
          value={String(formik.values[fieldName])}
          onChangeText={formik.handleChange(fieldName)}
          onBlur={formik.handleBlur(fieldName)}
          placeholder={`Enter product ${fieldName}`}
          keyboardType={keyboardType}
          placeholderTextColor={colors.placeholder}
        />
        {formik.touched[fieldName] && formik.errors[fieldName] && (
          <Text style={{ color: colors.error }}>
            {formik.errors[fieldName]}
          </Text>
        )}
      </View>
    );
  };

  return (
    <View
      className=" self-stretch flex-1"
      style={{ backgroundColor: colors.background }}
    >
      <Header title="Edit Product" />
      <ScrollView
        className=" self-stretch"
        contentContainerClassName=" px-2 py-4"
      >
        <View className=" self-stretch  gap-4">
          <FieldContainer
            title="Title"
            fieldName="title"
            keyboardType="default"
          />
          <FieldContainer
            title="Description"
            fieldName="description"
            keyboardType="default"
          />
          <FieldContainer
            title="Price"
            fieldName="price"
            keyboardType="numeric"
          />
          <FieldContainer title="Image" fieldName="image" keyboardType="url" />
        </View>
      </ScrollView>
    </View>
  );
};

const EditProductSchema = Yup.object().shape({
  title: Yup.string()
    .min(3, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  description: Yup.string()
    .min(3, "Too Short!")
    .max(1000, "Too Long!")
    .required("Required"),
  price: Yup.number().min(0, "Invalid price").required("Required"),
  image: Yup.string().url("Invalid URL").required("Required"),
});

export default EditProduct;
