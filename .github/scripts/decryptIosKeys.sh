#!/bin/bash -e

# Apple Connect file
echo "$APPLE_CONNECT_KEY" > AuthKey_7GF3V4HFK9.p8.asc 
gpg -d --passphrase="$GPG_PASSPHRASE" --batch AuthKey_7GF3V4HFK9.p8.asc > ios/AuthKey_7GF3V4HFK9.p8

# Fastlane .env
echo "$FASTLANE_ENV_IOS" > .env.fastlane.ios.asc
gpg -d --passphrase="$GPG_PASSPHRASE" --batch .env.fastlane.ios.asc > ios/fastlane/.env

# App Staging .env
echo "$STAGING_ENV" > .env.staging.asc
gpg -d --passphrase="$GPG_PASSPHRASE" --batch .env.staging.asc > .env.staging

# Sentry config
echo "$SENTRY_CONFIG" > sentry.properties.asc
gpg -d --passphrase="$GPG_PASSPHRASE" --batch sentry.properties.asc > ios/sentry.properties

# Firebase Staging
echo "$FIREBASE_STAGING_IOS" > GoogleService-Info.plist.asc
gpg -d --passphrase="$GPG_PASSPHRASE" --batch GoogleService-Info.plist.asc > ios/Firebase/Staging/GoogleService-Info.plist

# Delete base files
rm AuthKey_7GF3V4HFK9.p8.asc .env.fastlane.ios.asc .env.staging.asc sentry.properties.asc GoogleService-Info.plist.asc