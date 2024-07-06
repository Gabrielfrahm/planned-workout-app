import { Keyboard, Text, TextInput, View } from "react-native";
import Logo from "@/styles/svgs/logo.svg";
import { useTranslation } from "react-i18next";

import InputWithIcon from "@/components/Input-with-icons";
import { Button } from "@/components/Button";
import { Link, router } from "expo-router";
import { Mail, Smile } from "lucide-react-native";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { checkInternetConnectivity } from "@/lib/network";
import { useRef, useState } from "react";
import { UserService } from "@/service/users/user.service";
import Toast from "react-native-toast-message";
import { AppError } from "@/lib/error.type";
import Load from "@/components/Load";

export default function SignUp() {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const input1Ref = useRef<TextInput>(null);
  const input2Ref = useRef<TextInput>(null);

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

  const onSubmit = async (data: any) => {
    Keyboard.dismiss();
    const isNet = await checkInternetConnectivity();

    try {
      setIsLoading(true);
      await UserService(!isNet).registration(data);
      Toast.show({
        type: "success",
        text1: "Account created",
        text2: "Enjoy and workout👋",
        text1Style: { fontSize: 20 },
      });
      setIsLoading(false);
      router.replace("/signIn");
    } catch (e) {
      const err = e as AppError;

      Toast.show({
        type: "error",
        text1: err.message,
        text2: err.statusCode.toString(),
      });
      setIsLoading(false);
    }
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
                onSubmitEditing={() => {
                  if (input2Ref.current) {
                    input2Ref.current.focus();
                  }
                }}
                error={!!error?.message}
                ref={input1Ref}
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
                ref={input2Ref}
              />
              {error && (
                <Text className="font-roboto-light-italic text-error">
                  {error.message}
                </Text>
              )}
            </>
          )}
        />
        {!isLoading ? (
          <Button
            label={t("signIn.button")}
            className="w-[200px] m-6"
            onPress={handleSubmit(onSubmit)}
          />
        ) : (
          <Load size="large" />
        )}
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
