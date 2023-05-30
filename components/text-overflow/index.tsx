import { FC } from "react";
interface TextOverflowProps {
  text: string;
  className?: string;
}

const TextOverflow: FC<TextOverflowProps> = ({ text, className }) => {
  return (
    <div
      className={`text-ellipsis capitalize overflow-hidden whitespace-nowrap ${className}`}
    >
      {text}
    </div>
  );
};

export default TextOverflow;
