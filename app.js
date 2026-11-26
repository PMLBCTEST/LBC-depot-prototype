/* ==========================================================================
   Prototype dépôt d'annonce BDC - workshop v2
   Flow : Home > Galerie > (Un / plusieurs objets) > [Détection] > One form > Confirmation
   Toutes les données « IA » sont simulées.
   ========================================================================== */
(() => {
  'use strict';

  /* ---------- Données ---------- */
  const P = 'assets/photos/';
  const kindOf = (id) => id.replace(/-\d+$/, '').replace('bits', 'drill').replace('tee', 'tee');
  const srcOf = (id) => {
    const base = id.replace(/-\d+$/, '');
    const dir = { sneaker: 'sneakers', tee: 'sneakers', phone: 'phone', buds: 'phone', drill: 'drill', bits: 'drill' }[base];
    return `${P}${dir}/${id}.svg`;
  };
  const GALLERY = ['sneaker-1', 'sneaker-2', 'sneaker-3', 'phone-1', 'phone-2', 'buds-1', 'drill-1', 'drill-2', 'bits-1', 'tee-1',
    'sneaker-4', 'phone-3', 'buds-2', 'tee-2', 'drill-3', 'sneaker-5', 'phone-4', 'bits-2', 'drill-4', 'tee-3', 'buds-3', 'sneaker-6', 'phone-5', 'drill-5', 'phone-6', 'bits-3', 'drill-6'];
  const CAMERA_POOL = ['tee-2', 'tee-3', 'sneaker-5', 'sneaker-6'];

  const STATES = ['Neuf', 'Très bon état', 'Bon état', 'État correct', 'À réparer'];
  const stateParam = { key: 'etat', label: 'État', essential: true, options: STATES };
  const KINDS = {
    sneaker: { name: 'Baskets', title: 'Baskets running homme blanches et bleues', cat: 'Mode > Chaussures', price: 45,
      desc: 'Paire de baskets de running légères, coloris blanc et bleu. Semelle amortissante, très confortables pour le sport comme pour la ville.',
      params: [{ key: 'cat', label: 'Catégorie', ai: 'Chaussures homme', options: ['Chaussures homme', 'Chaussures femme', 'Chaussures enfant'] },
        { key: 'couleur', label: 'Couleur', ai: 'Blanc, bleu', options: ['Blanc, bleu', 'Noir', 'Gris', 'Rouge'] },
        { key: 'type', label: 'Type', ai: 'Running', options: ['Running', 'Ville', 'Basket montante'] },
        { key: 'pointure', label: 'Pointure', essential: true, options: ['39', '40', '41', '42', '43', '44', '45'] },
        stateParam,
        { key: 'marque', label: 'Marque', options: ['Nike', 'Adidas', 'Asics', 'Puma', 'Autre'] },
        { key: 'matiere', label: 'Matière', options: ['Textile', 'Cuir', 'Synthétique'] }] },
    tee: { name: 'T-shirt', title: 'T-shirt en coton homme', cat: 'Mode > Vêtements', price: 12,
      desc: 'T-shirt en coton, coupe classique, col rond. Facile à porter au quotidien.',
      params: [{ key: 'cat', label: 'Catégorie', ai: 'Vêtements homme', options: ['Vêtements homme', 'Vêtements femme'] },
        { key: 'couleur', label: 'Couleur', ai: 'Blanc', options: ['Blanc', 'Noir', 'Bleu', 'Gris'] },
        { key: 'taille', label: 'Taille', essential: true, options: ['S', 'M', 'L', 'XL'] },
        stateParam,
        { key: 'marque', label: 'Marque', options: ['Uniqlo', 'Kiabi', 'Zara', 'Autre'] },
        { key: 'matiere', label: 'Matière', options: ['Coton', 'Polyester', 'Mélange'] }] },
    phone: { name: 'Smartphone', title: 'Smartphone 128 Go noir débloqué', cat: 'Téléphonie > Smartphones', price: 320,
      desc: 'Smartphone 128 Go, coloris noir, débloqué tous opérateurs. Écran sans rayure, fonctionne parfaitement.',
      params: [{ key: 'cat', label: 'Catégorie', ai: 'Smartphones', options: ['Smartphones', 'Téléphones fixes'] },
        { key: 'couleur', label: 'Couleur', ai: 'Noir', options: ['Noir', 'Blanc', 'Bleu'] },
        { key: 'stockage', label: 'Stockage', ai: '128 Go', options: ['64 Go', '128 Go', '256 Go', '512 Go'] },
        { key: 'marque', label: 'Marque', essential: true, options: ['Apple', 'Samsung', 'Xiaomi', 'Google', 'Autre'] },
        stateParam,
        { key: 'debloque', label: 'Débloqué', options: ['Oui, tous opérateurs', 'Non'] },
        { key: 'batterie', label: 'Santé batterie', options: ['Plus de 90 %', '80 à 90 %', 'Moins de 80 %'] }] },
    buds: { name: 'Écouteurs', title: 'Écouteurs sans fil avec boîtier de charge', cat: 'Multimédia > Audio', price: 40,
      desc: 'Écouteurs sans fil Bluetooth livrés avec leur boîtier de charge. Bonne autonomie et son de qualité.',
      params: [{ key: 'cat', label: 'Catégorie', ai: 'Écouteurs et casques', options: ['Écouteurs et casques', 'Enceintes'] },
        { key: 'couleur', label: 'Couleur', ai: 'Blanc', options: ['Blanc', 'Noir'] },
        { key: 'type', label: 'Type', ai: 'Intra-auriculaires', options: ['Intra-auriculaires', 'Casque'] },
        { key: 'marque', label: 'Marque', essential: true, options: ['Apple', 'Samsung', 'Sony', 'JBL', 'Autre'] },
        stateParam,
        { key: 'conn', label: 'Connectivité', options: ['Bluetooth', 'Filaire'] }] },
    drill: { name: 'Perceuse', title: 'Perceuse visseuse sans fil avec embouts', cat: 'Bricolage > Outillage', price: 55,
      desc: 'Perceuse visseuse sans fil livrée avec un jeu d\'embouts. Pratique pour tous vos travaux de bricolage.',
      params: [{ key: 'cat', label: 'Catégorie', ai: 'Outillage électroportatif', options: ['Outillage électroportatif', 'Outillage à main'] },
        { key: 'couleur', label: 'Couleur', ai: 'Jaune, noir', options: ['Jaune, noir', 'Bleu', 'Vert', 'Rouge'] },
        { key: 'type', label: 'Alimentation', ai: 'Sans fil', options: ['Sans fil', 'Filaire'] },
        { key: 'marque', label: 'Marque', essential: true, options: ['Bosch', 'Makita', 'DeWalt', 'Black+Decker', 'Autre'] },
        stateParam,
        { key: 'tension', label: 'Tension', options: ['12 V', '18 V', '20 V'] }] },
  };

  const VERTICALS = [
    { id: 'bdc', label: 'Bien du quotidien', icon: 'bag' },
    { id: 'immo', label: 'Immobilier', icon: 'building' },
    { id: 'auto', label: 'Véhicule', icon: 'car' },
  ];
  const CARRIERS = [
    { id: 'laposte', name: 'Courrier suivi', logo: 'laposte', tags: ['Jusqu\'à 2 kg', 'Domicile'], note: 'Limité à 3 cm d\'épaisseur' },
    { id: 'shop2shop', name: 'Shop2Shop by Chronopost', logo: 'chrono', tags: ['Jusqu\'à 20 kg', 'Magasin & Locker'], note: 'La somme de la longueur, largeur et hauteur ne dépasse pas 150 cm, ou le côté le plus long ne dépasse pas 100 cm' },
    { id: 'mondial', name: 'Mondial Relay', logo: 'mondial', tags: ['Jusqu\'à 30 kg', 'Magasin & Locker'], note: 'La somme de la longueur, largeur et hauteur ne dépasse pas 150 cm, et le côté le plus long ne dépasse pas 120 cm' },
    { id: 'colissimo', name: 'Colissimo', logo: 'colissimo', tags: ['Jusqu\'à 30 kg', 'Domicile'], note: 'La somme de la longueur, largeur et hauteur ne dépasse pas 150 cm, ou le côté le plus long ne dépasse pas 100 cm' },
  ];
  // Logos simplifiés (placeholders, à remplacer par les logos officiels des transporteurs)
  const LOGOS = {
    laposte: '<svg viewBox="0 0 32 24" width="32" height="24" aria-hidden="true"><ellipse cx="16" cy="12" rx="15" ry="9" fill="#FFCC00"/><path d="M6 13l14-5-5 3 11 1-16 5 5-3z" fill="#003DA5"/></svg>',
    chrono: '<svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true"><path d="M12 2l9 5v10l-9 5-9-5V7z" fill="#4A9AD9"/><path d="M12 12l9-5v10l-9 5z" fill="#1F6FB2"/><path d="M12 12L3 7l9-5 9 5z" fill="#7DBDEB"/></svg>',
    mondial: '<svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="3" fill="#96154A"/><path d="M9 18v-8h5" stroke="#fff" stroke-width="2.4" fill="none" stroke-linecap="round"/><circle cx="15.5" cy="7.5" r="1.6" fill="#fff"/></svg>',
    colissimo: '<svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true"><path d="M12 2l9 5v10l-9 5-9-5V7z" fill="#F29B30"/><path d="M12 12l9-5v10l-9 5z" fill="#D9771A"/><path d="M12 12L3 7l9-5 9 5z" fill="#F7B65F"/></svg>',
  };
  const SIZES = [
    { id: 'S', label: 'Petit', desc: 'Tient dans une enveloppe, jusqu\'à 3 cm.', est: 'Moins de 500 g estimés' },
    { id: 'M', label: 'Moyen', desc: 'Tient dans un carton standard, <b>jusqu\'à 150 cm</b> de développé.', est: 'De 500 g à 1 kg estimés' },
    { id: 'L', label: 'Volumineux', desc: 'Tient dans une voiture ou une camionnette, <b>plus de 150 cm</b> de développé.', est: 'Plus de 1 kg estimés' },
  ];
  const DELAYS = [1, 2, 3, 5, 7];
  const PROMOS = [
    { id: 'top', name: 'Remontée en tête de liste', note: 'Votre annonce remonte chaque jour pendant 7 jours', price: 4.99, best: true },
    { id: 'gallery', name: 'Galerie', note: 'Mise en avant en haut des résultats pendant 7 jours', price: 9.99 },
    { id: 'pack', name: 'Pack visibilité', note: 'Remontée, galerie et urgent pendant 14 jours', price: 17.99 },
  ];
  const POINTS = [
    { name: 'Tabac de la Paix', dist: '120 m', x: 58, y: 38 }, { name: 'Relais Opéra', dist: '350 m', x: 28, y: 62 },
    { name: 'Pressing Vendôme', dist: '480 m', x: 76, y: 70 },
  ];

  /* ---------- État ---------- */
  const fresh = () => ({
    screen: 'home', vertical: 'bdc', selected: [], mode: null, ads: [], active: null, // active: index d'annonce ou null (vue « Toutes »)
    allText: '', analysing: false, voice: false,
    delivery: { addrs: [{ id: 'd', text: '12 rue de la Paix, 75002 Paris', sel: true, def: true }, { id: 'w', text: '8 avenue Victor Hugo, 69003 Lyon', sel: false }],
      ship: true, hand: true, carriers: { laposte: true, shop2shop: true, mondial: true, colissimo: true, others: false }, payer: 'buyer', size: 'M', delay: 3 },
    promo: null, aiToggle: true, published: 0, camIdx: 0,
  });
  let S = fresh();
  let toastTimer = null, voiceTimer = null, uid = 0;

  const $ = (s, r = document) => r.querySelector(s);
  const app = $('#app'), layer = $('#layer');
  const eur = (n) => `${String(n).replace('.', ',')} €`;
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const ic = (n, c = '') => `<svg class="ic ${c}" aria-hidden="true"><use href="#i-${n}"/></svg>`;
  const img = (id, alt = '') => `<img src="${srcOf(id)}" alt="${esc(alt)}" loading="lazy">`;
  const ad = () => (S.active === null ? null : S.ads[S.active]);

  /* ---------- Détection des puces du champ magique ---------- */
  // Détection en temps réel : mots-clés (début de mot, accents gérés) sur le texte saisi ou dicté
  const W = (words) => new RegExp(`(?<![\\p{L}])(?:${words})`, 'iu');
  const CHIPS = [
    { id: 'why', label: 'Pourquoi je vends', re: W('vend|parce|car(?![\\p{L}])|déménag|trop|plus (?:besoin|utilis|porté)|ne (?:me )?sert|jamais (?:porté|utilisé|mis)|chang|remplac|cadeau|doublon|n\'utilis|besoin|manque de place') },
    { id: 'wear', label: 'État / usure', re: W('état|neuf|usure|usé|rayure|abîm|tache|trace|fonctionn|impeccable|bon |très bon|parfait|cass|défaut|propre|comme') },
    { id: 'age', label: 'Ancienneté', re: W('(?:\\d+|un|une|deux|trois|quatre|cinq|six|sept|huit|dix) (?:an|ans|mois|semaine|semaines|année|années)|depuis|acheté|récent|il y a') },
    { id: 'incl', label: 'Ce qui est inclus', re: W('avec|inclus|boîte|boite|chargeur|fourni|livré|câble|cable|facture|accessoire|emballage|notice|housse|sans') },
  ];
  const flagsOf = (t) => Object.fromEntries(CHIPS.map((c) => [c.id, c.re.test(t || '')]));

  /* ---------- Génération simulée ---------- */
  const sentence = (t) => { t = (t || '').trim(); if (!t) return ''; t = t[0].toUpperCase() + t.slice(1); return /[.!?]$/.test(t) ? t : t + '.'; };
  const newAd = (kind, photos) => ({ id: 'a' + (++uid), kind, photos, text: '', title: '', desc: '', price: null, min: null, analysed: false, ready: false,
    params: KINDS[kind].params.map((p) => ({ key: p.key, label: p.label, essential: !!p.essential, options: p.options, value: null, source: 'empty' })) });
  function generate(a, text) {
    const K = KINDS[a.kind], f = flagsOf(text);
    a.text = text;
    if (!a.title || a.title === a.genTitle) a.title = a.genTitle = K.title;
    const desc = K.desc + (text ? '\n\n' + sentence(text) : '');
    if (!a.desc || a.desc === a.genDesc) a.desc = a.genDesc = desc;
    K.params.forEach((spec) => {
      const p = a.params.find((x) => x.key === spec.key); if (p.source === 'user') return;
      p.value = spec.ai || null; p.source = spec.ai ? 'ai' : 'empty';
    });
    if (f.wear) { const e = a.params.find((p) => p.key === 'etat'); if (e.source !== 'user') { e.value = 'Très bon état'; e.source = 'ai'; } }
    if (!a.price || a.price === a.genPrice) { a.price = a.genPrice = K.price + (f.wear ? 5 : 0); }
    a.analysed = true; a.ready = false;
  }
  const problems = (a) => {
    const r = []; if (!(a.title || '').trim()) r.push('title'); if (!(a.desc || '').trim()) r.push('desc');
    if (!a.give && !a.price) r.push('price'); return r;
  };

  /* ---------- Navigation et rendu ---------- */
  function go(screen) { S.screen = screen; render(); }
  function render() {
    const keep = $('.scroll', app)?.scrollTop || 0, same = render.last === S.screen && !S.analysing;
    const fn = { home, gallery, camera, upload, detect, form, done }[S.screen];
    app.innerHTML = fn(); render.last = S.screen;
    const sc = $('.scroll', app); if (sc && same) { sc.style.scrollBehavior = 'auto'; sc.scrollTop = keep; sc.style.scrollBehavior = ''; }
    if (same) $('.screen', app)?.style.setProperty('animation', 'none');
    renderGuide();
    if (S.screen === 'gallery') bindGalleryScroll();
    if (S.screen === 'form' && !S.analysing && !$('.sheet', layer)) {
      const all = multi() && S.active === null;
      if (all ? !S.magicShown : (!multi() && S.active !== null && !ad().magicShown)) { if (all) S.magicShown = true; else ad().magicShown = true; openMagic(); }
    }
  }

  const header = (title, back = 'back', right = '<span class="sp"></span>') => `
    <header class="navbar"><button class="ibtn" data-a="${back === 'close' ? 'close' : 'back'}" aria-label="${back === 'close' ? 'Fermer' : 'Retour'}">${ic(back === 'close' ? 'close' : 'back')}</button>
    ${title ? `<h1>${esc(title)}</h1>` : '<span style="flex:1"></span>'}${right}</header>`;

  const tabbar = () => `<nav class="tabbar" aria-label="Navigation principale">
    ${[['home', 'Accueil', 'home'], ['heart', 'Favoris', 'heart'], ['plus-c', 'Publier', 'plus'], ['msg', 'Messages', 'msg'], ['user', 'Mon compte', 'user']]
      .map(([i, l, k]) => `<button ${k === 'home' ? 'aria-current="page"' : ''} class="${k === 'plus' ? 'publish' : ''}" data-a="${k === 'plus' ? 'publish' : 'noop'}">${ic(i)}<span>${l}</span></button>`).join('')}</nav>`;

  /* 1. Accueil */
  function home() {
    const cards = [['sneaker-2', 'Baskets running', '35 €'], ['phone-4', 'Smartphone 64 Go', '180 €'], ['drill-2', 'Perceuse visseuse', '60 €'], ['buds-3', 'Écouteurs sans fil', '25 €']];
    return `<section class="screen"><div class="scroll nopad">
      <div style="height:48px"></div>
      <div class="search" style="margin-bottom:24px">${ic('search')}<span>Rechercher sur leboncoin</span></div>
      <div style="padding:0 16px"><h2 class="t-headline2" style="margin-bottom:16px">Recommandé pour vous</h2>
      <div class="adgrid">${cards.map(([i, t, p]) => `<article class="ad"><div class="ph">${img(i, t)}</div><p class="t-body2" style="margin-top:8px">${t}</p><p class="t-body1h">${p}</p></article>`).join('')}</div></div>
      </div>${tabbar()}</section>`;
  }

  /* 2. Galerie */
  function gallery() {
    const n = S.selected.length, enter = n > 0 && !S.ctaShown; S.ctaShown = n > 0;
    return `<section class="screen g-screen">
      <header class="navbar g-bar"><button class="ibtn" data-a="close" aria-label="Fermer">${ic('close')}</button><h1 class="g-bar-title" aria-hidden="true">Vos photos</h1><span class="sp"></span></header>
      <div class="scroll nopad g-scroll" id="g-scroll">
        <div class="g-hero" id="g-hero">
          <h1 class="t-headline1" style="margin-bottom:16px">Que vendez-vous aujourd'hui ?</h1>
          <div class="verticals" role="radiogroup" aria-label="Type d'annonce">
            ${VERTICALS.map((v) => `<button class="vcard" role="radio" aria-checked="${S.vertical === v.id}" data-a="vertical" data-v="${v.id}"><span class="vc-illu" aria-hidden="true"><span class="vc-clip"><span class="vc-mask"><img src="assets/illus/verticals/${v.id}.svg" alt=""></span></span></span><span class="vc-label t-body2h">${v.label}</span></button>`).join('')}
          </div>
          <div class="banner" role="note">${ic('info')}<p class="t-body2"><b>Nouveau !</b> Déposez plusieurs annonces en même temps avec vos photos</p></div>
        </div>
        <div class="g-panel">
          <h2 class="t-subhead g-panel-title">Vos photos <span class="dim t-body2" style="font-weight:400">${n ? `· ${n} sélectionnée${n > 1 ? 's' : ''}` : ''}</span></h2>
          <div class="grid" role="group" aria-label="Galerie photo">
            <button class="tile cam" data-a="camera" aria-label="Prendre une photo">${ic('camera', 'lg')}<span>Appareil photo</span></button>
            ${GALLERY.map((id) => { const i = S.selected.indexOf(id);
              return `<button class="tile ${i > -1 ? 'sel' : ''}" data-a="toggle" data-id="${id}" aria-pressed="${i > -1}" aria-label="Photo ${id}">${img(id)}${i > -1 ? `<span class="num">${i + 1}</span>` : '<span class="ring"></span>'}</button>`; }).join('')}
          </div></div></div>
      ${n ? `<div class="sticky ${enter ? 'enter' : ''}"><button class="btn main block" data-a="chooseCount">Continuer (${n})</button></div>` : ''}</section>`;
  }
  /* Scroll de la galerie (repris du prototype workshop v1) : la galerie glisse par-dessus le haut de page, qui s'efface ;
     la barre se remplit et affiche « Vos photos » quand la galerie arrive en haut. */
  function bindGalleryScroll() {
    const sc = $('#g-scroll', app), hero = $('#g-hero', app), scr = $('.g-screen', app); if (!sc || !hero) return;
    let tick = false;
    const clamp = (x) => Math.max(0, Math.min(1, x));
    const update = () => {
      tick = false;
      const p = clamp(sc.scrollTop / Math.max(1, hero.offsetHeight));
      scr.style.setProperty('--p', p.toFixed(3));
      scr.style.setProperty('--bar', clamp((p - .55) / .45).toFixed(3));
      hero.classList.toggle('is-covered', p > .92);
    };
    sc.addEventListener('scroll', () => { if (!tick) { tick = true; requestAnimationFrame(update); } }, { passive: true });
    update();
  }


  /* 2b. Caméra */
  function camera() {
    return `<section class="screen camera">
      <header class="navbar" style="color:#fff"><button class="ibtn" style="color:#fff" data-a="back" aria-label="Retour">${ic('back')}</button><h1>Appareil photo</h1><span class="sp"></span></header>
      <div class="viewfinder"><div>${ic('camera', 'lg')}<p class="t-body2" style="margin-top:8px">Aperçu de l'appareil photo simulé.<br>Appuyez sur le déclencheur pour ajouter une photo.</p></div></div>
      <div style="padding:24px;display:flex;align-items:center;justify-content:space-between">
        <span class="t-body2" style="width:96px">${S.selected.length} photo${S.selected.length > 1 ? 's' : ''}</span>
        <button class="shutter" data-a="shoot" aria-label="Prendre la photo"><i></i></button>
        <button class="btn main sm" style="width:96px" data-a="back">Terminé</button></div></section>`;
  }

  /* 3. Envoi des photos */
  function upload() {
    return `<section class="screen"><div class="center"><div class="spinner" role="status" aria-label="Envoi en cours"></div>
      <h1 class="t-headline1">Analyse de vos photos</h1><p class="t-body2 dim" id="upmsg">0 sur ${S.selected.length}</p>
      <div class="progress" style="width:240px" role="progressbar"><i id="upbar"></i></div></div></section>`;
  }
  function runUpload() {
    const total = S.selected.length; let i = 0;
    const t = setInterval(() => {
      i++; const b = $('#upbar'), m = $('#upmsg');
      if (!b) { clearInterval(t); return; }
      b.style.width = `${(i / total) * 100}%`; m.textContent = `${i} sur ${total}`;
      if (i >= total) { clearInterval(t); setTimeout(() => { S.active = S.mode === 'multi' ? null : 0; go('form'); }, 400); }
    }, 350);
  }

  /* 4. Détection des objets (multi) */
  function detect() {
    return `<section class="screen">${header('Objets détectés')}
      <div class="scroll">
        <p class="t-body2 dim" style="margin-bottom:16px">Nous avons regroupé vos photos par objet. Ajoutez ou retirez des photos pour chaque annonce.</p>
        ${S.ads.map((a, i) => `<div class="group"><div class="hd"><h2 class="t-subhead">${esc(KINDS[a.kind].name)}</h2><span class="tag neutral">Annonce ${i + 1} · ${a.photos.length} photo${a.photos.length > 1 ? 's' : ''}</span></div>
          <div class="thumbs">${a.photos.map((p) => `<div class="thumb">${img(p)}<button class="rm" data-a="rmPhoto" data-ad="${a.id}" data-id="${p}" aria-label="Retirer la photo">${ic('close')}</button></div>`).join('')}
          <button class="addtile" data-a="addPhoto" data-ad="${a.id}" aria-label="Ajouter une photo">${ic('plus')}</button></div></div>`).join('')}
      </div>
      <div class="sticky"><button class="btn main block" data-a="toForm">Continuer</button></div></section>`;
  }

  /* 5. One form */
  const multi = () => S.mode === 'multi';
  function adStrip() {
    const create = `<button class="adchip add" data-a="newAd" aria-haspopup="dialog"><span class="add-ic">${ic('plus', 'sm')}</span><span class="t-body2h">Ajouter une annonce</span></button>`;
    if (!multi()) return `<div class="adstrip">${create}</div>`;
    return `<div class="adstrip" role="tablist" aria-label="Annonces">
      <button class="adchip all" role="tab" aria-selected="${S.active === null}" data-a="openAd" data-i="all"><b class="t-body2h">Toutes (${S.ads.length})</b></button>
      ${S.ads.map((a, i) => `<button class="adchip" role="tab" aria-selected="${S.active === i}" data-a="openAd" data-i="${i}"><span class="thumb">${img(a.photos[0])}</span><span class="t-body2h">${esc(KINDS[a.kind].name)}</span>${a.ready ? ic('check', 'sm') : ''}</button>`).join('')}
      ${create}</div>`;
  }


  function magicBlock(text, id) {
    return `<div class="field magic-field">
      <div class="checklist-wrap">
        <div class="spark-chips">${CHIPS.map((c) => `<span class="spark-chip dashed"><span class="spark-chip-content">${c.label}</span></span>`).join('')}</div></div>
      <div class="magic"><div class="magic-live t-body1" id="magicLive" aria-hidden="true"></div><textarea id="${id}" data-in="${id}" placeholder="ex : Je vends mes baskets car elles sont trop petites, achetées il y a 2 ans, en très bon état, avec la boîte d'origine." aria-label="Dites-nous tout ce que vous savez sur cet objet">${esc(text)}</textarea>
      </div>
      <div class="voice${S.voice ? ' rec' : ''}"><span class="wave lg wl" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i><i></i><i></i></span>
        <button class="ibtn mic ${S.voice ? 'recording' : 'tinted'}" id="micBtn" data-a="mic" aria-pressed="${S.voice}" aria-label="${S.voice ? 'Arrêter la dictée' : 'Dicter à la voix'}">${ic(S.voice ? 'stop' : 'mic')}</button>
        <span class="wave lg wr" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i><i></i><i></i></span></div></div>`;
  }
  function openMagic() {
    const all = multi() && S.active === null;
    openSheet(all ? 'Dites-nous tout ce que vous savez sur ces objets...' : 'Dites-nous tout ce que vous savez sur cet objet...',
      magicBlock(all ? S.allText : ad().text, all ? 'allText' : 'magic'),
      `<button class="btn main block" data-a="generate">${all ? 'Générer mes annonces' : 'Générer l\'annonce'}</button>`,
      `<div class="sheet-illus" aria-hidden="true"><img class="illus-light" src="assets/illus/magic-light.svg" alt="" width="130" height="121"><img class="illus-dark" src="assets/illus/magic-dark.svg" alt="" width="130" height="121"></div>`);
  }

  function photosBlock(a, top = 0) {
    return `<div class="section" style="margin-top:${top}px"><h2 class="t-subhead" style="margin-bottom:8px">Photos <span class="dim t-body2" style="font-weight:400">· ${a.photos.length}</span></h2>
      <div class="thumbs">${a.photos.map((p) => `<div class="thumb">${img(p)}<button class="rm" data-a="rmPhoto" data-ad="${a.id}" data-id="${p}" aria-label="Retirer la photo">${ic('close')}</button></div>`).join('')}
      <button class="addtile" data-a="addPhoto" data-ad="${a.id}" aria-label="Ajouter une photo">${ic('plus')}</button></div></div>`;
  }

  // Effets inspirés de shadcn « Flip Words » (apparition du titre lettre par lettre) et « Shimmering Text »
  // (une lumière balaie le texte caractère par caractère, puis une pause).
  const letters = (w) => [...w].map((ch, i) => `<span class="fw-l" style="--d:${i * 40}ms">${ch === ' ' ? '&nbsp;' : esc(ch)}</span>`).join('');
  const shimmer = (t) => { const n = t.length; return `<span class="sr-only">${esc(t)}</span><span aria-hidden="true">${[...t].map((ch, i) => (ch === ' ' ? ' ' : `<span class="sh-c" style="--k:${(i / n).toFixed(3)}">${esc(ch)}</span>`)).join('')}</span>`; };
  function loading() {
    const steps = ['Analyse de vos photos', 'Lecture de votre description', 'Rédaction de l\'annonce et estimation du prix'];
    const title = multi() && S.active === null ? 'On prépare vos annonces' : 'On prépare votre annonce';
    return `<div class="center gen" role="status" aria-live="polite">
      <div class="spinner" aria-hidden="true"></div>
      <h2 class="t-headline1 gen-title"><span class="sr-only">${esc(title)}</span><span class="fw-word in" aria-hidden="true">${letters(title)}</span></h2>
      <ul class="steps gen-steps" id="steps">${steps.map((t, i) => `<li class="${i === 0 ? 'active' : ''}"><span class="st-check" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M6 12.500l4 4 8-9"/></svg></span><span class="st-label">${shimmer(t)}</span></li>`).join('')}</ul></div>`;
  }
  function runLoadingFx() {
    const lis = [...app.querySelectorAll('#steps li')];
    lis.forEach((l, i) => setTimeout(() => { l.classList.remove('active'); l.classList.add('done'); lis[i + 1]?.classList.add('active'); }, 600 + i * 650));
  }


  function paramRows(a) {
    const chip = (p) => `<button class="spark-chip lg tinted-support" data-a="editParam" data-key="${p.key}" data-id="${a.id}" id="p-${a.id}-${p.key}" aria-label="Modifier ${esc(p.label)} : ${esc(p.value)}"><span class="spark-chip-content">${esc(p.label)} : ${esc(p.value)}</span>${ic('edit', 'sm')}</button>`;
    const row = (p) => `<button class="row" data-a="editParam" data-key="${p.key}" data-id="${a.id}" id="p-${a.id}-${p.key}"><div class="k"><div class="t-caption dim">${p.label}</div>
        <div class="${p.value ? 'v t-body1h' : 't-body1 dim'}">${p.value ? esc(p.value) : 'À renseigner'}</div></div>${ic('chev-r', 'sm')}</button>`;
    const ai = a.params.filter((p) => p.source === 'ai'), rest = a.params.filter((p) => p.source !== 'ai');
    return (ai.length ? `<h3 class="t-body2h">Pré-remplies pour vous <span class="dim" style="font-weight:400">à vérifier</span></h3><div class="spark-chips">${ai.map(chip).join('')}</div>` : '')
      + (rest.length ? `<h3 class="t-body2h">À compléter</h3><div class="rows">${rest.map(row).join('')}</div>` : '');
  }

  function deliveryBlock() {
    const d = S.delivery, sel = d.addrs.filter((x) => x.sel), cars = CARRIERS.filter((c) => d.carriers[c.id]);
    const means = [d.hand ? 'En main propre' : '', d.ship ? (cars.length ? `En livraison (${cars.length} transporteur${cars.length > 1 ? 's' : ''})` : 'En livraison') : ''].filter(Boolean);
    return `<div class="sec-div" role="separator"></div><div class="section deliv-section"><h2 class="t-headline2">Livraison</h2>
      <button class="deliv-row" id="delivery" data-a="openDelivery" aria-haspopup="dialog">
        <span class="dr-info"><span class="t-body1h">${sel.length ? esc(sel[0].text) : 'Aucune adresse'}${sel.length > 1 ? ` <span class="tag neutral">+${sel.length - 1}</span>` : ''}</span>
          <span class="dr-means t-body2">${means.map((m, i) => `${i ? '<span class="dr-dot" aria-hidden="true">•</span>' : ''}<span>${m}</span>`).join('')}</span>
          ${d.ship ? `<span class="t-body2">Colis ${SIZES.find((x) => x.id === d.size).label}</span>` : ''}</span>
        <span class="mc-chev" aria-hidden="true"><img src="assets/icons/chevron-vertical.svg" alt="" width="16" height="16"></span></button></div>`;
  }


  /* ---------- Modale Livraison ---------- */
  function deliveryModal(d) {
    const chip = (grp, v, label, on) => `<button class="chip select" role="radio" aria-checked="${on}" data-a="${grp}" data-v="${v}">${label}</button>`;
    const size = SIZES.find((x) => x.id === d.size);
    return `<header class="navbar"><button class="ibtn" data-a="closeSheet" aria-label="Fermer">${ic('back')}</button><h1>Livraison</h1><span class="sp"></span></header>
      <div class="scroll">
        <div class="section" style="margin-top:8px"><h2 class="t-headline2">Adresse</h2>
          <p class="t-body2 dim" style="margin:4px 0 8px">Sélectionnez une ou plusieurs adresses de départ.</p>
          <div role="group" aria-label="Adresses">${d.addrs.map((x) => `<button class="opt" role="checkbox" aria-checked="${x.sel}" data-a="dAddr" data-id="${x.id}"><span class="check">${ic('check')}</span><span class="grow t-body1h">${esc(x.text)}</span>${x.def ? '<span class="tag neutral">Par défaut</span>' : ''}</button>`).join('')}</div>
          ${d.errAddr ? '<span class="err" style="display:block">Sélectionnez au moins une adresse</span>' : ''}
          <div class="field" style="margin-top:16px"><label for="newAddr">Ajouter une adresse</label>
            <div style="display:flex;gap:8px;align-items:flex-start"><input class="input" id="newAddr" data-in="newAddr" value="${esc(d.newAddr || '')}" placeholder="ex : 8 avenue Victor Hugo, 69003 Lyon" autocomplete="street-address"><button class="btn outlined sm" data-a="dAddAddr" style="flex:none;min-height:48px">Ajouter</button></div></div></div>

        <div class="section"><div class="ship-card">
          <div class="sc-body">
            <button class="sc-head" role="switch" aria-checked="${d.ship}" data-a="dShip"><span class="t-headline2">En livraison</span><span class="switch" aria-hidden="true"></span></button>
            ${d.ship ? `<ul class="args">${[['piggy', 'Aucuns frais pour vous'], ['shield', 'Protection en cas d\'incident de livraison'], ['coins', '70 % de chances en plus de vendre']].map(([i, t]) => `<li>${ic(i, 'sm')}<span>${t}</span></li>`).join('')}</ul>
            <p class="t-body1 dim">Envoyez l'article à votre acheteur gratuitement via nos partenaires de livraison.</p>
            <div class="sc-carriers"><div class="logos">${CARRIERS.filter((c) => d.carriers[c.id]).map((c) => `<span class="logo" title="${c.name}">${LOGOS[c.logo]}</span>`).join('') || '<span class="t-body2 dim">Aucun transporteur</span>'}</div>
              <button class="ibtn edit-btn" data-a="dCarriersSheet" aria-label="Modifier les transporteurs">${ic('edit')}</button></div>` : ''}
          </div>
          ${d.ship ? `<div class="sc-parcel">${ic('box', 'xl')}<span class="grow"><b class="t-headline2">Colis ${SIZES.find((x) => x.id === d.size).label.toLowerCase()}</b><br><span class="t-body2 sc-sub">${SIZES.find((x) => x.id === d.size).est}</span></span>
            <button class="ibtn edit-btn white" data-a="dSizeSheet" aria-label="Modifier le format du colis">${ic('edit')}</button></div>` : ''}
        </div>
        ${d.errMean ? '<span class="err" style="display:block;margin-top:8px">Choisissez au moins un transporteur</span>' : ''}</div>

        <div class="section" style="margin-top:16px"><div class="ship-card">
          <div class="sc-body">
            <button class="sc-head" role="switch" aria-checked="${d.hand}" data-a="dHand"><span class="t-headline2">En main propre</span><span class="switch" aria-hidden="true"></span></button>
            ${d.hand ? `<p class="t-body2 dim">Après vérification de l'article, l'acheteur valide la remise et vous recevez le paiement sur votre porte-monnaie.</p>
            <ul class="args">${[['thumb', 'Respect du prix fixé à l\'achat'], ['shield-euro', 'Sécurisation de votre paiement'], ['star', 'Avis sur votre profil']].map(([i, t]) => `<li>${ic(i, 'sm')}<span>${t}</span></li>`).join('')}</ul>` : ''}
          </div></div>
          ${d.errNone ? '<span class="err" style="display:block;margin-top:8px">Activez au moins un mode de remise : en livraison ou en main propre</span>' : ''}</div>

        ${d.ship ? `<div class="section"><h2 class="t-headline2">Livraison payée par</h2>
          <div class="seg" role="radiogroup" aria-label="Livraison payée par" style="margin-top:8px"><button role="radio" aria-checked="${d.payer === 'buyer'}" data-a="dPayer" data-v="buyer">L'acheteur</button><button role="radio" aria-checked="${d.payer === 'seller'}" data-a="dPayer" data-v="seller">Moi (vendeur)</button></div>
          <p class="helper" style="margin-top:4px">${d.payer === 'buyer' ? 'Les frais de livraison sont ajoutés au prix à l\'achat.' : 'Plus attractif pour les acheteurs : les frais sont déduits de votre vente.'}</p></div>` : ''}

        <div class="section"><h2 class="t-headline2">Délai d'expédition</h2>
          <p class="t-body2 dim" style="margin:4px 0 8px">Délai maximum pour expédier le colis après la vente.</p>
          <div class="chips" role="radiogroup" aria-label="Délai d'expédition">${DELAYS.map((n) => chip('dDelay', n, `${n} jour${n > 1 ? 's' : ''}`, d.delay === n)).join('')}</div></div>
      </div>
      <div class="sticky"><button class="btn main block" data-a="saveDelivery">Valider</button></div>`;
  }
  function openDelivery() {
    S.dd = JSON.parse(JSON.stringify(S.delivery)); S.dd.newAddr = '';
    layer.innerHTML = `<div class="fullmodal" role="dialog" aria-modal="true" aria-label="Livraison">${deliveryModal(S.dd)}</div>`;
    requestAnimationFrame(() => $('.fullmodal', layer)?.classList.add('open'));
  }
  function refreshDelivery() {
    const sub0 = $('#sublayer'); if (sub0) sub0.innerHTML = '';
    const fm = $('.fullmodal', layer); if (!fm) return;
    const keep = $('.scroll', fm)?.scrollTop || 0; fm.innerHTML = deliveryModal(S.dd);
    const sc = $('.scroll', fm); if (sc) { sc.style.scrollBehavior = 'auto'; sc.scrollTop = keep; sc.style.scrollBehavior = ''; }
  }

  function promoBlock() {
    const best = PROMOS[0], on = S.promo === best.id;
    return `<div class="sec-div" role="separator"></div><div class="section"><h2 class="t-headline2">Mise en avant</h2>
      <div class="card" style="border:var(--border-md) solid var(--accent)"><div style="display:flex;gap:8px;align-items:center;margin-bottom:8px"><span class="tag accent">${ic('bolt', 'sm')}Recommandé</span></div>
        <p class="t-body1h">${best.name}</p><p class="t-body2 dim">${best.note}</p>
        <button class="opt" role="checkbox" aria-checked="${on}" data-a="promo" data-id="${best.id}" style="padding-bottom:0"><span class="check">${ic('check')}</span><span class="grow t-body1h">Ajouter</span><span class="t-body1h">${eur(best.price)}</span></button></div>
      <button class="textlink t-body2" style="margin-top:16px" data-a="promoSheet">Voir les autres options de mise en avant</button></div>`;
  }

  function fullForm(a) {
    return `${photosBlock(a, 16)}
      <div style="margin-top:24px">${prompt(false, a.analysed)}</div>
      <div class="sec-div" role="separator"></div>
      <div class="section"><div class="field"><label for="title">Titre de l'annonce *</label><input class="input" id="title" data-in="title" value="${esc(a.title)}" placeholder="ex : ${esc(KINDS[a.kind].title)}"><span class="err">Champ obligatoire</span></div>
        <div class="field"><label for="desc">Description *</label><textarea class="textarea" id="desc" data-in="desc" style="min-height:176px" placeholder="Décrivez votre objet : état, taille, ce qui est inclus...">${esc(a.desc)}</textarea><span class="err">Champ obligatoire</span></div></div>
      <div class="sec-div" role="separator"></div>
      <div class="section"><h2 class="t-headline2">Caractéristiques</h2>
        <div id="params">${paramRows(a)}</div></div>
      <div class="sec-div" role="separator"></div>
      <div class="section tabs" role="tablist" aria-label="Type d'annonce">
        <button class="tab" role="tab" aria-selected="${!a.give}" data-a="give" data-v="0">Je vends</button>
        <button class="tab" role="tab" aria-selected="${!!a.give}" data-a="give" data-v="1">Je donne</button></div>
      ${a.give ? `<div class="give-section" id="price"><div class="give-illus" aria-hidden="true"><img src="assets/illus/give/ff60a.svg" alt="" style="left:58.13px;top:29.04px;width:10.822px;height:30.96px"><img src="assets/illus/give/4e14c.svg" alt="" style="left:60.19px;top:30.5px;width:6.885px;height:28.477px"><img src="assets/illus/give/a7911.svg" alt="" style="left:25.79px;top:0px;width:44.206px;height:80px"><img src="assets/illus/give/7fe90.svg" alt="" style="left:31.29px;top:5.59px;width:31.74px;height:66.811px"><span class="gi-fauteuil" style="left:35.12px;top:7.06px;width:15.562px;height:18.531px"><span class="gi-rot"><img src="assets/illus/give/09b38.svg" alt="" width="24.309" height="19.008"></span></span><img src="assets/illus/give/d586f.svg" alt="" style="left:4.35px;top:21.64px;width:20.931px;height:17.64px"><img src="assets/illus/give/4907e.svg" alt="" style="left:57.22px;top:32.68px;width:5.54px;height:4.261px"><img src="assets/illus/give/0701f.svg" alt="" style="left:9.62px;top:23.52px;width:54.56px;height:15.481px"><img src="assets/illus/give/260ab.svg" alt="" style="left:11.98px;top:28.99px;width:57.068px;height:32.797px"><img src="assets/illus/give/932a6.svg" alt="" style="left:65.96px;top:54.52px;width:2.676px;height:3.651px"><img src="assets/illus/give/26e99.svg" alt="" style="left:16.3px;top:28.03px;width:2.154px;height:3.779px"><img src="assets/illus/give/d2984.svg" alt="" style="left:0.81px;top:35.82px;width:51.958px;height:33.616px"><img src="assets/illus/give/04494.svg" alt="" style="left:14.18px;top:27.37px;width:6.123px;height:2.421px"><img src="assets/illus/give/93d77.svg" alt="" style="left:0px;top:8.62px;width:10.27px;height:10.681px"><img src="assets/illus/give/dcf1b.svg" alt="" style="left:15.96px;top:34.62px;width:4.463px;height:1.2px"><img src="assets/illus/give/0ca16.svg" alt="" style="left:9.66px;top:22.43px;width:9.36px;height:8.429px"></div><p class="give-text t-body1">Vous remettez ce bien gratuitement à l’un des membres.</p></div>`
      : `<div class="price-section field price-field">
        <p class="ps-label"><span class="t-body1h">Prix de vente souhaité</span><span class="preq">*</span></p>
        <button class="ps-row" id="price" data-a="openReco" aria-haspopup="dialog" aria-label="Prix : ${a.price ? eur(a.price) : 'non renseigné'}. Modifier">
          <span class="pc-value ${a.price ? '' : 'empty'}">${a.price ? eur(a.price) : '– €'}</span><span class="ps-dot" aria-hidden="true">•</span><span class="pc-link">Modifier</span></button>
        <span class="err">Champ obligatoire</span></div>`}
      ${deliveryBlock()}${promoBlock()}`;
  }

  function prompt(all, analysed) {
    return analysed
      ? `<div class="magic-card done"><span class="mc-illus" aria-hidden="true"><img src="assets/illus/magic-card.svg" alt="" width="85.647" height="80"></span><span class="mc-done"><span class="t-body2h">${all ? 'Annonces générées' : 'Annonce générée'} à partir de vos photos et de votre récit.</span><button class="mc-link t-body2h" data-a="openMagic" aria-haspopup="dialog">Modifier mon récit</button></span></div>`
      : `<button class="magic-card" data-a="openMagic" aria-haspopup="dialog"><span class="mc-illus" aria-hidden="true"><img src="assets/illus/magic-card.svg" alt="" width="85.647" height="80"></span><span class="mc-text t-body1h">Dites-nous tout ce que vous savez sur ${all ? 'ces objets' : 'cet objet'}...</span><span class="mc-chev" aria-hidden="true"><img src="assets/icons/chevron-vertical.svg" alt="" width="16" height="16"></span></button>`;
  }
  function form() {
    if (S.analysing) return `<section class="screen">${header('Détails de l\'annonce')}${loading()}</section>`;
    const a = ad(); let body, cta;
    if (multi() && S.active === null) {
      const doneAll = S.ads.every((x) => x.analysed), ok = S.ads.filter((x) => x.ready).length;
      body = `<div style="margin-top:16px">${prompt(true, doneAll)}</div>
        <h2 class="t-subhead" style="margin:24px 0 8px">Vos annonces <span class="dim t-body2" style="font-weight:400">· ${ok}/${S.ads.length} vérifiées</span></h2>${S.ads.map(adCard).join('<div style="height:8px"></div>')}`;
      cta = `<button class="btn main block" data-a="validate">Publier les ${S.ads.length} annonces</button>`;
    } else {
      body = fullForm(a);
      cta = multi() ? `<button class="btn main block" data-a="saveAd">Enregistrer cette annonce</button>` : `<button class="btn main block" data-a="validate">Valider mon annonce</button>`;
    }
    return `<section class="screen">${header(multi() ? 'Mes annonces' : 'Détails de l\'annonce')}${adStrip()}<div class="scroll">${body}</div><div class="sticky">${cta}</div></section>`;
  }
  function adCard(a) {
    const idx = S.ads.indexOf(a);
    const st = a.ready ? '<span class="tag success">Vérifiée</span>' : problems(a).length ? '<span class="tag alert">À compléter</span>' : '<span class="tag support">À vérifier</span>';
    return `<button class="card int" data-a="openAd" data-i="${idx}"><span class="thumb" style="width:56px;height:56px">${img(a.photos[0])}</span>
      <span style="flex:1;min-width:0"><b class="t-body1h" style="display:block;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${esc(a.analysed ? a.title : KINDS[a.kind].name)}</b>
      <span class="t-body2 dim">${a.photos.length} photo${a.photos.length > 1 ? 's' : ''}${a.analysed ? ' · ' + (a.give ? 'Gratuit' : a.price ? eur(a.price) : 'Prix à définir') : ''}</span><br>${st}</span>${ic('chev-r', 'sm')}</button>`;
  }

  /* 6. Confirmation */
  function done() {
    const n = S.published, many = n > 1, shown = S.ads.slice(0, 3); // 3 cartes max
    const card = (a, i) => `<article class="cf-card" style="--i:${i}" aria-label="${esc(a.title)}">
        <div class="cf-ph">${img(a.photos[0], a.title)}</div>
        <div class="cf-info"><p class="t-subhead cf-title">${esc(a.title)}</p><p class="t-headline2">${a.give ? 'Gratuit' : eur(a.price)}</p></div></article>`;
    const stars = [1, 2, 3, 4, 5].map((k) => `<button class="cf-star" role="radio" aria-checked="${S.rating === k}" data-a="rate" data-v="${k}" aria-label="${k} étoile${k > 1 ? 's' : ''}"><img src="assets/icons/${(S.rating || 0) >= k ? 'star-filled' : 'star'}.svg" alt="" width="40" height="40"></button>`).join('');
    return `<section class="screen"><button class="ibtn cf-close" data-a="close" aria-label="Fermer"><img src="assets/icons/cross.svg" alt="" width="24" height="24"></button>
      <div class="scroll cf">
        <div class="cf-cards ${many ? `fan n${shown.length}` : ''}">${(many ? shown : shown.slice(0, 1)).map(card).join('')}</div>
        <div class="cf-text"><h1 class="t-display3">${many ? 'Vos annonces seront en ligne dans quelques secondes' : 'Votre annonce sera en ligne dans quelques secondes'}</h1>
          <p class="t-body2 dim">${many ? 'Vous recevrez un email dès leur mise en ligne et pourrez ensuite les retrouver dans la liste de vos “Annonces”.' : 'Vous recevrez un email dès sa mise en ligne et pourrez ensuite la retrouver dans la liste de vos “Annonces”.'}</p></div>
        <div class="cf-rating"><p class="t-body2h">Que pensez-vous de ce nouveau dépôt d’annonce ?</p><div class="cf-stars" role="radiogroup" aria-label="Note">${stars}</div></div>
        <div class="card ai-card"><button class="opt" role="switch" aria-checked="${S.aiToggle}" data-a="aiToggle" style="padding:0"><span class="grow"><b class="t-body1h">IA générative pour mes prochains dépôts</b><br><span class="t-body2 dim">Titre, description et caractéristiques pré-remplis à partir de vos photos. Vous pouvez la désactiver à tout moment.</span></span><span class="switch" aria-hidden="true"></span></button></div>
      </div>
      <div class="confirm-ft"><button class="btn main block" data-a="newDeposit">Vendre un autre produit</button><button class="btn outlined block" data-a="noop">Voir mes annonces</button></div></section>`;
  }



  /* ---------- Sheets / Toast ---------- */
  function openSheet(title, body, footer = '', top = '') {
    closeSheet(true);
    layer.innerHTML = `<div class="overlay" data-a="closeSheet"></div><div class="sheet${top ? ' has-illus' : ''}" role="dialog" aria-modal="true" aria-label="${esc(title)}">
      <div class="grab"></div>${top}<div class="hd"><h2 class="t-headline2">${esc(title)}</h2><button class="ibtn" data-a="closeSheet" aria-label="Fermer">${ic('close')}</button></div>
      <div class="bd">${body}</div>${footer ? `<div class="ft">${footer}</div>` : ''}</div>`;
    requestAnimationFrame(() => { $('.overlay', layer)?.classList.add('open'); $('.sheet', layer)?.classList.add('open'); $('.sheet button:not([data-a="closeSheet"])', layer)?.focus(); });
  }
  function closeSheet(instant) {
    const fm = $('.fullmodal', layer);
    if (fm) { if (instant === true) { layer.innerHTML = ''; return; } fm.classList.remove('open'); setTimeout(() => { layer.innerHTML = ''; }, 250); return; }
    const sh = $('.sheet', layer); if (!sh) return; stopVoice();
    if (instant === true) { layer.innerHTML = ''; return; }
    sh.classList.remove('open'); $('.overlay', layer)?.classList.remove('open');
    setTimeout(() => { layer.innerHTML = ''; }, 250);
  }
  function toast(msg, kind = '') {
    $('.toast', document)?.remove(); clearTimeout(toastTimer);
    const el = document.createElement('div'); el.className = `toast ${kind}`; el.setAttribute('role', 'status');
    el.innerHTML = `${ic(kind === 'error' ? 'info' : 'check')}<span class="t-body2">${esc(msg)}</span>`;
    $('.phone').appendChild(el); toastTimer = setTimeout(() => el.remove(), 3200);
  }

  /* ---------- Prix : jauge, ligne recommandée, modale ---------- */
  const recoOf = (a) => a.genPrice || KINDS[a.kind].price;
  // Percentiles simulés des annonces comparables : p1 / p10 / p50 (prix recommandé) / p90 / p99
  const pctOf = (R) => ({ p1: Math.round(R * 0.4), p10: Math.round(R * 0.8), p50: R, p90: Math.round(R * 1.3), p99: Math.round(R * 2.6) });
  const ZONE_FULL = { low: 'Prix attractif', opt: 'Prix optimal', high: 'Prix élevé' };
  // < p10 : attractif, p10 à p90 : optimal (fourchette recommandée), > p90 : élevé
  const gZone = (p, G) => (p < G.p10 ? 'low' : p > G.p90 ? 'high' : 'opt');
  const ratio = (p, lo, hi) => (hi > lo ? Math.max(0, Math.min(1, (p - lo) / (hi - lo))) : 0);
  function gaugeT(p, z, G) {
    if (z === 'low') return ratio(p, G.p1, G.p10);
    if (z === 'high') return ratio(p, G.p90, G.p99);
    return p <= G.p50 ? 0.5 * ratio(p, G.p10, G.p50) : 0.5 + 0.5 * ratio(p, G.p50, G.p90);
  }
  // Part (%) des annonces comparables moins chères que le prix saisi (interpolation entre percentiles)
  function pctBelow(p, G) {
    const pts = [[G.p1, 1], [G.p10, 10], [G.p50, 50], [G.p90, 90], [G.p99, 99]];
    if (p <= pts[0][0]) return 1; if (p >= pts[4][0]) return 99;
    for (let i = 0; i < 4; i++) { const [x0, y0] = pts[i], [x1, y1] = pts[i + 1]; if (p <= x1) return Math.round(y0 + ((p - x0) / (x1 - x0)) * (y1 - y0)); }
    return 99;
  }
  function priceGauge(a) {
    const G = pctOf(recoOf(a)), has = !!a.price, z = has ? gZone(a.price, G) : null, idx = { low: 0, opt: 1, high: 2 }[z];
    const slot = (k, cls) => `<span class="g-slot ${cls}${z === k ? ' on' : ''}"><span class="g-text">${ZONE_FULL[k]}</span><span class="tag tag-g-${k}">${ZONE_FULL[k]}</span></span>`;
    const aria = has ? `Votre prix : ${a.price} €, ${ZONE_FULL[z]} (environ ${pctBelow(a.price, G)} % des annonces similaires sont moins chères). Prix minimum ${G.p1} €, prix maximum ${G.p99} €.` : 'Jauge de prix';
    return `<div class="gauge" data-zone="${z || ''}"><div class="g-content">
        <div class="g-head">${slot('low', 'g-left')}${slot('opt', 'g-center')}${slot('high', 'g-right')}</div>
        <div class="g-track" role="img" aria-label="${aria}">
          ${['low', 'opt', 'high'].map((k) => `<span class="g-seg${z === k ? ' on' : ''}" data-zone="${k}"></span>`).join('')}
          ${has ? `<span class="g-handle" data-zone="${z}" style="--i:${idx};--t:${gaugeT(a.price, z, G).toFixed(3)}"></span>` : ''}</div>
        <div class="g-range"><span>${G.p1} €</span><span>${G.p99} €</span></div></div>
      ${z === 'high' ? `<div class="g-awareness" role="status"><img src="assets/icons/warning.svg" alt="" width="24" height="24"><p>${pctBelow(a.price, G)}% des annonces similaires sont moins chères que la vôtre</p></div>` : ''}
      <p class="reco-line t-body1">Prix recommandé entre <b>${G.p10} €</b> et <b>${G.p90} €</b></p></div>`;
  }
  const SOLD_STATES = ['Très bon état', 'Bon état', 'Très bon état', 'État correct'];
  const draftAd = () => ({ ...ad(), price: S.pd.price });
  function priceSheetBody() {
    const a = ad(), d = draftAd(), R = recoOf(a), K = KINDS[a.kind], G = pctOf(R);
    const mine = new Set(S.ads.flatMap((x) => x.photos));
    let pool = GALLERY.filter((p) => kindOf(p) === a.kind && !mine.has(p)); if (pool.length < 6) pool = pool.concat(a.photos, a.photos);
    const sold = pool.slice(0, 6).map((p, i) => [p, 0, ['3 jours', '5 jours', '2 jours', '6 jours', '4 jours', '8 jours'][i], [...SOLD_STATES, 'Bon état', 'Très bon état'][i]]);
    const recos = [[G.p10, 'Prix attractif'], [G.p50, 'Prix optimal'], [G.p90, 'Prix élevé']];
    return `
      <div class="field tight">
        <div class="input price-input"><input id="pm-price" aria-label="Prix de vente souhaité (obligatoire)" data-in="pmPrice" inputmode="numeric" maxlength="5" autocomplete="off" placeholder="0" value="${S.pd.price ?? ''}"><span class="addon">€</span></div>
        <span class="err" id="pm-err-price">Indiquez un prix</span></div>
      ${a.analysed ? `<div class="reco-head"><h3 class="t-body1h">Recommandation de prix</h3><button class="textlink t-body2" data-a="recoMore" aria-expanded="${!!S.pd.more}" aria-controls="reco-more">En savoir plus</button></div>
        ${S.pd.more ? '<p class="t-body2 dim" id="reco-more" style="margin-top:8px">Ces prix se basent sur les annonces similaires vendues récemment et sur les critères renseignés sur votre annonce.</p>' : ''}
        <div class="recos" style="margin-top:16px">${recos.map(([v, l]) => `<button class="reco" data-a="pickPrice" data-v="${v}" aria-pressed="${S.pd.price === v}"><b class="t-body1h">${eur(v)}</b><span class="t-body2 dim">${l}</span></button>`).join('')}</div>`
        : '<p class="helper">Décrivez votre objet pour obtenir un prix recommandé.</p>'}
      <div class="field" style="margin-top:24px"><label for="pm-min">Prix minimum accepté</label>
        <div class="input-wrap"><input class="input" id="pm-min" data-in="pmMin" inputmode="numeric" maxlength="5" value="${S.pd.min ?? ''}" placeholder="0" aria-describedby="pm-min-h"><span class="suffix">€</span></div>
        <p class="helper" id="pm-min-h">Le prix le plus bas que vous accepteriez en négociation. Il reste privé.</p>
        <span class="err" id="pm-err-min">Le prix minimum doit être inférieur ou égal au prix</span></div>
      ${a.analysed ? `<h3 class="t-subhead" style="margin:24px 0 16px">Articles similaires vendus</h3>
      <div class="soldscroll" role="list">${sold.map(([p, pr, dd, st]) => `<article role="listitem"><div class="ph">${img(p)}</div><p class="t-caption dim" style="margin-top:8px">${st}</p><p class="t-captionh dim">Vendu en ${dd}</p></article>`).join('')}</div>` : ''}`;
  }
  function openReco() {
    const a = ad(); S.pd = { price: a.price, min: a.min };
    openSheet('Prix de vente souhaité', `<div id="pm-body">${priceSheetBody()}</div>`, `<button class="btn main block" data-a="savePrice">Valider</button>`);
  }
  function refreshPriceSheet(full) {
    if (full) { const b = $('#pm-body', layer); if (b) b.innerHTML = priceSheetBody(); return; }
    $$('.reco', layer).forEach((r) => r.setAttribute('aria-pressed', +r.dataset.v === S.pd.price));
  }

  /* ---------- Bottom sheets superposées à la modale Livraison ---------- */
  function openSub(body, footer) {
    let sub = $('#sublayer'); if (!sub) { sub = document.createElement('div'); sub.id = 'sublayer'; $('.phone').appendChild(sub); }
    sub.innerHTML = `<div class="overlay" data-a="closeSub" style="z-index:30"></div><div class="sheet" role="dialog" aria-modal="true" style="z-index:31"><div class="grab"></div><div class="bd sub-bd">${body}</div>${footer ? `<div class="ft">${footer}</div>` : ''}</div>`;
    requestAnimationFrame(() => { $('.overlay', sub)?.classList.add('open'); $('.sheet', sub)?.classList.add('open'); });
  }
  function closeSub() {
    const sub = $('#sublayer'); if (!sub || !sub.innerHTML) return false;
    $('.sheet', sub)?.classList.remove('open'); $('.overlay', sub)?.classList.remove('open'); setTimeout(() => { sub.innerHTML = ''; }, 250); return true;
  }
  function sizeSheet() {
    const v = S.sub.size;
    openSub(`<h2 class="t-headline2" style="margin:16px 0 16px">Choisissez un format</h2>
      <div class="fmt-list" role="radiogroup" aria-label="Format du colis">${SIZES.map((x) => `<button class="fmt" role="radio" aria-checked="${v === x.id}" data-a="subSize" data-v="${x.id}"><span class="fmt-h"><span class="radio"></span><b class="t-body1h">${x.label}</b></span><span class="t-body2">${x.desc}</span></button>`).join('')}</div>
      <div class="fmt-info"><p class="t-body2">Le développé se calcule en additionnant la <b>longueur</b>, la <b>largeur</b> et la <b>hauteur</b> du colis.</p>${ic('box', 'lg')}</div>`,
      `<button class="btn main block" data-a="subSizeOk" ${v ? '' : 'disabled'}>Continuer</button>`);
  }
  function carriersSheet() {
    const c = S.sub.carriers;
    openSub(`<h2 class="t-headline2" style="margin-top:16px">Vos moyens de livraison</h2>
      <p class="t-caption dim" style="margin:4px 0 8px">${S.dd.payer === 'buyer' ? 'Les frais de livraison sont à la charge de l\'acheteur' : 'Les frais de livraison sont à votre charge'}</p>
      <div role="group" aria-label="Transporteurs">${CARRIERS.map((x) => `<button class="carrier" role="checkbox" aria-checked="${!!c[x.id]}" data-a="subCarrier" data-id="${x.id}"><span class="check">${ic('check')}</span>
        <span class="grow"><span class="cr-name t-body1">${x.name} ${LOGOS[x.logo]}</span><span class="cr-tags">${x.tags.map((t) => `<span class="tag support">${t}</span>`).join('')}</span><span class="t-body2 dim">${x.note}</span></span></button>`).join('')}
        <button class="carrier" role="checkbox" aria-checked="${!!c.others}" data-a="subCarrier" data-id="others"><span class="check">${ic('check')}</span><span class="grow"><span class="cr-name t-body1">Autres moyens de livraison</span><span class="t-body2 dim">Vous avancez les frais de livraison</span></span></button></div>`,
      `<button class="btn main block" data-a="subCarriersOk">Valider</button>`);
  }

  function newAdSheet() {
    const used = new Set(S.ads.flatMap((x) => x.photos)), sel = S.na;
    const free = [...GALLERY, ...CAMERA_POOL].filter((p, i, arr) => !used.has(p) && arr.indexOf(p) === i);
    openSheet('Ajouter une annonce', `<p class="t-body2 dim" style="margin-bottom:16px">Sélectionnez les photos de votre nouvel objet.</p>
      <div class="grid">${free.map((p) => { const i = sel.indexOf(p); return `<button class="tile ${i > -1 ? 'sel' : ''}" data-a="naToggle" data-id="${p}" aria-pressed="${i > -1}" aria-label="Photo ${p}">${img(p)}${i > -1 ? `<span class="num">${i + 1}</span>` : '<span class="ring"></span>'}</button>`; }).join('')}</div>`,
      `<button class="btn main block" data-a="naCreate" ${sel.length ? '' : 'disabled'}>${sel.length ? `Créer l'annonce (${sel.length})` : 'Sélectionnez des photos'}</button>`);
  }

  /* ---------- Blurry reveal après génération (référence shadcn « Text Generate Effect ») ----------
     Chaque mot (et chaque champ, image, puce) apparaît flou puis devient net, dans l'ordre de lecture.
     Rythme de la démo « chat » de la référence (600 ms par mot, 40 ms d'écart), compressé pour que la page entière
     se révèle en 4 s quel que soit le nombre de mots. */
  function revealPage() {
    const roots = [$('.adstrip', app), $('.scroll', app)].filter(Boolean); if (!roots.length) return;
    const SKIP = new Set(['TEXTAREA', 'INPUT', 'SCRIPT', 'STYLE', 'svg', 'SVG', 'use']);
    const UNIT = 'input, textarea, img, svg.ic, .spark-chip, .switch, .check, .radio, .g-track, .thumb, .addtile, .tag, .logo';
    const units = [];
    roots.forEach((root) => {
      const walker = document.createTreeWalker(root, NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT, {
        acceptNode(n) {
          if (n.nodeType === 1) {
            if (n.matches(UNIT)) { units.push(n); return NodeFilter.FILTER_REJECT; }
            return SKIP.has(n.tagName) ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_SKIP;
          }
          return n.nodeValue.trim() ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
        },
      });
      const texts = []; let n; while ((n = walker.nextNode())) texts.push(n);
      texts.forEach((t) => {
        const frag = document.createDocumentFragment();
        // l'espace qui suit un mot reste dans son span : dans un conteneur flex, un nœud texte d'espace seul serait supprimé (« Jevends »)
        let prev = null;
        t.nodeValue.split(/(\s+)/).forEach((part) => {
          if (!part) return;
          if (/^\s+$/.test(part)) { if (prev) prev.textContent += part; else frag.appendChild(document.createTextNode(part)); return; }
          const sp = document.createElement('span'); sp.className = 'tg'; sp.textContent = part; frag.appendChild(sp); units.push(sp); prev = sp;
        });
        t.parentNode.replaceChild(frag, t);
      });
    });
    // ordre de lecture (document order)
    units.sort((a, b) => (a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1));
    // même cadence partout (calée sur la page mono-dépôt, ~130 éléments en 4 s) ; jamais plus de 4 s au total
    const stagger = Math.min(27, (4000 - 600) / Math.max(units.length - 1, 1));
    units.forEach((u, i) => { u.classList.add('tg'); u.style.animationDelay = `${Math.round(i * stagger)}ms`; });
  }

  /* ---------- Feuilles spécifiques ---------- */
  function typeSheet() {
    openSheet('Type de dépôt', `<div role="radiogroup">
      <button class="opt" role="radio" aria-checked="true" data-a="closeSheet"><span class="radio"></span><span class="grow"><b class="t-body1h">Bien du quotidien</b><br><span class="t-body2 dim">Objets, mode, high-tech, maison...</span></span></button>
      <button class="opt" role="radio" aria-checked="false" data-a="otherType" data-t="Immobilier"><span class="radio"></span><span class="grow"><b class="t-body1h">Immobilier</b><br><span class="t-body2 dim">Vente ou location d'un bien</span></span></button>
      <button class="opt" role="radio" aria-checked="false" data-a="otherType" data-t="Auto"><span class="radio"></span><span class="grow"><b class="t-body1h">Auto</b><br><span class="t-body2 dim">Voiture, moto, utilitaire</span></span></button></div>`);
  }
  function photoPicker(adId) {
    const used = new Set(S.ads.flatMap((a) => a.photos));
    const free = [...GALLERY, ...CAMERA_POOL].filter((p, i, arr) => !used.has(p) && arr.indexOf(p) === i);
    openSheet('Ajouter une photo', `<div class="grid">${free.slice(0, 18).map((p) => `<button class="tile" data-a="pickPhoto" data-ad="${adId}" data-id="${p}" aria-label="Ajouter la photo ${p}">${img(p)}</button>`).join('')}</div>`);
  }
  function paramSheet(a, p) {
    openSheet(p.label, `<div role="radiogroup">${p.options.map((o) => `<button class="opt" role="radio" aria-checked="${p.value === o}" data-a="setParam" data-id="${a.id}" data-key="${p.key}" data-v="${esc(o)}"><span class="radio"></span><span class="grow t-body1">${esc(o)}</span></button>`).join('')}</div>`,
      p.value ? `<button class="btn tinted block" data-a="clearParam" data-id="${a.id}" data-key="${p.key}">Effacer la valeur</button>` : '');
  }
  function similarSheet() {
    const a = ad(), K = KINDS[a.kind], base = a.price;
    const rows = [[a.photos[0], K.name, base + 3, 'Vendu en 3 jours'], [a.photos[1] || a.photos[0], K.name, base - 2, 'Vendu en 5 jours'], [a.photos[0], K.name, base, 'Vendu en 2 jours']];
    openSheet('Vendus à un prix similaire', `<p class="t-body2 dim" style="margin-bottom:16px">Des annonces proches de la vôtre, vendues récemment.</p>${rows.map(([p, n, pr, t]) => `<div class="card" style="display:flex;gap:16px;align-items:center;margin-bottom:8px"><span class="thumb" style="width:56px;height:56px">${img(p)}</span><span style="flex:1"><b class="t-body1h">${n}</b><br><span class="t-body2 dim">${t}</span></span><b class="t-body1h">${eur(pr)}</b></div>`).join('')}`);
  }
  function pointsSheet() {
    openSheet('Points d\'envoi proches', `<div class="map"><svg viewBox="0 0 100 60" preserveAspectRatio="none" aria-hidden="true"><path d="M0 22 L100 30 M20 0 L34 60 M64 0 L56 60 M0 48 L100 42" stroke="#C2E0FA" stroke-width="2.500" fill="none"/><rect x="42" y="8" width="14" height="10" fill="#E0F2E9"/></svg>
      <span class="pin home" style="left:46%;top:60%">${ic('pin', 'lg fill')}</span>${POINTS.map((p) => `<span class="pin" style="left:${p.x}%;top:${p.y}%">${ic('pin', 'lg fill')}</span>`).join('')}</div>
      <p class="t-caption dim" style="margin:8px 0 16px">Votre adresse (bleu) et les points d'envoi disponibles (orange).</p>
      ${POINTS.map((p) => `<div class="opt" style="cursor:default"><span class="grow"><b class="t-body1h">${p.name}</b><br><span class="t-body2 dim">Mondial Relay · ${p.dist}</span></span><span class="tag success">Ouvert</span></div>`).join('')}`);
  }
  function promoSheet() {
    openSheet('Options de mise en avant', `<div role="radiogroup"><button class="opt" role="radio" aria-checked="${!S.promo}" data-a="setPromo" data-id=""><span class="radio"></span><span class="grow"><b class="t-body1h">Aucune mise en avant</b></span></button>
      ${PROMOS.map((p) => `<button class="opt" role="radio" aria-checked="${S.promo === p.id}" data-a="setPromo" data-id="${p.id}"><span class="radio"></span><span class="grow"><b class="t-body1h">${p.name}</b>${p.best ? ' <span class="tag accent">Recommandé</span>' : ''}<br><span class="t-body2 dim">${p.note}</span></span><b class="t-body1h">${eur(p.price)}</b></button>`).join('')}</div>`,
      `<button class="btn main block" data-a="closeSheet">Valider</button>`);
  }

  /* ---------- Actions ---------- */
  const find = (id) => S.ads.find((a) => a.id === id);
  function refreshParams(a) { const el = $('#params'); if (el) el.innerHTML = paramRows(a); }
  const actions = {
    noop() { toast('Hors périmètre du prototype'); },
    rate(t) { S.rating = +t.dataset.v; const keep = $('.scroll', app)?.scrollTop || 0; render(); toast('Merci pour votre avis !', 'success'); },
    newDeposit() { clearTimeout(voiceTimer); const ai = S.aiToggle; S = fresh(); S.aiToggle = ai; closeSheet(true); go('gallery'); },
    reset() { clearTimeout(voiceTimer); S = fresh(); closeSheet(true); render(); },
    publish() { go('gallery'); },
    close() { go('home'); },
    back() {
      const prev = { gallery: 'home', camera: 'gallery', detect: 'gallery', form: 'gallery' }[S.screen];
      if (S.screen === 'form' && multi() && S.active !== null) { S.active = null; render(); return; }
      go(prev || 'home');
    },
    typeSheet, closeSheet,
    otherType(t) { closeSheet(true); toast(`Le dépôt ${t.dataset.t} est hors périmètre du prototype`); },
    vertical(t) {
      const v = VERTICALS.find((x) => x.id === t.dataset.v);
      if (v.id !== 'bdc') { toast(`Le dépôt ${v.label} est hors périmètre du prototype`); return; }
      S.vertical = v.id; render();
    },
    camera() { go('camera'); },
    shoot() {
      const id = CAMERA_POOL.find((p) => !S.selected.includes(p)); $('#flash').classList.remove('go'); void $('#flash').offsetWidth; $('#flash').classList.add('go');
      if (id) { S.selected.push(id); render(); } else toast('Plus de photos de démonstration');
    },
    toggle(t) { const id = t.dataset.id, i = S.selected.indexOf(id); if (i > -1) S.selected.splice(i, 1); else S.selected.push(id); S.mode = null; render(); },
    chooseCount() { actions.startUpload(); },
    startUpload() {
      closeSheet(true);
      // Détection automatique : plusieurs types d'objets sur les photos = plusieurs annonces
      S.mode = new Set(S.selected.map(kindOf)).size > 1 ? 'multi' : 'single';
      const groups = {};
      S.selected.forEach((p) => { (groups[S.mode === 'multi' ? kindOf(p) : 'one'] ||= []).push(p); });
      S.ads = Object.entries(groups).map(([k, photos]) => (newAd(k === 'one' ? kindOf(photos[0]) : k, photos)));
      S.active = S.mode === 'multi' ? null : 0;
      go('form');
    },
    rmPhoto(t) {
      const a = find(t.dataset.ad); a.photos = a.photos.filter((p) => p !== t.dataset.id);
      if (!a.photos.length) { S.ads = S.ads.filter((x) => x !== a); if (!S.ads.length) { toast('Aucune photo, retour à la galerie'); S.selected = []; go('gallery'); return; } S.active = null; }
      S.selected = S.ads.flatMap((x) => x.photos); render();
    },
    addPhoto(t) { photoPicker(t.dataset.ad); },
    pickPhoto(t) { find(t.dataset.ad).photos.push(t.dataset.id); S.selected = S.ads.flatMap((x) => x.photos); closeSheet(true); render(); },
    toForm() { S.active = null; go('form'); },
    newAd() { S.na = []; newAdSheet(); },
    naToggle(t) {
      const id = t.dataset.id, i = S.na.indexOf(id); if (i > -1) S.na.splice(i, 1); else S.na.push(id);
      $$('.sheet [data-a="naToggle"]', layer).forEach((b) => { const k = S.na.indexOf(b.dataset.id); b.classList.toggle('sel', k > -1); b.setAttribute('aria-pressed', k > -1);
        b.innerHTML = img(b.dataset.id) + (k > -1 ? `<span class="num">${k + 1}</span>` : '<span class="ring"></span>'); });
      const btn = $('.sheet [data-a="naCreate"]', layer); btn.disabled = !S.na.length; btn.textContent = S.na.length ? `Créer l'annonce (${S.na.length})` : 'Sélectionnez des photos';
    },
    naCreate() {
      if (!S.na.length) return;
      const nad = newAd(kindOf(S.na[0]), [...S.na]); S.ads.push(nad); S.mode = 'multi'; S.magicShown = true;
      S.selected = S.ads.flatMap((x) => x.photos); S.active = S.ads.length - 1; closeSheet(true); render();
      nad.magicShown = true; openMagic(); toast('Annonce ajoutée', 'success');
    },
    openAd(t) { S.active = t.dataset.i === 'all' ? null : +t.dataset.i; render(); },
    openMagic() { openMagic(); },
    generate() {
      const all = multi() && S.active === null, targets = all ? S.ads : [ad()];
      stopVoice(); closeSheet(true);
      if (all) targets.forEach((a) => { a.text = S.allText; });
      S.analysing = true; render();
      runLoadingFx();
      setTimeout(() => { targets.forEach((a) => generate(a, a.text)); S.analysing = false; render(); revealPage(); }, 2600);
    },
    mic() { S.voice ? stopVoice(true) : startVoice(); },
    editParam(t) { const a = find(t.dataset.id); paramSheet(a, a.params.find((p) => p.key === t.dataset.key)); },
    setParam(t) { const a = find(t.dataset.id), p = a.params.find((x) => x.key === t.dataset.key); p.value = t.dataset.v; p.source = 'user'; closeSheet(true); refreshParams(a); },
    clearParam(t) { const a = find(t.dataset.id), p = a.params.find((x) => x.key === t.dataset.key); p.value = null; p.source = 'empty'; closeSheet(true); refreshParams(a); },
    openReco() { openReco(); },
    openDelivery() { openDelivery(); },
    dAddr(t) { const x = S.dd.addrs.find((y) => y.id === t.dataset.id); x.sel = !x.sel; S.dd.errAddr = false; refreshDelivery(); },
    dAddAddr() {
      const v = ($('#newAddr').value || '').trim(); if (!v) { $('#newAddr').focus(); return; }
      S.dd.addrs.push({ id: 'n' + (++uid), text: v, sel: true }); S.dd.newAddr = ''; S.dd.errAddr = false; refreshDelivery();
    },
    dHand() { S.dd.hand = !S.dd.hand; S.dd.errNone = false; refreshDelivery(); },
    dShip() { S.dd.ship = !S.dd.ship; S.dd.errMean = false; S.dd.errNone = false; refreshDelivery(); },
    dSizeSheet() { S.sub = { size: S.dd.size }; sizeSheet(); },
    subSize(t) { S.sub.size = t.dataset.v; $$('#sublayer [data-a="subSize"]').forEach((b) => b.setAttribute('aria-checked', b === t)); $('#sublayer [data-a="subSizeOk"]').disabled = false; },
    subSizeOk() { S.dd.size = S.sub.size; closeSub(); refreshDelivery(); },
    dCarriersSheet() { S.sub = { carriers: { ...S.dd.carriers } }; carriersSheet(); },
    subCarrier(t) { const c = S.sub.carriers; c[t.dataset.id] = !c[t.dataset.id]; t.setAttribute('aria-checked', c[t.dataset.id]); },
    subCarriersOk() { S.dd.carriers = S.sub.carriers; S.dd.errMean = false; closeSub(); refreshDelivery(); },
    closeSub() { closeSub(); },
    dPayer(t) { S.dd.payer = t.dataset.v; refreshDelivery(); },
    dDelay(t) { S.dd.delay = +t.dataset.v; refreshDelivery(); },
    saveDelivery() {
      const d = S.dd; d.errAddr = !d.addrs.some((x) => x.sel); d.errMean = d.ship && !Object.values(d.carriers).some(Boolean); d.errNone = !d.ship && !d.hand;
      if (d.errAddr || d.errMean || d.errNone) { refreshDelivery(); $$('.fullmodal .err').find((e) => e.style.display === 'block')?.scrollIntoView({ block: 'center', behavior: 'smooth' }); return; }
      delete d.newAddr; delete d.errAddr; delete d.errMean; delete d.errNone; S.delivery = d; closeSheet(true); render();
    },
    pickPrice(t) {
      S.pd.price = +t.dataset.v; const inp = $('#pm-price'); if (inp) inp.value = S.pd.price; $('#pm-err-price').style.display = 'none'; refreshPriceSheet();
    },
    give(t) { const a = ad(); a.give = t.dataset.v === '1'; $('#price')?.closest('.field')?.classList.remove('invalid'); render(); },
    recoMore() { S.pd.more = !S.pd.more; refreshPriceSheet(true); },
    savePrice() {
      const d = S.pd, a = ad(); let bad = false;
      if (!d.price) { $('#pm-err-price').style.display = 'block'; bad = true; }
      if (d.min && d.price && d.min > d.price) { $('#pm-err-min').style.display = 'block'; bad = true; }
      if (bad) return;
      a.price = d.price; a.min = d.min || null; closeSheet(true); render();
    },
    promo(t) { S.promo = S.promo === t.dataset.id ? null : t.dataset.id; t.setAttribute('aria-checked', S.promo === t.dataset.id); },
    promoSheet() { promoSheet(); },
    setPromo(t) { S.promo = t.dataset.id || null; $$('[data-a="setPromo"]').forEach((b) => b.setAttribute('aria-checked', b === t)); render(); },
    saveAd() { const a = ad(), m = problems(a); if (m.length) return fail(a, m); a.ready = true; S.active = null; render(); toast('Annonce enregistrée', 'success'); },
    validate() {
      const list = multi() ? S.ads : [ad()];
      for (const a of list) { const m = problems(a); if (m.length) { if (multi() && S.ads.indexOf(a) !== S.active) { S.active = S.ads.indexOf(a); render(); } return fail(a, m); } }
      S.published = list.length; S.ads = list; go('done');
    },
    aiToggle(t) { S.aiToggle = !S.aiToggle; t.setAttribute('aria-checked', S.aiToggle); toast(S.aiToggle ? 'IA générative activée pour vos prochains dépôts' : 'IA générative désactivée pour vos prochains dépôts', 'success'); },
  };
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];

  function fail(a, m) {
    toast(`${m.length} champ${m.length > 1 ? 's' : ''} obligatoire${m.length > 1 ? 's' : ''} à renseigner`, 'error');
    ['title', 'desc', 'price'].forEach((k) => { if (m.includes(k)) $('#' + k)?.closest('.field')?.classList.add('invalid'); });
    m.filter((x) => x.startsWith('p:')).forEach((x) => $(`#p-${a.id}-${x.slice(2)}`)?.classList.add('invalid'));
    $$('.field.invalid, .row.invalid')[0]?.scrollIntoView({ block: 'center', behavior: 'smooth' });
  }

  /* ---------- Dictée vocale simulée ---------- */
  const VOICE = 'Je vends car elles sont devenues trop petites. Je les ai achetées il y a deux ans, elles sont en très bon état, et je les vends avec la boîte d\'origine.'.split(' ');
  // Rythme inspiré de shadcn « Writing Text » : délai = 30 ms par caractère et espace, + pause après , ; : (x5) et . ! ? (x10)
  const SPEED = 30;
  const wordDelay = (w) => (w.length + 1) * SPEED + (/[.!?]$/.test(w) ? 10 * SPEED : /[,;:–-]$/.test(w) ? 5 * SPEED : 0) + 120;
  function startVoice() {
    S.voice = true; updateVoiceUi(); const id = S.active === null ? 'allText' : 'magic';
    const ta = $('#' + id), live = $('#magicLive'); let i = 0; const base = ta.value ? ta.value + ' ' : '';
    if (live) { live.textContent = base; live.classList.add('on'); ta.classList.add('ghost'); }
    const step = () => {
      if (!S.voice) return;
      const w = VOICE[i++];
      ta.value = base + VOICE.slice(0, i).join(' '); ta.dispatchEvent(new Event('input', { bubbles: true }));
      if (live) {
        if (i > 1) live.appendChild(document.createTextNode(' '));
        const span = document.createElement('span'); span.className = 'ww'; span.textContent = w; live.appendChild(span);
        live.scrollTop = live.scrollHeight;
      }
      if (i >= VOICE.length) { voiceTimer = setTimeout(stopVoice, 800); return; }
      voiceTimer = setTimeout(step, wordDelay(w));
    };
    voiceTimer = setTimeout(step, 200);
  }
  function stopVoice() {
    clearTimeout(voiceTimer); clearInterval(voiceTimer); if (!S.voice) return; S.voice = false; updateVoiceUi();
    const live = $('#magicLive'); if (live) { live.classList.remove('on'); live.textContent = ''; }
    $$('.magic textarea.ghost').forEach((t) => { t.classList.remove('ghost'); t.scrollTop = t.scrollHeight; });
  }
  function updateVoiceUi() {
    const v = $('.voice'), mb = $('#micBtn'); if (!v || !mb) return;
    v.classList.toggle('rec', S.voice);
    mb.className = `ibtn mic ${S.voice ? 'recording' : 'tinted'}`; mb.setAttribute('aria-pressed', S.voice);
    mb.setAttribute('aria-label', S.voice ? 'Arrêter la dictée' : 'Dicter à la voix');
    mb.innerHTML = ic(S.voice ? 'stop' : 'mic');
  }

  /* ---------- Événements ---------- */
  document.addEventListener('click', (e) => {
    const t = e.target.closest('[data-a]'); if (!t) return;
    const fn = actions[t.dataset.a]; if (fn) fn(t, e);
  });
  document.addEventListener('input', (e) => {
    const k = e.target.dataset.in; if (!k) return; const v = e.target.value;
    if (k === 'allText') S.allText = v; else if (k === 'magic') ad().text = v;
    else if (k === 'title') ad().title = v; else if (k === 'desc') ad().desc = v;
    else if (k === 'newAddr') { S.dd.newAddr = v; return; }
    if (k === 'pmPrice') { const n = v.replace(/\D/g, '').slice(0, 5); if (n !== v) e.target.value = n; S.pd.price = +n || null; $('#pm-err-price').style.display = 'none'; refreshPriceSheet(); return; }
    if (k === 'pmMin') { const n = v.replace(/\D/g, '').slice(0, 5); if (n !== v) e.target.value = n; S.pd.min = +n || null; $('#pm-err-min').style.display = 'none'; return; }
    e.target.closest('.field')?.classList.remove('invalid');
  });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && !closeSub()) closeSheet(); });

  /* ---------- Guide latéral ---------- */
  const STEPS = [
    ['home', 'Accueil et tab bar'], ['gallery', 'Galerie photo'], ['form1', 'One form : une annonce'], ['formN', 'One form : plusieurs annonces'], ['done', 'Confirmation'], ['doneN', 'Confirmation : plusieurs annonces'],
  ];
  function renderGuide() {
    const cur = S.screen === 'done' ? (S.published > 1 ? 'doneN' : 'done') : S.screen === 'form' ? (multi() ? 'formN' : 'form1') : S.screen === 'camera' || S.screen === 'upload' ? 'gallery' : S.screen;
    $('#guide').innerHTML = STEPS.map(([k, l], i) => `<li><button data-jump="${k}" ${k === cur ? 'aria-current="step"' : ''}><span class="n">${i + 1}</span>${l}</button></li>`).join('');
  }
  function jump(k) {
    closeSheet(true); clearTimeout(voiceTimer); const keepAi = S.aiToggle; S = fresh(); S.aiToggle = keepAi;
    const single = ['sneaker-1', 'sneaker-2', 'sneaker-3'], multiSel = ['sneaker-1', 'sneaker-2', 'phone-1', 'phone-2', 'buds-1'];
    const mk = (sel, mode) => { S.selected = sel; S.mode = mode; const g = {}; sel.forEach((p) => { (g[mode === 'multi' ? kindOf(p) : 'one'] ||= []).push(p); });
      S.ads = Object.entries(g).map(([kk, photos]) => (newAd(kk === 'one' ? kindOf(photos[0]) : kk, photos))); };
    if (k === 'home') S.screen = 'home';
    else if (k === 'gallery') S.screen = 'gallery';
    else if (k === 'form1') { mk(single, 'single'); S.active = 0; S.screen = 'form'; }
    else if (k === 'formN') { mk(multiSel, 'multi'); S.active = null; S.screen = 'form'; }
    else if (k === 'doneN') { mk(['sneaker-1', 'sneaker-2', 'phone-1', 'phone-2', 'buds-1'], 'multi'); S.ads.forEach((a) => generate(a, 'Très bon état, avec la boîte.')); S.published = S.ads.length; S.screen = 'done'; }
    else if (k === 'done') { mk(single, 'single'); S.active = 0; generate(S.ads[0], 'Je vends car trop petites, achetées il y a 2 ans, très bon état, avec la boîte.'); S.ads[0].params.find((p) => p.key === 'pointure').value = '42'; S.published = 1; S.screen = 'done'; }
    render();
  }
  document.addEventListener('click', (e) => { const b = e.target.closest('[data-jump]'); if (b) jump(b.dataset.jump); });

  /* ---------- Démarrage ---------- */
  const q = new URLSearchParams(location.search).get('step');
  if (q) jump(q); else render();
})();
