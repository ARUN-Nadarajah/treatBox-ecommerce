// src/components/NotificationList.tsx
import useNotifications from "../hooks/useNotifications";
import { Link } from "react-router-dom";

export default function NotificationList() {
  const notifications = useNotifications();

  if (notifications.length === 0) return null;

  return (
    <div className="bg-white rounded-xl shadow-md p-4 mb-4 border border-rose-200 absolute top-16 right-8 z-50 w-72">
      <h3 className="text-lg font-bold text-rose-600 mb-3">🔔 Latest Updates</h3>
      <ul className="space-y-2">
        {notifications.map((notif) => (
          <li key={notif._id}>
            {notif.productId ? (
              <Link
                to={`/?scrollTo=${notif.productId}`}
                className="text-blue-600 hover:underline flex items-center gap-1"
              >
                🧁 {notif.message}
              </Link>
            ) : (
              <span>🧁 {notif.message}</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
