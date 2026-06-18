import { placeTypes } from "@/mock/config";

type Props = {
  typeLabel: string;
};

export function PlaceTypeBadge({ typeLabel }: Props) {
  const type = placeTypes.find((item) => item.label === typeLabel) ?? placeTypes[0];
  const Icon = type.icon;
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-[#F2F2F7] px-2.5 py-1 text-[11px] text-[#3C3C43] dark:bg-[#2C2C2E] dark:text-white/70">
      <Icon size={12} /> {typeLabel}
    </span>
  );
}
