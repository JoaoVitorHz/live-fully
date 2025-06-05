@objc(DeviceInfoModule)
class DeviceInfoModule: NSObject {

  @objc
  static func requiresMainQueueSetup() -> Bool {
    return true
  }

  @objc
  func getSystemVersion(_ callback: RCTResponseSenderBlock) {
    callback([NSNull(), UIDevice.current.systemVersion])
  }
}