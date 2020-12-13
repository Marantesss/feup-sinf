# FEUP SINF

Project developed during the course Information Systems @ FEUP

## How to Run this project

### Running everything in development mode

Navigate to the project's root folder (where the `docker-compose.yml` file is) and run the following command:

```
docker-compose up
```

This will build (if not already) the docker images and run them. More information can be found in each project folder.

#### Troubleshooting

A script for cleaning **ALL** docker images can be found on this project's root folder (make sure you're not running any important containers, cause they will be stopped and their images will be deleted). Use it if docker is not responding to your changes or for some other reason.

```bash
sh clean_docker.sh
# OR
./clean_docker.sh
```

If for some reason docker is still not being cooperative, feel free to give up and use your local machine. Instructions on that can be found in each of the project's folders.

## Resources

- [Team Drive](https://drive.google.com/drive/folders/1Dnt6zxiGBSphQ7BLp7bOFyqoW8QIGsr6?usp=sharing)
- [Figma Project](https://www.figma.com/file/VvUWIcMKG25DB1EbqhaxR0/Untitled?node-id=0%3A1)
- [Team Discord](https://discord.gg/YTD5en)

## Team

- [Diogo Machado](https://github.com/diogosmac)
- [Gonçalo Marantes](https://github.com/Marantesss)
- [João Ricardo Cardoso](https://github.com/JoaoRicardoCardoso)
- [Paulo Marques](https://github.com/pdsam)
- [Raul Viana](https://github.com/raulviana)