import FooterButton from "@/src/components/Views/Footer/FooterButton";
import { Header } from "@/src/components/Views/Header";
import { useProducts } from "@/src/redux/slices/productsSlice/productsHooks";
import { editSingleProduct } from "@/src/redux/slices/productsSlice/productsSlice";
import { useColors } from "@/src/redux/slices/themeSlice/colorsHooks";
import { useAppDispatch } from "@/src/redux/store";
import { ProductType } from "@/src/types/ProductType";
import { router, useLocalSearchParams } from "expo-router";
import { useFormik } from "formik";
import React from "react";
import {
  KeyboardTypeOptions,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import { Toast } from "toastify-react-native";
import * as Yup from "yup";

const EditProduct = () => {
  const { id }: { id: string } = useLocalSearchParams();
  const products = useProducts();

  const product = products.find(
    (item) => item.id === Number(id)
  ) as ProductType;

  const colors = useColors();

  const dispatch = useAppDispatch();

  const formik = useFormik<useFormikPropType_EditProduct>({
    initialValues: {
      title: product.title,
      description: product.description,
      price: product.price,
      image: product.image,
    },
    validationSchema: EditProductSchema,
    onSubmit: (values) => {
      // Handle form submission
      formik.validateForm();
      if (formik.isValid) {
        router.back();
        dispatch(
          editSingleProduct({
            updatedProduct: {
              id: product.id,
              title: values.title,
              description: values.description,
              price: Number(values.price),
              image: values.image,
              tags: product.tags,
            },
          })
        );
        Toast.success("Product edited successfully 🎉");
      }
    },
  });

  return (
    <View
      className=" self-stretch flex-1"
      style={{ backgroundColor: colors.background }}
    >
      <Header title="Edit Product" />
      <ScrollView
        className=" self-stretch flex-1"
        contentContainerClassName=" px-2 py-4"
      >
        <View className=" self-stretch  gap-4">
          <FieldContainer
            title="Title"
            fieldName="title"
            keyboardType="default"
            formik={formik}
          />
          <FieldContainer
            title="Description"
            fieldName="description"
            keyboardType="default"
            formik={formik}
          />
          <FieldContainer
            title="Price"
            fieldName="price"
            keyboardType="numeric"
            formik={formik}
          />
          <FieldContainer
            title="Image"
            fieldName="image"
            keyboardType="url"
            formik={formik}
          />
        </View>
      </ScrollView>

      <View
        style={{ backgroundColor: colors.primary }}
        className=" self-stretch flex-row justify-between items-center px-2 py-3 gap-4"
      >
        <FooterButton
          text="Save"
          onPress={formik.handleSubmit}
          iconName="save"
        />
      </View>
    </View>
  );
};

const FieldContainer = ({
  title,
  fieldName,
  keyboardType,
  formik,
}: {
  title: string;
  fieldName: "title" | "description" | "price" | "image";
  keyboardType: KeyboardTypeOptions;
  formik: ReturnType<typeof useFormik<useFormikPropType_EditProduct>>;
}) => {
  const colors = useColors();

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
        <Text style={{ color: colors.error }}>{formik.errors[fieldName]}</Text>
      )}
    </View>
  );
};

type useFormikPropType_EditProduct = {
  title: string;
  description: string;
  price: number;
  image?: string;
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
  image: Yup.string().url("Invalid URL").optional(),
});

export default EditProduct;
export { EditProductSchema, FieldContainer };
export type { useFormikPropType_EditProduct };
