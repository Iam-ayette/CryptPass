const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const config = require('../config/config');

// Chemin absolu vers le fichier de mots de passe
const filePath = path.join(__dirname, '../data/passwords.json');

// Fonction pour ajouter un mot de passe
function addPassword(website, password) {
  const encryptedPassword = encryptPassword(password);

  // Lire les données actuelles du fichier
  let data = [];
  try {
    const fileData = fs.readFileSync(filePath, 'utf8');
    data = JSON.parse(fileData);
  } catch (err) {
    console.error('Erreur lors de la lecture du fichier:', err);
  }

  // Ajouter le mot de passe chiffré
  data.websites.push({
    website,
    password: encryptedPassword
  });

  // Sauvegarder les données mises à jour dans le fichier
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    console.log(`Mot de passe pour ${website} ajouté avec succès.`);
  } catch (err) {
    console.error('Erreur lors de l\'écriture dans le fichier:', err);
  }
}

// Fonction pour récupérer tous les mots de passe (décryptés)
function getPasswords() {
  let data = [];
  try {
    const fileData = fs.readFileSync(filePath, 'utf8');
    data = JSON.parse(fileData);
  } catch (err) {
    console.error('Erreur lors de la lecture du fichier:', err);
    return;
  }

  data.websites.forEach(entry => {
    if (entry.password) {
      const decryptedPassword = decryptPassword(entry.password);
      if (decryptedPassword) {
        console.log(`Website: ${entry.website}, Password: ${decryptedPassword}`);
      } else {
        console.log(`Erreur de déchiffrement pour ${entry.website}`);
      }
    }
  });
}

// Fonction de chiffrement (mise à jour avec createCipheriv)
function encryptPassword(password) {
  const iv = crypto.randomBytes(16); // Vecteur d'initialisation aléatoire
  const cipher = crypto.createCipheriv(config.encryptionAlgo, Buffer.from(config.secretKey, 'utf8'), iv);
  let encrypted = cipher.update(password, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return iv.toString('hex') + ':' + encrypted; // Concaténer l'IV avec le mot de passe chiffré
}

// Fonction de déchiffrement
function decryptPassword(encryptedPassword) {
    if (!encryptedPassword || encryptedPassword.indexOf(':') === -1) {
      console.error('Mot de passe invalide ou mal formaté.');
      return '';
    }
  
    // Sépare l'IV et le mot de passe chiffré
    const parts = encryptedPassword.split(':');
    const iv = Buffer.from(parts[0], 'hex');
    const encrypted = parts[1];
  
    if (!encrypted) {
      console.error('Le mot de passe chiffré est manquant.');
      return '';
    }
  
    console.log('IV:', iv.toString('hex')); // Debug : Affiche l'IV
    console.log('Encrypted Password:', encrypted); // Debug : Affiche le mot de passe chiffré
  
    try {
      const decipher = crypto.createDecipheriv(config.encryptionAlgo, Buffer.from(config.secretKey, 'utf8'), iv);
      let decrypted = decipher.update(encrypted, 'hex', 'utf8');
      decrypted += decipher.final('utf8');
      console.log('Decrypted Password:', decrypted); // Debug : Affiche le mot de passe décrypté
      return decrypted;
    } catch (err) {
      console.error('Erreur lors du déchiffrement :', err);
      return '';
    }
  }
  

module.exports = { addPassword, getPasswords };
