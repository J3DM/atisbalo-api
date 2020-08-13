# Atisbalo - Api

#### Core Docs

- [Javasript](https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia)
- [NodeJS](https://nodejs.org/es/docs/)
- [Jest testing](https://jestjs.io/docs/en/getting-started)

#### Javascript resources

- [A curated list of awesome NodeJS frameworks, libraries and software.](https://github.com/sindresorhus/awesome-nodejs)

#### Best Practices

- [Consejos genericos sobre diseño de API´s](http://javisantana.com/2019/04/29/dise%C3%B1o-api.html)

#### Performance

#### Guias

- Definimos una caracteristica a implementar o tarea a hacer
- Creamos tarjeta en trello, si esta creada nos asignamos a ella
- Cuando nos pongamos con esa tarea la movemos a la zona de `IN PROGRESS`
- Para ponernos a trabajar en esa nueva tarea:

  - Nos movemos a la rama develop con el comando `git checkout develop`
  - Para asegurarnos de que tenemos actualizado nuestro local con esa rama hacemos el comando `git pull`
  - Una vez estemos actualizados procedemos a crear una rama para trabajar en esa tarea conb el comando `git flow feature start nombreRama` este nombre de rama se estructurara siguiendo unos patrones como por ejemplo `FRO-nombreDeLaCaracteristica`.
  - Posible encabezados para el nombre de la rama:
    - API-nombreDeLaCaracteristica para tareas de la API
    - FRO-nombreDeLaCaracteristica para tareas del frontend
    - DOC-nombreDeLaCaracteristica para tareas de documentacion
    - TES-nombreDeLaCaracteristica para tareas de testing
    - OPS-nombreDeLaCaracteristica para tareas de devops

- En la carpeta test crearemos el archivo en el que se realizaran los testeos de la caracteristica a desarrollar y estos deberán de pasar antes de comitear los cambios para ello escribiremos `npm test`

- Una vez nuestra caracteristica este terminada y bien probada en local de que todo funciona correctamente se procedera a hacer el merge en develop para porbar esa caracteristica en el servidor de staging`
  - Movemos la tarjeta a la seccion de testing para probarlo en el servidor de pruebas staging.
  - Para hacer el merge en develop para probar en staging
    - Nos movemos a la rama develop con el comando `git checkout develop`
    - Actualizamos nuestra rama de develop con el comando `git pull`
    - Hacemos el merge en develop de la rama que queremos mergear con el comando `git merge nombreDeRama`
    - Subimos ese merge al repositorio con el comando `git push`

# Staging
ssh-add atbl_staging_id_rsa
94.237.48.228
Atisbalo@Row2

sudo apt update
sudo apt upgrade
sudo apt install nginx

## Node
curl -sL https://deb.nodesource.com/setup_12.x -o nodesource_setup.sh
sudo bash nodesource_setup.sh
sudo apt install nodejs
sudo rm nodesource_setup.sh

## Mysql
sudo apt install mysql-server
sudo mysql_secure_installation
sudo mysql
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'Atisbalo@Row2.Staging.Mysql';

### CREDENTIALS
root
Password --> Atisbalo@Row2.Staging.Mysql

## Redis
sudo apt update
sudo apt install redis-server
sudo vim /etc/redis/redis.conf

 - Modify
 --> supervised systemd


## Redis
    port: 6399
## Mysql
    port: 3399


## service api
/lib/systemd/system/atblapi.service 
```
[Unit]
Description= Atisbalo Staging
Documentation=https://staging.atisbalo.com
After=network.target

[Service]
Type=simple
User=root
ExecStart=/usr/bin/node /home/staging/atisbalo/api/api/server.js
Restart=always
RestartSec=10
Environment="DATABASE_NAME=atisbalo"
Environment="DATABASE_USERNAME=root"
Environment="DATABASE_PASSWORD=Atisbalo@Row2.Staging.Mysql"
Environment="DATABASE_HOST=localhost"
Environment="LOG_LEVEL=A"
Environment="DIALECT=mysql"
Environment="DIALECT=mysql"
Environment="LOG_LEVEL=A"
Environment="EXPIRATION_TOKEN=48h"
Environment="ACCESS_TOKEN=jkapHEihDRioBJ78TOJ579fhxU8IBBvc"
Environment="REFRESH_TOKEN=pGNqduRFkB4K9C2vijOmUDa2kPtUhArN"
Environment="NODE_ENV=Development"
Environment="REDIS_URL=localhost"
Environment="REDIS_PORT=6379"

[Install]
WantedBy=multi-user.target
```
systemctl start atblapi
systemctl enable atblapi
## SSL


## nginx
/etc/nginx/sites-available/staging.atisbalo.com

'''
server{
	server_name staging.atisbalo.com;
        location /api {
                proxy_pass http://127.0.0.1:3000;
        }
}
'''


https://www.digitalocean.com/community/tutorials/how-to-secure-nginx-with-let-s-encrypt-on-ubuntu-20-04-es