FROM node:16 as build
WORKDIR /build
COPY . .
RUN npm install
RUN npm run build
RUN npm run build:final

FROM node:16 as release
WORKDIR /code
COPY --from=build /build/dist .
CMD ["node", "index.js"]