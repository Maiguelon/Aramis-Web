# Formularios de contacto y LeadOps

Configurar `NEXT_PUBLIC_LEADOPS_TALLY_FORM_ID` con el ID público del formulario de Tally verificado. Es una variable de compilación de Next.js: reiniciar desarrollo o volver a compilar/desplegar después de cambiarla. No introducir claves de Tally, HubSpot, Resend ni OpenAI aquí.

Con un ID válido, el contacto del pie y cada consulta del cotizador muestran el mismo formulario de Tally. El cotizador conserva sus selecciones mediante campos ocultos; las tarifas se siguen mostrando en la web y no se interpretan como presupuesto del cliente. El consentimiento se completa dentro del formulario, sin preselección. Se conserva la marca de Tally del plan gratuito.

Sin ID, los formularios existentes de Formspree siguen operativos y ahora piden consentimiento y muestran errores de envío. Este respaldo **no alimenta LeadOps**. No publica nada en n8n ni consume IA.

Solo se transmiten ruta de origen, cinco UTM y selecciones permitidas. No se reenvía la consulta completa de la URL, ni fragmentos, email o parámetros arbitrarios. La atribución corresponde a la URL de la página donde se abre el formulario; no implementa seguimiento entre sesiones ni atribución histórica. Los campos ocultos son contexto no verificado.

La captura no depende de la PC: Tally guarda el envío. n8n local consulta después los pendientes; la persona no tiene que esperar a la IA para enviar. Un bloqueo del iframe permite abrir el formulario en otra pestaña. No se declara éxito basándose en que el iframe haya cargado.

Un evento de envío de Tally reduce la altura de la confirmación. Se validan origen, ventana concreta del iframe e ID de formulario; un mensaje de otra página o del otro formulario de la misma web no puede marcarlo como enviado. Las respuestas no se registran en consola ni se copian a analítica.

Piloto conectado verificado el 28 de octubre de 2026 con el formulario `4aaD4k`: contacto y cotizador llegaron a Tally y n8n; reutilizaron un contacto en HubSpot y generaron sus notas, tareas y correos internos. La prueba sin consentimiento fue bloqueada por Tally. Las selecciones del plan y UTM se comprobaron con el payload real. La confirmación se mostró en español y redujo su altura a 320 px. La revisión final móvil sigue pendiente antes del despliegue.

El worker local sigue en modo `pilot`: procesa solo email ficticio `@example.com` con mensaje que empiece por `PRUEBA FICTICIA:`. Publicar esta web con el ID de Tally no activa por sí solo el procesamiento de leads reales.

Antes de desplegar: completar un envío ficticio desde contacto y otro desde el cotizador; comprobar selecciones, consentimiento, consulta en Tally y recorrido en HubSpot. Verificar vista móvil y revisar el aviso de privacidad de Aramis. Los cambios de este repositorio no se publican automáticamente por el agente.
