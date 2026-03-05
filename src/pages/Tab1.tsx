import React from 'react';
import { 
  IonContent, IonHeader, IonPage, IonTitle, IonToolbar, 
  IonCard, IonCardContent, IonButton, IonListHeader, IonLabel, 
  IonList, IonItem, IonThumbnail, IonText, IonGrid, IonRow, IonCol,
  useIonToast, IonSearchbar, useIonRouter 
} from '@ionic/react';
import { useCart } from '../CartContext';
import './Tab1.css';

const productos = {
  cafes: [
    { id: 1, nombre: 'Latte Vainilla', desc: 'Espresso, leche texturizada, jarabe artesanal.', precio: 65, img: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=200&q=80' },
    { id: 2, nombre: 'Cappuccino Italiano', desc: 'Equilibrio perfecto de espresso y espuma.', precio: 60, img: 'https://images.unsplash.com/photo-1534778101976-62847782c213?w=200&q=80' },
    { id: 3, nombre: 'Americano Robusto', desc: 'Extracción lenta, granos de Chiapas.', precio: 45, img: 'https://images.unsplash.com/photo-1551030173-122aabc4489c?w=200&q=80' },
  ],
  reposteria: [
    { id: 4, nombre: 'Croissant Mantequilla', desc: 'Hojaldre francés horneado hoy.', precio: 35, img: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=200&q=80' },
    { id: 5, nombre: 'Muffin Mora Azul', desc: 'Esponjoso con moras orgánicas.', precio: 40, img: 'https://images.unsplash.com/photo-1590759668580-b9fc6e734ce3?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  ]
};

const Tab1: React.FC = () => {
  const { agregarAlCarrito } = useCart();
  const [presentToast] = useIonToast();
  const router = useIonRouter();

  const handleAgregar = (producto: any) => {
    agregarAlCarrito(producto);
    presentToast({
      message: `${producto.nombre} agregado 👋`,
      duration: 1500,
      position: 'bottom',
      color: 'success',
      buttons: [{ 
        text: 'Ver Carrito', 
        handler: () => {
          router.push('/tab2');
        } 
      }]
    });
  };

  return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <IonToolbar color="dark">
          <IonTitle>Café El Estribo</IonTitle>
        </IonToolbar>
        <IonToolbar color="dark">
          <IonSearchbar placeholder="Buscar mi café favorito..." color="light"></IonSearchbar>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <div style={{
          background: 'linear-gradient(rgba(44, 30, 22, 0.7), rgba(44, 30, 22, 0.3)), url(https://images.unsplash.com/photo-1497935586351-b67a49e012bf?w=800&q=80)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '160px',
          display: 'flex',
          alignItems: 'flex-end',
          padding: '20px',
        }}>
          <IonText color="light">
            <h1 style={{ fontWeight: 700, margin: 0, fontSize: '1.6rem' }}>¡Hola, Jaime!</h1>
            <p style={{ margin: '5px 0 0 0', opacity: 0.9 }}>¿Empezamos con un Latte?</p>
          </IonText>
        </div>

        <IonListHeader style={{ marginTop: '15px' }}>
          <IonLabel><h1 style={{fontSize: '1.3rem', color: 'var(--ion-color-dark)', fontWeight: 700}}>Especialidades</h1></IonLabel>
        </IonListHeader>
        
        <IonList>
          {productos.cafes.map(p => (
            <IonItem key={p.id} lines="none">
              <IonThumbnail slot="start">
                <img alt={p.nombre} src={p.img} />
              </IonThumbnail>
              <IonLabel className="ion-text-wrap">
                <h2>{p.nombre}</h2>
                <IonText color="success"><h3 style={{fontWeight: 'bold', marginTop: '4px'}}>${p.precio.toFixed(2)}</h3></IonText>
              </IonLabel>
              <IonButton fill="clear" slot="end" color="primary" onClick={() => handleAgregar(p)}>
                <span style={{fontSize: '1.5rem'}}>+</span>
              </IonButton>
            </IonItem>
          ))}
        </IonList>

        <IonListHeader style={{ marginTop: '20px' }}>
          <IonLabel><h1 style={{fontSize: '1.3rem', color: 'var(--ion-color-dark)', fontWeight: 700}}>Recién Horneado</h1></IonLabel>
        </IonListHeader>

        <IonGrid style={{padding: '0 8px'}}>
          <IonRow>
            {productos.reposteria.map(p => (
              <IonCol size="6" key={p.id} style={{padding: '8px'}}>
                <IonCard style={{margin: 0, height: '100%', display: 'flex', flexDirection: 'column'}}>
                  <img alt={p.nombre} src={p.img} style={{height: '120px', width: '100%', objectFit: 'cover'}}/>
                  <IonCardContent style={{padding: '12px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
                    <div>
                      <h2 style={{fontWeight: 600, color: 'var(--ion-color-dark)', margin: '0 0 4px 0', fontSize: '1rem'}}>{p.nombre}</h2>
                      <IonText color="success"><p style={{fontWeight: 'bold', margin: 0}}>${p.precio.toFixed(2)}</p></IonText>
                    </div>
                    <IonButton expand="block" size="small" style={{marginTop: '10px'}} onClick={() => handleAgregar(p)}>
                      Añadir
                    </IonButton>
                  </IonCardContent>
                </IonCard>
              </IonCol>
            ))}
          </IonRow>
        </IonGrid>

        <div style={{height: '25px'}}></div>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;