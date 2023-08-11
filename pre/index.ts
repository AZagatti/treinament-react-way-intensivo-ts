/// <reference path="types.d.ts" />

import { sum } from './sum'

// Tipos
const number = 0
let num = 0
const string = 'text'
let str = 'text'
const varNull = null
const varUndefined = undefined
const varSymbol = Symbol()

// Tipos avançados
const object = {}
const obj = {
  name: 'Zagatti',
} as const

let any: any
any = 0
any = 'text'
any = { name: 'Zagatti' }

let unk: unknown
unk = 0
unk = 'text'
unk = { name: 'Zagatti' }
// unk.name
function funUnk(): unknown {
  return { name: 'Zagatti' }
}
const unkReturn = funUnk() as { name: string }
unkReturn.name

let never: never
// never = 0
// never = 'text'
// never = { name: 'Zagatti' }
function funNever(): never {
  throw Error('error')
}

function tuple(): [number, string] {
  // return [0, 'text', 1]
  return [0, 'text']
}

function union(param: unknown): string | number {
  if (typeof param === 'string') {
    return 'text'
  }
  if (typeof param === 'number') {
    return 1
  }
  return 0
}

// Inferência
function double(num: number) {
  return num * 2
}

function compose(text: string) {
  return `Hello ${text}`
}

// function serialize(array) {
// function serialize(array: string[]) {
function serialize(array: number[]) {
  return [...array, 'new value']
}

function promise() {
  return Promise.resolve({ ok: true, error: false })
}

// Interfaces e type alias
type MyArray = {
  name: string
}[]
type MyArrayTwo = Array<{
  name: string
}>
interface MyArrayInterface {
  name: string
}

// const myArray: MyArray = [
// const myArray: MyArrayTwo = [
const myArray: MyArrayInterface[] = [
  {
    name: 'Zagatti',
    // age: 26,
  },
]

interface BaseUser {
  _id: string
  firstName: string
  years_old: number
}

interface SerializedUser {
  id: string
  name: string
  age: number
}

const serializeUser = (user: BaseUser): SerializedUser => {
  return {
    id: user._id,
    name: user.firstName,
    age: user.years_old,
  }
}

// Classes

class Car {
  // private name: string
  // private brand: string
  // constructor(brand: string, name: string) {
  //   this.brand = brand
  //   this.name = name
  // }
  readonly className = 'Car'
  constructor(private brand: string, private name: string) {}
  public get fullName(): string {
    return `${this.brand} - ${this.name}`
  }
  static honk() {
    return 'Honk!'
  }
  public brake() {
    return `Brake ${this.fullName}`
  }
  protected turnLeft() {
    // this.className = 'Test'
    // this.name = 'Test'
    return 'Turn left.'
  }
}

class CarWithMultimedia extends Car {
  public playSong(song: string) {
    console.log(this.turnLeft())
    return `Play '${song}' in ${this.fullName}`
  }
}

const car = new Car('VW', 'Gol')
console.log(car.brake())

const carWithMultimedia = new CarWithMultimedia('Ford', 'Fusion')
console.log(carWithMultimedia.brake())
console.log(carWithMultimedia.playSong('Metallica - Unforgiven'))

console.log(Car.honk())

// Generics
function genericFun<Type>(param: Type) {
  return param
}
const output = genericFun<string>('value')

interface GenericInterface<Type> {
  name: Type
}
const genericFunc = <Type>(param: GenericInterface<Type>) => {
  return param
}
const output2 = genericFunc<string>({ name: 'Zagatti' })

// Namespaces
Test.testFunc()

// Modules
console.log(sum(1, 2, 3))

// JS
console.log(double(1))

// Type guards
const checkIsUserHasName = (user: SerializedUser | undefined) => {
  // if (typeof user === 'object' && 'name' in user) {
  //   return true
  // }
  // return false
  return typeof user === 'object' && 'name' in user
}

console.log(checkIsUserHasName({ id: '1', age: 26, name: 'Zagatti' }))
console.log(checkIsUserHasName(undefined))

if (carWithMultimedia instanceof Car) {
  console.log(`${carWithMultimedia} is a instance of Car`)
}

interface Cat {
  meow(): void
}

interface Dog {
  bark: () => void
}

const isDog = (pet: Cat | Dog): pet is Dog => {
  return typeof (pet as Dog).bark === 'function'
}

const newPet: Cat | Dog = {} as Cat | Dog

if (isDog(newPet)) {
  newPet.bark()
} else {
  newPet.meow()
}

let val
let value = null

const objc = [
  {
    id: 0,
    name: 'Zagatti',
  },
]

const user = objc.find((user) => user.id === 1)
user?.name

const user2 = objc.find((user) => user.id === 2)
user2!.name

const user3 = objc.find((user) => user.id === 3) ?? { name: '' }
user3.name

interface Response {
  id: number
  name: string
}

async function fetchData() {
  const response = await fetch('https://api.github.com/users/azagatti/repos')
  const data: Response[] = await response.json()
  return data
}

const repos = await fetchData()
const repo = repos.find(repo => repo.name === 'azagatti.dev')
repo?.name
