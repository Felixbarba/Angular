# Aplicación Angular - Publicaciones

Esta es una aplicación web construida con Angular standalone. Permite crear, ver, editar y eliminar publicaciones conectándose a la API pública JSONPlaceholder.

---

## Funcionalidades principales

- Ver lista de publicaciones
- Crear nueva publicación
- Editar publicación existente
- Eliminar publicación
- Mostrar mensajes de éxito y error
- Validaciones básicas en el formulario
- Carga condicional (spinner)
- Uso de rutas standalone en Angular
- El ID puede ser editado y también se solicita al crear una publicación (por requisito técnico)

---

## Requisitos

- Node.js y npm instalados
- Angular CLI

---

## Instalación y ejecución

1. Clona el repositorio:

```bash
git clone https://github.com/Felixbarba/Angular.git
cd Angular

```
2. Instala las dependencias:

  ```bash
  npm install

  ```
  
3. Ejecuta el servidor de desarrollo:

  ```bash
  ng serve

  ```

4. Abre tu navegador en http://localhost:4200


## Observaciones

* Esta app usa https://jsonplaceholder.typicode.com/posts, que es una API simulada. Por eso las acciones de crear, editar o eliminar no tienen efecto real, pero funcionan como prueba.

* El ID se solicita manualmente como parte del requerimiento del proyecto, aunque normalmente lo asignaría la base de datos.
  

## Autor

Félix Enrique Barba de la Rosa
---
Proyecto realizado como ejercicio de prueba técnica.


