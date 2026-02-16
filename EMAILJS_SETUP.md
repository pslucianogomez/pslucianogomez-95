# 📧 Configuración de EmailJS para el Formulario de Contacto

Este documento te guiará paso a paso para configurar EmailJS y hacer que tu formulario de contacto funcione correctamente.

## 🚀 Pasos para Configurar EmailJS

### 1. Crear una Cuenta en EmailJS

1. Ve a [https://www.emailjs.com/](https://www.emailjs.com/)
2. Haz clic en "Sign Up" (Registrarse)
3. Completa el formulario de registro con tu correo electrónico
4. Verifica tu correo electrónico

### 2. Configurar un Servicio de Email

1. Una vez en tu dashboard, ve a la sección **"Email Services"**
2. Haz clic en **"Add New Service"**
3. Selecciona tu proveedor de email (Gmail, Outlook, Yahoo, etc.)
4. Sigue las instrucciones para conectar tu cuenta:
   - Para Gmail: deberás autorizar el acceso
   - Para otros: proporciona tus credenciales SMTP
5. **Guarda tu Service ID** (lo necesitarás después)

### 3. Crear una Plantilla de Email

1. Ve a la sección **"Email Templates"**
2. Haz clic en **"Create New Template"**
3. Configura tu plantilla con las siguientes variables:
   ```
   Subject: {{subject}}
   
   From: {{from_name}}
   Email: {{from_email}}
   
   Message:
   {{message}}
   ```
4. Personaliza el diseño según tus preferencias
5. **Guarda tu Template ID**

### 4. Obtener tu Public Key

1. Ve a **"Account"** → **"General"**
2. Encuentra tu **"Public Key"** (antes llamado "User ID")
3. **Cópiala** para usarla después

### 5. Configurar el Código

Ahora debes actualizar el archivo `src/pages/contact/index.tsx` con tus credenciales:

1. Abre el archivo `src/pages/contact/index.tsx`
2. Busca la sección donde dice `emailjs.send()` (alrededor de la línea 50)
3. Reemplaza los siguientes valores:

```typescript
await emailjs.send(
    'YOUR_SERVICE_ID',  // ← Reemplaza con tu Service ID
    'YOUR_TEMPLATE_ID', // ← Reemplaza con tu Template ID
    {
        from_name: formData.name,
        from_email: formData.email,
        subject: formData.subject || 'Mensaje desde el formulario de contacto',
        message: formData.message,
        to_email: 'tu-email@ejemplo.com' // ← Reemplaza con tu email
    },
    'YOUR_PUBLIC_KEY'   // ← Reemplaza con tu Public Key
);
```

### Ejemplo de configuración:

```typescript
await emailjs.send(
    'service_abc123',  // Tu Service ID
    'template_xyz789', // Tu Template ID
    {
        from_name: formData.name,
        from_email: formData.email,
        subject: formData.subject || 'Mensaje desde el formulario de contacto',
        message: formData.message,
        to_email: 'contacto@tuempresa.com' // Tu correo real
    },
    'aB3Cd5Ef7Gh9Ij1' // Tu Public Key
);
```

## 🧪 Probar el Formulario

1. Inicia tu aplicación: `npm run dev`
2. Ve a la ruta `/contact`
3. Completa el formulario y envía un mensaje de prueba
4. Revisa tu correo electrónico

## 📋 Lista de Verificación

- [ ] Cuenta de EmailJS creada y verificada
- [ ] Servicio de email conectado
- [ ] Plantilla de email creada
- [ ] Service ID copiado
- [ ] Template ID copiado
- [ ] Public Key copiada
- [ ] Archivo `src/pages/contact/index.tsx` actualizado
- [ ] Correo de destino configurado
- [ ] Formulario probado con éxito

## 🔒 Consideraciones de Seguridad

⚠️ **IMPORTANTE**: Aunque EmailJS oculta tu configuración de email en el backend, la Public Key será visible en el código del cliente. EmailJS protege contra el abuso mediante:
- Rate limiting
- Domain whitelisting
- CAPTCHA opcional

### Recomendaciones:
1. Habilita el **domain whitelisting** en EmailJS para que solo tu dominio pueda usar tu cuenta
2. Considera agregar un CAPTCHA si recibes spam
3. No uses EmailJS para información extremadamente sensible

## ⚙️ Límites del Plan Gratuito

El plan gratuito de EmailJS incluye:
- 200 emails por mes
- 2 servicios de email
- Plantillas ilimitadas

Si necesitas más, considera actualizar a un plan de pago.

## 🆘 Solución de Problemas

### "Error 403: Forbidden"
- Verifica que tu Public Key sea correcta
- Asegúrate de que el dominio esté en la whitelist

### "Error 400: Bad Request"
- Verifica que los nombres de las variables en la plantilla coincidan con los del código
- Asegúrate de que el Service ID y Template ID sean correctos

### "Los correos no llegan"
- Revisa tu carpeta de spam
- Verifica la configuración del servicio de email
- Confirma que el correo de destino sea correcto

## 📚 Recursos Adicionales

- [Documentación oficial de EmailJS](https://www.emailjs.com/docs/)
- [EmailJS React Tutorial](https://www.emailjs.com/docs/examples/reactjs/)
- [FAQ de EmailJS](https://www.emailjs.com/docs/faq/)

---

¿Necesitas ayuda? Revisa la documentación oficial o contacta al soporte de EmailJS.


