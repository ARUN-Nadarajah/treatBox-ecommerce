export default function DashboardCards() {
  const cards = [
    { title: "Total Orders", value: "128", color: "bg-pink-100 text-pink-700" },
    { title: "Revenue", value: "$3,248", color: "bg-green-100 text-green-700" },
    { title: "Customers", value: "94", color: "bg-blue-100 text-blue-700" },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
      {cards.map((card, idx) => (
        <div key={idx} className={`p-4 rounded-xl shadow-sm ${card.color}`}>
          <h2 className="text-sm font-medium">{card.title}</h2>
          <p className="text-xl font-semibold">{card.value}</p>
        </div>
      ))}
    </div>
  );
}