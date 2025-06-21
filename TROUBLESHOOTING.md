# Installation Troubleshooting Guide

## Common Installation Issues and Solutions

### Issue 1: "Failed to load extension" Error

**Symptoms:**
- Chrome shows an error when trying to load the extension
- Extension doesn't appear in the extensions list

**Solutions:**
1. **Check file structure** - Make sure all these files are in the same folder:
   ```
   ✅ manifest.json
   ✅ content.js
   ✅ options.html
   ✅ options.css
   ✅ options.js
   ✅ popup.html
   ✅ popup.js
   ```

2. **Verify manifest.json** - Open manifest.json and check for:
   - Valid JSON syntax (no missing commas or brackets)
   - All referenced files exist
   - No extra characters or formatting issues

3. **Check file permissions** - Make sure Chrome can read all files:
   - Files should not be read-only
   - Folder should not be in a restricted location

### Issue 2: "Manifest file is missing or unreadable" Error

**Solutions:**
1. Make sure `manifest.json` is in the root folder
2. Check that the file is not corrupted
3. Verify JSON syntax using an online JSON validator

### Issue 3: Extension Loads but Doesn't Work

**Symptoms:**
- Extension appears in Chrome but text replacement doesn't work
- Popup opens but settings don't save

**Solutions:**
1. **Check permissions:**
   - Go to `chrome://extensions/`
   - Find ReplaceIt extension
   - Make sure it has permission to access all sites

2. **Test on a simple page:**
   - Open the included `test.html` file
   - Add a simple replacement like "Hello" → "Hi"
   - Refresh the page

3. **Check browser console:**
   - Press F12 on any webpage
   - Look for error messages in the Console tab
   - Look for messages starting with "ReplaceIt:"

### Issue 4: "Developer mode" Not Available

**Solutions:**
1. Make sure you're using Google Chrome (not Edge, Firefox, etc.)
2. Update Chrome to the latest version
3. Check if your organization has disabled developer mode
4. Try using Chrome Canary if regular Chrome doesn't work

## Step-by-Step Installation (Detailed)

### Method 1: Standard Installation

1. **Download Files:**
   - Save all extension files to a new folder
   - Example: `C:\Users\YourName\Desktop\ReplaceIt\`

2. **Open Chrome Extensions:**
   - Type `chrome://extensions/` in address bar
   - OR: Menu → More Tools → Extensions

3. **Enable Developer Mode:**
   - Look for toggle switch in top-right corner
   - Click to enable (should turn blue/green)

4. **Load Extension:**
   - Click "Load unpacked" button
   - Navigate to your ReplaceIt folder
   - Select the folder (not individual files)
   - Click "Select Folder" or "Open"

5. **Verify Installation:**
   - Extension should appear in the list
   - Look for ReplaceIt icon in browser toolbar
   - If not visible, click puzzle piece icon and pin it

### Method 2: Alternative Installation

If Method 1 doesn't work:

1. **Create a new folder** on your Desktop called "ReplaceIt"
2. **Copy each file individually** into this folder
3. **Double-check** that manifest.json opens and looks correct
4. **Try installation** again using Method 1

### Method 3: ZIP File Method

1. **Create a ZIP file** containing all extension files
2. **Extract the ZIP** to a new location
3. **Follow Method 1** using the extracted folder

## Testing Your Installation

### Quick Test:
1. Click the ReplaceIt icon
2. Add: Find "test" → Replace "demo"
3. Open `test.html` file
4. You should see "test" changed to "demo"

### Advanced Test:
1. Go to any website (like google.com)
2. Add: Find "Google" → Replace "Search Engine"
3. Refresh the page
4. "Google" should be replaced with "Search Engine"

## Common Error Messages

### "Package is invalid"
- **Cause:** Missing or corrupted manifest.json
- **Fix:** Re-download manifest.json file

### "Could not load manifest"
- **Cause:** JSON syntax error in manifest.json
- **Fix:** Check for missing commas, brackets, or quotes

### "Permissions warnings"
- **Cause:** Extension needs broad permissions
- **Fix:** This is normal - click "Add extension" to continue

### "Extension failed to install"
- **Cause:** File access issues
- **Fix:** Move folder to Desktop and try again

## Still Having Issues?

### Check These:

1. **Chrome Version:**
   - Go to `chrome://settings/help`
   - Make sure you have Chrome 88+ (for Manifest V3)

2. **File Locations:**
   - Don't install from Downloads folder
   - Use Desktop or Documents folder instead

3. **Antivirus Software:**
   - Some antivirus programs block extension installation
   - Temporarily disable and try again

4. **Corporate/School Networks:**
   - Some organizations block extension installation
   - Try from a personal computer/network

### Reset and Try Again:

1. **Remove any partial installation:**
   - Go to `chrome://extensions/`
   - Remove any failed ReplaceIt installations

2. **Clear Chrome cache:**
   - Go to `chrome://settings/clearBrowserData`
   - Clear cached files

3. **Restart Chrome completely**

4. **Try installation again**

## Success Indicators

You'll know it's working when:
- ✅ Extension appears in `chrome://extensions/`
- ✅ ReplaceIt icon visible in toolbar
- ✅ Popup opens when clicking icon
- ✅ Settings page opens from popup
- ✅ Text replacement works on test.html

## Getting Help

If none of these solutions work:
1. Note the exact error message
2. Check which step fails
3. Try on a different computer if possible
4. Make sure you have the latest Chrome version

The extension should work on any modern Chrome browser with these files!
