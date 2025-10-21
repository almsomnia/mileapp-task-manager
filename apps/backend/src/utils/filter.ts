export const filter = <T extends Record<string, any>, K extends keyof T>(
   data: T[],
   key: K,
   cb: (value: T[K]) => boolean
) => {
   return data.filter((d) => {
      return cb(d[key])
   })
}
