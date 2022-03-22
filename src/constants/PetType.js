//Unregistered, Dog, Cat

export class PetType {

  static Unregistered = new PetType("Unregistered", 0)
  static Dog = new PetType("Dog", 1)
  static Cat = new PetType("Cat", 2)

  constructor(name, value) {
    this.name = name
    this.value = value
  }
}

export const getPetType = (petType) => {
  switch (petType) {
    case PetType.Dog.value:
      return PetType.Dog;
    case PetType.Cat.value:
      return PetType.Cat;
    default:
      return PetType.Unregistered;
  }
}