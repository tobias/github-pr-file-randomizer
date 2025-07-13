# GitHub PR File Randomizer Extension for Firefox

The extension will automatically run on GitHub PR files pages
(https://github.com/*/pull/*/files) and randomly shuffle the file order each
time you load or refresh the page.

##  Installation

See [the Firefox Add-On repository](https://addons.mozilla.org/en-US/firefox/addon/github-pr-file-randomizer/).

## Rationale 

Files on pull requests are always sorted alphabetically, and reviewers typically
review from top to bottom. I posit that later files may not get as thorough of a
review as earlier ones, especially for large PRs. This aims to help with that.

## Local Installation (for development)

1. Open Firefox and go to about:debugging
2. Click "This Firefox"
3. Click "Load Temporary Add-on"
4. Select the `manifest.json` file

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

