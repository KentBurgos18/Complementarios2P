# MODULO USUARIO DEL PROYECTO HORARIOS
#### 1. 
Clone la carpeta y con ayuda de la terminal realice un npm init, esto instalara todas las dependencias del proyecto
#### 2.
Instale docker desktop en su computador, [Docker](https://www.docker.com/get-started/)
#### 3.
Una vez instalado e iniciado docker desktop, ejecute el comando docker-compose up --build en su terminal
#### 4.
Para probar su funcionamiento visite http://localhost:8000/horarios/usuario, lo que le devolvera una lista de usuarios o un array vacio

#### 5.
Para agregar usuarios realice un post con su herramienta de confianza, por ejemplo postman
y siga el siguiente formato

    "username": "example",
    "contraseña": "1234",
    "datos": {
        "nombre": "example",
        "apellido": "example",
        "cedula": "1234567890",
        "nivel": 6,
        "paralelo": "B"
    },
    "email": "example@example.com",
    "telefono": "09999999"

