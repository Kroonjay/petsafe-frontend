//Unregistered, Safe, Lost, Found

export class PetStatus {

  static Unregistered = new PetStatus("Unregistered", 0)
  static Safe = new PetStatus("Safe", 1)
  static Lost = new PetStatus("Lost", 2)
  static Found = new PetStatus("Found", 3)

  constructor(name, value) {
    this.name = name
    this.value = value
  }
}

export const getPetStatus = (petStatus) => {
  switch(petStatus) {
    case PetStatus.Safe.value:
      return PetStatus.Safe;
    case PetStatus.Lost.value:
      return PetStatus.Lost;
    case PetStatus.Found.value:
      return PetStatus.Found;
    default:
      return PetStatus.Unregistered;
  }
}