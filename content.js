// Content script for text replacement
(function() {
    'use strict';
    
    let replacementPairs = [];
    let isProcessing = false;
    
    // Load replacement pairs from storage
    function loadReplacements() {
        chrome.storage.sync.get(['replacementPairs'], function(result) {
            replacementPairs = result.replacementPairs || [];
            if (replacementPairs.length > 0) {
                performReplacements();
            }
        });
    }
    
    // Function to replace text in text nodes
    function replaceTextInNode(node) {
        if (node.nodeType === Node.TEXT_NODE) {
            let text = node.textContent;
            let originalText = text;
            
            // Apply all replacement pairs
            replacementPairs.forEach(pair => {
                if (pair.find && pair.replace && pair.enabled !== false) {
                    // Create regex with global flag for multiple replacements
                    const regex = new RegExp(escapeRegExp(pair.find), 'gi');
                    text = text.replace(regex, pair.replace);
                }
            });
            
            // Only update if text changed
            if (text !== originalText) {
                node.textContent = text;
            }
        }
    }
    
    // Escape special regex characters
    function escapeRegExp(string) {
        return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }
    
    // Walk through all text nodes in the document
    function walkTextNodes(node) {
        if (node.nodeType === Node.TEXT_NODE) {
            replaceTextInNode(node);
        } else {
            // Skip script and style elements
            if (node.tagName && (node.tagName.toLowerCase() === 'script' || 
                                node.tagName.toLowerCase() === 'style' ||
                                node.tagName.toLowerCase() === 'noscript')) {
                return;
            }
            
            // Process child nodes
            for (let i = 0; i < node.childNodes.length; i++) {
                walkTextNodes(node.childNodes[i]);
            }
        }
    }
    
    // Main function to perform all replacements
    function performReplacements() {
        if (isProcessing || replacementPairs.length === 0) {
            return;
        }
        
        isProcessing = true;
        
        try {
            walkTextNodes(document.body);
        } catch (error) {
            console.error('ReplaceIt: Error during text replacement:', error);
        } finally {
            isProcessing = false;
        }
    }
    
    // Observer for dynamic content changes
    const observer = new MutationObserver(function(mutations) {
        let shouldProcess = false;
        
        mutations.forEach(function(mutation) {
            if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
                // Check if any text nodes were added
                for (let node of mutation.addedNodes) {
                    if (node.nodeType === Node.TEXT_NODE || 
                        (node.nodeType === Node.ELEMENT_NODE && node.textContent)) {
                        shouldProcess = true;
                        break;
                    }
                }
            }
        });
        
        if (shouldProcess && replacementPairs.length > 0) {
            // Debounce the replacement to avoid excessive processing
            setTimeout(performReplacements, 100);
        }
    });
    
    // Start observing when DOM is ready
    function startObserving() {
        if (document.body) {
            observer.observe(document.body, {
                childList: true,
                subtree: true
            });
        }
    }
    
    // Listen for storage changes
    chrome.storage.onChanged.addListener(function(changes, namespace) {
        if (namespace === 'sync' && changes.replacementPairs) {
            replacementPairs = changes.replacementPairs.newValue || [];
            performReplacements();
        }
    });
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            loadReplacements();
            startObserving();
        });
    } else {
        loadReplacements();
        startObserving();
    }
    
})();
