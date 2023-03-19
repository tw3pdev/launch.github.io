export const rand = () => {
    const months = ["bg1", "bg2", "bg3", "bg4"];
    const random = Math.floor(Math.random() * months.length);
    return random + 1
}