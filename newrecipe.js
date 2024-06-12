async function generateImage(sentence) {
    const response = await fetch('/generate-image', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ sentence })
    });
    const data = await response.json();
    return data.url;
}
