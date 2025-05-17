
const getLocaleWeekdays = () => {
    return weekdays;

    /*return [
        langFn("Weekday.Sunday"), langFn("Weekday.Monday"),
        langFn("Weekday.Tuesday"), langFn("Weekday.Wednesday"),
        langFn("Weekday.Thursday"), langFn("Weekday.Friday"),
        langFn("Weekday.Saturday")
    ];*/
}

const weekdays = [
    "Sunday", "Monday", "Tuesday",
    "Wednesday", "Thursday", "Friday",
    "Saturday"
]

const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
];

export function getTime(timestamp: number | Date) {
    const date = new Date(timestamp);
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return `${hours}:${minutes}`;
}

export function getDayStart(timestamp: number | Date) {
    const date = new Date(timestamp);
    date.setHours(0, 0, 0, 0);

    return date;
}

export function getDateLocaleString(date: Date | number, hasYear = true, hasFullMonth = true) {
    return new Date(date).toLocaleString("en-US", {
        year: hasYear ? "numeric" : undefined,
        month: hasFullMonth ? "long" : "short",
        day: "numeric"
    });
}

export function getShort(str: string) {
    
    return str.substring(0, 3);
}

export function getFlexDate(timestamp: number | Date, noTime?: boolean) {
    const localeWeekdays = getLocaleWeekdays();

    const date = new Date(timestamp);
    const dateStart = getDayStart(date);

    const today = getDayStart(new Date());
    if (dateStart.getTime() == today.getTime()) return noTime ? "Today" : getTime(timestamp);

    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
    if (dateStart.getTime() == yesterday.getTime()) return "Yesterday";

    const weekAgo = new Date(today);
    weekAgo.setDate(today.getDate() - 7);
    if (date >= weekAgo) return noTime ? localeWeekdays[date.getDay()] : getShort(weekdays[date.getDay()]);

    const hasYear = date.getFullYear() !== today.getFullYear();
    return getDateLocaleString(timestamp, hasYear, noTime);
}

export const upperFirst = (str: string) => {
  return `${str[0].toUpperCase()}${str.slice(1)}`;
}