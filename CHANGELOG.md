# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [2.1.0](https://github.com/tsyirvo/react-native-starter/compare/v2.0.0...v2.1.0) (2024-04-19)


### Features

* add post merge hook ([#353](https://github.com/tsyirvo/react-native-starter/issues/353)) ([a8d57e2](https://github.com/tsyirvo/react-native-starter/commit/a8d57e23e750bbbbf1a3a2fcfa81bad2fde52484))
* add util to request store review ([#379](https://github.com/tsyirvo/react-native-starter/issues/379)) ([e66a117](https://github.com/tsyirvo/react-native-starter/commit/e66a1170d2adb84ace8435cfa26fc3af4ca63295))
* bump most of the dependencies ([#350](https://github.com/tsyirvo/react-native-starter/issues/350)) ([ee95c24](https://github.com/tsyirvo/react-native-starter/commit/ee95c2430773456689b3ae492a8e6fed2787390d))
* check network state on mount ([#362](https://github.com/tsyirvo/react-native-starter/issues/362)) ([32f146f](https://github.com/tsyirvo/react-native-starter/commit/32f146f13e365ac015f5bb38f5fa53e34ecbee86))
* configure sentry to upload sourcemaps ([#356](https://github.com/tsyirvo/react-native-starter/issues/356)) ([e8aabed](https://github.com/tsyirvo/react-native-starter/commit/e8aabed5884b7ea2b6fb826dfb1cc69f721e3d41))
* indicate if app is running from an OTA update ([#370](https://github.com/tsyirvo/react-native-starter/issues/370)) ([916f164](https://github.com/tsyirvo/react-native-starter/commit/916f164cbc4bedfbd862113434fb85696cdf65fb))
* integrate app icon and splash for each env ([#366](https://github.com/tsyirvo/react-native-starter/issues/366)) ([79aefce](https://github.com/tsyirvo/react-native-starter/commit/79aefce3d996baa079bc9b3a8e87c40f24b02526))
* lazy load the sandbox ([#384](https://github.com/tsyirvo/react-native-starter/issues/384)) ([576d101](https://github.com/tsyirvo/react-native-starter/commit/576d101fb893cb54b9187acb61be059bf290170d))
* migrate from MixPanel to Amplitude ([#378](https://github.com/tsyirvo/react-native-starter/issues/378)) ([47700a5](https://github.com/tsyirvo/react-native-starter/commit/47700a55122cdb4b9e83cc598c30fd8bbd3438bd))
* misc screens UI and logic updates ([#361](https://github.com/tsyirvo/react-native-starter/issues/361)) ([b544f7d](https://github.com/tsyirvo/react-native-starter/commit/b544f7db6c3b72d4625f67c0d214ab9fc68eb8f0))
* plug misc screens to the flags ([#390](https://github.com/tsyirvo/react-native-starter/issues/390)) ([e2bbba8](https://github.com/tsyirvo/react-native-starter/commit/e2bbba87a8569521398814505e0b4ced0ad742ce))
* prepare the config to load fonts on the native with Expo SDK 50 ([#364](https://github.com/tsyirvo/react-native-starter/issues/364)) ([11ec1ad](https://github.com/tsyirvo/react-native-starter/commit/11ec1ad49607ff881b43562e93c93dac8691f24a))
* set up a cache based on the default branch ([#381](https://github.com/tsyirvo/react-native-starter/issues/381)) ([0e9bb98](https://github.com/tsyirvo/react-native-starter/commit/0e9bb9868633a20ce73a65a10140a14aaa5a5238))
* setup a basic graphQL config ([#371](https://github.com/tsyirvo/react-native-starter/issues/371)) ([9b617ea](https://github.com/tsyirvo/react-native-starter/commit/9b617eacb159207f33cc6d8e3f69ae38b94003aa))
* setup a basic handling of JWT tokens ([#374](https://github.com/tsyirvo/react-native-starter/issues/374)) ([57fcadb](https://github.com/tsyirvo/react-native-starter/commit/57fcadb639716f1333d2462305730aff89738cde))
* setup a more fine grained error boundary logic ([#363](https://github.com/tsyirvo/react-native-starter/issues/363)) ([990c42f](https://github.com/tsyirvo/react-native-starter/commit/990c42fc3b4d8a42d01c666bff7ee480c9dd24ea))
* setup a store managed with zustand ([#372](https://github.com/tsyirvo/react-native-starter/issues/372)) ([8eb3491](https://github.com/tsyirvo/react-native-starter/commit/8eb3491ed935e62ca879f55610a5a91923ba5900))
* setup builds in the CI ([#382](https://github.com/tsyirvo/react-native-starter/issues/382)) ([bb3efc7](https://github.com/tsyirvo/react-native-starter/commit/bb3efc747e32e7aacf2a0ead48f561df29754c16))
* setup deeplinks ([#380](https://github.com/tsyirvo/react-native-starter/issues/380)) ([68b1ddf](https://github.com/tsyirvo/react-native-starter/commit/68b1ddfa03b669bdd7dc10078b872c3fefcb367e))
* setup notifications ([#377](https://github.com/tsyirvo/react-native-starter/issues/377)) ([416d75b](https://github.com/tsyirvo/react-native-starter/commit/416d75b7245e89dcc1daee3cb237abc624051f4c))
* setup tooling to handle forms ([#375](https://github.com/tsyirvo/react-native-starter/issues/375)) ([bd27e31](https://github.com/tsyirvo/react-native-starter/commit/bd27e31d6ccab9c47f183a56358cb20bb3908eb4))


### Bug Fixes

* update some mixed up translation keys ([#373](https://github.com/tsyirvo/react-native-starter/issues/373)) ([ae6b2e9](https://github.com/tsyirvo/react-native-starter/commit/ae6b2e97ee7ae2daedf08b803c939e3fa96b8914))

## [2.0.0](https://github.com/tsyirvo/react-native-starter/compare/v1.3.0...v2.0.0) (2022-10-21)


### ⚠ BREAKING CHANGES

* migrate to expo with a custom development build (#341)

### Features

* add support for testing rules in eslint config ([#339](https://github.com/tsyirvo/react-native-starter/issues/339)) ([886147e](https://github.com/tsyirvo/react-native-starter/commit/886147e221a2f9f357d448744a157fba01916750))
* better navigation abstractions ([#338](https://github.com/tsyirvo/react-native-starter/issues/338)) ([f5c2e66](https://github.com/tsyirvo/react-native-starter/commit/f5c2e66db4fed8cdbcd0f95c171b9bc00c529fe5))
* migrate the image import script ([#337](https://github.com/tsyirvo/react-native-starter/issues/337)) ([c4f04df](https://github.com/tsyirvo/react-native-starter/commit/c4f04dffd6fc871a7415417ef92ccd44db10e4ce))
* migrate to expo with a custom development build ([#341](https://github.com/tsyirvo/react-native-starter/issues/341)) ([2c91857](https://github.com/tsyirvo/react-native-starter/commit/2c91857be548f9339f5cf7d74ec8fed2f89ed9cb))
* setup a basic date handling ([#340](https://github.com/tsyirvo/react-native-starter/issues/340)) ([4df8e4f](https://github.com/tsyirvo/react-native-starter/commit/4df8e4fa66384331b919ccf9b2e21d9fb95c0b94))
* setup detox to work with expo ([#342](https://github.com/tsyirvo/react-native-starter/issues/342)) ([e34e581](https://github.com/tsyirvo/react-native-starter/commit/e34e581fe55dd58b727e9e2cb496c737fbd07e04))


### Bug Fixes

* handle codepush updates errors ([#318](https://github.com/tsyirvo/react-native-starter/issues/318)) ([0c5ade4](https://github.com/tsyirvo/react-native-starter/commit/0c5ade4fdaf59afca15e4ab9982cca32db3004a5))
* update bad flipper package name ([#309](https://github.com/tsyirvo/react-native-starter/issues/309)) ([3fab231](https://github.com/tsyirvo/react-native-starter/commit/3fab2313c695396c2b0b30ee6d355f802e4ccbc3))

## [1.3.0](https://github.com/tsyirvo/react-native-starter/compare/v1.2.0...v1.3.0) (2022-01-02)


### Features

* add a logger class to handle errors ([#267](https://github.com/tsyirvo/react-native-starter/issues/267)) ([92793fc](https://github.com/tsyirvo/react-native-starter/commit/92793fc37755360a78156b2affe1bb0fe9f19c8a))
* add a maintenance screen ([#273](https://github.com/tsyirvo/react-native-starter/issues/273)) ([6a75d8c](https://github.com/tsyirvo/react-native-starter/commit/6a75d8c7fc7aaa56979ae7785fec5bc40459795f))
* add an error monitoring tool ([#263](https://github.com/tsyirvo/react-native-starter/issues/263)) ([bbcccf0](https://github.com/tsyirvo/react-native-starter/commit/bbcccf0aa4d4ddb917e7acc490f86e43c62c5d59))
* add app icons ([#271](https://github.com/tsyirvo/react-native-starter/issues/271)) ([8a4cd2c](https://github.com/tsyirvo/react-native-starter/commit/8a4cd2c0b8653cc721d1928fb67bf6fd0dd447ce))
* add useful hooks often needed in projects ([#270](https://github.com/tsyirvo/react-native-starter/issues/270)) ([05ecebd](https://github.com/tsyirvo/react-native-starter/commit/05ecebd97513f3238b108184bbc7f1ba088e83b0))
* better app versioning ([#272](https://github.com/tsyirvo/react-native-starter/issues/272)) ([5c1e973](https://github.com/tsyirvo/react-native-starter/commit/5c1e973cab5dd79edebc403db3e06e6dbcf961cb))
* configure feature flags ([#269](https://github.com/tsyirvo/react-native-starter/issues/269)) ([52a4c64](https://github.com/tsyirvo/react-native-starter/commit/52a4c640e7e2b03673b0b1a7f3610f29ce1c64c4))
* create an analytics abstraction ([#268](https://github.com/tsyirvo/react-native-starter/issues/268)) ([e58fa06](https://github.com/tsyirvo/react-native-starter/commit/e58fa06a2fd76ee636bee551be8fc474b0242787))
* implement a toaster component ([#266](https://github.com/tsyirvo/react-native-starter/issues/266)) ([20cffb0](https://github.com/tsyirvo/react-native-starter/commit/20cffb0f2a4724e4bea2c0e884c23946ceb06790))
* setup performance monitoring ([#265](https://github.com/tsyirvo/react-native-starter/issues/265)) ([18874ae](https://github.com/tsyirvo/react-native-starter/commit/18874aeb1bb56f84b2c1d24bb5591fd0fb48b3c7))


### Bug Fixes

* add missing files for the CI build ([#276](https://github.com/tsyirvo/react-native-starter/issues/276)) ([16d58e3](https://github.com/tsyirvo/react-native-starter/commit/16d58e30e691b1c1a083c7dacbe24f0f3f7db453))
* fix the iOS Firebase config ([#278](https://github.com/tsyirvo/react-native-starter/issues/278)) ([c04ec60](https://github.com/tsyirvo/react-native-starter/commit/c04ec60ad4cac75ea3e10ad7ab48542e57581e3c))
* pass the env variables to the CI scripts ([#277](https://github.com/tsyirvo/react-native-starter/issues/277)) ([be7f797](https://github.com/tsyirvo/react-native-starter/commit/be7f7971c88f8f694cae4d94c205a3b7f4f6fe71))

## [1.2.0](https://github.com/tsyirvo/react-native-starter/compare/v1.1.0...v1.2.0) (2021-12-17)


### Features

* automate svg generation and usage ([#247](https://github.com/tsyirvo/react-native-starter/issues/247)) ([093d8d1](https://github.com/tsyirvo/react-native-starter/commit/093d8d1c23a4e1ad135f938ab0a708b27dce31a1))
* extract ESLint and TS config to an external package ([#242](https://github.com/tsyirvo/react-native-starter/issues/242)) ([8052eb8](https://github.com/tsyirvo/react-native-starter/commit/8052eb853aa998d0b369dac2ce7a582431f1f79f))
* migrate to new i18n lib ([#240](https://github.com/tsyirvo/react-native-starter/issues/240)) ([131704f](https://github.com/tsyirvo/react-native-starter/commit/131704fcc4485c751f4694ecdf0dff435b78755a))
* migrate to Restyle ([#255](https://github.com/tsyirvo/react-native-starter/issues/255)) ([dcae421](https://github.com/tsyirvo/react-native-starter/commit/dcae421dff1b251bbace170e6e87f2a198347282))
* remove storybook in favor of custom sandbox ([#243](https://github.com/tsyirvo/react-native-starter/issues/243)) ([892be69](https://github.com/tsyirvo/react-native-starter/commit/892be69e8a426e2cdefb4f64107f032853331782))
* rework app structure ([#258](https://github.com/tsyirvo/react-native-starter/issues/258)) ([e887350](https://github.com/tsyirvo/react-native-starter/commit/e88735008452052c57503ee4a5ccb132c25e9d5e))
* update eslint/babel/ts configs ([#241](https://github.com/tsyirvo/react-native-starter/issues/241)) ([bcb2902](https://github.com/tsyirvo/react-native-starter/commit/bcb29023b7ad0208c440d74729a8559b4fd21eb0))
* update github actions release flow ([#261](https://github.com/tsyirvo/react-native-starter/issues/261)) ([6ddd87c](https://github.com/tsyirvo/react-native-starter/commit/6ddd87c218f3257797443e89f907ffa25ee5e393))
* update testing strategy ([#257](https://github.com/tsyirvo/react-native-starter/issues/257)) ([979d48d](https://github.com/tsyirvo/react-native-starter/commit/979d48ddb3390e3db0bfabf68a8d7443d4a087f4))

## [1.1.0](https://github.com/tsyirvo/react-native-starter/compare/v1.0.0...v1.1.0) (2021-01-04)


### Features

* migrate to Github Actions ([#140](https://github.com/tsyirvo/react-native-starter/issues/140)) ([64a38f0](https://github.com/tsyirvo/react-native-starter/commit/64a38f0a1268179c2e608261fbd778b03fc65eb8))

## 1.0.0 (2020-12-27)


### Features

* add a basic default fastlane config for Android ([e8c43c3](https://github.com/tsyirvo/react-native-starter/commit/e8c43c3610595e54c1e46ce4317295ae6ffb047d))
* add a basic default fastlane config for iOS ([ec91bed](https://github.com/tsyirvo/react-native-starter/commit/ec91bed04373a783267f2140e3141768c214eafa))
* add a lane to add new testers devices IDs ([6cf88ce](https://github.com/tsyirvo/react-native-starter/commit/6cf88ceedbb24e1e024d9a080252c6b89f7de85c))
* add an utility to handle styling depending on devices sizes ([15fcd62](https://github.com/tsyirvo/react-native-starter/commit/15fcd629f7fce847e2a55d2bc4fec6d66c4fcd6b))
* add automatic version handling for Fastlane iOS ([95527ce](https://github.com/tsyirvo/react-native-starter/commit/95527ce14aa024ff44137e2b4646043c8e84d45e))
* add better locales management ([#129](https://github.com/tsyirvo/react-native-starter/issues/129)) ([4140902](https://github.com/tsyirvo/react-native-starter/commit/4140902db89314bb1c1c5629b1d5777c692a8f3d))
* add commit linting ([996c011](https://github.com/tsyirvo/react-native-starter/commit/996c011a248aa89e50286fe795f7588f4568f0be))
* add dummy firebase config files ([cb9c1d3](https://github.com/tsyirvo/react-native-starter/commit/cb9c1d328d7aac65c8c888d1705910fd1b0d53fc))
* add Fastlane versionning for Android ([245a276](https://github.com/tsyirvo/react-native-starter/commit/245a276e7b9ff3784393e40b9e80d09d7d85734a))
* add multiple envs for android and ios ([9c23ddf](https://github.com/tsyirvo/react-native-starter/commit/9c23ddf6504d50a9d6c6b2566313a7efe1fe828f))
* add new primitives ([#130](https://github.com/tsyirvo/react-native-starter/issues/130)) ([5482b70](https://github.com/tsyirvo/react-native-starter/commit/5482b70addd4e7539a58da3b0a8f21d7ab154f09))
* add screen tracking ([3089dd6](https://github.com/tsyirvo/react-native-starter/commit/3089dd60f06338101617fec18b7b405af33d583d))
* add support for Fastlane push certificates ([a320d87](https://github.com/tsyirvo/react-native-starter/commit/a320d879fecdd9c2d475174ffa00cbf320037b9d))
* add the Android part of the import script ([c9007e0](https://github.com/tsyirvo/react-native-starter/commit/c9007e0afff02b721d610ad5492c91aafed1f608))
* add the ios fastlane config ([caf0070](https://github.com/tsyirvo/react-native-starter/commit/caf007028d3adb6f2c4a2d82ccdfb3d6de17c988))
* add the stories for the theme elements ([c55b7f1](https://github.com/tsyirvo/react-native-starter/commit/c55b7f1dd07849f66e409c2c391527d256159a96))
* autoload all stories files ([52cfd70](https://github.com/tsyirvo/react-native-starter/commit/52cfd700d7297b9fe0ab5c07f40e6760ba9c6a4f))
* better styles on the home page ([c27cf1d](https://github.com/tsyirvo/react-native-starter/commit/c27cf1d340165bfec5a2d1a7f1208fd9cfb60e60))
* better theme file ([7d59227](https://github.com/tsyirvo/react-native-starter/commit/7d592279b765cf7c63595598c77a067688386380))
* configure codepush for android ([014bcc8](https://github.com/tsyirvo/react-native-starter/commit/014bcc8059061eea6975e465c44cdd91a821cb11))
* configure codepush for ios ([52ebb22](https://github.com/tsyirvo/react-native-starter/commit/52ebb22d7fbc38d5523594ee48186db88d4202de))
* configure firebase for android ([fc1dca4](https://github.com/tsyirvo/react-native-starter/commit/fc1dca4c3aadc61b04d6d2782a78f318734a6011))
* configure firebase for ios ([6d617b8](https://github.com/tsyirvo/react-native-starter/commit/6d617b8450ecfebdad2ec31e7c3dc6d71dbc4c00))
* configure storyshots to automate jest testing ([14842b5](https://github.com/tsyirvo/react-native-starter/commit/14842b5d0d6b0b7c3f682eb31f477cbd00cee745))
* create a changelog when releasing iOS builds ([ad1affc](https://github.com/tsyirvo/react-native-starter/commit/ad1affcf1161e192f547f2008d06516f39d8a16a))
* create a new page generator ([cf2980b](https://github.com/tsyirvo/react-native-starter/commit/cf2980b1af392d0d605c26527a7168007ccda948))
* create a wrapper for some stories ([86d7c0c](https://github.com/tsyirvo/react-native-starter/commit/86d7c0c22144076412ebd43a6d1af91df9759399))
* create stories for the built-in components ([39d56e7](https://github.com/tsyirvo/react-native-starter/commit/39d56e7847bbd3f59ea2c520ef44592092bb82e6))
* create targets for each env on ios ([c770bf1](https://github.com/tsyirvo/react-native-starter/commit/c770bf1439528e90dba3279d2f4876659fa54d95))
* fix ios build cache and prettier build output ([0be7efe](https://github.com/tsyirvo/react-native-starter/commit/0be7efe9bf6713db28e7e80e0537db9dd97faeb6))
* integrate crashlytics ([58157b7](https://github.com/tsyirvo/react-native-starter/commit/58157b7c5815f3fc5a589f181c7aa1ee38ff503a))
* lint the commit msg before linting the whole project ([68da934](https://github.com/tsyirvo/react-native-starter/commit/68da934a34931d0596b48c17ade5ea3cb2efe7e1))
* log custom analytic events ([fb8a833](https://github.com/tsyirvo/react-native-starter/commit/fb8a833f7914c9251df53bf8dc516ad143346e08))
* migrate from tslint to eslint ([5c76f87](https://github.com/tsyirvo/react-native-starter/commit/5c76f875bf988913a8c49642528df57ccf9361a5))
* migrate to the latest detox version ([01a8c0f](https://github.com/tsyirvo/react-native-starter/commit/01a8c0fbaf53fca22a4d9cad1bd5f6dc202c3928))
* only disable the necessary ESlint rules ([df29743](https://github.com/tsyirvo/react-native-starter/commit/df29743c0f9132c37c168abfde7cb1be997ec96c))
* only run if file is an image ([b189bf2](https://github.com/tsyirvo/react-native-starter/commit/b189bf25bce493a7171f63a638119648defced14))
* setup dangerjs ([3643eb8](https://github.com/tsyirvo/react-native-starter/commit/3643eb8fa4186745d342224b66d2adefa717062a))
* setup test and ios e2e ([3cbe1c0](https://github.com/tsyirvo/react-native-starter/commit/3cbe1c06cf2ea67fa7123e235cd2452aa278966c))
* start migrating to i18n-next ([c5ba845](https://github.com/tsyirvo/react-native-starter/commit/c5ba8450fc72b7b2635fcda887aff569d71ec8c7))
* start of the android fastlane config ([1f97898](https://github.com/tsyirvo/react-native-starter/commit/1f978989965a732e78f24b7b942fddd40978adac))
* start setting up android e2e testing ([2e0f912](https://github.com/tsyirvo/react-native-starter/commit/2e0f912010c56c7dad4138747c8964563c4b1f36))
* support adding folders without nesting ([987bd94](https://github.com/tsyirvo/react-native-starter/commit/987bd94ba35416ae1d2ed2c5173c6a1154d708b8))
* support folder nesting && filter out bad files ([6a75ecb](https://github.com/tsyirvo/react-native-starter/commit/6a75ecbae579237c753d455fdca9d3c226f94c8e))
* support passing multiple files to the image script ([e304063](https://github.com/tsyirvo/react-native-starter/commit/e304063d77faa6b01571bfe191378c179b206416))
* toggle storybook from the dev menu ([3516764](https://github.com/tsyirvo/react-native-starter/commit/35167645205a28e56d442864fa2ed40128c86e97))
* update README to explain Fastlane usage ([5b1d177](https://github.com/tsyirvo/react-native-starter/commit/5b1d177e29f2f26fa5fb792a58c2da6e09bb6ff5))
* update storybook and add basic addons examples ([b50e654](https://github.com/tsyirvo/react-native-starter/commit/b50e654ff480504c075d003d12df0b1f81448ee7))
* update the Fastlane flows ([#139](https://github.com/tsyirvo/react-native-starter/issues/139)) ([129db04](https://github.com/tsyirvo/react-native-starter/commit/129db04abb2da20049574c4888373f5fa3a240a9))
* update the prettier config ([3534518](https://github.com/tsyirvo/react-native-starter/commit/3534518c1c9a6537c114b7ca114ac74c0c4f97b0))
* update the versionning handling for iOS ([f694b0c](https://github.com/tsyirvo/react-native-starter/commit/f694b0c7e782accc9bff576c7c9a815f9f2813e8))
* use testing-library for better tests utilities ([b9a0ecd](https://github.com/tsyirvo/react-native-starter/commit/b9a0ecdd87991653fcbe65b068a7503799e6bdb1))
* wip of adding a link to the storybook from the dev menu ([a2b678e](https://github.com/tsyirvo/react-native-starter/commit/a2b678e1a7372a2004890fcb643fb514553202fd))


### Bug Fixes

* cleanup of the elision function ([0273b95](https://github.com/tsyirvo/react-native-starter/commit/0273b956bad4f2f7b9dcb5f1ecd33dbff55dcfff))
* fix crashing while getting the locales on iOS13 ([7837d39](https://github.com/tsyirvo/react-native-starter/commit/7837d39cc14c1f458272d01256b04d1b6609e550))
* fix some bad danger js config ([2bcb3ec](https://github.com/tsyirvo/react-native-starter/commit/2bcb3ecf68d332de2a60c34830006f13e3735578))
* fix spacing units ([f4b5a3f](https://github.com/tsyirvo/react-native-starter/commit/f4b5a3fec4a588f90948c6fa547cb2e9fabc568f))
* fix the `test:staged` command ([cb8ee04](https://github.com/tsyirvo/react-native-starter/commit/cb8ee04ff821ff48346f4979590f4ac1d8bc2318))
* make the pod install for all targets and enable flipper for the dev one ([b4090ee](https://github.com/tsyirvo/react-native-starter/commit/b4090eeb6cebf3e9d3fcd784935fea8debd88b20))
* make the scheme shared ([41343b3](https://github.com/tsyirvo/react-native-starter/commit/41343b3968666111fe0ca4994f3a9045af55ec8b))
* remove deleted target from podfile ([0a20dd1](https://github.com/tsyirvo/react-native-starter/commit/0a20dd1ab0699109c5f2f5dc9c08ee0d174dec68))
* remove the useless android permissions added by rn ([8d5223d](https://github.com/tsyirvo/react-native-starter/commit/8d5223d9e73f2e0dd1de3776d820a0578edf9729))
* update detox script ([aa4def4](https://github.com/tsyirvo/react-native-starter/commit/aa4def4677fa7da1178978211a555305b6f76837))
* update the plist file ([ac2d865](https://github.com/tsyirvo/react-native-starter/commit/ac2d86538cd9d3aa3362e6995310e33a1d57d154))
