import { useState, useEffect } from 'react';
import { useProgress } from '../context/ProgressContext';

const gifts = [
  { id: 1, name: 'Set de juguetes educativos', price: 'S/ 89.90', store: 'Tienda Rumba77', emoji: '🧩', badge: true },
  { id: 2, name: 'Pañalera organizadora premium', price: 'S/ 120.00', store: 'Baby Store', emoji: '👜', reserved: false },
  { id: 3, name: 'Coche de paseo plegable', price: 'S/ 450.00', store: 'BabyPlaza', emoji: '🛒', reserved: false },
  { id: 4, name: 'Set de biberones anti-cólicos', price: 'S/ 75.00', store: 'Tienda Rumba77', emoji: '🍼', badge: true },
  { id: 5, name: 'Columpio para bebé', price: 'S/ 180.00', store: 'Tienda Rumba77', emoji: '🎠', badge: true },
  { id: 6, name: 'Kit de baño para bebé', price: 'S/ 65.00', store: 'Baby Store', emoji: '🛁' },
  { id: 7, name: 'Andador musical interactivo', price: 'S/ 199.00', store: 'Tienda Rumba77', emoji: '🚶', badge: true },
  { id: 8, name: 'Ropa de bebé set x5', price: 'S/ 95.00', store: 'Carter\'s', emoji: '👕' },
  { id: 9, name: 'Peluche gigante', price: 'S/ 55.00', store: 'Tienda Rumba77', emoji: '🧸', badge: true },
  { id: 10, name: 'Monitor de bebé con cámara', price: 'S/ 280.00', store: 'TechBaby', emoji: '📹', reserved: true },
  { id: 11, name: 'Silla de comer portátil', price: 'S/ 220.00', store: 'BabyPlaza', emoji: '💺' },
  { id: 12, name: 'Set de cubiertos para bebé', price: 'S/ 35.00', store: 'Tienda Rumba77', emoji: '🥄', badge: true },
  { id: 13, name: 'Manta térmica de algodón', price: 'S/ 49.90', store: 'Baby Store', emoji: '🧣' },
  { id: 14, name: 'Cuna portátil con mosquitero', price: 'S/ 350.00', store: 'BabyPlaza', emoji: '🛏️' },
  { id: 15, name: 'Libros sensoriales x3', price: 'S/ 42.00', store: 'Tienda Rumba77', emoji: '📚', badge: true },
  { id: 16, name: 'Gimnasio para bebé', price: 'S/ 160.00', store: 'Fisher Price', emoji: '🤸', reserved: true },
];

export default function Regalos() {
  const [items, setItems] = useState(gifts);
  const [showToast, setShowToast] = useState(false);
  const [selectedGift, setSelectedGift] = useState(null);
  const [modalForm, setModalForm] = useState({ name: '', phone: '', commit: false });
  const { markComplete } = useProgress();

  useEffect(() => {
    if (selectedGift) {
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
    }
    return () => document.body.classList.remove('modal-open');
  }, [selectedGift]);

  const handleReserve = () => {
    if (!modalForm.name.trim() || !modalForm.phone.trim() || !modalForm.commit) return;
    setItems(items.map(g => g.id === selectedGift.id ? { ...g, reserved: true } : g));
    setSelectedGift(null);
    setModalForm({ name: '', phone: '', commit: false });
    markComplete('regalos');
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const available = items.filter(g => !g.reserved).length;
  const reserved = items.filter(g => g.reserved).length;

  return (
    <div className="page-content">
      <div className="gift-page-header">
        <h2>Lista de regalos de Bebé Joe Mateo 👼</h2>
        <p className="gift-header-text">
          🎂 ¡Tu presencia en mi Primer Añito es el mejor regalo! 🎉
          <br /><br />
          Si deseas traer algo especial, hemos preparado una lista de regalos que me gustan. Elige y, si necesitas, puedo ayudarte con la compra.
        </p>
        <p className="gift-reminder">🎁 No olvides registrar tu regalo.</p>
        <div className="gift-stats">
          <div className="gift-stat">
            <span>{items.length}</span>
            <small>Total</small>
          </div>
          <div className="gift-stat">
            <span>{available}</span>
            <small>Disponibles</small>
          </div>
          <div className="gift-stat">
            <span>{reserved}</span>
            <small>Reservados</small>
          </div>
        </div>
      </div>

      <div className="gift-list">
        {items.map((gift) => (
          <div key={gift.id} className={`gift-card ${gift.reserved ? 'reserved' : ''}`}>
            {gift.badge && <div className="gift-badge">Rumba77</div>}
            <div className="gift-image">{gift.emoji}</div>
            <div className="gift-info">
              <h4>{gift.name}</h4>
              <div className="price">{gift.price}</div>
              <div className="store">{gift.store}</div>
            </div>
            <button
              className={`gift-btn ${gift.reserved ? 'reserved' : ''}`}
              onClick={() => !gift.reserved && setSelectedGift(gift)}
              disabled={gift.reserved}
            >
              {gift.reserved ? 'Reservado' : 'Reservar'}
            </button>
          </div>
        ))}
      </div>

      {/* Modal de regalo */}
      {selectedGift && (
        <div className="modal-overlay" onClick={() => setSelectedGift(null)}>
          <div className="gift-modal" onClick={(e) => e.stopPropagation()}>
            <button className="gift-modal-close" onClick={() => setSelectedGift(null)}>✕</button>
            <h3 className="gift-modal-title">Regalar</h3>

            <div className="gift-modal-card">
              <div className="gift-modal-emoji">{selectedGift.emoji}</div>
              <h4>{selectedGift.name}</h4>
              <p className="gift-modal-store">Lo puedes encontrar en {selectedGift.store}</p>
              <p className="gift-modal-price">{selectedGift.price} (PEN) <span>referencial</span></p>
            </div>

            <div className="form-group">
              <label>Nombres y apellidos<span className="required">*</span></label>
              <input
                type="text"
                value={modalForm.name}
                onChange={(e) => setModalForm({ ...modalForm, name: e.target.value })}
                required
              />
            </div>

            <div className="form-group">
              <label>Celular<span className="required">*</span></label>
              <input
                type="tel"
                value={modalForm.phone}
                onChange={(e) => setModalForm({ ...modalForm, phone: e.target.value })}
                required
              />
            </div>

            <label className="gift-modal-checkbox">
              <input
                type="checkbox"
                checked={modalForm.commit}
                onChange={(e) => setModalForm({ ...modalForm, commit: e.target.checked })}
              />
              <span>Me comprometo a comprar este regalo y llevarlo al evento, o transferir el monto al organizador</span>
            </label>

            <button
              className="btn btn-primary gift-modal-btn"
              onClick={handleReserve}
            >
              🎁 Regalar
            </button>
          </div>
        </div>
      )}

      {showToast && (
        <div className="success-toast">🎁 ¡Regalo reservado con éxito!</div>
      )}
    </div>
  );
}
