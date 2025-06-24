// hooks/useNotifications.ts
import { useEffect, useState } from "react";
import axios from "axios";

export type Notification = {
  _id: string;
  message: string;
  productId?: string; // ✅ Add this line
  createdAt: string;
};

export default function useNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    const fetchNotifs = () => {
      axios
        .get("http://localhost:5001/api/notifications")
        .then((res) => setNotifications(Array.isArray(res.data) ? res.data : []))
        .catch((err) => console.error("Notification fetch failed", err));
    };

    fetchNotifs(); // Initial fetch
    const interval = setInterval(fetchNotifs, 5000); // Poll every 5 sec
    return () => clearInterval(interval);
  }, []);

  return notifications;
}
