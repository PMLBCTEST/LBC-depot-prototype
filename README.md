# Prototype dépôt d'annonce BDC - v45

Prototype HTML interactif du nouveau parcours de dépôt (User Flow Miro, nominal uniquement).
Tout tient dans `index.html` (images intégrées) ; le dossier `assets/` sert de secours.

## Lancer
Option rapide : double-cliquer sur `index.html` (s'ouvre dans le navigateur).

Option recommandée (serveur local, comportement identique au partage) :

    cd LBC-depot-prototype
    python3 -m http.server 5173

puis ouvrir http://localhost:5173 (aucune dépendance, Python 3 préinstallé sur macOS).

Un panneau « Parcours de test » à gauche de la maquette permet de sauter à chaque étape
(ou `?step=home|gallery|form1|formN|done|doneN`). « Recommencer » remet à zéro.

## Parcours couvert
1. Accueil, clic sur « Publier » dans la tab bar
2. Galerie photo : appareil photo (simulé), encart multi-annonces, lien « Changer de type de dépôt » (bottom sheet Immobilier / Auto, hors périmètre)
3. Bottom sheet « Un ou plusieurs objets ? », puis envoi des photos
4. Détection des objets (plusieurs objets) : groupes de photos, ajout / suppression
5. One form : champ magique (clavier ou dictée simulée) + 4 puces guides qui passent de défaut à checked
6. Génération simulée : titre, description, ad-params pré-remplis vs essentiels vs optionnels (tous modifiables)
7. Prix suggéré + annonces vendues similaires, prix minimum de négo
8. Livraison : adresse par défaut ou manuelle, carnet d'adresses (en développement), transporteurs + prix, livraison à charge du vendeur, map des points d'envoi, remise en main propre désactivable
9. Mise en avant payante (option recommandée + bottom sheet des autres options)
10. Validation (bloquée si un champ essentiel manque, avec Toast d'erreur) puis confirmation avec toggle IA générative

En multi-annonces : champ magique commun (vue « Toutes ») ou annonce par annonce (onglets en haut).
La livraison et la mise en avant sont partagées entre les annonces dans ce prototype.

## Design System
Spark Foundation leboncoin, thème **Part**, mode **Light**, tokens stables uniquement (source : skill leboncoin-design-system).
- Tokens en tête du `<style>` de `index.html` : palette Part, rôles sémantiques (Main, Support, Accent, Success, Alert, Error, Info, Neutral, Surface, Outline, Overlay), espacements 4/8/16/24/32/40/48 (pas de 12 px), rayons (Button full, Chip et Input xl, Tag sm, Card lg), bordures, ombres, durées et easings.
- Typographie Nunito Sans (Google Fonts, repli système hors ligne), styles Headline / Subhead / Body / Caption.
- Composants : Button (main, outlined, tinted, ghost), Icon Button, Chip, Tag, Card, Input / Textarea / Form Field, Switch, Radio, Checkbox, Bottom Sheet, Toast, Tabbar 5 items, Sticky Bottom, Progress, Spinner, Skeleton.
- Les tokens 🆕 (AI, Focus, Surface Dark) ne sont pas utilisés : le « pré-rempli » utilise Support Container.

## Points à valider avec l'équipe UI
- Icônes : jeu provisoire inline, à remplacer par LBC Iconography.
- Hauteur des boutons (48 px) et contrôles de sélection en intent Support : non documentés dans la foundation.
- Texte secondaire : alias Nightshade 600 pour garantir le contraste AA.
- Photos : photos JPG de démonstration (laptop, minuterie, Noël, panini, robot, Switch).
