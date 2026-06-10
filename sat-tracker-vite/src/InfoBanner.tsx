type InfoBannerProps = {
  currentSatellite: {
    info: {
      satname: string;
      satid: number;
    };
    positions: {
      sataltitude: number;
    }[];
  };
};

export default function InfoBanner({ currentSatellite }: InfoBannerProps) {
  return (
    <>
      <div className="absolute top-4 left-[250px] z-[1000] w-[200px] rounded-2xl border border-cyan-400/30 bg-zinc-950/80 p-4 text-white">
        <div>Altitude: {currentSatellite.positions[0].sataltitude} km</div>
        <div>NORAD ID: {currentSatellite.info.satid}</div>
      </div>
    </>
  );
}
