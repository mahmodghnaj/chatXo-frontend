import { FC } from "react";
interface TextOverflowProps {
  text: string;
}

const TextOverflow: FC<TextOverflowProps> = ({ text }) => {
  return (
    <div className="text-ellipsis capitalize overflow-hidden whitespace-nowrap">
      {text}
    </div>
  );
};

export default TextOverflow;
