import { Header } from "@/src/components/Views/Header";
import { useProducts } from "@/src/redux/slices/productsSlice/productsHooks";
import { useColors } from "@/src/redux/slices/themeSlice/colorsHooks";
import { ProductType } from "@/src/types/ProductType";
import { useLocalSearchParams } from "expo-router";
import { useFormik } from "formik";
import React from "react";
import { ScrollView, Text, TextInput, View } from "react-native";
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
          <View className=" self-stretch gap-2">
            <Text
              className=" text-[24px] font-bold"
              style={{ color: colors.text }}
            >
              Title
            </Text>
            <TextInput
              className=" border-b  p-2"
              style={{ borderColor: colors.secondary, color: colors.text }}
              value={formik.values.title}
              onChangeText={formik.handleChange("title")}
              onBlur={formik.handleBlur("title")}
              placeholder="Enter product title"
              keyboardType="default"
              placeholderTextColor={colors.placeholder}
            />
            {formik.touched.title && formik.errors.title && (
              <Text style={{ color: colors.error }}>{formik.errors.title}</Text>
            )}
          </View>
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
