# MiniReact

MiniReact es un mini-framework inspirado en React que permite crear aplicaciones web dinámicas y ligeras. Proporciona un sistema de manejo de estado, un mecanismo para crear y renderizar componentes, y un simple sistema de eventos.

---

## Tabla de Contenidos

- [Características](#características)
- [Instalación](#instalación)
- [Uso](#uso)
  - [Crear un elemento](#crear-un-elemento)
  - [Renderizar un componente](#renderizar-un-componente)
  - [Manejo del estado](#manejo-del-estado)
  - [Acciones](#acciones)
- [Ejemplo completo](#ejemplo-completo)

---

## Características

- **Sistema de estado global:**
  Permite manejar el estado de tu aplicación y actualizar componentes dinámicamente.

- **Creación de elementos:**
  Define componentes de forma declarativa mediante `createElement`.

- **Renderizado eficiente:**
  Convierte nodos virtuales en DOM real para la visualización.

- **Sistema de acciones:**
  Facilita la modificación del estado global a través de acciones como `ADD_TODO` o `REMOVE_TODO`.

---

## Instalación

1. Clona el repositorio o copia el archivo `MiniReact.js`.
2. Inclúyelo en tu proyecto usando un `import` o directamente en un archivo HTML como módulo.

```javascript
import miniReact from './MiniReact.js';
```

---

## Uso

### Crear un elemento

Usa `miniReact.createElement` para definir un elemento con sus propiedades y nodos hijos:

```javascript
const element = miniReact.createElement(
  'button',
  { onClick: () => alert('Hola!') },
  'Haz clic en mí'
);
```

### Renderizar un componente

Utiliza `miniReact.render` para renderizar un nodo virtual en el contenedor del DOM:

```javascript
const appContainer = document.getElementById('app');

miniReact.render(
  miniReact.createElement('h1', null, '¡Hola, MiniReact!'),
  appContainer
);
```

### Manejo del estado

`AppStore` proporciona un estado global que puedes modificar y suscribirte a sus cambios.

- **Obtener el estado actual:**

```javascript
const state = miniReact.AppStore.getState();
```

- **Suscribirse a cambios de estado:**

```javascript
miniReact.AppStore.subscribe(() => {
  console.log('El estado ha cambiado:', miniReact.AppStore.getState());
});
```

- **Actualizar el estado:**

```javascript
miniReact.AppStore.setState({ items: ['Tarea 1'] });
```

### Acciones

Define acciones preconfiguradas para manejar cambios en el estado:

```javascript
miniReact.dispatch({ type: 'ADD_TODO', payload: 'Nueva tarea' });
miniReact.dispatch({ type: 'REMOVE_TODO', payload: 0 });
```

---

## Ejemplo completo

```javascript
/** @jsx miniReact.createElement */
import miniReact from './MiniReact.js';

// Componente principal
function ToDoApp() {
  const state = miniReact.AppStore.getState();

  const handleAddTodo = () => {
    const input = document.getElementById('todoInput');
    miniReact.dispatch({ type: 'ADD_TODO', payload: input.value });
    input.value = '';
  };

  return (
    miniReact.createElement('div', null,
      miniReact.createElement('h1', null, 'Lista de Tareas'),
      miniReact.createElement('input', { id: 'todoInput', placeholder: 'Nueva tarea' }),
      miniReact.createElement('button', { onClick: handleAddTodo }, 'Agregar'),
      miniReact.createElement('ul', null,
        ...state.todos.map((todo, index) =>
          miniReact.createElement('li', { key: index }, todo)
        )
      )
    )
  );
}

// Renderizar la aplicación
const appContainer = document.getElementById('app');
miniReact.render(miniReact.createElement(ToDoApp, null), appContainer);
```

---

## API

### AppStore

- **`getState()`**: Retorna el estado actual.
- **`subscribe(listener)`**: Agrega un listener que se ejecutará cuando cambie el estado.
- **`setState(newState)`**: Actualiza el estado y notifica a los listeners.

### dispatch(action)

Ejecuta una acción para modificar el estado. Las acciones disponibles son:

- **`ADD_TODO`**: Agrega una nueva tarea al estado.
  - `payload`: Tarea a agregar (string).
- **`REMOVE_TODO`**: Elimina una tarea por índice.
  - `payload`: Índice de la tarea a eliminar (número).

### MiniFramework

- **`createElement(type, props, ...children)`**: Crea un nodo virtual.
- **`render(virtualNode, container)`**: Renderiza un nodo virtual en el contenedor especificado.

---

