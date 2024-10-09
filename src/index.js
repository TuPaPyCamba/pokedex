// Importaciones necesarias para la aplicación.
import React from 'react' // Importa React para poder usar JSX y crear componentes.
import ReactDOM from 'react-dom/client' // Importa ReactDOM para renderizar la aplicación en el DOM.
import './styles/tailwind.css' // Importa el archivo de estilos de Tailwind CSS.
import App from './App' // Importa el componente principal de la aplicación.
import reportWebVitals from './reportWebVitals' // Importa la función para medir el rendimiento de la aplicación.

// Crea el nodo raíz donde se montará la aplicación React.
const root = ReactDOM.createRoot(document.getElementById('root'))

// Renderiza la aplicación en el nodo raíz.
root.render(
  <React.StrictMode> {/* Modo estricto de React que ayuda a detectar problemas potenciales */}
    <App /> {/* Componente principal de la aplicación */}
  </React.StrictMode>
)

// Inicia la medición de métricas de rendimiento de la aplicación.
reportWebVitals() // Llama a la función para reportar métricas de rendimiento.