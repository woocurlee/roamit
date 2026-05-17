import { Card, CardContent } from "@/components/ui/card";
import { LineBadge } from "@/components/LineBadge";

const lineGroups = [
  { line: "2호선", color: "#00A84D", total: 5, visited: 2 },
  { line: "4호선", color: "#00A5DE", total: 3, visited: 0 },
  { line: "5호선", color: "#996CAC", total: 3, visited: 0 },
  { line: "6호선", color: "#CD7C2F", total: 4, visited: 0 },
];

export function CollectionScreen() {
  return (
    <div>
      <h1 className="text-2xl font-bold">역 수집</h1>
      <p className="mt-2 text-sm text-white/55">방문한 역이 하나씩 채워져요.</p>
      <div className="mt-6 space-y-4">
        {lineGroups.map((line) => {
          const percent = Math.round((line.visited / line.total) * 100);
          return (
            <Card
              key={line.line}
              className="border-white/10 bg-white/8 text-white shadow-xl backdrop-blur"
            >
              <CardContent className="p-5">
                <div className="flex items-center justify-between">
                  <LineBadge lineName={line.line} lineColor={line.color} />
                  <span className="text-sm text-white/55">
                    {line.visited}/{line.total}
                  </span>
                </div>
                <div className="mt-4 h-3 rounded-full bg-white/10">
                  <div
                    className="h-3 rounded-full"
                    style={{ width: `${percent}%`, backgroundColor: line.color }}
                  />
                </div>
                <div className="mt-3 text-sm text-white/60">완성도 {percent}%</div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
