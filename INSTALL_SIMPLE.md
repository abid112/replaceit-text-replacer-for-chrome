# Simple Installation Guide - ReplaceIt Extension

## ⚡ Quick Install (3 Steps)

### Step 1: Download Files
Create a new folder on your Desktop called "ReplaceIt" and make sure it contains these files:
```
ReplaceIt/
├── manifest.json
├── content.js
├── options.html
├── options.css
├── options.js
├── popup.html
└── popup.js
```

### Step 2: Open Chrome Extensions
1. Open Google Chrome
2. Type `chrome://extensions/` in the address bar and press Enter
3. Turn ON "Developer mode" (toggle switch in top-right corner)

### Step 3: Install Extension
1. Click "Load unpacked" button
2. Select your "ReplaceIt" folder
3. Click "Select Folder"

✅ **Done!** The extension should now appear in your browser toolbar.

---

## 🔧 If Installation Fails

### Problem: "Failed to load extension"
**Solution:** Check that all 7 files are in the same folder and try again.

### Problem: "Manifest file is missing"
**Solution:** Make sure `manifest.json` is in the root of your folder (not in a subfolder).

### Problem: "Package is invalid"
**Solution:** 
1. Delete the ReplaceIt folder
2. Create a new folder
3. Copy all files again
4. Try installation again

### Problem: Extension loads but doesn't work
**Solution:**
1. Click the ReplaceIt icon in your toolbar
2. Add a test replacement: "hello" → "hi"
3. Go to any website and refresh the page
4. If "hello" doesn't change to "hi", check the troubleshooting guide

---

## 🧪 Quick Test

1. **Add a replacement:**
   - Click the ReplaceIt icon
   - Enter "Google" in "Find text"
   - Enter "Search Engine" in "Replace with"
   - Click "Add Pair"

2. **Test it:**
   - Go to google.com
   - Refresh the page
   - "Google" should now show as "Search Engine"

---

## 📁 File Checklist

Before installing, verify you have these exact files:

- [ ] `manifest.json` (extension configuration)
- [ ] `content.js` (does the text replacement)
- [ ] `options.html` (settings page)
- [ ] `options.css` (settings page styling)
- [ ] `options.js` (settings page functionality)
- [ ] `popup.html` (popup interface)
- [ ] `popup.js` (popup functionality)

**Missing any files?** Re-download them from the source.

---

## 🆘 Still Not Working?

### Try This:
1. **Use a different folder location** (try Documents instead of Desktop)
2. **Restart Chrome completely** (close all windows, reopen)
3. **Check Chrome version** (go to chrome://settings/help - need version 88+)
4. **Try incognito mode** (right-click extension → "Allow in incognito")

### Common Mistakes:
- ❌ Installing individual files instead of the folder
- ❌ Having files in subfolders
- ❌ Missing the manifest.json file
- ❌ Not enabling Developer mode
- ❌ Using an outdated Chrome version

---

## ✅ Success Indicators

You'll know it worked when:
- Extension appears in chrome://extensions/
- ReplaceIt icon shows in your toolbar
- Clicking the icon opens a popup
- Text replacement works on websites

**Need more help?** Check the detailed TROUBLESHOOTING.md file.
