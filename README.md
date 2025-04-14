Este es un proyecto [Next.js](https://nextjs.org) iniciado con [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

# [MBST Store] - Alten Challenge

## Primeros Pasos

### Prerrequisitos

Antes de ejecutar el proyecto, asegúrate de tener instalado Node.js y npm/yarn/pnpm/bun.

### Variables de Entorno

Este proyecto requiere las siguientes variables de entorno para conectarse a la API backend. Crea un archivo `.env.local` en la raíz del proyecto y añade las siguientes líneas:

```
API_KEY="87909682e6cd74208f41a6ef39fe4191"
API_URL="https://prueba-tecnica-api-tienda-moviles.onrender.com"
```

### Ejecutando el Proyecto

Primero, instala las dependencias:

```
npm install
```

Luego, ejecuta el servidor de desarrollo:

```
npm run dev
```

Abre http://localhost:3000 con tu navegador para ver el resultado.

### Ejecutando las Pruebas

Para ejecutar las pruebas automatizadas incluidas en el proyecto:

```
npm test
```

### Notas y Decisiones del Proyecto

Algunas notas sobre detalles específicos de implementación y decisiones tomadas durante el desarrollo:

- Consistencia del Idioma: Se observaron algunas inconsistencias de idioma entre los archivos de diseño de Figma proporcionados y los datos devueltos por la API (algunos en inglés, otros en español). Para asegurar una experiencia de usuario consistente, los elementos de la interfaz de usuario, etiquetas y textos controlados directamente por esta aplicación frontend se han estandarizado a Español.

- Comportamiento del Botón "Añadir al Carrito": Los requisitos iniciales sugerían que el botón "Añadir al Carrito" debería estar deshabilitado hasta que se seleccionaran las opciones del producto (como color o almacenamiento). Sin embargo, para proporcionar lo que creo que es una experiencia de usuario más fluida, los productos ahora cargan con opciones preseleccionadas por defecto, y el botón "Añadir al Carrito" está habilitado por defecto, permitiendo a los usuarios añadir artículos inmediatamente si la configuración predeterminada les conviene.

- Limitación de Cantidad en el Carrito: La implementación actual sólo permite añadir una unidad de cada modelo de producto distinto (identificado por su ID, potencialmente variando por combinación de color/almacenamiento) al carrito. El diseño de Figma no incluía elementos de UI para la selección de cantidad (ej., botones +/-, campo de cantidad) ni en las páginas de producto ni en la vista del carrito. Aunque añadir la gestión de cantidades mejoraría la experiencia de compra, consideré fuera del alcance de este reto técnico y representa una posible área de mejora futura.

- Procesamiento de imágenes: Para el renderizado de imágenes, utilicé el componente Image de NextJS que permite optimizaciones de acuerdo al tamaño de pantalla.

- Estilos: Opté por utilizar CSS modules, aunque probablemente en un proyecto real recurriría a una solución más escalable y robusta (algún framework como Tailwindcss).

## ¡Gracias!

Gracias por la oportunidad de realizar este reto técnico. ¡Ha sido un proyecto muy divertido e interesante en el que trabajar!
