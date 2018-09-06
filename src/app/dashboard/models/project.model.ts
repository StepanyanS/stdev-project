export class Color {
  readonly name: string;
  readonly value: string;

  constructor(name: string, value: string) {
    this.name = name;
    this.value = value;
  }
}


export interface IProjectData {
  colors: Color[];
  colorsSources: Object;
}

export class Project {
  id: number;
  projectName: string;
  date: Date;
  data: IProjectData;

  constructor(
    name: string,
    colors: Color[]
  ) {
    this.projectName = name;
    this.data = {
      colors: colors,
      colorsSources: {}
    };
  }
}

export interface Projects {
  projects: Project[];
}
