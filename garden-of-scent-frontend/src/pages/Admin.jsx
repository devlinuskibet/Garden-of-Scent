import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';

/* ───────────────────────────── constants ───────────────────────────── */

const ADMIN_PASS = import.meta.env.VITE_ADMIN_PASSWORD;
const SESSION_KEY = 'gos_admin_auth';

const CATEGORY_OPTIONS = [
  'Luxury Perfumes',
  'Bath & Body Works',
  'Body Care',
];

const SCENT_FAMILIES = [
  'Floral',
  'Woody',
  'Oriental',
  'Fresh',
  'Fruity',
  'Gourmand',
  'Citrus',
  'Aquatic',
];

const INTENSITY_OPTIONS = ['Light', 'Medium', 'Strong'];
const OCCASION_OPTIONS = ['Daily', 'Evening', 'Date Night', 'Night', 'Special', 'Formal', 'Summer'];

const blankProduct = {
  name: '',
  brand: '',
  category: 'Bath & Body Works',
  price: 2200,
  scent_family: 'Floral',
  top_notes: '',
  heart_notes: '',
  base_notes: '',
  vibe_tag: '',
  intensity: 'Medium',
  occasion: 'Daily',
  image_url: '',
  description: '',
};

/* ───────────────────────── helper: format KSh ─────────────────────── */
const fmtKSh = (n) => `KSh ${Number(n).toLocaleString()}`;

/* ───────────────────────── helper: Tooltip ────────────────────────── */
const InfoTooltip = ({ text }) => (
  <span className="admin-tooltip-wrap">
    <span className="admin-tooltip-icon">ⓘ</span>
    <span className="admin-tooltip-content">{text}</span>
  </span>
);

/* ════════════════════════════════════════════════════════════════════
   ADMIN PAGE
   ════════════════════════════════════════════════════════════════════ */

const Admin = () => {
  const navigate = useNavigate();

  /* ── auth state ── */
  const [authed, setAuthed] = useState(() => sessionStorage.getItem(SESSION_KEY) === 'true');
  const [passInput, setPassInput] = useState('');
  const [loginError, setLoginError] = useState(false);
  const [loginShake, setLoginShake] = useState(false);

  /* ── data state ── */
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [analytics, setAnalytics] = useState({ page_view: 0, whatsapp_click: 0 });

  /* ── form state ── */
  const [form, setForm] = useState({ ...blankProduct });
  const [editingId, setEditingId] = useState(null);
  const [saving, setSaving] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = React.useRef(null);

  /* ── delete confirm state ── */
  const [deleteTarget, setDeleteTarget] = useState(null);

  /* ── toast state ── */
  const [toast, setToast] = useState(null);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  /* ───────────────────── login handler ─────────────────────── */
  const handleLogin = (e) => {
    e.preventDefault();
    if (passInput === ADMIN_PASS) {
      sessionStorage.setItem(SESSION_KEY, 'true');
      setAuthed(true);
      setLoginError(false);
    } else {
      setLoginError(true);
      setLoginShake(true);
      setTimeout(() => setLoginShake(false), 600);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem(SESSION_KEY);
    setAuthed(false);
    navigate('/');
  };

  /* ───────────────────── data fetching ─────────────────────── */
  const fetchProducts = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('id', { ascending: true });
    if (!error && data) setProducts(data);
    setLoading(false);
  }, []);

  const fetchAnalytics = useCallback(async () => {
    const { data, error } = await supabase
      .from('site_analytics')
      .select('*');
    if (!error && data) {
      const mapped = {};
      data.forEach((row) => {
        mapped[row.event_type] = row.count;
      });
      setAnalytics({
        page_view: mapped.page_view || 0,
        whatsapp_click: mapped.whatsapp_click || 0,
      });
    }
  }, []);

  useEffect(() => {
    if (authed) {
      fetchProducts();
      fetchAnalytics();
    }
  }, [authed, fetchProducts, fetchAnalytics]);

  /* ───────────────────── form helpers ──────────────────────── */
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: name === 'price' ? Number(value) : value }));
  };

  const resetForm = () => {
    setForm({ ...blankProduct });
    setEditingId(null);
    setImageFile(null);
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleFileSelect = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.brand.trim()) {
      showToast('Product name and brand are required');
      return;
    }
    setSaving(true);

    let finalImageUrl = form.image_url;

    /* ── Step A: Upload image to Supabase Storage ── */
    if (imageFile) {
      try {
        const fileExt = imageFile.name.split('.').pop();
        const fileName = `${Date.now()}.${fileExt}`;
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('product-images')
          .upload(fileName, imageFile);

        if (uploadError) {
          showToast('Image upload failed — please try again');
          console.error(uploadError);
          setSaving(false);
          return;
        }

        /* ── Step B: Get public URL ── */
        const { data: urlData } = supabase.storage
          .from('product-images')
          .getPublicUrl(fileName);
        finalImageUrl = urlData.publicUrl;
      } catch (err) {
        showToast('Image upload failed');
        console.error(err);
        setSaving(false);
        return;
      }
    }

    /* ── Step C: Insert / Update product row ── */
    const productPayload = { ...form, image_url: finalImageUrl };

    if (editingId) {
      const { error } = await supabase
        .from('products')
        .update(productPayload)
        .eq('id', editingId);
      if (error) {
        showToast('Error updating product');
      } else {
        showToast('Product updated successfully');
        resetForm();
        fetchProducts();
      }
    } else {
      const { error } = await supabase
        .from('products')
        .insert([productPayload]);
      if (error) {
        showToast('Error adding product');
        console.error(error);
      } else {
        showToast('Product added successfully');
        resetForm();
        fetchProducts();
      }
    }
    setSaving(false);
  };

  const startEdit = (product) => {
    setEditingId(product.id);
    setForm({
      name: product.name || '',
      brand: product.brand || '',
      category: product.category || 'Bath & Body Works',
      price: product.price || 2200,
      scent_family: product.scent_family || 'Floral',
      top_notes: product.top_notes || '',
      heart_notes: product.heart_notes || '',
      base_notes: product.base_notes || '',
      vibe_tag: product.vibe_tag || '',
      intensity: product.intensity || 'Medium',
      occasion: product.occasion || 'Daily',
      image_url: product.image_url || '',
      description: product.description || '',
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  /* ───────────────────── delete handler ────────────────────── */
  const confirmDelete = async () => {
    if (!deleteTarget) return;
    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', deleteTarget.id);
    if (error) {
      showToast('Error deleting product');
    } else {
      showToast(`"${deleteTarget.name}" removed`);
      setProducts((prev) => prev.filter((p) => p.id !== deleteTarget.id));
    }
    setDeleteTarget(null);
  };

  /* ════════════════════════════════════════════════════════════
     RENDER — LOGIN OVERLAY
     ════════════════════════════════════════════════════════════ */
  if (!authed) {
    return (
      <div className="admin-login-overlay">
        <form
          onSubmit={handleLogin}
          className={`admin-login-card glass ${loginShake ? 'admin-shake' : ''}`}
        >
          {/* lock icon */}
          <div className="admin-login-icon">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--secondary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
            </svg>
          </div>
          <h2 className="admin-login-title">Admin Access</h2>
          <p className="admin-login-sub">Enter your access code to continue</p>

          <input
            type="password"
            value={passInput}
            onChange={(e) => { setPassInput(e.target.value); setLoginError(false); }}
            placeholder="Access Code"
            className={`admin-input ${loginError ? 'admin-input-error' : ''}`}
            autoFocus
            id="admin-password"
          />
          {loginError && (
            <p className="admin-login-err">Invalid access code. Try again.</p>
          )}
          <button type="submit" className="btn btn-primary admin-login-btn" id="admin-login-submit">
            Enter Dashboard →
          </button>

          <button
            type="button"
            className="admin-back-link"
            onClick={() => navigate('/')}
          >
            ← Back to Storefront
          </button>
        </form>
      </div>
    );
  }

  /* ════════════════════════════════════════════════════════════
     RENDER — DASHBOARD
     ════════════════════════════════════════════════════════════ */
  return (
    <div className="admin-page fade-in" style={{ paddingTop: 'var(--header-height)' }}>
      {/* ── page header ── */}
      <header className="admin-header">
        <div className="container">
          <div className="admin-header-inner">
            <div>
              <p className="admin-label">Control Centre</p>
              <h1 className="admin-title">Inventory Dashboard</h1>
            </div>
            <button onClick={handleLogout} className="btn btn-outline admin-logout-btn" id="admin-logout">
              Sign Out
            </button>
          </div>
        </div>
      </header>

      <div className="container admin-body">

        {/* ═══════════ ANALYTICS CARDS ═══════════ */}
        <section className="admin-analytics-grid" id="admin-analytics">
          <div className="admin-analytics-card glass">
            <div className="admin-analytics-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--secondary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                <circle cx="12" cy="12" r="3"/>
              </svg>
            </div>
            <p className="admin-analytics-value">{analytics.page_view.toLocaleString()}</p>
            <p className="admin-analytics-label">Total Site Visits</p>
            <span className="admin-analytics-badge">All Time</span>
          </div>

          <div className="admin-analytics-card glass">
            <div className="admin-analytics-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--secondary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
              </svg>
            </div>
            <p className="admin-analytics-value">{analytics.whatsapp_click.toLocaleString()}</p>
            <p className="admin-analytics-label">WhatsApp Orders Clicked</p>
            <span className="admin-analytics-badge">Product Clicks</span>
          </div>
        </section>

        {/* ═══════════ PRODUCT FORM ═══════════ */}
        <section className="admin-form-section" id="admin-product-form">
          <div className="admin-section-header">
            <h2 className="admin-section-title">
              {editingId ? '✏️ Edit Product' : ' Add New Product +'}
            </h2>
            {editingId && (
              <button onClick={resetForm} className="admin-cancel-edit">
                Cancel Edit
              </button>
            )}
          </div>

          <form onSubmit={handleSubmit} className="admin-form glass">
            {/* Row 1: Name + Brand */}
            <div className="admin-form-row admin-form-row-2">
              <div className="admin-field">
                <label className="admin-field-label" htmlFor="pf-name">Product Name *</label>
                <input id="pf-name" name="name" value={form.name} onChange={handleFormChange} className="admin-input" placeholder="e.g. Into The Night" required />
              </div>
              <div className="admin-field">
                <label className="admin-field-label" htmlFor="pf-brand">Brand *</label>
                <input id="pf-brand" name="brand" value={form.brand} onChange={handleFormChange} className="admin-input" placeholder="e.g. Bath & Body Works" required />
              </div>
            </div>

            {/* Row 2: Price + Category + Scent Family */}
            <div className="admin-form-row admin-form-row-3">
              <div className="admin-field">
                <label className="admin-field-label" htmlFor="pf-price">Price (KSh)</label>
                <input id="pf-price" name="price" type="number" value={form.price} onChange={handleFormChange} className="admin-input" min="0" />
              </div>
              <div className="admin-field">
                <label className="admin-field-label" htmlFor="pf-category">Category</label>
                <select id="pf-category" name="category" value={form.category} onChange={handleFormChange} className="admin-select">
                  {CATEGORY_OPTIONS.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div className="admin-field">
                <label className="admin-field-label" htmlFor="pf-scent">Scent Family</label>
                <select id="pf-scent" name="scent_family" value={form.scent_family} onChange={handleFormChange} className="admin-select">
                  {SCENT_FAMILIES.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
            </div>

            {/* Row 3: Image Upload */}
            <div className="admin-form-row">
              <div className="admin-field" style={{ flex: 1 }}>
                <label className="admin-field-label">Product Photo</label>
                <div
                  className="admin-upload-zone"
                  onClick={() => fileInputRef.current?.click()}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => { if (e.key === 'Enter') fileInputRef.current?.click(); }}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileSelect}
                    className="admin-upload-hidden"
                    id="pf-image-upload"
                  />
                  {imagePreview ? (
                    <div className="admin-upload-preview">
                      <img src={imagePreview} alt="Preview" />
                      <span className="admin-upload-change">Tap to change photo</span>
                    </div>
                  ) : form.image_url && editingId ? (
                    <div className="admin-upload-preview">
                      <img src={form.image_url} alt="Current" onError={(e) => { e.target.style.display = 'none'; }} />
                      <span className="admin-upload-change">Tap to change photo</span>
                    </div>
                  ) : (
                    <div className="admin-upload-placeholder">
                      <span className="admin-upload-emoji">📸</span>
                      <span className="admin-upload-text">Tap to Upload Scent Photo</span>
                      <span className="admin-upload-hint">JPG, PNG, or WebP — max 5MB</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Row 4: Notes */}
            <div className="admin-form-row admin-form-row-3">
              <div className="admin-field">
                <label className="admin-field-label" htmlFor="pf-top">
                  Top Notes <InfoTooltip text="The first impression of the scent. Evaporates quickly (e.g., Bergamot, Lemon, Mint)." />
                </label>
                <input id="pf-top" name="top_notes" value={form.top_notes} onChange={handleFormChange} className="admin-input" placeholder="e.g. Bergamot, Lemon" />
              </div>
              <div className="admin-field">
                <label className="admin-field-label" htmlFor="pf-heart">
                  Heart Notes <InfoTooltip text="The main character of the perfume. Lasts for hours (e.g., Jasmine, Cinnamon, Rose)." />
                </label>
                <input id="pf-heart" name="heart_notes" value={form.heart_notes} onChange={handleFormChange} className="admin-input" placeholder="e.g. Jasmine, Rose" />
              </div>
              <div className="admin-field">
                <label className="admin-field-label" htmlFor="pf-base">
                  Base Notes <InfoTooltip text="The long-lasting foundation that anchors the scent (e.g., Vanilla, Musk, Sandalwood)." />
                </label>
                <input id="pf-base" name="base_notes" value={form.base_notes} onChange={handleFormChange} className="admin-input" placeholder="e.g. Musk, Sandalwood" />
              </div>
            </div>

            {/* Row 5: Vibe + Intensity + Occasion */}
            <div className="admin-form-row admin-form-row-3">
              <div className="admin-field">
                <label className="admin-field-label" htmlFor="pf-vibe">
                  Vibe Tag <InfoTooltip text="A lifestyle keyword to help matching search filters (e.g., Seductive, Clean, Regal, Professional)." />
                </label>
                <input id="pf-vibe" name="vibe_tag" value={form.vibe_tag} onChange={handleFormChange} className="admin-input" placeholder="e.g. Seductive" />
              </div>
              <div className="admin-field">
                <label className="admin-field-label" htmlFor="pf-intensity">Intensity</label>
                <select id="pf-intensity" name="intensity" value={form.intensity} onChange={handleFormChange} className="admin-select">
                  {INTENSITY_OPTIONS.map((i) => <option key={i} value={i}>{i}</option>)}
                </select>
              </div>
              <div className="admin-field">
                <label className="admin-field-label" htmlFor="pf-occasion">Occasion</label>
                <select id="pf-occasion" name="occasion" value={form.occasion} onChange={handleFormChange} className="admin-select">
                  {OCCASION_OPTIONS.map((o) => <option key={o} value={o}>{o}</option>)}
                </select>
              </div>
            </div>

            {/* Row 6: Description */}
            <div className="admin-form-row">
              <div className="admin-field" style={{ flex: 1 }}>
                <label className="admin-field-label" htmlFor="pf-desc">Description</label>
                <textarea id="pf-desc" name="description" value={form.description} onChange={handleFormChange} className="admin-input admin-textarea" placeholder="A brief, compelling description of this fragrance…" rows={3} />
              </div>
            </div>

            <div className="admin-form-actions">
              <button
                type="submit"
                className="btn btn-primary admin-submit-btn"
                disabled={saving}
                id="admin-product-submit"
              >
                {saving
                  ? (imageFile ? '📤 Uploading image to the Garden…' : 'Saving…')
                  : editingId
                    ? '✦ Update Product'
                    : '✦ Add Product'}
              </button>
              {editingId && (
                <button type="button" onClick={resetForm} className="btn btn-outline">
                  Cancel
                </button>
              )}
            </div>
          </form>
        </section>

        {/* ═══════════ PRODUCT INVENTORY TABLE ═══════════ */}
        <section className="admin-inventory-section" id="admin-inventory">
          <div className="admin-section-header">
            <h2 className="admin-section-title">Live Inventory</h2>
            <span className="admin-product-count">{products.length} product{products.length !== 1 ? 's' : ''}</span>
          </div>

          {loading ? (
            <div className="admin-loading">
              <div className="admin-spinner" />
              <p>Loading inventory…</p>
            </div>
          ) : products.length === 0 ? (
            <div className="admin-empty glass">
              <p>No products yet. Use the form above to add your first fragrance.</p>
            </div>
          ) : (
            <div className="admin-table-wrap glass">
              <table className="admin-table" id="admin-products-table">
                <thead>
                  <tr>
                    <th className="admin-th">Image</th>
                    <th className="admin-th">Product</th>
                    <th className="admin-th">Category</th>
                    <th className="admin-th">Price</th>
                    <th className="admin-th admin-th-actions">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((p) => (
                    <tr key={p.id} className="admin-tr">
                      <td className="admin-td admin-td-img">
                        <div className="admin-product-thumb">
                          <img
                            src={p.image_url}
                            alt={p.name}
                            onError={(e) => { e.target.style.display = 'none'; }}
                          />
                        </div>
                      </td>
                      <td className="admin-td admin-td-product">
                        <span className="admin-product-name">{p.name}</span>
                        <span className="admin-product-brand">{p.brand}</span>
                      </td>
                      <td className="admin-td">
                        <span className="admin-category-badge">{p.category}</span>
                      </td>
                      <td className="admin-td admin-td-price">{fmtKSh(p.price)}</td>
                      <td className="admin-td admin-td-actions">
                        <button
                          className="admin-action-btn admin-edit-btn"
                          title="Edit"
                          onClick={() => startEdit(p)}
                          id={`admin-edit-${p.id}`}
                        >
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                          </svg>
                        </button>
                        <button
                          className="admin-action-btn admin-delete-btn"
                          title="Delete"
                          onClick={() => setDeleteTarget(p)}
                          id={`admin-delete-${p.id}`}
                        >
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="3 6 5 6 21 6"/>
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                            <line x1="10" y1="11" x2="10" y2="17"/>
                            <line x1="14" y1="11" x2="14" y2="17"/>
                          </svg>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>

      {/* ═══════════ DELETE CONFIRMATION MODAL ═══════════ */}
      {deleteTarget && (
        <div className="admin-modal-overlay" onClick={() => setDeleteTarget(null)}>
          <div className="admin-modal glass" onClick={(e) => e.stopPropagation()}>
            <div className="admin-modal-icon">
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#e74c3c" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/>
                <line x1="15" y1="9" x2="9" y2="15"/>
                <line x1="9" y1="9" x2="15" y2="15"/>
              </svg>
            </div>
            <h3 className="admin-modal-title">Remove Product</h3>
            <p className="admin-modal-body">
              Are you sure you want to delete <strong>"{deleteTarget.name}"</strong> by {deleteTarget.brand}? This action cannot be undone.
            </p>
            <div className="admin-modal-actions">
              <button className="btn btn-outline" onClick={() => setDeleteTarget(null)}>
                Cancel
              </button>
              <button className="admin-modal-delete-btn" onClick={confirmDelete} id="admin-confirm-delete">
                Delete Product
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ═══════════ TOAST ═══════════ */}
      {toast && (
        <div className="admin-toast">{toast}</div>
      )}
    </div>
  );
};

export default Admin;
