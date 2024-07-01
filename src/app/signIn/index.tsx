import { Text, View } from "react-native";
import Logo from "@/styles/svgs/logo.svg";
import { useTranslation } from "react-i18next";

import InputWithIcon from "@/components/Input-with-icons";
import { Button } from "@/components/Button";
import { Link, router } from "expo-router";
import { Mail } from "lucide-react-native";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { checkInternetConnectivity } from "@/lib/network";

import { AuthService } from "@/service/auth/auth.service";
import Toast from "react-native-toast-message";
import { useUserStore } from "@/store/user.store";

export default function SignIn() {
  const { t } = useTranslation();
  const setToken = useUserStore((state) => state.setToken);

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
      await AuthService(!isNet).authentication(data);
      Toast.show({
        type: "success",
        text1: "Authenticated",
        text2: "Enjoy and workout👋",
        text1Style: { fontSize: 20 },
      });
      setToken("token");
      router.replace("/(private)");
    } catch (e) {
      Toast.show({
        type: "error",
        text1: `${e}`,
      });
    }
  };

  return (
    <View className="flex-1 justify-center items-center bg-grey">
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
        <Button
          label={t("signIn.button")}
          className="w-[200px] m-6"
          onPress={handleSubmit(onSubmit)}
        />
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
    </View>
  );
}
