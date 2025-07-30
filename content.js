function randomizeFiles() {
  const fileListContainer = document.querySelector('[data-testid="file-tree"]') || 
                           document.querySelector('.js-diff-progressive-container') ||
                           document.querySelector('#files');
  
  if (!fileListContainer) {
    console.log('GitHub PR File Randomizer: File container not found');
    return;
  }

  const fileElements = Array.from(fileListContainer.children).filter(child => {
    return child.classList.contains('file') || 
           child.classList.contains('js-file') ||
           child.hasAttribute('data-file-path') ||
           child.querySelector('[data-file-path]');
  });

  if (fileElements.length === 0) {
    console.log('GitHub PR File Randomizer: No files found to randomize');
    return;
  }

  const shuffledFiles = [...fileElements].sort(() => Math.random() - 0.5);
  
  shuffledFiles.forEach(file => {
    fileListContainer.appendChild(file);
  });
  
  console.log(`GitHub PR File Randomizer: Randomized ${fileElements.length} files`);
}

function waitForFiles() {
  let debounceTimer;
  let lastFileCount = 0;
  let hasRandomized = false;
  
  const checkAndRandomize = () => {
    const fileListContainer = document.querySelector('[data-testid="file-tree"]') || 
                             document.querySelector('.js-diff-progressive-container') ||
                             document.querySelector('#files');
    
    if (!fileListContainer) return false;
    
    const fileElements = Array.from(fileListContainer.children).filter(child => {
      return child.classList.contains('file') || 
             child.classList.contains('js-file') ||
             child.hasAttribute('data-file-path') ||
             child.querySelector('[data-file-path]');
    });
    
    if (fileElements.length > 0 && fileElements.length === lastFileCount) {
      randomizeFiles();
      hasRandomized = true;
      return true;
    }
    
    lastFileCount = fileElements.length;
    return false;
  };
  
  const observer = new MutationObserver((mutations) => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      if (checkAndRandomize()) {
        observer.disconnect();
      }
    }, 300);
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true
  });

  setTimeout(() => {
    observer.disconnect();
    if (!hasRandomized) {
      randomizeFiles();
    }
  }, 10000);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', waitForFiles);
} else {
  waitForFiles();
}