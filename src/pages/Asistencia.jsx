import { useState } from "react";
import { useProgress } from "../context/ProgressContext";

const STORAGE_KEY = "asistencia-response-v1";

const dinnerOptions = ["Pollo al cilindro", "Adobo de pollo"];

const drinkOptions = [
  "Cerveza",
  "Daiquiri",
  "Pisco sour",
  "Machu Picchu",
  "Chilcano",
  "Laguna azul",
  "Tragos vírgenes (Sin Alcohol)",
];

const initialFormState = {
  attending: "",
  phone: "",
  adultCount: "",
  adultNames: "",
  childCount: "",
  childNames: "",
  dinner: "",
  drinks: [],
  comments: "",
};

const fieldLabels = [
  { key: "attending", label: "¿Podrás asistir?" },
  { key: "phone", label: "Celular" },
  { key: "adultCount", label: "Cantidad de adultos" },
  { key: "adultNames", label: "Nombres y apellidos de adultos" },
  { key: "childCount", label: "Cantidad de niños/niñas" },
  { key: "childNames", label: "Nombres de niños/niñas" },
  { key: "dinner", label: "Cena" },
  { key: "drinks", label: "Barra libre" },
  { key: "comments", label: "Comentarios o preguntas" },
];

function loadSavedAttendance() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return null;

    const parsed = JSON.parse(saved);
    if (!parsed || typeof parsed !== "object" || !parsed.form) return null;

    return parsed;
  } catch {
    return null;
  }
}

function formatDateTime(value) {
  if (!value) return "";

  try {
    return new Intl.DateTimeFormat("es-PE", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(value));
  } catch {
    return value;
  }
}

export default function Asistencia() {
  const [savedAttendance, setSavedAttendance] = useState(() =>
    loadSavedAttendance(),
  );
  const [isEditing, setIsEditing] = useState(false);
  const { completed, markComplete, showStepSuccessToast } = useProgress();
  const [form, setForm] = useState(
    () => savedAttendance?.form ?? initialFormState,
  );

  const handleDrinkToggle = (drink) => {
    setForm((prev) => ({
      ...prev,
      drinks: prev.drinks.includes(drink)
        ? prev.drinks.filter((d) => d !== drink)
        : [...prev.drinks, drink],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      submittedAt: new Date().toISOString(),
      form: {
        ...form,
        drinks: [...form.drinks],
      },
    };

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    } catch {
      // Ignore storage failures.
    }

    setSavedAttendance(payload);
    setIsEditing(false);
    showStepSuccessToast("asistencia");
    markComplete("asistencia");
  };

  const hasSavedAttendance = Boolean(savedAttendance) || completed.asistencia;

  if (hasSavedAttendance && !isEditing) {
    const current = savedAttendance?.form ?? form;

    return (
      <div className="page-content">
        <div className="asistencia-history-page">
          <div className="asistencia-history-card">
            <h2 className="asistencia-history-title">
              Gracias por confirmar tu asistencia
            </h2>
            <p className="asistencia-history-subtitle">
              ¿Quieres enviar una nueva confirmación de asistencia?
            </p>

            <div className="modal-actions attendance-actions">
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => {
                  setForm(current);
                  setIsEditing(true);
                }}
              >
                Sí, continuar
              </button>
            </div>

            <div className="attendance-history-header">
              <p className="attendance-history-date">
                {formatDateTime(savedAttendance?.submittedAt)}
              </p>
              <h3>Tus respuestas anteriores</h3>
            </div>

            <div className="attendance-table-wrap">
              <table className="attendance-table">
                <thead>
                  <tr>
                    <th>Pregunta</th>
                    <th>Respuesta</th>
                  </tr>
                </thead>
                <tbody>
                  {fieldLabels.map(({ key, label }) => {
                    const value = current[key];
                    const displayValue = Array.isArray(value)
                      ? value.length
                        ? value.join(", ")
                        : "-"
                      : value || "-";

                    return (
                      <tr key={key}>
                        <td>{label}</td>
                        <td>{displayValue}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <p className="attendance-note">
              * Si deseas editar o eliminar tus respuestas anteriores, contacta
              al organizador del evento.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-content">
      <div className="asistencia-page">
        <h2 className="section-title">Confirmar asistencia</h2>

        <form onSubmit={handleSubmit} className="asistencia-form">
          {/* Asistencia */}
          <div className="form-group">
            <label>
              ¿Podrás asistir?<span className="required">*</span>
            </label>
            <div className="radio-group">
              <label className="radio-label">
                <input
                  type="radio"
                  name="attending"
                  value="si"
                  checked={form.attending === "si"}
                  onChange={(e) =>
                    setForm({ ...form, attending: e.target.value })
                  }
                  required
                />
                <span>Sí, ahí estaré</span>
              </label>
              <label className="radio-label">
                <input
                  type="radio"
                  name="attending"
                  value="no"
                  checked={form.attending === "no"}
                  onChange={(e) =>
                    setForm({ ...form, attending: e.target.value })
                  }
                />
                <span>No puedo, lo siento</span>
              </label>
            </div>
          </div>

          {/* Celular */}
          <div className="form-group">
            <label>
              Celular<span className="required">*</span>
            </label>
            <input
              type="tel"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              required
            />
          </div>

          {/* Cantidad de adultos */}
          <div className="form-group">
            <label>
              Cantidad de adultos<span className="required">*</span>
            </label>
            <input
              type="number"
              min="0"
              value={form.adultCount}
              onChange={(e) => setForm({ ...form, adultCount: e.target.value })}
              required
            />
          </div>

          {/* Nombres de adultos */}
          <div className="form-group">
            <label>
              Nombres y apellidos de adultos<span className="required">*</span>
            </label>
            <textarea
              value={form.adultNames}
              onChange={(e) => setForm({ ...form, adultNames: e.target.value })}
              required
            />
          </div>

          {/* Cantidad de niños */}
          <div className="form-group">
            <label>
              Cantidad de niños/niñas<span className="required">*</span>
            </label>
            <input
              type="number"
              min="0"
              value={form.childCount}
              onChange={(e) => setForm({ ...form, childCount: e.target.value })}
              required
            />
          </div>

          {/* Nombres de niños */}
          <div className="form-group">
            <label>Nombres de niños/niñas</label>
            <textarea
              value={form.childNames}
              onChange={(e) => setForm({ ...form, childNames: e.target.value })}
            />
          </div>

          {/* Cena */}
          <div className="form-group">
            <label>Cena (Se hará la que tiene mayor votación)</label>
            <div className="radio-group">
              {dinnerOptions.map((option) => (
                <label key={option} className="radio-label">
                  <input
                    type="radio"
                    name="dinner"
                    value={option}
                    checked={form.dinner === option}
                    onChange={(e) =>
                      setForm({ ...form, dinner: e.target.value })
                    }
                  />
                  <span>{option}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Barra libre */}
          <div className="form-group">
            <label>Barra libre (Se darán las que tienen mayor votación)</label>
            <div className="checkbox-group">
              {drinkOptions.map((drink) => (
                <label key={drink} className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={form.drinks.includes(drink)}
                    onChange={() => handleDrinkToggle(drink)}
                  />
                  <span>{drink}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Comentarios */}
          <div className="form-group">
            <label>Comentarios o preguntas</label>
            <textarea
              value={form.comments}
              onChange={(e) => setForm({ ...form, comments: e.target.value })}
            />
          </div>

          <button type="submit" className="btn btn-primary btn-confirm-full">
            💾 Confirmar
          </button>
        </form>
      </div>
    </div>
  );
}
