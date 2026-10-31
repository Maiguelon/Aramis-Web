# Formularios de contacto y LeadOps

Configurar `NEXT_PUBLIC_LEADOPS_TALLY_FORM_ID` con el ID público del formulario de Tally verificado. Es una variable de compilación de Next.js: reiniciar desarrollo o volver a compilar/desplegar después de cambiarla. No introducir claves de Tally, HubSpot, Resend ni OpenAI aquí.

Con un ID válido, el pie muestra «Contanos tu proyecto» y el cotizador conserva «¡Quiero este plan!». Ambos enlaces abren el formulario público de Tally en otra pestaña, con aviso visible y `noopener noreferrer`. El cotizador conserva sus selecciones mediante campos ocultos; las tarifas se siguen mostrando en la web y no se interpretan como presupuesto del cliente. El consentimiento se completa dentro del formulario, sin preselección. Se conserva la marca de Tally del plan gratuito.

Sin ID, los formularios existentes de Formspree siguen operativos y ahora piden consentimiento y muestran errores de envío. Este respaldo **no alimenta LeadOps**. No publica nada en n8n ni consume IA.

Solo se transmiten ruta de origen, cinco UTM y selecciones permitidas. No se reenvía la consulta completa de la URL, ni fragmentos, email o parámetros arbitrarios. La atribución corresponde a la URL de la página donde se abre el formulario; no implementa seguimiento entre sesiones ni atribución histórica. Los campos ocultos son contexto no verificado.

La captura no depende de la PC: Tally guarda el envío. n8n local consulta después los pendientes; la persona no tiene que esperar a la IA para enviar. El footer ya no incluye un iframe ni una altura fija. Abrir el enlace no declara una consulta enviada: la confirmación la muestra Tally únicamente tras aceptar el envío.

El formulario actual pide nombre, email o WhatsApp, consulta y web/red del negocio opcional, más el consentimiento explícito. Las antiguas preguntas de empresa y sitio web permanecen ocultas para conservar sus respuestas históricas e IDs. El agradecimiento personalizado indica que una persona revisará la consulta. No hay comunicación entre pestañas ni captura de respuestas por la web.

Piloto conectado verificado el 28 de octubre de 2026 con el formulario `4aaD4k`: contacto y cotizador llegaron a Tally y n8n; reutilizaron un contacto en HubSpot y generaron sus notas, tareas y correos internos. La prueba sin consentimiento fue bloqueada por Tally. Las selecciones del plan y UTM se comprobaron con el payload real. La confirmación se mostró en español y redujo su altura a 320 px. La revisión final móvil sigue pendiente antes del despliegue.

El 29 de octubre de 2026 se autorizó activar el worker local en modo `live`: admite consultas reales con consentimiento, sin dominio de email especial ni prefijo de prueba. El modo se controla en n8n y no se puede cambiar desde el formulario. La tarjeta va al destinatario interno configurado; no se envía correo al prospecto. El export público del flujo sigue deshabilitado por defecto.

Validación del cambio: tres pruebas de enlaces/atribución y compilación de producción; apertura real desde el footer en otra pestaña conservando UTM. Vista del footer comprobada a 479 px sin desbordamiento horizontal. Los cambios de este repositorio no se publican automáticamente por el agente: hacer push del commit y comprobar el despliegue del proyecto que sirve `aramis.agency`, con la variable configurada en Production.

## Resumen visible del plan · 31 de octubre de 2026

Los enlaces de planes prearmados y del cotizador incorporan `plan_title` y `plan_summary` cuando hay servicios seleccionados. El resumen se genera a partir de la misma lista permitida que produce el JSON de `plan`: cantidades, servicios y las historias bonificadas ya anunciadas en la tarjeta. No incorpora precios, parámetros arbitrarios de la URL ni datos personales. Los enlaces del footer y los planes vacíos no añaden estos textos.

Ejemplos: «Pack Video (Reels)» → «4 reels por mes · Historias bonificadas»; un plan personalizado con cuatro posts y web → «4 posts por mes · Historias bonificadas · Página personalizada».

La presentación ya está aplicada al formulario publicado de Tally: muestra nombre y servicios mediante menciones y lógica condicional. Se comprobó desde los botones reales de la web local un plan prearmado, otro personalizado con cuatro posts y web, y el contacto del footer sin encabezado de plan. Se conservaron origen, UTM y JSON de selecciones. Cinco pruebas web y compilación de producción correctas; revisión visual realizada en el formulario público. Esta comprobación no envió consultas ni generó llamadas de IA, registros CRM o correos.

La web pública seguía sirviendo la versión con iframe al finalizar esta verificación; los commits de Aramis-Web todavía estaban pendientes de push. Publicar la rama con los cambios del enlace y del resumen para que la experiencia completa llegue a `aramis.agency`. El despliegue debe pertenecer al proyecto asociado a ese dominio y tener configurado el ID público de Tally.
