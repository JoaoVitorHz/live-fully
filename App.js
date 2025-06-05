import { NativeBaseProvider } from "native-base";
import LoginScreen from "./src/screens/LoginScreen";

import { AuthProvider } from "./src/contexts/AuthContext";

export default function App() {
  return (
    <NativeBaseProvider>
      <AuthProvider>
        <LoginScreen />
      </AuthProvider>
    </NativeBaseProvider>
  );
}