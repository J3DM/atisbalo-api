# Atisbalo - Api

#### Core Docs
 * [Javasript](https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia)
 * [NodeJS](https://nodejs.org/es/docs/)
 * [Jest testing](https://jestjs.io/docs/en/getting-started)

#### Javascript resources
 * [A curated list of awesome NodeJS frameworks, libraries and software.](https://github.com/sindresorhus/awesome-nodejs)
 
#### Best Practices
 * [Consejos genericos sobre diseño de API´s](http://javisantana.com/2019/04/29/dise%C3%B1o-api.html)

#### Performance

#### Guias

* Definimos una caracteristica a implementar o tarea a hacer
* Creamos tarjeta en trello, si esta creada nos asignamos a ella
* Cuando nos pongamos con esa tarea la movemos a la zona de `IN  PROGRESS`
* Para ponernos a trabajar en esa nueva tarea:

  * Nos movemos a la rama develop con el comando `git checkout develop`
  *  Para asegurarnos de que tenemos actualizado nuestro local con esa rama hacemos el comando `git pull`
  * Una vez estemos actualizados procedemos a crear una rama para trabajar en esa tarea conb el comando `git flow feature start nombreRama` este nombre de rama se estructurara siguiendo unos patrones como por ejemplo `FRO-nombreDeLaCaracteristica`.
  * Posible encabezados para el nombre de la rama:
    * API-nombreDeLaCaracteristica para tareas de la API
    * FRO-nombreDeLaCaracteristica para tareas del frontend
    * DOC-nombreDeLaCaracteristica para tareas de documentacion
    * TES-nombreDeLaCaracteristica para tareas de testing
    * OPS-nombreDeLaCaracteristica para tareas de devops

* En la carpeta test crearemos el archivo en el que se realizaran los testeos de la caracteristica a desarrollar y estos deberán de pasar antes de comitear los cambios para ello escribiremos `npm test`

* Una vez nuestra caracteristica este terminada y bien probada en local de que todo funciona correctamente se procedera a hacer el merge en develop para porbar esa caracteristica en el servidor de staging`
  * Movemos la tarjeta a la seccion de testing para probarlo en el servidor de pruebas staging.
  * Para hacer el merge en develop para probar en staging
    * Nos movemos a la rama develop con el comando `git checkout develop`
    * Actualizamos nuestra rama de develop con el comando `git pull`
    * Hacemos el merge en develop de la rama que queremos mergear con el comando `git merge nombreDeRama`
    * Subimos ese merge al repositorio con el comando `git push`