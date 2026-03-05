import React from 'react';
import { 
  IonContent, IonHeader, IonPage, IonTitle, IonToolbar, 
  IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, 
  IonCardContent, IonProgressBar, IonText, IonAvatar, IonLabel,
  IonList, IonItem, IonIcon, IonListHeader, IonButton
} from '@ionic/react';
import { giftOutline, starOutline, cartOutline } from 'ionicons/icons';
import './Tab3.css';

const ofertas = [
  { icon: giftOutline, titulo: '2x1 en Cappuccinos', desc: 'Válido solo los jueves de 4pm a 6pm.', color: 'success' },
  { icon: starOutline, titulo: 'Doble Puntuación', desc: 'En la compra de cualquier reposteria hoy.', color: 'warning' },
  { icon: cartOutline, titulo: 'Muffin Gratis', desc: 'Al acumular 500 puntos (Te faltan 50).', color: 'danger' },
];

const Tab3: React.FC = () => {
  return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <IonToolbar color="dark">
          <IonTitle>Club El Estribo</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent color="light">
        <div style={{ textAlign: 'center', padding: '25px 20px', background: '#fff' }}>
          <IonAvatar style={{ width: '70px', height: '70px', margin: '0 auto 12px auto', border: '3px solid var(--ion-color-primary)' }}>
            <img alt="Avatar" src="https://ionicframework.com/docs/img/demos/avatar.svg" />
          </IonAvatar> 
          <h2 style={{ fontWeight: 700, color: 'var(--ion-color-dark)', margin: 0, fontSize: '1.3rem' }}>Jaime</h2>
          <IonText color="primary"><p style={{ margin: '3px 0 0 0', fontWeight: 500, fontSize: '0.9rem' }}>Nivel: Amante del Café ☕</p></IonText>
        </div>

        <IonCard style={{ background: 'var(--ion-color-primary)', marginTop: '-15px', position: 'relative', zIndex: 10, borderRadius: '15px' }}>
          <IonCardHeader style={{paddingBottom: '10px'}}>
            <IonCardSubtitle style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.8rem' }}>Puntos acumulados</IonCardSubtitle>
            <IonCardTitle style={{ color: 'white', fontSize: '2rem', fontWeight: 700 }}>450 pts</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <IonProgressBar value={0.9} color="warning" style={{height: '8px', borderRadius: '4px'}}></IonProgressBar>
            <p style={{ color: 'white', marginTop: '8px', textAlign: 'center', fontSize: '0.85rem', opacity: 0.9 }}>
              Te faltan <strong>50 puntos</strong> para tu bebida gratis.
            </p>
          </IonCardContent>
        </IonCard>

        <div style={{textAlign: 'center', marginTop: '20px', background: '#fff', padding: '20px', borderTop: '1px solid #eee', borderBottom: '1px solid #eee'}}>
            <IonLabel><h1 style={{fontSize: '1.1rem', color: 'var(--ion-color-dark)', fontWeight: 700, marginBottom: '15px'}}>Tu Tarjeta Digital</h1></IonLabel>
            <div style={{
              background: '#fff',
              padding: '12px',
              border: '2px solid var(--ion-color-secondary)',
              borderRadius: '15px',
              display: 'inline-block',
              boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
            }}>
              <img 
                src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=EstriboUser12345" 
                alt="Código QR" 
                style={{ borderRadius: '8px', display: 'block' }} 
              />
            </div>
        </div>

        <IonListHeader style={{ marginTop: '20px', paddingLeft: '16px' }}>
          <IonLabel><h1 style={{fontSize: '1.2rem', color: 'var(--ion-color-dark)', fontWeight: 700}}>Ofertas de Hoy</h1></IonLabel>
        </IonListHeader>
        
        <IonList inset={true} style={{margin: '0 16px 20px 16px'}}>
          {ofertas.map((o, index) => (
            <IonItem key={index} lines={index === ofertas.length - 1 ? 'none' : 'inset'}>
              <IonIcon icon={o.icon} slot="start" color={o.color} style={{fontSize: '1.4rem'}} />
              <IonLabel className="ion-text-wrap">
                <h3 style={{fontWeight: 600, color: 'var(--ion-color-dark)'}}>{o.titulo}</h3>
                <p style={{fontSize: '0.8rem'}}>{o.desc}</p>
              </IonLabel>
              <IonButton fill="clear" slot="end" size="small">Ver</IonButton>
            </IonItem>
          ))}
        </IonList>

        <div style={{height: '15px'}}></div>
      </IonContent>
    </IonPage>
  );
};

export default Tab3;