
# Fullstack:MongoDB+Express+AngularJS+NodeJS
# La Memoria


Instalamos el framework express de nodeJS en la carpeta nodejserver que la creamos nosotros . Lo instalamos de forma Global usando –g 

![](https://github.com/Curso-Fullstack-MEAN-Octubre2017/Younes-Pet-Store/raw/master/imagenes/imagen%201.PNG)

Después entramos en la carpeta de los proyectos y generamos el esqueleto de nuestro proyecto

![](https://github.com/Curso-Fullstack-MEAN-Octubre2017/Younes-Pet-Store/raw/master/imagenes/imagen%202.PNG)

Después instalamos el entorno para nuestro proyecto

![](https://github.com/Curso-Fullstack-MEAN-Octubre2017/Younes-Pet-Store/raw/master/imagenes/imagen%203.PNG)

Y arrancamos el servidor

![](https://github.com/Curso-Fullstack-MEAN-Octubre2017/Younes-Pet-Store/raw/master/imagenes/imagen%204.PNG)



## Diagrama de Arquitectura

![](https://github.com/Curso-Fullstack-MEAN-Octubre2017/Younes-Pet-Store/raw/master/imagenes/imagen%205.PNG)



- MongoDB :es una base de datos no relacional que guarda los datos en documentos almacenados en BSON que es representación binaria de JSON.
- Mongoose :es la librería que se usa para conectar la base de datos MongoDB con NodeJS
- Express :es la infraestructura rapida,minimalista y flexible para NodeJS.
- NodeJS :es un servidor que permite trabajar con javaScript en el lado del cliente.
- AngularJS :es el FrameWork que se usa para el desarrollo en lado del cliente que facilita el uso de las plantillas HTML.
- La nube de internet :es el espacio donde se puede publicar las páginas web de forma pública para que se pueda compartir con todo el mundo.
- El navegador :es la máquina virtual que permite ejecutar el código escrito y convertirlo a la forma visual que vemos el navegador.

## Introducción del proyecto:
consiste en una página web para la gestión de datos y tareas de una clínica veterinaria donde se pueden introducir borrar modificar citas.
dar altas y bajas a clientes y sus mascotas .
almacenar todos los datos en una base de datos MongoDB.
Diagrama de flujo:
Diagrama de flujo que representa como se puede navegar en las y dar de altas-bajas en la aplicación.

Clientes y Mascotas:

![](https://github.com/Curso-Fullstack-MEAN-Octubre2017/Younes-Pet-Store/raw/master/imagenes/imagen%206.PNG)

Citas y Calendarios:

![](https://github.com/Curso-Fullstack-MEAN-Octubre2017/Younes-Pet-Store/raw/master/imagenes/imagen%207.PNG)

## Servicios REST publicados:
| Metodo | URL | Body | Response |
|--------|-----|------|----------|
| GET | /customers | <Vacío> | {JSON} |
| GET | /customer/:id | <Vacío> | {JSON} |
| POST | /customer | {JSON} | <Vacío> |
| PUT | /customer/:id | {JSON} | <Vacío> |
| DELETE | /customers/:id | {JSON} | <Vacío> |
| GET | /pets/:id | <Vacío> | {JSON} |
| GET | /pet/:id | <Vacío> | {JSON} |
| POST | /pet | {JSON} | <Vacío> |
| PUT | /pet/:id | {JSON} | <Vacío> |
| DELETE | /pets/card/:id | {JSON} | <Vacío> |
| GET | /appointments/:startDate/:endDate | <Vacío> | {JSON} |
| GET | /appointments/:month | <Vacío> | {JSON} |
| POST | /appointment | {JSON} | <Vacío> |
| DELETE | /appointments/:id | {JSON} | <Vacío> |

La carpeta donde tenemos guardadas todas la rutas que vamos a implementar en la aplicación.
https://github.com/Curso-Fullstack-MEAN-Octubre2017/Younes-Pet-Store/tree/master/routes
 
## Implementación
### 1. Schema para MongoDB
el esquema de datos que usamos para mongoDB:

![](https://github.com/Curso-Fullstack-MEAN-Octubre2017/Younes-Pet-Store/raw/master/imagenes/imagen%208.PNG)

### 2. Servicios REST:
https://github.com/Curso-Fullstack-MEAN-Octubre2017/Younes-Pet-Store/blob/88e02f145a711743f63ab42f306e19ea5d447d01/routes/customer-routes.js#L8

la ruta de lectura de datos que llama a la función getCustomers:
https://github.com/Curso-Fullstack-MEAN-Octubre2017/Younes-Pet-Store/blob/24ce341b55d9cf0f318ad3d2c6e50186b529ab0f/controllers/cutomer-controller.js#L21

llama a la función  saveCustomer :
https://github.com/Curso-Fullstack-MEAN-Octubre2017/Younes-Pet-Store/blob/24ce341b55d9cf0f318ad3d2c6e50186b529ab0f/controllers/cutomer-controller.js#L34

llama a la función putCustomer donde hacemos el Update de datos:
https://github.com/Curso-Fullstack-MEAN-Octubre2017/Younes-Pet-Store/blob/24ce341b55d9cf0f318ad3d2c6e50186b529ab0f/controllers/cutomer-controller.js#L70
llama a la función deleteCustomer donde borramos los datos:
https://github.com/Curso-Fullstack-MEAN-Octubre2017/Younes-Pet-Store/blob/24ce341b55d9cf0f318ad3d2c6e50186b529ab0f/controllers/cutomer-controller.js#L85

y despues exportamos todas las funciones :

### 3. Controlador Angular
#### a.Componente.js
Los componentes.js estan guardados en las carpetas responsables del front-end en:
https://github.com/Curso-Fullstack-MEAN-Octubre2017/Younes-Pet-Store/tree/master/public/app

#### b.Componente.html
Los componentes.html estan guardados en las carpetas responsables del front-end en:
https://github.com/Curso-Fullstack-MEAN-Octubre2017/Younes-Pet-Store/tree/master/public/app

#### c.Configuración del Módulo
Es donde definimos todos los objetos que vamos a usar en nuestros componentes.html y componentes.js
https://github.com/Curso-Fullstack-MEAN-Octubre2017/Younes-Pet-Store/blob/master/public/app/app.module.js

#### d.Ruta Angular
Nuestras rutas de angular estan implimentadas en el front-End:
https://github.com/Curso-Fullstack-MEAN-Octubre2017/Younes-Pet-Store/blob/master/public/app/app.module.js

#### e. Ficheros <script> incluidos en el index.html
Los ficheros <script> son todos los componentes.js y librerias que importamos a nuestro index
https://github.com/Curso-Fullstack-MEAN-Octubre2017/Younes-Pet-Store/blob/master/public/index.html#L10










