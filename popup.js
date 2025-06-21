// Popup JavaScript for ReplaceIt extension

document.addEventListener('DOMContentLoaded', function() {
    const pairsCountDiv = document.getElementById('pairsCount');
    const quickFindInput = document.getElementById('quickFind');
    const quickReplaceInput = document.getElementById('quickReplace');
    const addQuickPairBtn = document.getElementById('addQuickPair');
    const openOptionsBtn = document.getElementById('openOptions');
    const refreshPageBtn = document.getElementById('refreshPage');
    
    let replacementPairs = [];
    
    // Load current settings
    function loadSettings() {
        chrome.storage.sync.get(['replacementPairs'], function(result) {
            replacementPairs = result.replacementPairs || [];
            updateUI();
        });
    }
    
    // Update UI elements
    function updateUI() {
        const count = replacementPairs.length;
        pairsCountDiv.textContent = `${count} replacement pair${count !== 1 ? 's' : ''} configured`;
    }
    
    // Save settings
    function saveSettings() {
        chrome.storage.sync.set({
            replacementPairs: replacementPairs
        });
    }
    
    // Generate unique ID
    function generateId() {
        return 'pair_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }
    
    // Add quick pair
    function addQuickPair() {
        const findText = quickFindInput.value.trim();
        const replaceText = quickReplaceInput.value.trim();
        
        if (!findText) {
            showTempStatus('Please enter text to find', 'error');
            return;
        }
        
        // Check if pair already exists
        const existingPair = replacementPairs.find(pair => 
            pair.find.toLowerCase() === findText.toLowerCase()
        );
        
        if (existingPair) {
            showTempStatus('This replacement already exists', 'warning');
            return;
        }
        
        // Add new pair
        const newPair = {
            id: generateId(),
            find: findText,
            replace: replaceText,
            enabled: true
        };
        
        replacementPairs.push(newPair);
        saveSettings();
        
        // Clear inputs
        quickFindInput.value = '';
        quickReplaceInput.value = '';
        
        // Update UI
        updateUI();
        showTempStatus('Pair added successfully!', 'success');
        
        // Focus back to find input
        quickFindInput.focus();
    }
    
    // Show temporary status message
    function showTempStatus(message, type) {
        const originalText = statusDiv.textContent;
        const originalBg = statusDiv.style.background;
        
        statusDiv.textContent = message;
        
        switch(type) {
            case 'success':
                statusDiv.style.background = 'rgba(72, 187, 120, 0.4)';
                break;
            case 'error':
                statusDiv.style.background = 'rgba(245, 101, 101, 0.4)';
                break;
            case 'warning':
                statusDiv.style.background = 'rgba(237, 137, 54, 0.4)';
                break;
        }
        
        setTimeout(() => {
            statusDiv.textContent = originalText;
            statusDiv.style.background = originalBg;
        }, 2000);
    }
    
    // Event listeners
    addQuickPairBtn.addEventListener('click', addQuickPair);
    
    // Allow Enter key to add pair
    quickReplaceInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            addQuickPair();
        }
    });
    
    quickFindInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            quickReplaceInput.focus();
        }
    });
    
    // Open options page function
    function openOptionsPage() {
        chrome.runtime.openOptionsPage();
        window.close();
    }

    // Open options page
    openOptionsBtn.addEventListener('click', openOptionsPage);
    
    // Refresh current page
    refreshPageBtn.addEventListener('click', function() {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.reload(tabs[0].id);
            showTempStatus('Page refreshed!', 'success');
            setTimeout(() => window.close(), 1000);
        });
    });
    
    // Initialize
    loadSettings();
    
    // Focus on find input when popup opens
    setTimeout(() => {
        quickFindInput.focus();
    }, 100);
});
