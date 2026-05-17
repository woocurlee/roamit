import { placeTypes } from "@/mock/config";

type Props = {
  typeLabel: string;
};

export function PlaceTypeBadge({ typeLabel }: Props) {
  const type = placeTypes.find((item) => item.label === typeLabel) ?? placeTypes[0];
  const Icon = type.icon;
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-white/10 px-2.5 py-1 text-[11px] text-white/65">
      <Icon size={12} /> {typeLabel}
    </span>
  );
}
