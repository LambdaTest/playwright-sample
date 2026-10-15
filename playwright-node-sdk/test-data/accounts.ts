export type Account = {
  firstName: string
  lastName: string
  email: string
  telephone: string
  password: string
}

export type Address = {
  firstName: string
  lastName: string
  street: string
  city: string
  postcode: string
  country: string
  region: string
}

// A new, unique shop account, so parallel workers and reruns never collide.
export const newAccount = (workerIndex: number): Account => ({
  firstName: 'Test',
  lastName: 'User',
  email: `pw-sdk-${Date.now()}-${workerIndex}@example.com`,
  telephone: '5551234567',
  password: `Pw#${Date.now()}`,
})

// The country is not the shop's default, so its region list loads fresh and selectOption waits for it.
export const newYorkAddress: Address = {
  firstName: 'Test',
  lastName: 'User',
  street: '1 Test Street',
  city: 'New York',
  postcode: '10001',
  country: 'United States',
  region: 'New York',
}
