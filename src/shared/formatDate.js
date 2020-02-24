export default function toLocalDateString(eventDate) {
    let dd = eventDate.getDate();
    let mm = eventDate.getMonth() + 1;
    const yyyy = eventDate.getFullYear();
    if (dd < 10) {
        dd = '0' + dd;
    }
    if (mm < 10) {
        mm = '0' + mm;
    }
    return `${dd}.${mm}.${yyyy}`;
}