import { Card, CardContent } from "@/components/ui/card";

type Props = {
  label: string;
  value: string | number;
};

export function StatCard({ label, value }: Props) {
  return (
    <Card className="border-black/8 bg-white text-slate-900 shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/8 dark:text-white dark:shadow-xl">
      <CardContent className="p-4">
        <div className="text-2xl font-bold">{value}</div>
        <div className="mt-1 text-xs text-slate-500 dark:text-white/60">{label}</div>
      </CardContent>
    </Card>
  );
}
