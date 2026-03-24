import React, { useState } from 'react';
import { IonPage, IonContent, IonInput, IonButton, IonText, useIonRouter, useIonToast, IonIcon } from '@ionic/react';
import { mailOutline, lockClosedOutline, personOutline, arrowBackOutline, checkmarkCircleOutline } from 'ionicons/icons';
import { useAuth } from '../AuthContext';

const Register: React.FC = () => {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const { register } = useAuth();
  const router = useIonRouter();
  const [present] = useIonToast();

  const handleRegister = () => {
    if (!nombre || !email || !pass) {
      present({ message: 'Por favor llena todos los campos', duration: 2000, color: 'warning', position: 'top' });
      return;
    }
    if (register(nombre, email, pass)) {
      present({ message: '¡Registro exitoso! Ya puedes iniciar sesión', duration: 2000, color: 'success', position: 'top' });
      router.goBack();
    } else {
      present({ message: 'Ese correo ya está registrado', duration: 2000, color: 'danger', position: 'top' });
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
            padding: '30px 30px',
            borderRadius: '24px',
            boxShadow: '0 10px 30px rgba(68, 44, 22, 0.15)'
          }}>

            <IonButton fill="clear" color="medium" onClick={() => router.goBack()} style={{ marginLeft: '-15px', marginBottom: '10px' }}>
              <IonIcon slot="start" icon={arrowBackOutline} />
              Volver
            </IonButton>
            
            <div style={{ textAlign: 'center', marginBottom: '30px' }}>
              <IonText color="dark">
                <h1 style={{ fontWeight: 800, fontSize: '1.8rem', margin: '0', color: '#333' }}>Únete al Club</h1>
                <p style={{ margin: '8px 0 0 0', fontSize: '0.95rem', color: '#666' }}>Crea tu cuenta para ganar recompensas</p>
              </IonText>
            </div>

            <IonInput 
              value={nombre} 
              onIonChange={e => setNombre(e.detail.value!)} 
              type="text" 
              label="Tu Nombre"
              labelPlacement="floating"
              fill="outline" 
              color="dark"
              style={{ marginBottom: '20px', '--color': '#333', '--placeholder-color': '#666' }}
            >
              <IonIcon slot="start" icon={personOutline} style={{ color: '#555' }} aria-hidden="true" />
            </IonInput>

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

            <IonButton expand="block" color="primary" shape="round" style={{ height: '50px', fontSize: '1.1rem', fontWeight: 'bold' }} onClick={handleRegister}>
              <IonIcon slot="start" icon={checkmarkCircleOutline} />
              Crear Cuenta
            </IonButton>

          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Register;