import React from "react"
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom"

import routerConfig, { IRouter } from "./router_config"

const handerRouters = (routers: IRouter[]) => {
  return (
    <Switch>
      {routers.map((router) => {
        return (
          <Route exact={router.exact} key={router.path} path={router.path}>
            {<router.component />}
            {router.routers && handerRouters(router.routers)}
          </Route>
        )
      })}
      <Redirect from="/*" to="/notfound" />
    </Switch>
  )
}

const BaseRouter: React.FC = () => <BrowserRouter>{handerRouters(routerConfig)}</BrowserRouter>

export default BaseRouter
