import { Text, View, KeyboardAvoidingView } from "react-native";
import Logo from "@/styles/svgs/logo.svg";
import { useTranslation } from "react-i18next";
import GoogleLogo from "@/styles/svgs/google-icon.svg";
import InputWithIcon from "@/components/Input-with-icons";
import { Button } from "@/components/Button";
import { Link, router } from "expo-router";
import { Mail } from "lucide-react-native";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { checkInternetConnectivity } from "@/lib/network";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { AuthService } from "@/service/auth/auth.service";
import Toast from "react-native-toast-message";

import { useState } from "react";
import Load from "@/components/Load";
import { AppError } from "@/lib/error.type";

export default function SignIn() {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const formSchema = z.object({
    email: z.string().email(t("signIn.inputs.errors.email")),
  });

  const { control, handleSubmit } = useForm({
    defaultValues: {
      email: "",
    },
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: any) => {
    const isNet = await checkInternetConnectivity();

    try {
      setIsLoading(true);
      await AuthService(!isNet).authentication(data);

      Toast.show({
        type: "success",
        text1: "Authenticated",
        text2: "Enjoy and workout👋",
        text1Style: { fontSize: 20 },
      });

      setIsLoading(false);
      router.replace("/(tabs)");
    } catch (e) {
      const err = e as AppError;
      Toast.show({
        type: "error",
        text1: err.message,
      });
      setIsLoading(false);
    }
  };

  const signInWithGoogle = async () => {
    const isNet = await checkInternetConnectivity();

    if (!isNet) {
      Toast.show({
        type: "error",
        text1: "network error",
      });
    }

    try {
      setIsLoading(true);
      await GoogleSignin.hasPlayServices();
      const { data } = await GoogleSignin.signIn();

      await AuthService().authenticationGoogle({
        email: data!.user.email,
        name: data!.user.name!,
      });

      Toast.show({
        type: "success",
        text1: "Authenticated",
        text2: "Enjoy and workout👋",
        text1Style: { fontSize: 20 },
      });
      setIsLoading(false);
      router.replace("/(tabs)");
    } catch (error) {
      const err = error as AppError;
      Toast.show({
        type: "error",
        text1: err.message,
      });
      setIsLoading(false);
    }
  };

  return (
    <View className="flex-1 justify-center items-center bg-grey">
      <KeyboardAvoidingView
        className="flex-1 justify-center items-center"
        behavior={"padding"}
      >
        <Logo />
        <Text className="text-white  font-roboto-bold text-2xl m-6">
          {t("signIn.title")}
        </Text>

        <View className="justify-center items-center">
          <Controller
            control={control}
            name={"email"}
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
                    {error.message}
                  </Text>
                )}
              </>
            )}
          />
          {!isLoading ? (
            <View className="flex items-center bottom-1">
              <Button
                label={t("signIn.button")}
                className="w-[200px] m-6"
                onPress={handleSubmit(onSubmit)}
              />
              <View
                className="flex flex-row justify-center items-center border-2 w-56 border-green rounded-lg bottom-2"
                onTouchEnd={async () => {
                  await signInWithGoogle();
                }}
              >
                <GoogleLogo height={20} width={20} />
                <Text className="text-white font-roboto-bold text-lg text-center p-2">
                  {t("signIn.button-google")}
                </Text>
              </View>
            </View>
          ) : (
            <Load size="large" />
          )}
        </View>
        <Link href="/signUp" className="flex-row ">
          <Text className="text-white font-roboto-bold text-base">
            {t("signIn.link.text")}
          </Text>
          <Text className="text-green font-roboto-bold-italic text-base">
            {" "}
            {t("signIn.link.text2")}
          </Text>
        </Link>
      </KeyboardAvoidingView>
    </View>
  );
}
