# 📚 Front-End Engineering Standards

Welcome to the documentation hub for our **React + TypeScript + Vite** front-end projects.  
This repository follows a standardized DevOps and development approach using GitLab CI/CD, Docker, Linting tools, Commit conventions, and TypeScript best practices.

> 📁 All detailed guides are located in the `/docs` directory.

---

## 🔰 Getting Started

1. **Clone the repository**
2. Run `npm ci` to install dependencies using the lockfile
3. Start the development server with `npm run dev`
4. Use `docker-compose up` for local containerization if needed
5. Read the docs below to follow team conventions

---

## 📂 Documentation Index

| Area                                 | Guide                                                   |
| ------------------------------------ | ------------------------------------------------------- |
| 🐳 Docker + GitLab CI/CD             | [`DOCKER.README.md`](./docs/DOCKER.README.md)           |
| 🧠 Git Strategy & Commit Conventions | [`GITRULLES.README.md`](./docs/GITRULLES.README.md)     |
| 🧼 Code Linting & Formatting Setup   | [`LINTING-GUIDE.md`](./docs/LINTING-GUIDE.md)           |
| 🧪 TypeScript Best Practices         | [`TS-GUIDE.md`](./docs/TS-GUIDE.md)                     |
| 📦 Library Evaluation Standards      | [`LIBRARY-GUIDE.md`](./docs/LIBRARY-GUIDE.md)           |
| 📥 Pull Request Checklist            | [`PULLREQUEST.README.md`](./docs/PULLREQUEST.README.md) |

---

## 🔧 Tools Used

- **React** + **Vite** + **TypeScript**
- **ESLint**, **Prettier**, **Stylelint**
- **Husky**, **lint-staged**, **Commitizen**
- **Docker**, **docker-compose**
- **GitLab CI/CD**
- **Jest** + `--coverage`
- **Conventional Commits**

---

## 🧭 Developer Workflow Summary

1. 🛠 Start from `feature/`, `bugfix/`, or `hotfix/` branch (see [Git Rules](./docs/GITRULLES.README.md))
2. 💅 Code and commit using `npx cz` or `npm run commit`
3. 🧼 Ensure lint, tests, and type-checks pass
4. 📥 Submit a PR following the [Pull Request Checklist](./docs/PULLREQUEST.README.md)
5. ✅ Pipeline must pass on GitLab CI
6. 🚀 Merge only to protected branches after approval

---

## 📦 Production Deployment

- Use [`deploy.sh`](./deploy.sh) for SSH-based Docker deployment
- Alternatively, use GitLab Pages for static deployments ([setup guide](./docs/DOCKER.README.md#gitlab-pages-deployment))

---

## 📌 Notes

- All projects should follow [TypeScript Guide](./docs/TS-GUIDE.md) strictly for type safety and maintainability
- Library choices should be justified with [Library Guide](./docs/LIBRARY-GUIDE.md)
- Pre-commit hooks and linting setup are detailed in [Linting Guide](./docs/LINTING-GUIDE.md)

---

## 🧾 Example `.env`

```env
REACT_APP_API_URL=https://api.example.com
```

Make sure `.env` is listed in `.gitignore`.

---

## ✅ Final Checklist for All Contributions

- [ ] Code is clean, typed, and formatted
- [ ] Commit message follows Conventional Commits
- [ ] Git branch is properly named (`feature/*`, `bugfix/*`)
- [ ] All unit tests and CI checks pass
- [ ] PR follows [pull request checklist](./docs/PULLREQUEST.README.md)
