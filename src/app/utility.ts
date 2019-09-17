export class Utility {

  constructor() { }

  static getImageURL(folder: string, id: number): string {
    var path = "../../assets/" + folder + "/";

    var pokeDexId = Math.floor(id);
    var formId = id * 10 % 10;
    var file;
    if (formId === 0)
      file = pokeDexId + ".png";
    else
      file = pokeDexId + "-" + formId + ".png";

    return path + file;
  }

  static getIDFromUrl(url: string): number {
    return +url.split('/')[6];
  }
}
