import React, { forwardRef } from "react";
import { TextInput, TextInputProps, View } from "react-native";
import { Input } from "./Input";

interface InputWithIconProps extends TextInputProps {
  readonly icon: React.ReactNode;
  readonly error: boolean;
  readonly variant?: boolean;
}

// eslint-disable-next-line react/display-name
const InputWithIcon = forwardRef<TextInput, InputWithIconProps>(
  ({ icon, error, variant, ...rest }, ref) => {
    return (
      <View
        className={`flex-row items-center  ${variant ? "bg-grey w-full" : "bg-black w-300"} rounded-[5px] px-2 gap-4 ${error ? "border border-input border-[#ff5555]" : ""}`}
      >
        {icon}
        <Input {...rest} ref={ref} className="flex-1 outline-none" />
      </View>
    );
  },
);

export default InputWithIcon;
