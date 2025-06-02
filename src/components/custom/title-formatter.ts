export function formatFileName(url: string): string {
    // Extract filename from URL and remove extension
    const fileName = url.split('/').pop()?.replace(/\.[^.]+$/, '') || 'Untitled';
    
    return fileName
        // Replace underscores and dashes with spaces
        .replace(/[_-]/g, ' ')
        // Split camelCase words
        .replace(/([a-z])([A-Z])/g, '$1 $2')
        // Capitalize first letter of each word
        .split(' ')
        .map((word) => 
            word.charAt(0).toUpperCase() + 
            word.slice(1).toLowerCase()
        )
        .join(' ')
        .trim();
}
export function formatSummaryText(text: string): string {
    // Remove markdown characters and clean up the text
    return text
      .replace(/\*\*/g, '') // Remove double asterisks
      .replace(/#{1,6}\s/g, '') // Remove heading markers
      .replace(/\*/g, '') // Remove single asterisks
      .replace(/\n/g, ' ') // Replace newlines with spaces
      .replace(/\s+/g, ' ') // Replace multiple spaces with single space
      .trim();
  } 