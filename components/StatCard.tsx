import { Card, CardContent } from "@/components/ui/card";

type Props = {
  label: string;
  value: string | number;
};

export function StatCard({ label, value }: Props) {
  return (
    <Card className="border-white/10 bg-white/8 text-white shadow-xl backdrop-blur">
      <CardContent className="p-4">
        <div className="text-2xl font-bold">{value}</div>
        <div className="mt-1 text-xs text-white/60">{label}</div>
      </CardContent>
    </Card>
  );
}
