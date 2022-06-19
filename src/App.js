import React from 'react';
import {Header} from './components/ui/Header';
import {BrowserRouter as Router, Switch, Route, Link, Redirect} from 'react-router-dom';
import {Estado} from './components/estado/Estado';
import {Inventario} from './components/inventario/Inventario';
import {Marca} from './components/marca/Marca';
import {TipoEquipo} from './components/tipo-equipo/TipoEquipo';
import {Usuario} from './components/usuario/Usuario';
import {InventarioUpdate} from './components/inventario/InventarioUpdate';
import {UsuarioUpdate} from './components/usuario/UsuarioUpdate';
import { MarcaUpdate } from './components/marca/MarcaUpdate';
import { EstadoUpdate } from './components/estado/EstadoUpdate';
import { TipoEquipoUpdate } from './components/tipo-equipo/TipoEquipoUpdate';

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
          <Route exact path="/usuarios/edit/:usuarioId/" component={UsuarioUpdate} />
          <Route exact path="/marcas/edit/:marcaId/" component={MarcaUpdate} />
          <Route exact path="/estados/edit/:estadoId/" component={EstadoUpdate} />
          <Route exact path="/tipos/edit/:tipoId/" component={TipoEquipoUpdate} />
          <Redirect to='/'/>
        </Switch>
    </Router>
}




export { App, }