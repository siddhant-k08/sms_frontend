import { useEffect, useState } from "react";
import { getSubscriptions } from "./services/api";
import SubscriptionTable from "./components/SubscriptionTable";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SubscriptionFormModal from "./components/SubscriptionFormModal";

function App() {
  const [subscriptions, setSubscriptions] = useState([]);
  const [editData, setEditData] = useState(null);

  const loadSubscriptions = async () => {
    try {
      const res = await getSubscriptions();
      setSubscriptions(res.data);
    } catch (error) {
      toast.error("Failed to load subscriptions");
      console.error(error);
    }
  };

  useEffect(() => {
    loadSubscriptions();
  }, []);

  const handleEdit = (sub) => {
    setEditData(sub);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const clearEdit = () => {
    setEditData(null);
  };

  return (
    <div style={{ padding: "40px", maxWidth: "1200px", margin: "0 auto" }}>
      <h1>Subscription Manager</h1>
      
      <SubscriptionFormModal 
        refresh={loadSubscriptions} 
        editData={editData}
        clearEdit={clearEdit}
      />

      <SubscriptionTable
        subscriptions={subscriptions}
        refresh={loadSubscriptions}
        onEdit={handleEdit}
      />

      <ToastContainer position="bottom-right" />
    </div>
  );
}

export default App;