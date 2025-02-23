# 🎲 Pig Game React

Una implementación moderna del clásico juego de dados "Pig Game" utilizando React y Vite.

## 🎮 Demo en vivo

Puedes jugar al juego en: [https://carmendmv.github.io/pig-game-react/](https://carmendmv.github.io/pig-game-react/)

## 📜 Reglas del juego

1. El juego tiene 2 jugadores, jugando por turnos
2. En cada turno, un jugador tira un dado todas las veces que quiera. Cada resultado se suma a su puntuación ACTUAL
3. Pero, si el jugador saca un 1, toda su puntuación ACTUAL se pierde. Después de esto, es el turno del siguiente jugador
4. El jugador puede elegir 'Hold', lo que significa que su puntuación ACTUAL se añade a su puntuación TOTAL. Después de esto, es el turno del siguiente jugador
5. El primer jugador en alcanzar 100 puntos en la puntuación TOTAL gana el juego

## 🚀 Tecnologías utilizadas

- React 18
- Vite
- CSS Moderno (Grid, Flexbox)
- GitHub Pages para el despliegue

## 💻 Desarrollo local

1. Clona el repositorio
```bash
git clone https://github.com/carmendmv/pig-game-react.git
```

2. Instala las dependencias
```bash
cd pig-game-react
npm install
```

3. Inicia el servidor de desarrollo
```bash
npm run dev
```

## 🛠️ Scripts disponibles

- `npm run dev`: Inicia el servidor de desarrollo
- `npm run build`: Crea una versión optimizada para producción
- `npm run preview`: Vista previa de la versión de producción
- `npm run deploy`: Despliega la aplicación en GitHub Pages


