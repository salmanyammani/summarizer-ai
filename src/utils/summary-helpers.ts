export const parseSection = (section: string): { title: string; points: string[] } => {
  // Split into lines and remove empty lines
  const lines = section.split('\n').filter(line => line.trim());

  // First line is the title - remove all markdown formatting
  const title = lines[0]
    .replace(/^#+\s*/, '') // Remove markdown headers
    .replace(/\*\*/g, '') // Remove bold markers
    .replace(/\*/g, '') // Remove italic markers
    .trim();

  // Process the rest of the lines for points
  const points: string[] = [];

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();

    // Skip empty lines and section headers
    if (!line || line.startsWith('##')) continue;

    // If line starts with - or •, it's a point
    if (line.startsWith('-') || line.startsWith('•')) {
      points.push(line);
    }
  }

  return { title, points };
};

export function parsePoint(point: string) {
  if (!point) return { isNumbered: false, isMainPoint: false, hasEmoji: false, isEmpty: true };

  const isNumbered = /^\d+\./.test(point);
  const isMainPoint = point.startsWith('-') || point.startsWith('•');
  const emojiRegex = /[\u{1F300}-\u{1F9FF}]|[\u{2600}-\u{26FF}]/u;
  const hasEmoji = emojiRegex.test(point);
  const isEmpty = !point.trim();

  return { isNumbered, isMainPoint, hasEmoji, isEmpty };
}

export function parseEmojiPoint(content: string) {
  if (!content) return null;

  // Remove the bullet point if present
  const cleanContent = content.replace(/^[-•]\s*/, "").trim();
  const matches = cleanContent.match(/^(\p{Emoji}+)\s*(.+)$/u);
  if (!matches) return null;

  const [_, emoji, text] = matches;
  return {
    emoji: emoji.trim(),
    text: text.trim(),
  };
}