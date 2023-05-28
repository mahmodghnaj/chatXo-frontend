import React, { useEffect, useState } from "react";
interface SvgIconProps {
  filePath: string;
  className?: string;
}

const SvgIcon: React.FC<SvgIconProps> = ({ filePath, className }) => {
  const [svgContent, setSvgContent] = useState<string>("");

  useEffect(() => {
    const fetchSvgContent = async () => {
      try {
        const response = await fetch(filePath);
        const svgText = await response.text();
        setSvgContent(svgText);
      } catch (error) {
        console.error("Error fetching SVG file:", error);
      }
    };

    fetchSvgContent();
  }, [filePath]);

  return (
    <div
      className={className}
      dangerouslySetInnerHTML={{ __html: svgContent }}
    />
  );
};

export default SvgIcon;
