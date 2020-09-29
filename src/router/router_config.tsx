import { FunctionComponent } from "react"

import Home from "@/pages/home"
import Test from "@/pages/home/test"
import NotFound from "@/pages/404"

export interface IRouter {
  component: FunctionComponent
  path: string
  exact?: boolean
  routers?: IRouter[]
}

const routerConfig: IRouter[] = [
  {
    component: Home,
    path: "/",
    exact: true,
  },
  {
    component: Test,
    path: "/test",
    exact: true,
  },
  {
    component: NotFound,
    path: "/notfound",
  },
]

export default routerConfig
