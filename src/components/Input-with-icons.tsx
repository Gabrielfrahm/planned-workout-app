import { TextInputProps, View } from "react-native";
import { Mail } from "lucide-react-native";
import { Input } from "./Input";

interface InputWithIconProps extends TextInputProps {
  icon: React.ReactNode;
}

export default function InputWithIcon({ icon, ...rest }: InputWithIconProps) {
  return (
    <View className="flex-row items-center w-300 bg-black  rounded-[5px] px-2 gap-4">
      {icon}
      <Input {...rest} className="flex-1 outline-none" />
    </View>
  );
}
