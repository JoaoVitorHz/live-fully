import { NativeModules } from 'react-native';

const { DeviceInfoModule } = NativeModules;

export const getSystemVersion = () => DeviceInfoModule.getSystemVersion();
export const getManufacturer = () => DeviceInfoModule.getManufacturer();