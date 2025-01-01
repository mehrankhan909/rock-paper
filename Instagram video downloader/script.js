document.getElementById('downloadBtn').addEventListener('click', async () => {
    const url = document.getElementById('videoUrl').value.trim();
    const resultDiv = document.getElementById('result');
    const loadingDiv = document.getElementById('loading');

    // Check if the URL is provided
    if (!url) {
        resultDiv.innerHTML = 'Please enter a valid Instagram video URL.';
        return;
    }

    let videoUrl;

    // Show loading state
    loadingDiv.style.display = 'block';

    try {
        // Wait for 2 seconds
        await new Promise(resolve => setTimeout(resolve, 2000));

        // Construct the API URL with the user-provided Instagram URL
        const apiUrl = `https://instagram-downloader-download-instagram-videos-stories1.p.rapidapi.com/get-info-rapidapi?url=${encodeURIComponent(url)}`;
        const options = {
            method: 'GET',
            headers: {
                'x-rapidapi-key': '575b796a35msh9541963e73d64d9p1f6679jsn90f60b7bcc1a',
		        'x-rapidapi-host': 'instagram-downloader-download-instagram-videos-stories1.p.rapidapi.com'
            }
        };
        // Fetch the video URL using the specified API
        const response = await fetch(apiUrl, options);
        
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        // Parse the JSON response
        const data = await response.json();
        
        videoUrl = data.download_url; // Assuming the API returns the video URL in this format

        // Check if the video URL is available
        if (videoUrl) {
            resultDiv.innerHTML = `<a href="${videoUrl}" download class="welcome">Video is ready &#9829</a>`;
        } else {
            resultDiv.innerHTML = 'Video URL not found.';
        }
    } catch (error) {
        resultDiv.innerHTML = 'Error fetching video: ' + error.message;
    } finally {
        // Hide loading state
        loadingDiv.style.display = 'none';
    }
});