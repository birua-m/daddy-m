document.addEventListener("DOMContentLoaded", function () {
    const channelsContainer = document.getElementById("channels-container");
    const searchInput = document.getElementById("search-input");
    const categoryFilter = document.getElementById("category-filter");
    const darkModeSwitch = document.getElementById("darkModeSwitch");
    let darkModeEnabled = true; // Dark mode enabled by default
    let channelsData = []; // To store the fetched JSON data

    // Fetch JSON data from file
    fetch('channels.json')
        .then(response => response.json())
        .then(data => {
            channelsData = data;
            // Display initial channels
            displayChannels(channelsData.channels);
            // Populate categories in the filter
            populateCategories(channelsData.channels);

            // Handle search input
            searchInput.addEventListener("input", handleFilters);

            // Handle category filter
            categoryFilter.addEventListener("change", handleFilters);

            // Toggle dark mode
            darkModeSwitch.addEventListener("change", function () {
                darkModeEnabled = darkModeSwitch.checked;
                updateTheme();
            });

            // Set dark mode initially
            updateTheme();
        })
        .catch(error => console.error('Error fetching JSON:', error));

    // Function to display channels based on filters
    function handleFilters() {
        const searchTerm = searchInput.value.toLowerCase();
        const selectedCategory = categoryFilter.value.toLowerCase();
        const filteredChannels = channelsData.channels.filter(channel =>
            (channel.name.toLowerCase().includes(searchTerm) || searchTerm === "") &&
            (channel.category.toLowerCase().includes(selectedCategory) || selectedCategory === "")
        );
        displayChannels(filteredChannels);
    }

    // Function to display channels
    function displayChannels(channels) {
        channelsContainer.innerHTML = "";
        channels.forEach(channel => {
            const tile = document.createElement("div");
            tile.className = "channel-tile";
            tile.innerHTML = `<img src="${channel.image}" alt="${channel.name}">
                              <p>${channel.name}</p>`;
            tile.addEventListener("click", function () {
                window.open(channel.url, "_blank");
            });
            channelsContainer.appendChild(tile);
        });
    }
    // Function to display channels
// function displayChannels(channels) {
//     channelsContainer.innerHTML = "";
//     channels.forEach(channel => {
//         const tile = document.createElement("div");
//         tile.className = "channel-tile";
//         tile.innerHTML = `<img src="${channel.image}" alt="${channel.name}">
//                           <p>${channel.name}</p>`;
//         tile.addEventListener("click", function () {
//             // Create an iframe element
//             const iframe = document.createElement("iframe");
//             iframe.src = channel.url;
//             iframe.style.width = "100%";
//             iframe.style.height = "800px";
//             iframe.style.border = "none";
//             iframe.style.padding = "1rem";
//             iframe.allowFullscreen = "";
//             iframe.scrolling = "no";

//             // Update the hero section with the iframe
//             const heroSection = document.getElementById('hero-section');
//             heroSection.innerHTML = "";
//             heroSection.appendChild(iframe);
//         });
//         channelsContainer.appendChild(tile);
//     });
// }


    // Function to populate categories in the filter
    function populateCategories(channels) {
        const uniqueCategories = [...new Set(channels.map(channel => channel.category))];
        uniqueCategories.forEach(category => {
            const option = document.createElement("option");
            option.value = category.toLowerCase();
            option.text = category[0].toUpperCase()+category.slice(1);
            categoryFilter.add(option);
        });
    }

    // Function to update theme
    function updateTheme() {
        const body = document.body;
        body.style.backgroundColor = darkModeEnabled ? "#141414" : "#fff";
        body.style.color = darkModeEnabled ? "#fff" : "#000";

        const channelTiles = document.querySelectorAll(".channel-tile");
        channelTiles.forEach(tile => {
            tile.style.backgroundColor = darkModeEnabled ? "#1f1f1f" : "#fff";
            tile.style.borderColor = darkModeEnabled ? "#333" : "#ddd";
        });
    }
});
