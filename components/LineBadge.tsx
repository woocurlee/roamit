import { Train } from "lucide-react";

type Props = {
  lineName: string;
  lineColor: string;
};

export function LineBadge({ lineName, lineColor }: Props) {
  return (
    <span
      className="inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium text-white"
      style={{ backgroundColor: lineColor }}
    >
      <Train size={12} /> {lineName}
    </span>
  );
}
