# Lumi Focus 🌙

A cozy Pomodoro focus timer built with Expo. Lumi Focus pairs a calming, animated scene with ambient sound to help you focus, take breaks, and build a consistent focus habit.

This is a teaching project — it's built feature by feature to demonstrate how to put together a modern, production-style Expo app.

## Features

- **Pomodoro timer** — Focus, Short Break, and Long Break modes with sensible default durations
- **Cozy animated scenes** — pick an environment (Spring Meadow, Snow Cabin, and more to come), each with its own looping illustration
- **Ambient sound** — each scene has matching ambient audio that plays while you focus
- **Timestamp-based timing** — remaining time is derived from an end timestamp, so the timer stays accurate even if the app is backgrounded

More features (streak tracking, focus stats, authentication) are planned as the project grows.

## Tech Stack

- [Expo](https://expo.dev) + [Expo Router](https://docs.expo.dev/router/introduction/)
- React Native + TypeScript
- [NativeWind](https://www.nativewind.dev) (Tailwind CSS for React Native)
- [Zustand](https://zustand.docs.pmnd.rs) for state management
- Expo AV/Audio for ambient sound playback

## Getting Started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

From the output, open the app in a [development build](https://docs.expo.dev/develop/development-builds/introduction/), [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/), [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/), or [Expo Go](https://expo.dev/go).

## Project Structure

```txt
app/            routes and screens (Expo Router)
components/     reusable UI building blocks
constants/      theme tokens, images, audio, shadows
data/           hardcoded app content (timer modes, scenes)
store/          Zustand stores (timer, sound, theme)
types/          shared TypeScript types
assets/         images and audio files
```

## Scripts

```bash
npm run lint   # run ESLint
```

## Learn More

- [Expo documentation](https://docs.expo.dev/)
- [Expo Router documentation](https://docs.expo.dev/router/introduction/)
- [NativeWind documentation](https://www.nativewind.dev)
