# Architecture du projet

src/
├── lib/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.svelte
│   │   │   ├── Sidebar.svelte
│   │   │   └── Footer.svelte
│   │   ├── auth/
│   │   │   ├── LoginForm.svelte
│   │   │   └── RegisterForm.svelte
│   │   ├── produits/
│   │   │   ├── ProduitCard.svelte
│   │   │   ├── ProduitForm.svelte
│   │   │   └── ProduitList.svelte
│   │   └── repas/
│   │       ├── RepasCard.svelte
│   │       ├── RepasForm.svelte
│   │       └── RepasList.svelte
│   ├── stores/
│   │   ├── auth.js
│   │   ├── produits.js
│   │   └── repas.js
│   └── utils/
│       ├── api.js
│       └── formatters.js
├── routes/
│   ├── +layout.svelte
│   ├── +page.svelte
│   ├── auth/
│   │   ├── login/+page.svelte
│   │   └── register/+page.svelte
│   ├── produits/
│   │   ├── +page.svelte
│   │   └── [id]/+page.svelte
│   └── repas/
│       ├── +page.svelte
│       └── [id]/+page.svelte
└── app.html