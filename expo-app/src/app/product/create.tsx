import FooterButton from "@/src/components/Views/Footer/FooterButton";
import { Header } from "@/src/components/Views/Header";
import { addProduct } from "@/src/redux/slices/productsSlice/productsSlice";
import { useColors } from "@/src/redux/slices/themeSlice/colorsHooks";
import { useAppDispatch } from "@/src/redux/store";
import { router } from "expo-router";
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
import { EditProductSchema } from "./edit/[id]";

const CreateProduct = () => {
  const colors = useColors();

  const dispatch = useAppDispatch();

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      price: 0,
      image: "",
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

const FieldContainer = ({
  title,
  fieldName,
  keyboardType,
  formik,
}: {
  title: string;
  fieldName: "title" | "description" | "price" | "image";
  keyboardType: KeyboardTypeOptions;
  formik: ReturnType<typeof useFormik<typeof EditProductSchema.__outputType>>;
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

export default CreateProduct;
