# Kata Gestion de nuevos ingresos y recursos de equipos

Este proyecto es una aplicación web construida con React y Vite que permite gestionar usuarios y equipos. Utiliza Material-UI para el diseño de la interfaz y Axios para realizar solicitudes HTTP a una API REST.

## Requisitos

Antes de comenzar, asegúrate de tener instalado lo siguiente:

- Node.js (versión 16 o superior)
- npm (incluido con Node.js)

## Instalación

Sigue estos pasos para instalar y ejecutar el proyecto:

1. Clona el repositorio:
   ```bash
   git clone git@github.com:ftorolab/kata-react-vite.git
   cd kata-react-vite

2. Instala las dependencias:
   ```bash
   npm install
3. Instala las dependencias:
  ```bash
   npm run dev
4. Abre la aplicación en tu navegador en: http://localhost:5173


## Estructura del proyecto
El proyecto está organizado de la siguiente manera:
kata-react-vite/
├── public/                 # Archivos estáticos públicos
├── src/                    # Código fuente principal
│   ├── components/         # Componentes React reutilizables
│   │   ├── computers/      # Componentes relacionados con equipos
│   │   ├── users/          # Componentes relacionados con usuarios
│   │   └── shared/         # Componentes compartidos
│   ├── services/           # Lógica para interactuar con la API (e.g., Axios)
│   ├── styles/             # Archivos de estilos personalizados
│   ├── App.tsx             # Componente raíz de la aplicación
│   ├── main.tsx            # Punto de entrada principal
│   └── routes/             # Configuración de rutas
├── [package.json]          # Configuración de dependencias y scripts
├── [tsconfig.json]         # Configuración de TypeScript
└── [vite.config.ts]        # Configuración de Vite

## Tecnologías utilizadas
React: Biblioteca para construir interfaces de usuario.
Vite: Herramienta de desarrollo rápida para aplicaciones web.
Material-UI: Framework de diseño para React.
Axios: Cliente HTTP para realizar solicitudes a la API.
TypeScript: Lenguaje de programación tipado.
ESLint: Herramienta para analizar y corregir problemas en el código.
