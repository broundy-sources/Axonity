# Instructions pour les Agents IA - Novasite

## Vue d'ensemble du projet

**Novasite** est un site vitrine statique en français pour une agence de développement web. Le projet utilise une architecture HTML/CSS/JS pure sans framework, optimisé pour la simplicité et les performances.

### Architecture des fichiers

- **Novasite.html** : Page principale (259 lignes) avec toutes les sections
- **Accueil.html** : Page d'accueil séparée (52 lignes)  
- **Tarifs.html** : Page de tarification (95 lignes)
- **Novasite.CSS** : Feuille de style principale (1115 lignes) avec système de variables CSS
- **Novasite.js** : Script principal (156 lignes) pour interactions et animations
- **Images** : Assets PNG/JPG dans le répertoire racine (logos, mockups, portfolio)

## Patterns et conventions spécifiques

###  Système de couleurs (CSS Variables)
`css
:root {
    --primary-color: #000000;     /* Noir pour texte principal */
    --secondary-color: #FF3C28;   /* Rouge vif pour accents */
    --bg-light: #F2ECEB;          /* Fond beige clair */
    --hover-color: #FF6B57;       /* Rouge clair pour survols */
}
`

###  Breakpoints responsives
- 900px : Ajustements header/navigation
- 992px : Layout tablette
- 768px : Mobile (breakpoint principal)

###  Structure des composants CSS
1. **Reset de base** avec ox-sizing: border-box
2. **Typography** : Police principale Montserrat + Open Sans
3. **Système de boutons** : .btn, .btn-primary, .btn-secondary, .btn-contact
4. **Header/Navigation** : Menu dropdown avec .dropdown-menu
5. **Sections** : Structure modulaire avec classes .fade-in pour animations

###  JavaScript patterns
- **Vanilla JS moderne** avec ddEventListener et querySelector
- **DOMContentLoaded** : Point d'entrée principal
- **Intersection Observer** : Animations au scroll (.fade-in)
- **Navigation mobile** : Toggle menu avec .menu-toggle
- **Dropdowns** : Gestion click avec preventDefault()

###  Gestion des assets
- **Logo** : Novasitelogo.png (149KB)
- **Images portfolio** : PNG haute résolution (119KB-2.7MB)
- **Chemins relatifs** : Toutes les ressources dans le répertoire racine

## Workflows de développement

### Édition locale
`powershell
# Ouvrir dans navigateur
start Novasite.html

# Édition avec Visual Studio Code
code .
`

### Structure de navigation
- **Liens internes** : Anchors #services, #portfolio, #contact
- **Pages séparées** : Navigation entre Accueil.html, Tarifs.html
- **Cohérence** : Même header/CSS sur toutes les pages

###  Patterns à respecter

#### Ajout de nouvelles sections
1. **HTML** : Utiliser <section id="nom-section" class="fade-in">
2. **CSS** : Suivre la convention BEM informelle (.section-nom)
3. **JS** : Ajouter automatiquement l'animation fade-in via Observer

#### Modification des couleurs
- **Toujours utiliser** les variables CSS du :root
- **Rouge principal** : ar(--secondary-color) pour les CTA
- **Texte** : ar(--primary-color) (noir) pour la lisibilité

#### Responsive design
- **Mobile-first** : Styles de base pour mobile
- **Progressive enhancement** : Media queries pour écrans plus larges
- **Navigation mobile** : Toggle menu obligatoire sous 768px

###  Éviter
- Frameworks CSS/JS externes (projet volontairement vanilla)
- Modification du système de variables couleurs établi
- Images non-optimisées (respecter les tailles actuelles)
- JavaScript complexe (garder la simplicité)

###  Tests locaux
- **Responsive** : Tester sur Chrome DevTools (320px à 1920px)
- **Navigation** : Vérifier tous les liens internes/externes
- **Images** : S'assurer que toutes les images se chargent
- **Animations** : Tester le scroll et les fade-in

## Points d'intégration

- **Formulaires** : Actuellement statiques, prévoir intégration backend
- **Performance** : Images non-optimisées, potentiel d'amélioration WebP
- **SEO** : Meta descriptions et structure sémantique à améliorer
