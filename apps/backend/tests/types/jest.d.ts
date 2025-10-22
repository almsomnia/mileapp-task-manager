export {}

declare global {
   namespace jest {
      interface Matchers<R> {
         toEvery(expected: string | number | boolean): R
         toEvery(predicate: (value: any) => boolean): R
      }
   }
}
