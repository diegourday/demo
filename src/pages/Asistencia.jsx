import { useState } from 'react';
import { useProgress } from '../context/ProgressContext';

const dinnerOptions = [
  'Pollo al cilindro',
  'Adobo de pollo',
];

const drinkOptions = [
  'Cerveza',
  'Daiquiri',
  'Pisco sour',
  'Machu Picchu',
  'Chilcano',
  'Laguna azul',
  'Tragos vírgenes (Sin Alcohol)',
];

export default function Asistencia() {
  const [showToast, setShowToast] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { completed, markComplete } = useProgress();
  const [form, setForm] = useState({
    attending: '',
    phone: '',
    adultCount: '',
    adultNames: '',
    childCount: '',
    childNames: '',
    dinner: '',
    drinks: [],
    comments: '',
  });

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
    setSubmitted(true);
    markComplete('asistencia');
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  if (submitted || completed.asistencia) {
    return (
      <div className="page-content">
        <div className="completion-message">
          <div className="completion-emoji">✅</div>
          <h2 className="section-title">¡Asistencia confirmada!</h2>
          <p className="section-text">
            Gracias por confirmar tu asistencia. ¡Te esperamos con mucha alegría
            en la fiesta de Joe Mateo!
          </p>
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
            <label>¿Podrás asistir?<span className="required">*</span></label>
            <div className="radio-group">
              <label className="radio-label">
                <input
                  type="radio"
                  name="attending"
                  value="si"
                  checked={form.attending === 'si'}
                  onChange={(e) => setForm({ ...form, attending: e.target.value })}
                  required
                />
                <span>Sí, ahí estaré</span>
              </label>
              <label className="radio-label">
                <input
                  type="radio"
                  name="attending"
                  value="no"
                  checked={form.attending === 'no'}
                  onChange={(e) => setForm({ ...form, attending: e.target.value })}
                />
                <span>No puedo, lo siento</span>
              </label>
            </div>
          </div>

          {/* Celular */}
          <div className="form-group">
            <label>Celular<span className="required">*</span></label>
            <input
              type="tel"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              required
            />
          </div>

          {/* Cantidad de adultos */}
          <div className="form-group">
            <label>Cantidad de adultos<span className="required">*</span></label>
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
            <label>Nombres y apellidos de adultos<span className="required">*</span></label>
            <textarea
              value={form.adultNames}
              onChange={(e) => setForm({ ...form, adultNames: e.target.value })}
              required
            />
          </div>

          {/* Cantidad de niños */}
          <div className="form-group">
            <label>Cantidad de niños/niñas<span className="required">*</span></label>
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
                    onChange={(e) => setForm({ ...form, dinner: e.target.value })}
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

      {showToast && (
        <div className="success-toast">✅ ¡Asistencia confirmada con éxito!</div>
      )}
    </div>
  );
}
