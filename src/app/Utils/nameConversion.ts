import {Levels} from '../Utils/menuNames'

export class ImportanceConversionHelper{
  public static numberFromImportance(s){
    return Levels.length - 1 - Levels.indexOf(s);
  }

  public static importanceFromNumber(n){
    return Levels[Levels.length - 1 - n];
  }
}
