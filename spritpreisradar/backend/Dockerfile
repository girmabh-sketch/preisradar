# Build als Multi-Stage Docker Build durchführen
# ==============================================

FROM registry.gitlab.pascada.net/inhouse/infrastructure/trusted-container-image/node:master as base
WORKDIR /app
# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

#
COPY .env ./
#COPY .env.development ./

#
# ---- Dependencies ----
FROM base AS runtime-dependencies
RUN npm set progress=false && npm config set depth 0
# production node_modules
RUN npm install --omit=dev

FROM runtime-dependencies AS build-dependencies
# install ALL node_modules, including 'devDependencies'
RUN npm install

#
# ---- Build & Test ----
# run linters, setup and tests
FROM build-dependencies AS build
COPY . .
# RUN  npm run lint && npm run build && npm run test
RUN npm run build

#
# ---- Release ----
FROM base AS release
# copy production node_modules
COPY --from=runtime-dependencies /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
# seed.data.yaml wird von Seed Controller im Basisverzeichnis erwartet
COPY --from=build /app/seed.data.yaml ./seed.data.yaml

# Folgende Sourcen werden benötigt, wenn 'npm run start:seed' als Entrypoint verwendet werden soll.
#COPY --from=build /app/src/config ./src/config
#COPY --from=build /app/src/rest-api ./src/rest-api
#COPY --from=build /app/src/seeds ./src/seeds
#COPY --from=build /app/tsconfig.json ./
#COPY --from=build /app/seed.data.yaml ./

# Folgende Sourcen werden benötigt, wenn 'npm run start:noseed' als Entrypoint verwendet wird.
#COPY --from=build /app/src/config ./src/config
#COPY --from=build /app/tsconfig.json ./

# expose port and define CMD
# Das soll ausgeführt werden, wenn docker run durchgeführt wird
# https://docs.docker.com/engine/reference/builder/#entrypoint
# Es muss der Port aus main.ts angegeben werden.
EXPOSE 60111
#ENTRYPOINT ["npm", "run", "start:seed"]
#ENTRYPOINT ["npm", "run", "start:noseed"]
ENTRYPOINT ["npm", "run", "start:prod"]
