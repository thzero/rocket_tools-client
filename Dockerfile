#https://cloud.google.com/cloud-build/docs/deploying-builds/deploy-firebase
# use latest Node LTS (Erbium)
FROM node:latest
# install Firebase CLI
RUN npm install -g firebase-tools

ENTRYPOINT ["/usr/local/bin/firebase"]
