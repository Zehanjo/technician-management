# Inicio del README

# Proyecto de Gestión de TechnicianDataPay y TechnicianDataBank

Este proyecto se centra en la gestión de los datos de pago y datos bancarios de técnicos, implementando diversas funcionalidades como la creación, actualización, eliminación y validación de estos datos. El proyecto está desarrollado utilizando **NestJS** con **TypeORM** para la gestión de la base de datos.

# Configuración de Variables de Entorno para la Base de Datos

Este archivo contiene las variables de entorno necesarias para configurar la conexión a la base de datos en tu aplicación.

## Variables de Entorno

Asegúrate de crear un archivo `.env` en la raíz de tu proyecto y agrega las siguientes variables de entorno con los valores correspondientes para tu entorno de base de datos:

```env
# Configuración de la Base de Datos

# Dirección del servidor de la base de datos
DB_HOST=localhost

# Puerto en el que el servidor de la base de datos está escuchando
DB_PORT=port

# Nombre de usuario para conectar a la base de datos
DB_USERNAME=myuser

# Contraseña para el usuario de la base de datos
DB_PASSWORD=mypassword

# Nombre de la base de datos a la que conectarse
DB_DATABASE=mydatabase
```

## Instalación

1. Clona este repositorio en tu máquina local.
    ```bash
    git clone https://github.com/Zehanjo/technician-management
    ```

2. Navega hasta la carpeta del proyecto.
    ```bash
    cd tu_repositorio
    ```

3. Instala las dependencias necesarias.
    ```bash
    npm install
    ```

4. Configura tu base de datos en el archivo `ormconfig.json` o utilizando variables de entorno.

## Uso

### Scripts de Inicio

- **Desarrollo**: Inicia el servidor en modo desarrollo.
    ```bash
    npm run start:dev
    ```

- **Producción**: Compila y ejecuta el servidor en modo producción.
    ```bash
    npm run build
    npm run start:prod
    ```

### Uso de Postman

Para interactuar con la API, se recomienda usar **Postman**. A continuación, se muestran ejemplos de cuerpos de solicitud para las operaciones **create** y **update** de **TechnicianDataPay**.


#### Crear un Nuevo TechnicianDataPay
- POST:http://localhost:3000/technician-data-pay
para crear uno nuevo
```json
{
  "dataBank": {
    "accountNumber": "723456732",
    "CCI": "10000000000000004023"
  }
}
```

para enlazarlo a uno ya existente
```json
{
  "dataBankId": "439908d1-91b6-47bf-a45d-83c4dff629d7"
}
```

para actualizar en caso de que sea necesario *Cabe recalcar cambiar los datos del data bank*
```json
{
  "dataBankId": "439908d1-91b6-47bf-a45d-83c4dff629d7"
  "dataBank": {
    "accountNumber": "723456733",
    "CCI": "10000000000000004323"
  }
}
```

#### Obtener todos los datos

- GET: http://localhost:3000/technician-data-pay


#### Buscar

- GET: http://localhost:3000/technician-data-pay/:id

#### Actualizar

- Para actualizar solo cambiar los datos de dataBank
- PATCH: http://localhost:3000/technician-data-pay/aab5b54a-4313-4163-8469-e00f147043ef

```json
{
  "dataBankId": "439908d1-91b6-47bf-a45d-83c4dff629d7",
  "dataBank": {
      "accountNumber": "987654321",
      "CCI": "10020000000000000023"
  }
}
```

#### Eliminar

- DELETE: http://localhost:3000/technician-data-pay/:id
