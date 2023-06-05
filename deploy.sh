git pull
docker-compose -f docker-compose-deploy.yml down
docker-compose -f docker-compose-deploy.yml up --build -d