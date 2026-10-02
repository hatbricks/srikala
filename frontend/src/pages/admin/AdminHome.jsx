import { useEffect, useRef, useState } from 'react';
import { api } from '../../data/api';
import { compressImageFile } from '../../utils/compressImage';
import ScrollingTicker from '../../components/ScrollingTicker';
import { TICKER_ICONS, renderTickerSvg } from '../../components/TickerIcons';
import { RulerIcon, UploadIcon, VideoIcon, CheckIcon, ReviewsIcon } from '../../components/admin/AdminIcons';

const sectionLabels = {
  hero: 'Hero Banner & 4K Video Carousel',
  ticker: 'Scrolling Sale & Announcement Ticker (Below Hero)',
  showcase: 'Our Collections (rail)',
  featured_categories: 'Shop by Category',
  promo_banner: 'Promo Banner',
  new_arrivals: 'New Arrivals',
  featured: 'New Arrivals',
  shop_by_style: 'Shop by Style (Home Grid)',
  recommended: 'Recommended Sarees',
  shipping_settings: 'Shipping',
  story: 'Our Craft',
  google_reviews: 'Google Reviews (Before Footer)',
  social_links: 'Footer — Social & Contact Links',
};

// Plain text/textarea fields per section. Sections with extra custom UI
// (hero's media slides, story's photo) are handled separately below.
const sectionFields = {
  hero: [
    { key: 'eyebrow', label: 'Small label above heading', type: 'text' },
    { key: 'heading', label: 'Heading (line 1)', type: 'text' },
    { key: 'heading2', label: 'Heading (script line 2)', type: 'text' },
    { key: 'subheading', label: 'Subheading', type: 'textarea' },
    { key: 'ctaLabel', label: 'Button text', type: 'text' },
    { key: 'ctaLink', label: 'Button link', type: 'text' },
  ],
  showcase: [
    { key: 'note', label: 'Italic note (left)', type: 'textarea' },
    { key: 'heading', label: 'Heading (right)', type: 'text' },
  ],
  promo_banner: [
    { key: 'heading', label: 'Heading', type: 'text' },
    { key: 'subheading', label: 'Subheading', type: 'text' },
    { key: 'ctaLabel', label: 'Button text', type: 'text' },
    { key: 'ctaLink', label: 'Button link', type: 'text' },
  ],
  featured_categories: [
    { key: 'heading', label: 'Heading', type: 'text' },
  ],
  new_arrivals: [
    { key: 'eyebrow', label: 'Eyebrow text above heading (e.g. Fresh Off The Loom)', type: 'text' },
    { key: 'heading', label: 'Heading', type: 'text' },
    { key: 'subheading', label: 'Subheading description', type: 'textarea' },
    { key: 'ctaLabel', label: 'Button text', type: 'text' },
    { key: 'ctaLink', label: 'Button link', type: 'text' },
  ],
  featured: [
    { key: 'eyebrow', label: 'Eyebrow text above heading (e.g. Fresh Off The Loom)', type: 'text' },
    { key: 'heading', label: 'Heading', type: 'text' },
    { key: 'subheading', label: 'Subheading description', type: 'textarea' },
    { key: 'ctaLabel', label: 'Button text', type: 'text' },
    { key: 'ctaLink', label: 'Button link', type: 'text' },
  ],
  shop_by_style: [
    { key: 'eyebrow', label: 'Small label above heading', type: 'text' },
    { key: 'heading', label: 'Section Heading (e.g. Shop by Style)', type: 'text' },
  ],
  recommended: [
    { key: 'heading', label: 'Heading', type: 'text' },
  ],
  shipping_settings: [
    { key: 'fee', label: 'Standard shipping fee (₹)', type: 'number' },
    { key: 'freeThreshold', label: 'Free shipping when order total is at least (₹) — set to 0 to turn off free shipping', type: 'number' },
  ],
  story: [
    { key: 'eyebrow', label: 'Small label above heading', type: 'text' },
    { key: 'heading', label: 'Heading', type: 'text' },
    { key: 'body', label: 'Paragraph', type: 'textarea' },
    { key: 'ctaLabel', label: 'Button text', type: 'text' },
    { key: 'ctaLink', label: 'Button link', type: 'text' },
  ],
  google_reviews: [
    { key: 'heading', label: 'Section Heading', type: 'text' },
    { key: 'subheading', label: 'Section Subheading', type: 'text' },
    { key: 'googleBusinessUrl', label: 'Google Business Profile / Review Link URL', type: 'text' },
    { key: 'averageRating', label: 'Average Google Rating (e.g. 4.9)', type: 'number' },
    { key: 'totalReviews', label: 'Total Reviews Text (e.g. 150+ reviews)', type: 'text' },
  ],
  social_links: [
    { key: 'whatsapp', label: 'WhatsApp number (with country code, digits only — e.g. 917842225444)', type: 'text' },
    { key: 'facebook', label: 'Facebook page URL', type: 'text' },
    { key: 'twitter', label: 'Twitter / X profile URL', type: 'text' },
    { key: 'instagram', label: 'Instagram profile URL', type: 'text' },
  ],
};

function readFileAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}function HeroSlidesEditor({ slides = [], onChange, sizeHint }) {
  const photoInput = useRef(null);
  const videoInput = useRef(null);
  const [busy, setBusy] = useState(false);
  const [expandedIndex, setExpandedIndex] = useState(null);

  async function handleFiles(e, type) {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    setBusy(true);
    try {
      const added = await Promise.all(files.map(async (f, idx) => ({
        id: `slide-${Date.now()}-${idx}`,
        type,
        url: type === 'video' ? await readFileAsDataUrl(f) : await compressImageFile(f, { maxDimension: 2000 }),
        eyebrow: type === 'video' ? 'PURE HANDLOOM SILKS' : 'TEMPLE TRADITIONS',
        heading: type === 'video' ? 'Crafted with Devotion' : 'Kanchivaram Elegance',
        subheading: 'Heirloom drape with temple-woven gold zari motifs.',
        ctaLabel: 'Explore Collection',
        ctaLink: '/products',
      })));
      onChange([...slides, ...added]);
      setExpandedIndex(slides.length);
    } finally {
      setBusy(false);
      e.target.value = '';
    }
  }

  function addSlideManual(type) {
    const isVid = type === 'video';
    const newSlide = {
      id: `slide-${Date.now()}`,
      type,
      url: isVid ? '/videos/hero1.mp4' : '/images/styles/kanchivaram.jpg',
      eyebrow: isVid ? 'PURE HANDLOOM SILKS' : 'TEMPLE TRADITIONS',
      heading: isVid ? 'Crafted with Devotion' : 'Kanchivaram Elegance',
      subheading: isVid ? 'Experience authentic heirloom weaves with pure zari threads.' : 'Heirloom drape with temple-woven gold zari motifs.',
      ctaLabel: isVid ? 'Explore Collection' : 'Shop Now',
      ctaLink: isVid ? '/products' : '/products?category=kanjivaram',
    };
    onChange([...slides, newSlide]);
    setExpandedIndex(slides.length);
  }

  function updateSlide(i, field, val) {
    const next = [...slides];
    next[i] = { ...next[i], [field]: val };
    onChange(next);
  }

  function moveSlide(index, dir) {
    const target = index + dir;
    if (target < 0 || target >= slides.length) return;
    const next = [...slides];
    [next[index], next[target]] = [next[target], next[index]];
    onChange(next);
    if (expandedIndex === index) setExpandedIndex(target);
    else if (expandedIndex === target) setExpandedIndex(index);
  }

  function removeSlide(i) {
    onChange(slides.filter((_, idx) => idx !== i));
    if (expandedIndex === i) setExpandedIndex(null);
  }

  return (
    <div className="slides-editor">
      {sizeHint && (
        <p className="field-hint size-hint" style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}>
          <RulerIcon width={14} height={14} /> Recommended size: <strong>{sizeHint}</strong>
        </p>
      )}
      <p className="field-hint">
        Slides play horizontally in order. For buttery-smooth, zero-lag 4K video playback, you can directly use a fast video URL or local path (e.g. <code>/videos/hero1.mp4</code>) or upload a clip.
      </p>

      {slides.length > 0 && (
        <div className="slides-cards-list">
          {slides.map((s, i) => {
            const isExpanded = expandedIndex === i;
            return (
              <div className="slide-card-item" key={s.id || `${i}-${s.url?.slice(-20)}`}>
                <div className="slide-card-header" onClick={() => setExpandedIndex(isExpanded ? null : i)}>
                  <div className="slide-thumb">
                    {s.type === 'video' ? (
                      <video src={s.url} muted playsInline />
                    ) : (
                      <img src={s.url} alt="" />
                    )}
                    <span className="slide-order-badge">{i + 1}</span>
                    <span className="slide-type-badge">{s.type}</span>
                  </div>
                  <div className="slide-summary">
                    <strong className="slide-heading-text">{s.heading || `Slide ${i + 1}`}</strong>
                    <span className="slide-sub-text">{s.subheading || s.url}</span>
                  </div>
                  <div className="slide-header-actions" onClick={(e) => e.stopPropagation()}>
                    <button type="button" className="btn-icon" disabled={i === 0} onClick={() => moveSlide(i, -1)} title="Move up">↑</button>
                    <button type="button" className="btn-icon" disabled={i === slides.length - 1} onClick={() => moveSlide(i, 1)} title="Move down">↓</button>
                    <button type="button" className="btn-icon btn-expand" onClick={() => setExpandedIndex(isExpanded ? null : i)}>
                      {isExpanded ? 'Collapse' : 'Edit'}
                    </button>
                    <button type="button" className="btn-icon btn-remove" onClick={() => removeSlide(i)} title="Remove slide">×</button>
                  </div>
                </div>

                {isExpanded && (
                  <div className="slide-card-body">
                    <div className="grid-2-col">
                      <label className="field-label">
                        Slide Type
                        <select value={s.type || 'image'} onChange={(e) => updateSlide(i, 'type', e.target.value)}>
                          <option value="image">Image Slide</option>
                          <option value="video">4K Video Slide</option>
                        </select>
                      </label>
                      <label className="field-label">
                        Media URL / Path (4K Video or Image)
                        <input
                          type="text"
                          value={s.url || ''}
                          placeholder="/videos/hero1.mp4 or https://..."
                          onChange={(e) => updateSlide(i, 'url', e.target.value)}
                        />
                      </label>
                    </div>

                    <div className="grid-2-col">
                      <label className="field-label">
                        Small Eyebrow Label
                        <input
                          type="text"
                          value={s.eyebrow || ''}
                          placeholder="e.g. TEMPLE TRADITIONS"
                          onChange={(e) => updateSlide(i, 'eyebrow', e.target.value)}
                        />
                      </label>
                      <label className="field-label">
                        Slide Heading
                        <input
                          type="text"
                          value={s.heading || ''}
                          placeholder="e.g. Kanchivaram Elegance"
                          onChange={(e) => updateSlide(i, 'heading', e.target.value)}
                        />
                      </label>
                    </div>

                    <label className="field-label">
                      Small Left Text / Subtitle
                      <textarea
                        rows={2}
                        value={s.subheading || ''}
                        placeholder="e.g. Heirloom drape with temple-woven gold zari motifs."
                        onChange={(e) => updateSlide(i, 'subheading', e.target.value)}
                      />
                    </label>

                    <div className="grid-2-col">
                      <label className="field-label">
                        CTA Button Text
                        <input
                          type="text"
                          value={s.ctaLabel || ''}
                          placeholder="e.g. Shop Kanchivaram"
                          onChange={(e) => updateSlide(i, 'ctaLabel', e.target.value)}
                        />
                      </label>
                      <label className="field-label">
                        CTA Button Link
                        <input
                          type="text"
                          value={s.ctaLink || ''}
                          placeholder="e.g. /products?category=kanjivaram"
                          onChange={(e) => updateSlide(i, 'ctaLink', e.target.value)}
                        />
                      </label>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      <div className="slide-upload-actions">
        <button type="button" className="btn btn-outline" disabled={busy} onClick={() => addSlideManual('video')}>
          + Add 4K Video Slide
        </button>
        <button type="button" className="btn btn-outline" disabled={busy} onClick={() => addSlideManual('image')}>
          + Add Image Slide
        </button>
        <button type="button" className="btn btn-outline" style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }} disabled={busy} onClick={() => photoInput.current?.click()}>
          {busy ? 'Uploading…' : <><UploadIcon width={14} height={14} /> Upload Photo File</>}
        </button>
        <button type="button" className="btn btn-outline" style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }} disabled={busy} onClick={() => videoInput.current?.click()}>
          {busy ? 'Uploading…' : <><VideoIcon width={14} height={14} /> Upload Video File</>}
        </button>
        <input ref={photoInput} type="file" accept="image/*" multiple hidden onChange={(e) => handleFiles(e, 'image')} />
        <input ref={videoInput} type="file" accept="video/*" multiple hidden onChange={(e) => handleFiles(e, 'video')} />
      </div>

      {slides.length === 0 && (
        <p className="field-hint" style={{ marginTop: 8 }}>No slides added yet — the default 4K video &amp; saree slides will be displayed.</p>
      )}
    </div>
  );
}

function TickerEditor({ data = {}, onChange }) {
  const items = Array.isArray(data.items) ? data.items : [];
  const bgColor = data.bgColor || '#581e15';
  const textColor = data.textColor || '#ffffff';
  const speed = data.speed || 'normal';
  const pauseOnHover = data.pauseOnHover !== false;

  // Brand color palette presets matching Ravichandra Textiles Design System
  const brandBgPresets = [
    { label: 'Royal Silk Maroon (#581e15)', hex: '#581e15' },
    { label: 'Antique Zari Gold (#b0732e)', hex: '#b0732e' },
    { label: 'Temple Gold (#c58b38)', hex: '#c58b38' },
    { label: 'Deep Midnight Maroon (#20080b)', hex: '#20080b' },
    { label: 'Rich Espresso (#2c1810)', hex: '#2c1810' },
    { label: 'Vibrant Silk Crimson (#6c241a)', hex: '#6c241a' },
    { label: 'Ivory Silk Background (#faf6f0)', hex: '#faf6f0' },
  ];

  const brandTextPresets = [
    { label: 'Pure White (#ffffff)', hex: '#ffffff' },
    { label: 'Luminous Gold (#fbdfa2)', hex: '#fbdfa2' },
    { label: 'Soft Warm Gold (#eed59b)', hex: '#eed59b' },
    { label: 'Warm Linen (#fcf9f5)', hex: '#fcf9f5' },
    { label: 'Royal Silk Maroon (#581e15)', hex: '#581e15' },
  ];

  function updateField(field, val) {
    onChange({ ...data, [field]: val });
  }

  function updateItem(index, field, val) {
    const next = [...items];
    next[index] = { ...next[index], [field]: val };
    onChange({ ...data, items: next });
  }

  function addItem() {
    const newItem = {
      id: `t-${Date.now()}`,
      icon: 'sparkles',
      text: 'Special festive offer: Flat 10% off on authentic Dharmavaram Silks',
      link: '/products',
    };
    onChange({ ...data, items: [...items, newItem] });
  }

  function moveItem(index, dir) {
    const target = index + dir;
    if (target < 0 || target >= items.length) return;
    const next = [...items];
    [next[index], next[target]] = [next[target], next[index]];
    onChange({ ...data, items: next });
  }

  function removeItem(index) {
    onChange({ ...data, items: items.filter((_, idx) => idx !== index) });
  }

  function resetSamplePresets() {
    onChange({
      ...data,
      bgColor: '#581e15',
      textColor: '#ffffff',
      speed: 'normal',
      pauseOnHover: true,
      items: [
        { id: `t-1`, icon: 'bag', text: 'New arrivals every week - Stay tuned!', link: '/products?sort=newest' },
        { id: `t-2`, icon: 'sparkles', text: '100% Authentic Handcrafted Sarees', link: '/about' },
        { id: `t-3`, icon: 'whatsapp', text: 'WhatsApp us for personalized assistance', link: 'https://wa.me/918317551337' },
        { id: `t-4`, icon: 'truck', text: 'Free Shipping on orders above ₹5000', link: '/products' },
        { id: `t-5`, icon: 'gift', text: 'Use code WELCOME10 for 10% off', link: '/products' },
      ],
    });
  }

  return (
    <div className="ticker-editor">
      <p className="field-hint">
        Continuous scrolling announcement &amp; sale ticker banner displayed directly below the hero section. Fully editable icons, text, links, and speed matching the brand palette.
      </p>

      {/* Live Preview Strip */}
      <div className="ticker-preview-box">
        <div className="ticker-preview-header">
          <span className="ticker-preview-badge">Live Storefront Preview</span>
          <span className="field-hint" style={{ fontSize: '11.5px' }}>
            {items.length} announcement{items.length !== 1 ? 's' : ''} in loop
          </span>
        </div>
        <div className="ticker-preview-shell">
          <ScrollingTicker config={{ ...data, bgColor, textColor, speed, pauseOnHover, items }} />
        </div>
      </div>

      {/* Brand Color Palette & Behavior */}
      <div className="ticker-config-grid">
        <label className="field-label">
          Background Color (Brand Palette)
          <div className="color-picker-row">
            <input
              type="color"
              value={bgColor}
              onChange={(e) => updateField('bgColor', e.target.value)}
              title="Custom hex color"
            />
            <input
              type="text"
              value={bgColor}
              onChange={(e) => updateField('bgColor', e.target.value)}
              style={{ width: '92px', fontFamily: 'monospace', fontSize: '12px' }}
            />
            <div className="color-presets-row">
              {brandBgPresets.map((p) => (
                <button
                  type="button"
                  key={p.hex}
                  className={`color-swatch-btn ${bgColor.toLowerCase() === p.hex.toLowerCase() ? 'active' : ''}`}
                  style={{ backgroundColor: p.hex }}
                  title={p.label}
                  onClick={() => updateField('bgColor', p.hex)}
                />
              ))}
            </div>
          </div>
        </label>

        <label className="field-label">
          Text &amp; Motif Color
          <div className="color-picker-row">
            <input
              type="color"
              value={textColor}
              onChange={(e) => updateField('textColor', e.target.value)}
              title="Custom text color"
            />
            <input
              type="text"
              value={textColor}
              onChange={(e) => updateField('textColor', e.target.value)}
              style={{ width: '92px', fontFamily: 'monospace', fontSize: '12px' }}
            />
            <div className="color-presets-row">
              {brandTextPresets.map((p) => (
                <button
                  type="button"
                  key={p.hex}
                  className={`color-swatch-btn ${textColor.toLowerCase() === p.hex.toLowerCase() ? 'active' : ''}`}
                  style={{ backgroundColor: p.hex }}
                  title={p.label}
                  onClick={() => updateField('textColor', p.hex)}
                />
              ))}
            </div>
          </div>
        </label>
      </div>

      <div className="grid-2-col">
        <label className="field-label">
          Marquee Scrolling Speed
          <select value={speed} onChange={(e) => updateField('speed', e.target.value)}>
            <option value="slow">Slow (Smooth &amp; Relaxed — 38s)</option>
            <option value="normal">Normal (Recommended — 24s)</option>
            <option value="fast">Fast (Lively — 16s)</option>
          </select>
        </label>

        <label className="field-label" style={{ justifyContent: 'center' }}>
          <span style={{ marginBottom: 4 }}>Hover Behavior</span>
          <label className="toggle" style={{ cursor: 'pointer', padding: '6px 0' }}>
            <input
              type="checkbox"
              checked={pauseOnHover}
              onChange={(e) => updateField('pauseOnHover', e.target.checked)}
            />
            Pause scrolling when mouse hovers
          </label>
        </label>
      </div>

      {/* Announcements List */}
      <div className="ticker-items-section">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10, flexWrap: 'wrap', gap: 6 }}>
          <span className="field-label" style={{ fontWeight: 600, color: 'var(--ink-900)' }}>
            Ticker Announcement Items ({items.length})
          </span>
          <button
            type="button"
            className="btn btn-outline"
            style={{ fontSize: '11.5px', padding: '4px 10px' }}
            onClick={resetSamplePresets}
            title="Reset to brand default announcements"
          >
            ↺ Reset to Brand Presets
          </button>
        </div>

        <div className="ticker-items-list">
          {items.map((it, i) => (
            <div className="ticker-item-card" key={it.id || i}>
              <div className="ticker-item-head">
                <span className="ticker-item-num">Announcement #{i + 1}</span>
                <div className="slide-header-actions">
                  <button type="button" className="btn-icon" disabled={i === 0} onClick={() => moveItem(i, -1)} title="Move up">↑</button>
                  <button type="button" className="btn-icon" disabled={i === items.length - 1} onClick={() => moveItem(i, 1)} title="Move down">↓</button>
                  <button type="button" className="btn-icon btn-remove" onClick={() => removeItem(i)} title="Remove announcement">×</button>
                </div>
              </div>

              <div className="grid-2-col" style={{ marginTop: 4 }}>
                <label className="field-label">
                  SVG Vector Icon
                  <div className="svg-icon-select-row">
                    <div className="current-svg-badge" title="Selected SVG preview">
                      {renderTickerSvg(it.icon || 'sparkles', { width: 17, height: 17 })}
                    </div>
                    <select
                      value={it.icon || 'sparkles'}
                      onChange={(e) => updateItem(i, 'icon', e.target.value)}
                    >
                      {Object.entries(TICKER_ICONS).map(([key, def]) => (
                        <option key={key} value={key}>
                          {def.label} ({key})
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="svg-quick-picker">
                    {Object.entries(TICKER_ICONS).map(([key, def]) => {
                      const isSelected = (it.icon || 'sparkles') === key;
                      return (
                        <button
                          type="button"
                          key={key}
                          className={`svg-icon-btn ${isSelected ? 'active' : ''}`}
                          onClick={() => updateItem(i, 'icon', key)}
                          title={def.label}
                        >
                          {def.svg({ width: 13, height: 13 })}
                          <span>{key}</span>
                        </button>
                      );
                    })}
                  </div>
                </label>

                <label className="field-label">
                  Target Link (Optional)
                  <input
                    type="text"
                    value={it.link || ''}
                    placeholder="e.g. /products or https://wa.me/..."
                    onChange={(e) => updateItem(i, 'link', e.target.value)}
                  />
                  <span className="field-hint">Internal page or external WhatsApp link.</span>
                </label>
              </div>

              <label className="field-label" style={{ marginTop: 4 }}>
                Announcement Text
                <input
                  type="text"
                  value={it.text || ''}
                  placeholder="e.g. 100% Authentic Handcrafted Sarees"
                  onChange={(e) => updateItem(i, 'text', e.target.value)}
                />
              </label>
            </div>
          ))}
        </div>

        <button
          type="button"
          className="btn btn-outline"
          onClick={addItem}
          style={{ marginTop: 10, width: '100%', justifyContent: 'center' }}
        >
          + Add Announcement Item
        </button>
      </div>
    </div>
  );
}

function GoogleReviewsEditor({ data = {}, onChange }) {
  const reviews = Array.isArray(data.reviews) ? data.reviews : [];

  function updateReview(i, field, val) {
    const next = [...reviews];
    next[i] = { ...next[i], [field]: val };
    onChange({ ...data, reviews: next });
  }

  function addReview() {
    const newRev = {
      id: `gr-${Date.now()}`,
      name: 'Pooja Gowda',
      avatarInitial: 'P',
      avatarColor: '#E65100',
      userBadge: '1 review',
      rating: 5,
      timeAgo: '5 months ago',
      text: 'They have amazing wedding collection at very reasonable price. You guys must visit for any occasion',
      reviewUrl: data.googleBusinessUrl || 'https://share.google/rLeQl6DO3cPtU5rql',
      likesCount: 1,
    };
    onChange({ ...data, reviews: [...reviews, newRev] });
  }

  function moveReview(i, dir) {
    const target = i + dir;
    if (target < 0 || target >= reviews.length) return;
    const next = [...reviews];
    [next[i], next[target]] = [next[target], next[i]];
    onChange({ ...data, reviews: next });
  }

  function removeReview(i) {
    onChange({ ...data, reviews: reviews.filter((_, idx) => idx !== i) });
  }

  return (
    <div className="google-reviews-editor">
      <p className="field-hint" style={{ marginBottom: 12 }}>
        Manage Google Reviews displayed in the official Google Cards section before the footer.
      </p>

      <div className="reviews-cards-list">
        {reviews.map((r, i) => (
          <div className="review-edit-card" key={r.id || i}>
            <div className="review-edit-head">
              <div className="gr-edit-avatar" style={{ backgroundColor: r.avatarColor || '#E65100' }}>
                {r.avatarInitial || r.name?.charAt(0) || 'U'}
              </div>
              <div className="gr-edit-title">
                <strong className="gr-edit-name">{r.name || `Review ${i + 1}`}</strong>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, flexWrap: 'wrap' }}>
                  {r.userBadge} · {Array.from({ length: r.rating || 5 }).map((_, si) => (
                    <ReviewsIcon key={si} width={12} height={12} fill="#e65100" stroke="#e65100" />
                  ))} · {r.timeAgo}
                </span>
              </div>
              <div className="slide-header-actions">
                <button type="button" className="btn-icon" disabled={i === 0} onClick={() => moveReview(i, -1)} title="Move up">↑</button>
                <button type="button" className="btn-icon" disabled={i === reviews.length - 1} onClick={() => moveReview(i, 1)} title="Move down">↓</button>
                <button type="button" className="btn-icon btn-remove" onClick={() => removeReview(i)} title="Remove review">×</button>
              </div>
            </div>

            <div className="grid-2-col" style={{ marginTop: 10 }}>
              <label className="field-label">
                Reviewer Name
                <input
                  type="text"
                  value={r.name || ''}
                  onChange={(e) => updateReview(i, 'name', e.target.value)}
                />
              </label>
              <label className="field-label">
                User Badge / Meta
                <input
                  type="text"
                  value={r.userBadge || ''}
                  placeholder="e.g. 1 review or Local Guide"
                  onChange={(e) => updateReview(i, 'userBadge', e.target.value)}
                />
              </label>
            </div>

            <div className="grid-3-col">
              <label className="field-label">
                Star Rating (1-5)
                <input
                  type="number"
                  min="1"
                  max="5"
                  value={r.rating || 5}
                  onChange={(e) => updateReview(i, 'rating', Number(e.target.value))}
                />
              </label>
              <label className="field-label">
                Time Ago
                <input
                  type="text"
                  value={r.timeAgo || ''}
                  placeholder="e.g. 5 months ago"
                  onChange={(e) => updateReview(i, 'timeAgo', e.target.value)}
                />
              </label>
              <label className="field-label">
                Avatar Initial &amp; Color
                <div style={{ display: 'flex', gap: 6 }}>
                  <input
                    type="text"
                    maxLength="2"
                    style={{ width: '48px', textAlign: 'center' }}
                    value={r.avatarInitial || ''}
                    onChange={(e) => updateReview(i, 'avatarInitial', e.target.value.toUpperCase())}
                  />
                  <input
                    type="color"
                    style={{ padding: 2, height: '38px', width: '50px' }}
                    value={r.avatarColor || '#E65100'}
                    onChange={(e) => updateReview(i, 'avatarColor', e.target.value)}
                  />
                </div>
              </label>
            </div>

            <label className="field-label" style={{ marginTop: 6 }}>
              Review Text
              <textarea
                rows={2}
                value={r.text || ''}
                onChange={(e) => updateReview(i, 'text', e.target.value)}
              />
            </label>

            <label className="field-label">
              Direct Google Review Link URL
              <input
                type="text"
                value={r.reviewUrl || ''}
                placeholder="https://share.google/..."
                onChange={(e) => updateReview(i, 'reviewUrl', e.target.value)}
              />
            </label>
          </div>
        ))}
      </div>

      <button type="button" className="btn btn-outline" onClick={addReview} style={{ marginTop: 12 }}>
        + Add Google Review
      </button>
    </div>
  );
}

// Search-and-select picker for curating which products show in the
// "Featured Sarees" / "Recommended Sarees" home sections. Selection order
// is the display order — reorder with the arrows on each chip.
function ProductPicker({ products, selectedIds = [], onChange, max = 12 }) {
  const [query, setQuery] = useState('');
  const selected = selectedIds.map((id) => products.find((p) => p.id === id)).filter(Boolean);
  const q = query.trim().toLowerCase();
  const results = q
    ? products.filter((p) => !selectedIds.includes(p.id) && p.name.toLowerCase().includes(q)).slice(0, 8)
    : [];

  function add(id) {
    if (selectedIds.includes(id) || selectedIds.length >= max) return;
    onChange([...selectedIds, id]);
    setQuery('');
  }
  function remove(id) {
    onChange(selectedIds.filter((x) => x !== id));
  }
  function move(index, dir) {
    const target = index + dir;
    if (target < 0 || target >= selectedIds.length) return;
    const next = [...selectedIds];
    [next[index], next[target]] = [next[target], next[index]];
    onChange(next);
  }

  return (
    <div className="product-picker">
      {selected.length > 0 && (
        <div className="picker-selected">
          {selected.map((p, i) => (
            <div className="picker-chip" key={p.id}>
              <img src={p.image} alt="" />
              <span className="picker-chip-name">{p.name}</span>
              <div className="picker-chip-actions">
                <button type="button" onClick={() => move(i, -1)} disabled={i === 0} aria-label={`Move ${p.name} up`}>↑</button>
                <button type="button" onClick={() => move(i, 1)} disabled={i === selected.length - 1} aria-label={`Move ${p.name} down`}>↓</button>
                <button type="button" onClick={() => remove(p.id)} aria-label={`Remove ${p.name}`} className="picker-chip-remove">×</button>
              </div>
            </div>
          ))}
        </div>
      )}

      <input
        type="text"
        placeholder={selectedIds.length >= max ? `Up to ${max} selected` : 'Search products to add...'}
        value={query}
        disabled={selectedIds.length >= max}
        onChange={(e) => setQuery(e.target.value)}
      />

      {results.length > 0 && (
        <div className="picker-results">
          {results.map((p) => (
            <button type="button" key={p.id} className="picker-result-item" onClick={() => add(p.id)}>
              <img src={p.image} alt="" />
              <span>{p.name}</span>
            </button>
          ))}
        </div>
      )}

      {selectedIds.length === 0 && (
        <p className="field-hint">Nothing picked yet — falls back to the automatic default until you add at least one.</p>
      )}
    </div>
  );
}

function CategoryPicker({ categories = [], selectedIds = [], onChange, max = 6 }) {
  const selected = selectedIds.map((id) => categories.find((c) => c.id === id)).filter(Boolean);
  const unselected = categories.filter((c) => !selectedIds.includes(c.id));

  function add(id) {
    if (selectedIds.includes(id) || selectedIds.length >= max) return;
    onChange([...selectedIds, id]);
  }
  function remove(id) {
    onChange(selectedIds.filter((x) => x !== id));
  }
  function move(index, dir) {
    const target = index + dir;
    if (target < 0 || target >= selectedIds.length) return;
    const next = [...selectedIds];
    const [moved] = next.splice(index, 1);
    next.splice(target, 0, moved);
    onChange(next);
  }

  return (
    <div className="product-picker">
      <div className="picker-chips">
        {selected.map((c, i) => (
          <div key={c.id} className="picker-chip">
            <img src={c.image} alt="" />
            <span className="picker-chip-name">{c.name}</span>
            <div className="picker-chip-actions">
              <button type="button" disabled={i === 0} onClick={() => move(i, -1)} aria-label="Move left">‹</button>
              <button type="button" disabled={i === selected.length - 1} onClick={() => move(i, 1)} aria-label="Move right">›</button>
              <button type="button" onClick={() => remove(c.id)} aria-label="Remove">×</button>
            </div>
          </div>
        ))}
      </div>

      {unselected.length > 0 && selectedIds.length < max && (
        <div style={{ marginTop: 10, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {unselected.map((c) => (
            <button
              key={c.id}
              type="button"
              className="btn btn-outline"
              style={{ fontSize: '12px', padding: '5px 12px' }}
              onClick={() => add(c.id)}
            >
              + {c.name}
            </button>
          ))}
        </div>
      )}

      {selectedIds.length === 0 && (
        <p className="field-hint">Nothing picked yet — defaults to the top 5 styles from the catalog.</p>
      )}
    </div>
  );
}

export default function AdminHome() {
  const [sections, setSections] = useState([]);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [drafts, setDrafts] = useState({});
  const [error, setError] = useState('');
  const [savedKey, setSavedKey] = useState('');
  const storyFileInput = useRef(null);

  const defaultTickerContent = {
    bgColor: '#581e15',
    textColor: '#ffffff',
    speed: 'normal',
    pauseOnHover: true,
    items: [
      { id: 't1', icon: 'bag', text: 'New arrivals every week - Stay tuned!', link: '/products?sort=newest' },
      { id: 't2', icon: 'sparkles', text: '100% Authentic Handcrafted Sarees', link: '/about' },
      { id: 't3', icon: 'whatsapp', text: 'WhatsApp us for personalized assistance', link: 'https://wa.me/918317551337' },
      { id: 't4', icon: 'truck', text: 'Free Shipping on orders above ₹5000', link: '/products' },
      { id: 't5', icon: 'gift', text: 'Use code WELCOME10 for 10% off', link: '/products' },
    ],
  };

  useEffect(() => {
    api
      .getAllHomeSections()
      .then(({ sections }) => {
        let secList = sections || [];
        if (!secList.some((s) => s.section_key === 'ticker')) {
          const defaultTicker = {
            section_key: 'ticker',
            title: 'Scrolling Sale & Announcement Ticker (Below Hero)',
            enabled: true,
            sort_order: 2,
            content: defaultTickerContent,
          };
          const heroIdx = secList.findIndex((s) => s.section_key === 'hero');
          if (heroIdx !== -1) {
            secList = [
              ...secList.slice(0, heroIdx + 1),
              defaultTicker,
              ...secList.slice(heroIdx + 1),
            ];
          } else {
            secList = [defaultTicker, ...secList];
          }
        }
        setSections(secList);
        const map = {};
        secList.forEach((s) => {
          if (s.section_key === 'ticker') {
            const hasItems = Array.isArray(s.content?.items) && s.content.items.length > 0;
            map[s.section_key] = {
              ...defaultTickerContent,
              ...s.content,
              items: hasItems ? s.content.items : defaultTickerContent.items,
              enabled: s.enabled !== false,
            };
          } else {
            map[s.section_key] = { ...s.content, enabled: s.enabled };
          }
        });
        setDrafts(map);
      })
      .catch((err) => setError(err.message));
    api.getProducts().then(({ products }) => setProducts(products)).catch(() => {});
    api.getCategories().then(({ categories }) => setCategories(categories)).catch(() => {});
  }, []);

  function updateField(key, field, value) {
    setDrafts((prev) => ({ ...prev, [key]: { ...prev[key], [field]: value } }));
  }

  async function handleStoryImage(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    const dataUrl = await compressImageFile(file);
    updateField('story', 'image', dataUrl);
  }

  async function handleSave(key) {
    setError('');
    const { enabled, ...content } = drafts[key] || {};
    try {
      const { section } = await api.updateHomeSection(key, {
        content,
        enabled,
        title: sectionLabels[key],
      });
      setSections((prev) => {
        const exists = prev.some((s) => s.section_key === key);
        if (!exists) return [...prev, section];
        return prev.map((s) => (s.section_key === key ? section : s));
      });
      setSavedKey(key);
      setTimeout(() => setSavedKey(''), 2000);
    } catch (err) {
      setError(err.message);
    }
  }

  async function toggleEnabled(key, current) {
    const nextEnabled = !current;
    updateField(key, 'enabled', nextEnabled);
    try {
      const { enabled: _e, ...content } = drafts[key] || {};
      const payload = { enabled: nextEnabled, title: sectionLabels[key] };
      if (Object.keys(content).length > 0) {
        payload.content = content;
      }
      const { section } = await api.updateHomeSection(key, payload);
      setSections((prev) => {
        const exists = prev.some((s) => s.section_key === key);
        if (!exists) return [...prev, section || { section_key: key, enabled: nextEnabled }];
        return prev.map((s) => (s.section_key === key ? { ...s, enabled: nextEnabled } : s));
      });
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div>
      <div className="admin-page-head">
        <h1>Home Page</h1>
        <p>Every section on the home screen — edit the text, upload banner media, and toggle sections on or off.</p>
      </div>

      {error && <p className="admin-error">{error}</p>}

      <div className="section-list">
        {sections.map((s) => {
          const fields = sectionFields[s.section_key] || [];
          const draft = drafts[s.section_key] || {};
          return (
            <div className="section-card" key={s.section_key}>
              <div className="section-card-head">
                <h3>{sectionLabels[s.section_key] || s.title || s.section_key}</h3>
                {s.section_key !== 'hero' && (
                  <label className="toggle">
                    <input
                      type="checkbox"
                      checked={draft.enabled !== false}
                      onChange={() => toggleEnabled(s.section_key, draft.enabled !== false)}
                    />
                    Visible on home page
                  </label>
                )}
              </div>

              {fields.map((f) => (
                <label key={f.key} className="field-label">
                  {f.label}
                  {f.type === 'textarea' ? (
                    <textarea
                      rows={3}
                      value={draft[f.key] || ''}
                      onChange={(e) => updateField(s.section_key, f.key, e.target.value)}
                    />
                  ) : f.type === 'number' ? (
                    <input
                      type="number"
                      min="0"
                      value={draft[f.key] ?? ''}
                      onChange={(e) => updateField(s.section_key, f.key, e.target.value === '' ? '' : Number(e.target.value))}
                    />
                  ) : (
                    <input
                      type="text"
                      value={draft[f.key] || ''}
                      onChange={(e) => updateField(s.section_key, f.key, e.target.value)}
                    />
                  )}
                </label>
              ))}

              {s.section_key === 'hero' && (
                <>
                  <label className="field-label">
                    Banner photos &amp; videos — Desktop / PC view
                    <HeroSlidesEditor
                      slides={draft.slides || []}
                      onChange={(slides) => updateField('hero', 'slides', slides)}
                      sizeHint="1920 × 1080px (landscape, 16:9) or similar wide crop"
                    />
                  </label>

                  <label className="field-label">
                    Banner photos &amp; videos — Mobile view
                    <HeroSlidesEditor
                      slides={draft.mobileSlides || []}
                      onChange={(slides) => updateField('hero', 'mobileSlides', slides)}
                      sizeHint="1080 × 1350px (portrait, 4:5) — a tall crop reads better on phones"
                    />
                  </label>
                </>
              )}

              {s.section_key === 'ticker' && (
                <TickerEditor
                  data={draft}
                  onChange={(nextData) => setDrafts((prev) => ({ ...prev, ticker: { ...prev.ticker, ...nextData } }))}
                />
              )}

              {s.section_key === 'story' && (
                <label className="field-label">
                  Photo
                  <input type="file" accept="image/*" ref={storyFileInput} onChange={handleStoryImage} />
                  {draft.image && (
                    <div className="story-preview">
                      <img src={draft.image} alt="Preview" />
                    </div>
                  )}
                </label>
              )}

              {s.section_key === 'google_reviews' && (
                <label className="field-label">
                  Google Customer Reviews (Matching Google Cards)
                  <GoogleReviewsEditor
                    data={draft}
                    onChange={(nextData) => setDrafts((prev) => ({ ...prev, google_reviews: nextData }))}
                  />
                </label>
              )}

              {(s.section_key === 'new_arrivals' || s.section_key === 'featured') && (
                <label className="field-label">
                  Products shown as New Arrivals
                  <ProductPicker
                    products={products}
                    selectedIds={draft.productIds || []}
                    onChange={(ids) => updateField(s.section_key, 'productIds', ids)}
                    max={8}
                  />
                  <span className="field-hint">
                    Leave empty to automatically showcase the newest active sarees from your catalog. Or pick specific sarees above to curate this section manually.
                  </span>
                </label>
              )}

              {s.section_key === 'shop_by_style' && (
                <label className="field-label">
                  Styles shown in this section (Card 1 [wide], Card 2 [portrait], Cards 3–5)
                  <CategoryPicker
                    categories={categories}
                    selectedIds={draft.categoryIds || []}
                    onChange={(ids) => updateField(s.section_key, 'categoryIds', ids)}
                    max={6}
                  />
                  <span className="field-hint">
                    Selection order determines placement: 1st style spans 2 columns (e.g. Kanchivaram), 2nd style is portrait (e.g. Banarasi), and 3rd–5th styles appear in the lower row.
                  </span>
                </label>
              )}

              {s.section_key === 'featured_categories' && (
                <label className="field-label">
                  Categories displayed in this section
                  <CategoryPicker
                    categories={categories}
                    selectedIds={draft.categoryIds || []}
                    onChange={(ids) => updateField(s.section_key, 'categoryIds', ids)}
                    max={6}
                  />
                </label>
              )}

              {s.section_key === 'recommended' && (
                <label className="field-label">
                  Products shown as recommendations
                  <ProductPicker
                    products={products}
                    selectedIds={draft.productIds || []}
                    onChange={(ids) => updateField(s.section_key, 'productIds', ids)}
                    max={12}
                  />
                  <span className="field-hint">
                    Shown at the bottom of the home page and on every product page (the product being viewed is skipped automatically). Leave empty for a random pick from the catalog each time.
                  </span>
                </label>
              )}

              <div className="section-card-foot">
                <button className="btn btn-primary" onClick={() => handleSave(s.section_key)}>Save</button>
                {savedKey === s.section_key && (
                  <span className="saved-msg" style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                    <CheckIcon width={13} height={13} /> Saved
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <style>{`
        .admin-page-head { margin-bottom: 30px; }
        .admin-page-head h1 { font-size: 26px; margin-bottom: 8px; }
        .admin-page-head p { font-size: 13px; color: var(--ink-400); max-width: 560px; line-height: 1.6; }
        .admin-error { font-size: 12.5px; color: #a13a3a; margin-bottom: 16px; }

        .section-list { display: flex; flex-direction: column; gap: 18px; max-width: 620px; }
        .section-card {
          background: var(--paper);
          border-radius: var(--radius-md);
          padding: 22px;
          display: flex;
          flex-direction: column;
          gap: 14px;
        }
        .section-card-head { display: flex; align-items: center; justify-content: space-between; }
        .section-card-head h3 { font-family: var(--font-display); font-size: 16px; color: var(--maroon-900); margin: 0; }
        .toggle { display: flex; align-items: center; gap: 6px; font-size: 12px; color: var(--ink-600); }
        .toggle input { accent-color: var(--maroon-900); }

        .field-label { display: flex; flex-direction: column; gap: 6px; font-size: 12.5px; color: var(--ink-600); }
        .field-label input[type="text"], .field-label textarea, .field-label input[type="file"] {
          padding: 11px 12px;
          border-radius: var(--radius-sm);
          border: 1px solid var(--stone-200);
          font-family: var(--font-body);
          font-size: 13.5px;
        }
        .field-hint { font-size: 11.5px; color: var(--ink-400); line-height: 1.6; margin: 0; }
        .size-hint { color: var(--maroon-700); background: var(--blush-300); padding: 7px 10px; border-radius: var(--radius-sm); }

        .story-preview { width: 90px; height: 90px; border-radius: var(--radius-sm); overflow: hidden; margin-top: 4px; }
        .story-preview img { width: 100%; height: 100%; object-fit: cover; }

        .product-picker { display: flex; flex-direction: column; gap: 8px; }
        .product-picker input[type="text"] { padding: 11px 12px; border-radius: var(--radius-sm); border: 1px solid var(--stone-200); font-family: var(--font-body); font-size: 13.5px; }
        .picker-selected { display: flex; flex-direction: column; gap: 6px; }
        .picker-chip {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 6px 8px;
          border-radius: var(--radius-sm);
          border: 1px solid var(--stone-200);
          background: var(--paper);
        }
        .picker-chip img { width: 32px; height: 32px; border-radius: 6px; object-fit: cover; flex: 0 0 auto; }
        .picker-chip-name { flex: 1; font-size: 12.5px; color: var(--ink-700); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .picker-chip-actions { display: flex; gap: 4px; flex: 0 0 auto; }
        .picker-chip-actions button {
          width: 22px;
          height: 22px;
          border-radius: 6px;
          border: 1px solid var(--stone-200);
          background: var(--ivory);
          font-size: 11px;
          color: var(--ink-600);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .picker-chip-actions button:disabled { opacity: 0.35; }
        .picker-chip-remove { color: #a13a3a !important; }
        .picker-results {
          display: flex;
          flex-direction: column;
          gap: 2px;
          max-height: 220px;
          overflow-y: auto;
          border: 1px solid var(--stone-200);
          border-radius: var(--radius-sm);
          padding: 6px;
        }
        .picker-result-item {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 6px 8px;
          border-radius: 8px;
          background: none;
          border: none;
          text-align: left;
          font-size: 12.5px;
          color: var(--ink-700);
        }
        .picker-result-item:hover { background: var(--blush-400); }
        .picker-result-item img { width: 28px; height: 28px; border-radius: 6px; object-fit: cover; flex: 0 0 auto; }

        .slides-editor { display: flex; flex-direction: column; gap: 12px; }
        .slides-grid { display: flex; flex-wrap: wrap; gap: 10px; }
        .slide-thumb {
          position: relative;
          width: 100px;
          height: 72px;
          border-radius: var(--radius-sm);
          overflow: hidden;
          border: 1px solid var(--stone-200);
          background: var(--stone-100);
        }
        .slide-thumb img, .slide-thumb video { width: 100%; height: 100%; object-fit: cover; }
        .slide-order-badge {
          position: absolute;
          left: 4px;
          top: 4px;
          background: var(--maroon-900);
          color: #fff;
          font-size: 9.5px;
          font-weight: 600;
          min-width: 16px;
          height: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 999px;
          padding: 0 4px;
        }
        .slides-order-note { background: var(--stone-100); border-radius: var(--radius-sm); padding: 8px 10px; }
        .slide-type-badge {
          position: absolute;
          left: 4px;
          bottom: 4px;
          background: rgba(0,0,0,0.55);
          color: #fff;
          font-size: 9px;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          padding: 2px 6px;
          border-radius: 4px;
        }
        .slide-remove {
          position: absolute;
          top: 3px;
          right: 3px;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: rgba(0,0,0,0.6);
          color: #fff;
          border: none;
          font-size: 13px;
          line-height: 1;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .slide-upload-actions { display: flex; gap: 10px; }
        .slide-upload-actions .btn { padding: 9px 16px; font-size: 12.5px; }

        .section-card-foot { display: flex; align-items: center; gap: 12px; }
        .section-card-foot .btn { padding: 10px 18px; font-size: 13px; }
        .saved-msg { font-size: 12.5px; color: #3c7a3c; }

        .slides-cards-list { display: flex; flex-direction: column; gap: 10px; margin-bottom: 12px; }
        .slide-card-item {
          border: 1px solid var(--stone-200);
          border-radius: var(--radius-sm);
          background: #fff;
          overflow: hidden;
        }
        .slide-card-header {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 8px 12px;
          cursor: pointer;
          user-select: none;
        }
        .slide-card-header:hover { background: var(--blush-300); }
        .slide-summary { flex: 1; display: flex; flex-direction: column; gap: 2px; min-width: 0; }
        .slide-heading-text { font-size: 13px; color: var(--ink-900); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .slide-sub-text { font-size: 11.5px; color: var(--ink-400); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .slide-header-actions { display: flex; align-items: center; gap: 4px; }
        .btn-icon {
          background: var(--paper);
          border: 1px solid var(--stone-200);
          border-radius: 4px;
          padding: 4px 8px;
          font-size: 11px;
          color: var(--ink-700);
          cursor: pointer;
        }
        .btn-icon:disabled { opacity: 0.35; cursor: not-allowed; }
        .btn-expand { font-size: 11px; font-weight: 500; }
        .btn-remove { color: #b71c1c; font-weight: bold; }
        .slide-card-body {
          padding: 14px 16px;
          border-top: 1px solid var(--stone-200);
          background: #faf8f5;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .grid-2-col { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
        .grid-3-col { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 10px; }

        .google-reviews-editor { display: flex; flex-direction: column; gap: 10px; }
        .reviews-cards-list { display: flex; flex-direction: column; gap: 10px; }
        .review-edit-card {
          border: 1px solid var(--stone-200);
          border-radius: var(--radius-sm);
          padding: 12px 14px;
          background: #fff;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .review-edit-head {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .gr-edit-avatar {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
          font-weight: 600;
          font-size: 14px;
          flex: 0 0 auto;
        }
        .gr-edit-title { flex: 1; display: flex; flex-direction: column; }
        .gr-edit-title strong { font-size: 13px; color: var(--ink-900); }
        .gr-edit-title span { font-size: 11px; color: var(--ink-400); }

        /* Ticker Editor Styles */
        .ticker-editor { display: flex; flex-direction: column; gap: 14px; }
        .ticker-preview-box {
          display: flex;
          flex-direction: column;
          gap: 6px;
          background: #faf8f5;
          padding: 10px;
          border-radius: var(--radius-sm);
          border: 1px solid var(--stone-200);
        }
        .ticker-preview-header { display: flex; align-items: center; justify-content: space-between; }
        .ticker-preview-badge {
          font-size: 11px;
          font-weight: 600;
          color: var(--maroon-900);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        .ticker-preview-shell {
          border-radius: 6px;
          overflow: hidden;
          box-shadow: 0 2px 6px rgba(0,0,0,0.08);
        }
        .ticker-config-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
        .color-picker-row { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; margin-top: 4px; }
        .color-picker-row input[type="color"] {
          width: 36px;
          height: 36px;
          padding: 2px;
          border-radius: 6px;
          border: 1px solid var(--stone-200);
          cursor: pointer;
          background: none;
        }
        .color-presets-row { display: flex; align-items: center; gap: 6px; flex-wrap: wrap; }
        .color-swatch-btn {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          border: 2px solid #fff;
          box-shadow: 0 0 0 1px var(--stone-300);
          cursor: pointer;
          transition: transform 0.15s ease, box-shadow 0.15s ease;
          padding: 0;
        }
        .color-swatch-btn:hover { transform: scale(1.15); }
        .color-swatch-btn.active {
          box-shadow: 0 0 0 2.5px var(--maroon-900);
          transform: scale(1.1);
        }
        .ticker-items-section { display: flex; flex-direction: column; gap: 10px; margin-top: 4px; }
        .ticker-items-list { display: flex; flex-direction: column; gap: 10px; }
        .ticker-item-card {
          border: 1px solid var(--stone-200);
          border-radius: var(--radius-sm);
          padding: 12px;
          background: #fff;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .ticker-item-head {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-bottom: 6px;
          border-bottom: 1px solid var(--stone-100);
        }
        .ticker-item-num { font-size: 12px; font-weight: 600; color: var(--maroon-900); }
        .svg-icon-select-row { display: flex; align-items: center; gap: 8px; margin-top: 4px; }
        .svg-icon-select-row select {
          flex: 1;
          padding: 8px 12px;
          border-radius: var(--radius-sm);
          border: 1px solid var(--stone-200);
          font-family: var(--font-body);
          font-size: 13px;
          background: #fff;
        }
        .current-svg-badge {
          width: 36px;
          height: 36px;
          border-radius: var(--radius-sm);
          background: #581e15;
          color: #fbdfa2;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          box-shadow: 0 1px 3px rgba(0,0,0,0.12);
        }
        .svg-quick-picker { display: flex; gap: 5px; flex-wrap: wrap; margin-top: 6px; }
        .svg-icon-btn {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          background: var(--stone-100);
          border: 1px solid var(--stone-200);
          border-radius: 4px;
          padding: 4px 8px;
          font-size: 11.5px;
          color: var(--ink-700);
          cursor: pointer;
          transition: all 0.15s ease;
        }
        .svg-icon-btn:hover {
          background: var(--blush-400);
          border-color: var(--maroon-700);
          color: var(--maroon-900);
        }
        .svg-icon-btn.active {
          background: #581e15;
          border-color: #581e15;
          color: #fbdfa2;
          font-weight: 500;
        }
        .svg-icon-btn svg { flex-shrink: 0; }

        @media (max-width: 680px) {
          .admin-page-head { margin-bottom: 18px; }
          .admin-page-head h1 { font-size: 22px; margin-bottom: 6px; }
          .section-card { padding: 16px 14px; }
          .grid-2-col { grid-template-columns: 1fr; }
          .grid-3-col { grid-template-columns: 1fr; }
          .slide-upload-actions { flex-direction: column; gap: 8px; }
          .slide-upload-actions .btn { width: 100%; text-align: center; }
          .section-card-foot .btn { width: 100%; text-align: center; justify-content: center; }
          .slide-card-header { padding: 8px 10px; gap: 8px; }
          .slide-header-actions { flex-wrap: wrap; }
          .picker-chip { flex-wrap: wrap; gap: 6px; }
        }
      `}</style>
    </div>
  );
}
