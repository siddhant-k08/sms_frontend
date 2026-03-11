import { deleteSubscription } from "../services/api";
import { toast } from "react-toastify";

export default function DeleteModal({
  subscriptionId,
  close,
  refresh,
}) {

  const handleDelete = async () => {

    try {

      await deleteSubscription(subscriptionId);

      toast.success("Subscription deleted");

      refresh();

      close();

    } catch (err) {

      toast.error("Delete failed");

      console.error(err);

    }

  };

  return (

    <div
      style={{
        border: "1px solid black",
        padding: "20px",
        marginTop: "20px",
        background: "#eee"
      }}
    >

      <h3>Delete Subscription</h3>

      <p>
        Are you sure you want to delete this subscription?
      </p>

      <button onClick={handleDelete}>
        Confirm Delete
      </button>

      <button
        onClick={close}
        style={{ marginLeft: "10px" }}
      >
        Cancel
      </button>

    </div>

  );

}