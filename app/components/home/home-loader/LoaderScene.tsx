import DomeLayer from "./DomeLayer";

const LOADER_EARTH = {
  dark: "/images/loader-earth-dark.jpg",
  light: "/images/loader-earth-light.jpg",
} as const;

type LoaderSceneProps = {
  isDark: boolean;
};

export default function LoaderScene({ isDark }: LoaderSceneProps) {
  const earthSrc = isDark ? LOADER_EARTH.dark : LOADER_EARTH.light;

  return (
    <>
      <div
        className={`absolute inset-0 ${isDark ? "loader-bg-dark" : "loader-bg-light"}`}
        aria-hidden
      />
      {isDark && <div className="loader-stars" aria-hidden />}

      <div className="loader-earth-photo" aria-hidden>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={earthSrc} alt="" draggable={false} fetchPriority="high" decoding="async" />
        <div
          className={`loader-earth-fade ${isDark ? "loader-earth-fade--dark" : "loader-earth-fade--light"}`}
        />
      </div>

      <DomeLayer isDark={isDark} />
    </>
  );
}
