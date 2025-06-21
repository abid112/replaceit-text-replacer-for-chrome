// Options page JavaScript for ReplaceIt extension

document.addEventListener('DOMContentLoaded', function() {
    const pairsContainer = document.getElementById('pairsContainer');
    const emptyState = document.getElementById('emptyState');
    const addPairBtn = document.getElementById('addPair');
    const refreshSettingsBtn = document.getElementById('refreshSettings');
    const saveSettingsBtn = document.getElementById('saveSettings');
    const clearAllBtn = document.getElementById('clearAll');
    const resetSettingsBtn = document.getElementById('resetSettings');
    const importBtn = document.getElementById('importBtn');
    const exportBtn = document.getElementById('exportBtn');
    const caseSensitiveCheckbox = document.getElementById('caseSensitive');
    const statusDiv = document.getElementById('status');
    
    // Modal elements
    const importModal = document.getElementById('importModal');
    const importData = document.getElementById('importData');
    const confirmImportBtn = document.getElementById('confirmImport');
    const cancelImportBtn = document.getElementById('cancelImport');
    const closeModal = document.querySelector('.close');
    
    let replacementPairs = [];
    let originalSettings = {};
    let hasUnsavedChanges = false;
    let pairCounter = 0;
    
    // Load settings from storage
    function loadSettings() {
        chrome.storage.sync.get(['replacementPairs', 'caseSensitive'], function(result) {
            replacementPairs = result.replacementPairs || [];
            caseSensitiveCheckbox.checked = result.caseSensitive || false;

            // Store original settings for comparison
            originalSettings = {
                replacementPairs: JSON.parse(JSON.stringify(replacementPairs)),
                caseSensitive: caseSensitiveCheckbox.checked
            };

            renderPairs();
            updateSaveButtonState();
        });
    }
    
    // Save settings to storage
    function saveSettings() {
        const settings = {
            replacementPairs: replacementPairs,
            caseSensitive: caseSensitiveCheckbox.checked
        };

        chrome.storage.sync.set(settings, function() {
            // Update original settings after successful save
            originalSettings = {
                replacementPairs: JSON.parse(JSON.stringify(replacementPairs)),
                caseSensitive: caseSensitiveCheckbox.checked
            };

            hasUnsavedChanges = false;
            updateSaveButtonState();
            showStatus('Settings saved successfully!', 'success');
        });
    }

    // Check if current settings differ from original
    function hasChanges() {
        // Check if pairs are different
        if (JSON.stringify(replacementPairs) !== JSON.stringify(originalSettings.replacementPairs)) {
            return true;
        }

        // Check if checkbox is different
        if (caseSensitiveCheckbox.checked !== originalSettings.caseSensitive) {
            return true;
        }

        return false;
    }

    // Update save button state based on changes
    function updateSaveButtonState() {
        const hasChangesNow = hasChanges();
        saveSettingsBtn.disabled = !hasChangesNow;

        if (hasChangesNow) {
            saveSettingsBtn.innerHTML = '<span class="btn-icon">✓</span> Save Settings';
            saveSettingsBtn.title = 'Click to save your changes';
        } else {
            saveSettingsBtn.innerHTML = '<span class="btn-icon">✓</span> Saved';
            saveSettingsBtn.title = 'No changes to save';
        }
    }

    // Mark that changes have been made
    function markAsChanged() {
        hasUnsavedChanges = true;
        updateSaveButtonState();
    }

    // Refresh settings from storage
    function refreshSettings() {
        // Warn if there are unsaved changes
        if (hasChanges()) {
            if (!confirm('You have unsaved changes. Refreshing will discard them. Continue?')) {
                return;
            }
        }

        chrome.storage.sync.get(['replacementPairs', 'caseSensitive'], function(result) {
            replacementPairs = result.replacementPairs || [];
            caseSensitiveCheckbox.checked = result.caseSensitive || false;

            // Update original settings after refresh
            originalSettings = {
                replacementPairs: JSON.parse(JSON.stringify(replacementPairs)),
                caseSensitive: caseSensitiveCheckbox.checked
            };

            hasUnsavedChanges = false;
            renderPairs();
            updateSaveButtonState();
            showStatus('Settings refreshed from storage!', 'success');
        });
    }
    
    // Show status message
    function showStatus(message, type) {
        statusDiv.textContent = message;
        statusDiv.className = `status ${type}`;
        statusDiv.style.display = 'block';
        
        setTimeout(() => {
            statusDiv.style.display = 'none';
        }, 3000);
    }
    
    // Generate unique ID for pairs
    function generateId() {
        return 'pair_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }
    
    // Create a new replacement pair
    function createPair(find = '', replace = '', enabled = true, id = null) {
        const pair = {
            id: id || generateId(),
            find: find,
            replace: replace,
            enabled: enabled
        };
        
        return pair;
    }
    
    // Add new pair to the list
    function addPair(find = '', replace = '', enabled = true) {
        const pair = createPair(find, replace, enabled);
        replacementPairs.push(pair);
        renderPairs();
        markAsChanged();
    }

    // Remove pair from the list
    function removePair(id) {
        replacementPairs = replacementPairs.filter(pair => pair.id !== id);
        renderPairs();
        markAsChanged();
    }

    // Update pair in the list
    function updatePair(id, field, value) {
        const pair = replacementPairs.find(p => p.id === id);
        if (pair) {
            pair[field] = value;
            markAsChanged();
        }
    }
    
    // Render all pairs
    function renderPairs() {
        pairsContainer.innerHTML = '';
        
        if (replacementPairs.length === 0) {
            emptyState.style.display = 'block';
            return;
        }
        
        emptyState.style.display = 'none';
        
        replacementPairs.forEach((pair, index) => {
            const pairElement = createPairElement(pair, index + 1);
            pairsContainer.appendChild(pairElement);
        });
    }
    
    // Create HTML element for a pair
    function createPairElement(pair, number) {
        const div = document.createElement('div');
        div.className = 'replacement-pair';
        div.innerHTML = `
            <div class="pair-header">
                <span class="pair-number">Replacement #${number}</span>
                <div class="pair-controls">
                    <button class="btn btn-danger btn-small remove-pair" data-id="${pair.id}">
                        <span class="btn-icon">×</span> Remove
                    </button>
                </div>
            </div>
            <div class="pair-inputs">
                <div class="input-group">
                    <label>Find Text:</label>
                    <input type="text" class="find-input" data-id="${pair.id}" value="${pair.find}" placeholder="Text to find...">
                </div>
                <div class="input-group">
                    <label>Replace With:</label>
                    <input type="text" class="replace-input" data-id="${pair.id}" value="${pair.replace}" placeholder="Replacement text...">
                </div>
            </div>
            <div class="pair-options">
                <label>
                    <input type="checkbox" class="enabled-checkbox" data-id="${pair.id}" ${pair.enabled ? 'checked' : ''}>
                    Enabled
                </label>
            </div>
        `;
        
        return div;
    }
    
    // Event listeners
    addPairBtn.addEventListener('click', () => addPair());

    refreshSettingsBtn.addEventListener('click', refreshSettings);

    saveSettingsBtn.addEventListener('click', saveSettings);
    
    clearAllBtn.addEventListener('click', function() {
        if (confirm('Are you sure you want to clear all replacement pairs?')) {
            replacementPairs = [];
            renderPairs();
            markAsChanged();
            showStatus('All pairs cleared! Click Save to confirm.', 'success');
        }
    });

    resetSettingsBtn.addEventListener('click', function() {
        if (confirm('Are you sure you want to reset all settings to defaults?')) {
            replacementPairs = [];
            caseSensitiveCheckbox.checked = false;
            renderPairs();
            markAsChanged();
            showStatus('Settings reset to defaults! Click Save to confirm.', 'success');
        }
    });
    
    // Export functionality
    exportBtn.addEventListener('click', function() {
        const dataStr = JSON.stringify(replacementPairs, null, 2);
        const dataBlob = new Blob([dataStr], {type: 'application/json'});
        const url = URL.createObjectURL(dataBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'replaceit-settings.json';
        link.click();
        URL.revokeObjectURL(url);
        showStatus('Settings exported successfully!', 'success');
    });
    
    // Import functionality
    importBtn.addEventListener('click', () => {
        importModal.style.display = 'block';
        importData.value = '';
    });
    
    confirmImportBtn.addEventListener('click', function() {
        try {
            const data = JSON.parse(importData.value);
            if (Array.isArray(data)) {
                // Validate the data structure
                const validPairs = data.filter(pair => 
                    pair.hasOwnProperty('find') && 
                    pair.hasOwnProperty('replace')
                ).map(pair => createPair(
                    pair.find, 
                    pair.replace, 
                    pair.enabled !== false,
                    pair.id
                ));
                
                replacementPairs = validPairs;
                renderPairs();
                markAsChanged();
                importModal.style.display = 'none';
                showStatus(`Imported ${validPairs.length} replacement pairs! Click Save to confirm.`, 'success');
            } else {
                throw new Error('Invalid data format');
            }
        } catch (error) {
            showStatus('Invalid JSON data. Please check the format.', 'error');
        }
    });
    
    cancelImportBtn.addEventListener('click', () => {
        importModal.style.display = 'none';
    });
    
    closeModal.addEventListener('click', () => {
        importModal.style.display = 'none';
    });
    
    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target === importModal) {
            importModal.style.display = 'none';
        }
    });
    
    // Event delegation for dynamic elements
    pairsContainer.addEventListener('click', function(e) {
        if (e.target.classList.contains('remove-pair')) {
            const id = e.target.getAttribute('data-id');
            removePair(id);
        }
    });
    
    pairsContainer.addEventListener('input', function(e) {
        const id = e.target.getAttribute('data-id');
        if (e.target.classList.contains('find-input')) {
            updatePair(id, 'find', e.target.value);
        } else if (e.target.classList.contains('replace-input')) {
            updatePair(id, 'replace', e.target.value);
        }
    });

    pairsContainer.addEventListener('change', function(e) {
        if (e.target.classList.contains('enabled-checkbox')) {
            const id = e.target.getAttribute('data-id');
            updatePair(id, 'enabled', e.target.checked);
        }
    });
    
    // Add change detection to checkbox
    caseSensitiveCheckbox.addEventListener('change', markAsChanged);
    
    // Listen for storage changes from other parts of the extension (like popup)
    chrome.storage.onChanged.addListener(function(changes, namespace) {
        if (namespace === 'sync') {
            // Only auto-refresh if there are no unsaved changes
            if (!hasChanges()) {
                console.log('Options page: Auto-refreshing due to storage changes');
                refreshSettings();
            } else {
                // Show a notification that there are external changes
                showStatus('Settings changed externally. Click Refresh to load latest changes.', 'success');
            }
        }
    });

    // Warn user about unsaved changes
    window.addEventListener('beforeunload', function(e) {
        if (hasUnsavedChanges && hasChanges()) {
            e.preventDefault();
            e.returnValue = 'You have unsaved changes. Are you sure you want to leave?';
            return e.returnValue;
        }
    });

    // Initialize
    loadSettings();
});
