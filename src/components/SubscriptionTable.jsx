import { deleteSubscription } from "../services/api";
import { toast } from "react-toastify";

const calculateRemainingDays = (endDate) => {
  const today = new Date();
  const end = new Date(endDate);
  
  // Set hours to 0 to compare dates only
  today.setHours(0, 0, 0, 0);
  end.setHours(0, 0, 0, 0);

  const diff = end - today;
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
};

export default function SubscriptionTable({ subscriptions, refresh, onEdit }) {
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this subscription?")) {
      try {
        await deleteSubscription(id);
        toast.success("Subscription deleted");
        refresh();
      } catch (error) {
        toast.error("Delete failed");
        console.error(error);
      }
    }
  };

  return (
    <div style={{ marginTop: "20px" }}>
      <h3>Subscriptions</h3>
      <table border="1" cellPadding="10" style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ background: "#f4f4f4" }}>
            <th>Email</th>
            <th>Plan</th>
            <th>Cost</th>
            <th>Remaining Days</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {subscriptions.length === 0 ? (
            <tr>
              <td colSpan="6" style={{ textAlign: "center" }}>No subscriptions found</td>
            </tr>
          ) : (
            subscriptions.map((sub) => {
              const remaining = calculateRemainingDays(sub.end_date);

              return (
                <tr key={sub.subscription_id}>
                  <td>{sub.user_email}</td>
                  <td>{sub.plan_name}</td>
                  <td>${sub.monthly_cost}</td>
                  <td>{remaining}</td>
                  <td>
                    {remaining < 0 ? (
                      <span style={{ color: "red", fontWeight: "bold" }}>Expired</span>
                    ) : (
                      <span style={{ color: "green", fontWeight: "bold" }}>Active</span>
                    )}
                  </td>
                  <td>
                    <button
                      onClick={() => onEdit(sub)}
                      style={{ marginRight: "10px", cursor: "pointer" }}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(sub.subscription_id)}
                      style={{ cursor: "pointer", color: "red" }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}