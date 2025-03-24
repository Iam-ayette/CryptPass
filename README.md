# Password Manager

![Password Manager](https://img.shields.io/badge/Password%20Manager-Secure-blue)

Un gestionnaire de mots de passe sécurisé permettant de stocker et de récupérer des mots de passe de manière cryptée. Ce projet utilise **Node.js** et le module **Crypto** pour garantir la sécurité des données via l'algorithme **AES-256-CBC**.

## Technologies utilisées

- ![Node.js](https://img.shields.io/badge/Node.js-4FA3FF?logo=node.js&logoColor=white) **Node.js** : Environnement d'exécution pour le serveur.
- ![Crypto](https://img.shields.io/badge/Crypto-111?logo=crypto&logoColor=white) **Crypto** : Bibliothèque pour le chiffrement des mots de passe avec l'algorithme **AES-256-CBC**.
- ![JSON](https://img.shields.io/badge/JSON-000?logo=json&logoColor=white) **JSON** : Format de fichier pour le stockage des mots de passe.

## Fonctionnalités

- **Ajout de mots de passe** : Permet d'ajouter des mots de passe pour différents sites Web.
- **Chiffrement** : Les mots de passe sont chiffrés avant d'être stockés, garantissant leur sécurité.
- **Déchiffrement** : Les mots de passe peuvent être récupérés en toute sécurité avec un processus de déchiffrement.
- **Stockage sécurisé** : Les mots de passe sont enregistrés dans un fichier JSON local.

## Installation

1. Clonez ce dépôt sur votre machine locale :

   ```bash
   git clone https://github.com/your-username/password-manager.git
