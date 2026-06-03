import { Viewer, Entity } from "resium";
import { Cartesian3, Color, VerticalOrigin, LabelStyle } from "cesium";
import "cesium/Build/Cesium/Widgets/widgets.css";

type GlobeMapProps = {
  userPosition: [number, number, number];
  satCoordinates: [number, number, number];
  satelliteName: string;
};

export default function GlobeMap({
  userPosition,
  satCoordinates,
  satelliteName,
}: GlobeMapProps) {
  const [userLat, userLng] = userPosition;
  const [satLat, satLng, satAlt] = satCoordinates;
  // console.log(userLat, userLng);
  return (
    <>
      <div className="w-full h-full">
        <Viewer
          full={false}
          className="h-full w-full"
          timeline={false}
          animation={false}
          baseLayerPicker={false}
          geocoder={false}
          sceneModePicker={false}
          navigationHelpButton={false}
          fullscreenButton={false}
          homeButton={false}>
          <Entity
            name="Your location :)"
            position={Cartesian3.fromDegrees(userLng, userLat, 0)}
            point={{
              pixelSize: 12,
              color: Color.RED,
              outlineColor: Color.WHITE,
              outlineWidth: 2,
            }}
            label={{
              text: "Your current position",
              font: "14px sans-serif",
              fillColor: Color.WHITE,
              outlineColor: Color.BLACK,
              outlineWidth: 2,
              style: LabelStyle.FILL_AND_OUTLINE,
              verticalOrigin: VerticalOrigin.BOTTOM,
              pixelOffset: new Cartesian3(0, -24, 0),
            }}
          />
          <Entity
            name={`${satelliteName}, altitude: ${satAlt}`}
            position={Cartesian3.fromDegrees(satLng, satLat, satAlt * 1000)} // have to satAlt * 1000 to make alt into klm
            point={{
              pixelSize: 14,
              color: Color.YELLOW,
              outlineColor: Color.WHITE,
              outlineWidth: 2,
            }}
            label={{
              text: satelliteName,
              font: "14px sans-serif",
              fillColor: Color.WHITE,
              outlineColor: Color.BLACK,
              outlineWidth: 2,
              style: LabelStyle.FILL_AND_OUTLINE,
              verticalOrigin: VerticalOrigin.BOTTOM,
              pixelOffset: new Cartesian3(0, -28, 0),
            }}
          />
        </Viewer>
      </div>
    </>
  );
}
