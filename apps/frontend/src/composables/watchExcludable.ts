import {
   onBeforeUnmount,
   watch,
   type ComputedRef,
   type Ref,
   type WatchCallback,
   type WatchOptions,
} from "vue"

type WatchSource<T extends Record<PropertyKey, unknown>> =
   | Ref<T, any>
   | ComputedRef<T>
   | (() => T)
type MaybeUndefined<T, I> = I extends true ? T | undefined : T
type WatchExcludableOptions<
   T extends Record<PropertyKey, unknown>,
   I
> = WatchOptions<I> & {
   exclude?: (keyof T)[]
}

/**
 * This function is a custom watcher with field exclusion support.
 *
 * It wraps Vue's `watch()` function, but lets you exclude specific keys from triggering the watcher.
 *
 * @param source - The reactive source to watch. Can be a Ref, ComputedRef, or a function that returns an object.
 * @param cb - The callback function to execute when the source changes.
 * @param options - Optional configuration for the watcher. Includes standard options like `deep` and `immediate`, extended with `exclude`, an array of keys to exclude.
 */
export function watchExcludable<
   T extends Record<PropertyKey, unknown>,
   Immediate extends Readonly<boolean>
>(
   source: WatchSource<T>,
   cb: WatchCallback<T, MaybeUndefined<T, Immediate>>,
   options?: WatchExcludableOptions<T, Immediate>
) {
   /**
    * Filters the input object by removing any keys listed in `options.exclude`.
    */
   let prevFiltered: T | null = null
   const createFilteredObject = (obj: T) => {
      const filtered: Partial<T> = {}
      for (const key in obj) {
         if (!options?.exclude?.includes(key as any)) {
            filtered[key] = obj[key]
         }
      }
      const next = filtered as T

      if (prevFiltered) {
         let same = true
         for (const k in next)
            if (next[k] !== (prevFiltered as any)[k]) {
               same = false
               break
            }
         if (same) return prevFiltered // re-use reference → tidak trigger
      }
      prevFiltered = next
      return next
   }

   const { exclude, ...opts } = options || {}

   const unwatch = watch(
      () =>
         createFilteredObject(
            typeof source == "function" ? source() : source.value
         ),
      cb,
      { ...opts }
   )

   onBeforeUnmount(() => unwatch())
   return unwatch
}
