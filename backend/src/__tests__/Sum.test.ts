import { sumOfTwoNumbers } from '../fizzBuzz'

test('Sum of two numbers', () => {
  expect(sumOfTwoNumbers(4, 5).toPrecision(9))
  expect(sumOfTwoNumbers(1, 2).toPrecision(3))
})
