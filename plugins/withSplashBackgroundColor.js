const { withAppDelegate } = require("expo/config-plugins");

// React Native's RCTRootViewFactory sets the root view's backgroundColor to
// the dynamic `UIColor.systemBackgroundColor` (white in light mode, BLACK in
// dark mode). That color briefly shows through before expo-splash-screen's
// loading view is composited on top, producing a black flash on cold launch
// when the device is in Dark Mode. Pin it to the splash background instead.
const SPLASH_BACKGROUND_COLOR = "#d9d0e2";

function hexToUIColor(hex) {
  const clean = hex.replace("#", "");
  const r = (parseInt(clean.substring(0, 2), 16) / 255).toFixed(4);
  const g = (parseInt(clean.substring(2, 4), 16) / 255).toFixed(4);
  const b = (parseInt(clean.substring(4, 6), 16) / 255).toFixed(4);
  return `UIColor(red: ${r}, green: ${g}, blue: ${b}, alpha: 1)`;
}

module.exports = function withSplashBackgroundColor(config) {
  return withAppDelegate(config, (config) => {
    const uiColor = hexToUIColor(SPLASH_BACKGROUND_COLOR);
    let contents = config.modResults.contents;

    const windowAnchor = "window = UIWindow(frame: UIScreen.main.bounds)";
    if (contents.includes(windowAnchor) && !contents.includes("window?.backgroundColor")) {
      contents = contents.replace(
        windowAnchor,
        `${windowAnchor}\n    window?.backgroundColor = ${uiColor}`
      );
    }

    const startAnchor = /factory\.startReactNative\(\s*withModuleName:\s*"main",\s*in:\s*window,\s*launchOptions:\s*launchOptions\)/;
    if (startAnchor.test(contents) && !contents.includes("rootViewController?.view.backgroundColor")) {
      contents = contents.replace(startAnchor, (match) => {
        return `${match}\n    window?.rootViewController?.view.backgroundColor = ${uiColor}`;
      });
    }

    config.modResults.contents = contents;
    return config;
  });
};
