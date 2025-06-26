// src/components/NotificationList.tsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

type Notification = {
  id: string;
  message: string;
  productId?: string;
};

export default function NotificationList() {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    fetch("http://localhost:5001/api/notifications")
      .then((res) => res.json())
      .then((data) => setNotifications(data))
      .catch((err) => console.error("Failed to fetch notifications", err));
  }, []);

  const handleClick = async (notifId: string) => {
    // remove from UI
    setNotifications((prev) => prev.filter((n) => n.id !== notifId));
    // delete on backend
    await fetch(`http://localhost:5001/api/notifications/${notifId}`, {
      method: "DELETE",
    });
  };

  if (notifications.length === 0) return null;

  return (
    <div className="bg-white rounded-xl shadow-md p-4 mb-4 border border-rose-200 absolute top-16 right-8 z-50 w-72">
      <h3 className="text-lg font-bold text-rose-600 mb-3">🔔 Latest Updates</h3>
      <ul className="space-y-2">
        {notifications.map((notif) => (
          <li key={notif.id}>
            {notif.productId ? (
              <Link
                to={`/?scrollTo=${notif.productId}`}
                onClick={() => handleClick(notif.id)}
                className="text-blue-600 hover:underline flex items-center gap-1"
              >
                🧁 {notif.message}
              </Link>
            ) : (
              <span className="text-gray-700">🧁 {notif.message}</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
