# 📦 LIBRARY-GUIDE.md

## ✅ Best Practices for Choosing Libraries

Choosing the right libraries helps keep your codebase fast, secure, and easy to maintain. Use the checklist below to evaluate third-party packages before installing them.

---

## 1. 🎯 Purpose and Fit

- [ ] Does the library solve your **exact problem**?
- [ ] Is it **too generic or bloated** for what you need?
- [ ] Can this functionality be built internally in less than 30 lines?

---

## 2. 🌍 Popularity and Community

- [ ] GitHub stars and **active usage** in other repos
- [ ] NPM download trends (use [npmtrends.com](https://npmtrends.com/))
- [ ] Issues and PRs are **actively maintained**
- [ ] Good StackOverflow or community presence

---

## 3. 🔧 Maintenance and Updates

- [ ] Commits within the **last 6–12 months**
- [ ] Follows **semantic versioning** (`MAJOR.MINOR.PATCH`)
- [ ] Not abandoned or deprecated

---

## 4. 🔐 Security

- [ ] Run `npm audit` or use [Snyk](https://snyk.io/) for vulnerability checks
- [ ] No known security issues in dependency tree
- [ ] Avoid use of dangerous APIs (e.g., `eval`, unsafe regex)

---

## 5. 📚 Documentation Quality

- [ ] Clear and complete **README**
- [ ] Code samples or usage examples
- [ ] API docs or website available
- [ ] Explains install/config/setup clearly

---

## 6. 🧪 TypeScript Support (if applicable)

- [ ] Comes with built-in types or has a `@types/` package
- [ ] Type definitions are accurate and complete
- [ ] No unexpected `any` usage or type errors

```bash
# Optional: check if types exist
npm info <package-name> types
```

## 7. 📦 Bundle Size

- [ ] Check with bundlephobia.com

- [ ]Tree-shakable and ESM-compatible

- [ ] Avoid importing full libraries (e.g., all of lodash)

## 8. 🧩 Alternatives

- [ ] Compared with 2–3 alternatives

- [ ] Checked GitHub issues for long-term pain points

- [ ] Picked the most maintainable and composable choice

## 9. 📜 License

- [ ] Uses permissive license (MIT, Apache-2.0)

- [ ] Avoid GPL or closed-source unless legally reviewed

- [ ] License allows for commercial or production use

## 10. 📈 Long-Term Impact

- [ ] Will the library scale with your project?

- [ ] Is it easy to replace in the future if needed?

- [ ] Is it critical or just a dev-helper?

## ✅ Summary Checklist

| ✅ Criteria                  | Check |
| ---------------------------- | ----- |
| Solves your problem clearly  | \[ ]  |
| Actively maintained          | \[ ]  |
| Popular and trusted          | \[ ]  |
| Secure (Snyk/npm audit)      | \[ ]  |
| Good documentation           | \[ ]  |
| Has TypeScript support       | \[ ]  |
| Acceptable bundle size       | \[ ]  |
| Open-source friendly license | \[ ]  |

## 🛠️ Tools

- 🔍 NPM Trends

- 📦 Bundlephobia

- ⚠️ Snyk Vulnerability Scanner

- 📘 TypeSearch

- 📎 NPM Compare
