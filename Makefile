### Dependencies ###

install: ## Install all dependencies
	yarn install
	cd ios && pod install

clean: ## Clean the project
	rm -rf $TMPDIR/react-*
	rm -rf $TMPDIR/metro-*
	rm -rf node_modules
	rm -rf ios/Pods
	yarn
	cd ios && pod install


### Simulators ###

android-run-development: ## Run the Android app in the development env
	react-native run-android --variant=developmentDebug --appIdSuffix=development

android-run-staging: ## Run the Android app in the staging env
	react-native run-android --variant=stagingDebug --appIdSuffix=staging

android-run-production: ## Run the Android app in the production env
	react-native run-android --variant=productionDebug --appIdSuffix=production

ios-run-development: ## Run the iOS app in the development env
	react-native run-ios --scheme=rnStarter-development

ios-run-staging: ## Run the iOS app in the staging env
	react-native run-ios --scheme=rnStarter-staging

ios-run-production: ## Run the iOS app in the production env
	react-native run-ios --scheme=rnStarter-production


### Code checks ###

test: ## Run Jest tests
	jest --runInBand --outputFile test-results.json --json

tsc: ## Check code against Typescript config
	tsc --noEmit --project tsconfig.json

lint: ## Check the code with ESLint
	eslint ./ --ext .js,.ts,.tsx --cache --fix --ignore-path .gitignore

prettify: ## Run prettier on all files
	yarn prettier --write './**/*.{ts,tsx}'


## E2E tests ##

detox-ios-debug: ## Run Detox E2E tests on an iOS debug simulator
	npx detox build -c debug ios.sim.debug
	npx detox test -c debug ios.sim.debug

detox-ios-prod: ## Run Detox E2E tests on an iOS release simulator
	npx detox build -c release ios.sim.release
	npx detox test -c release ios.sim.release

detox-android-debug: ## Run Detox E2E tests on an Android debug simulator
	npx detox build -c debug android.emu.debug
	npx detox test -c debug android.emu.debug

detox-android-prod: ## Run Detox E2E tests on an Android release simulator
	npx detox build -c release android.emu.release
	npx detox test -c release android.emu.release


### Release management ###

ios-patch: ## Create a patch semver version for iOS
	cd ios && fastlane incrementVersionNumber bump_type:patch

ios-minor: ## Create a minor semver version for iOS
	cd ios && fastlane incrementVersionNumber bump_type:minor

ios-major: ## Create a major semver version for iOS
	cd ios && fastlane incrementVersionNumber bump_type:major

ios-beta: ## Release a beta version for iOS
	cd ios && fastlane beta

ios-match-pull: ## Pull the latest iOS certificates
	cd ios && fastlane matchPull

ios-add-testers: ## Add new test devices to the certificate
	cd ios && fastlane addTesters

android-beta: ## Release a beta version for Android
	cd android && fastlane beta

android-release: ## Release a production version for Android
	cd android && fastlane deploy