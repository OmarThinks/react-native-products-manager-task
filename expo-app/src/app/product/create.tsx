import FooterButton from "@/src/components/Views/Footer/FooterButton";
import { Header } from "@/src/components/Views/Header";
import { addProduct } from "@/src/redux/slices/productsSlice/productsSlice";
import { useColors } from "@/src/redux/slices/themeSlice/colorsHooks";
import { useAppDispatch } from "@/src/redux/store";
import { router } from "expo-router";
import { useFormik } from "formik";
import React from "react";
import { ScrollView, View } from "react-native";
import { Toast } from "toastify-react-native";
import {
  EditProductSchema,
  FieldContainer,
  useFormikPropType_EditProduct,
} from "./edit/[id]";

const CreateProduct = () => {
  const colors = useColors();

  const dispatch = useAppDispatch();

  const formik = useFormik<useFormikPropType_EditProduct>({
    initialValues: {
      title: "",
      description: "",
      price: 0,
      image: undefined,
    },
    validationSchema: EditProductSchema,
    onSubmit: (values) => {
      // Handle form submission
      formik.validateForm();
      if (formik.isValid) {
        dispatch(
          addProduct({
            newProduct: {
              id: Math.floor(Math.random() * 1000000),
              title: values.title,
              description: values.description,
              price: Number(values.price),
              image: values.image,
              tags: [],
            },
          })
        );
        router.back();
        Toast.success("Product created successfully 🎉");
      }
    },
  });

  return (
    <View
      className=" self-stretch flex-1"
      style={{ backgroundColor: colors.background }}
    >
      <Header title="Create Product" />
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
          text="Create"
          onPress={formik.handleSubmit}
          iconName="plus"
        />
      </View>
    </View>
  );
};

export default CreateProduct;
