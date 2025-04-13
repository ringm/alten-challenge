Este es un proyecto [Next.js](https://nextjs.org) iniciado con [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

# [MBST Store] - Alten Challenge

## Primeros Pasos

### Prerrequisitos

Antes de ejecutar el proyecto, asegúrate de tener instalado Node.js y npm/yarn/pnpm/bun.

### Variables de Entorno

Este proyecto requiere las siguientes variables de entorno para conectarse a la API backend. Crea un archivo `.env.local` en la raíz del proyecto y añade las siguientes líneas:

```
NEXT_PUBLIC_API_KEY="87909682e6cd74208f41a6ef39fe4191"
NEXT_PUBLIC_API_URL="https://prueba-tecnica-api-tienda-moviles.onrender.com](https://prueba-tecnica-api-tienda-moviles.onrender.com"
```

### Ejecutando el Proyecto

Primero, instala las dependencias:

```
npm install
# o
yarn install
# o
pnpm install
# o
bun install
```

Luego, ejecuta el servidor de desarrollo:

```
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Abre http://localhost:3000 con tu navegador para ver el resultado.

Puedes comenzar a editar la página modificando app/page.tsx. La página se actualiza automáticamente a medida que editas el archivo.

### Ejecutando las Pruebas

Para ejecutar las pruebas automatizadas incluidas en el proyecto:

```
npm test
# o
yarn test
# o
pnpm test
# o
bun test
```

### Notas y Decisiones del Proyecto

Aquí hay algunas notas sobre detalles específicos de implementación y decisiones tomadas durante el desarrollo:

* Consistencia del Idioma: Se observaron algunas inconsistencias de idioma entre los archivos de diseño de Figma proporcionados y los datos devueltos por la API (algunos en inglés, otros en español). Para asegurar una experiencia de usuario consistente, los elementos de la interfaz de usuario, etiquetas y textos controlados directamente por esta aplicación frontend se han estandarizado a Español.

* Comportamiento del Botón "Añadir al Carrito": Los requisitos iniciales sugerían que el botón "Añadir al Carrito" debería estar deshabilitado hasta que se seleccionaran las opciones del producto (como color o almacenamiento). Sin embargo, para proporcionar lo que creo que es una experiencia de usuario más fluida, los productos ahora cargan con opciones preseleccionadas por defecto, y el botón "Añadir al Carrito" está habilitado por defecto, permitiendo a los usuarios añadir artículos inmediatamente si la configuración predeterminada les conviene.

* Limitación de Cantidad en el Carrito: La implementación actual solo permite añadir una unidad de cada modelo de producto distinto (identificado por su ID, potencialmente variando por combinación de color/almacenamiento dependiendo de cómo se defina CartItem) al carrito. El diseño de Figma no incluía elementos de UI para la selección de cantidad (ej., botones +/-, campo de cantidad) ni en las páginas de producto ni en la vista del carrito. Aunque añadir la gestión de cantidades mejoraría la experiencia de compra, se consideró fuera del alcance de este reto técnico y representa una posible área de mejora futura.

## ¡Gracias!

Gracias por la oportunidad de realizar este reto técnico. ¡Ha sido un proyecto muy divertido e interesante en el que trabajar!
