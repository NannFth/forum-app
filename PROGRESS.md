# PROGRESS — Submission "Automation Testing & CI/CD Forum App"

Project: CRA + Redux Toolkit forum discussion app (lanjutan submission sebelumnya).
Ecosystem pilihan: **Storybook** (juga untuk poin nilai "stories komponen").

## Rencana & Status

- [x] 1. Setup tools: Cypress + Storybook installed & configured
- [x] 2. Unit test reducer (target >3): DONE - 9 tests across 3 files, all passing
  - [x] threads/slice.test.js (9 tests)
  - [x] threadDetail/slice.test.js (8 tests)
  - [x] authUser/slice.test.js (4 tests)
- [x] 3. Thunk test (target >3): DONE - 10 tests across 2 files, all passing
  - [x] threads/action.test.js (asyncAddThread, asyncToggleUpvoteThread, dst) - 7 tests
  - [x] authUser/action.test.js (asyncSetAuthUser, asyncUnsetAuthUser) - 4 tests
- [x] 4. Component test (target >3): DONE - 12 tests across 3 files, all passing
  - [x] LoginInput.test.js (4 tests)
  - [x] ThreadItem.test.js (5 tests)
  - [x] CommentItem.test.js (3 tests)
- [x] FIXED bugs found while running tests:
  - Created missing src/setupTests.js (jest-dom matchers were not registered)
  - Added TextEncoder/TextDecoder polyfill (react-router v7 needs it under CRA's jsdom env)
  - Added jest.moduleNameMapper for `react-router/dom` (subpath exports resolution issue with react-scripts 5 + react-router-dom v7)
  - Removed default CRA src/App.test.js (superseded by real tests)
- ALL 44 TESTS PASSING across 8 test suites (`npm test`)
- [x] 5. Storybook stories (target >=2): DONE
  - [x] LoginInput.stories.js (1 story: Default)
  - [x] ThreadItem.stories.js (3 stories: NoVotes, Upvoted, Downvoted)
  - Fixed: Storybook 8 webpack5 builder defaults to SWC (no babel-loader) which
    couldn't parse JSX in .js files. Installed @storybook/addon-webpack5-compiler-babel
    to enable babel-loader. Verified `npx storybook build` succeeds.
  - Verified `npm test` still passes (44/44) after these config changes.
- [x] 6. E2E Cypress test alur login (>=1, target beberapa skenario): DONE
  - [x] cypress/e2e/login.cy.js - 4 scenarios (page display, wrong email, wrong
        password, successful login)
  - [x] cypress.config.js with baseUrl + env vars EMAIL/PASSWORD
  - [x] cypress/.eslintrc.json (simplified, no plugin dep to avoid ESLint 8/9
        flat-config incompatibility found with eslint-plugin-cypress@6.4.2)
  - NOTE FOR ADNAN: Sebelum menjalankan `npm run e2e` kamu HARUS:
      1. Register akun uji lewat halaman /register (atau lewat API Dicoding),
      2. Set Cypress env EMAIL & PASSWORD ke akun itu, contoh:
         npx cypress run --env EMAIL=akun_uji@example.com,PASSWORD=passwordnya
         (atau isi langsung di cypress.config.js `env`, atau pakai cypress.env.json)
      3. `npm start` app harus jalan duluan di localhost:3000 (baseUrl), atau
         jalankan via `start-server-and-test` (lihat langkah CI di bawah).
  - Full lint (`npx eslint`) bersih untuk src, cypress, dan .storybook.
  - `npm test` tetap 44/44 PASS.
- [x] 7. package.json script `e2e` ditambahkan (pakai start-server-and-test agar
      CI otomatis start app dulu sebelum cypress run)
- [x] 8. GitHub Actions CI workflow (.github/workflows/ci.yml) - DONE
  - Job name: automation-test-job (job ini WAJIB namanya sesuai supaya branch
    protection required-check nyambung ke job yang sama)
  - Trigger: push & pull_request ke branch master
  - Steps: checkout -> setup node 20 -> npm ci -> npm test -> npm run e2e
  - Cypress env EMAIL/PASSWORD diambil dari GitHub Secrets (CYPRESS_EMAIL,
    CYPRESS_PASSWORD) - Adnan HARUS set secrets ini di GitHub repo settings
    dan akun itu harus benar-benar terdaftar di forum-api.dicoding.dev
  - Upload cypress screenshot sbg artifact kalau gagal (buat debug)
- [ ] 9. Branch protection master di GitHub (manual step by Adnan)
- [ ] 10. Vercel deployment (manual step by Adnan, dibantu arahan)
- [ ] 11. Screenshot: 1_ci_check_error, 2_ci_check_pass, 3_branch_protection (manual, taruh di /screenshot)
- [x] 12. Hapus App.test.js default CRA (sudah dihapus, digantikan test yang relevan) & final lint check (bersih)

## Catatan teknis
- Redux: Redux Toolkit (createSlice), bukan manual reducer.
- API layer: src/utils/api.js (perlu dicek untuk mocking di test thunk).
- Struktur reducer kompleks: threads (vote toggle 3 kondisi), threadDetail (sama + addComment).
- Thunk kompleks: threads/action.js (banyak dispatch + error rollback via toggleNeutralizeVoteThread).

## Resume note
Kalau lanjut sesi baru: cek checklist di atas, lanjut dari item pertama yang belum tercentang.
