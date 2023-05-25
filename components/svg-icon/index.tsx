import React, { useEffect, useState } from "react";

interface SvgIconProps {
  filePath: string;
}

const SvgIcon: React.FC<SvgIconProps> = ({ filePath }) => {
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

  return <div dangerouslySetInnerHTML={{ __html: svgContent }} />;
};

export default SvgIcon;
