//Unregistered, Spots, Stripes, Marble, Pure

export class PetMarkings {

  static Unregistered = new PetMarkings("Unregistered", 0)
  static Spots = new PetMarkings("Spots", 1)
  static Stripes = new PetMarkings("Stripes", 2)
  static Marble = new PetMarkings("Marble", 3)
  static Pure = new PetMarkings("Pure", 4)


  constructor(name, value) {
    this.name = name
    this.value = value
  }
}

export const getPetMarkings = (petMarkings) => {
  switch (petMarkings) {
    case PetMarkings.Spots.value:
      return PetMarkings.Spots;
    case PetMarkings.Stripes.value:
      return PetMarkings.Stripes;
    case PetMarkings.Marble.value:
      return PetMarkings.Marble;
    case PetMarkings.Pure.value:
      return PetMarkings.Pure;
    default:
      return PetMarkings.Unregistered;
  }
}