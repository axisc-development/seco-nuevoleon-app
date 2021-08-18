## Prerequisites

- Read through
  ["JavaScript to Know for React"](https://kentcdodds.com/blog/javascript-to-know-for-react)
  ["Redux"](https://redux.js.org/usage/index)
- Install the React DevTools
  ([Chrome](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=en)
  (recommended),
  [Firefox](https://addons.mozilla.org/en-US/firefox/addon/react-devtools/))

## System Requirements

- [git][git] v2.10 or greater
- [NodeJS][node] `12 || 14 || 15 || 16`
- [npm][npm] v6 or greater
- [watchman][watchman] v2021.06.07.00 or greater
- [React Native][reactnative] 0.64.2 or greater
- [Xcode] v12.5.1 or greater


All of these must be available in your `PATH`. To verify things are set up
properly, you can run this:

```shell
git --version
node --version
npm --version
watchman --version
```

If you have trouble with any of these, learn more about the PATH environment
variable and how to fix it here for [windows][win-path] or
[mac/linux][mac-path].

## Setup

After you've made sure to have the correct things (and versions) installed, you
should be able to just run a few commands to get set up:

```
git clone https://github.com/axisc-development/seco-nuevoleon-app.git
cd seco-nuevoleon-app
node setup
```

This may take a few minutes.

## Running the app


```
npx react-native run-ios
```

Once the app starts. The test credentials to enter the application are:

```
user: o
password: miercoles
```


<!-- prettier-ignore-start -->
[npm]: https://www.npmjs.com/
[node]: https://nodejs.org
[git]: https://git-scm.com/
[win-path]: https://www.howtogeek.com/118594/how-to-edit-your-system-path-for-easy-command-line-access/
[mac-path]: http://stackoverflow.com/a/24322978/971592
[watchman]: https://formulae.brew.sh/formula/watchman
[reactnative]: https://reactnative.dev/docs/environment-setup
<!-- prettier-ignore-end -->
