import React, { useState } from 'react';
import { IonPage, IonContent, IonInput, IonButton, IonText, useIonRouter, useIonToast, IonIcon } from '@ionic/react';
import { mailOutline, lockClosedOutline, logInOutline, personAddOutline } from 'ionicons/icons';
import { useAuth } from '../AuthContext';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const { login } = useAuth();
  const router = useIonRouter();
  const [present] = useIonToast();

  const handleLogin = () => {
    if (login(email, pass)) {
      router.push('/tab1', 'forward', 'replace');
    } else {
      present({ message: 'Credenciales incorrectas', duration: 2000, color: 'danger', position: 'top' });
    }
  };

  return (
    <IonPage>
      <IonContent style={{ '--background': '#f4ebe1' }}>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100%',
          padding: '20px'
        }}>
          
          <div style={{
            width: '100%',
            maxWidth: '400px',
            background: '#ffffff', // Forzamos el fondo blanco
            padding: '40px 30px',
            borderRadius: '24px',
            boxShadow: '0 10px 30px rgba(68, 44, 22, 0.15)'
          }}>
            
            <div style={{ textAlign: 'center', marginBottom: '35px' }}>
              <img 
                src="https://images.unsplash.com/photo-1497935586351-b67a49e012bf?w=200&q=80" 
                alt="Logo Café" 
                style={{ width: '90px', height: '90px', borderRadius: '50%', objectFit: 'cover', border: '4px solid var(--ion-color-primary)', marginBottom: '15px' }}
              />
              <IonText color="dark">
                <h1 style={{ fontWeight: 800, fontSize: '1.8rem', margin: '0', color: '#333' }}>Café El Estribo</h1>
                <p style={{ margin: '8px 0 0 0', fontSize: '0.95rem', color: '#666' }}>Ingresa para pedir tu café favorito</p>
              </IonText>
            </div>

            <IonInput 
              value={email} 
              onIonChange={e => setEmail(e.detail.value!)} 
              type="email" 
              label="Correo electrónico"
              labelPlacement="floating"
              fill="outline" 
              color="dark"
              style={{ marginBottom: '20px', '--color': '#333', '--placeholder-color': '#666' }}
            >
              <IonIcon slot="start" icon={mailOutline} style={{ color: '#555' }} aria-hidden="true" />
            </IonInput>

            <IonInput 
              value={pass} 
              onIonChange={e => setPass(e.detail.value!)} 
              type="password" 
              label="Contraseña"
              labelPlacement="floating"
              fill="outline" 
              color="dark"
              style={{ marginBottom: '30px', '--color': '#333', '--placeholder-color': '#666' }}
            >
              <IonIcon slot="start" icon={lockClosedOutline} style={{ color: '#555' }} aria-hidden="true" />
            </IonInput>

            <IonButton expand="block" color="primary" shape="round" style={{ height: '50px', fontSize: '1.1rem', fontWeight: 'bold' }} onClick={handleLogin}>
              <IonIcon slot="start" icon={logInOutline} />
              Entrar
            </IonButton>
            
            <div style={{ textAlign: 'center', marginTop: '25px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <p style={{ margin: 0, fontSize: '0.9rem', color: '#666' }}>¿Aún no eres parte del club?</p>
              <IonButton fill="clear" color="secondary" onClick={() => router.push('/register')}>
                <IonIcon slot="start" icon={personAddOutline} />
                Regístrate aquí
              </IonButton>
            </div>

          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Login;