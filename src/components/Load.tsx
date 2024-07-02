import { ActivityIndicator, ActivityIndicatorProps } from "react-native";

interface LoadProps extends ActivityIndicatorProps {}

export default function Load(props: LoadProps) {
  return <ActivityIndicator {...props} className="text-dark-green m-2" />;
}
