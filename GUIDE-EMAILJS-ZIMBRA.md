# 📧 Guide Configuration EmailJS avec Zimbra

## 🎯 Objectif
Configurer EmailJS pour envoyer automatiquement :
1. **Email principal** → vers `contact@axonity.fr` (votre Zimbra)
2. **Email de confirmation** → vers le visiteur (auto-réponse)

## 🔧 Étapes de Configuration

### 1. Créer un compte EmailJS
1. Allez sur [https://www.emailjs.com/](https://www.emailjs.com/)
2. Créez un compte gratuit
3. Confirmez votre email

### 2. Ajouter votre service email
1. Dans le dashboard EmailJS → **Email Services** → **Add New Service**
2. Choisissez **Gmail** ou **Outlook** (selon votre préférence)
3. Connectez votre compte `contact@axonity.fr`

### 3. Créer les templates d'email

#### Template 1 : Email principal (vers vous)
```
Template ID: contact_form_main
Nom: Contact Form - Main

Sujet: Nouveau contact - {{subject}}

Corps:
Bonjour Axonity,

Vous avez reçu un nouveau message depuis votre site web :

👤 Nom : {{from_name}}
📧 Email : {{from_email}}
📋 Sujet : {{subject}}

💬 Message :
{{message}}

---
Email automatique depuis axonity.fr
```

#### Template 2 : Email de confirmation (vers le visiteur)
```
Template ID: contact_form_confirmation
Nom: Contact Form - Confirmation

Sujet: Confirmation de réception - {{original_subject}}

Corps:
Bonjour {{to_name}},

Merci pour votre message ! 

✅ Nous avons bien reçu votre demande concernant : "{{original_subject}}"

📋 Récapitulatif de votre message :
{{original_message}}

⏰ Notre équipe vous répondra sous 24h maximum à l'adresse : {{to_email}}

En attendant, n'hésitez pas à consulter notre site pour découvrir nos réalisations !

Cordialement,
L'équipe Axonity
contact@axonity.fr
06 65 22 45 18

---
Cet email est envoyé automatiquement depuis axonity.fr
```

### 4. Récupérer les identifiants
1. **Service ID** : Dans Email Services → cliquez sur votre service
2. **Template IDs** : Dans Email Templates → copiez les IDs
3. **Public Key** : Dans Account → cliquez sur "API Keys"

### 5. Mettre à jour le code JavaScript
Remplacez dans `Axonity.js` :
```javascript
emailjs.init("VOTRE_CLE_PUBLIQUE_EMAILJS");
// Par votre vraie clé publique

emailjs.send('VOTRE_SERVICE_ID', 'VOTRE_TEMPLATE_ID', ...)
// Par vos vrais IDs de service et template

emailjs.send('VOTRE_SERVICE_ID', 'VOTRE_TEMPLATE_CONFIRMATION_ID', ...)
// Par vos vrais IDs pour la confirmation
```

## 🧪 Test de Configuration

### Test 1 : Formulaire complet
1. Remplissez le formulaire de contact sur votre site
2. Vérifiez que vous recevez l'email sur `contact@axonity.fr`
3. Vérifiez que le visiteur reçoit l'email de confirmation

### Test 2 : Validation des champs
1. Testez avec un email invalide → doit afficher une erreur
2. Testez avec des champs vides → doit afficher une erreur

## ✅ Résultat Final

Avec cette configuration :
- **Le visiteur envoie le formulaire** 📤
- **Vous recevez immédiatement l'email** sur votre Zimbra 📧
- **Le visiteur reçoit automatiquement une confirmation** ✅
- **Aucune action manuelle requise** 🎯

## 🆘 Dépannage

### Si EmailJS ne fonctionne pas :
- Le système utilisera automatiquement `mailto:` comme fallback
- Le visiteur ouvrira son client email avec le message pré-rempli

### Limites EmailJS (plan gratuit) :
- 200 emails/mois
- Si dépassé → utilisation automatique du fallback

## 📞 Support
Pour toute question : `contact@axonity.fr`