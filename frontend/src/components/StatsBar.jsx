export default function StatsBar({ stats }) {
  const cards = [
    { label: 'Total applications', value: stats?.total ?? 0 },
    { label: 'Interviews', value: stats?.interviews ?? 0 },
    { label: 'Offers', value: stats?.offers ?? 0 },
    { label: 'Interview rate', value: `${stats?.interviewRate ?? 0}%` },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
      {cards.map((card) => (
        <div
          key={card.label}
          className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
        >
          <p className="text-sm font-medium text-slate-500">{card.label}</p>
          <p className="mt-1 text-2xl font-semibold text-slate-900">{card.value}</p>
        </div>
      ))}
    </div>
  );
}
