// components/StripedBackground.js

interface StripedBackgroundProps {
  width?: string;
  height?: string;
}

const StripedBackground = ({
  width = "100%",
  height = "100%",
}: StripedBackgroundProps) => (
  <div
    className="bg-striped border border-black"
    style={{ height: height, width: width }}
  ></div>
);

export default StripedBackground;
