document.addEventListener("DOMContentLoaded", function () {
  const channelsContainer = document.getElementById("channels-container");
  const searchInput = document.getElementById("search-input");
  const categoryFilter = document.getElementById("category-filter");
  const darkModeSwitch = document.getElementById("darkModeSwitch");
  let darkModeEnabled = true; // Dark mode enabled by default
  let channelsData = []; // To store the fetched JSON data

  // Fetch JSON data from file
  fetch("channels.json")
    .then((response) => response.json())
    .then((data) => {
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
    .catch((error) => console.error("Error fetching JSON:", error));

  // Function to display channels based on filters
  function handleFilters() {
    const searchTerm = searchInput.value.toLowerCase();
    const selectedCategory = categoryFilter.value.toLowerCase();
    const filteredChannels = channelsData.channels.filter(
      (channel) =>
        (channel.name.toLowerCase().includes(searchTerm) ||
          searchTerm === "") &&
        (channel.category.toLowerCase().includes(selectedCategory) ||
          selectedCategory === "")
    );
    displayChannels(filteredChannels);
    updateTheme();
  }

  // Function to display channels
  function displayChannels(channels) {
    channelsContainer.innerHTML = "";
    channels.forEach((channel) => {
      const tile = document.createElement("div");
      tile.className =
        "channel-tile group h-64 h-max-64 w-64 w-max-64 p-4 bg-white rounded-lg shadow-md hover:bg-gray-100 cursor-pointer transition-colors duration-300";
      tile.innerHTML = `<img src="${channel.image}" alt="${channel.name}" class="w-full h-4/5 object-cover object-center rounded-t-lg">
                              <p class="mt-2 text-center text-lg group-hover:text-slate-500 font-semibold">${channel.name}</p>`;
      tile.addEventListener("click", function () {
        window.open(channel.url, "_blank");
      });
      channelsContainer.appendChild(tile);
    });
  }

  // Alternate function to display channels with iframe
  // function displayChannels(channels) {
  //     channelsContainer.innerHTML = "";
  //     channels.forEach(channel => {
  //         const tile = document.createElement("div");
  //         tile.className = "channel-tile p-4 bg-white rounded-lg shadow-md hover:bg-gray-100 cursor-pointer transition-colors duration-300";
  //         tile.innerHTML = `<img src="${channel.image}" alt="${channel.name}" class="w-full h-32 object-cover rounded-t-lg">
  //                           <p class="mt-2 text-center text-lg font-semibold">${channel.name}</p>`;
  //         tile.addEventListener("click", function () {
  //             // Create an iframe element
  //             const iframe = document.createElement("iframe");
  //             iframe.src = channel.url;
  //             iframe.className = "w-full h-96 border-none mt-4";
  //             iframe.allowFullscreen = true;
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
    const uniqueCategories = [
      ...new Set(channels.map((channel) => channel.category)),
    ];
    uniqueCategories.forEach((category) => {
      const option = document.createElement("option");
      option.value = category.toLowerCase();
      option.text = category[0].toUpperCase() + category.slice(1);
      option.classList.add("text-black");
      categoryFilter.add(option);
    });
  }

  // Function to update theme
  function updateTheme() {
    const body = document.body;
    body.classList.toggle("bg-gray-900", darkModeEnabled);
    body.classList.toggle("text-white", darkModeEnabled);
    body.classList.toggle("bg-white", !darkModeEnabled);
    body.classList.toggle("text-black", !darkModeEnabled);

    const channelTiles = document.querySelectorAll(".channel-tile");
    channelTiles.forEach((tile) => {
      tile.classList.toggle("bg-gray-800", darkModeEnabled);
      tile.classList.toggle("text-white", darkModeEnabled);
      tile.classList.toggle("bg-white", !darkModeEnabled);
      tile.classList.toggle("text-black", !darkModeEnabled);
    });
  }
});
