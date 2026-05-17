import { placeTypes } from "@/mock/config";

type Props = {
  typeLabel: string;
};

export function PlaceTypeBadge({ typeLabel }: Props) {
  const type = placeTypes.find((item) => item.label === typeLabel) ?? placeTypes[0];
  const Icon = type.icon;
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-black/8 px-2.5 py-1 text-[11px] text-slate-600 dark:bg-white/10 dark:text-white/65">
      <Icon size={12} /> {typeLabel}
    </span>
  );
}
