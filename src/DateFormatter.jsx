const userLocale = navigator.language || 'en-US';

const formatter = Intl.DateTimeFormat(userLocale, {
    month: "short",
    day: "2-digit",
    year: "numeric",
    hour: '2-digit',
    minute: '2-digit',
});

export function ISOToLocaleDateTimeString(date) {
    return formatter.format(new Date(date));
}