const passwordManager = require('../src/passwordManager');

// Test pour ajouter un mot de passe
console.log('Ajout de mot de passe...');
passwordManager.addPassword('test.com', 'testPassword123');

// Test pour récupérer les mots de passe
console.log('Récupération des mots de passe...');
passwordManager.getPasswords();
