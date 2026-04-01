import { useState, useRef } from "react";
import { useProgress } from "../context/ProgressContext";

const REACTIONS = ["❤️", "🥳", "🎉", "✨", "🥹"];
const DEFAULT_AVATAR =
  "https://images.squarespace-cdn.com/content/v1/631ba8eed2196a6795698665/3690ca61-6a9d-4c93-a2a5-83a5f2aa1648/2022-08-16-Trinet-0540-Martinez-Juan.jpg";

const initialComments = [
  {
    id: 1,
    name: "Jon doe",
    date: "Hace 1 día",
    text: "el mejor evento!!!",
    avatar: null,
    reactions: { "❤️": 0, "🥳": 0, "🎉": 0, "✨": 0, "🥹": 0 },
    isOwn: true,
  },
  {
    id: 2,
    name: "Devid prueba",
    date: "Hace 1 día",
    text: "Nsnsks",
    avatar: null,
    reactions: { "❤️": 1, "🥳": 0, "🎉": 0, "✨": 0, "🥹": 0 },
    isOwn: false,
  },
];

export default function Dedicatorias() {
  const [comments, setComments] = useState(initialComments);
  const [form, setForm] = useState({ name: "", text: "" });
  const [avatar, setAvatar] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const fileInputRef = useRef(null);
  const { markComplete, showStepSuccessToast } = useProgress();

  const handleAvatarFile = (file) => {
    if (!file || !file.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = (e) => setAvatar(e.target.result);
    reader.readAsDataURL(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    handleAvatarFile(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => setIsDragging(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.text.trim()) return;

    if (editingId) {
      setComments((prev) =>
        prev.map((c) =>
          c.id === editingId
            ? { ...c, name: form.name, text: form.text, avatar }
            : c,
        ),
      );
      setEditingId(null);
    } else {
      setComments([
        {
          id: Date.now(),
          name: form.name,
          date: "Ahora",
          text: form.text,
          avatar: avatar || DEFAULT_AVATAR,
          reactions: { "❤️": 0, "🥳": 0, "🎉": 0, "✨": 0, "🥹": 0 },
          isOwn: true,
        },
        ...comments,
      ]);
    }

    setForm({ name: "", text: "" });
    setAvatar(null);
    setIsFormOpen(false);
    showStepSuccessToast("dedicatorias");
    markComplete("dedicatorias");
  };

  const handleEdit = (comment) => {
    setForm({ name: comment.name, text: comment.text });
    setAvatar(comment.avatar);
    setEditingId(comment.id);
    setIsFormOpen(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = (id) => {
    setComments((prev) => prev.filter((c) => c.id !== id));
  };

  const handleCancel = () => {
    setForm({ name: "", text: "" });
    setAvatar(null);
    setEditingId(null);
    setIsFormOpen(false);
  };

  const handleReaction = (commentId, emoji) => {
    setComments((prev) =>
      prev.map((c) =>
        c.id === commentId
          ? {
              ...c,
              reactions: {
                ...c.reactions,
                [emoji]: (c.reactions[emoji] || 0) + 1,
              },
            }
          : c,
      ),
    );
  };

  return (
    <div className="page-content">
      <div className="dedications-page">
        <h2 className="section-title">Dedicatorias</h2>
        <p className="dedications-subtitle">Deja un mensaje especial</p>

        {!isFormOpen ? (
          <button
            type="button"
            className="btn btn-primary dedication-open-btn"
            onClick={() => setIsFormOpen(true)}
          >
            ✍️ Escribir dedicatoria
          </button>
        ) : null}

        {/* Form */}
        <div className={`dedication-form ${isFormOpen ? "open" : "collapsed"}`}>
          <form onSubmit={handleSubmit}>
            <div className="dedication-form-header">
              <h3>
                {editingId ? "Editar dedicatoria" : "Escribe tu dedicatoria"}
              </h3>
            </div>
            <div
              className={`avatar-upload-row ${isDragging ? "dragging" : ""}`}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
            >
              <div className="avatar-preview">
                {avatar ? (
                  <img src={avatar} alt="Avatar" />
                ) : (
                  <span className="avatar-placeholder">👤</span>
                )}
              </div>
              <button
                type="button"
                className="btn-upload-avatar"
                onClick={() => fileInputRef.current?.click()}
              >
                📤 Agregar foto de perfil
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                hidden
                onChange={(e) => handleAvatarFile(e.target.files[0])}
              />
            </div>

            <div className="form-group">
              <input
                type="text"
                placeholder="Nombre y Apellido"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <textarea
                placeholder="Escribe tus mejores deseos aquí..."
                value={form.text}
                onChange={(e) => setForm({ ...form, text: e.target.value })}
                required
              />
            </div>
            <div className="dedication-form-actions">
              <button
                type="button"
                className="btn-text-cancel"
                onClick={handleCancel}
              >
                Cancelar
              </button>
              <button type="submit" className="btn btn-primary btn-publish">
                {editingId ? "Actualizar" : "Publicar"}
              </button>
            </div>
          </form>
        </div>

        {/* Comments list */}
        <div className="dedications-count">{comments.length} dedicatorias</div>
        <div className="comment-list">
          {comments.map((c) => (
            <div
              key={c.id}
              className={`comment-card ${c.isOwn ? "comment-own" : ""}`}
            >
              {c.isOwn && (
                <div className="comment-own-header">
                  <span className="badge-own">TU DEDICATORIA</span>
                  <div className="comment-own-actions">
                    <button onClick={() => handleEdit(c)} title="Editar">
                      ✏️
                    </button>
                    <button onClick={() => handleDelete(c.id)} title="Eliminar">
                      🗑️
                    </button>
                  </div>
                </div>
              )}
              <div className="comment-header">
                <div className="comment-avatar">
                  <img src={c.avatar || DEFAULT_AVATAR} alt={c.name} />
                </div>
                <div>
                  <div className="comment-name">{c.name}</div>
                  <div className="comment-date">{c.date}</div>
                </div>
              </div>
              <p className="comment-text">{c.text}</p>
              <div className="comment-reactions">
                {REACTIONS.map((emoji) => (
                  <button
                    key={emoji}
                    className={`reaction-btn ${c.reactions[emoji] > 0 ? "active" : ""}`}
                    onClick={() => handleReaction(c.id, emoji)}
                  >
                    {emoji}
                    {c.reactions[emoji] > 0 && (
                      <span>{c.reactions[emoji]}</span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
