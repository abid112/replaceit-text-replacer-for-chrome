# ReplaceIt - Chrome Extension

A powerful Chrome extension that replaces any text string on webpages with your custom replacements. Built with Manifest V3 and vanilla JavaScript.

## Features

- 🔄 Replace any text on any webpage
- ⚙️ Easy-to-use settings page
- 🚀 Quick add functionality via popup
- 📥📤 Import/Export settings
- 🎯 Support for multiple replacement pairs
- ⚡ Real-time text replacement
- 🔍 Case-sensitive option
- 🌐 Works on all websites

## Installation

1. Download or clone this repository
3. Open Chrome and go to `chrome://extensions/`
4. Enable "Developer mode" in the top right
5. Click "Load unpacked" and select the extension folder
6. The extension will be installed and ready to use!

## Usage

### Quick Start
1. Click the ReplaceIt icon in your browser toolbar
2. Enter text to find and replacement text
3. Click "Add Pair" to create a new replacement
4. Visit any webpage to see the replacements in action

### Advanced Settings
1. Right-click the extension icon and select "Options"
2. Or click "Open Settings" in the popup
3. Add multiple replacement pairs
4. Enable/disable individual pairs
5. Import/export your settings
6. Configure global options

### Settings Page Features
- **Add Multiple Pairs**: Create as many replacement pairs as needed
- **Enable/Disable**: Toggle individual pairs or the entire extension
- **Import/Export**: Backup and share your settings
- **Case Sensitivity**: Choose whether replacements are case-sensitive
- **Auto-save**: Settings are automatically saved as you type

## File Structure

```
ReplaceIt/
├── manifest.json          # Extension configuration
├── content.js            # Content script for text replacement
├── options.html          # Settings page HTML
├── options.css           # Settings page styles
├── options.js            # Settings page functionality
├── popup.html            # Popup interface HTML
├── popup.js              # Popup functionality
├── icons/                # Extension icons
└── README.md             # This file
```

## Technical Details

- **Manifest Version**: 3 (latest Chrome extension standard)
- **Permissions**: 
  - `storage` - Save user settings
  - `activeTab` - Access current tab for refresh functionality
  - `<all_urls>` - Replace text on all websites
- **Storage**: Uses Chrome's sync storage for cross-device settings
- **Performance**: Efficient DOM traversal with mutation observers
- **Compatibility**: Works with dynamically loaded content

## Settings Format

Settings are stored in JSON format. Example:

```json
[
  {
    "id": "pair_123456789",
    "find": "old text",
    "replace": "new text",
    "enabled": true
  },
  {
    "id": "pair_987654321",
    "find": "another word",
    "replace": "replacement",
    "enabled": false
  }
]
```

## Privacy

- All data is stored locally in your browser
- No data is sent to external servers
- Settings can be synced across your Chrome browsers if signed in
- No tracking or analytics

## Troubleshooting

### Text not being replaced?
- Check if the extension is enabled in the popup
- Verify the replacement pair is enabled
- Make sure the text matches exactly (check case sensitivity)
- Try refreshing the page

### Settings not saving?
- Check Chrome's storage permissions
- Try disabling and re-enabling the extension
- Clear browser cache and reload the extension

### Performance issues?
- Reduce the number of active replacement pairs
- Avoid very common words that might slow down processing
- Check for conflicting extensions

## Development

To modify or extend this extension:

1. Edit the relevant files
2. Go to `chrome://extensions/`
3. Click the refresh icon on the ReplaceIt extension
4. Test your changes

## Contributing

Feel free to submit issues, feature requests, or pull requests to improve this extension.

## License

This project is open source and available under the MIT License.

## Version History

- **v1.0** - Initial release with core functionality
  - Text replacement on all webpages
  - Settings page with import/export
  - Quick add popup interface
  - Auto-save functionality
