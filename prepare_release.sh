#!/bin/bash

# Script pour préparer les fichiers volumineux pour GitHub Release
# Ce script crée un dossier avec les fichiers à uploader dans la release

RELEASE_DIR="release-assets"
mkdir -p "$RELEASE_DIR"

# Copier les fichiers volumineux
echo "Copie des fichiers volumineux..."

# Rapport PDS Micro
if [ -f "PERSONNAL PROJECTS/Semester Project 2/Rapport_PDS_Micro.pdf" ]; then
    cp "PERSONNAL PROJECTS/Semester Project 2/Rapport_PDS_Micro.pdf" "$RELEASE_DIR/"
    echo "✓ Rapport_PDS_Micro.pdf copié"
else
    echo "✗ Rapport_PDS_Micro.pdf non trouvé"
fi

# Rapport Manufacturing
if [ -f "PROJECTS/Manufacturing Technologies/Rapport_Manufacturing_Groupe_2.pdf" ]; then
    cp "PROJECTS/Manufacturing Technologies/Rapport_Manufacturing_Groupe_2.pdf" "$RELEASE_DIR/"
    echo "✓ Rapport_Manufacturing_Groupe_2.pdf copié"
else
    echo "✗ Rapport_Manufacturing_Groupe_2.pdf non trouvé"
fi

# Vidéo Projet.mp4
if [ -f "PROJECTS/Microcontrollers/Projet.mp4" ]; then
    cp "PROJECTS/Microcontrollers/Projet.mp4" "$RELEASE_DIR/"
    echo "✓ Projet.mp4 copié"
else
    echo "✗ Projet.mp4 non trouvé"
fi

echo ""
echo "✅ Fichiers préparés dans le dossier '$RELEASE_DIR/'"
echo ""
echo "📋 Instructions pour créer la release GitHub :"
echo "1. Allez sur https://github.com/BenBahu/Portfolio/releases/new"
echo "2. Créez un nouveau tag : v2.0-assets"
echo "3. Titre de la release : 'Portfolio V2 - Large Assets'"
echo "4. Description : 'Fichiers volumineux pour le portfolio V2'"
echo "5. Uploadez les 3 fichiers du dossier '$RELEASE_DIR/'"
echo "6. Cliquez sur 'Publish release'"
echo ""
echo "Les liens dans index.html pointent déjà vers cette release !"
