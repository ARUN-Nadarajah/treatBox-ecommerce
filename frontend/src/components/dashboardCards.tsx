export default function DashboardCards() {
  const cards = [
    { title: "Total Orders", value: "128", color: "bg-pink-100 text-pink-800" },
    { title: "Revenue", value: "$3,248", color: "bg-amber-100 text-amber-800" },
    { title: "Customers", value: "94", color: "bg-emerald-100 text-emerald-800" },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
      {cards.map((card, idx) => (
        <div key={idx} className={`p-6 rounded-2xl shadow-md ${card.color}`}>
          <h2 className="text-sm font-semibold mb-1">{card.title}</h2>
          <p className="text-2xl font-bold">{card.value}</p>
        </div>
      ))}
    </div>
  );
}