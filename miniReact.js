const AppStore = {
    state: { items: [] },
    listeners: [],
  
    // Obtener el estado actual
    getState() {
      return this.state;
    },
  
    // Suscribir un listener que se ejecutará en cada cambio
    subscribe(listener) {
      this.listeners.push(listener);
    },
  
    // Actualizar el estado y notificar a los listeners
    setState(newState) {
      this.state = { ...this.state, ...newState };
      this.listeners.forEach(listener => listener());
    }
  };
  
  const Actions = {
    addItem(item) {
      const { items } = AppStore.getState();
      AppStore.setState({ items: [...items, item] });
    }
  };
  
export const dispatch = (action) => {
  const { todos } = AppStore.getState();
  switch (action.type) {
    case "ADD_TODO":
      AppStore.setState({ todos: [...todos, action.payload] });
      break;
    case "REMOVE_TODO":
      AppStore.setState({ todos: todos.filter((_, idx) => idx !== action.payload) });
      break;
    default:
      console.warn("Unknown action:", action); // Mensaje de advertencia para acciones no reconocidas
  }
};
  
  const MiniFramework = {
    createElement(type, props, ...children) {
      return {
        type,
        props: { ...props, children }
      };
    },
  
    render(virtualNode, container) {
      if (!container) return;
  
      container.textContent = ""; // Limpia el contenedor
      container.appendChild(createRealDOM(virtualNode));
    }
  };
  
  function createRealDOM(node) {
    if (typeof node === "string" || typeof node === "number") {
      return document.createTextNode(node);
    }
  
    const domElement = document.createElement(node.type);
  
    // Configurar propiedades y eventos
    Object.entries(node.props || {}).forEach(([key, value]) => {
      if (key === "children") return;
      if (key.startsWith("on")) {
        const eventType = key.slice(2).toLowerCase();
        domElement.addEventListener(eventType, value);
      } else {
        domElement[key] = value;
      }
    });
  
    // Renderizar hijos
    (node.props.children || []).forEach(child => {
      domElement.appendChild(createRealDOM(child));
    });
  
    return domElement;
  }
  
  // Exportar todo como un solo objeto
  const miniReact = {
    AppStore,
    Actions,
    dispatch,
    createElement: MiniFramework.createElement,
    render: MiniFramework.render
  };
  
  export default miniReact;
  