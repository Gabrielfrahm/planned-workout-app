import { Alert, Text, View } from "react-native";
import Logo from "@/styles/svgs/logo.svg";
import { useTranslation } from "react-i18next";

import InputWithIcon from "@/components/Input-with-icons";
import { Button } from "@/components/Button";
import { Link } from "expo-router";
import { Mail, Smile } from "lucide-react-native";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

export default function SignUp() {
  const { t } = useTranslation();

  const formSchema = z.object({
    email: z.string().email(t("signUp.inputs.errors.email")),
    name: z.string().refine((data) => data.trim() !== "", {
      message: t("signUp.inputs.errors.name"),
    }),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      name: "",
    },
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (data: any) => {
    console.log(data);
    Alert.alert("Successful", JSON.stringify(data));
  };

  return (
    <View className="flex-1 justify-center items-center bg-grey">
      <Logo />
      <Text className="text-white  font-roboto-bold text-2xl m-6">
        {t("signUp.title")}
      </Text>
      <View className="justify-center items-center gap-4">
        <Controller
          control={control}
          name={"email"}
          rules={{
            required: true,
          }}
          render={({
            field: { value, onChange, onBlur },
            fieldState: { error },
          }) => (
            <>
              <InputWithIcon
                icon={<Mail color={error?.message ? "#ff5555" : "#323640"} />}
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                keyboardType="email-address"
                error={!!error?.message}
              />
              {error && (
                <Text className="font-roboto-light-italic text-error">
                  {errors.email?.message}
                </Text>
              )}
            </>
          )}
        />
        <Controller
          control={control}
          name={"name"}
          rules={{
            required: true,
          }}
          render={({
            field: { value, onChange, onBlur },
            fieldState: { error },
          }) => (
            <>
              <InputWithIcon
                icon={<Smile color={error?.message ? "#ff5555" : "#323640"} />}
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                error={!!error?.message}
              />
              {error && (
                <Text className="font-roboto-light-italic text-error">
                  {error.message}
                </Text>
              )}
            </>
          )}
        />
        <Button
          label={t("signUp.button")}
          className="w-[200px] m-6"
          onPress={handleSubmit(onSubmit)}
        />
      </View>
      <Link href="/signIn" className="flex-row ">
        <Text className="text-white font-roboto-bold text-base">
          {t("signUp.link.text")}
        </Text>
        <Text className="text-green font-roboto-bold-italic text-base">
          {" "}
          {t("signUp.link.text2")}
        </Text>
      </Link>
    </View>
  );
}
