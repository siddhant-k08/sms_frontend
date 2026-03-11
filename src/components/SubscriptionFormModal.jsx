import { useState, useEffect } from "react";
import { createSubscription, updateSubscription } from "../services/api";
import { toast } from "react-toastify";

export default function SubscriptionFormModal({ refresh, editData, clearEdit }) {
  const initialFormState = {
    user_email: "",
    plan_name: "",
    start_date: "",
    end_date: "",
    monthly_cost: "",
    status: "Active",
  };

  const [form, setForm] = useState(initialFormState);

  useEffect(() => {
    if (editData) {
      const formattedData = {
        ...editData,
        start_date: editData.start_date ? editData.start_date.split("T")[0] : "",
        end_date: editData.end_date ? editData.end_date.split("T")[0] : "",
      };
      setForm(formattedData);
    } else {
      setForm(initialFormState);
    }
  }, [editData]);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setForm({
      ...form,
      [name]: type === "number" ? (value === "" ? "" : parseFloat(value)) : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Simple validation: end_date should be after start_date
    if (new Date(form.end_date) <= new Date(form.start_date)) {
      toast.error("End date must be after start date");
      return;
    }

    try {
      if (editData) {
        await updateSubscription(editData.subscription_id, form);
        toast.success("Subscription updated successfully");
        clearEdit();
      } else {
        await createSubscription(form);
        toast.success("Subscription created successfully");
      }
      setForm(initialFormState);
      refresh();
    } catch (error) {
      toast.error(editData ? "Failed to update subscription" : "Failed to create subscription");
      console.error(error);
    }
  };

  const handleCancel = () => {
    setForm(initialFormState);
    if (editData) clearEdit();
  };

  const inputStyle = {
    padding: "8px",
    marginRight: "10px",
    marginBottom: "10px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    width: "200px"
  };

  return (
    <div style={{ 
      border: "1px solid #ddd", 
      padding: "20px", 
      marginBottom: "30px", 
      backgroundColor: "#f9f9f9",
      borderRadius: "8px",
      boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
    }}>
      <h3 style={{ marginTop: 0 }}>{editData ? "✏️ Edit Subscription" : "➕ Add New Subscription"}</h3>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexWrap: "wrap", alignItems: "center" }}>
        <div>
          <label style={{ display: "block", fontSize: "12px", color: "#666" }}>Email</label>
          <input
            name="user_email"
            placeholder="User Email"
            value={form.user_email}
            onChange={handleChange}
            required
            type="email"
            style={inputStyle}
          />
        </div>

        <div>
          <label style={{ display: "block", fontSize: "12px", color: "#666" }}>Plan Name</label>
          <input
            name="plan_name"
            placeholder="e.g. Netflix Premium"
            value={form.plan_name}
            onChange={handleChange}
            required
            style={inputStyle}
          />
        </div>

        <div>
          <label style={{ display: "block", fontSize: "12px", color: "#666" }}>Start Date</label>
          <input
            type="date"
            name="start_date"
            value={form.start_date}
            onChange={handleChange}
            required
            style={inputStyle}
          />
        </div>

        <div>
          <label style={{ display: "block", fontSize: "12px", color: "#666" }}>End Date</label>
          <input
            type="date"
            name="end_date"
            value={form.end_date}
            onChange={handleChange}
            required
            style={inputStyle}
          />
        </div>

        <div>
          <label style={{ display: "block", fontSize: "12px", color: "#666" }}>Monthly Cost ($)</label>
          <input
            type="number"
            name="monthly_cost"
            placeholder="0.00"
            step="0.01"
            value={form.monthly_cost}
            onChange={handleChange}
            required
            style={inputStyle}
          />
        </div>

        <div>
          <label style={{ display: "block", fontSize: "12px", color: "#666" }}>Status</label>
          <select 
            name="status" 
            value={form.status} 
            onChange={handleChange}
            style={{ ...inputStyle, width: "120px" }}
          >
            <option value="Active">Active</option>
            <option value="Expired">Expired</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>

        <div style={{ width: "100%", marginTop: "10px" }}>
          <button 
            type="submit" 
            style={{ 
              padding: "10px 20px", 
              backgroundColor: editData ? "#2196F3" : "#4CAF50", 
              color: "white", 
              border: "none", 
              borderRadius: "4px",
              cursor: "pointer",
              fontWeight: "bold"
            }}
          >
            {editData ? "Update Subscription" : "Add Subscription"}
          </button>
          
          {(editData || form.user_email || form.plan_name) && (
            <button 
              type="button" 
              onClick={handleCancel} 
              style={{ 
                marginLeft: "10px", 
                padding: "10px 20px",
                backgroundColor: "#f44336",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer"
              }}
            >
              Cancel / Clear
            </button>
          )}
        </div>
      </form>
    </div>
  );
}