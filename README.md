## Deployment

- **URL Vercel**: https://forum-app-pi-black.vercel.app/

## Automation Testing & CI/CD

- Unit test reducer, thunk, dan komponen: `npm test`
- End-to-end test: `npm run e2e`
- CI: GitHub Actions (`.github/workflows/ci.yml`)
- CD: Vercel (auto-deploy dari branch `master`)
- Branch protection aktif di branch `master`
- Screenshot bukti CI/CD ada di folder `screenshot/`

## React Ecosystem

- Storybook (lihat folder `.storybook/` dan file `*.stories.js` di `src/components/`)