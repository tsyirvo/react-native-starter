#!/bin/bash -e

npx detox clean-framework-cache && npx detox build-framework-cache
set -o pipefail && xcodebuild -workspace ios/rnStarter.xcworkspace -scheme rnStarter -configuration Release -sdk iphonesimulator -derivedDataPath ios/build | xcpretty -f `xcpretty-travis-formatter`
npx detox test --configuration ios.sim.release --cleanup