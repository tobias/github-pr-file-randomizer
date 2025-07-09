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
  const observer = new MutationObserver((mutations) => {
    const hasFiles = document.querySelector('[data-testid="file-tree"]') || 
                    document.querySelector('.js-diff-progressive-container') ||
                    document.querySelector('#files');
    
    if (hasFiles) {
      randomizeFiles();
      observer.disconnect();
    }
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true
  });

  setTimeout(() => {
    observer.disconnect();
    randomizeFiles();
  }, 5000);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', waitForFiles);
} else {
  waitForFiles();
}