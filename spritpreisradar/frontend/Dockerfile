# Build als Multi-Stage Docker Build durchführen
# ==============================================

FROM registry.gitlab.pascada.net/inhouse/infrastructure/trusted-container-image/node-ng-cli:v17.2.0 as base
WORKDIR /app
COPY package*.json ./
COPY pascada-*.tgz ./

#
# ---- Dependencies ----
FROM base AS dependencies
# install node packages
RUN npm set progress=false && \
    npm config set depth 0 && \
    npm install

#
# ---- Test ----
# run linters, build and tests
FROM dependencies AS test
COPY . .
#RUN  npm run lint && npm run build && npm run test:once
#RUN  npm run build:version
RUN  npm run build --omit=dev

FROM registry.gitlab.pascada.net/inhouse/infrastructure/trusted-container-image/nginx:master
# APTEST-303 Ab Angular 17 baut "ng build" die App standardmäßig nach dist/<Name>/browser
# Siehe https://github.com/angular/angular-cli/blob/main/packages/angular_devkit/build_angular/src/builders/application/schema.json
# The output directory name of your browser build within the output path base. Defaults to 'browser'.
COPY --from=test /app/dist/frontend/browser /usr/share/nginx/html
COPY Dockerfile-nginx.conf /etc/nginx/nginx.conf

# https://serverfault.com/a/634296
# An amazing recipe is given in the nginx Dockerfile (https://github.com/nginxinc/docker-nginx/blob/8921999083def7ba43a06fabd5f80e4406651353/mainline/jessie/Dockerfile#L21-L23):
# forward request and error logs to docker log collector
RUN ln -sf /dev/stdout /var/log/nginx/access.log && \
    ln -sf /dev/stderr /var/log/nginx/error.log
