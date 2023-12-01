# Changelog

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),

## [Unreleased]

### Fixed
- Bug in useHoloStore that was failing to update `appInfo` and `isReady` on initialization. [(#29)]

### Changed
- Added HBS registration calls [(#75)]
- Updated useHoloStore to use agent_pub_key [(#51)]
- Updated useClientStore to use agent_pub_key [(#50)]
- Modified HAppCard, HAppCardUsage, and HAppImage to support publisher portal hApp view [(#43)]
- Updated Identicon component to have an api usable by all 3 client UIs. [(#15)]
- Identity modal must be closed by clicking I Understand (removed option to click outside dialog to close) [(#18)]
- Add button id for I Understand dialog button on identity modal [(#19)]

### Removed
- Identicon2 component [(#15)]
- Removed X icon in top left of identity modal [(#16)]

[(#15)]: https://github.com/Holo-Host/ui-common-library/pull/15
[(#16)]: https://github.com/Holo-Host/ui-common-library/pull/16
[(#18)]: https://github.com/Holo-Host/ui-common-library/pull/18
[(#19)]: https://github.com/Holo-Host/ui-common-library/pull/19
[(#29)]: https://github.com/Holo-Host/ui-common-library/pull/29
[(#43)]: https://github.com/Holo-Host/ui-common-library/pull/43
[(#50)]: https://github.com/Holo-Host/ui-common-library/pull/50
[(#51)]: https://github.com/Holo-Host/ui-common-library/pull/51
[(#75)]: https://github.com/Holo-Host/ui-common-library/pull/75