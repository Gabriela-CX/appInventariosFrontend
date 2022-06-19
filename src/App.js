import React from 'react';
import {Header} from './components/ui/Header';
import {BrowserRouter as Router, Switch, Route, Link, Redirect} from 'react-router-dom';
import {Estado} from './components/estado/Estado';
import {Inventario} from './components/inventario/Inventario';
import {Marca} from './components/marca/Marca';
import {TipoEquipo} from './components/tipo-equipo/TipoEquipo';
import {Usuario} from './components/usuario/Usuario';
import {InventarioUpdate} from './components/inventario/InventarioUpdate';

const App = () => {
    return <Router>
        <Header/>
        <Switch>
          <Route exact path="/" component={Inventario}/>
          <Route exact path="/estado-equipo" component={Estado}/>
          <Route exact path="/usuario" component={Usuario}/>
          <Route exact path="/marca" component={Marca}/>
          <Route exact path="/tipo-equipo" component={TipoEquipo}/>
          <Route exact path="/inventarios/edit/:inventarioId/" component={InventarioUpdate} />
          <Redirect to='/'/>
        </Switch>
    </Router>
}




export { App, }