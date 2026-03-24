import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonIcon, IonLabel, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { cafeOutline, cartOutline, qrCodeOutline } from 'ionicons/icons'; 

import Tab1 from './pages/Tab1';
import Tab2 from './pages/Tab2';
import Tab3 from './pages/Tab3';
import Login from './pages/Login';
import Register from './pages/Register';

/* Imports de CSS */
import '@ionic/react/css/core.css';
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';
import '@ionic/react/css/palettes/dark.system.css';
import './theme/variables.css';
import './global.css';

import { CartProvider } from './CartContext';
import { AuthProvider, useAuth } from './AuthContext';

setupIonicReact();

// 1. Envolvemos las pestañas en su propio componente protector
const ProtectedTabs: React.FC = () => {
  const { user } = useAuth();

  // Si no hay usuario, lo rebotamos al login inmediatamente
  if (!user) {
    return <Redirect to="/login" />;
  }

  // Si sí hay usuario, mostramos el layout de las pestañas
  return (
    <IonTabs>
      <IonRouterOutlet>
        <Route exact path="/tab1"><Tab1 /></Route>
        <Route exact path="/tab2"><Tab2 /></Route>
        <Route path="/tab3"><Tab3 /></Route>
      </IonRouterOutlet>

      <IonTabBar slot="bottom">
        <IonTabButton tab="tab1" href="/tab1">
          <IonIcon aria-hidden="true" icon={cafeOutline} />
          <IonLabel>Menú</IonLabel>
        </IonTabButton>
        <IonTabButton tab="tab2" href="/tab2">
          <IonIcon aria-hidden="true" icon={cartOutline} />
          <IonLabel>Carrito</IonLabel>
        </IonTabButton>
        <IonTabButton tab="tab3" href="/tab3">
          <IonIcon aria-hidden="true" icon={qrCodeOutline} />
          <IonLabel>Lealtad</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
};

const App: React.FC = () => (
  <IonApp>
    <AuthProvider>
      <CartProvider>
        <IonReactRouter>
          <IonRouterOutlet>
            {/* Rutas Públicas */}
            <Route exact path="/login"><Login /></Route>
            <Route exact path="/register"><Register /></Route>

            {/* Rutas Privadas (Llaman al componente protector que hicimos arriba) */}
            <Route path="/tab1"><ProtectedTabs /></Route>
            <Route path="/tab2"><ProtectedTabs /></Route>
            <Route path="/tab3"><ProtectedTabs /></Route>

            {/* Redirección Base */}
            <Route exact path="/">
              <Redirect to="/tab1" />
            </Route>
          </IonRouterOutlet>
        </IonReactRouter>
      </CartProvider>
    </AuthProvider>
  </IonApp>
);

export default App;