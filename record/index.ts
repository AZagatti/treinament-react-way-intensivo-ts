/// <reference path="types.d.ts" />

// import { sum } from './sum'

// Tipos
const number = 0
let num = 0
num = 1
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
any.name

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

enum MyEnum {
  HotDog = 'hot-dog',
  Pizza = 'pizza',
}
// let enumVal: MyEnum = undefined

// MyEnum.HotDog === enumVal

// Inferência
function double(num: number) {
  return num * 2
}

function compose(text: string) {
  return `Hello ${text}`
}

function serialize(array: string[]) {
  return [...array, 2]
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
interface MyInterface {
  name: string
}

// const myArray: MyArray = [
// const myArray: MyArrayTwo = [
const myArray: MyInterface[] = [
  {
    name: 'Zagatti',
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

const serializeUser = (user: BaseUser) => {
  return {
    id: user._id,
    name: user.firstName,
    age: user.years_old,
  }
}

// Class
// interface CarInterface {
//   name: string
//   brand: string
//   fullName: string
//   brake(): string
//   turnLeft(): string
// }

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
    return 'Turn left.'
  }
}

class CarWithMultimedia extends Car {
  public playSong(song: string) {
    this.turnLeft()
    return `Play '${song}' in ${this.fullName}`
  }
}

const car = new Car('VW', 'Gol')
console.log(car.brake())

const carWithMultimedia = new CarWithMultimedia('Ford', 'Fusion')
carWithMultimedia.brake()
carWithMultimedia.playSong('Metallica - Unforgiven II')

Car.honk()

// Generics
function genericFun<Type>(param: Type) {
  return param
}
const output = genericFun<{ name: string }[]>([{ name: 'Zagatti' }])

interface GenericInterface<Type> {
  name: Type
}
const genericFunc = <Type>(param: GenericInterface<Type>) => {
  return param
}
const output2 = genericFunc<string[]>({ name: ['2'] })

// Namespaces
// Test.testFunc()

// Module
// sum(1, 2, 3, 4)

// JS
double(5)

// Type guards
const checkIsUserHasName = (
  user: SerializedUser | undefined
): user is SerializedUser => {
  return user !== undefined && 'name' in user
}

let user: SerializedUser | undefined
if (checkIsUserHasName(user)) {
  user.name
} else {
  user
}

if (carWithMultimedia instanceof Car) {
  carWithMultimedia.brake()
} else {
  carWithMultimedia
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

const array = [
  {
    id: 0,
    name: 'Zagatti',
  },
]

const newUser = array.find((user) => user.id === 1)
newUser?.name

const newUser2 = array.find((user) => user.id === 1)
newUser2!.name

const newUser3 = array.find((user) => user.id === 1) ?? { name: '' }
newUser3.name

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
console.log(repo?.name)

export {}