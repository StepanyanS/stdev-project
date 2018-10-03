export class Color {
  readonly name: string;
  readonly value: string;

  constructor(name: string, value: string) {
    this.name = name;
    this.value = value;
  }
}

type Buttons = {
  borderRadius: null | string;
  outline: null | string;
}

export interface IProjectData {
  colors?: Color[];
  colorsSources?: Object;
  buttons?: Buttons;
}

export class Project {
  id: number;
  projectName: string;
  date: Date;
  data: IProjectData;

  constructor(
    name: string,
    colors: Color[],
    buttons: Buttons
  ) {
    this.projectName = name;
    this.data = {
      colors: colors,
      colorsSources: {},
      buttons: buttons
    
    };
  }
}

export interface Projects {
  projects: Project[];
}
