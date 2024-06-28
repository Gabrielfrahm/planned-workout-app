import { TextInputProps, View } from "react-native";

import { Input } from "./Input";

interface InputWithIconProps extends TextInputProps {
  readonly icon: React.ReactNode;
  readonly error: boolean;
}

export default function InputWithIcon({
  icon,
  error,
  ...rest
}: InputWithIconProps) {
  return (
    <View
      className={`flex-row items-center w-300 bg-black rounded-[5px] px-2 gap-4 ${error ? "border border-input border-[#ff5555] " : ""}`}
    >
      {icon}
      <Input {...rest} className="flex-1 outline-none" />
    </View>
  );
}
