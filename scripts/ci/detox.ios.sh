#!/bin/bash -e

set -o pipefail && xcodebuild -workspace ios/rnStarter.xcworkspace -scheme rnStarter -configuration Release -sdk iphonesimulator -derivedDataPath ios/build | xcpretty
detox test --configuration ios.sim.release --cleanup