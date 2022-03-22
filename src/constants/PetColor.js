//Unregistered, DarkBrown, LightBrown, Black, White, DarkGray, LightGray, Other

export class PetColor {

  static Unregistered = new PetColor("Unregistered", 0)
  static DarkBrown = new PetColor("Dark Brown", 1)
  static LightBrown = new PetColor("Light Brown", 2)
  static Black = new PetColor("Black", 3)
  static White = new PetColor("White", 4)
  static DarkGray = new PetColor("Dark Gray", 5)
  static LightGray = new PetColor("Light Gray", 6)
  static Other = new PetColor("Other", 7)

  constructor(name, value) {
    this.name = name
    this.value = value
  }
}

export const getPetColor = (petColor) => {
  switch (petColor) {
    case PetColor.DarkBrown.value:
      return PetColor.DarkBrown;
    case PetColor.LightBrown.value:
      return PetColor.LightBrown;
    case PetColor.Black.value:
      return PetColor.Black;
    case PetColor.White.value:
      return PetColor.White;
    case PetColor.DarkGray.value:
      return PetColor.DarkGray;
    case PetColor.LightGray.value:
      return PetColor.LightGray;
    case PetColor.Other.value:
      return PetColor.Other;
    default:
      return PetColor.Unregistered;
  }
}

export default PetColor;