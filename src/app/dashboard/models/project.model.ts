export interface IColor {
  readonly name: string;
  readonly value: string;
}

export interface IProjectData {
  colors: IColor[];
  colorsSources: Object;
}

export class Project {
  id: number;
  name: string;
  date: Date;
  data: IProjectData;

  constructor(
    name: string,
    colors: Object
  ) {

  }
}
