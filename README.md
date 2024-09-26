This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
```

## Creating the application

The application was created with NextJS with the default options / configurations

```bash
npx create-next-app@latest
```

### Tanstack (useQuery) library for server actions

```bash
npm i @tanstack/react-query
```

## Optional DX libraries

### prettier-eslint package and configuration

```bash
npm install --save-dev prettier-eslint
```

<details>
<summary>Create a `.prettierrc` file</summary>

```json
{
  "trailingComma": "es5",
  "tabWidth": 2,
  "semi": false,
  "singleQuote": true
}
```

</details>

### ShadCN UI library

Install the library

```bash
npx shadcn@latest init
```

Add the components to be used in the library

```bash
npx shadcn@latest add button input textarea select sheet
```

### Tailwind extension for prettier

```bash
npm install -D prettier prettier-plugin-tailwindcss
```

Update the `.prettierrc` file to include the plugin

```json
{
  "plugins": ["prettier-plugin-tailwindcss"] // added
}
```

### Update the App Layout to use grid where the body of the app uses 1fr

```html
<body>
  <div className="grid min-h-screen grid-rows-[auto_1fr_auto]">
    <div className="`bg-slate-500`">headers go here</div>
    <div>{children}</div>
    <div className="bg-slate-500">footers go here</div>
  </div>
</body>
```
