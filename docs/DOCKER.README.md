Sure! Below is your fully rewritten `README.md` **specifically for GitLab**, replacing all GitHub references with GitLab equivalents:

* ✅ GitLab CI/CD (`.gitlab-ci.yml`) instead of GitHub Actions
* ✅ GitLab secrets (`CI/CD Variables`) instead of GitHub Secrets
* ✅ Adjusted language, file structure, and recommendations for GitLab pipelines

---

```markdown
# ⚡ React + TypeScript + Vite Front-End Starter (GitLab Edition)

This is a production-ready React + TypeScript + Vite application with full DevOps integration using Docker and GitLab CI/CD. It follows best practices in build security, linting, testing, and deployment automation.

---

## 📁 Project Structure

```

/src               → App source code (TSX, SCSS, assets)
/public            → Static assets
/docker            → Dockerfile and .dockerignore
.gitlab-ci.yml     → GitLab CI/CD pipeline

````

---

## 🚀 CI/CD Rules — With GitLab Examples

| Rule                          | Description & Code Example |
|-------------------------------|-----------------------------|
| **Lockfile Installs Only**    | Ensures deterministic installs. <br> ✅ GitLab: <br> `npm ci` |
| **Linters & Formatters**      | Run ESLint, Stylelint, and Prettier checks. <br> `package.json`:<br>```json "lint": "eslint .", "lint:styles": "stylelint '**/*.css'", "format:check": "prettier --check ." ``` |
| **Unit Tests**                | Run with `jest --coverage`. <br> `"test": "jest --coverage"` |
| **Build Validation**          | Vite production build must succeed: `"build": "vite build"` |
| **Audit Dependencies**        | Catch known issues: `npm audit --audit-level=moderate` |
| **Docker Image Verification** | Build Docker image to validate `Dockerfile`: `docker build -t react-app .` |
| **Artifacts**                 | Upload coverage or build files using GitLab's artifacts directive |
| **Fail Fast**                 | Default behavior in GitLab CI |
| **Use Secrets & Envs**        | Use GitLab CI/CD **Variables** for secrets (e.g. `NODE_AUTH_TOKEN`) |
| **Branch Protection**         | Enable in GitLab: **Settings → Repository → Protected Branches** |

---

## 🐳 Docker Best Practices — With Examples

| Rule                    | Description |
|-------------------------|-------------|
| **Multi-stage Builds**  | Keeps images clean and small (see Dockerfile below) |
| **Use Official Images** | Use trusted images like `node:20-alpine`, `nginx:alpine` |
| **Non-root User**       | Use `USER appuser` in final image for security |
| **Environment Variables**| Use `ARG` and `ENV` to inject variables safely |
| **.dockerignore**       | Keep unnecessary files out of Docker build |
| **Minimize Layers**     | Combine `RUN` commands to reduce layers |
| **Pin Versions**        | Lock to specific image versions (e.g., `node:20-alpine`) |
| **Expose Correct Port** | Use `EXPOSE 80` |
| **Healthcheck**         | Add `HEALTHCHECK` to verify app status |
| **CI/CD Caching**       | Structure Dockerfile to reuse cached layers during CI |

---

## 🐳 `Dockerfile` (Vite Multi-stage)

```Dockerfile
# ----------- Build Stage -----------
FROM node:20-alpine AS build

WORKDIR /app
COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# ----------- Serve Stage -----------
FROM nginx:alpine

# Create non-root user
RUN adduser -D appuser
USER appuser

# Clean default html and copy built app
RUN rm -rf /usr/share/nginx/html/*
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD wget -qO- http://localhost || exit 1
````

---

## 📁 `.dockerignore`

```dockerignore
node_modules
dist
.git
.dockerignore
Dockerfile
README.md
npm-debug.log
.env
coverage
```

---

## 🔁 GitLab CI/CD: `.gitlab-ci.yml`

```yaml
stages:
  - lint
  - test
  - build
  - docker

variables:
  NODE_ENV: "production"

cache:
  paths:
    - node_modules/

lint:
  stage: lint
  image: node:20-alpine
  script:
    - npm ci
    - npm run lint
    - npm run lint:styles
    - npm run format:check

test:
  stage: test
  image: node:20-alpine
  script:
    - npm ci
    - npm test
  artifacts:
    paths:
      - coverage/
    reports:
      junit: coverage/junit.xml
    expire_in: 1 week

build:
  stage: build
  image: node:20-alpine
  script:
    - npm ci
    - npm run build
    - npm audit --audit-level=moderate
  artifacts:
    paths:
      - dist/
    expire_in: 1 week

docker-build:
  stage: docker
  image: docker:latest
  services:
    - docker:dind
  script:
    - docker build -t react-vite-app .
```

---

## 🧪 Required Scripts (`package.json`)

```json
"scripts": {
  "dev": "vite",
  "build": "vite build",
  "preview": "vite preview",
  "test": "jest --coverage",
  "lint": "eslint . --ext .ts,.tsx",
  "lint:styles": "stylelint '**/*.css'",
  "format:check": "prettier --check ."
}
```

---

## 🧬 Local Development

```bash
npm ci           # Install clean dependencies
npm run dev      # Start Vite dev server
npm run lint     # Run JS/TS linting
npm test         # Run unit tests
npm run build    # Production build
```

---

## 📦 Build & Run with Docker

```bash
# Build image
docker build -t react-vite-app .

# Run container
docker run -p 8080:80 react-vite-app
```

---

## 🔐 GitLab CI/CD Variables (Secrets)

Set these under:

> **GitLab → Project → Settings → CI/CD → Variables**

| Variable Name       | Description                           |
| ------------------- | ------------------------------------- |
| `NODE_AUTH_TOKEN`   | Token for private registry (optional) |
| `REACT_APP_API_URL` | Injected into Vite build at runtime   |

---

## ✅ PR / MR Checklist

* [x] Linting and formatting pass
* [x] Unit tests and coverage pass
* [x] `npm audit` shows no critical vulnerabilities
* [x] Docker image builds successfully
* [x] `.gitlab-ci.yml` pipeline passes

---

## 🧪 Example `.env` File

```
REACT_APP_API_URL=https://api.example.com
```

Add `.env` to `.gitignore`.

---


Excellent! Here's everything you requested, fully tailored for a **React + TypeScript + Vite** project deployed using Docker, with GitLab CI/CD and GitLab Pages support:

---

## 📦 `docker-compose.yml`

This file is ideal for local orchestration or staging environments. It uses the Dockerfile we defined earlier.

```yaml
version: '3.8'

services:
  react-app:
    build:
      context: .
      dockerfile: Dockerfile
    ports:
      - '8080:80'
    environment:
      - NODE_ENV=production
      - REACT_APP_API_URL=https://api.example.com
    restart: unless-stopped
```

> 📝 Tip: Place this in the root of your repo and run with `docker-compose up --build`.

---

## 🌐 GitLab Pages Deployment (Optional)

To deploy your **static Vite build** to **GitLab Pages**, you can use a separate job in `.gitlab-ci.yml`.

### Requirements:

* Must use `public/` as the deploy folder for GitLab Pages
* Copy `dist/` (Vite output) to `public/`

### Add this job to your existing `.gitlab-ci.yml`:

```yaml
pages:
  stage: deploy
  image: node:20-alpine
  script:
    - npm ci
    - npm run build
    - mkdir -p public
    - cp -r dist/* public/
  artifacts:
    paths:
      - public
  only:
    - main
```

> 📝 This will deploy your Vite build to GitLab Pages at `https://<username>.gitlab.io/<project>/`.

Make sure to enable GitLab Pages in:

```
GitLab → Settings → Pages
```

---

## 🚀 `deploy.sh` — Production Deployment Script

This is an example shell script that can be used for a manual or CI-driven production deployment (e.g., copying Docker image to a server via SSH).

```bash
#!/bin/bash

set -e

APP_NAME="react-vite-app"
IMAGE_TAG="latest"
REMOTE_USER="deployuser"
REMOTE_HOST="your.server.com"
REMOTE_PORT="22"
REMOTE_PATH="/var/www/react-app"

echo "🔧 Building Docker image..."
docker build -t $APP_NAME:$IMAGE_TAG .

echo "📦 Saving Docker image..."
docker save $APP_NAME:$IMAGE_TAG | gzip > $APP_NAME.tar.gz

echo "🚚 Transferring image to server..."
scp -P $REMOTE_PORT $APP_NAME.tar.gz $REMOTE_USER@$REMOTE_HOST:/tmp/

echo "💻 Connecting to server and loading image..."
ssh -p $REMOTE_PORT $REMOTE_USER@$REMOTE_HOST << EOF
  docker load < /tmp/$APP_NAME.tar.gz
  docker stop $APP_NAME || true
  docker rm $APP_NAME || true
  docker run -d --name $APP_NAME -p 80:80 $APP_NAME:$IMAGE_TAG
  rm /tmp/$APP_NAME.tar.gz
EOF

echo "✅ Deployment complete."
```

> 🔐 **Security Note**: Use SSH keys for secure server access and avoid plain-text passwords.

---

## ✅ Add to `.gitlab-ci.yml` (Optional)

If you want GitLab to run the `deploy.sh` script automatically in the pipeline:

```yaml
deploy-prod:
  stage: deploy
  image: alpine
  before_script:
    - apk add --no-cache openssh bash gzip docker-cli
  script:
    - chmod +x ./deploy.sh
    - ./deploy.sh
  only:
    - tags
```

> 🛡️ Set environment variables or secrets in GitLab for:

* `DEPLOY_SSH_KEY`
* `REMOTE_HOST`, `REMOTE_USER`, etc.

---
