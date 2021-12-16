#!/bin/bash -e

# Keystore file
echo "$RELEASE_KEYSTORE" > release.keystore.asc 
gpg -d --passphrase="$GPG_PASSPHRASE" --batch release.keystore.asc > android/app/release.keystore 

echo "$GRADDLE_PROPERTIES" > gradle.properties.asc 
gpg -d --passphrase="$GPG_PASSPHRASE" --batch gradle.properties.asc > android/gradle.properties 

# Google JSON key
echo "$GOOGLE_CREDENTIAL_KEY" > google-credential-key.asc 
gpg -d --passphrase="$GPG_PASSPHRASE" --batch google-credential-key.asc > android/google-credential-key.json 

# Fastlane .env
echo "$FASTLANE_ENV_ANDROID" > .env.fastlane.android.asc
gpg -d --passphrase="$GPG_PASSPHRASE" --batch .env.fastlane.android.asc > android/fastlane/.env

# App Staging .env
echo "$STAGING_ENV" > .env.staging.asc
gpg -d --passphrase="$GPG_PASSPHRASE" --batch .env.staging.asc > .env.staging

# Delete base files
rm release.keystore.asc gradle.properties.asc google-credential-key.asc .env.fastlane.android.asc .env.staging.asc