const supply0 = (num: number) => (num < 10 ? `0${num}` : `${num}`)

export const timestampToDate = (time: number) => {
    const date = new Date(time)
    const Y = `${date.getFullYear()}-`
    const M = `${supply0(date.getMonth() + 1)}-`
    const D = supply0(date.getDate())
    const h = supply0(date.getHours())
    const m = supply0(date.getMinutes())
    return Y + M + D + ` ${h}:${m}`
}
