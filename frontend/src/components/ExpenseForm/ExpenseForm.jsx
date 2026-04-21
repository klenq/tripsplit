import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import styles from "./ExpenseForm.module.css";

const CATEGORIES = [
  "Food & Drink",
  "Transport",
  "Accommodation",
  "Activities",
  "Shopping",
  "Other",
];

const EMPTY_FORM = {
  description: "",
  amount: "",
  paidBy: "",
  category: "Food & Drink",
  date: new Date().toISOString().split("T")[0],
  splitAmong: [],
};

function ExpenseForm({ members = [], onSubmit, editingExpense = null, onCancelEdit = () => {} }) {
  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // Populate form when editing
  useEffect(() => {
    if (editingExpense) {
      setForm({
        description: editingExpense.description,
        amount: String(editingExpense.amount),
        paidBy: editingExpense.paidBy,
        category: editingExpense.category || "Other",
        date: editingExpense.date
          ? new Date(editingExpense.date).toISOString().split("T")[0]
          : EMPTY_FORM.date,
        splitAmong: editingExpense.splitAmong || [],
      });
    } else {
      setForm(EMPTY_FORM);
    }
    setErrors({});
  }, [editingExpense]);

  function validate() {
    const newErrors = {};
    if (!form.description.trim()) newErrors.description = "Description is required";
    if (!form.amount || isNaN(form.amount) || parseFloat(form.amount) <= 0)
      newErrors.amount = "Enter a valid positive amount";
    if (!form.paidBy.trim()) newErrors.paidBy = "Paid by is required";
    return newErrors;
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  }

  function handleSplitChange(memberName) {
    setForm((prev) => {
      const current = prev.splitAmong || [];
      if (current.includes(memberName)) {
        return { ...prev, splitAmong: current.filter((n) => n !== memberName) };
      } else {
        return { ...prev, splitAmong: [...current, memberName] };
      }
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setLoading(true);
    try {
      await onSubmit({
        ...form,
        amount: parseFloat(form.amount),
      });
      if (!editingExpense) setForm(EMPTY_FORM);
    } finally {
      setLoading(false);
    }
  }

  const isEditing = Boolean(editingExpense);

  return (
    <div className={styles["expense-form-wrapper"]}>
      <h2 className={styles["expense-form-title"]}>
        {isEditing ? "✏️ Edit Expense" : "➕ Add Expense"}
      </h2>
      <form className={styles["expense-form"]} onSubmit={handleSubmit} noValidate>
        <div className={styles["form-group"]}>
          <label htmlFor="description">Description</label>
          <input
            id="description"
            name="description"
            type="text"
            placeholder="e.g. Hotel night 1"
            value={form.description}
            onChange={handleChange}
            className={errors.description ? styles["input-error"] : ""}
            aria-invalid={!!errors.description}
          />
          {errors.description && (
            <span className={styles["error-msg"]} role="alert">{errors.description}</span>
          )}
        </div>

        <div className={styles["form-row"]}>
          <div className={styles["form-group"]}>
            <label htmlFor="amount">Amount ($)</label>
            <input
              id="amount"
              name="amount"
              type="number"
              min="0.01"
              step="0.01"
              placeholder="0.00"
              value={form.amount}
              onChange={handleChange}
              className={errors.amount ? styles["input-error"] : ""}
              aria-invalid={!!errors.amount}
            />
            {errors.amount && (
              <span className={styles["error-msg"]} role="alert">{errors.amount}</span>
            )}
          </div>

          <div className={styles["form-group"]}>
            <label htmlFor="date">Date</label>
            <input
              id="date"
              name="date"
              type="date"
              value={form.date}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className={styles["form-row"]}>
          <div className={styles["form-group"]}>
            <label htmlFor="paidBy">Paid By</label>
            {members && members.length > 0 ? (
              <select
                id="paidBy"
                name="paidBy"
                value={form.paidBy}
                onChange={handleChange}
                className={errors.paidBy ? styles["input-error"] : ""}
                aria-invalid={!!errors.paidBy}
              >
                <option value="">Select member</option>
                {members.map((m) => (
                  <option key={m._id} value={m.name}>
                    {m.name}
                  </option>
                ))}
              </select>
            ) : (
              <input
                id="paidBy"
                name="paidBy"
                type="text"
                placeholder="Who paid?"
                value={form.paidBy}
                onChange={handleChange}
                className={errors.paidBy ? styles["input-error"] : ""}
                aria-invalid={!!errors.paidBy}
              />
            )}
            {errors.paidBy && (
              <span className={styles["error-msg"]} role="alert">{errors.paidBy}</span>
            )}
          </div>

          <div className={styles["form-group"]}>
            <label htmlFor="category">Category</label>
            <select
              id="category"
              name="category"
              value={form.category}
              onChange={handleChange}
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
        </div>

        <fieldset className={styles["form-group"]} style={{ marginTop: "1rem", border: "none", padding: 0 }}>
          <legend style={{ fontSize: "0.8rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--text-secondary, #666)", marginBottom: "0.5rem" }}>
            Split Among (leave empty for everyone)
          </legend>
          {members && members.length > 0 ? (
            <div className="split-among-list" style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem" }}>
              {members.map((m, idx) => {
                const isChecked = form.splitAmong.includes(m.name);
                const checkboxId = `split-${idx}`;
                return (
                  <label htmlFor={checkboxId} key={m._id} style={{ display: "flex", alignItems: "center", gap: "0.3rem", fontSize: "0.9rem", cursor: "pointer", textTransform: "none", fontWeight: "normal" }}>
                    <input
                      id={checkboxId}
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => handleSplitChange(m.name)}
                      style={{ width: "auto", margin: 0 }}
                    />
                    {m.name}
                  </label>
                );
              })}
            </div>
          ) : (
            <span style={{ fontSize: "0.85rem", color: "#666" }}>No members available to split. Add members first.</span>
          )}
        </fieldset>

        <div className={styles["form-actions"]} style={{ marginTop: "1rem" }}>
          {isEditing && (
            <button
              type="button"
              className={`${styles.btn} ${styles["btn-secondary"]}`}
              onClick={onCancelEdit}
            >
              Cancel
            </button>
          )}
          <button type="submit" className={`${styles.btn} ${styles["btn-primary"]}`} disabled={loading}>
            {loading ? "Saving..." : isEditing ? "Save Changes" : "Add Expense"}
          </button>
        </div>
      </form>
    </div>
  );
}

ExpenseForm.propTypes = {
  members: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    })
  ),
  onSubmit: PropTypes.func.isRequired,
  editingExpense: PropTypes.shape({
    _id: PropTypes.string,
    description: PropTypes.string,
    amount: PropTypes.number,
    paidBy: PropTypes.string,
    category: PropTypes.string,
    date: PropTypes.string,
    splitAmong: PropTypes.arrayOf(PropTypes.string),
  }),
  onCancelEdit: PropTypes.func,
};

export default ExpenseForm;
