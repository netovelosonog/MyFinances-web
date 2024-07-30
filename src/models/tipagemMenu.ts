export interface Submenu {
  name: string
  path: string
}

export interface Menu {
  name: string
  icon: string
  path?: string
  submenus?: Submenu[]
}
