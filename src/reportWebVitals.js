// Función para medir y reportar métricas de rendimiento web.
const reportWebVitals = (onPerfEntry) => {
  // Verifica si onPerfEntry es una función válida antes de continuar.
  if (onPerfEntry && onPerfEntry instanceof Function) {
      // Importa dinámicamente el módulo 'web-vitals'.
      import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
          // Llama a las funciones para obtener y reportar métricas de rendimiento.
          getCLS(onPerfEntry)  // Cumulative Layout Shift
          getFID(onPerfEntry)  // First Input Delay
          getFCP(onPerfEntry)  // First Contentful Paint
          getLCP(onPerfEntry)  // Largest Contentful Paint
          getTTFB(onPerfEntry) // Time to First Byte
      })
  }
}

// Exporta la función para su uso en otras partes de la aplicación.
export default reportWebVitals
