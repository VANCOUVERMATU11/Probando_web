[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/F9tulGTE)
[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-2e0aaae1b6195c2367325f4f02e2d04e9abb55f0b24a779b69b11b9e10269abc.svg)](https://classroom.github.com/online_ide?assignment_repo_id=19122974&assignment_repo_type=AssignmentRepo)
# Actividad: Automatización con GitHub Actions 🚀

En esta actividad, vas a trabajar con **GitHub Actions** para automatizar tareas comunes en un flujo de desarrollo moderno. Implementarás un workflow que:

- Ejecuta un **linter** automáticamente sobre el código base para asegurar que sigue un estilo consistente.
- Envía un **POST** a nuestra [API](https://pokemon-api-vpmj.onrender.com) cada vez que se ejecuta el workflow.
- Controla la **versión** de tu aplicación modificando automáticamente este mismo archivo (`README.md`).
- Modifica el **README.md** para agregar un **timestamp** que indique cuándo se ejecutó el workflow.

---

## 🧠 Objetivos de Aprendizaje

- Aprender a configurar workflows en GitHub Actions.
- Entender cómo automatizar chequeos de calidad de código.
- Trabajar con llamadas HTTP dentro de un pipeline.
- Controlar versiones automáticamente usando herramientas CLI o scripts.
- Modificar archivos directamente desde un pipeline.

---

## 📝 Instrucciones

1. **Forkea este repositorio.**

2. En la carpeta `.github/workflows/` crea un archivo llamado `main.yml`.

3. Configura un workflow que se dispare en los siguientes eventos:
   - `push`

4. El workflow debe ejecutar las siguientes tareas:

   ### ✅ 1. Linting
   - Si estás trabajando en JavaScript, usa `eslint`.
   - Asegúrate de que el linter falle el pipeline si encuentra errores.

   ### 📡 2. POST a la API de cartas Pokémon
   - Usa `curl` o similares para hacer un `POST` al endpoint [`https://pokemon-api-vpmj.onrender.com/cards`](https://pokemon-api-vpmj.onrender.com/cards)
   - El body del request debe tener el siguiente formato (esto es solo un ejemplo):
     ```json
     {
       "nombre": "Charizard",
       "tipo": "Fuego",
       "faseEvolucion": "Fase 2",
       "puntosSalud": 120,
       "ataques": [
         {
           "nombre": "Lanzallamas",
           "costoEnergia": ["Fuego", "Fuego", "Incolora"],
           "danio": "100",
           "descripcion": "Quema al Pokémon Defensor"
         }
       ]
     }
     ```
   - La API debe responder con un `201` si el POST fue exitoso.

   ### 🏷️ 3. Actualizar versión
   - Este `README.md` contiene un campo de versión como el siguiente:
     ```
     Versión actual: v1.0.1
     ```
   - Tu workflow debe actualizar automáticamente este número de versión siguiendo el esquema `v<major>.<minor>.<patch>`, por ejemplo: `v1.0.1`, `v1.1.0`, etc.
   - Para simplificar, puedes incrementar siempre el patch (`v1.0.0` → `v1.0.1`).

   ### 🕒 4. Modificar `README.md` con un **timestamp**
   - Tu workflow también debe agregar un **timestamp** en el archivo `README.md` para indicar la última ejecución del workflow. Ejemplo:
     ```
     Última ejecución: 2025-04-09 18:05:13 UTC
     ```

---

## ⚠️ Consideraciones importantes

- ⏱️ **Tiempo máximo de ejecución:** Tu workflow debe completarse en **menos de 3 minutos**. Si se excede ese tiempo, **la actividad no se considerará válida**.
  ```bash
  timeout 180s tu-comando-aqui
  ```

- 🖐️ **Ejecución manual:** Puedes agregar el siguiente bloque al inicio de tu archivo `main.yml` para permitir ejecutar el workflow de forma manual desde la interfaz de GitHub:
  ```yaml
  on:
    workflow_dispatch:
  ```

## 🧪 Revisión

Tu solución debe cumplir con los siguientes criterios:

- [ ] El workflow corre correctamente al hacer `push`
- [ ] No se excede el tiempo máximo de ejecución.
- [ ] Se ejecuta un linter y el pipeline falla si hay errores.
- [ ] Se realiza exitosamente un `POST` al endpoint de la API Pokémon.
- [ ] El número de versión en este archivo se actualiza automáticamente en cada ejecución.
- [ ] El `README.md` se modifica correctamente para incluir un **timestamp**.

---

Version actual: v1.0.2
Ultima ejecucion: 2025-04-14 00:24:23 UTC

¡Buena suerte! ⚙️


Notas personales: Para todo esto ocupé la documentación: https://docs.github.com/en/actions 

Para el ESLINT: ocupé la documentación de ESLINT: https://github.com/marketplace/actions/run-eslint

Para el POST OCupe 2 fuentes: https://stackoverflow.com/questions/67876177/triggering-github-action-using-a-post-request-github-rest-api
  y también: https://blog.nashtechglobal.com/trigger-a-github-action-with-an-http-request/
  y también: https://superuser.com/questions/272265/getting-curl-to-output-http-status-code
  también para el debuggeo, DEEPSEEK me dijo que ocupara la "|"

Finalmente, para la parte del time stamp y la de la version me ayudó DEEPSEEK. No logré ecnontrar documentación del tema. Lo siento :(.