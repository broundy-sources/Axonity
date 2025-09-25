# 🔧 GUIDE D'IMPLÉMENTATION - CHARTE GRAPHIQUE AXONITY

## 📋 Variables CSS intégrées

Toutes les variables de la charte graphique sont maintenant disponibles dans `Axonity.CSS` :

### 🎨 Variables de couleurs
```css
/* Couleurs principales */
--primary-blue: #2563EB
--tech-orange: #F59E0B
--deep-navy: #1E293B

/* Couleurs secondaires */
--light-gray: #F8FAFC
--medium-gray: #64748B
--success-green: #10B981
--warning-red: #EF4444

/* Dégradés */
--gradient-primary: linear-gradient(135deg, #2563EB 0%, #F59E0B 100%)
--gradient-subtle: linear-gradient(135deg, #F8FAFC 0%, #E2E8F0 100%)
```

### ✍️ Variables de typographie
```css
--font-heading: 'Montserrat', sans-serif
--font-body: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif
```

### 📐 Variables d'espacement
```css
--spacing-xs: 0.25rem (4px)
--spacing-sm: 0.5rem (8px)
--spacing-md: 1rem (16px)
--spacing-lg: 1.5rem (24px)
--spacing-xl: 2rem (32px)
--spacing-2xl: 3rem (48px)
--spacing-3xl: 4rem (64px)
```

---

## 🎯 Classes utilitaires créées

### Boutons modernisés
- `.btn-primary` : Bouton avec gradient Axonity
- `.btn-secondary` : Bouton outline bleu

### Typographie
- Police par défaut : Inter pour le corps de texte
- Titres : Montserrat avec poids appropriés

---

## 🚀 Éléments mis à jour

### ✅ Déjà appliqué
- [x] Variables CSS complètes
- [x] Palette de couleurs Axonity
- [x] Typographie moderne (Montserrat + Inter)
- [x] Boutons avec nouveau design
- [x] Logo mis à jour vers "Logo.png"

### 🔄 Prochaines étapes recommandées

#### 1. **Cartes et conteneurs**
```css
.card {
    border-radius: var(--radius-md);
    box-shadow: 0 4px 6px rgba(30, 41, 59, 0.1);
    padding: var(--spacing-xl);
    background: var(--white);
}
```

#### 2. **Navigation header**
```css
.header {
    background: var(--white);
    border-bottom: 1px solid var(--border-color);
    box-shadow: 0 2px 8px rgba(30, 41, 59, 0.08);
}
```

#### 3. **Sections avec dégradé subtil**
```css
.hero-section {
    background: var(--gradient-subtle);
}
```

---

## 🎨 Classes d'aide disponibles

### Couleurs de texte
```css
.text-primary { color: var(--primary-blue); }
.text-secondary { color: var(--tech-orange); }
.text-muted { color: var(--medium-gray); }
```

### Arrière-plans
```css
.bg-gradient { background: var(--gradient-primary); }
.bg-light { background: var(--light-gray); }
.bg-white { background: var(--white); }
```

---

## 📱 Responsive Design

La charte graphique est optimisée pour tous les appareils :

### Breakpoints
- **Mobile** : < 768px
- **Tablet** : 768px - 1024px  
- **Desktop** : > 1024px

### Tailles adaptatives
```css
/* Exemple pour les titres */
@media (max-width: 768px) {
    h1 { font-size: 2rem; }
    h2 { font-size: 1.75rem; }
}
```

---

## ⚡ Performance

### Optimisations appliquées
- **Fonts** : Préchargement Google Fonts
- **Variables CSS** : Réutilisation efficace
- **Transitions** : Durées optimisées (0.3s max)

### Import des polices optimisé
```html
<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
```

---

## 🔍 Vérifications qualité

### ✅ Checklist d'implémentation
- [x] Toutes les variables CSS définies
- [x] Polices correctement importées
- [x] Boutons avec nouveau design
- [x] Logo mis à jour
- [x] Compatibilité responsive
- [ ] Test sur différents navigateurs
- [ ] Validation du contraste d'accessibilité

### 🎯 Tests recommandés
1. **Visuel** : Vérifier la cohérence sur toutes les pages
2. **Performance** : Mesurer les temps de chargement
3. **Accessibilité** : Contraste et lisibilité
4. **Responsive** : Test sur mobile/tablet/desktop

---

## 📞 Support

Pour toute question sur l'implémentation de cette charte graphique :
- Consulter le fichier `CHARTE-GRAPHIQUE-AXONITY.md`
- Vérifier les variables CSS dans `Axonity.CSS`
- Tester les modifications sur une copie locale

---

**📅 Dernière mise à jour** : Septembre 2025  
**🎯 Version** : 1.0  
**🏢 Projet** : Axonity Website