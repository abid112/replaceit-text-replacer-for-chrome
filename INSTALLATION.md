# Installation Guide - ReplaceIt Chrome Extension

## Quick Installation Steps

### 1. Download the Extension
- Download all the files from this repository
- Make sure you have all these files in one folder:
  - `manifest.json`
  - `content.js`
  - `options.html`
  - `options.css`
  - `options.js`
  - `popup.html`
  - `popup.js`
  - `icons/` folder (optional, for custom icons)

### 2. Install in Chrome
1. Open Google Chrome
2. Go to `chrome://extensions/` (type this in the address bar)
3. Enable **Developer mode** by clicking the toggle in the top-right corner
4. Click **"Load unpacked"** button
5. Select the folder containing all the extension files
6. The extension should now appear in your extensions list

### 3. Verify Installation
- Look for the ReplaceIt icon in your browser toolbar
- If you don't see it, click the puzzle piece icon and pin ReplaceIt
- Click the extension icon to open the popup

## First Time Setup

### 1. Add Your First Replacement Pair
1. Click the ReplaceIt extension icon
2. In the popup, enter:
   - **Find text**: "Hello"
   - **Replace with**: "Hi"
3. Click **"Add Pair"**

### 2. Test the Extension
1. Open the included `test.html` file in Chrome
2. You should see "Hello" replaced with "Hi" throughout the page
3. If not working, try refreshing the page

### 3. Access Full Settings
1. Click **"Open Settings"** in the popup, or
2. Right-click the extension icon and select **"Options"**
3. Here you can:
   - Add multiple replacement pairs
   - Enable/disable individual pairs
   - Import/export settings
   - Configure global options

## Troubleshooting

### Extension Not Loading
- Make sure all files are in the same folder
- Check that `manifest.json` is present and valid
- Try refreshing the extensions page (`chrome://extensions/`)

### Text Not Being Replaced
- Verify the extension is enabled (check the popup)
- Make sure your replacement pairs are enabled
- Check case sensitivity settings
- Try refreshing the webpage

### Popup Not Opening
- Make sure the extension is properly installed
- Check if there are any errors in the Chrome console
- Try reloading the extension

### Settings Not Saving
- Check Chrome's storage permissions
- Make sure you're not in incognito mode (unless extension is enabled for incognito)
- Try clearing browser cache

## Advanced Configuration

### Custom Icons (Optional)
If you want custom icons, add these files to the `icons/` folder:
- `icon16.png` (16x16 pixels)
- `icon48.png` (48x48 pixels)  
- `icon128.png` (128x128 pixels)

### Permissions Explained
The extension requires these permissions:
- **Storage**: To save your replacement pairs and settings
- **Active Tab**: To refresh the current page from the popup
- **All URLs**: To replace text on all websites you visit

## Usage Tips

### Effective Replacement Pairs
- Start with simple, unique words
- Avoid very common words that might slow down the browser
- Use the case sensitivity option when needed
- Test replacements on the included test page first

### Managing Multiple Pairs
- Use the settings page for complex configurations
- Export your settings as backup
- Disable pairs temporarily instead of deleting them
- Group related replacements logically

### Performance Considerations
- Limit the number of active replacement pairs (recommended: under 50)
- Avoid replacing very short words (1-2 characters)
- Use specific phrases rather than common words when possible

## Uninstalling

To remove the extension:
1. Go to `chrome://extensions/`
2. Find ReplaceIt in the list
3. Click **"Remove"**
4. Confirm the removal

Your settings will be deleted when you uninstall the extension.

## Getting Help

If you encounter issues:
1. Check this installation guide
2. Try the troubleshooting steps above
3. Test with the included `test.html` file
4. Check the browser console for error messages
5. Try reinstalling the extension

## Next Steps

Once installed successfully:
- Explore the settings page to see all features
- Try importing/exporting settings
- Test with different websites
- Customize replacement pairs for your needs

Happy text replacing! 🔄
