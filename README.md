# Proyecto base - CLI

Proyecto generado con [Angular CLI](https://github.com/angular/angular-cli) version 1.5.3.

## Prerequisitos

1. Instalar Node JS
https://nodejs.org/es/download/

2. Instalar VS Code
https://code.visualstudio.com/download

## Documentación
--------------
* [1. Módulos](#modulos)
* [2. Instalación](#instalacion)
* [3. Configuración](#configuracion)
* [4. Servicio de Helpers](#servicioDeHelpers)
* [5. FileManager](#fileManager)
* [6. Invocar un Web Service desde una SQL Stored Procedure](#invocarWebServiceDesdeStoredProcedure)

---------------------------------------

<a name="modulos" />

## Módulos

Todos los módulos necesarios se encuentran en el archivo **packages.json**, en la raíz del repositorio.

Estos son los principales módulos:

    - Node JS
    - Angular
    - Express JS
    - MS SQL JS
	
<a name="instalacion" />

## Instalación

1. **Instalar Angular CLI**. Para ello abrir la consola de comandos y correr la línea *npm install -g @angular/cli*.
2. Una vez instalado Angular CLI (se instala solo una vez), **abrir o ubicar la consola de comandos en la carpeta del repositorio**.
3. Una vez abierta la consola de comandos, correr la línea *npm install*
    Si la aplicación debe comenzar de cero, se debe correr en cambio la línea *ng new <nombre_de_nueva_aplicación>*.
    *En este último caso, Angular CLI nos instalará una serie de módulos que podremos utilizar en la aplicación, además de la estructura de carpetas necesaria.*

<a name="configuracion" />

## Configuración

### Archivos importantes

**./app.js**

    var express = require('express')
    , app = express()
    , bodyParser = require('body-parser')
    , port = process.env.PORT || 4000;

    app.use(express.static(__dirname + '/public'))
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({extended: true}))
    app.use(require('./controller'))

    var server = app.listen(port, function () {
        console.log('Server is running in port ' + port);
    });

En **app.js** se encuentra la configuración principal de ruteo y de carga de librerías.
La variable **express** será la encargada de cargar el módulo de **./node_modules/express/...** como una clase.

De esta forma, la variable **app** será una instancia de **express**, pudiendo configurar todas las rutas que se encuentren en la carpeta **./controller**
Para obtener las rutas de una carpeta, como en el caso del código *app.use(require('./controller'))*, es necesario que dentro de la carpeta **./controller** exista un archivo **index.js** donde estén configuradas

Finalmente, la variable **server** genererá el servidor según el puerto indicado por la variable **port**.

**./controller/index.js**

    var express = require('express')
    , router = express.Router()

    router.use('/alumno', require('./alumno'))

    router.get('/', function(req, res) {
        res.render('index')
    })

    module.exports = router

En **./controller/index.js** se configuran las rutas que se cargarán en los controladores. 

Por ejemplo, tenemos la ruta */alumno*, que busca las rutas desde el archivo **./alumno**.
Luego, la variable **router**, que obtiene la clase desde **express.Router()**, renderizará el **index.js** para que a su vez renderize todas las demás vistas.

Cada controlador dentro de la carpeta **./controller/...** debe tener las rutas más especificas definidas.

<a name="fileManager" />

##FileManager

Actualmente, la url para acceder a al servicio del Angular_FileManager se encuentra en el archivo **./model/external/fileManager.js**, en la variable **fileManagerPath** del primer método **post**.

Se agregó conectividad con el servicio de Angular_FileManager. Los archivos relacionados con este se encuenson los siguientes, siguiendo la misma estructura de capas **./controller/external/fileManager.js**, **./service/external/fileManager.js** y **./model/external/fileManager.js**.

Las operaciones están separadas en diferentes métodos, los cuales se deben acceder con un post el cual debe aportar la información apropiada en un json. A continuación se describen como deben formarse las estructuras correctamente.

**/FileManager/GetList**
[Post]Devuelve un json con una lista de los archivos que se encuentran en el directorio dado en la variable path.

    {
        "path": "/example"
    }

**/FileManager/Rename**
[Post]Renombra un archivo o carpeta que se encuentra en la dirección aportada en path por el nombre aportado en newItemPath. Si este no coincide con la dirección original, el archivo o carpeta es movido a este nuevo directorio.

    {
        "path": "/example",
        "newItemPath": "/example2"
    }

**/FileManager/CreateFolder**
[Post]Crea una nueva carpeta en el directorio proporcionado en la variable newPath.

    {    
        "newPath": "/example2/folder"
    }

**/FileManager/Move**
[Post]Mueve una colección de archivos y/o carpetas al directorio proporcionado en newPath.

    {
        "items": ["/text.txt", "/example2/folder"],
        "newPath": "/example1"
    }

**/FileManager/Copy**
[Post]Copia una colección de archivos al directorio proporcionado en newPath. No acepta carpetas.

    {
        "items": ["/text.txt", "/example2/picture.jpg"],
        "newPath": "/example1"
    }

**/FileManager/Remove**
[Post]Elimina una colección de archivos y/o carpetas vacias.

    {
        "items": ["/text.txt", "/example2/picture.jpg", "/emptyFolder"]
    }

**/FileManager/GetContent**
[Post]Obtiene el contenido indicado en el parametro item.

    {
        "item": "/text.txt"
    }

**/FileManager/Compress**
[Post]Comprime una colección de carpetas al directorio proporcionado en el parametro destination nombrado como el parametro compressedFilename.

    {
        "items": ["/example1"],
        "destination": "/example2",
        "compressedFilename": "compressed-files.zip"
    }

**/FileManager/Extract**
[Post]Extrae en el directorio indicado en destination, del archivo comprimido dado en item, en la carpeta con el nombre indicado en folderName.

    {
        "destination": "/",
        "item": "/random-files.zip",
        "folderName": "extract_dir"
    }

**/FileManager/Download**
[Get]Descarga el archivo indicado en la ruta proporcionada del parametro path.

    /FileManager/Download?path=/text1.txt

**/FileManager/Edit**
[Post]Permite editar el archivo indicado en el parametro item con el contenido del parametro content

    {
        "item": "/text1.txt",
        "content": "<?php echo random(); ?>"
    }

**/FileManager/ChangePermissions**
[Post]Permie cambiar los permisos de acceso a archivos y carpetas.

    {
        "items": ["/example2", "/text1.txt"],
        "perms": "rw-r-x-wx",
        "permsCode": "653",
        "recursive": true
    }
<a name="servicioDeHelpers" />

## Servicio de Helpers

Este servicio hace uso del subservicio de Helpers **helperService.js**, ubicado en C**\service\helpers\**

Dicho elemento contiene funciones útiles y genéricas.

Para utilizarlo hay que apuntar al mismo con **requore** dentro de los .js de la siguiente forma:

```js
var HelperService = require('../helpers/helperService.js');
```


