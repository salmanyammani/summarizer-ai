export function formatTimeAgo(timestamp: string): string {
  // Parse the timestamp (handling various formats)
  const date = new Date(timestamp);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  // Time intervals in seconds
  const intervals = {
    year: 31536000,
    month: 2592000,
    week: 604800,
    day: 86400,
    hour: 3600,
    minute: 60,
  };

  // Calculate time difference
  for (const [unit, seconds] of Object.entries(intervals)) {
    const interval = Math.floor(diffInSeconds / seconds);
    if (interval >= 1) {
      return new Intl.RelativeTimeFormat("en", { numeric: "auto" })
        .format(-interval, unit as Intl.RelativeTimeFormatUnit)
        // .replace(" ago", "");
    }
  }

  return "Just now";
}
