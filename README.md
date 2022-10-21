# RIBBON App

## Overview

Example frontend app utilizing [ribbon-proxy](https://github.com/HTD-Health/ribbon-proxy) and [ribbon-client](https://github.com/HTD-Health/ribbon-client)

## Getting started

Install packages

```sh
npm install
```

create .env file

```sh
touch .env.local
```

contents of .env.local file

```.env
VITE_API_URL=http://proxy.to.ribbon.com
VITE_HOME_IMG_URL=http://optional.image.url.jpg
```

Start development environment

```sh
npm run dev
```

## Tech

- ReactJS
- TypeScript

## Docs

[Ribbon API docs](https://ribbon.readme.io/docs)

[Chakra](https://chakra-ui.com/) - UI

[React Hook Form](https://react-hook-form.com/) - Forms

[Yup](https://github.com/jquense/yup) - Schema Validation

[Leaflet](https://leafletjs.com/) - Map
