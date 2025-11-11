// Search and filter functionality
(function() {
    'use strict';

    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    function init() {
        const searchInput = document.getElementById('search-input');
        const pagesGrid = document.getElementById('pages-grid');
        const noResults = document.getElementById('no-results');
        const resultsInfo = document.getElementById('search-results');
        const tagFiltersContainer = document.getElementById('tag-filters');

        // Exit if not on homepage
        if (!searchInput || !pagesGrid) {
            return;
        }

        const pageCards = Array.from(pagesGrid.querySelectorAll('.page-card'));
        let currentTag = 'all';
        let currentSearchTerm = '';

        // Initialize tag filters
        initTagFilters();

        // Search input handler
        searchInput.addEventListener('input', function(e) {
            currentSearchTerm = e.target.value.toLowerCase().trim();
            filterPages();
        });

        // Initialize tag filter buttons
        function initTagFilters() {
            if (!window.pagesData || !tagFiltersContainer) {
                return;
            }

            // Collect all unique tags
            const allTags = new Set();
            window.pagesData.forEach(function(page) {
                if (page.tags && Array.isArray(page.tags)) {
                    page.tags.forEach(function(tag) {
                        allTags.add(tag);
                    });
                }
            });

            // Sort tags alphabetically
            const sortedTags = Array.from(allTags).sort();

            // Create tag filter buttons
            sortedTags.forEach(function(tag) {
                const button = document.createElement('button');
                button.className = 'filter-tag';
                button.textContent = tag;
                button.dataset.tag = tag.toLowerCase();
                button.addEventListener('click', function() {
                    handleTagClick(tag.toLowerCase());
                });
                tagFiltersContainer.appendChild(button);
            });
        }

        // Handle tag filter click
        function handleTagClick(tag) {
            currentTag = tag;

            // Update active state on buttons
            const allFilterButtons = tagFiltersContainer.querySelectorAll('.filter-tag');
            allFilterButtons.forEach(function(btn) {
                btn.classList.remove('active');
                if (btn.dataset.tag === tag) {
                    btn.classList.add('active');
                }
            });

            filterPages();
        }

        // Main filter function
        function filterPages() {
            let visibleCount = 0;

            pageCards.forEach(function(card) {
                const title = card.dataset.title || '';
                const tags = card.dataset.tags || '';
                const description = card.dataset.description || '';

                // Check if matches search term
                const matchesSearch = !currentSearchTerm ||
                    title.includes(currentSearchTerm) ||
                    description.includes(currentSearchTerm);

                // Check if matches tag filter
                const matchesTag = currentTag === 'all' ||
                    tags.split(',').some(function(tag) {
                        return tag.trim() === currentTag;
                    });

                // Show or hide card
                if (matchesSearch && matchesTag) {
                    card.style.display = '';
                    visibleCount++;
                } else {
                    card.style.display = 'none';
                }
            });

            // Update results info and no-results message
            updateResultsDisplay(visibleCount);
        }

        // Update results display
        function updateResultsDisplay(visibleCount) {
            const totalCount = pageCards.length;

            if (visibleCount === 0) {
                noResults.style.display = 'block';
                pagesGrid.style.display = 'none';
                resultsInfo.style.display = 'none';
            } else {
                noResults.style.display = 'none';
                pagesGrid.style.display = 'grid';

                // Show results info if filtering is active
                if (currentSearchTerm || currentTag !== 'all') {
                    resultsInfo.style.display = 'block';
                    resultsInfo.textContent = 'Showing ' + visibleCount + ' of ' + totalCount + ' pages';
                } else {
                    resultsInfo.style.display = 'none';
                }
            }
        }

        // Handle "All" tag button click
        const allButton = tagFiltersContainer.querySelector('[data-tag="all"]');
        if (allButton) {
            allButton.addEventListener('click', function() {
                handleTagClick('all');
            });
        }
    }
})();
