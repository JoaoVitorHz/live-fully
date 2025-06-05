class DeviceInfoModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

  override fun getName(): String {
    return "DeviceInfoModule"
  }

  @ReactMethod
  fun getManufacturer(promise: Promise) {
    promise.resolve(android.os.Build.MANUFACTURER)
  }
}