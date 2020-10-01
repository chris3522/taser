export const dayKey = (date) =>
{
    const month = new Date(date).getMonth()
    const year = new Date(date).getFullYear()
    const day = new Date(date).getDate()
    return  `${year}${month}${day}` 
}