import { 
  IonContent, IonHeader, IonPage, IonTitle, IonToolbar, 
  IonList, IonItem, IonLabel, IonListHeader, 
  IonFooter, IonButton, IonIcon, IonThumbnail, IonText,
  useIonAlert, useIonRouter, useIonToast // Añadimos el Toast para avisar del reembolso
} from '@ionic/react';
import { cardOutline, timeOutline, addCircleOutline, removeCircleOutline, trashOutline, cafeOutline } from 'ionicons/icons';
import { useCart } from '../CartContext';
import { useAuth } from '../AuthContext'; 
import './Tab2.css';

const Tab2: React.FC = () => {
  const { carrito, total, agregarAlCarrito, restarDelCarrito, vaciarCarrito } = useCart();
  const { sumarPuntos } = useAuth(); 
  const [presentAlert] = useIonAlert();
  const [presentToast] = useIonToast(); // Herramienta para notificaciones pequeñas
  const router = useIonRouter();

  const procesarPago = () => {
    const puntosGanados = Math.floor(total); 
    sumarPuntos(puntosGanados); 

    presentAlert({
      header: '¡Pedido Confirmado!',
      message: `Tu pedido estará listo en 15 minutos. ¡Acabas de ganar ${puntosGanados} puntos para tu tarjeta de lealtad! ☕`,
      buttons: [{ 
        text: '¡Genial!', 
        handler: () => {
          vaciarCarrito();
          router.push('/tab3');
        } 
      }]
    });
  };

  // Función especial para manejar cuando quitan cosas del carrito
  const handleQuitarProducto = (item: any) => {
    // Si el producto es el premio (id: 999), le devolvemos sus puntos
    if (item.id === 999) {
      sumarPuntos(500);
      presentToast({ 
        message: 'Premio cancelado. Se te devolvieron 500 puntos 🪙', 
        duration: 2500, 
        color: 'primary',
        position: 'top'
      });
    }
    // Quitamos el producto del carrito
    restarDelCarrito(item.id);
  };

  return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <IonToolbar color="dark"><IonTitle>Mi Pedido</IonTitle></IonToolbar>
      </IonHeader>

      <IonContent color="light">
        <IonListHeader style={{ marginTop: '10px' }}>
          <IonLabel><h1 style={{fontSize: '1.2rem', fontWeight: 700}}>Resumen</h1></IonLabel>
        </IonListHeader>

        {carrito.length === 0 ? (
          <div style={{ textAlign: 'center', marginTop: '60px', padding: '0 20px', color: '#888' }}>
            <IonIcon icon={timeOutline} style={{ fontSize: '5rem', color: '#ddd', marginBottom: '20px' }} />
            <h2 style={{fontWeight: 600, color: '#666'}}>Tu carrito está vacío</h2>
            <p style={{marginBottom: '30px'}}>Parece que aún no decides qué café quieres hoy.</p>
            <IonButton fill="outline" color="primary" onClick={() => router.push('/tab1')}>
              <IonIcon slot="start" icon={cafeOutline} />
              Ir al Menú
            </IonButton>
          </div>
        ) : (
          <IonList>
            {carrito.map((item) => (
              <IonItem key={item.id} lines="none" style={{ margin: '0 16px 12px 16px', borderRadius: '16px' }}>
                <IonThumbnail slot="start" style={{ width: '60px', height: '60px' }}>
                  <img alt={item.nombre} src={item.img} style={{ borderRadius: '12px' }} />
                </IonThumbnail>
                <IonLabel className="ion-text-wrap">
                  <h2 style={{ fontWeight: 600 }}>{item.nombre}</h2>
                  <IonText color="success"><h3 style={{ fontWeight: 700, margin: '4px 0' }}>${(item.precio * item.cantidad).toFixed(2)}</h3></IonText>
                  
                  <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginTop: '8px' }}>
                    
                    {/* Botón de Restar/Eliminar */}
                    <IonIcon 
                      icon={item.cantidad === 1 ? trashOutline : removeCircleOutline} 
                      style={{ fontSize: '1.6rem', color: item.cantidad === 1 ? '#ff4961' : 'var(--ion-color-primary)' }} 
                      onClick={() => handleQuitarProducto(item)} 
                    />
                    
                    <span style={{ fontWeight: 'bold', fontSize: '1.2rem', minWidth: '20px', textAlign: 'center' }}>
                      {item.cantidad}
                    </span>
                    
                    {/* Botón de Sumar (Solo aparece si NO es un premio) */}
                    {item.id !== 999 ? (
                      <IonIcon 
                        icon={addCircleOutline} 
                        style={{ fontSize: '1.6rem', color: 'var(--ion-color-primary)' }} 
                        onClick={() => agregarAlCarrito(item)}
                      />
                    ) : (
                      <div style={{ width: '1.6rem' }}></div> /* Espacio vacío para que no se desalinee */
                    )}

                  </div>
                </IonLabel>
              </IonItem>
            ))}
          </IonList>
        )}
      </IonContent>

      <IonFooter className="ion-no-border">
        <div style={{ 
          background: '#fff', 
          padding: '16px 20px', 
          boxShadow: '0 -4px 15px rgba(0,0,0,0.05)',
          borderTop: '1px solid #eee'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
            <span style={{ fontWeight: 600, fontSize: '1.1rem', color: '#444' }}>Total</span>
            <span style={{ fontWeight: 800, fontSize: '1.4rem', color: 'var(--ion-color-success)' }}>
              ${total.toFixed(2)} MXN
            </span>
          </div>
          <IonButton 
            expand="block" 
            color="primary" 
            style={{ height: '50px', fontSize: '1.1rem', fontWeight: 600 }} 
            disabled={carrito.length === 0}
            onClick={procesarPago}
          >
            <IonIcon icon={cardOutline} slot="start" />
            Confirmar y Pagar
          </IonButton>
        </div>
      </IonFooter>
    </IonPage>
  );
};

export default Tab2;