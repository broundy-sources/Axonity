# 📧 Configuration EmailJS - Envoi d'emails direct depuis le site

## 🎯 Pourquoi EmailJS ?
- ✅ Envoi direct depuis le navigateur (pas besoin de backend)
- ✅ Gratuit jusqu'à 200 emails/mois
- ✅ Sécurisé et fiable
- ✅ Fallback automatique vers mailto si problème

## 📋 Étapes de configuration :

### 1. Créer un compte EmailJS
- Allez sur : https://www.emailjs.com/
- Créez un compte gratuit
- Confirmez votre email

### 2. Configurer le service email
- Dans le dashboard EmailJS, allez dans "Email Services"
- Cliquez "Add New Service"
- Choisissez "Gmail" (recommandé)
- Connectez votre compte Gmail (axonitypro@gmail.com)
- Notez votre SERVICE_ID (ex: service_abc123)

### 3. Créer un template d'email
- Allez dans "Email Templates"
- Cliquez "Create New Template"
- Template suggéré :

```
Subject: {{subject}} - Nouveau contact Axonity.fr

Bonjour,

Vous avez reçu un nouveau message depuis votre site Axonity.fr :

Nom: {{from_name}}
Email: {{from_email}}
Sujet: {{subject}}

Message:
{{message}}

---
Ce message a été envoyé depuis le formulaire de contact d'Axonity.fr
```

- Notez votre TEMPLATE_ID (ex: template_xyz789)

### 4. Récupérer votre clé publique
- Allez dans "Account" → "General"
- Copiez votre "Public Key" (ex: user_abcdef123456)

### 5. Mettre à jour le code
Remplacez dans le fichier Axonity.js :
- `VOTRE_CLE_PUBLIQUE_EMAILJS` → votre Public Key
- `VOTRE_SERVICE_ID` → votre Service ID  
- `VOTRE_TEMPLATE_ID` → votre Template ID

## 🚀 Fonctionnement final :
1. Client remplit le formulaire
2. Clic sur "Envoyer ma demande"
3. Email envoyé DIRECTEMENT à axonitypro@gmail.com
4. Pas besoin d'ouvrir de client email
5. Confirmation de succès affichée

## 🛡️ Sécurité :
- Votre email reste privé
- Pas de spam possible
- Limitation à 200 emails/mois (largement suffisant)

## ⚡ Backup automatique :
Si EmailJS ne fonctionne pas → fallback automatique vers mailto